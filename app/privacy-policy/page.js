export const metadata = {
  title: "Privacy Policy | RobbWorks",
  description: "Privacy policy for RobbWorks — how your data is collected and used.",
  alternates: {
    canonical: "https://robbworks.dev/privacy-policy",
  },
};

export default function PrivacyPolicy() {
  return (
    <section className="py-16 px-6 min-h-screen">
      <div className="max-w-[800px] mx-auto">
        <div className="bg-black/70 border border-[rgba(0,191,255,0.3)] shadow-[0_0_25px_rgba(0,191,255,0.3)] rounded-xl p-8 leading-[1.8] text-left">
          <a href="/" className="text-[#444] no-underline text-[0.9rem] inline-block mb-6">← Back</a>
          <h1 style={{ textShadow: "0 0 10px rgba(0,191,255,0.5)" }} className="text-[2.5rem] text-[#00bfff] font-light mb-2 mt-0">
            Privacy Policy
          </h1>
          <p className="text-[#666] text-base mb-8">Last updated: May 2026</p>

          <h2 className="text-[1.3rem] text-white mt-6 mb-2 font-semibold">1. Who We Are</h2>
          <p className="text-[#ccc] text-base mb-4">
            This site is operated by Robert Dionian (RobbWorks) at <strong>robbworks.dev</strong>.
            If you have any questions about this policy, contact us at <strong>rob@robbworks.dev</strong>.
          </p>

          <h2 className="text-[1.3rem] text-white mt-6 mb-2 font-semibold">2. What Data We Collect</h2>
          <p className="text-[#ccc] text-base mb-2">When you submit any form on this site (contact, signup, or web development inquiry), we collect:</p>
          <ul className="text-[#ccc] text-base mb-4 pl-6 list-disc">
            <li>First and last name</li>
            <li>Email address</li>
            <li>Your message or project description</li>
            <li>Category of interest (e.g. devlog updates, web development inquiry)</li>
          </ul>
          <p className="text-[#ccc] text-base mb-2">
            We also collect anonymous usage and performance data automatically via Vercel Analytics and Vercel Speed Insights.
          </p>
          <p className="text-[#ccc] text-base mb-4">
            If you use the live chat widget on the Web Development page, any messages you send are handled by Tawk.to (see Section 4).
          </p>

          <h2 className="text-[1.3rem] text-white mt-6 mb-2 font-semibold">3. How We Use Your Data</h2>
          <ul className="text-[#ccc] text-base mb-4 pl-6 list-disc">
            <li>To send you a welcome email and relevant updates based on the category you selected</li>
            <li>To respond to web development or collaboration inquiries</li>
            <li>To notify the site owner of new form submissions</li>
          </ul>
          <p className="text-[#ccc] text-base mb-4">We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>

          <h2 className="text-[1.3rem] text-white mt-6 mb-2 font-semibold">4. Third-Party Services</h2>
          <ul className="text-[#ccc] text-base mb-4 pl-6 list-disc">
            <li>
              <strong>Vercel Analytics &amp; Speed Insights</strong> — collects anonymized visitor data
              (page views, performance metrics). No personally identifiable information is linked.
            </li>
            <li>
              <strong>Gmail (via Nodemailer)</strong> — used to send transactional emails (welcome
              emails and owner notifications). Your email address is passed through Google&apos;s mail servers.
            </li>
            <li>
              <strong>Tawk.to</strong> — a live chat widget on the Web Development page. If you
              initiate a chat, Tawk.to may collect your name, email, and chat messages per their{" "}
              <a href="https://www.tawk.to/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-[#00bfff]">
                Privacy Policy
              </a>.
            </li>
          </ul>

          <h2 className="text-[1.3rem] text-white mt-6 mb-2 font-semibold">5. Cookies &amp; Local Storage</h2>
          <p className="text-[#ccc] text-base mb-4">
            This site uses browser <strong>localStorage</strong> to remember your audio mute
            preference. No tracking cookies are set by this site directly. Third-party services
            listed above may set their own cookies.
          </p>

          <h2 className="text-[1.3rem] text-white mt-6 mb-2 font-semibold">6. Data Retention</h2>
          <p className="text-[#ccc] text-base mb-4">
            Signup form submissions are stored in a database hosted on Vercel Postgres. Data is
            retained as long as needed to maintain your subscription or inquiry. You may request
            deletion at any time by emailing <strong>rob@robbworks.dev</strong>.
          </p>

          <h2 className="text-[1.3rem] text-white mt-6 mb-2 font-semibold">7. Your Rights</h2>
          <p className="text-[#ccc] text-base mb-2">You have the right to:</p>
          <ul className="text-[#ccc] text-base mb-4 pl-6 list-disc">
            <li>Request access to the personal data we hold about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Withdraw consent at any time by contacting us</li>
          </ul>
          <p className="text-[#ccc] text-base mb-4">
            To exercise any of these rights, email <strong>rob@robbworks.dev</strong>.
          </p>

          <h2 className="text-[1.3rem] text-white mt-6 mb-2 font-semibold">8. Changes to This Policy</h2>
          <p className="text-[#ccc] text-base">
            This policy may be updated occasionally. The date at the top of this page reflects
            the most recent revision.
          </p>
        </div>
      </div>
    </section>
  );
}
