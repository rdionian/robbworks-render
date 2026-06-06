"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [nextUrl, setNextUrl] = useState("/projects/moonlit-journey");

  useEffect(() => {
    try {
      const search = typeof window !== "undefined" ? window.location.search : "";
      const params = new URLSearchParams(search);
      const n = params.get("next");
      if (n && typeof n === "string") setNextUrl(n);
    } catch {
      // ignore
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.replace(nextUrl);
      } else {
        const { error: msg } = await res.json().catch(() => ({}));
        setError(msg || "Invalid credentials");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0a0a0a",
      fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{
        background: "rgba(10, 10, 10, 0.85)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: 16,
        padding: "2.5rem 2rem",
        width: "100%",
        maxWidth: 400,
        boxShadow: "0 0 30px rgba(0, 200, 255, 0.15)",
        backdropFilter: "blur(8px)",
      }}>
        <h1 style={{
          color: "#fff",
          fontSize: "1.5rem",
          fontWeight: 700,
          marginBottom: "1.75rem",
          textAlign: "center",
          letterSpacing: 1,
          textShadow: "0 0 10px rgba(0, 255, 200, 0.3)",
        }}>
          Admin
        </h1>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
            autoComplete="username"
            style={{
              padding: "0.75rem 1rem",
              borderRadius: 8,
              border: "1px solid rgba(255, 255, 255, 0.15)",
              background: "rgba(255, 255, 255, 0.05)",
              color: "#fff",
              fontSize: "1rem",
              outline: "none",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            style={{
              padding: "0.75rem 1rem",
              borderRadius: 8,
              border: "1px solid rgba(255, 255, 255, 0.15)",
              background: "rgba(255, 255, 255, 0.05)",
              color: "#fff",
              fontSize: "1rem",
              outline: "none",
            }}
          />

          {error && (
            <p style={{ color: "#ff6b6b", fontSize: "0.875rem", margin: 0 }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={busy}
            style={{
              marginTop: 4,
              padding: "0.85rem",
              borderRadius: 8,
              border: "2px solid rgba(0, 200, 80, 0.55)",
              background: "transparent",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: 700,
              letterSpacing: 1,
              cursor: busy ? "not-allowed" : "pointer",
              opacity: busy ? 0.6 : 1,
              transition: "box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease",
            }}
            onMouseEnter={(e) => {
              if (!busy) {
                e.currentTarget.style.background = "rgba(0, 200, 80, 0.1)";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 200, 80, 0.3)";
                e.currentTarget.style.color = "#4dff99";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.color = "#fff";
            }}
          >
            {busy ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
