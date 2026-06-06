"use client";

import Logbook from "@/components/Logbook/logbook";
import styles from "./moonlit-journey.module.css";

export default function MoonlitJourney() {
  return (
    <main className={styles.pageContainer}>
      {/* Background */}
      <div className={styles.pageBackground}></div>

      <div className={styles.pageWrapper}>
        {/* Hero */}
        <section className={styles.heroSection}>
          <a href="/" className={styles.homeButton}>← Home</a>

          <img
            src="/MoonlitJourney.png"
            alt="Moonlit Journey hero"
            className={styles.heroImage}
          />

          <div className={styles.heroText}>
            <h1>Moonlit Journey</h1>
            <p>A mystical platforming adventure inspired by Japanese folklore.</p>
          </div>
        </section>

        {/* Dev Log */}
        <section className={styles.logbookSection}>
          <Logbook project="moonlit-journey" />
        </section>

        {/* Footer */}
        <footer id="contact" className={styles.footer} style={{ position: "relative" }}>
          <a href="/privacy-policy" style={{ position: "absolute", bottom: "0.75rem", right: "1rem", color: "#444", textDecoration: "none", fontSize: "0.7rem" }}>Privacy Policy</a>
          <div className={styles.footerLinks}>
            <p className={styles.emailCenter}>
              rob@robbworks.dev
            </p>

            <div className={styles.socialIcons}>
              <a
                href="https://www.linkedin.com/in/robert-dionian-a08739235"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2
                  2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/robbworks.dev"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="18" cy="6" r="1" />
                </svg>
              </a>

              <a
                href="https://www.youtube.com/@RobbWorks"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube Devlogs"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4
                  12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2
                  A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33
                  A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46
                  8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0
                  1.94-2 29 29 0 0 0 .46-5.25
                  29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>

          <p className={styles.footerMeta}>
            © 2025 Robert Dionian. Built with Next.js.
          </p>
        </footer>
      </div>
    </main>
  );
}
