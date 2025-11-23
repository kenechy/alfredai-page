import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { validateLeadSubmission } from "@/lib/validations";
import { sendThankYouEmail, sendAdminNotification } from "@/lib/email";
import { rateLimiter } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { extractTrackingData, getClientIp, buildSourceString } from "@/lib/tracking";

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Get client IP for rate limiting and tracking
    const clientIp = getClientIp(request);
    const identifier = clientIp || "unknown";

    // Log incoming request
    logger.logRequest("POST", "/api/submit-lead", {
      ip: clientIp,
      userAgent: request.headers.get("user-agent"),
    });

    // Check rate limit
    const rateLimitResult = rateLimiter.check(identifier);

    if (!rateLimitResult.allowed) {
      logger.logRateLimit(identifier, {
        remaining: rateLimitResult.remaining,
        resetAt: new Date(rateLimitResult.resetAt).toISOString(),
      });

      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
          rateLimit: {
            remaining: rateLimitResult.remaining,
            resetAt: rateLimitResult.resetAt,
          },
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": rateLimitResult.resetAt.toString(),
          },
        }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate input
    const validation = validateLeadSubmission(body);

    if (!validation.success) {
      logger.warn("Validation failed", { errors: validation.errors });
      return NextResponse.json(
        {
          success: false,
          error: validation.error,
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const { name, email, company, message } = validation.data;

    // Check honeypot field (anti-bot protection)
    if (body.website && body.website.trim() !== "") {
      logger.logSecurity("Honeypot triggered - potential bot submission", {
        ip: clientIp,
        email,
        honeypot_value: body.website,
      });

      // Return success to bot but don't actually save
      // This prevents bots from knowing they were caught
      return NextResponse.json(
        {
          success: true,
          message: "Thank you! We'll be in touch soon.",
        },
        { status: 200 }
      );
    }

    // Extract tracking data
    const trackingData = await extractTrackingData(request);
    const source = buildSourceString(trackingData);

    logger.info("Processing lead submission", {
      email,
      source,
      country: trackingData.country,
      device: trackingData.device_type,
    });

    // Insert lead into database with tracking data
    const supabase = getSupabaseAdmin();

    const { data: lead, error: dbError } = await supabase
      .from("leads")
      .insert({
        name,
        email,
        company: company || null,
        message,
        ip: clientIp,
        source,
        status: "new",
        // Tracking fields
        utm_source: trackingData.utm_source,
        utm_medium: trackingData.utm_medium,
        utm_campaign: trackingData.utm_campaign,
        referrer: trackingData.referrer,
        user_agent: trackingData.user_agent,
        device_type: trackingData.device_type,
        country: trackingData.country,
      })
      .select()
      .single();

    if (dbError) {
      logger.error("Database error", dbError, { email });
      return NextResponse.json(
        {
          success: false,
          error: "Failed to save your information. Please try again.",
        },
        { status: 500 }
      );
    }

    logger.logDatabase("INSERT", "leads", { id: lead.id, email });

    // Send thank you email to the user
    const emailResult = await sendThankYouEmail({
      name,
      email,
      company,
    });

    if (!emailResult.success) {
      logger.error("Failed to send thank you email", emailResult.error, { email });
      // Don't fail the request if email fails, just log it
    } else {
      logger.info("Thank you email sent", { email });
    }

    // Send notification to admin (fire and forget)
    sendAdminNotification({
      name,
      email,
      company,
      message,
    }).catch((error) => {
      logger.error("Failed to send admin notification", error, { email });
    });

    const duration = Date.now() - startTime;

    // Log successful response
    logger.logResponse("POST", "/api/submit-lead", 200, duration, {
      leadId: lead.id,
      email,
    });

    // Return success response with rate limit info
    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We'll be in touch soon.",
        data: {
          id: lead.id,
          created_at: lead.created_at,
        },
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": "5",
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": rateLimitResult.resetAt.toString(),
        },
      }
    );
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error("Unexpected error in submit-lead", error);
    logger.logResponse("POST", "/api/submit-lead", 500, duration);

    // Check if it's a JSON parse error
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request format",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: "Method not allowed",
    },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    {
      success: false,
      error: "Method not allowed",
    },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    {
      success: false,
      error: "Method not allowed",
    },
    { status: 405 }
  );
}
