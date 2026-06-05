"use client";

import { useState, useEffect } from "react";
import styles from "./technical-log.module.css";
import { technicalLogData } from "./technical-log-data";

export default function TechnicalLog() {
  const [isAdmin, setIsAdmin] = useState(false);

  // Saved entries (newest first)
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Which entry is currently shown in viewer mode
  const [currentIndex, setCurrentIndex] = useState(0);

  // Admin draft fields
  const [developmentProgress, setDevelopmentProgress] = useState("");
  const [gameMechanics, setGameMechanics] = useState("");
  const [artDesign, setArtDesign] = useState("");
  const [audio, setAudio] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ---- session check
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/session", { cache: "no-store" });
        const { admin } = await res.json();
        if (!cancelled) setIsAdmin(!!admin);
      } catch {
        if (!cancelled) setIsAdmin(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // ---- listen for session changes (logout elsewhere, tab focus, etc.)
  useEffect(() => {
    const handleSessionChange = async () => {
      try {
        const res = await fetch("/api/admin/session", { cache: "no-store" });
        const { admin } = await res.json();
        setIsAdmin(!!admin);
      } catch {
        setIsAdmin(false);
      }
    };
    const handleStorage = (e) => {
      if (e.key === "admin_session_update") handleSessionChange();
    };
    window.addEventListener("admin-session-changed", handleSessionChange);
    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", handleSessionChange);
    return () => {
      window.removeEventListener("admin-session-changed", handleSessionChange);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", handleSessionChange);
    };
  }, []);

  // ---- load entries
  // const loadEntries = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await fetch("/api/technical-logs", { cache: "no-store" });
  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data?.error || "Failed to fetch technical logs");
  //     const list = Array.isArray(data) ? data : [];
  //     setEntries(list);
  //     setCurrentIndex(0); // show newest first
  //   } catch (err) {
  //     console.error("❌ Technical logs fetch error:", err);
  //     setEntries([]);
  //     setCurrentIndex(0);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const loadEntries = () => {
  setEntries(technicalLogData);
  setCurrentIndex(0);
  setLoading(false);
};

  useEffect(() => {
    loadEntries();
  }, []);

  const current = entries[currentIndex] || null;

  // ---- nav buttons (viewer mode)
  const hasMany = entries.length > 1;
  const prevEntry = () =>
    setCurrentIndex((i) => (entries.length ? (i > 0 ? i - 1 : entries.length - 1) : 0));
  const nextEntry = () =>
    setCurrentIndex((i) => (entries.length ? (i < entries.length - 1 ? i + 1 : 0) : 0));

  // ---- submit new technical log (admin only)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !developmentProgress.trim() &&
      !gameMechanics.trim() &&
      !artDesign.trim() &&
      !audio.trim()
    ) {
      alert("Please enter at least one section before submitting.");
      return;
    }

    const payload = {
      developmentProgress: developmentProgress.trim(),
      gameMechanics: gameMechanics.trim(),
      artDesign: artDesign.trim(),
      audio: audio.trim(),
    };

    try {
      setSubmitting(true);
      const res = await fetch("/api/technical-logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Submit failed");

      // Clear draft
      setDevelopmentProgress("");
      setGameMechanics("");
      setArtDesign("");
      setAudio("");

      // Reload to include the new one; viewer shows newest at index 0
      await loadEntries();

      alert("✅ Technical log submitted!");
    } catch (err) {
      console.error("❌ Submit error:", err);
      alert("Error submitting technical log — check console.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClear = () => {
    setDevelopmentProgress("");
    setGameMechanics("");
    setArtDesign("");
    setAudio("");
  };

  const niceDate = (iso) => {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso || "";
    }
  };

  return (
    <section className={styles.technicalSection}>
      <div className={styles.clipboard}>
        <div className={styles.clip} />
        <div className={styles.paper}>
          {/* date in top-right */}
          <div className={styles.dateBadge}>
            {isAdmin
              ? "New Entry (unsaved)"
              : loading
              ? "Loading…"
              : current?.created_at
              ? niceDate(current.created_at)
              : "No entries yet"}
          </div>

          <div className={styles.logContent}>
            {/* Viewer header w/ pagination */}
            {!isAdmin && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.25rem",
                }}
              >
                <div style={{ fontSize: ".9rem", color: "#666" }}>
                  {loading
                    ? "Loading…"
                    : current
                    ? `Entry ${currentIndex + 1} of ${entries.length}`
                    : "No entries yet"}
                </div>

                {hasMany && (
                  <div style={{ display: "flex", gap: ".5rem" }}>
                    <button
                      onClick={prevEntry}
                      aria-label="Previous entry"
                      style={{
                        padding: ".35rem .7rem",
                        borderRadius: 6,
                        border: "1px solid rgba(0,0,0,.1)",
                        background: "#f4f4f4",
                        cursor: "pointer",
                      }}
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={nextEntry}
                      aria-label="Next entry"
                      style={{
                        padding: ".35rem .7rem",
                        borderRadius: 6,
                        border: "1px solid rgba(0,0,0,.1)",
                        background: "#f4f4f4",
                        cursor: "pointer",
                      }}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Card 1: Development Progress */}
            <div className={styles.logCard}>
              <h3>⚙️ Development Progress</h3>
              {isAdmin ? (
                <textarea
                  className={styles.logTextarea}
                  placeholder="Enter notes for Development Progress..."
                  value={developmentProgress}
                  onChange={(e) => setDevelopmentProgress(e.target.value)}
                />
              ) : loading ? (
                <p className={styles.cardTextMuted}>Loading…</p>
              ) : current?.development_progress ? (
                <p className={styles.cardText}>{current.development_progress}</p>
              ) : (
                <p className={styles.cardTextMuted}>Coming soon…</p>
              )}
            </div>

            {/* Card 2: Game Mechanics */}
            <div className={styles.logCard}>
              <h3>🧩 Game Mechanics</h3>
              {isAdmin ? (
                <textarea
                  className={styles.logTextarea}
                  placeholder="Enter notes for Game Mechanics..."
                  value={gameMechanics}
                  onChange={(e) => setGameMechanics(e.target.value)}
                />
              ) : loading ? (
                <p className={styles.cardTextMuted}>Loading…</p>
              ) : current?.game_mechanics ? (
                <p className={styles.cardText}>{current.game_mechanics}</p>
              ) : (
                <p className={styles.cardTextMuted}>Coming soon…</p>
              )}
            </div>

            {/* Card 3: Art & Design */}
            <div className={styles.logCard}>
              <h3>🎨 Art & Design</h3>
              {isAdmin ? (
                <textarea
                  className={styles.logTextarea}
                  placeholder="Enter notes for Art & Design..."
                  value={artDesign}
                  onChange={(e) => setArtDesign(e.target.value)}
                />
              ) : loading ? (
                <p className={styles.cardTextMuted}>Loading…</p>
              ) : current?.art_design ? (
                <p className={styles.cardText}>{current.art_design}</p>
              ) : (
                <p className={styles.cardTextMuted}>Coming soon…</p>
              )}
            </div>

            {/* Card 4: Audio */}
            <div className={styles.logCard}>
              <h3>🔊 Audio</h3>
              {isAdmin ? (
                <textarea
                  className={styles.logTextarea}
                  placeholder="Enter notes for Audio..."
                  value={audio}
                  onChange={(e) => setAudio(e.target.value)}
                />
              ) : loading ? (
                <p className={styles.cardTextMuted}>Loading…</p>
              ) : current?.audio ? (
                <p className={styles.cardText}>{current.audio}</p>
              ) : (
                <p className={styles.cardTextMuted}>Coming soon…</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Viewer pagination (bottom) */}
      {!isAdmin && entries.length > 1 && (
        <div
          style={{
            display: "flex",
            gap: ".75rem",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <button
            onClick={prevEntry}
            aria-label="Previous entry"
            style={{
              padding: ".45rem .9rem",
              borderRadius: 6,
              border: "1px solid rgba(0,0,0,.1)",
              background: "#f4f4f4",
              cursor: "pointer",
            }}
          >
            ← Previous
          </button>
          <div style={{ color: "#666", fontSize: ".9rem", alignSelf: "center" }}>
            {currentIndex + 1} / {entries.length}
          </div>
          <button
            onClick={nextEntry}
            aria-label="Next entry"
            style={{
              padding: ".45rem .9rem",
              borderRadius: 6,
              border: "1px solid rgba(0,0,0,.1)",
              background: "#f4f4f4",
              cursor: "pointer",
            }}
          >
            Next →
          </button>
        </div>
      )}

      {/* Admin submit/clear */}
      {isAdmin && (
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            marginTop: "1.25rem",
          }}
        >
          <button
            className={styles.submitBtnTech}
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Submitting…" : "Submit Technical Log"}
          </button>
          <button
            className={styles.clearBtnTech}
            onClick={handleClear}
            style={{
              background: "#e0e0e0",
              color: "#111",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 6,
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
            disabled={submitting}
          >
            Clear
          </button>
        </div>
      )}
    </section>
  );
}


