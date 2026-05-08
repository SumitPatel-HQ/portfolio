import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/gmail";

// ---------------------------------------------------------------------------
// Timeout utility for async operations
// ---------------------------------------------------------------------------
function withTimeout<T>(
  promise: Promise<T>, 
  ms: number, 
  errorMessage: string
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => 
      setTimeout(() => reject(new Error(errorMessage)), ms)
    )
  ]);
}

const EMAIL_TIMEOUT_MS = 30000; // 30 seconds

// ---------------------------------------------------------------------------
// CORS configuration
// ---------------------------------------------------------------------------
const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  "https://your-production-domain.com", // TODO: Update with actual domain
];

function setCorsHeaders(response: NextResponse, origin: string): NextResponse {
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  
  response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  
  return response;
}

// ---------------------------------------------------------------------------
// Rate limiting — in-memory store (1 request per IP per 60 seconds)
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 60_000; // 60 seconds
const CLEANUP_INTERVAL_MS = 5 * 60_000; // Cleanup every 5 minutes

interface RateLimitEntry {
  timestamp: number;
  attempts: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Periodic cleanup to prevent memory leaks
const cleanupInterval = setInterval(() => {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS * 2; // Keep entries for 2x window
  
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (entry.timestamp < cutoff) {
      rateLimitMap.delete(ip);
    }
  }
}, CLEANUP_INTERVAL_MS);

// Ensure cleanup runs on process exit (for graceful shutdown)
if (typeof process !== 'undefined') {
  process.on('SIGTERM', () => clearInterval(cleanupInterval));
  process.on('SIGINT', () => clearInterval(cleanupInterval));
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (entry && now - entry.timestamp < RATE_LIMIT_WINDOW_MS) {
    return true;
  }

  rateLimitMap.set(ip, { 
    timestamp: now, 
    attempts: entry ? entry.attempts + 1 : 1 
  });
  return false;
}

// ---------------------------------------------------------------------------
// Input sanitization — strip all HTML tags from a string
// ---------------------------------------------------------------------------
function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

// ---------------------------------------------------------------------------
// Validation constants
// ---------------------------------------------------------------------------
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 2000;

// ---------------------------------------------------------------------------
// OPTIONS /api/contact (CORS preflight)
// ---------------------------------------------------------------------------
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin") || "";
  const response = new NextResponse(null, { status: 204 });
  return setCorsHeaders(response, origin);
}

// ---------------------------------------------------------------------------
// POST /api/contact
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin") || "";
  
  // 1. Rate limiting
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    const response = NextResponse.json(
      {
        success: false,
        error: "Too many requests. Please wait 60 seconds before trying again.",
      },
      { status: 429 },
    );
    return setCorsHeaders(response, origin);
  }

  try {
    const body = await request.json();
    const { name, email, message, phone } = body;

    // 2. Validate — name
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Name is required." },
        { status: 400 },
      );
    }

    // 3. Validate — email (presence + format)
    if (!email || typeof email !== "string" || email.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 },
      );
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    // 4. Validate — message (presence + max length)
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Message is required." },
        { status: 400 },
      );
    }

    if (message.trim().length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          error: `Message must not exceed ${MAX_MESSAGE_LENGTH} characters.`,
        },
        { status: 400 },
      );
    }

    // 5. Sanitize — strip HTML tags from all user-supplied fields
    const sanitizedName = stripHtml(name);
    const sanitizedEmail = stripHtml(email);
    const sanitizedMessage = stripHtml(message);
    const sanitizedPhone =
      phone && typeof phone === "string" ? stripHtml(phone) : undefined;

    // 6. Send email via Gmail API with timeout
    await withTimeout(
      sendEmail({
        senderName: sanitizedName,
        senderEmail: sanitizedEmail,
        phone: sanitizedPhone,
        message: sanitizedMessage,
      }),
      EMAIL_TIMEOUT_MS,
      "Email sending timed out after 30 seconds"
    );

    const successResponse = NextResponse.json({ success: true });
    return setCorsHeaders(successResponse, origin);
  } catch (error) {
    // Handle timeout specifically
    if (error instanceof Error && error.message.includes("timed out")) {
      const timeoutResponse = NextResponse.json(
        { 
          success: false, 
          error: "Request timed out. Please try again in a moment." 
        },
        { status: 504 }
      );
      return setCorsHeaders(timeoutResponse, origin);
    }

    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred while sending the message.";

    const errorResponse = NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
    return setCorsHeaders(errorResponse, origin);
  }
}
