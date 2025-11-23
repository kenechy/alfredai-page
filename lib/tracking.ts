/**
 * Advanced Tracking Utility
 *
 * Extracts and processes tracking data including UTM parameters,
 * referrer, device type, and geolocation information.
 */

import { NextRequest } from "next/server";

export interface TrackingData {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
  user_agent: string | null;
  device_type: "mobile" | "tablet" | "desktop" | "unknown";
  country: string | null;
}

/**
 * Extract UTM parameters from request
 */
export function extractUtmParams(request: NextRequest): {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
} {
  const url = new URL(request.url);

  return {
    utm_source: url.searchParams.get("utm_source"),
    utm_medium: url.searchParams.get("utm_medium"),
    utm_campaign: url.searchParams.get("utm_campaign"),
  };
}

/**
 * Extract referrer from request
 */
export function extractReferrer(request: NextRequest): string | null {
  const referer = request.headers.get("referer") || request.headers.get("referrer");

  if (!referer) {
    return null;
  }

  try {
    const refererUrl = new URL(referer);
    const currentUrl = new URL(request.url);

    // Don't count same-site navigation as referrer
    if (refererUrl.hostname === currentUrl.hostname) {
      return null;
    }

    return refererUrl.hostname;
  } catch {
    return referer;
  }
}

/**
 * Detect device type from user agent
 */
export function detectDeviceType(userAgent: string | null): "mobile" | "tablet" | "desktop" | "unknown" {
  if (!userAgent) {
    return "unknown";
  }

  const ua = userAgent.toLowerCase();

  // Check for tablet
  if (
    ua.includes("ipad") ||
    (ua.includes("tablet") && !ua.includes("mobile")) ||
    (ua.includes("android") && !ua.includes("mobile"))
  ) {
    return "tablet";
  }

  // Check for mobile
  if (
    ua.includes("mobile") ||
    ua.includes("iphone") ||
    ua.includes("ipod") ||
    ua.includes("android") ||
    ua.includes("webos") ||
    ua.includes("blackberry") ||
    ua.includes("windows phone")
  ) {
    return "mobile";
  }

  // Default to desktop
  return "desktop";
}

/**
 * Get country from IP address using ipapi.co
 */
export async function getCountryFromIp(ip: string | null): Promise<string | null> {
  if (!ip) {
    return null;
  }

  // Don't try to lookup local/private IPs
  if (
    ip === "localhost" ||
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("192.168.") ||
    ip.startsWith("10.") ||
    ip.startsWith("172.")
  ) {
    return null;
  }

  try {
    const response = await fetch(`https://ipapi.co/${ip}/country_name/`, {
      headers: {
        "User-Agent": "AlfredAI-Landing/1.0",
      },
      // Set a timeout
      signal: AbortSignal.timeout(3000),
    });

    if (!response.ok) {
      return null;
    }

    const country = await response.text();
    return country.trim() || null;
  } catch (error) {
    // Fail silently - geolocation is not critical
    console.error("Failed to get country from IP:", error);
    return null;
  }
}

/**
 * Get client IP address from request
 */
export function getClientIp(request: NextRequest): string | null {
  // Try to get IP from various headers (for proxies/load balancers)
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");

  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, get the first one
    return forwardedFor.split(",")[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  return null;
}

/**
 * Extract all tracking data from request
 */
export async function extractTrackingData(request: NextRequest): Promise<TrackingData> {
  const utmParams = extractUtmParams(request);
  const referrer = extractReferrer(request);
  const userAgent = request.headers.get("user-agent");
  const deviceType = detectDeviceType(userAgent);
  const ip = getClientIp(request);

  // Get country from IP (async, may fail)
  let country: string | null = null;
  try {
    country = await getCountryFromIp(ip);
  } catch (error) {
    console.error("Failed to get country:", error);
  }

  return {
    utm_source: utmParams.utm_source,
    utm_medium: utmParams.utm_medium,
    utm_campaign: utmParams.utm_campaign,
    referrer,
    user_agent: userAgent,
    device_type: deviceType,
    country,
  };
}

/**
 * Build a source string from tracking data
 */
export function buildSourceString(data: Partial<TrackingData>): string {
  if (data.utm_source) {
    return `utm:${data.utm_source}`;
  }

  if (data.referrer) {
    return data.referrer;
  }

  return "direct";
}
