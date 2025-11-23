-- ============================================================================
-- AlfredAI Landing Page - Phase 4 Migration
-- Advanced Tracking Fields
-- ============================================================================
-- This migration adds tracking columns to the leads table for analytics
-- Run this in your Supabase SQL Editor
-- ============================================================================

-- Add tracking columns to leads table
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS utm_source TEXT,
ADD COLUMN IF NOT EXISTS utm_medium TEXT,
ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
ADD COLUMN IF NOT EXISTS referrer TEXT,
ADD COLUMN IF NOT EXISTS user_agent TEXT,
ADD COLUMN IF NOT EXISTS device_type TEXT,
ADD COLUMN IF NOT EXISTS country TEXT;

-- Add comments to document the new columns
COMMENT ON COLUMN leads.utm_source IS 'UTM source parameter for tracking marketing campaigns';
COMMENT ON COLUMN leads.utm_medium IS 'UTM medium parameter (e.g., email, social, cpc)';
COMMENT ON COLUMN leads.utm_campaign IS 'UTM campaign parameter';
COMMENT ON COLUMN leads.referrer IS 'Referring website or domain';
COMMENT ON COLUMN leads.user_agent IS 'Browser user agent string';
COMMENT ON COLUMN leads.device_type IS 'Device type: mobile, tablet, desktop, or unknown';
COMMENT ON COLUMN leads.country IS 'Country derived from IP address';

-- Create indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_leads_utm_source ON leads(utm_source) WHERE utm_source IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_leads_utm_campaign ON leads(utm_campaign) WHERE utm_campaign IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_leads_device_type ON leads(device_type) WHERE device_type IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_leads_country ON leads(country) WHERE country IS NOT NULL;

-- ============================================================================
-- Update the lead_statistics view to include tracking data
-- ============================================================================

CREATE OR REPLACE VIEW lead_statistics AS
SELECT
  COUNT(*) AS total_leads,
  COUNT(DISTINCT email) AS unique_emails,
  COUNT(CASE WHEN company IS NOT NULL THEN 1 END) AS leads_with_company,
  COUNT(CASE WHEN status = 'new' THEN 1 END) AS new_leads,
  COUNT(CASE WHEN status = 'contacted' THEN 1 END) AS contacted_leads,
  COUNT(CASE WHEN status = 'qualified' THEN 1 END) AS qualified_leads,
  COUNT(CASE WHEN status = 'converted' THEN 1 END) AS converted_leads,
  MIN(created_at) AS first_lead_date,
  MAX(created_at) AS latest_lead_date,
  -- Tracking statistics
  COUNT(CASE WHEN utm_source IS NOT NULL THEN 1 END) AS leads_with_utm,
  COUNT(CASE WHEN device_type = 'mobile' THEN 1 END) AS mobile_leads,
  COUNT(CASE WHEN device_type = 'tablet' THEN 1 END) AS tablet_leads,
  COUNT(CASE WHEN device_type = 'desktop' THEN 1 END) AS desktop_leads
FROM leads;

COMMENT ON VIEW lead_statistics IS 'Aggregated statistics about leads including tracking data';

-- ============================================================================
-- Create view for traffic source analysis
-- ============================================================================

CREATE OR REPLACE VIEW traffic_sources AS
SELECT
  COALESCE(utm_source, 'direct') AS source,
  COALESCE(utm_medium, 'none') AS medium,
  COUNT(*) AS lead_count,
  COUNT(DISTINCT email) AS unique_leads,
  MIN(created_at) AS first_seen,
  MAX(created_at) AS last_seen
FROM leads
GROUP BY utm_source, utm_medium
ORDER BY lead_count DESC;

COMMENT ON VIEW traffic_sources IS 'Analyze lead traffic by source and medium';

-- ============================================================================
-- Create view for geographic distribution
-- ============================================================================

