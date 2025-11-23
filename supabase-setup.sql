-- ============================================================================
-- AlfredAI Landing Page - Supabase Database Setup
-- ============================================================================
-- This script creates the leads table with all necessary indexes and RLS policies
-- Run this in your Supabase SQL Editor
-- ============================================================================

-- Create the leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip TEXT,
  source TEXT,
  status TEXT DEFAULT 'new'
);

-- Add comments to document the table
COMMENT ON TABLE leads IS 'Stores contact form submissions from the AlfredAI landing page';
COMMENT ON COLUMN leads.id IS 'Unique identifier for each lead';
COMMENT ON COLUMN leads.name IS 'Full name of the person submitting the form';
COMMENT ON COLUMN leads.email IS 'Email address of the lead';
COMMENT ON COLUMN leads.company IS 'Company name (optional)';
COMMENT ON COLUMN leads.message IS 'Message from the contact form';
COMMENT ON COLUMN leads.created_at IS 'Timestamp when the lead was created';
COMMENT ON COLUMN leads.ip IS 'IP address of the submitter';
COMMENT ON COLUMN leads.source IS 'Traffic source or referrer';
COMMENT ON COLUMN leads.status IS 'Lead status: new, contacted, qualified, converted, closed';

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_company ON leads(company) WHERE company IS NOT NULL;

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for re-running the script)
DROP POLICY IF EXISTS "Allow service role to insert leads" ON leads;
DROP POLICY IF EXISTS "Allow service role to read leads" ON leads;
DROP POLICY IF EXISTS "Allow service role to update leads" ON leads;

-- Create RLS policy for service role to insert leads
CREATE POLICY "Allow service role to insert leads"
  ON leads
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Create RLS policy for service role to read leads
CREATE POLICY "Allow service role to read leads"
  ON leads
  FOR SELECT
  TO service_role
  USING (true);

-- Create RLS policy for service role to update leads
CREATE POLICY "Allow service role to update leads"
  ON leads
  FOR UPDATE
  TO service_role
  USING (true);

-- ============================================================================
-- Optional: Create a view for lead statistics
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
  MAX(created_at) AS latest_lead_date
FROM leads;

COMMENT ON VIEW lead_statistics IS 'Aggregated statistics about leads';

-- ============================================================================
-- Optional: Create a function to get recent leads
-- ============================================================================

CREATE OR REPLACE FUNCTION get_recent_leads(limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
  id UUID,
  name TEXT,
  email TEXT,
  company TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  status TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    l.id,
    l.name,
    l.email,
    l.company,
    l.message,
    l.created_at,
    l.status
  FROM leads l
  ORDER BY l.created_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION get_recent_leads IS 'Get the most recent leads, limited by count';

-- ============================================================================
-- Verification Queries
-- ============================================================================

-- Uncomment these to verify the setup:

-- Check if table exists and view its structure
-- SELECT column_name, data_type, is_nullable, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'leads'
-- ORDER BY ordinal_position;

-- Check if indexes were created
-- SELECT indexname, indexdef
-- FROM pg_indexes
-- WHERE tablename = 'leads';

-- Check if RLS is enabled
-- SELECT tablename, rowsecurity
-- FROM pg_tables
-- WHERE tablename = 'leads';

-- Check RLS policies
-- SELECT policyname, permissive, roles, cmd, qual
-- FROM pg_policies
-- WHERE tablename = 'leads';

-- View lead statistics
-- SELECT * FROM lead_statistics;

-- ============================================================================
-- Success Message
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE 'Database setup completed successfully!';
  RAISE NOTICE 'Table "leads" created with indexes and RLS policies';
  RAISE NOTICE 'View "lead_statistics" created for analytics';
  RAISE NOTICE 'Function "get_recent_leads" created for easy data retrieval';
END $$;
