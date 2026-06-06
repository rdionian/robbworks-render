"use client";
import styles from "./carousel.module.css";
import { useRef, useState, useEffect } from "react";

function Gallery3D({ images }) {
  const trackRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [radius, setRadius] = useState(800);
  const angle = 360 / images.length;

  const next = () => setRotation((r) => r - angle);
  const prev = () => setRotation((r) => r + angle);

  useEffect(() => {
    const updateRadius = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      const perSlide = width < 768 ? 60 : width < 1200 ? 90 : 115;
      setRadius(images.length * perSlide);
    };
    setTimeout(updateRadius, 50);
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  useEffect(() => {
    let startX = 0;
    const element = trackRef.current?.parentElement;
    if (!element) return;
    const handleTouchStart = (e) => (startX = e.touches[0].clientX);
    const handleTouchEnd = (e) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 60) diff > 0 ? prev() : next();
    };
    element.addEventListener("touchstart", handleTouchStart);
    element.addEventListener("touchend", handleTouchEnd);
    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div style={{ width: "100vw", display: "flex", justifyContent: "center", position: "relative" }}>
      <div className={styles.carousel3D}>
        <div
          className={styles.carouselTrack}
          ref={trackRef}
          style={{
            transform: `rotateY(${rotation}deg)`,
            transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className={styles.slide}
              style={{ transform: `rotateY(${i * angle}deg) translateZ(${radius}px)` }}
            >
              <img src={src} alt={`Slide ${i + 1}`} />
            </div>
          ))}
        </div>
        <button className={styles.prevButton} onClick={prev}>‹</button>
        <button className={styles.nextButton} onClick={next}>›</button>
      </div>
    </div>
  );
}

