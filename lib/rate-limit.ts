/**
 * Rate Limiting Utility
 *
 * Tracks form submissions per IP address using an in-memory Map.
 * Automatically cleans up old entries to prevent memory leaks.
 */

interface RateLimitEntry {
  count: number;
  firstSubmission: number;
  submissions: number[];
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export class RateLimiter {
  private store: Map<string, RateLimitEntry>;
  private readonly maxRequests: number;
  private readonly windowMs: number;
  private cleanupInterval: NodeJS.Timeout | null;

  constructor(maxRequests: number = 5, windowMs: number = 60 * 60 * 1000) {
    this.store = new Map();
    this.maxRequests = maxRequests;
    this.windowMs = windowMs; // Default: 1 hour
    this.cleanupInterval = null;

    // Start cleanup interval (every 10 minutes)
    this.startCleanup();
  }

  /**
   * Check if a request should be allowed
   */
  check(identifier: string): RateLimitResult {
    const now = Date.now();
    const entry = this.store.get(identifier);

    if (!entry) {
      // First request from this identifier
      this.store.set(identifier, {
        count: 1,
        firstSubmission: now,
        submissions: [now],
      });

      return {
        allowed: true,
        remaining: this.maxRequests - 1,
        resetAt: now + this.windowMs,
      };
    }

    // Remove submissions outside the time window
    const validSubmissions = entry.submissions.filter(
      (timestamp) => now - timestamp < this.windowMs
    );

    // Update entry
    entry.submissions = validSubmissions;
    entry.count = validSubmissions.length;

    if (entry.count === 0) {
      // All submissions expired, reset
      entry.firstSubmission = now;
    }

    // Check if limit exceeded
    if (validSubmissions.length >= this.maxRequests) {
      const oldestSubmission = Math.min(...validSubmissions);
      return {
        allowed: false,
        remaining: 0,
        resetAt: oldestSubmission + this.windowMs,
      };
    }

    // Allow request and record it
    entry.submissions.push(now);
    entry.count = entry.submissions.length;
    this.store.set(identifier, entry);

    const oldestSubmission = Math.min(...entry.submissions);
    return {
      allowed: true,
      remaining: this.maxRequests - entry.count,
      resetAt: oldestSubmission + this.windowMs,
    };
  }

  /**
   * Start periodic cleanup of expired entries
   */
  private startCleanup(): void {
    // Clean up every 10 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 10 * 60 * 1000);
  }

  /**
   * Clean up expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, entry] of this.store.entries()) {
      const validSubmissions = entry.submissions.filter(
        (timestamp) => now - timestamp < this.windowMs
      );

      if (validSubmissions.length === 0) {
        keysToDelete.push(key);
      } else {
        entry.submissions = validSubmissions;
        entry.count = validSubmissions.length;
      }
    }

    keysToDelete.forEach((key) => this.store.delete(key));
  }

  /**
   * Get current stats for an identifier
   */
  getStats(identifier: string): { count: number; resetAt: number } | null {
    const entry = this.store.get(identifier);
    if (!entry || entry.submissions.length === 0) {
      return null;
    }

    const now = Date.now();
    const validSubmissions = entry.submissions.filter(
      (timestamp) => now - timestamp < this.windowMs
    );

    if (validSubmissions.length === 0) {
      return null;
    }

    const oldestSubmission = Math.min(...validSubmissions);
    return {
      count: validSubmissions.length,
      resetAt: oldestSubmission + this.windowMs,
    };
  }

  /**
   * Clear all rate limit data
   */
  clear(): void {
    this.store.clear();
  }

  /**
   * Stop cleanup interval (for testing)
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }
}

// Create a singleton instance with default settings
// 5 submissions per hour per IP
export const rateLimiter = new RateLimiter(5, 60 * 60 * 1000);
