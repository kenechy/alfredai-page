/**
 * Health Check Endpoint
 *
 * Provides a health check endpoint to verify the application is running
 * and can connect to critical services like the database.
 */

import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic"; // Disable caching for health checks

interface HealthCheckResponse {
  status: "healthy" | "unhealthy";
  timestamp: string;
  uptime: number;
  checks: {
    database: {
      status: "ok" | "error";
      message?: string;
      responseTime?: number;
    };
    environment: {
      status: "ok" | "error";
      message?: string;
    };
  };
}

/**
 * Check database connectivity
 */
async function checkDatabase(): Promise<{
  status: "ok" | "error";
  message?: string;
  responseTime?: number;
}> {
  const startTime = Date.now();

  try {
    const supabase = getSupabaseAdmin();

    // Simple query to check database connection
    const { error } = await supabase
      .from("leads")
      .select("id")
      .limit(1);

    const responseTime = Date.now() - startTime;

    if (error) {
      logger.error("Health check: Database connection failed", error);
      return {
        status: "error",
        message: "Database connection failed",
        responseTime,
      };
    }

    return {
      status: "ok",
      responseTime,
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    logger.error("Health check: Database check threw error", error);

    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error",
      responseTime,
    };
  }
}

/**
 * Check environment variables
 */
function checkEnvironment(): {
  status: "ok" | "error";
  message?: string;
} {
  const required = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "RESEND_API_KEY",
    "ADMIN_EMAIL",
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    return {
      status: "error",
      message: `Missing environment variables: ${missing.join(", ")}`,
    };
  }

  return {
    status: "ok",
  };
}

/**
 * GET /api/health
 *
 * Health check endpoint that verifies:
 * - Application is running
 * - Database connection works
 * - Environment variables are set
 */
export async function GET() {
  try {
    const timestamp = new Date().toISOString();

    // Check database
    const databaseCheck = await checkDatabase();

    // Check environment
    const environmentCheck = checkEnvironment();

    // Determine overall status
    const isHealthy =
      databaseCheck.status === "ok" && environmentCheck.status === "ok";

    const response: HealthCheckResponse = {
      status: isHealthy ? "healthy" : "unhealthy",
      timestamp,
      uptime: process.uptime(),
      checks: {
        database: databaseCheck,
        environment: environmentCheck,
      },
    };

    // Return appropriate status code
    const statusCode = isHealthy ? 200 : 503;

    if (!isHealthy) {
      logger.warn("Health check failed", {
        database: databaseCheck.status,
        environment: environmentCheck.status,
      });
    }

    return NextResponse.json(response, { status: statusCode });
  } catch (error) {
    logger.error("Health check endpoint error", error);

    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        checks: {
          database: {
            status: "error",
            message: "Health check failed",
          },
          environment: {
            status: "error",
            message: "Health check failed",
          },
        },
      } as HealthCheckResponse,
      { status: 503 }
    );
  }
}
