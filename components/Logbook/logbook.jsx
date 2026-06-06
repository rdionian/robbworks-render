"use client";

import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import imageCompression from "browser-image-compression";
import styles from "./logbook.module.css";

import { logbookData as echoesLogs } from "@/components/Logbook/data/echoes-data";

const projectLogs = {
  "echoes-of-the-goddess": echoesLogs,
};

export default function Logbook({ project }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [entries, setEntries] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newEntry, setNewEntry] = useState({
    title: "",
    date: "",
    text: "",
    media: [], // [{type:"image"|"video", src:string}]
  });
  const [previewMedia, setPreviewMedia] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "same-origin",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Logout failed");
      }

      setIsAdmin(false);

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("admin-session-changed"));
        try {
          localStorage.setItem("admin_session_update", String(Date.now()));
        } catch {}
      }
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed. Check console.");
    }
  };

  // ---- session check
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/session", { cache: "no-store" });
        const { admin } = await res.json();
        setIsAdmin(!!admin);
      } catch {
        setIsAdmin(false);
      }
    })();
  }, []);

  // ---- load log data for the correct project
  useEffect(() => {
    const projectKey = project || "echoes-of-the-goddess";

    if (projectKey === "moonlit-journey") {
      (async () => {
        try {
          const res = await fetch("/api/devlogs");
          const data = await res.json();
          if (res.ok) {
            const parsed = data.map((e) => ({
              ...e,
              text: e.text_body,
              media: e.media ? JSON.parse(e.media) : [],
            }));
            setEntries(parsed);
            setCurrentIndex(0);
          }
        } catch {
          setEntries([]);
        }
      })();
    } else {
      const logs = projectLogs[projectKey] || [];
      setEntries(logs);
      setCurrentIndex(0);
    }
  }, [project]);

  const viewerEntry = entries[currentIndex];

  // ---- nav
  const handlePrev = () =>
    setCurrentIndex((p) => (p > 0 ? p - 1 : Math.max(entries.length - 1, 0)));
  const handleNext = () =>
    setCurrentIndex((p) => (p < entries.length - 1 ? p + 1 : 0));

  // ---- youtube url -> id
  function youtubeIdFromUrl(url) {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
      if (u.hostname === "youtu.be") return u.pathname.slice(1);
      return null;
    } catch {
      return null;
    }
  }

  const handleAddVideoUrl = () => {
    const url = prompt("Paste a YouTube URL:");
    const id = url ? youtubeIdFromUrl(url) : null;
    if (id) {
      setNewEntry((prev) => ({
        ...prev,
        media: [...prev.media, { type: "video", src: id }],
      }));
    } else {
      alert("That doesn't look like a valid YouTube URL.");
    }
  };

  const handleRemoveMedia = (index) => {
    setNewEntry((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index),
    }));
  };

  // ---- upload images
  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files || !files.length) return;

    setUploading(true);
    const uploaded = [];

    try {
      for (const file of files) {
        let fileToUpload = file;

        // compress images larger than 3.5 MB
        if (file.size > 3.5 * 1024 * 1024) {
          const options = {
            maxSizeMB: 3, // target max size in MB
            maxWidthOrHeight: 1920, // shrink large dimensions
            useWebWorker: true,
          };
          try {
            fileToUpload = await imageCompression(file, options);
          } catch (err) {
            console.warn("Image compression failed, using original:", err);
          }
        }

        const formData = new FormData();
        formData.append("file", fileToUpload);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
          credentials: "same-origin",
        });

        if (!res.ok) {
          const errText = await res.text();
          console.error("Upload failed:", errText);
          continue;
        }

        const { url } = await res.json();
        if (url) uploaded.push({ type: "image", src: url });
      }

      if (uploaded.length) {
        setNewEntry((prev) => ({ ...prev, media: [...prev.media, ...uploaded] }));
      }
    } catch (err) {
      console.error("File upload error:", err);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };
  // ---- submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newEntry.title || !newEntry.date || !newEntry.text) {
      alert("Please fill all fields before submitting.");
      return;
    }

    const payload = {
      title: newEntry.title,
      date: newEntry.date,
      text_body: newEntry.text,
      media: JSON.stringify(newEntry.media),
    };

    try {
      const res = await fetch("/api/devlogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result?.error || "Failed to submit");

      alert("✅ Entry submitted successfully!");
      setNewEntry({ title: "", date: "", text: "", media: [] });

      const refreshed = await fetch("/api/devlogs");
      const data = await refreshed.json();
      if (refreshed.ok) {
        const parsed = data.map((e) => ({
          ...e,
          text: e.text_body,
          media: e.media ? JSON.parse(e.media) : [],
        }));
        setEntries(parsed);
        setCurrentIndex(0);
      }
    } catch (err) {
      console.error("❌ Error submitting log:", err);
      alert("Error submitting log — check console.");
    }
  };

  //const mediaForView = viewerEntry?.media || [];
  const mediaForView = [
  ...(viewerEntry?.images?.map((img) => ({ type: "image", src: img })) || []),
  ...(viewerEntry?.media || [])
];

  return (
    <div>
      <h1 className={styles.logbookTitle}>Development Logs</h1>

      {/* Top bar: show only when admin; no public login link */}
      <div style={{ marginBottom: "1rem" }}>
        {isAdmin && (
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <span style={{ color: "#2e7d32" }}>Admin mode enabled</span>
            <button
              onClick={handleLogout}
              style={{
                background: "#ff3b30",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "0.3rem 0.75rem",
                cursor: "pointer",
                fontSize: "0.85rem",
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <div className={styles.bookContainer}>
        <div className={styles.book}>
          <div className={styles.innerBook}>
            {/* LEFT PAGE */}
            <div className={styles.leftPage}>
              {isAdmin && (
                <>
                  <label htmlFor="fileUpload" className={styles.addMediaBtn}>
                    📤 Upload Images
                  </label>
                  <input
                    id="fileUpload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />

                  <button
                    type="button"
                    onClick={handleAddVideoUrl}
                    className={styles.addMediaBtn}
                  >
                    🎬 Add YouTube Video
                  </button>

                  {uploading && (
                    <p style={{ color: "#888", fontSize: "0.9rem" }}>
                      Uploading images...
                    </p>
                  )}
                </>
              )}

              {/* stacked, scrollable media column */}
              <div className={styles.imageGrid}>
                {(isAdmin ? newEntry.media : mediaForView).map((item, i) => (
                  <div key={i} className={styles.imageWrapper}>
                    {isAdmin && (
                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => handleRemoveMedia(i)}
                        aria-label="Remove media"
                        title="Remove media"
                      >
                        ✕
                      </button>
                    )}

                    {/* unified media class -> identical sizing */}
                    {item.type === "image" ? (
                      <img
                        src={item.src}
                        alt=""
                        className={styles.media}
                        onClick={() => setPreviewMedia(item.src)}
                      />
                    ) : (
                      <iframe
                          className={styles.media}
                          src={`https://www.youtube.com/embed/${item.src.includes("youtube") || item.src.includes("youtu.be")
                              ? youtubeIdFromUrl(item.src)
                              : item.src
                            }`}
                          title="YouTube video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          referrerPolicy="strict-origin-when-cross-origin"
                          sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
                        />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT PAGE */}
            <div className={styles.rightPage}>
              {!isAdmin ? (
                viewerEntry ? (
                  <>
                    <h2 className={styles.entryTitle}>{viewerEntry.title}</h2>

                    <p className={styles.entryDate}>
                      <em>{viewerEntry.date}</em>
                    </p>

                    {/* ✅ Wrapped body text in its own class so we can style it independently */}
                    <div className={styles.entryBody}>
                      <p className={styles.entryBodyText}>{viewerEntry.text}</p>
                    </div>
                  </>
                ) : (
                  <p>Loading latest log entry...</p>
                )
              ) : (
                <form onSubmit={handleSubmit} className={styles.entryForm}>
                  <input
                    type="text"
                    name="title"
                    value={newEntry.title}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, title: e.target.value })
                    }
                    placeholder="Title"
                    required
                    className={styles.entryInput}
                  />

                  <input
                    type="date"
                    name="date"
                    value={newEntry.date}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, date: e.target.value })
                    }
                    required
                    className={styles.entryInput}
                  />

                  <textarea
                    placeholder="Write your development log here..."
                    value={newEntry.text}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, text: e.target.value })
                    }
                    required
                    className={styles.entryTextarea}
                  />

                  <button type="submit" className={styles.submitBtn}>
                    Submit Log
                  </button>
                </form>
              )}
            </div>

          </div>

          {!isAdmin && entries.length > 1 && (
            <>
              <button className={styles.pageFlipLeft} onPointerDown={handlePrev}>
                <FaArrowAltCircleLeft />
              </button>
              <button className={styles.pageFlipRight} onPointerDown={handleNext}>
                <FaArrowAltCircleRight />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Fullscreen media modal */}
      {previewMedia && (
        <div
          className={styles.modalOverlay}
          onClick={() => setPreviewMedia(null)}
        >
          <img src={previewMedia} alt="Preview" className={styles.modalImage} />
          <button
            type="button"
            className={styles.modalClose}
            onClick={() => setPreviewMedia(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
