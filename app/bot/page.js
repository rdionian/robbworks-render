export default function BotLanding() {
  const socialIcons = (
    <div className="flex justify-center items-center gap-4 mt-3">
      <a href="https://www.linkedin.com/in/robert-dionian-a08739235" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="inline-flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-none stroke-[#7ab35e] stroke-2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      </a>
      <a href="https://www.instagram.com/robbworks.dev" target="_blank" rel="noopener noreferrer" title="Instagram" className="inline-flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-none stroke-[#7ab35e] stroke-2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="18" cy="6" r="1" />
        </svg>
      </a>
      <a href="https://www.youtube.com/@RobbWorks" target="_blank" rel="noopener noreferrer" title="YouTube" className="inline-flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-none stroke-[#7ab35e] stroke-2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      </a>
    </div>
  );

  return (
    <div className="text-white">
      {/* Navigation */}
      <nav className="bg-black border-b border-white/10 relative max-[768px]:hidden">
        <a href="/" className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 no-underline">
          <img src="/logo.png" alt="RobbWorks" className="h-7 w-auto" />
          <span className="text-white font-bold text-[0.9rem] tracking-[0.02em]">robbworks</span>
        </a>
        <ul className="list-none flex justify-center flex-wrap gap-0 py-4 m-0 p-0">
          {[
            { href: "/#about", label: "About" },
            { href: "/#portfolio", label: "Portfolio" },
            { href: "/projects/google-play/volcano-jumper", label: "Mobile" },
            { href: "/#development", label: "Development" },
            { href: "/bot", label: "Discord Bot", active: true },
            { href: "/web-development", label: "Web Dev" },
            { href: "/#contact", label: "Contact" },
          ].map((item) => (
            <li key={item.href} className="mx-4">
              <a href={item.href} className={`no-underline font-bold text-[0.9rem] tracking-[0.02em] transition-colors ${item.active ? "text-[#7ab35e]" : "text-[#444] hover:text-white"}`}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero */}
      <section className="min-h-[30vh] flex items-center justify-center bg-black px-8 py-8">
        <div className="text-center max-w-[800px]">
          <h1 className="text-[3rem] mb-4 text-[#7ab35e] mt-0">NoteWorthy Games</h1>
          <p className="text-[1.25rem] text-[#ccc] mb-8">Your Discord game night companion</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="https://discord.com/oauth2/authorize?client_id=1423359812686577805&permissions=549756161088&integration_type=0&scope=bot" className="px-6 py-3 bg-transparent border-2 border-[#7ab35e] text-[#7ab35e] rounded-lg no-underline font-semibold hover:bg-[#7ab35e] hover:text-black hover:-translate-y-0.5 transition-all duration-300">
              Add to Discord
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-[600px] max-w-full h-1 bg-[#7ab35e] mx-auto rounded-sm mt-4"></div>

      {/* About */}
      <section className="py-16 px-8">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-center mb-12 text-[2rem] text-white mt-0">About NoteWorthy</h2>
          <div className="max-w-[900px] mx-auto bg-[rgba(30,30,40,0.6)] border border-[#7ab35e] rounded-2xl p-12 text-center">
            <p className="text-[1.1rem] leading-[1.8] text-[#e0e0e0] mb-6">
              NoteWorthy is a Discord bot designed to bring interactive games directly to your server.
              Whether you're hosting trivia nights, playing blackjack, or just looking for
              ways to engage your community, NoteWorthy makes it easy and fun.
            </p>
            <p className="text-[1.1rem] leading-[1.8] text-[#e0e0e0] m-0">
              Built with customization in mind, NoteWorthy lets you create your own trivia quizzes,
              add custom questions on the fly, and manage games with flexible Game Master controls.
              Perfect for casual hangouts, community events, or competitive game nights.
            </p>
          </div>
          <a href="/bot/commands" className="inline-block mt-8 px-8 py-[14px] bg-transparent border-2 border-[#7ab35e] text-[#7ab35e] no-underline rounded-lg font-semibold text-base hover:bg-[#7ab35e] hover:text-black hover:-translate-y-0.5 transition-all duration-300">
            View All Commands
          </a>
        </div>
      </section>

      {/* Games */}
      <section className="py-16 px-8">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-center mb-12 text-[2rem] text-white mt-0">Available Games</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
            <div className="bg-[rgba(30,30,40,0.6)] rounded-xl p-8 border border-[#7ab35e] hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-[1.5rem] mb-4 text-[#7ab35e] mt-0">Trivia</h3>
              <p className="text-[#ccc] mb-6 leading-[1.6]">Custom trivia games with multiple categories. Build your own quizzes or play random questions.</p>
              <ul className="text-[#aaa] mb-6 pl-6">
                <li className="mb-2">Multiple categories (Anime, General Knowledge, Music, etc.)</li>
                <li className="mb-2">Custom quiz builder</li>
                <li className="mb-2">Random question modes</li>
                <li className="mb-2">Add your own questions</li>
              </ul>
              <a href="/bot/trivia" className="inline-block px-4 py-2 bg-transparent border-2 border-[#7ab35e] text-[#7ab35e] rounded-md no-underline font-semibold hover:bg-[#7ab35e] hover:text-black hover:-translate-y-0.5 transition-all duration-300">
                Explore Trivia
              </a>
            </div>

            <div className="bg-[rgba(30,30,40,0.6)] rounded-xl p-8 border border-[#7ab35e] hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-[1.5rem] mb-4 text-[#7ab35e] mt-0">Blackjack</h3>
              <p className="text-[#ccc] mb-6 leading-[1.6]">Classic card game right in Discord. Play against the dealer.</p>
              <ul className="text-[#aaa] mb-6 pl-6">
                <li className="mb-2">Single player vs dealer</li>
                <li className="mb-2">Standard blackjack rules</li>
                <li className="mb-2">Hit, stand, and double down</li>
              </ul>
              <span className="text-[#666]">Commands in Discord</span>
            </div>

            <div className="bg-[rgba(30,30,40,0.6)] rounded-xl p-8 border border-[#7ab35e] opacity-60">
              <h3 className="text-[1.5rem] mb-4 text-[#666] mt-0">🎮 More Games</h3>
              <p className="text-[#ccc] mb-6 leading-[1.6]">More games coming soon...</p>
              <span className="text-[#666]">Stay tuned!</span>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section className="py-16 px-8 bg-black/30">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="mb-6 text-[2rem] mt-0">Get Started</h2>
          <p className="text-[#ccc] mb-8 text-[1.1rem] leading-[1.6]">Add NoteWorthy Games to your Discord server and start playing!</p>
          <a href="https://discord.com/oauth2/authorize?client_id=1423359812686577805&permissions=549756161088&integration_type=0&scope=bot" className="inline-block px-8 py-4 bg-transparent border-2 border-[#7ab35e] text-[#7ab35e] rounded-lg no-underline text-[1.1rem] font-semibold hover:bg-[#7ab35e] hover:text-black hover:-translate-y-0.5 transition-all duration-300">
            Invite Bot to Discord
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 pt-20 pb-8 bg-black/20 relative">
        <a href="/privacy-policy" className="absolute bottom-3 right-4 text-[#444] no-underline text-[0.7rem]">Privacy Policy</a>
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center my-4">
            <p className="text-[1.1rem] mb-2 text-[#ccc]">rob@robbworks.dev</p>
            {socialIcons}
          </div>
          <p className="text-[0.8rem] text-[#666] mt-4 text-center">© 2025 Robert Dionian. Built with Next.js.</p>
        </div>
      </footer>
    </div>
  );
}
