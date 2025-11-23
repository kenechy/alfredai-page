/**
 * Environment Variable Validation
 *
 * Validates that all required environment variables are set.
 * Provides helpful error messages for missing variables.
 */

interface EnvConfig {
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  RESEND_API_KEY: string;
  ADMIN_EMAIL: string;
}

type EnvVarName = keyof EnvConfig;

interface ValidationResult {
  valid: boolean;
  missing: EnvVarName[];
  errors: string[];
}

/**
 * Required environment variables with descriptions
 */
const REQUIRED_ENV_VARS: Record<EnvVarName, string> = {
  NEXT_PUBLIC_SUPABASE_URL:
    "Supabase project URL (found in Supabase Dashboard → Settings → API)",
  NEXT_PUBLIC_SUPABASE_ANON_KEY:
    "Supabase anonymous key (found in Supabase Dashboard → Settings → API)",
  SUPABASE_SERVICE_ROLE_KEY:
    "Supabase service role key (found in Supabase Dashboard → Settings → API - keep secret!)",
  RESEND_API_KEY: "Resend API key (found in Resend Dashboard → API Keys)",
  ADMIN_EMAIL: "Email address to receive lead notifications",
};

/**
 * Validate all required environment variables
 */
export function validateEnv(): ValidationResult {
  const missing: EnvVarName[] = [];
  const errors: string[] = [];

  for (const [key, description] of Object.entries(REQUIRED_ENV_VARS)) {
    const value = process.env[key];

    if (!value || value.trim() === "") {
      missing.push(key as EnvVarName);
      errors.push(`Missing ${key}: ${description}`);
    }
  }

  return {
    valid: missing.length === 0,
    missing,
    errors,
  };
}

/**
 * Get environment variable or throw error if missing
 */
export function getEnvVar(name: EnvVarName): string {
  const value = process.env[name];

  if (!value || value.trim() === "") {
    throw new Error(
      `Missing required environment variable: ${name}\n` +
        `Description: ${REQUIRED_ENV_VARS[name]}\n` +
        `Please set this in your .env.local file`
    );
  }

  return value;
}

/**
 * Get all environment variables (validated)
 */
export function getEnv(): EnvConfig {
  const validation = validateEnv();

  if (!validation.valid) {
    const errorMessage =
      `❌ Environment validation failed!\n\n` +
      `Missing ${validation.missing.length} required environment variable(s):\n\n` +
      validation.errors.map((err) => `  • ${err}`).join("\n") +
      `\n\n` +
      `Please check your .env.local file and ensure all required variables are set.\n` +
      `See .env.local.example for a template.\n`;

    throw new Error(errorMessage);
  }

  return {
    NEXT_PUBLIC_SUPABASE_URL: getEnvVar("NEXT_PUBLIC_SUPABASE_URL"),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    SUPABASE_SERVICE_ROLE_KEY: getEnvVar("SUPABASE_SERVICE_ROLE_KEY"),
    RESEND_API_KEY: getEnvVar("RESEND_API_KEY"),
    ADMIN_EMAIL: getEnvVar("ADMIN_EMAIL"),
  };
}

/**
 * Print environment validation status
 */
export function printEnvStatus(): void {
  const validation = validateEnv();

  if (validation.valid) {
    console.log("✅ All required environment variables are set");
  } else {
    console.error("❌ Environment validation failed!");
    console.error(
      `\nMissing ${validation.missing.length} required environment variable(s):\n`
    );
    validation.errors.forEach((error) => {
      console.error(`  • ${error}`);
    });
    console.error("\nPlease check your .env.local file");
  }
}

/**
 * Check if running in development mode
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development";
}

/**
 * Check if running in production mode
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}
