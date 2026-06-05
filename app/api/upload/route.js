import { put } from "@vercel/blob";
import crypto from "crypto";

export const runtime = "nodejs";

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

export async function POST(request) {
  // Auth check
  const cookie = getCookie(request, COOKIE_NAME);
  if (!verifySignedCookie(cookie)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    
    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: "public",
    });

    return Response.json({ url: blob.url }, { status: 200 });
  } catch (err) {
    console.error("Upload error:", err);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
