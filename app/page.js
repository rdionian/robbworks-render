"use client";
import { useState } from "react";

export default function Portfolio() {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setIsSubmitting(true);
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
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
      setMessage("Thanks for signing up!");
      form.reset();
      setTimeout(() => setStatus(null), 4000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full p-[0.8rem] bg-[rgba(255,255,255,0.05)] border-2 border-[rgba(0,191,255,0.8)] rounded-[6px] text-[#aaa] text-base focus:outline-none placeholder:text-[#aaa]";

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[rgba(0,0,0,0.8)] z-[100] py-4 backdrop-blur-[10px] max-[768px]:hidden">
        <a href="/" className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 no-underline">
          <img src="/logo.png" alt="RobbWorks" className="h-7 w-auto" />
          <span className="text-white font-bold text-[0.9rem] tracking-[0.02em]">robbworks</span>
        </a>
        <ul className="list-none flex justify-center m-0 p-0">
          {[
            { href: "#about", label: "About" },
            { href: "#portfolio", label: "Portfolio" },
            { href: "/projects/google-play/volcano-jumper", label: "Mobile" },
            { href: "#development", label: "Development" },
            { href: "/bot", label: "Discord Bot" },
            { href: "/web-development", label: "Web Dev" },
            { href: "#contact", label: "Contact" },
          ].map(({ href, label }) => (
            <li key={label} className="mx-4">
              <a href={href} className="text-white no-underline font-bold transition-colors hover:text-[#00bfff]">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero */}
      <section id="hero" className="relative w-full block overflow-hidden">
        <img
          src="/MainMenuBackground_1.png"
          alt="Screenshot from current game in development"
          className="block w-full max-w-full h-auto"
          style={{ objectFit: "fill", objectPosition: "top center" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 text-white p-4"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)", maxWidth: "80%" }}
        >
          <h1 className="text-[4rem] max-[768px]:text-[1.8rem] max-[768px]:leading-[1.2] font-bold m-0 mb-4">Robert Dionian</h1>
          <p className="text-[1.5rem] m-0">Software Engineer | Game Development</p>
          <a
            href="#portfolio"
            className="inline-block mt-4 px-8 py-4 bg-transparent border-4 border-[#00bfff] text-white no-underline rounded-lg font-bold transition-all opacity-60 hover:shadow-[0_0_22px_#00bfff] hover:scale-[1.08]"
          >
            Explore My Games
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 min-h-[50vh] bg-black">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <h2 className="text-[3rem] font-[100] mb-8 text-[#00bfff]" style={{ textShadow: "0 0 10px rgba(0,191,255,0.5)" }}>
            About Me
          </h2>
          <div className="bg-[rgba(0,0,0,0.7)] border border-[rgba(0,191,255,0.3)] rounded-xl p-16 max-w-[800px] mx-auto mb-8 shadow-[0_0_25px_rgba(0,191,255,0.3)]">
            <div className="flex items-center gap-8 max-[768px]:flex-col max-[768px]:text-center">
              <div className="flex-shrink-0">
                <img
                  src="/profile.jpg"
                  alt="Robert Dionian, Game Developer"
                  className="w-[150px] h-[150px] rounded-full object-cover mb-4 border-2 border-[rgba(0,191,255,0.5)]"
                />
              </div>
              <div className="flex-1 text-left max-[768px]:text-center">
                <p className="text-[1.1rem] font-normal">
                  "Hey, I'm Rob — I make games and interactive projects because I love bringing ideas to life. I work across both Unreal Engine with C++ and Unity with C#, choosing the right tool for each project. I studied Game Development at Full Sail University, where I built a foundation in gameplay systems, level design, and problem-solving. Since then I've kept pushing forward — from action adventure games to atmospheric platformers and everything in between. Right now I'm focused on Moonlit Journey, a hand-painted 2D Metroidvania rooted in Japanese folklore, alongside smaller projects that keep the momentum going."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-16 min-h-[50vh] bg-black">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <h2 className="text-[3rem] font-[100] mb-8 text-[#00bfff]" style={{ textShadow: "0 0 10px rgba(0,191,255,0.5)" }}>
            Portfolio
          </h2>
          <p className="font-normal">Highlights from my game dev journey—click to dive deeper.</p>
          <div className="grid gap-8 mt-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            {[
              { src: "/fragile-state-thumb.png", alt: "Fragile State FPS Thumbnail", title: "Fragile State", desc: "First-person shooter in a post-apocalyptic world overrun by machines. Built with Unity.", href: "/projects/fragile-state", btnLabel: "Fragile State" },
              { src: "/space-dasher-thumb.png", alt: "Space Dasher Side-Scroller Thumbnail", title: "Space Dasher", desc: "Side-scrolling shooter inspired by classic Defender. Fast-paced action with procedural waves.", href: "#coming-soon", btnLabel: "Coming Soon" },
              { src: "/quest-for-dominion-thumb.png", alt: "Quest For Dominion Turn-Based Thumbnail", title: "Quest For Dominion", desc: "Turn-based RPG in a fantasy world with strategic combat and branching narratives.", href: "#coming-soon", btnLabel: "Coming Soon" },
            ].map(({ src, alt, title, desc, href, btnLabel }) => (
              <div
                key={title}
                className="bg-[rgba(0,0,0,0.7)] border border-[rgba(0,191,255,0.3)] shadow-[0_0_25px_rgba(0,191,255,0.3)] p-4 rounded-lg transition-transform hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(0,191,255,0.6)]"
              >
                <img src={src} alt={alt} className="w-full h-[220px] object-cover rounded" />
                <h3 className="text-xl font-bold mt-3 mb-2">{title}</h3>
                <p className="text-base font-normal">{desc}</p>
                <a href={href} className="inline-block mt-4 px-4 py-2 bg-[#00bfff] text-white no-underline rounded transition-colors hover:bg-[#0099cc]">
                  {btnLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Development */}
      <section id="development" className="py-16 min-h-[50vh] bg-black">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <h2 className="text-[3rem] font-[100] mb-2 text-[#00bfff]" style={{ textShadow: "0 0 10px rgba(0,191,255,0.5)" }}>
            Current Development
          </h2>
          <div
            className="flex flex-row items-center bg-[rgba(0,0,0,0.7)] border border-[rgba(0,191,255,0.4)] rounded-[15px] overflow-hidden shadow-[0_0_25px_rgba(0,191,255,0.3)] min-h-[420px] max-w-[1100px] mx-auto mt-8 pl-8 transition-all hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(0,191,255,0.5)] max-[768px]:flex-col max-[768px]:p-0"
          >
            <img
              src="/MoonlitJourney.png"
              alt="Moonlit Journey"
              className="w-[45%] h-full object-cover max-[768px]:w-full max-[768px]:h-auto max-[768px]:mb-4"
            />
            <div className="flex-1 p-8 text-[#ddd] max-[768px]:w-[95%] max-[768px]:max-w-[600px] max-[768px]:mx-auto max-[768px]:text-center max-[768px]:pb-6">
              <h3 className="text-[2rem] mb-3 text-[#00bfff]">Moonlit Journey</h3>
              <p className="text-[1.1rem] leading-relaxed p-12 text-[#ccc] max-[768px]:p-0 max-[768px]:text-base">
                Moonlit Journey is a 2D platformer inspired by the Japanese legend of the Moon Rabbit.
                You play as a small rabbit on a mysterious journey across forests, mountains, and ancient lands.
                Along the way you will encounter creatures from folklore such as the fox and the monkey,
                learn strange abilities that awaken under moonlight, and slowly uncover a forgotten truth
                — that your home may not be on Earth at all.
              </p>
              <a
                href="/projects/moonlit-journey"
                className="inline-block mt-4 px-5 py-[0.6rem] bg-[#00bfff] text-white rounded-[6px] font-bold no-underline transition-all hover:bg-[#0099cc] hover:scale-[1.05] max-[1024px]:mx-auto max-[1024px]:text-[0.85rem]"
              >
                Development Logs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Archive */}
      <section className="py-16 min-h-[50vh] bg-black">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <h2 className="text-[3rem] font-[100] mb-8 text-[#00bfff]" style={{ textShadow: "0 0 10px rgba(0,191,255,0.5)" }}>
            Archive
          </h2>
          <div className="grid justify-center gap-8 mt-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 350px))" }}>
            <div className="bg-[rgba(0,0,0,0.7)] border border-[rgba(0,191,255,0.3)] shadow-[0_0_25px_rgba(0,191,255,0.3)] p-4 rounded-lg transition-transform hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(0,191,255,0.6)]">
              <img src="/MainMenuBackground.png" alt="Echoes of the Goddess" className="w-full h-[220px] object-cover rounded" />
              <h3 className="text-xl font-bold mt-3 mb-2">Echoes of the Goddess</h3>
              <p className="text-base font-normal">Third person action adventure game set in a fantasy world.</p>
              <a href="/projects/echoes-of-the-goddess" className="inline-block mt-4 px-4 py-2 bg-[#00bfff] text-white no-underline rounded transition-colors hover:bg-[#0099cc]">
                Echoes of the Goddess
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Devlog Signup */}
      <section id="devlog" className="py-16 min-h-[50vh] bg-black">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <div className="max-w-[700px] mx-auto mb-8 text-center">
            <h2
              className="font-bold text-[2rem] tracking-[0.5px] text-[#00bfff] mb-4"
              style={{ textShadow: "0 0 10px rgba(0,191,255,0.4)" }}
            >
              Let's build something epic.
            </h2>
            <p className="leading-relaxed text-[#ccc] font-normal">
              Step beyond the screen for dev insights, progress updates, and stories from the worlds I'm creating. Sign up to stay connected.
            </p>
          </div>
          <div className="mt-8 relative">
            <form className="flex flex-col gap-4 max-w-[700px] mx-auto" onSubmit={handleSubmit}>
              <div className="flex gap-4 max-[600px]:flex-col">
                <input type="text" name="firstName" placeholder="First Name" required className={inputClass} />
                <input type="text" name="lastName" placeholder="Last Name" required className={inputClass} />
              </div>
              <input type="email" name="email" placeholder="Email Address" required className={inputClass} />
              <select name="category" required className={inputClass + " bg-[rgba(255,255,255,0.05)]"}>
                <option value="" className="text-black">Select Category</option>
                <option value="devlog" className="text-black">Devlog Updates</option>
                <option value="newsletter" className="text-black">General Newsletter</option>
                <option value="earlyAccess" className="text-black">Early Access &amp; Playtesting</option>
                <option value="collaboration" className="text-black">Collaboration Opportunities</option>
                <option value="webdevelopment" className="text-black">Web Development Inquiry</option>
                <option value="other" className="text-black">Other</option>
              </select>
              <textarea name="message" placeholder="Your message (optional)" rows={4} className={inputClass + " resize-none"} />
              <button
                type="submit"
                disabled={isSubmitting}
                className="self-start inline-flex items-center justify-center gap-2 mt-6 px-8 py-[0.8rem] text-[1.1rem] font-bold text-[rgba(0,191,255,0.8)] bg-[rgba(255,255,255,0.05)] border-2 border-[rgba(0,191,255,0.8)] rounded-[6px] cursor-pointer uppercase tracking-[1px] transition-all hover:scale-[1.05] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none max-[768px]:px-6 max-[768px]:py-[0.7rem]"
              >
                {isSubmitting ? <><span className="submit-btn-spinner" />Sending...</> : "Submit"}
              </button>
            </form>
            {status && <div className={`signup-message ${status}`}>{message}</div>}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black text-[#666] text-center py-6 px-4 relative" style={{ minHeight: 0 }}>
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center my-4">
            <p className="text-[1.1rem] mb-2">rob@robbworks.dev</p>
            <div className="flex justify-center items-center gap-[0.1rem] mt-3">
              <a href="https://www.linkedin.com/in/robert-dionian-a08739235" target="_blank" rel="noopener noreferrer" title="LinkedIn Profile" className="inline-flex items-center justify-center p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00bfff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform hover:scale-[1.15]">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="https://www.instagram.com/robbworks.dev" target="_blank" rel="noopener noreferrer" title="Instagram" className="inline-flex items-center justify-center p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00bfff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform hover:scale-[1.15]">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="18" cy="6" r="1" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@RobbWorks" target="_blank" rel="noopener noreferrer" title="YouTube Devlogs" className="inline-flex items-center justify-center p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00bfff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform hover:scale-[1.15]">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>
          <p className="text-[0.8rem] text-[#666] mt-4">© 2025 Robert Dionian. Built with Next.js.</p>
        </div>
        <a href="/privacy-policy" className="absolute bottom-3 right-4 text-[#444] no-underline text-[0.7rem] hover:text-[#666]">
          Privacy Policy
        </a>
      </footer>
    </>
  );
}
