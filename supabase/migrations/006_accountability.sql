-- Phase 6: Accountability layer
-- Adds vote + confirmation counters to reports for public pressure tracking,
-- and fixes the report_subscribers unique constraint to allow multiple
-- subscribers per report (one per distinct email instead of one per report).

-- ── Vote counters on reports ──────────────────────────────────────────────────
alter table reports add column if not exists votes         int not null default 0;
alter table reports add column if not exists confirmations int not null default 1;

-- Index to power "top voted" queries efficiently
create index if not exists idx_reports_votes on reports(votes desc) where is_approved = true;

-- ── Fix report_subscribers uniqueness ────────────────────────────────────────
-- The original schema had a unique constraint on (report_id) alone, which
-- prevented anyone other than the original reporter from subscribing.
-- Replace it with a (report_id, email) unique pair so multiple people
-- can follow the same report.

-- Drop the old single-column unique constraint if it exists
do $$
begin
  if exists (
    select 1 from pg_constraint
    where conname = 'report_subscribers_report_id_key'
  ) then
    alter table report_subscribers drop constraint report_subscribers_report_id_key;
  end if;
end $$;

-- Add the new composite unique constraint (safe to run multiple times)
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'report_subscribers_report_id_email_key'
  ) then
    alter table report_subscribers
      add constraint report_subscribers_report_id_email_key unique (report_id, email);
  end if;
end $$;
