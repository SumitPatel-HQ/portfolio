import { google } from "googleapis";
import { render } from "@react-email/render";
import { PortfolioContactEmail } from "@/components/Contacts/emails/PortfolioContactEmail";
import React from "react";
import { env } from "./env";

const oauth2Client = new google.auth.OAuth2(
  env.GMAIL_CLIENT_ID,
  env.GMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground",
);

oauth2Client.setCredentials({
  refresh_token: env.GMAIL_REFRESH_TOKEN,
});

// Cache the access token for 55 min (tokens are valid for 60 min; 5-min
// buffer ensures we never use a token that expires mid-request).
const TOKEN_TTL_MS = 55 * 60 * 1000;
let cachedAccessToken: string | null = null;
let tokenExpiresAt = 0;

// Reuse a single gmail client instance across calls.
const gmail = google.gmail({ version: "v1", auth: oauth2Client });

interface SendEmailParams {
  senderName: string;
  senderEmail: string;
  phone?: string;
  message: string;
}

// Cache for rendered email templates (avoids re-rendering identical emails)
interface CachedRender {
  html: string;
  text: string;
  timestamp: number;
}

const renderCache = new Map<string, CachedRender>();
const RENDER_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_SIZE = 50;

function getCacheKey(params: SendEmailParams): string {
  // Create cache key from message content (first 200 chars)
  return JSON.stringify({
    senderName: params.senderName,
    senderEmail: params.senderEmail,
    phone: params.phone,
    messagePreview: params.message.slice(0, 200),
  });
}

function cleanupRenderCache(): void {
  const now = Date.now();
  const cutoff = now - RENDER_CACHE_TTL_MS;
  
  for (const [key, entry] of renderCache.entries()) {
    if (entry.timestamp < cutoff) {
      renderCache.delete(key);
    }
  }
}

async function renderEmailTemplate(params: SendEmailParams): Promise<{ html: string; text: string }> {
  const cacheKey = getCacheKey(params);
  const cached = renderCache.get(cacheKey);
  
  // Return cached if still valid
  if (cached && Date.now() - cached.timestamp < RENDER_CACHE_TTL_MS) {
    return { html: cached.html, text: cached.text };
  }
  
  // Clean up old entries if cache is full
  if (renderCache.size >= MAX_CACHE_SIZE) {
    cleanupRenderCache();
    
    // If still full, remove oldest entry
    if (renderCache.size >= MAX_CACHE_SIZE) {
      const firstKey = renderCache.keys().next().value;
      if (firstKey) renderCache.delete(firstKey);
    }
  }
  
  // Render fresh
  const emailElement = React.createElement(PortfolioContactEmail, params);
  
  const [html, text] = await Promise.all([
    render(emailElement),
    render(emailElement, { plainText: true })
  ]);
  
  const result = { html, text, timestamp: Date.now() };
  renderCache.set(cacheKey, result);
  
  return { html, text };
}

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  
  // Return cached token if still valid
  if (cachedAccessToken && now < tokenExpiresAt) {
    return cachedAccessToken;
  }

  try {
    const response = await oauth2Client.getAccessToken();
    const token = response.token;

    if (!token || typeof token !== 'string') {
      throw new Error('Invalid or missing access token in OAuth2 response');
    }

    cachedAccessToken = token;
    tokenExpiresAt = now + TOKEN_TTL_MS;
    oauth2Client.setCredentials({ access_token: token });

    return token;
  } catch (error) {
    // Clear stale cache on any error to force fresh retry
    cachedAccessToken = null;
    tokenExpiresAt = 0;
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Unknown error during token refresh';
    
    // Log for debugging (in production, use proper logger)
    console.error('[Gmail] Token refresh failed:', errorMessage);
    
    throw new Error(`Failed to refresh Gmail access token: ${errorMessage}`);
  }
}

export async function sendEmail({
  senderName,
  senderEmail,
  phone,
  message,
}: SendEmailParams): Promise<void> {
  // env vars are already validated at module load
  const GMAIL_TO = env.GMAIL_TO;
  const GMAIL_FROM = env.GMAIL_FROM;

  try {
    await getAccessToken();

    const { html: htmlBody, text: textBody } = await renderEmailTemplate({
      senderName,
      senderEmail,
      phone,
      message,
    });

    const textBodyBase64 = Buffer.from(textBody).toString("base64").match(/.{1,76}/g)?.join("\r\n") || "";
    const htmlBodyBase64 = Buffer.from(htmlBody).toString("base64").match(/.{1,76}/g)?.join("\r\n") || "";

    const boundary = `----=_Part_${Math.random().toString(36).substring(2)}_${Date.now()}`;
    const date = new Date().toUTCString();
    const messageId = `<${Date.now()}.${Math.random().toString(36).substring(2)}@gmail.com>`;
    const escapedName = senderName.replace(/[\\"]/g, "");

    const rawMessage = [
      `To: ${GMAIL_TO}`,
      `From: "Sumit's Portfolio" <${GMAIL_FROM}>`,
      `Reply-To: "${escapedName}" <${senderEmail}>`,
      `Subject: New contact from Portfolio : ${escapedName}`,
      `Date: ${date}`,
      `Message-ID: ${messageId}`,
      "MIME-Version: 1.0",
      "X-Priority: 1 (Highest)",
      "Priority: urgent",
      "Importance: high",
      "X-Mailer: Portfolio-Contact-System",
      `X-Entity-Ref-ID: ${Date.now()}`,
      "Thread-Topic: New contact from Portfolio",
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      "",
      `--${boundary}`,
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: base64",
      "",
      textBodyBase64,
      "",
      `--${boundary}`,
      "Content-Type: text/html; charset=UTF-8",
      "Content-Transfer-Encoding: base64",
      "",
      htmlBodyBase64,
      "",
      `--${boundary}--`,
    ].join("\r\n");

    const encodedMessage = Buffer.from(rawMessage)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error sending email";
    throw new Error(`Failed to send email: ${message}`);
  }
}
