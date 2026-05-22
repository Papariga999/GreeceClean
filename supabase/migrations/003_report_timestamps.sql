-- Add milestone timestamp columns to reports table.
-- These replace implicit status-based inference with explicit timestamps
-- so elapsed-time calculations have a concrete anchor point.

alter table reports add column if not exists confirmed_at  timestamptz null;
alter table reports add column if not exists notified_at   timestamptz null;
alter table reports add column if not exists resolved_at   timestamptz null;

comment on column reports.confirmed_at is 'When admin set status to in_review';
comment on column reports.notified_at  is 'When municipality email was sent (status → forwarded)';
comment on column reports.resolved_at  is 'When report was marked as cleaned up (status → resolved)';