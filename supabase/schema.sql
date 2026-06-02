-- GreeceClean authoritative database schema
-- Safe to run repeatedly in the Supabase SQL editor.

-- Core extensions
create extension if not exists "pgcrypto";
create extension if not exists cube;
create extension if not exists earthdistance;
create extension if not exists postgis;

-- ---------------------------------------------------------------------------
-- ENUMS
-- ---------------------------------------------------------------------------
do $$
begin
  create type report_status as enum (
    'pending',
    'in_review',
    'forwarded',
    'resolved',
    'rejected'
  );
exception when duplicate_object then null;
end $$;

-- ---------------------------------------------------------------------------
-- MUNICIPALITIES
-- ---------------------------------------------------------------------------
create table if not exists municipalities (
  id              uuid primary key default gen_random_uuid(),
  name_el         text not null,
  name_en         text not null default '',
  name_de         text not null default '',
  email_official  text,
  region          text,
  is_auto_created boolean not null default false,
  boundary        geometry(MultiPolygon, 4326),
  created_at      timestamptz not null default now()
);

alter table municipalities add column if not exists name_en         text not null default '';
alter table municipalities add column if not exists name_de         text not null default '';
alter table municipalities add column if not exists email_official  text;
alter table municipalities add column if not exists region          text;
alter table municipalities add column if not exists is_auto_created boolean not null default false;
alter table municipalities add column if not exists boundary        geometry(MultiPolygon, 4326);
alter table municipalities add column if not exists created_at      timestamptz not null default now();

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

comment on table municipalities is 'Greek municipalities that receive report notifications';
comment on column municipalities.is_auto_created is 'True when a row was created from a geocoder name and needs admin review';
comment on column municipalities.boundary is 'Optional municipality boundary polygon for spatial report assignment';

-- ---------------------------------------------------------------------------
-- REPORTS
-- ---------------------------------------------------------------------------
create table if not exists reports (
  id              uuid primary key default gen_random_uuid(),
  public_token    text not null unique default encode(gen_random_bytes(6), 'hex'),
  image_url       text,
  image_urls      jsonb,
  lat             double precision not null,
  lng             double precision not null,
  geom            geometry(Point, 4326),
  category        text not null default 'other',
  status          report_status not null default 'pending',
  is_approved     boolean not null default false,
  municipality_id uuid references municipalities(id) on delete set null,
  description     text,
  confirmed_at    timestamptz,
  notified_at     timestamptz,
  resolved_at     timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  votes         int not null default 0,
  confirmations int not null default 1,
  constraint reports_description_max_length check (
    description is null or char_length(description) <= 500
  )
);

alter table reports drop constraint if exists reports_status_check;
do $$
begin
  alter table reports alter column status type report_status using status::report_status;
exception when others then null;
end $$;

alter table reports add column if not exists image_url       text;
alter table reports add column if not exists image_urls      jsonb;
alter table reports add column if not exists description     text;
alter table reports add column if not exists lat             double precision;
alter table reports add column if not exists lng             double precision;
alter table reports add column if not exists geom            geometry(Point, 4326);
alter table reports add column if not exists category        text not null default 'other';
alter table reports add column if not exists is_approved     boolean not null default false;
alter table reports add column if not exists municipality_id uuid references municipalities(id) on delete set null;
alter table reports add column if not exists confirmed_at    timestamptz;
alter table reports add column if not exists notified_at     timestamptz;
alter table reports add column if not exists resolved_at     timestamptz;
alter table reports add column if not exists updated_at      timestamptz not null default now();
alter table reports add column if not exists votes         int not null default 0;
alter table reports add column if not exists confirmations int not null default 1;

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

comment on table reports is 'Citizen-submitted litter and dumping reports';
comment on column reports.public_token is 'Short token used in public tracking URL /r/<token>';
comment on column reports.confirmed_at is 'When admin set status to in_review';
comment on column reports.notified_at is 'When municipality email was sent';
comment on column reports.resolved_at is 'When report was marked as cleaned up';

-- ---------------------------------------------------------------------------
-- EMAIL LOGS
-- ---------------------------------------------------------------------------
create table if not exists email_logs (
  id              uuid primary key default gen_random_uuid(),
  report_id       uuid not null references reports(id) on delete cascade,
  municipality_id uuid references municipalities(id) on delete set null,
  recipient_email text not null,
  status          text not null check (status in ('sent', 'failed')),
  error_message   text,
  sent_at         timestamptz not null default now()
);

comment on table email_logs is 'One row per notification attempt when a report is forwarded to a municipality';

-- ---------------------------------------------------------------------------
-- REPORTER STATUS SUBSCRIPTIONS
-- ---------------------------------------------------------------------------
create table if not exists report_subscribers (
  id                    uuid primary key default gen_random_uuid(),
  report_id             uuid not null references reports(id) on delete cascade,
  email                 text not null,
  locale                text not null default 'el' check (locale in ('el', 'en', 'de')),
  created_at            timestamptz not null default now(),
  forwarded_notified_at timestamptz,
  resolved_notified_at  timestamptz,
  unique (report_id, email)
);

-- Drop the legacy single-column unique constraint if it was created before the composite one
do $$
begin
  if exists (select 1 from pg_constraint where conname = 'report_subscribers_report_id_key') then
    alter table report_subscribers drop constraint report_subscribers_report_id_key;
  end if;
end $$;

comment on table report_subscribers is 'Optional reporter opt-in email addresses for status updates; no public RLS policies';

-- ---------------------------------------------------------------------------
-- FUNCTIONS AND TRIGGERS
-- ---------------------------------------------------------------------------
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists reports_updated_at on reports;
create trigger reports_updated_at
  before update on reports
  for each row execute procedure update_updated_at();

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

-- ---------------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ---------------------------------------------------------------------------
alter table municipalities enable row level security;
alter table reports enable row level security;
alter table email_logs enable row level security;
alter table report_subscribers enable row level security;

drop policy if exists "Public can read municipalities" on municipalities;
create policy "Public can read municipalities"
  on municipalities for select
  using (true);

drop policy if exists "Public can read approved reports" on reports;
create policy "Public can read approved reports"
  on reports for select
  using (is_approved = true);

drop policy if exists "Anyone can submit a report" on reports;
-- Public report writes must go through app/api/report, which validates inputs,
-- compresses images, rate-limits abuse, and uses the service role server-side.
-- With RLS enabled and no insert policy, anon/auth clients cannot bypass
-- moderation by inserting directly with is_approved=true or forged metadata.

-- email_logs intentionally has RLS enabled and no public policies.
-- report_subscribers intentionally has RLS enabled and no public policies.
-- Supabase service_role bypasses RLS for admin and webhook operations.

-- ---------------------------------------------------------------------------
-- INDEXES
-- ---------------------------------------------------------------------------
create index if not exists idx_reports_status on reports(status);
create index if not exists idx_reports_municipality on reports(municipality_id);
create index if not exists idx_reports_public_token on reports(public_token);
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
create index if not exists idx_reports_votes on reports(votes desc) where is_approved = true;

-- ---------------------------------------------------------------------------
-- SUPABASE STORAGE
-- ---------------------------------------------------------------------------
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
