import crypto from "crypto";

const COOKIE_NAME = "admin_session";

export function getSignedCookie(req) {
  // Next.js route handlers: use headers().get('cookie') OR request.cookies.get in edge;
  const cookie = req.headers.get?.("cookie") || "";
  const m = cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : null;
}

export function verifySignedCookieNode(signed) {
  if (!signed) return false;
  const [value, sig] = signed.split(".");
  if (!value || !sig) return false;
  const mac = crypto
    .createHmac("sha256", process.env.SESSION_SECRET || "")
    .update(value)
    .digest("base64url");
  try {
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(mac));
  } catch {
    return false;
  }
}
