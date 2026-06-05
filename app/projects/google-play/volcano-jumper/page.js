"use client";
import Image from "next/image";

export default function VolcanoJumper() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0a0805",
        color: "#e8d5b0",
        fontFamily: "'Georgia', serif",
        overflowX: "hidden",
      }}
    >
      {/* Hero - Store Banner */}
      <div style={{ position: "relative", width: "100%" }}>
        <a
          href="/"
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            zIndex: 10,
            background: "rgba(0, 0, 0, 0.5)",
            border: "1px solid rgba(196, 92, 0, 0.4)",
            padding: "6px 12px",
            color: "#c45c00",
            borderRadius: "6px",
            fontSize: "1.1rem",
            textDecoration: "none",
            transition: "transform 0.2s ease",
          }}
        >
          ← robbworks
        </a>
        <Image
          src="/StoreBanner.png"
          alt="Volcano Jumper"
          width={1024}
          height={500}
          style={{ width: "100%", height: "auto", display: "block", opacity: 0.9 }}
          priority
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80px",
            background: "linear-gradient(to bottom, transparent, #0a0805)",
          }}
        />
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px 80px" }}>

        {/* About the Game */}
        <div style={{ textAlign: "center", padding: "56px 0 48px" }}>
          <p style={{ fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", color: "#c45c00", marginBottom: "12px" }}>
            About the Game
          </p>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: "normal", color: "#fff", margin: "0 0 24px" }}>
            Volcano Jumper
          </h1>
          <p style={{ fontSize: "16px", lineHeight: "1.9", color: "#b09070", maxWidth: "580px", margin: "0 auto 16px" }}>
            The lava is rising. Jump or die.
          </p>
          <p style={{ fontSize: "15px", lineHeight: "1.9", color: "#907060", maxWidth: "580px", margin: "0 auto" }}>
            Volcano Jumper is a fast-paced arcade platformer where every tap could be your last.
            Hop between platforms, climb as high as you can, and outrun the rising lava below.
            Simple to pick up, hard to put down — available on Android.
          </p>
        </div>

        {/* Video */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "56px" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "340px",
              aspectRatio: "9 / 16",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #3a2010",
              boxShadow: "0 0 40px rgba(196, 92, 0, 0.15)",
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/eY9NWsQpGYI?autoplay=1&loop=1&playlist=eY9NWsQpGYI"
              title="Volcano Jumper Gameplay"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #3a2010, transparent)", marginBottom: "48px" }} />

        {/* Download Intro */}
        <div style={{ textAlign: "center", padding: "0 0 48px" }}>
          <p style={{ fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", color: "#c45c00", marginBottom: "12px" }}>
            Now Available
          </p>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 34px)", fontWeight: "normal", color: "#fff", margin: "0 0 16px" }}>
            Download Volcano Jumper
          </h2>
          <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#b09070", maxWidth: "560px", margin: "0 auto" }}>
            Available now for free on Android. We&apos;re always looking to improve—download it, play it, and let us know what you think.
          </p>
        </div>

        {/* Screenshots + What to look for */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "32px",
            marginBottom: "56px",
            alignItems: "start",
          }}
        >
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid #3a2010", flexShrink: 0 }}>
              <Image
                src="/Gameplay_0.png"
                alt="Gameplay screenshot"
                width={150}
                height={267}
                style={{ display: "block", width: "140px", height: "auto" }}
              />
            </div>
            <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid #3a2010", flexShrink: 0 }}>
              <Image
                src="/Gameplay_1.png"
                alt="Gameplay screenshot"
                width={150}
                height={267}
                style={{ display: "block", width: "140px", height: "auto" }}
              />
            </div>
          </div>

          <div>
            <p style={{ fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#c45c00", marginBottom: "16px" }}>
              What to look for
            </p>
            {[
              { title: "Gameplay feel", desc: "Does jumping feel responsive? Is the difficulty fair?" },
              { title: "Performance", desc: "Any lag, stuttering, or unusual battery drain?" },
              { title: "Crashes", desc: "Did the app crash? When and what were you doing?" },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  borderLeft: "2px solid #c45c00",
                  paddingLeft: "14px",
                  marginBottom: "16px",
                }}
              >
                <p style={{ fontSize: "14px", color: "#fff", margin: "0 0 2px", fontStyle: "italic" }}>{item.title}</p>
                <p style={{ fontSize: "13px", color: "#907060", margin: 0, lineHeight: "1.6" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #3a2010, transparent)", marginBottom: "48px" }} />

        {/* Download Section */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <p style={{ fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#c45c00", marginBottom: "8px" }}>
            Download Now
          </p>
          <p style={{ fontSize: "14px", color: "#907060", marginBottom: "24px" }}>
            Get Volcano Jumper for free on Google Play.
          </p>
        </div>

        <div
          style={{
            borderRadius: "8px",
            border: "1px solid #3a2010",
            background: "#0f0a06",
            padding: "24px",
            marginBottom: "56px",
            textAlign: "left",
            maxWidth: "500px",
            margin: "0 auto 56px auto",
          }}
        >
          <ol style={{ color: "#d7c3a5", fontSize: "14px", lineHeight: "1.6" }}>
            <li style={{ marginBottom: "12px" }}>
              Open the Google Play store link:
              <br />
              <a
                href="https://play.google.com/store/apps/details?id=com.robbworks.volcanojumper"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ff8c42" }}
              >
                Open on Google Play
              </a>
            </li>
            <li>
              Install the game and start playing!
            </li>
          </ol>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #3a2010, transparent)", marginBottom: "48px" }} />

        {/* Feedback Form */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <p style={{ fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#c45c00", marginBottom: "8px" }}>
            Share Your Thoughts
          </p>
          <p style={{ fontSize: "14px", color: "#907060", marginBottom: "32px" }}>
            We&apos;d love to hear from you! Share your experience, suggest features, or report any issues.
          </p>
        </div>

        <div
          style={{
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid #3a2010",
            background: "#0f0a06",
          }}
        >
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSeyVuMotKUMn7_FjDFktv0jrMnVqb3ysisszemc9HZJzuzH0A/viewform?embedded=true"
            width="100%"
            height="800"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            style={{ display: "block" }}
          >
            Loading form...
          </iframe>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: "48px", paddingTop: "24px", borderTop: "1px solid #1a0f08" }}>
          <p style={{ fontSize: "12px", color: "#4a3020", margin: "0 0 4px" }}>
            © 2026 robbworks
          </p>
          <a
            href="/projects/google-play/volcano-jumper/privacy"
            style={{ fontSize: "12px", color: "#c45c00", textDecoration: "none" }}
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </main>
  );
}
