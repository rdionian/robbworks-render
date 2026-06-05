import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, firstName, category } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Missing email address" }), {
        status: 400,
      });
    }

    // ✅ Use local or network environment variables
    const gmailUser = process.env.GMAIL_USER || process.env.NEXT_PUBLIC_GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.NEXT_PUBLIC_GMAIL_APP_PASSWORD;
    const gmailFrom = process.env.GMAIL_FROM || gmailUser;

    if (!gmailUser || !gmailPass) {
      console.error("❌ Missing Gmail credentials in environment variables");
      return new Response(
        JSON.stringify({ error: "Missing email credentials" }),
        { status: 500 }
      );
    }

    // 🔹 Create the transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    // 🔹 Customize message based on category
    let bodyText = "";

    console.log("📨 Raw category received:", category);
    let normalizedCategory = (category || "").trim().toLowerCase();
    console.log("✅ Normalized category:", normalizedCategory);

switch (normalizedCategory) {
  case "devlog":
    bodyText = `Hello ${firstName || ""},

Thanks for signing up for Devlog Updates! I'll be sharing behind-the-scenes progress, technical breakdowns, and design insights as I continue work on my projects.

Stay tuned — updates are on the way!

Best Regards,
Robert Dionian
Software Engineer | Game Developer`;
    break;

  case "newsletter":
    bodyText = `Hello ${firstName || ""},

Thanks for joining the RobbWorks newsletter! You'll get general updates, new releases, and thoughts on the creative process behind my games.

Best Regards,
Robert Dionian
Software Engineer | Game Developer`;
    break;

  case "earlyaccess":
    bodyText = `Hello ${firstName || ""},

Awesome — you're on the early access list! You'll be the first to know about playtesting opportunities and early builds.

I'll be in touch soon with details.

Best Regards,
Robert Dionian
Software Engineer | Game Developer`;
    break;

  case "collaboration":
    bodyText = `Hello ${firstName || ""},

Thanks so much for reaching out about collaborating! I'd love to learn more about how we could work together.

If you have a portfolio, demo reel, or any examples of your work, feel free to send them my way so I can get a better sense of your style and experience.

Talk soon,
Robert Dionian
Software Engineer | Game Developer`;
    break;

  case "webdevelopment":
    bodyText = `Hello ${firstName || ""},

Thanks for reaching out about a website! I'd love to hear more about what you're looking for.

Feel free to reply with a few details — what kind of site you need, any examples you like, and a rough timeline if you have one. That'll help me put together the right approach for you.

Talk soon,
Robert Dionian
Software Engineer | Web & Game Developer`;
    break;

  default:
    bodyText = `Hello ${firstName || ""},

Thanks for signing up and reaching out! I'll be in touch soon with updates.

Best Regards,
Robert Dionian
Software Engineer | Game Developer`;
    break;
}
    // 🔹 Compose the message
    const mailOptions = {
      from: `"Rob from RobbWorks" <${gmailFrom}>`,
      to: email,
      subject: "Thanks for signing up!",
      text: bodyText,
    };

    // 🔹 Send it
    await transporter.sendMail(mailOptions);

    console.log(`📧 Email sent to ${email} for category: ${category}`);

    return new Response(
      JSON.stringify({ message: "Email sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return new Response(JSON.stringify({ error: "Failed to send email." }), {
      status: 500,
    });
  }
}
