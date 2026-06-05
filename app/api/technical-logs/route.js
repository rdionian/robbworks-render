import { sql } from "@vercel/postgres";
import crypto from "crypto";

export const runtime = "nodejs";

// ---------- auth helpers (match your login/middleware) ----------
const COOKIE_NAME = "admin_session";

function getCookie(req, name) {
  const raw = req.headers.get("cookie") || "";
  const m = raw.match(new RegExp(`${name}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : null;
}

function verifySignedCookie(signed) {
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

export async function GET() {
  try {
    const result = await sql`SELECT * FROM technical_logs ORDER BY created_at DESC`;
    return Response.json(result.rows, { status: 200 });
  } catch (err) {
    console.error("❌ Server error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request) {
  const cookie = getCookie(request, COOKIE_NAME);
  if (!verifySignedCookie(cookie)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { developmentProgress, gameMechanics, artDesign, audio } = payload;

  try {
    const result = await sql`
      INSERT INTO technical_logs (development_progress, game_mechanics, art_design, audio)
      VALUES (${developmentProgress}, ${gameMechanics}, ${artDesign}, ${audio})
      RETURNING *
    `;
    return Response.json({ success: true, data: result.rows }, { status: 200 });
  } catch (err) {
    console.error("❌ Server error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
