import pool from "@/lib/db";
import nodemailer from "nodemailer";
import crypto from "crypto";

export const runtime = "nodejs"; // nodemailer requires Node runtime

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

// ---------- origin / CSRF helpers ----------
function parseOrigins(str) {
  if (!str) return [];
  return str.split(",").map(s => s.trim()).filter(Boolean);
}
function originOnly(urlLike) {
  try {
    if (!urlLike) return null;
    const u = new URL(urlLike);
    return `${u.protocol}//${u.host}`;
  } catch { return null; }
}
function isAllowedOrigin(request) {
  if (process.env.NODE_ENV !== "production") return true;

  const routeOrigin = `${new URL(request.url).protocol}//${new URL(request.url).host}`;
  const originHdr = originOnly(request.headers.get("origin"));
  const refererHdr = originOnly(request.headers.get("referer"));
  const allowlist = new Set([routeOrigin, ...parseOrigins(process.env.ALLOWED_ORIGINS || "")]);

  if (originHdr && originHdr === routeOrigin) return true;
  if (originHdr) return allowlist.has(originHdr);
  if (refererHdr) return allowlist.has(refererHdr);

  return false;
}

// ---------- Email helper ----------
function getTransporter() {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  if (!gmailUser || !gmailPass) return null;

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: gmailUser, pass: gmailPass },
  });
}

// ---------- Media normalization ----------
function extractYouTubeId(input) {
  if (!input || typeof input !== "string") return null;

  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;

  const iframeSrcMatch = input.match(/<iframe[^>]+src="([^"]+)"/i);
  if (iframeSrcMatch) input = iframeSrcMatch[1];

  try {
    const u = new URL(input);
    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace("/", "").trim();
      if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
      const m = u.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
      if (m) return m[1];
    }
  } catch {
    // fall through
  }

  const m = input.match(
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})|youtu\.be\/([a-zA-Z0-9_-]{11})|v=([a-zA-Z0-9_-]{11})/i
  );
  return m ? (m[1] || m[2] || m[3]) : null;
}

function normalizeMedia(mediaIn) {
  let arr = [];
  if (!mediaIn) return arr;

  try {
    if (typeof mediaIn === "string") {
      arr = JSON.parse(mediaIn);
    } else if (Array.isArray(mediaIn)) {
      arr = mediaIn;
    } else {
      arr = [];
    }
  } catch {
    arr = [];
  }

  const out = [];
  for (const item of arr) {
    if (!item || typeof item !== "object") continue;

    const type = item.type === "video" ? "video" : "image";

    if (type === "image") {
      const src = String(item.src || "").trim();
      if (/^https?:\/\//i.test(src)) {
        out.push({ type: "image", src });
      }
    } else {
      const id = extractYouTubeId(String(item.src || "").trim());
      if (id) out.push({ type: "video", src: id });
    }
  }
  return out;
}

export async function POST(request) {
  // 🔐 Require admin cookie
  const cookie = getCookie(request, COOKIE_NAME);
  if (!verifySignedCookie(cookie)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contentType = request.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    return Response.json({ error: "Expected application/json" }, { status: 400 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { title, date, text_body, media } = payload || {};
  if (!title || !date || !text_body) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const normalizedMedia = normalizeMedia(media);

  try {
    const result = await pool.query(
      "INSERT INTO log_entries (title, date, text_body, media) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, date, text_body, JSON.stringify(normalizedMedia)]
    );
    const insertData = result.rows;

    // Send emails to devlog subscribers
    const transporter = getTransporter();
    if (transporter) {
      let subscribers = [];
      try {
        const subResult = await pool.query("SELECT email FROM signups WHERE category = 'devlog'");
        subscribers = subResult.rows;
      } catch {
        subscribers = [];
      }

      if (subscribers.length > 0) {
        const gmailUser = process.env.GMAIL_USER;
        const snippet =
          text_body && text_body.length > 300
            ? text_body.slice(0, 300) + "..."
            : text_body || "";

        const subject = `New Devlog Update — ${title}`;
        const bodyText = `Hello,

A new Devlog entry has just been posted:

🧭 ${title}
📅 ${date}

${snippet}

Read the full update on the site:
https://www.robbworks.dev/projects/moonlit-journey`;

        for (const sub of subscribers) {
          const to = sub?.email;
          if (!to) continue;
          try {
            await transporter.sendMail({
              from: `"Rob from RobbWorks" <${gmailUser}>`,
              to,
              subject,
              text: bodyText,
            });
          } catch (e) {
            console.warn("Email send failed for", to, e?.message || e);
          }
        }
      }
    }

    return Response.json({ success: true, data: insertData }, { status: 200 });
  } catch (err) {
    console.error("🔥 Server error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM log_entries ORDER BY date DESC");
    return Response.json(result.rows, { status: 200 });
  } catch (err) {
    console.error("❌ Server error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}