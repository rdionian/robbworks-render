export default function BotCommands() {
  const navLinks = [
    { href: "/#about", label: "About" },
    { href: "/#portfolio", label: "Portfolio" },
    { href: "/projects/google-play/volcano-jumper", label: "Mobile" },
    { href: "/#development", label: "Development" },
    { href: "/bot", label: "Discord Bot", active: true },
    { href: "/web-development", label: "Web Dev" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <div className="text-white">
      {/* Navigation */}
      <nav className="bg-black border-b border-white/10 relative max-[768px]:hidden">
        <a href="/" className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 no-underline">
          <img src="/logo.png" alt="RobbWorks" className="h-7 w-auto" />
          <span className="text-white font-bold text-[0.9rem] tracking-[0.02em]">robbworks</span>
        </a>
        <ul className="list-none flex justify-center flex-wrap gap-0 py-4 m-0 p-0">
          {navLinks.map((item) => (
            <li key={item.href} className="mx-4">
              <a href={item.href} className={`no-underline font-bold text-[0.9rem] tracking-[0.02em] transition-colors ${item.active ? "text-[#7ab35e]" : "text-[#444] hover:text-white"}`}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero */}
      <section className="min-h-[30vh] flex items-center justify-center bg-black px-8 py-8">
        <div className="text-center max-w-[800px]">
          <h1 className="text-[3rem] mb-4 text-[#7ab35e] mt-0">Bot Commands</h1>
          <p className="text-[1.25rem] text-[#ccc] m-0">All commands for NoteWorthy Games</p>
        </div>
      </section>

      {/* Divider */}
      <div className="w-[600px] max-w-full h-1 bg-[#7ab35e] mx-auto rounded-sm mt-4"></div>

      <section className="py-16 px-8">
        <div className="max-w-[1200px] mx-auto">

          {/* Trivia Commands */}
          <div className="mb-16">
            <h2 className="text-[2.5rem] text-[#7ab35e] mb-8 text-center mt-0">Trivia Commands</h2>
            <div className="bg-[rgba(30,30,40,0.6)] border border-[#7ab35e]/50 rounded-xl p-10">

              <div className="mb-8">
                <h3 className="text-[1.5rem] text-[#7ab35e] mt-0 mb-6 pb-3 border-b border-[#7ab35e]/20">Getting Started</h3>
                <ol className="text-[#ccc] leading-[1.8] pl-6">
                  <li>Players join the game with <code className="inline-block bg-black/40 text-[#7ab35e] px-3 py-1 rounded-md font-mono text-[0.95rem] border border-[#7ab35e]/30">!join</code></li>
                  <li>Someone runs <code className="inline-block bg-black/40 text-[#7ab35e] px-3 py-1 rounded-md font-mono text-[0.95rem] border border-[#7ab35e]/30">!setgamemaster</code> to become the Game Master</li>
                  <li>Game Master loads questions with <code className="inline-block bg-black/40 text-[#7ab35e] px-3 py-1 rounded-md font-mono text-[0.95rem] border border-[#7ab35e]/30">!loadquiz &lt;code&gt;</code> (from robbworks.dev) or <code className="inline-block bg-black/40 text-[#7ab35e] px-3 py-1 rounded-md font-mono text-[0.95rem] border border-[#7ab35e]/30">!addtestquestions</code></li>
                  <li>Game Master starts the game with <code className="inline-block bg-black/40 text-[#7ab35e] px-3 py-1 rounded-md font-mono text-[0.95rem] border border-[#7ab35e]/30">!start</code></li>
                  <li>Players answer questions, Game Master advances with <code className="inline-block bg-black/40 text-[#7ab35e] px-3 py-1 rounded-md font-mono text-[0.95rem] border border-[#7ab35e]/30">!next</code></li>
                </ol>
              </div>

              {[
                {
                  title: "Setup Commands",
                  items: [
                    { desc: "Join the current game", cmd: "!join" },
                    { desc: "Leave the current game", cmd: "!leave" },
                    { desc: "Become the Game Master (must be a player first)", cmd: "!setgamemaster" },
                    { desc: "Load a quiz from robbworks.dev using a quiz code", cmd: "!loadquiz <code>" },
                    { desc: "Load test questions for quick testing", cmd: "!addtestquestions" },
                  ],
                },
                {
                  title: "Game Master Commands",
                  items: [
                    { desc: "Start the trivia game", cmd: "!start" },
                    { desc: "Move to the next question and reveal answers", cmd: "!next" },
                    { desc: "End the game and show final scores", cmd: "!endgame" },
                    { desc: "Start a new game (resets scores and questions)", cmd: "!newgame" },
                    { desc: 'Add a custom question during the game', cmd: '!addquestion "question" "opt1,opt2,opt3,opt4" answerIndex' },
                  ],
                },
                {
                  title: "Player Commands",
                  items: [
                    { desc: "Submit your answer (1-4) for multiplayer games", cmd: "!answer <number>" },
                    { desc: "Single-player games use reaction buttons (1️⃣ 2️⃣ 3️⃣ 4️⃣)", note: true },
                  ],
                },
                {
                  title: "Info Commands",
                  items: [
                    { desc: "Show your current score", cmd: "!score" },
                  ],
                },
              ].map((section) => (
                <div key={section.title}>
                  <h3 className="text-[1.5rem] text-[#7ab35e] mt-8 mb-6 pb-3 border-b border-[#7ab35e]/20 first:mt-0">{section.title}</h3>
                  <div className="flex flex-col gap-5">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        {item.note ? (
                          <p className="text-[#999] italic text-[0.95rem] m-0">{item.desc}</p>
                        ) : (
                          <>
                            <p className="text-[#ccc] m-0 text-base">{item.desc}</p>
                            <code className="inline-block self-start bg-black/40 text-[#7ab35e] px-4 py-2 rounded-md font-mono text-[0.95rem] border border-[#7ab35e]/30">{item.cmd}</code>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Blackjack Commands */}
          <div className="mb-16">
            <h2 className="text-[2.5rem] text-[#7ab35e] mb-8 text-center mt-0">Blackjack Commands</h2>
            <div className="bg-[rgba(30,30,40,0.6)] border border-[#7ab35e]/50 rounded-xl p-10">
              <div className="mb-8">
                <h3 className="text-[1.5rem] text-[#7ab35e] mt-0 mb-6 pb-3 border-b border-[#7ab35e]/20">Getting Started</h3>
                <ol className="text-[#ccc] leading-[1.8] pl-6">
                  <li>Type <code className="inline-block bg-black/40 text-[#7ab35e] px-3 py-1 rounded-md font-mono text-[0.95rem] border border-[#7ab35e]/30">!blackjack</code> in any channel</li>
                  <li>The bot will DM you with your cards and the dealer's hand</li>
                  <li>Reply to the DM with <code className="inline-block bg-black/40 text-[#7ab35e] px-3 py-1 rounded-md font-mono text-[0.95rem] border border-[#7ab35e]/30">!hit</code> or <code className="inline-block bg-black/40 text-[#7ab35e] px-3 py-1 rounded-md font-mono text-[0.95rem] border border-[#7ab35e]/30">!stand</code></li>
                  <li>Try to beat the dealer without going over 21!</li>
                </ol>
              </div>
              <h3 className="text-[1.5rem] text-[#7ab35e] mt-8 mb-6 pb-3 border-b border-[#7ab35e]/20">Game Commands</h3>
              <div className="flex flex-col gap-5">
                {[
                  { desc: "Start a new blackjack game (bot will DM you)", cmd: "!blackjack" },
                  { desc: "Draw another card", cmd: "!hit" },
                  { desc: "Keep your current hand and end your turn", cmd: "!stand" },
                  { desc: "View your current hand and the dealer's visible card", cmd: "!hand" },
                ].map((item) => (
                  <div key={item.cmd} className="flex flex-col gap-2">
                    <p className="text-[#ccc] m-0 text-base">{item.desc}</p>
                    <code className="inline-block self-start bg-black/40 text-[#7ab35e] px-4 py-2 rounded-md font-mono text-[0.95rem] border border-[#7ab35e]/30">{item.cmd}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 pt-20 pb-8 bg-black/20 relative">
        <a href="/privacy-policy" className="absolute bottom-3 right-4 text-[#444] no-underline text-[0.7rem]">Privacy Policy</a>
        <div className="max-w-[1200px] mx-auto px-8 text-center">
          <p className="text-[1.1rem] mb-2 text-[#ccc]">rob@robbworks.dev</p>
          <p className="text-[0.8rem] text-[#666] mt-4">© 2025 Robert Dionian. Built with Next.js.</p>
        </div>
      </footer>
    </div>
  );
}
