# Resend Email Setup Guide

This guide will walk you through setting up Resend for sending automated thank you emails to leads.

## Prerequisites

- A Resend account (sign up at https://resend.com if you don't have one)
- A domain that you own (for production use)

## Step 1: Create a Resend Account

1. Go to https://resend.com
2. Click "Sign Up" (or "Get Started")
3. Create your account using:
   - Email and password, OR
   - Sign in with GitHub
4. Verify your email address if required

## Step 2: Get Your API Key

### For Testing (Development)

1. Log in to your Resend dashboard at https://resend.com/home
2. Click on "API Keys" in the left sidebar
3. Click "Create API Key"
4. Fill in the details:
   - **Name**: AlfredAI Landing Development
   - **Permission**: Full Access (for development)
   - **Domain**: Select "All Domains" or leave empty for testing
5. Click "Create"
6. Copy the API key (it will only be shown once!)
   - It will look like: `re_123456789abcdefghijklmnop`
7. Save this key securely

### For Production

1. Follow the same steps as above, but:
   - **Name**: AlfredAI Landing Production
   - **Permission**: Sending access (more restrictive)
   - **Domain**: Select your verified domain

## Step 3: Update Environment Variables

1. Open `.env.local` in your project
2. Update the Resend API key:

```bash
RESEND_API_KEY=re_your_actual_api_key_here
```

## Step 4: Configure Email Sender Address

### For Testing (Development)

For development, you can use Resend's test email addresses:

```bash
FROM_EMAIL=onboarding@resend.dev
```

This will work immediately without domain verification, but:
- Emails will only be sent to your verified email address
- Not suitable for production use
- Has limited sending capacity

### For Production

To send emails from your own domain, you need to verify it:

1. In the Resend dashboard, click "Domains" in the left sidebar
2. Click "Add Domain"
3. Enter your domain (e.g., `alfredai.bot`)
4. Click "Add"
5. You'll see DNS records that need to be added to your domain:

#### SPF Record
```
Type: TXT
Name: @
Value: (provided by Resend)
```

#### DKIM Records
```
Type: TXT
Name: (provided by Resend, usually starts with "resend._domainkey")
Value: (provided by Resend)
```

6. Add these DNS records to your domain registrar:
   - Log in to your domain provider (GoDaddy, Namecheap, Cloudflare, etc.)
   - Find DNS settings
   - Add the TXT records provided by Resend
   - Save changes

7. Return to Resend and click "Verify Records"
8. Once verified (may take a few minutes to hours), update your `.env.local`:

```bash
FROM_EMAIL=noreply@alfredai.bot
```

## Step 5: Configure Admin Notifications (Optional)

If you want to receive email notifications when leads submit the form:

1. Update your `.env.local` with your admin email:

```bash
ADMIN_EMAIL=your-email@example.com
```

2. Make sure this email is:
   - A valid email address you have access to
   - Able to receive emails from your FROM_EMAIL domain

## Step 6: Test Email Sending

### Using Resend Dashboard

1. Go to https://resend.com/emails
2. Click "Send Test Email"
3. Use the same configuration as your app
4. Send a test email to verify it works

### Using Your Application

1. Start your development server:
```bash
npm run dev
```

2. Navigate to your contact form
3. Fill out the form with your email address
4. Submit the form
5. Check your inbox for the thank you email

If using the test email (`onboarding@resend.dev`), you'll only receive emails if your email is verified in Resend.

## Step 7: Monitor Email Activity

1. Go to https://resend.com/emails in your dashboard
2. You can see:
   - All sent emails
   - Delivery status
   - Open rates (if configured)
   - Click rates (if configured)
   - Bounce/complaint information

## Email Template Customization

The email template is defined in `/Users/avec/Projects/alfredai/alfredai-landing/lib/email.ts`. You can customize:

- Email subject line
- Email body content (HTML and text versions)
- Styling and layout
- Brand colors and logo

To modify the email template:
1. Edit `lib/email.ts`
2. Update the HTML in the `sendThankYouEmail` function
3. Test your changes by submitting the form

## Resend Limits

### Free Tier
- 100 emails/day
- 1 verified domain
- Full API access
- Email analytics

### Pro Tier
- 50,000 emails/month (starting at $20/month)
- Multiple domains
- Priority support
- Advanced analytics

For production use with significant traffic, consider upgrading to a paid plan.

## Troubleshooting

### Emails Not Sending

1. **Check API Key**: Verify your API key is correct in `.env.local`
2. **Check From Email**: Ensure FROM_EMAIL is valid
   - Use `onboarding@resend.dev` for testing
   - Use verified domain for production
3. **Check Logs**: Look at your Next.js console for error messages
4. **Check Resend Dashboard**: View email logs at https://resend.com/emails

### Domain Not Verifying

1. **Wait for DNS Propagation**: Can take up to 48 hours (usually much faster)
2. **Verify DNS Records**: Use a DNS checker tool to confirm records are set
3. **Check Record Format**: Ensure no extra spaces or characters
4. **Contact Resend Support**: If issues persist after 48 hours

### Emails Going to Spam

1. **Verify Domain**: Make sure your domain is fully verified
2. **Add DMARC Record**: Additional DNS record for better deliverability
3. **Warm Up Domain**: Start with small volumes, gradually increase
4. **Avoid Spam Triggers**: Check email content for common spam words

## Security Best Practices

1. **Never commit your API key** to version control
2. **Use different keys** for development and production
3. **Rotate keys regularly** if exposed
4. **Use restrictive permissions** in production
5. **Monitor email logs** for unusual activity

## Additional Resources

- [Resend Documentation](https://resend.com/docs/introduction)
- [Resend Node.js SDK](https://resend.com/docs/send-with-nodejs)
- [Domain Verification Guide](https://resend.com/docs/dashboard/domains/introduction)
- [Email Best Practices](https://resend.com/docs/knowledge-base/best-practices)
- [Resend Status Page](https://status.resend.com)
