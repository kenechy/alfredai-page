import { z } from "zod";
import {
  isLikelyMaliciousInput,
  sanitizeString,
  sanitizeEmail,
} from "./sanitize";

// Validation schema for lead submission with security checks
export const leadSubmissionSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters")
      .trim()
      .refine(
        (val) => !isLikelyMaliciousInput(val),
        "Name contains invalid characters. Please use only letters and spaces."
      )
      .transform((val) => sanitizeString(val)),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address")
      .max(255, "Email must be less than 255 characters")
      .toLowerCase()
      .trim()
      .transform((val) => sanitizeEmail(val)),
    company: z
      .string()
      .max(100, "Company name must be less than 100 characters")
      .trim()
      .refine(
        (val) => !val || !isLikelyMaliciousInput(val),
        "Company name contains invalid characters. Please use only letters and spaces."
      )
      .transform((val) => (val ? sanitizeString(val) : val))
      .optional(),
    message: z
      .string()
      .min(1, "Message is required")
      .min(10, "Message must be at least 10 characters")
      .max(2000, "Message must be less than 2000 characters")
      .trim()
      .refine(
        (val) => !isLikelyMaliciousInput(val),
        "Message contains invalid characters or patterns. Please use plain text."
      )
      .transform((val) => sanitizeString(val)),
  });

export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;

// Validation result type
export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; errors?: Record<string, string[]> };

// Helper function to validate and return formatted errors
export function validateLeadSubmission(
  data: unknown
): ValidationResult<LeadSubmission> {
  try {
    const validated = leadSubmissionSchema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {};
      const issues = error.issues || [];
      issues.forEach((err) => {
        const path = err.path.join(".");
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(err.message);
      });

      return {
        success: false,
        error: "Validation failed",
        errors,
      };
    }
    return {
      success: false,
      error: "Invalid data format",
    };
  }
}
