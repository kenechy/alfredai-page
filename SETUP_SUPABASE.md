# Supabase Setup Guide

This guide will walk you through setting up Supabase for the AlfredAI landing page lead management system.

## Prerequisites

- A Supabase account (sign up at https://supabase.com if you don't have one)

## Step 1: Create a New Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in the project details:
   - **Name**: alfredai-landing (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the region closest to your users
   - **Pricing Plan**: Free tier is sufficient for testing
4. Click "Create new project"
5. Wait for the project to be set up (this may take a few minutes)

## Step 2: Create the Leads Table

1. In your Supabase project dashboard, click on "SQL Editor" in the left sidebar
2. Click "New Query"
3. Copy and paste the following SQL code:

```sql
-- Create the leads table
create table leads (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  company text,
  message text not null,
  created_at timestamp with time zone default now(),
  ip text,
  source text,
  status text default 'new'
);

-- Add an index on email for faster lookups
create index idx_leads_email on leads(email);

-- Add an index on created_at for sorting
create index idx_leads_created_at on leads(created_at desc);

-- Add an index on status for filtering
create index idx_leads_status on leads(status);

-- Enable Row Level Security (RLS)
alter table leads enable row level security;

-- Create a policy to allow inserts from the service role
create policy "Allow service role to insert leads"
  on leads
  for insert
  to service_role
  with check (true);

-- Create a policy to allow service role to read all leads
create policy "Allow service role to read leads"
  on leads
  for select
  to service_role
  using (true);

-- Create a policy to allow service role to update leads
create policy "Allow service role to update leads"
  on leads
  for update
  to service_role
  using (true);
```

4. Click "Run" to execute the SQL
5. You should see a success message indicating the table was created

## Step 3: Verify the Table

1. Click on "Table Editor" in the left sidebar
2. You should see the "leads" table listed
3. Click on the table to view its structure
4. Verify that all columns are present:
   - id (uuid)
   - name (text)
   - email (text)
   - company (text)
   - message (text)
   - created_at (timestamptz)
   - ip (text)
   - source (text)
   - status (text)

## Step 4: Get Your API Keys

1. Click on "Settings" (gear icon) in the left sidebar
2. Click on "API" in the settings menu
3. You'll see three important values:

### Project URL
Copy the "Project URL" - it will look like:
```
https://xxxxxxxxxxxxx.supabase.co
```
This is your `NEXT_PUBLIC_SUPABASE_URL`

### API Keys
You'll see two keys:

#### anon/public key
This is safe to use in the browser:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### service_role key
This should ONLY be used on the server side (NEVER expose in browser):
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
This is your `SUPABASE_SERVICE_ROLE_KEY`

## Step 5: Update Your Environment Variables

1. Open `.env.local` in your project
2. Replace the placeholder values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key
```

## Step 6: Test the Connection

You can test the database connection by trying to submit a form on your landing page, or by using the Supabase SQL Editor to manually insert a test record:

```sql
insert into leads (name, email, company, message, status)
values ('Test User', 'test@example.com', 'Test Company', 'This is a test message', 'new');
```

Then verify the record was created:

```sql
select * from leads order by created_at desc limit 10;
```

## Optional: Set Up Webhooks for Notifications

If you want to receive real-time notifications when leads are submitted:

1. Go to "Database" > "Webhooks" in Supabase
2. Click "Create a new hook"
3. Configure webhook settings to send POST requests to your notification endpoint
4. Set table to "leads" and events to "INSERT"

## Security Best Practices

1. Never commit your service role key to version control
2. Always use Row Level Security (RLS) policies
3. Regularly rotate your service role key
4. Monitor your database usage in the Supabase dashboard
5. Set up monitoring and alerts for unusual activity

## Troubleshooting

### Connection Errors
- Verify your API keys are correct
- Check that your project URL is correct
- Ensure you're using the service role key for server-side operations

### Permission Denied
- Verify RLS policies are set up correctly
- Make sure you're using the service role key for API routes

### Table Not Found
- Ensure the SQL script ran successfully
- Check the Table Editor to verify the table exists
- Try refreshing the Supabase dashboard

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase JavaScript Client Documentation](https://supabase.com/docs/reference/javascript/introduction)
