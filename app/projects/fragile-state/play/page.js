export default function FragileStatePlay() {
  return (
    <div className="min-h-screen flex flex-col text-white">
      <a href="/" className="absolute top-3 left-3 z-10 bg-black/50 border border-white/10 px-3 py-1.5 text-[#9be4ff] rounded-md text-[1.1rem] no-underline hover:scale-105 transition-transform">
        ← Home
      </a>

      <div className="flex-1 px-4 py-16 max-w-[1200px] mx-auto w-full">
        <div className="text-center mb-10">
          <h1 className="text-[3rem] text-[#3ca155] font-bold mt-0 mb-3">Fragile State</h1>
          <p className="text-[#ccc] text-[1.1rem] m-0">
            Play the WebGL demo below — best experienced on desktop.
          </p>
        </div>

        {/* Game Embed */}
        <div className="w-full overflow-hidden rounded-xl border border-[#3ca155]/30 mb-6">
          <iframe
            frameBorder="0"
            src="https://itch.io/embed-upload/15226388?color=000000"
            allowFullScreen
            width="1280"
            height="740"
            title="Fragile State WebGL Game"
            className="block w-full"
          />
        </div>

        {/* Download link */}
        <div className="text-center mb-12">
          <a
            href="#download"
            className="inline-block px-6 py-3 bg-transparent border-2 border-[#3ca155] text-[#3ca155] rounded-lg no-underline font-semibold hover:bg-[#3ca155] hover:text-black hover:-translate-y-0.5 transition-all duration-300"
          >
            Download Demo
          </a>
        </div>

        {/* Controls */}
        <section id="development" className="mb-12">
          <h2 className="text-[2rem] text-[#3ca155] text-center mb-8 mt-0">Controls</h2>
          <div className="flex gap-8 justify-center flex-wrap">
            {[
              {
                title: "PC Controls",
                lines: [
                  "W / A / S / D — Move",
                  "Mouse — Aim",
                  "E — Interact",
                  "Shift — Sprint",
                  "R — Reload",
                  "F — Flashlight",
                  "Space — Jump",
                  "LMB — Shoot",
                  "RMB — Zoom",
                  "X — Throw Grenade",
                  "1 / 2 / 3 — Switch Weapons",
                  "ESC — Pause",
                ],
              },
              {
                title: "Xbox Controls",
                lines: [
                  "Left Stick — Move",
                  "Right Stick — Aim",
                  "B — Interact",
                  "L3 — Sprint",
                  "X — Reload",
                  "R3 — Flashlight",
                  "A — Jump",
                  "LT — Shoot",
                  "LB — Zoom",
                  "RB — Throw Grenade",
                  "D-Pad / Buttons 1–3 — Switch Weapons",
                  "Start — Pause",
                ],
              },
            ].map((ctrl) => (
              <div
                key={ctrl.title}
                className="bg-[rgba(30,30,40,0.6)] border border-[#3ca155]/40 rounded-xl p-8 flex-1 min-w-[280px] max-w-[400px]"
              >
                <h3 className="text-xl font-bold text-[#3ca155] mt-0 mb-4">{ctrl.title}</h3>
                {ctrl.lines.map((line) => (
                  <p key={line} className="text-[#ccc] text-sm m-0 leading-[1.9]">{line}</p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Known Bugs */}
        <section className="max-w-[700px] mx-auto mb-12">
          <h2 className="text-[2rem] text-[#3ca155] text-center mb-6 mt-0">Known Bugs</h2>
          <div className="bg-[rgba(30,30,40,0.6)] border border-[#3ca155]/40 rounded-xl p-8">
            <ul className="text-[#ccc] pl-6 m-0 space-y-2">
              <li>Have to press ESC twice to pause game.</li>
              <li>Audio doesn&apos;t play on start sometimes, have to turn up volume save and refresh page.</li>
              <li>Grenades can collide with power-ups.</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-8 pt-16 pb-8 bg-black/20 relative text-center">
        <a href="/privacy-policy" className="absolute bottom-3 right-4 text-[#444] no-underline text-[0.7rem]">Privacy Policy</a>
        <p className="text-[1.1rem] mb-2 text-[#ccc]">rob@robbworks.dev</p>
        <div className="flex justify-center items-center gap-4 mt-3">
          <a href="https://www.linkedin.com/in/robert-dionian-a08739235" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="inline-flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3ca155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a href="https://www.instagram.com/robbworks.dev" target="_blank" rel="noopener noreferrer" title="Instagram" className="inline-flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3ca155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="18" cy="6" r="1" />
            </svg>
          </a>
          <a href="https://www.youtube.com/@RobbWorks" target="_blank" rel="noopener noreferrer" title="YouTube" className="inline-flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3ca155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
            </svg>
          </a>
        </div>
        <p className="text-[0.8rem] text-[#666] mt-4">© 2025 Robert Dionian. Built with Next.js.</p>
      </footer>
    </div>
  );
}
