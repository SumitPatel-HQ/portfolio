/**
 * Environment Variable Validation Module
 * Validates required environment variables at application startup
 */

const serverRequiredEnvVars = [
  'GMAIL_CLIENT_ID',
  'GMAIL_CLIENT_SECRET',
  'GMAIL_REFRESH_TOKEN',
  'GMAIL_TO',
  'GMAIL_FROM',
  'IMAGEKIT_PRIVATE_KEY',
] as const;

const publicEnvVars = [
  'NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT',
  'NEXT_PUBLIC_IMAGEKIT_PATH_PREFIX',
  'NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY',
] as const;

const allRequiredEnvVars = [...serverRequiredEnvVars, ...publicEnvVars] as const;

type RequiredEnvVar = typeof allRequiredEnvVars[number];

/**
 * Validates that all required environment variables are present and non-empty.
 * Throws descriptive error if any are missing.
 * Note: On the client, this will only validate NEXT_PUBLIC variables.
 */
export function validateEnvVars(): Record<RequiredEnvVar, string> {
  const isServer = typeof window === 'undefined';
  const missing: string[] = [];
  const env = {} as Record<RequiredEnvVar, string>;
  
  // Explicitly map public variables to support static replacement in client bundles
  const publicValues: Record<string, string | undefined> = {
    NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
    NEXT_PUBLIC_IMAGEKIT_PATH_PREFIX: process.env.NEXT_PUBLIC_IMAGEKIT_PATH_PREFIX,
    NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  };

  if (isServer) {
    // On server, check everything
    for (const name of allRequiredEnvVars) {
      const value = name.startsWith('NEXT_PUBLIC_') ? publicValues[name] : process.env[name];
      if (!value || value.trim().length === 0) {
        missing.push(name);
      } else {
        env[name] = value;
      }
    }
  } else {
    // On client, only check public variables
    for (const name of publicEnvVars) {
      const value = publicValues[name];
      if (!value || value.trim().length === 0) {
        missing.push(name);
      } else {
        env[name] = value;
      }
    }
  }
  
  if (missing.length > 0) {
    // Only throw if we are on the server or if public vars are missing
    if (isServer || missing.some(name => name.startsWith('NEXT_PUBLIC_'))) {
      throw new Error(
        `Missing required environment variables:\n` +
        missing.map(name => `  - ${name}`).join('\n') +
        `\n\nPlease check your .env.local file.`
      );
    }
  }
  
  return env;
}

/**
 * Validates a single environment variable.
 * Returns the value or throws if missing.
 */
export function requireEnv(name: RequiredEnvVar): string {
  const value = name.startsWith('NEXT_PUBLIC_') 
    ? (validateEnvVars() as Record<string, string>)[name] 
    : process.env[name];
    
  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// Validate at module load (fails fast)
// On client, it will only validate public vars
export const env = validateEnvVars();
