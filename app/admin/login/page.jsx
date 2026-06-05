"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Optional: make sure this page isn't pre-rendered statically
export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [nextUrl, setNextUrl] = useState("/projects/moonlit-journey"); // default target

  // Read ?next=... from the URL safely without useSearchParams
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
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.replace(nextUrl); // go to echoes-of-the-goddess (or ?next=...)
      } else {
        const { error } = await res.json().catch(() => ({}));
        alert(error || "Invalid password");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{ maxWidth: 420, margin: "4rem auto", fontFamily: "system-ui" }}>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin} style={{ display: "grid", gap: 12 }}>
        <input
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
        />
        <button type="submit" disabled={busy} style={{ padding: 10, borderRadius: 8 }}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <p style={{ marginTop: 12, color: "#666", fontSize: 14 }}>
        You’ll be redirected to <code>{nextUrl}</code> after login.
      </p>
    </main>
  );
}
