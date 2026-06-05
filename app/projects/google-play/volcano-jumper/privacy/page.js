export default function PrivacyPolicy() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#e8e8e8",
      fontFamily: "'Georgia', serif",
      padding: "60px 24px",
    }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <div style={{ marginBottom: "48px", borderBottom: "1px solid #333", paddingBottom: "32px" }}>
          <p style={{ fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#888", marginBottom: "12px" }}>
            robbworks
          </p>
          <h1 style={{ fontSize: "36px", fontWeight: "normal", margin: "0 0 8px 0", color: "#fff" }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
            Volcano Jumper &mdash; Last updated: March 23, 2026
          </p>
        </div>

        <section style={{ marginBottom: "40px" }}>
          <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#ccc" }}>
            This Privacy Policy describes how robbworks (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) handles information
            in connection with the mobile game <strong style={{ color: "#fff" }}>Volcano Jumper</strong> (the &ldquo;App&rdquo;),
            available on Google Play.
          </p>
        </section>

        <section style={{ marginBottom: "36px" }}>
          <h2 style={{ fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: "#888", marginBottom: "16px" }}>
            Information We Collect
          </h2>
          <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#ccc" }}>
            We do not directly collect, store, or share any personal information from users of Volcano Jumper.
            We do not require account registration, and we do not track your activity outside of the App.
          </p>
        </section>

        <section style={{ marginBottom: "36px" }}>
          <h2 style={{ fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: "#888", marginBottom: "16px" }}>
            Advertising (Google AdMob)
          </h2>
          <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#ccc" }}>
            Volcano Jumper uses Google AdMob to display advertisements. AdMob may collect certain information
            automatically to serve ads, including your device&rsquo;s advertising identifier, IP address, and general
            usage data. This data is collected and processed by Google, not by robbworks.
          </p>
          <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#ccc", marginTop: "12px" }}>
            For more information on how Google uses data from apps that use AdMob, please visit:{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#e07b3c", textDecoration: "none", borderBottom: "1px solid #e07b3c" }}
            >
              Google Privacy Policy
            </a>
          </p>
        </section>

        <section style={{ marginBottom: "36px" }}>
          <h2 style={{ fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: "#888", marginBottom: "16px" }}>
            Children&rsquo;s Privacy
          </h2>
          <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#ccc" }}>
            Volcano Jumper is suitable for all ages. We do not knowingly collect personal information from
            children under the age of 13. If you believe your child has provided personal information through
            the App, please contact us and we will take steps to remove that information.
          </p>
        </section>

        <section style={{ marginBottom: "36px" }}>
          <h2 style={{ fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: "#888", marginBottom: "16px" }}>
            Third-Party Services
          </h2>
          <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#ccc" }}>
            The App may contain links or services provided by third parties (such as Google Play and AdMob).
            These third parties have their own privacy policies and we are not responsible for their practices.
          </p>
        </section>

        <section style={{ marginBottom: "36px" }}>
          <h2 style={{ fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: "#888", marginBottom: "16px" }}>
            Changes to This Policy
          </h2>
          <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#ccc" }}>
            We may update this Privacy Policy from time to time. Any changes will be reflected on this page
            with an updated date. We encourage you to review this policy periodically.
          </p>
        </section>

        <section style={{ marginBottom: "60px" }}>
          <h2 style={{ fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: "#888", marginBottom: "16px" }}>
            Contact Us
          </h2>
          <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#ccc" }}>
            If you have any questions about this Privacy Policy, please contact us at:{" "}
            <a
              href="mailto:rob@robbworks.dev"
              style={{ color: "#e07b3c", textDecoration: "none", borderBottom: "1px solid #e07b3c" }}
            >
              rob@robbworks.dev
            </a>
          </p>
        </section>

        <div style={{ borderTop: "1px solid #222", paddingTop: "24px" }}>
          <p style={{ fontSize: "12px", color: "#555", margin: 0 }}>
            &copy; 2026 robbworks &mdash; robbworks.dev
          </p>
        </div>
      </div>
    </main>
  );
}
