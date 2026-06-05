import { sql } from "@vercel/postgres";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { firstName, lastName, email, category, message } = await request.json();

    if (!email) {
      console.error("❌ Missing email field in signup data");
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    await sql`
      INSERT INTO signups (first_name, last_name, email, category, message)
      VALUES (${firstName}, ${lastName}, ${email}, ${category}, ${message})
    `;

    console.log("✅ Insert success");

    // Notify owner of new signup
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (gmailUser && gmailPass) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailPass },
      });

      await transporter.sendMail({
        from: `"RobbWorks Signups" <${gmailUser}>`,
        to: gmailUser,
        subject: `New signup: ${category || "unknown"} — ${firstName || ""} ${lastName || ""}`.trim(),
        text: `New signup received:\n\nFirst Name: ${firstName || ""}\nLast Name: ${lastName || ""}\nEmail: ${email}\nCategory: ${category || ""}\nMessage: ${message || "(none)"}`,
      });

      console.log("📬 Owner notification sent");
    } else {
      console.warn("⚠️ Skipping owner notification: missing Gmail credentials");
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("❌ Server error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
