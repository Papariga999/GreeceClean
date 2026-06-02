-- Security hardening:
-- 1. Prevent anon/auth clients from bypassing the server validation path.
-- 2. Remove the legacy DB approval webhook to avoid duplicate municipality mail.

drop policy if exists "Anyone can submit a report" on reports;

drop trigger if exists on_report_approved on reports;
drop function if exists notify_municipality_on_approve();
