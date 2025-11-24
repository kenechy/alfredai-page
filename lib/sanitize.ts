/**
 * Input Sanitization Utilities
 *
 * Provides protection against SQL injection, XSS, and other malicious inputs.
 * Note: This is a defense-in-depth measure. We primarily rely on:
 * - Prisma ORM for SQL injection protection (parameterized queries)
 * - Zod validation for type safety and input validation
 * - CSP headers for XSS protection
 */

// SQL injection patterns to detect
const SQL_INJECTION_PATTERNS = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|DECLARE)\b)/gi,
  /(--|\;|\/\*|\*\/|xp_|sp_)/gi,
  /('|(--)|;|\/\*|\*\/|@@|@|char|nchar|varchar|nvarchar|alter|begin|cast|create|cursor|declare|delete|drop|end|exec|execute|fetch|insert|kill|select|sys|sysobjects|syscolumns|table|update)/gi,
  /(1=1|1=2|'='|' or '|" or ")/gi,
];

// XSS patterns to detect
const XSS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi, // on* event handlers
  /<embed/gi,
  /<object/gi,
];

// Path traversal patterns
const PATH_TRAVERSAL_PATTERNS = [
  /\.\.\//g,
  /\.\.\\/g,
  /%2e%2e%2f/gi,
  /%2e%2e\//gi,
  /\.\./g,
];

/**
 * Check if input contains SQL injection patterns
 */
export function containsSQLInjection(input: string): boolean {
  return SQL_INJECTION_PATTERNS.some((pattern) => pattern.test(input));
}

/**
 * Check if input contains XSS patterns
 */
export function containsXSS(input: string): boolean {
  return XSS_PATTERNS.some((pattern) => pattern.test(input));
}

/**
 * Check if input contains path traversal patterns
 */
export function containsPathTraversal(input: string): boolean {
  return PATH_TRAVERSAL_PATTERNS.some((pattern) => pattern.test(input));
}

/**
 * Sanitize string by removing dangerous characters and patterns
 * This is a basic sanitization - we rely on Prisma for SQL protection
 */
export function sanitizeString(input: string): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  // Remove null bytes
  let sanitized = input.replace(/\0/g, "");

  // Trim whitespace
  sanitized = sanitized.trim();

  // Remove excessive whitespace
  sanitized = sanitized.replace(/\s+/g, " ");

  return sanitized;
}

/**
 * Escape HTML special characters to prevent XSS
 */
export function escapeHtml(input: string): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  const htmlEscapeMap: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };

  return input.replace(/[&<>"'\/]/g, (char) => htmlEscapeMap[char]);
}

/**
 * Validate and sanitize user input for forms
 * Returns sanitized value or throws error if malicious input detected
 */
export function validateAndSanitizeInput(
  input: string,
  fieldName: string = "Input"
): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  // Check for SQL injection
  if (containsSQLInjection(input)) {
    throw new Error(
      `${fieldName} contains invalid characters. Please remove special SQL characters.`
    );
  }

  // Check for XSS
  if (containsXSS(input)) {
    throw new Error(
      `${fieldName} contains invalid HTML/script tags. Please use plain text only.`
    );
  }

  // Check for path traversal
  if (containsPathTraversal(input)) {
    throw new Error(
      `${fieldName} contains invalid path characters. Please remove them.`
    );
  }

  // Sanitize the input
  return sanitizeString(input);
}

/**
 * Validate email format and sanitize
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== "string") {
    return "";
  }

  // Convert to lowercase and trim
  let sanitized = email.toLowerCase().trim();

  // Remove any characters that aren't valid in email addresses
  sanitized = sanitized.replace(/[^\w\s@.\-+]/gi, "");

  return sanitized;
}

/**
 * Validate URL and sanitize
 */
export function sanitizeUrl(url: string): string {
  if (!url || typeof url !== "string") {
    return "";
  }

  // Only allow http:// and https:// protocols
  const urlPattern = /^https?:\/\//i;

  if (!urlPattern.test(url)) {
    throw new Error("URL must start with http:// or https://");
  }

  // Check for javascript: protocol (XSS vector)
  if (/javascript:/gi.test(url)) {
    throw new Error("Invalid URL protocol");
  }

  return url.trim();
}

/**
 * Comprehensive input validation for lead forms
 */
export function validateLeadInput(data: {
  name: string;
  email: string;
  company?: string;
  message: string;
}): {
  valid: boolean;
  sanitized?: typeof data;
  errors?: string[];
} {
  const errors: string[] = [];

  try {
    const sanitized = {
      name: validateAndSanitizeInput(data.name, "Name"),
      email: sanitizeEmail(data.email),
      company: data.company
        ? validateAndSanitizeInput(data.company, "Company")
        : undefined,
      message: validateAndSanitizeInput(data.message, "Message"),
    };

    // Additional validation
    if (sanitized.name.length < 2) {
      errors.push("Name must be at least 2 characters");
    }

    if (sanitized.name.length > 100) {
      errors.push("Name must be less than 100 characters");
    }

    if (!sanitized.email.includes("@")) {
      errors.push("Invalid email format");
    }

    if (sanitized.message.length < 10) {
      errors.push("Message must be at least 10 characters");
    }

    if (sanitized.message.length > 2000) {
      errors.push("Message must be less than 2000 characters");
    }

    if (errors.length > 0) {
      return { valid: false, errors };
    }

    return { valid: true, sanitized };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Validation failed";
    return { valid: false, errors: [errorMessage] };
  }
}

/**
 * Detect if input looks suspiciously like an attack
 */
export function isLikelyMaliciousInput(input: string): boolean {
  if (!input || typeof input !== "string") {
    return false;
  }

  // Check for common attack patterns
  return (
    containsSQLInjection(input) ||
    containsXSS(input) ||
    containsPathTraversal(input)
  );
}
