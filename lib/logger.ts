/**
 * Structured Logging Utility
 *
 * Simple logging utility with different log levels and structured output.
 * Includes timestamps and supports additional metadata.
 */

export type LogLevel = "info" | "warn" | "error" | "debug";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  metadata?: Record<string, unknown>;
}

class Logger {
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === "development";
  }

  /**
   * Format log entry as JSON
   */
  private formatLog(entry: LogEntry): string {
    return JSON.stringify({
      ...entry,
      timestamp: new Date(entry.timestamp).toISOString(),
    });
  }

  /**
   * Get current timestamp
   */
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  /**
   * Log a message at the specified level
   */
  private log(level: LogLevel, message: string, metadata?: Record<string, unknown>): void {
    const entry: LogEntry = {
      timestamp: this.getTimestamp(),
      level,
      message,
      ...(metadata && { metadata }),
    };

    // In development, use pretty printing
    if (this.isDevelopment) {
      const emoji = {
        info: "ℹ️",
        warn: "⚠️",
        error: "❌",
        debug: "🐛",
      }[level];

      console[level === "error" ? "error" : level === "warn" ? "warn" : "log"](
        `${emoji} [${level.toUpperCase()}] ${message}`,
        metadata || ""
      );
    } else {
      // In production, use structured JSON logging
      console.log(this.formatLog(entry));
    }
  }

  /**
   * Log an info message
   */
  info(message: string, metadata?: Record<string, unknown>): void {
    this.log("info", message, metadata);
  }

  /**
   * Log a warning message
   */
  warn(message: string, metadata?: Record<string, unknown>): void {
    this.log("warn", message, metadata);
  }

  /**
   * Log an error message
   */
  error(message: string, error?: Error | unknown, metadata?: Record<string, unknown>): void {
    let errorMetadata: Record<string, unknown> = {
      ...metadata,
    };

    if (error instanceof Error) {
      errorMetadata = {
        ...errorMetadata,
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      };
    } else if (error) {
      errorMetadata = {
        ...errorMetadata,
        error: String(error),
      };
    }

    this.log("error", message, errorMetadata);
  }

  /**
   * Log a debug message (only in development)
   */
  debug(message: string, metadata?: Record<string, unknown>): void {
    if (this.isDevelopment) {
      this.log("debug", message, metadata);
    }
  }

  /**
   * Log an API request
   */
  logRequest(method: string, path: string, metadata?: Record<string, unknown>): void {
    this.info(`API Request: ${method} ${path}`, metadata);
  }

  /**
   * Log an API response
   */
  logResponse(
    method: string,
    path: string,
    status: number,
    duration?: number,
    metadata?: Record<string, unknown>
  ): void {
    this.info(`API Response: ${method} ${path} - ${status}`, {
      status,
      ...(duration && { duration: `${duration}ms` }),
      ...metadata,
    });
  }

  /**
   * Log a rate limit violation
   */
  logRateLimit(identifier: string, metadata?: Record<string, unknown>): void {
    this.warn(`Rate limit exceeded for: ${identifier}`, metadata);
  }

  /**
   * Log a database operation
   */
  logDatabase(operation: string, table?: string, metadata?: Record<string, unknown>): void {
    this.info(`Database: ${operation}${table ? ` on ${table}` : ""}`, metadata);
  }

  /**
   * Log a security event
   */
  logSecurity(event: string, metadata?: Record<string, unknown>): void {
    this.warn(`Security Event: ${event}`, metadata);
  }
}

// Export singleton instance
export const logger = new Logger();
