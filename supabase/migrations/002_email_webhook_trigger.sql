-- Optional: Supabase database webhook via pg_net.
-- This fires /api/send-report-email automatically when a report is approved,
-- in addition to the in-process call from the admin route.
--
-- Prerequisites:
--   1. Enable pg_net in Supabase Dashboard → Database → Extensions
--   2. Set app.webhook_url and app.webhook_secret in Supabase Dashboard →
--      Database → Settings → "Custom config" (or via SQL below)
--
-- To set the settings once:
--   ALTER DATABASE postgres SET app.webhook_url = 'https://greececlean.gr';
--   ALTER DATABASE postgres SET app.webhook_secret = 'your-webhook-secret';

CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE OR REPLACE FUNCTION notify_municipality_on_approve()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_url    text;
  v_secret text;
BEGIN
  -- Only fire when is_approved flips to true and municipality is set
  IF NEW.is_approved = true
     AND (OLD.is_approved IS DISTINCT FROM NEW.is_approved)
     AND NEW.municipality_id IS NOT NULL
  THEN
    BEGIN
      v_url    := current_setting('app.webhook_url', true);
      v_secret := current_setting('app.webhook_secret', true);
    EXCEPTION WHEN OTHERS THEN
      RETURN NEW; -- settings not configured, skip silently
    END;

    IF v_url IS NOT NULL AND v_secret IS NOT NULL THEN
      PERFORM net.http_post(
        url     := v_url || '/api/send-report-email',
        headers := jsonb_build_object(
          'Content-Type',  'application/json',
          'Authorization', 'Bearer ' || v_secret
        ),
        body    := jsonb_build_object('report_id', NEW.id::text)
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_report_approved ON reports;

CREATE TRIGGER on_report_approved
  AFTER UPDATE ON reports
  FOR EACH ROW
  EXECUTE FUNCTION notify_municipality_on_approve();
