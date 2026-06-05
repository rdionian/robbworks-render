"use client";
import { useState } from "react";

export default function HamburgerNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const close = () => setMenuOpen(false);

  return (
    <>
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? (
          <span className="hamburger-close">✕</span>
        ) : (
          <>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </>
        )}
      </button>

      {menuOpen && (
        <div className="mobile-nav">
          <ul>
            <li><a href="/#hero" className="nav-link" onClick={close}>Home</a></li>
            <li><a href="/#about" className="nav-link" onClick={close}>About</a></li>
            <li><a href="/#portfolio" className="nav-link" onClick={close}>Portfolio</a></li>
            <li><a href="/projects/google-play/volcano-jumper" className="nav-link" onClick={close}>Mobile</a></li>
            <li><a href="/#development" className="nav-link" onClick={close}>Development</a></li>
            <li><a href="/bot" className="nav-link" onClick={close}>Discord Bot</a></li>
            <li><a href="/web-development" className="nav-link" onClick={close}>Web Dev</a></li>
            <li><a href="/#contact" className="nav-link" onClick={close}>Contact</a></li>
          </ul>
        </div>
      )}
    </>
  );
}
