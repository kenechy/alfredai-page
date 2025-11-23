import { z } from "zod";

// Validation schema for lead submission
export const leadSubmissionSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters")
    .toLowerCase()
    .trim(),
  company: z
    .string()
    .max(100, "Company name must be less than 100 characters")
    .trim()
    .optional(),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters")
    .trim(),
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
