import { NextResponse } from "next/server";
import crypto from "crypto";

// ----- config -----
const COOKIE_NAME = "admin_session";
const SESSION_TTL_SECONDS = 60 * 60; // 1 hour

// ----- tiny signer -----
function sign(value) {
  const secret = process.env.SESSION_SECRET || "";
  const mac = crypto.createHmac("sha256", secret).update(value).digest("base64url");
  return `${value}.${mac}`;
}

// constant-time password compare
function safeEqual(a = "", b = "") {
  const A = Buffer.from(a);
  const B = Buffer.from(b);
  if (A.length !== B.length) return false;
  try { return crypto.timingSafeEqual(A, B); } catch { return false; }
}

// ----- naive in-memory rate limiter (per IP) -----
const attempts = new Map(); // ip -> { n, t }
function rateLimit(ip, limit = 10, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const rec = attempts.get(ip) ?? { n: 0, t: now };
  if (now - rec.t > windowMs) { rec.n = 0; rec.t = now; }
  rec.n++;
  attempts.set(ip, rec);
  return rec.n <= limit;
}

function getClientIp(request) {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  // next/server Request doesn't expose socket; fallback:
  return request.headers.get("x-real-ip") || "unknown";
}

// ----- handler -----
export async function POST(request) {
  try {
    const ip = getClientIp(request);
    if (!rateLimit(ip)) {
      return NextResponse.json({ error: "Too many attempts" }, { status: 429 });
    }

    const { password } = await request.json();
    if (typeof password !== "string") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const envPass = process.env.ADMIN_PASSWORD || "";
    const ok = safeEqual(password, envPass);
    if (!ok) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Minimal session payload: { sid, exp }
    const payload = Buffer.from(JSON.stringify({
      sid: crypto.randomUUID(),
      exp: Date.now() + SESSION_TTL_SECONDS * 1000
    })).toString("base64url");

    const res = NextResponse.json({ success: true });
    res.cookies.set({
      name: COOKIE_NAME,
      value: sign(payload),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",            // you can narrow this later (e.g., "/admin" + protected APIs)
      maxAge: SESSION_TTL_SECONDS,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// Ensure Node.js runtime (Edge lacks crypto.timingSafeEqual HMAC in some setups)
export const runtime = "nodejs";



