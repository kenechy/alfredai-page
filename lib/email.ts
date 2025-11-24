import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

// Validate required environment variables
const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;
const smtpUser = process.env.SMTP_USER;
const smtpPassword = process.env.SMTP_PASSWORD;

if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword) {
  throw new Error(
    "Missing SMTP configuration. Please check your .env.local file for SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASSWORD."
  );
}

// Create reusable transporter
let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort || "587", 10),
      secure: parseInt(smtpPort || "587", 10) === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });
  }
  return transporter;
}

export type SendThankYouEmailParams = {
  name: string;
  email: string;
  company: string;
};

export async function sendThankYouEmail({
  name,
  email,
  company,
}: SendThankYouEmailParams) {
  const fromEmail = process.env.FROM_EMAIL || "noreply@alfredai.bot";

  const firstName = name.split(" ")[0];
  const companyMention = ` at ${company}`;

  try {
    const transporter = getTransporter();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const info = await transporter.sendMail({
      from: `AlfredAI Team <${fromEmail}>`,
      to: email,
      subject: "Thank you for your interest in AI Fee Proposal Generator",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #334155;
                background-color: #f8fafc;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
              }
              .header {
                background-color: #ffffff;
                padding: 40px 30px;
                text-align: center;
                border-bottom: 3px solid #d1345f;
              }
              .header img {
                max-width: 180px;
                height: auto;
                display: block;
                margin: 0 auto;
              }
              .content {
                padding: 40px 30px;
              }
              .content p {
                margin: 0 0 16px 0;
                font-size: 16px;
              }
              .greeting {
                font-size: 18px;
                font-weight: 600;
                color: #1e293b;
              }
              .features {
                background-color: #fef2f2;
                border-left: 4px solid #d1345f;
                padding: 20px 24px;
                margin: 24px 0;
                border-radius: 4px;
              }
              .features h3 {
                margin: 0 0 12px 0;
                font-size: 16px;
                font-weight: 600;
                color: #1e293b;
              }
              .features ul {
                margin: 0;
                padding-left: 20px;
              }
              .features li {
                margin-bottom: 8px;
                color: #475569;
              }
              .footer {
                background-color: #f8fafc;
                padding: 30px;
                text-align: center;
                border-top: 1px solid #e2e8f0;
              }
              .footer p {
                margin: 0;
                font-size: 14px;
                color: #64748b;
              }
              .footer a {
                color: #d1345f;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="${appUrl}/alfredai.png" alt="AlfredAI Logo" onerror="this.style.display='none';this.nextElementSibling.style.display='block';" />
                <h1 style="display:none;color:#d1345f;margin:0;font-size:28px;font-weight:700;">AlfredAI</h1>
              </div>
              <div class="content">
                <p class="greeting">Hi ${firstName},</p>

                <p>
                  Thank you for reaching out${companyMention}! We received your message and one of our team members will get back to you within 24 hours.
                </p>

                <div class="features">
                  <h3>Here's what you can expect:</h3>
                  <ul>
                    <li>Personalized demo of our AI Fee Proposal Generator</li>
                    <li>Discussion of your specific needs and use cases</li>
                    <li>Custom pricing options tailored to your firm</li>
                  </ul>
                </div>

                <p>
                  In the meantime, feel free to explore more about how our AI-powered solution can transform your proposal process and help you win more business.
                </p>

                <p style="margin-top: 24px;">
                  Best regards,<br>
                  <strong>The AlfredAI Team</strong>
                </p>
              </div>
              <div class="footer">
                <p>
                  This email was sent because you submitted a contact form on
                  <a href="https://alfredai.bot">alfredai.bot</a>
                </p>
                <p style="margin-top: 8px; font-size: 12px;">
                  &copy; ${new Date().getFullYear()} AlfredAI. All rights reserved.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Hi ${firstName},

Thank you for reaching out${companyMention}! We received your message and one of our team members will get back to you within 24 hours.

Here's what you can expect:
- Personalized demo of our AI Fee Proposal Generator
- Discussion of your specific needs and use cases
- Custom pricing options tailored to your firm

In the meantime, feel free to explore more about how our AI-powered solution can transform your proposal process and help you win more business.

Best regards,
The AlfredAI Team

---
This email was sent because you submitted a contact form on alfredai.bot
© ${new Date().getFullYear()} AlfredAI. All rights reserved.`,
    });

    console.log("Email sent successfully:", info.messageId);
    return { success: true, data: info };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Send notification email to admin/team
export async function sendAdminNotification({
  name,
  email,
  company,
  message,
}: SendThankYouEmailParams & { message: string }) {
  const fromEmail = process.env.FROM_EMAIL || "noreply@alfredai.bot";
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    console.warn("ADMIN_EMAIL not configured, skipping admin notification");
    return { success: true, skipped: true };
  }

  try {
    const transporter = getTransporter();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const info = await transporter.sendMail({
      from: `AlfredAI Leads <${fromEmail}>`,
      to: adminEmail,
      subject: `New Lead: ${name} from ${company}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #334155;
                background-color: #f8fafc;
                margin: 0;
                padding: 20px;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
              }
              .header {
                background-color: #ffffff;
                padding: 30px;
                text-align: center;
                border-bottom: 3px solid #d1345f;
              }
              .header img {
                max-width: 150px;
                height: auto;
                display: block;
                margin: 0 auto;
              }
              .content {
                padding: 30px;
              }
              h2 {
                color: #1e293b;
                margin-top: 0;
              }
              .field {
                margin-bottom: 16px;
              }
              .field strong {
                display: block;
                color: #475569;
                font-size: 14px;
                margin-bottom: 4px;
              }
              .field p {
                margin: 0;
                color: #1e293b;
              }
              .message {
                background-color: #fef2f2;
                padding: 16px;
                border-radius: 4px;
                border-left: 4px solid #d1345f;
                margin-top: 8px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="${appUrl}/alfredai.png" alt="AlfredAI Logo" onerror="this.style.display='none';this.nextElementSibling.style.display='block';" />
                <h1 style="display:none;color:#d1345f;margin:0;font-size:24px;font-weight:700;">AlfredAI</h1>
              </div>
              <div class="content">
                <h2>New Lead Submission</h2>

              <div class="field">
                <strong>Name:</strong>
                <p>${name}</p>
              </div>

              <div class="field">
                <strong>Email:</strong>
                <p><a href="mailto:${email}">${email}</a></p>
              </div>

              <div class="field">
                <strong>Company:</strong>
                <p>${company}</p>
              </div>

              <div class="field">
                <strong>Message:</strong>
                <div class="message">${message.replace(/\n/g, "<br>")}</div>
              </div>

              <div class="field">
                <strong>Submitted:</strong>
                <p>${new Date().toLocaleString()}</p>
              </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `New Lead Submission

Name: ${name}
Email: ${email}
Company: ${company}
Message:
${message}

Submitted: ${new Date().toLocaleString()}`,
    });

    console.log("Admin notification sent successfully:", info.messageId);
    return { success: true, data: info };
  } catch (error) {
    console.error("Failed to send admin notification:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
