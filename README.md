# AlfredAI.bot Landing Page

A modern, high-performance landing page for AlfredAI.bot, designed to capture leads effectively with a beautiful, responsive UI and automated email integrations.

## 🚀 Client Review Guide

This section is designed to help you quickly review the website features and functionalities.

### 1. Getting Started
To run the website locally on your machine:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Start the Server:**
    ```bash
    npm run dev
    ```
3.  **View the Site:**
    Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

### 2. Testing the Contact Form
The main feature of this landing page is the lead capture form.

1.  Scroll down to the **Contact** section (or click "Get Started").
2.  Fill out the form with test data (Name, Email, Company, Message).
3.  Click **"Send Message"**.
4.  You should see a success message indicating the lead was captured.

### 3. Verifying Data (Leads)
We've included a simple utility script to view captured leads directly from your terminal without needing to access the database dashboard.

Run the following command:
```bash
npm run view-leads
```
This will display a table of all submitted leads with their details (Name, Company, Email, Status).

### 4. Email Notifications
After submitting the form, two emails are triggered (ensure SMTP environment variables are configured):
1.  **Admin Notification:** Sent to the `ADMIN_EMAIL` alerting you of a new lead.
2.  **Thank You Email:** Sent to the user who filled out the form.

---

## ✨ Key Features

-   **Modern & Responsive Design:** Built with TailwindCSS for a flawless experience on Mobile, Tablet, and Desktop.
-   **Real-time Form Validation:** Instant feedback for users using Zod validation.
-   **Automated Emails:** Immediate acknowledgement to users and notifications to your team.
-   **Secure Database:** All leads are securely stored in a Supabase PostgreSQL database.
-   **Performance:** Optimized for high speed and SEO (Next.js 16).

---

## 🛠 Technical Setup (For Developers)

### Tech Stack
-   **Framework:** Next.js 16 (App Router)
-   **Language:** TypeScript
-   **Styling:** TailwindCSS 4
-   **Database:** Supabase (PostgreSQL) via Prisma ORM
-   **Email:** Nodemailer (SMTP)
-   **Validation:** Zod

### Environment Variables
Create a `.env.local` file in the root directory with the following variables:

```env
# Database (Supabase Transaction Pooler URL recommended for Prisma)
DATABASE_URL="postgres://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgres://postgres.[project-ref]:[password]@aws-0-[region].supabase.co:5432/postgres"

# Supabase (Client-side)
NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[your-anon-key]"
SUPABASE_SERVICE_ROLE_KEY="[your-service-role-key]"

# Email (SMTP Configuration)
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASSWORD="[your-smtp-password]"
FROM_EMAIL="noreply@alfredai.bot"
ADMIN_EMAIL="admin@alfredai.bot"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Database Migration
This project uses Prisma for database management.

To apply the schema to your database:
```bash
npx prisma db push
```

To open the database GUI:
```bash
npx prisma studio
```

### Available Commands

| Command | Description |
| PO | Description |
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the application for production |
| `npm run start` | Starts the production server |
| `npm run view-leads` | CLI tool to view submitted leads |
| `npm run lint` | Runs ESLint for code quality |

## 📂 Project Structure

```
/app              # Next.js App Router pages & API
/components       # Reusable UI components
  /layout         # Header, Footer
  /sections       # Landing page sections (Hero, Features, Contact)
  /ui             # Basic UI elements (Buttons, Inputs)
/lib              # Utilities (Email, Prisma, Supabase)
/prisma           # Database schema
/public           # Static assets (Images, Icons)
/scripts          # Utility scripts (Lead viewer)
```