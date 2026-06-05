"use client";
import { useState } from "react";
import Script from "next/script";

const techs = [
  {
    id: "nextjs",
    label: "Next.js",
    description: "The framework I build all sites with. It's fast, SEO-friendly, and makes your site easy to maintain and scale as your business grows.",
  },
  {
    id: "react",
    label: "React",
    description: "The technology that powers the interactive elements of your site. It keeps everything running smoothly and efficiently under the hood.",
  },
  {
    id: "vercel",
    label: "Vercel",
    description: "Where your site lives. Fast, reliable hosting with automatic updates every time a change is made — no downtime, no hassle.",
  },
  {
    id: "github",
    label: "GitHub",
    description: "Where your site's code is stored and version controlled. Every change is tracked, so nothing is ever lost and your site can always be rolled back if needed.",
  },
];

export default function WebDevelopment() {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTech, setActiveTech] = useState(techs[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setIsSubmitting(true);

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.category = "webdevelopment";

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit");

      try {
        await fetch("/api/send-welcome-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: data.email, firstName: data.firstName, category: data.category }),
        });
      } catch (emailErr) {
        console.error("Email send failed:", emailErr);
      }

      setStatus("success");
      setMessage("Thanks for reaching out! I'll be in touch soon.");
      form.reset();
      setTimeout(() => setStatus(null), 5000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-[#1a1a1a] min-h-screen font-[inherit]">

      {/* Nav */}
      <nav className="fixed top-0 w-full bg-[rgba(245,245,244,0.92)] backdrop-blur-md border-b border-[#e2e2e0] z-[100] max-[768px]:hidden">
        <a href="/" className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 no-underline">
          <img src="/logo.png" alt="RobbWorks" className="h-7 w-auto" />
          <span className="text-[#1a1a1a] font-bold text-[0.9rem] tracking-[0.02em]">robbworks</span>
        </a>
        <ul className="list-none flex justify-center gap-0 py-4 m-0 p-0">
          <li className="mx-4"><a href="/#about" className="text-[#444] no-underline font-bold text-[0.9rem] tracking-[0.02em] hover:text-[#1a1a1a] transition-colors">About</a></li>
          <li className="mx-4"><a href="/#portfolio" className="text-[#444] no-underline font-bold text-[0.9rem] tracking-[0.02em] hover:text-[#1a1a1a] transition-colors">Portfolio</a></li>
          <li className="mx-4"><a href="/projects/google-play/volcano-jumper" className="text-[#444] no-underline font-bold text-[0.9rem] tracking-[0.02em] hover:text-[#1a1a1a] transition-colors">Mobile</a></li>
          <li className="mx-4"><a href="/#development" className="text-[#444] no-underline font-bold text-[0.9rem] tracking-[0.02em] hover:text-[#1a1a1a] transition-colors">Development</a></li>
          <li className="mx-4"><a href="/bot" className="text-[#444] no-underline font-bold text-[0.9rem] tracking-[0.02em] hover:text-[#1a1a1a] transition-colors">Discord Bot</a></li>
          <li className="mx-4"><a href="/web-development" className="text-[#1a1a1a] no-underline font-bold text-[0.9rem] tracking-[0.02em]">Web Dev</a></li>
          <li className="mx-4"><a href="/#contact" className="text-[#444] no-underline font-bold text-[0.9rem] tracking-[0.02em] hover:text-[#1a1a1a] transition-colors">Contact</a></li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="pt-[10rem] pb-[6rem] px-8 text-center bg-[#1e2d3d] max-[768px]:pt-[7rem] max-[768px]:pb-[4rem] max-[768px]:px-6">
        <h1 className="text-[2.6rem] font-bold leading-[1.25] text-[#f0f0f0] mx-auto mb-5 max-w-[500px] tracking-[-0.02em] max-[768px]:text-[1.9rem]">Custom Websites for Creatives &amp; Small Businesses</h1>
        <p className="text-[1.15rem] text-white/60 leading-[1.7] max-w-[560px] mx-auto m-0">Clean, fast, and built to fit your brand.</p>
      </section>

      {/* About */}
      <section className="py-[7rem] px-8 max-w-[960px] mx-auto max-[768px]:py-[5rem] max-[768px]:px-6">
        <p className="text-[0.75rem] font-bold tracking-[0.1em] uppercase text-[#1a1a1a] mb-10">A Little About Me</p>
        <div className="max-w-[640px] flex flex-col gap-4">
          <p className="text-base text-[#444] leading-[1.75] m-0">Hey, I'm Rob — a solo developer based in Florida who builds custom websites for small businesses and creatives. When you work with me you get one person dedicated to your project from the first conversation to launch day and beyond.</p>
          <p className="text-base text-[#444] leading-[1.75] m-0">I come from a game development background which means I think about user experience and design differently than most developers — every site I build is crafted to feel good to use.</p>
        </div>
      </section>

      {/* Services */}
      <section className="py-[7rem] px-8 max-w-[960px] mx-auto max-[768px]:py-[5rem] max-[768px]:px-6">
        <p className="text-[0.75rem] font-bold tracking-[0.1em] uppercase text-[#1a1a1a] mb-10">Services</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 max-[768px]:grid-cols-1">
          {[
            { title: "Custom Website", desc: "Built from scratch to fit your brand. No templates, no page builders." },
            { title: "Vercel Hosting", desc: "Fast, reliable hosting with automatic deployments on every update." },
            { title: "Domain Setup", desc: "Full domain configuration so everything is connected and ready to go." },
            { title: "Contact Forms", desc: "Functional forms that route inquiries directly to your inbox." },
            { title: "Admin Panel", desc: "Optional dashboard so you can update your own content without touching code." },
            { title: "Maintenance Retainer", desc: "Ongoing support for updates, fixes, and minor changes as your site evolves." },
            { title: "SEO", desc: "Your site is built with search engines in mind — proper metadata, fast load times, and clean structure so you can be found." },
          ].map((s) => (
            <div key={s.title} className="bg-white border border-[#e2e2e0] rounded-[10px] p-7 hover:border-[#aaa] transition-colors">
              <h3 className="text-base font-semibold text-[#1a1a1a] mb-2 mt-0">{s.title}</h3>
              <p className="text-[0.9rem] text-[#777] leading-[1.6] m-0">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <div className="bg-[#f8f8f8] w-full">
        <section className="py-[7rem] px-8 max-w-[960px] mx-auto max-[768px]:py-[5rem] max-[768px]:px-6">
          <p className="text-[0.75rem] font-bold tracking-[0.1em] uppercase text-[#1a1a1a] mb-10">Projects</p>

          {[
            { img: "/MainMenuBackground_1.png", alt: "robbworks.dev preview", name: "robbworks.dev", href: "https://robbworks.dev", desc: "My own portfolio — a full stack Next.js site featuring a custom admin panel, Discord bot integration, automated emails, and a dev logbook. Built and maintained by me." },
            { img: "/artfully-undead-hero.png", alt: "Artfully Undead preview", name: "Artfully Undead", href: "https://artfully-undead.vercel.app/", desc: "Artist portfolio — categorized gallery and contact form with automated email delivery. Built with Next.js." },
            { img: "/robblog.png", alt: "Robb Blog Preview", name: "Concert Travel Blog", href: "https://concert-travel.vercel.app", desc: "Travel and concert blog built with Next.js 15, TypeScript, and Tailwind CSS, powered by Sanity CMS. Features dynamic blog posts with rich text and photo galleries, a Sanity studio for content management, and automatic Vercel deployment on publish." },
            { img: "/TrollingMotorGuy.jpg", alt: "The Trolling Motor Guy preview", name: "The Trolling Motor Guy", href: "https://www.thetrollingmotorguy.com/", desc: "A business site for a Minn Kota authorized repair center and motor dealer in Bradenton, FL, built with Next.js 15, TypeScript, and Tailwind CSS. Features a Sanity CMS studio for managing motor listings, contact form emails handled by Resend, and deployed on Render." },
            { img: "/BlushVault.jpg", alt: "Blush Vault preview", name: "Blush Vault", href: "https://www.blushvault.shop/", desc: "Beauty and jewelry e-commerce store built with Next.js, TypeScript, and Tailwind CSS, backed by PostgreSQL and Prisma. Features a custom admin dashboard for product and order management, automated order fulfillment, Stripe payments, and transactional email via Resend." },
          ].map((p, i) => (
            <div key={p.name} className={`bg-white border border-[#e2e2e0] rounded-[10px] overflow-hidden flex flex-row hover:-translate-y-[5px] hover:shadow-[0_14px_36px_rgba(30,45,61,0.18)] transition-all duration-200 max-[768px]:flex-col ${i > 0 ? "mt-6" : ""}`}>
              <img src={p.img} alt={p.alt} className="w-[200px] min-w-[200px] object-cover block bg-[#e8e8e6] border-r border-[#e2e2e0] max-[768px]:w-full max-[768px]:min-w-0 max-[768px]:h-[180px] max-[768px]:border-r-0 max-[768px]:border-b" />
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-center gap-4 px-6 pt-6 pb-5 border-b border-[#e2e2e0]">
                  <p className="text-base font-semibold text-[#1a1a1a] m-0">{p.name}</p>
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="text-[0.85rem] font-semibold text-[#1a1a1a] no-underline whitespace-nowrap border-b border-[#1a1a1a] pb-px hover:opacity-50 transition-opacity">Visit Site</a>
                </div>
                <p className="text-[0.9rem] text-[#555] leading-[1.7] px-6 pt-5 pb-6 m-0">{p.desc}</p>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Technologies */}
      <section className="py-[7rem] px-8 max-w-[960px] mx-auto max-[768px]:py-[5rem] max-[768px]:px-6">
        <p className="text-[0.75rem] font-bold tracking-[0.1em] uppercase text-[#1a1a1a] mb-10">Technologies</p>
        <div className="flex border border-[#e2e2e0] rounded-[10px] overflow-hidden min-h-[200px] max-[768px]:flex-col max-[768px]:min-h-0">
          <ul className="list-none p-0 m-0 w-[180px] shrink-0 border-r border-[#e2e2e0] max-[768px]:w-full max-[768px]:border-r-0 max-[768px]:border-b max-[768px]:flex max-[768px]:flex-wrap">
            {techs.map((tech) => (
              <li
                key={tech.id}
                onClick={() => setActiveTech(tech)}
                className={`px-5 py-[0.9rem] text-[0.9rem] cursor-pointer select-none transition-all duration-150 border-l-[3px] hover:bg-[#f8f8f8] hover:text-[#1a1a1a] [&+li]:border-t [&+li]:border-[#e2e2e0] max-[768px]:border-l-0 max-[768px]:border-b-[3px] max-[768px]:flex-1 max-[768px]:text-center max-[768px]:[&+li]:border-t-0 max-[768px]:[&+li]:border-l max-[768px]:[&+li]:border-[#e2e2e0] ${activeTech.id === tech.id ? "bg-[#f8f8f8] text-[#1a1a1a] font-semibold border-l-[#1a1a1a] max-[768px]:border-l-transparent max-[768px]:border-b-[#1a1a1a]" : "text-[#777] border-l-transparent max-[768px]:border-b-transparent"}`}
              >
                {tech.label}
              </li>
            ))}
          </ul>
          <div className="flex-1 px-9 py-8 flex flex-col justify-center max-[768px]:px-6 max-[768px]:py-6">
            <h3 className="text-base font-semibold text-[#1a1a1a] mt-0 mb-[0.6rem]">{activeTech.label}</h3>
            <p className="text-[0.9rem] text-[#666] leading-[1.7] m-0 max-w-[500px]">{activeTech.description}</p>
          </div>
        </div>
      </section>

      {/* Process */}
      <div className="bg-[#f8f8f8] w-full">
        <section className="py-[7rem] px-8 max-w-[960px] mx-auto max-[768px]:py-[5rem] max-[768px]:px-6">
          <p className="text-[0.75rem] font-bold tracking-[0.1em] uppercase text-[#1a1a1a] mb-10">Process</p>
          <div className="flex gap-5 mb-5 max-[768px]:flex-col max-[768px]:gap-4">
            {[
              { num: "01", title: "Discovery", desc: "We talk about your goals, your brand, and what you need from your site." },
              { num: "02", title: "Design", desc: "I put together a visual mockup so you can see exactly what you're getting before anything is built." },
              { num: "03", title: "Build", desc: "I develop your site and keep you updated throughout the process." },
            ].map((s) => (
              <div key={s.num} className="bg-white border border-[#e2e2e0] rounded-lg px-11 py-10 w-full hover:-translate-y-[5px] hover:shadow-[0_14px_36px_rgba(30,45,61,0.18)] transition-all duration-200">
                <span className="block text-[1.5rem] font-bold text-[#1e2d3d] leading-none mb-[0.65rem] tracking-[-0.02em]">{s.num}</span>
                <h3 className="text-base font-semibold text-[#1e2d3d] mt-0 mb-2">{s.title}</h3>
                <p className="text-[0.9rem] text-[#666] leading-[1.65] m-0">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-5 justify-center max-[768px]:flex-col max-[768px]:gap-4">
            {[
              { num: "04", title: "Testing", desc: "Your site is tested across devices and browsers to make sure everything looks and works perfectly." },
              { num: "05", title: "Launch", desc: "I handle deployment and domain setup so your site goes live without a hitch." },
            ].map((s) => (
              <div key={s.num} className="bg-white border border-[#e2e2e0] rounded-lg px-11 py-10 flex-[0_0_calc((100%-2*1.25rem)/3)] max-[768px]:flex-1 hover:-translate-y-[5px] hover:shadow-[0_14px_36px_rgba(30,45,61,0.18)] transition-all duration-200">
                <span className="block text-[1.5rem] font-bold text-[#1e2d3d] leading-none mb-[0.65rem] tracking-[-0.02em]">{s.num}</span>
                <h3 className="text-base font-semibold text-[#1e2d3d] mt-0 mb-2">{s.title}</h3>
                <p className="text-[0.9rem] text-[#666] leading-[1.65] m-0">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Contact */}
      <section className="py-[5rem] px-8 pb-[7rem] bg-[#1e2d3d]">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="text-[2rem] font-bold text-[#f0f0f0] mb-3 tracking-[-0.02em] mt-0">Ready to get started?</h2>
          <p className="text-base text-white/55 mb-10 mt-0">Tell me about your project and I'll get back to you.</p>
          <form className="flex flex-col gap-4 text-left" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 max-[768px]:grid-cols-1">
              <input type="text" name="firstName" placeholder="First Name" required className="w-full px-4 py-[0.85rem] border border-[#e2e2e0] rounded-lg bg-[#f8f8f8] text-[#1a1a1a] text-[0.9rem] font-[inherit] outline-none focus:border-[#aaa] transition-colors placeholder:text-[#aaa]" />
              <input type="text" name="lastName" placeholder="Last Name" required className="w-full px-4 py-[0.85rem] border border-[#e2e2e0] rounded-lg bg-[#f8f8f8] text-[#1a1a1a] text-[0.9rem] font-[inherit] outline-none focus:border-[#aaa] transition-colors placeholder:text-[#aaa]" />
            </div>
            <input type="email" name="email" placeholder="Email Address" required className="w-full px-4 py-[0.85rem] border border-[#e2e2e0] rounded-lg bg-[#f8f8f8] text-[#1a1a1a] text-[0.9rem] font-[inherit] outline-none focus:border-[#aaa] transition-colors placeholder:text-[#aaa]" />
            <textarea name="message" placeholder="Tell me about your project" rows="5" required className="w-full px-4 py-[0.85rem] border border-[#e2e2e0] rounded-lg bg-[#f8f8f8] text-[#1a1a1a] text-[0.9rem] font-[inherit] outline-none focus:border-[#aaa] transition-colors resize-y placeholder:text-[#aaa]"></textarea>
            <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center gap-2 self-start px-8 py-[0.85rem] bg-[#f8f8f8] text-[#1a1a1a] border-none rounded-lg font-normal text-[0.95rem] font-[inherit] cursor-pointer hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed max-[768px]:w-full">
              {isSubmitting ? (
                <>
                  <span className="w-[14px] h-[14px] border-2 border-[rgba(26,26,26,0.2)] border-t-[#1a1a1a] rounded-full animate-spin shrink-0" />
                  Sending...
                </>
              ) : "Send Message"}
            </button>
          </form>
          {status && (
            <div className={`mt-4 text-[0.9rem] px-4 py-3 rounded-lg text-left ${status === "success" ? "bg-[#f0faf0] text-[#2d7a2d] border border-[#c3e6c3]" : "bg-[#fff0f0] text-[#a03030] border border-[#f0c0c0]"}`}>
              {message}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-8 text-center bg-[#152430] border-t border-[rgba(0,191,255,0.1)] relative">
        <p className="text-[0.8rem] text-[#4a6070] m-0">© 2025 Robert Dionian. Built with Next.js.</p>
        <a href="/privacy-policy" className="absolute bottom-3 right-4 text-[#444] no-underline text-[0.7rem]">Privacy Policy</a>
      </footer>

      {/* Tawk.to Live Chat */}
      <Script
        id="tawk-to"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/6a14518d3b06151c38aa6ad5/1jpflt407';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `,
        }}
      />
    </div>
  );
}
