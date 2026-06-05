"use client";
import Logbook from "@/components/Logbook/logbook";

export default function MoonlitJourney() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Purple gradient background */}
      <div
        className="absolute inset-0 min-h-full -z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #05020a 0%, #120a25 25%, #1f1340 50%, #2d1d63 75%, #3a2c85 100%)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      />

      <div className="relative z-10">
        {/* Hero */}
        <section className="relative w-full block overflow-hidden m-0 p-0">
          <a
            href="/"
            className="absolute top-3 left-3 z-10 bg-black/50 border border-white/[0.12] px-3 py-1.5 text-[#9be4ff] rounded-md text-[1.1rem] no-underline hover:scale-105 transition-transform"
          >
            ← Home
          </a>

          <img
            src="/MoonlitJourney.png"
            alt="Moonlit Journey hero"
            className="block w-full h-auto object-fill object-top max-[900px]:h-[60vh] max-[900px]:min-h-[360px] max-[900px]:object-cover max-[900px]:object-center max-[600px]:h-[55vh] max-[600px]:min-h-[300px]"
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white z-[2] m-0 p-0 max-[900px]:px-4 max-[600px]:px-3" style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}>
            <h1 className="text-[4rem] m-0 max-[900px]:text-[2rem] max-[600px]:text-[2.5rem]">Moonlit Journey</h1>
            <p className="text-[1.5rem] m-0 max-[900px]:text-[1.05rem] max-[600px]:text-[1rem]">
              A mystical platforming adventure inspired by Japanese folklore.
            </p>
          </div>
        </section>

        {/* Logbook */}
        <section className="flex justify-center items-center p-0 mx-auto text-center max-w-[1200px] w-full bg-transparent">
          <Logbook project="moonlit-journey" />
        </section>

        {/* Footer */}
        <footer className="text-[#666] text-center py-6 px-4 mt-20 relative" style={{ backgroundColor: "transparent" }}>
          <a href="/privacy-policy" className="absolute bottom-3 right-4 text-[#444] no-underline text-[0.7rem]">Privacy Policy</a>
          <p className="text-[1.1rem] mb-1 text-[#ccc]">rob@robbworks.dev</p>
          <div className="flex justify-center items-center gap-2 mt-3">
            <a href="https://www.linkedin.com/in/robert-dionian-a08739235" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="inline-flex items-center justify-center hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#caa6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="https://www.instagram.com/robbworks.dev" target="_blank" rel="noopener noreferrer" title="Instagram" className="inline-flex items-center justify-center hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#caa6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="18" cy="6" r="1" />
              </svg>
            </a>
            <a href="https://www.youtube.com/@RobbWorks" target="_blank" rel="noopener noreferrer" title="YouTube" className="inline-flex items-center justify-center hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#caa6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </a>
          </div>
          <p className="text-[0.8rem] text-[#666] mt-4">© 2025 Robert Dionian. Built with Next.js.</p>
        </footer>
      </div>
    </main>
  );
}
