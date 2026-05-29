-- Phase 1 convergence migration.
-- Brings existing deployments in line with the authoritative schema.sql.

create extension if not exists "pgcrypto";
create extension if not exists cube;
create extension if not exists earthdistance;
create extension if not exists postgis;

alter table municipalities add column if not exists name_en         text not null default '';
alter table municipalities add column if not exists name_de         text not null default '';
alter table municipalities add column if not exists email_official  text;
alter table municipalities add column if not exists region          text;
alter table municipalities add column if not exists is_auto_created boolean not null default false;
alter table municipalities add column if not exists boundary        geometry(MultiPolygon, 4326);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'municipalities_name_el_unique'
  ) then
    alter table municipalities
      add constraint municipalities_name_el_unique unique (name_el);
  end if;
end $$;

alter table reports add column if not exists image_url       text;
alter table reports add column if not exists image_urls      jsonb;
alter table reports add column if not exists description     text;
alter table reports add column if not exists geom            geometry(Point, 4326);
alter table reports add column if not exists confirmed_at    timestamptz;
alter table reports add column if not exists notified_at     timestamptz;
alter table reports add column if not exists resolved_at     timestamptz;
alter table reports add column if not exists updated_at      timestamptz not null default now();

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'reports_description_max_length'
  ) then
    alter table reports
      add constraint reports_description_max_length
      check (description is null or char_length(description) <= 500);
  end if;
end $$;

create table if not exists email_logs (
  id              uuid primary key default gen_random_uuid(),
  report_id       uuid not null references reports(id) on delete cascade,
  municipality_id uuid references municipalities(id) on delete set null,
  recipient_email text not null,
  status          text not null check (status in ('sent', 'failed')),
  error_message   text,
  sent_at         timestamptz not null default now()
);

alter table email_logs enable row level security;

create table if not exists report_subscribers (
  id                    uuid primary key default gen_random_uuid(),
  report_id             uuid not null unique references reports(id) on delete cascade,
  email                 text not null,
  locale                text not null default 'el' check (locale in ('el', 'en', 'de')),
  created_at            timestamptz not null default now(),
  forwarded_notified_at timestamptz,
  resolved_notified_at  timestamptz
);

alter table report_subscribers enable row level security;

create or replace function sync_report_geom()
returns trigger language plpgsql as $$
begin
  if new.lat is not null and new.lng is not null then
    new.geom := ST_SetSRID(ST_MakePoint(new.lng, new.lat), 4326);
  end if;
  return new;
end;
$$;

drop trigger if exists trg_sync_report_geom on reports;
create trigger trg_sync_report_geom
  before insert or update of lat, lng on reports
  for each row execute function sync_report_geom();

create or replace function auto_assign_municipality()
returns trigger language plpgsql as $$
declare
  matched_id uuid;
begin
  if new.geom is null then
    return new;
  end if;

  select id into matched_id
  from municipalities
  where boundary is not null
    and ST_Contains(boundary::geometry, new.geom)
  limit 1;

  if matched_id is not null then
    new.municipality_id := matched_id;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_auto_assign_municipality on reports;
create trigger trg_auto_assign_municipality
  before insert or update of geom on reports
  for each row execute function auto_assign_municipality();

update reports
set geom = ST_SetSRID(ST_MakePoint(lng, lat), 4326)
where lat is not null
  and lng is not null
  and geom is null;

create index if not exists idx_reports_created_at on reports(created_at desc);
create index if not exists idx_reports_location on reports using gist (ll_to_earth(lat, lng))
  where lat is not null and lng is not null;
create index if not exists municipalities_boundary_gist on municipalities using gist (boundary);
create index if not exists reports_geom_gist on reports using gist (geom);
create index if not exists idx_email_logs_report on email_logs(report_id);
create index if not exists idx_email_logs_municipality on email_logs(municipality_id);
create index if not exists idx_email_logs_status on email_logs(status);
create index if not exists idx_email_logs_sent_at on email_logs(sent_at desc);
create index if not exists idx_report_subscribers_report on report_subscribers(report_id);
create index if not exists idx_report_subscribers_email on report_subscribers(email);

do $$
begin
  if exists (
    select 1
    from information_schema.tables
    where table_schema = 'storage'
      and table_name = 'buckets'
  ) then
    insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    values ('reports', 'reports', true, 10485760, array['image/webp'])
    on conflict (id) do update set
      public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;
  else
    raise notice 'Supabase storage.buckets table not found; create public bucket "reports" in Supabase Storage.';
  end if;
end $$;