export default function FragileState() {
  return (
    <div className="flex flex-col min-h-screen text-white">
      <div className="flex-1">
        {/* Hero */}
        <section id="hero" className="relative w-full block overflow-hidden">
          <img
            src="/menu-background.png"
            alt="Fragile State background"
            className="block w-full h-auto"
            style={{ objectFit: "fill", objectPosition: "top center" }}
          />

          {/* Menu container */}
          <div
            className="absolute z-[5] bg-black/70 rounded-xl p-6 flex flex-col items-center justify-between max-[768px]:hidden"
            style={{
              top: "20%",
              left: "10%",
              width: "clamp(220px, 25vw, 275px)",
              height: "clamp(400px, 40vw, 525px)",
            }}
          >
            <img src="/game-logo.png" alt="Fragile State Logo" className="w-[70%] max-w-[180px] mb-2" />
            <div className="flex flex-col justify-evenly items-center w-full h-full">
              {["/", "#about", "#gameplay", "#gallery", "#download"].map((href, i) => {
                const labels = ["Home", "About", "Gameplay", "Gallery", "Download"];
                const hrefs = ["/", "#about", "#gameplay", "#gallery", "#download"];
                return (
                  <a
                    key={labels[i]}
                    href={hrefs[i]}
                    className="block w-full text-center my-1.5 py-3 px-2 text-white font-bold uppercase no-underline tracking-wide transition-all hover:text-[#ffd900] hover:scale-105"
                    style={{ fontSize: "clamp(1rem, 1.3vw, 1.4rem)" }}
                  >
                    {labels[i]}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Hero text */}
          <div
            className="absolute z-[5] text-right text-[rgb(230,226,226)]"
            style={{ bottom: "5%", right: "10%" }}
          >
            <h1
              className="font-bold m-0 leading-[1.1]"
              style={{
                fontSize: "clamp(4rem, 6vw, 7rem)",
                letterSpacing: "2px",
                textShadow: "0 0 20px rgba(255,255,255,0.4)",
              }}
            >
              Fragile State
            </h1>
          </div>
        </section>

        {/* About */}
        <section id="about" className="flex flex-col items-center justify-center py-20 px-5 text-center w-full">
          <div className="bg-[rgba(10,10,10,0.75)] border border-white/10 shadow-[0_0_20px_rgba(0,255,150,0.25)] backdrop-blur-md rounded-2xl p-8 max-w-[900px] w-[90%] mx-auto mb-20 hover:-translate-y-1 transition-transform duration-300">
            <h2 className="text-[2.2rem] mb-6 text-white mt-0" style={{ textShadow: "0 0 10px rgba(0,255,200,0.4)" }}>
              About the Game
            </h2>
            <p className="text-[1.15rem] leading-[1.8] text-[#c8f9f9] m-0">
              In the aftermath of a machine-driven apocalypse, humanity stands on the brink of extinction.
              You are one of the last survivors — a lone fighter in a world ruled by cold metal and broken cities.
              Amid the chaos, you encounter an unlikely ally: a machine carrying secrets that could shift the balance of power.
              Your mission is simple — protect it at all costs.
              Fragile State is a fast-paced, wave-based FPS where survival means strategy, precision, and unwavering defense.
              Every second counts as you fight off relentless mechanical forces determined to reclaim what&apos;s left of their own.
            </p>
          </div>

          <div className="relative w-full max-w-[800px] mx-auto rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full border-none rounded-2xl"
              src="https://www.youtube.com/embed/_SZ-IueBCV8?si=DGXg7px_2DQk3E3M&autoplay=1&mute=1&loop=1&playlist=_SZ-IueBCV8"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </section>

        {/* Gameplay */}
        <section id="gameplay" className="flex flex-col items-center justify-center py-20 px-5 text-center w-full">
          <div className="bg-[rgba(10,10,10,0.75)] border border-white/10 shadow-[0_0_30px_rgba(0,200,255,0.4)] backdrop-blur-md rounded-2xl p-8 max-w-[900px] w-[90%] mx-auto mb-20 hover:-translate-y-1 transition-transform duration-300">
            <h2 className="text-[2.2rem] mb-6 text-white mt-0" style={{ textShadow: "0 0 10px rgba(0,255,200,0.4)" }}>
              Gameplay
            </h2>
            <p className="text-[1.15rem] leading-[1.8] text-[#c8f9f9] m-0">
              In Fragile State, players fight to survive against relentless waves of enemy machines while protecting their only ally — a sentient robot carrying the key to humanity&apos;s survival.
              Each wave grows more intense, introducing new threats and forcing players to balance offense and defense.
              Defeated enemies drop crucial supplies like health packs, ammo, and power-ups that boost fire rate. Some enemies even spawn reinforcements when destroyed, keeping tension high. Between waves, players can spend resources at the in-game store to upgrade gear, buy grenades, and equip body armor.
              A dynamic day-night cycle changes the tone and visibility of the battlefield as you fight, and if enemies linger too close to your robotic ally, a capture timer begins — lose track, and the mission fails.
              Survive long enough, and you will face the ultimate challenge: a towering mechanical boss that tests every skill you&apos;ve learned.
            </p>
          </div>

          <div className="relative w-full max-w-[800px] mx-auto rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full border-none rounded-2xl"
              src="https://www.youtube.com/embed/_SZ-IueBCV8?si=eq83zU4SMFvtYgWS&autoplay=1&mute=1&loop=1&playlist=_SZ-IueBCV8"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="py-[12rem] max-[768px]:py-0 max-[768px]:pb-[15rem] min-h-[60vh] flex flex-col items-center justify-start">
          <h2
            className="text-center w-full font-light mb-6 text-white mt-0"
            style={{ fontSize: "4rem", textShadow: "0 0 10px rgba(0,255,200,0.4)" }}
          >
            Gallery
          </h2>
          <Gallery3D
            images={[
              "/gallery3.png", "/gallery5.png",
              "/gallery7.png", "/gallery8.png", "/gallery9.png",
            ]}
          />
        </section>

        {/* Download — hidden on mobile */}
        <section id="download" className="flex flex-col items-center justify-center text-center w-full py-8 max-[1023px]:hidden">
          <div className="relative bg-[rgba(10,10,10,0.75)] border border-white/10 shadow-[0_0_25px_rgba(255,200,0,0.25)] backdrop-blur-md rounded-xl py-8 px-12 max-w-[700px] w-[95%] mx-auto -top-24 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,200,0,0.4)] transition-all duration-300" style={{ height: "200px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h2 className="text-[2rem] text-white mb-6 mt-0">Play &ldquo;Fragile State&rdquo;</h2>
            <a
              href="/projects/fragile-state/play"
              className="inline-block no-underline text-white border-2 border-[rgba(255,204,51,0.55)] px-10 py-3 rounded-lg font-bold tracking-wide hover:scale-105 hover:bg-[rgba(255,204,51,0.08)] hover:shadow-[0_0_35px_rgba(255,204,51,0.15)] hover:text-[#ffe066] transition-all duration-300"
            >
              Play
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer id="contact" className="bg-black text-[#666] text-center py-6 px-4 relative">
        <a href="/privacy-policy" className="absolute bottom-3 right-4 text-[#444] no-underline text-[0.7rem]">Privacy Policy</a>
        <p className="text-[1.1rem] mb-1 text-[#ccc]">rob@robbworks.dev</p>
        <div className="flex justify-center items-center gap-2 mt-3">
          {[
            {
              href: "https://www.linkedin.com/in/robert-dionian-a08739235",
              title: "LinkedIn",
              path: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>,
            },
            {
              href: "https://www.instagram.com/robbworks.dev",
              title: "Instagram",
              path: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="18" cy="6" r="1" /></>,
            },
            {
              href: "https://www.youtube.com/@RobbWorks",
              title: "YouTube",
              path: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></>,
            },
          ].map((icon) => (
            <a key={icon.href} href={icon.href} target="_blank" rel="noopener noreferrer" title={icon.title} className="inline-flex items-center justify-center hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,200,0,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {icon.path}
              </svg>
            </a>
          ))}
        </div>
        <p className="text-[0.8rem] text-[#666] mt-4">© 2025 Robert Dionian. Built with Next.js.</p>
      </footer>
    </div>
  );
}
