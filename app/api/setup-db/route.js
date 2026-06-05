import { sql } from "@vercel/postgres";
import crypto from "crypto";

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

// One-time route to create tables in Vercel Postgres.
// Hit GET /api/setup-db once after deployment, then remove or protect this file.
export async function GET(request) {
  const cookie = getCookie(request, COOKIE_NAME);
  if (!verifySignedCookie(cookie)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS signups (
        id         SERIAL PRIMARY KEY,
        first_name TEXT,
        last_name  TEXT,
        email      TEXT NOT NULL,
        category   TEXT,
        message    TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS log_entries (
        id         SERIAL PRIMARY KEY,
        title      TEXT NOT NULL,
        date       TEXT NOT NULL,
        text_body  TEXT NOT NULL,
        media      TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS technical_logs (
        id                   SERIAL PRIMARY KEY,
        development_progress TEXT,
        game_mechanics       TEXT,
        art_design           TEXT,
        audio                TEXT,
        created_at           TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    return Response.json({ success: true, message: "Tables created." }, { status: 200 });
  } catch (err) {
    console.error("❌ DB setup error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
