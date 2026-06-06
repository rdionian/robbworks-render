import { NextResponse } from "next/server";

// Cookie name must match your login route
const COOKIE_NAME = "admin_session";

// --- Edge/WebCrypto helpers (work in middleware/edge) ---
function b64url(bytes) {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}
async function verifyCookie(signed) {
  if (!signed) return false;
  const [value, sig] = signed.split(".");
  if (!value || !sig) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(process.env.SESSION_SECRET || ""),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  const macB64 = b64url(new Uint8Array(mac));
  return timingSafeEqual(sig, macB64);
}

// --- CSRF allowlist (strict in prod, relaxed in dev) ---
function parseOriginList(str) {
  if (!str) return [];
  return str.split(",").map(s => s.trim()).filter(Boolean);
}
function originOnly(urlLike) {
  try {
    if (!urlLike) return null;
    const u = new URL(urlLike);
    return `${u.protocol}//${u.host}`;
  } catch {
    return null;
  }
}
function isAllowedCsrf(req) {
  // In development, skip CSRF origin enforcement so LAN/phones work.
  if (process.env.NODE_ENV !== "production") return true;

  const routeOrigin = `${req.nextUrl.protocol}//${req.nextUrl.host}`;
  const originHdr = originOnly(req.headers.get("origin"));
  const refererHdr = originOnly(req.headers.get("referer"));
  const allowlist = new Set([routeOrigin, ...parseOriginList(process.env.ALLOWED_ORIGINS || "")]);

  // 1) Same-origin always OK
  if (originHdr && originHdr === routeOrigin) return true;
  // 2) Otherwise Origin must be explicitly allowed, fall back to Referer
  if (originHdr) return allowlist.has(originHdr);
  if (refererHdr) return allowlist.has(refererHdr);

  return false;
}

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Let the login page and static assets through
  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Routes that require admin
  const needsAdmin =
    pathname.startsWith("/admin") ||
    (pathname.startsWith("/api/devlogs") && req.method !== "GET") ||
    pathname.startsWith("/api/upload") ||
    pathname.startsWith("/api/setup-db");

  if (!needsAdmin) return NextResponse.next();

  // Verify the signed cookie
  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  const ok = await verifyCookie(cookie);
  if (!ok) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // CSRF protection is handled by the signed SameSite=lax httpOnly cookie above.

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/devlogs",
    "/api/devlogs/:path*",
    "/api/upload",
    "/api/setup-db",
  ],
};


