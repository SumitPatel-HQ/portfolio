/**
 * Environment Variable Validation Module
 * Validates required environment variables at application startup
 */

const requiredEnvVars = [
  'GMAIL_CLIENT_ID',
  'GMAIL_CLIENT_SECRET',
  'GMAIL_REFRESH_TOKEN',
  'GMAIL_TO',
  'GMAIL_FROM',
] as const;

type RequiredEnvVar = typeof requiredEnvVars[number];

// interface ValidatedEnv {
//   [key: string]: string;
// }

/**
 * Validates that all required environment variables are present and non-empty.
 * Throws descriptive error if any are missing.
 */
export function validateEnvVars(): Record<RequiredEnvVar, string> {
  const missing: string[] = [];
  const env = {} as Record<RequiredEnvVar, string>;
  
  for (const name of requiredEnvVars) {
    const value = process.env[name];
    if (!value || value.trim().length === 0) {
      missing.push(name);
    } else {
      env[name] = value;
    }
  }
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n` +
      missing.map(name => `  - ${name}`).join('\n') +
      `\n\nPlease check your .env.local file and ensure all Gmail API credentials are configured.`
    );
  }
  
  return env;
}

/**
 * Validates a single environment variable.
 * Returns the value or throws if missing.
 */
export function requireEnv(name: RequiredEnvVar): string {
  const value = process.env[name];
  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// Validate at module load (fails fast)
export const env = validateEnvVars();