CREATE OR REPLACE VIEW geographic_distribution AS
SELECT
  country,
  COUNT(*) AS lead_count,
  COUNT(DISTINCT email) AS unique_leads,
  COUNT(CASE WHEN device_type = 'mobile' THEN 1 END) AS mobile_count,
  COUNT(CASE WHEN device_type = 'desktop' THEN 1 END) AS desktop_count
FROM leads
WHERE country IS NOT NULL
GROUP BY country
ORDER BY lead_count DESC;

COMMENT ON VIEW geographic_distribution IS 'Geographic distribution of leads by country';

-- ============================================================================
-- Create view for device analytics
-- ============================================================================

CREATE OR REPLACE VIEW device_analytics AS
SELECT
  device_type,
  COUNT(*) AS lead_count,
  COUNT(DISTINCT email) AS unique_leads,
  COUNT(CASE WHEN status = 'converted' THEN 1 END) AS conversions,
  ROUND(
    COUNT(CASE WHEN status = 'converted' THEN 1 END)::NUMERIC /
    NULLIF(COUNT(*)::NUMERIC, 0) * 100,
    2
  ) AS conversion_rate
FROM leads
WHERE device_type IS NOT NULL
GROUP BY device_type
ORDER BY lead_count DESC;

COMMENT ON VIEW device_analytics IS 'Lead analytics by device type with conversion rates';

-- ============================================================================
-- Create function to get campaign performance
-- ============================================================================

CREATE OR REPLACE FUNCTION get_campaign_performance(days_back INTEGER DEFAULT 30)
RETURNS TABLE (
  utm_campaign TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  total_leads BIGINT,
  unique_emails BIGINT,
  mobile_leads BIGINT,
  desktop_leads BIGINT,
  countries TEXT[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    l.utm_campaign,
    l.utm_source,
    l.utm_medium,
    COUNT(*) AS total_leads,
    COUNT(DISTINCT l.email) AS unique_emails,
    COUNT(CASE WHEN l.device_type = 'mobile' THEN 1 END) AS mobile_leads,
    COUNT(CASE WHEN l.device_type = 'desktop' THEN 1 END) AS desktop_leads,
    ARRAY_AGG(DISTINCT l.country) FILTER (WHERE l.country IS NOT NULL) AS countries
  FROM leads l
  WHERE
    l.created_at >= NOW() - (days_back || ' days')::INTERVAL
    AND l.utm_campaign IS NOT NULL
  GROUP BY l.utm_campaign, l.utm_source, l.utm_medium
  ORDER BY total_leads DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION get_campaign_performance IS 'Get campaign performance metrics for the last N days';

-- ============================================================================
-- Verification Queries
-- ============================================================================

-- Uncomment these to verify the migration:

-- Check if all columns were added
-- SELECT column_name, data_type, is_nullable
-- FROM information_schema.columns
-- WHERE table_name = 'leads'
-- ORDER BY ordinal_position;

-- Check if indexes were created
-- SELECT indexname, indexdef
-- FROM pg_indexes
-- WHERE tablename = 'leads';

-- View the updated statistics
-- SELECT * FROM lead_statistics;

-- Test the new views
-- SELECT * FROM traffic_sources LIMIT 10;
-- SELECT * FROM geographic_distribution LIMIT 10;
-- SELECT * FROM device_analytics;

-- Test campaign performance function
-- SELECT * FROM get_campaign_performance(30);

-- ============================================================================
-- Success Message
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Phase 4 Migration Completed Successfully!';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Added tracking columns:';
  RAISE NOTICE '  - utm_source, utm_medium, utm_campaign';
  RAISE NOTICE '  - referrer, user_agent';
  RAISE NOTICE '  - device_type, country';
  RAISE NOTICE '';
  RAISE NOTICE 'Created views:';
  RAISE NOTICE '  - lead_statistics (updated)';
  RAISE NOTICE '  - traffic_sources';
  RAISE NOTICE '  - geographic_distribution';
  RAISE NOTICE '  - device_analytics';
  RAISE NOTICE '';
  RAISE NOTICE 'Created functions:';
  RAISE NOTICE '  - get_campaign_performance()';
  RAISE NOTICE '========================================';
END $$;
