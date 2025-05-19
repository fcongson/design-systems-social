"use client";

import { useState } from "react";
import { useAuth } from "../components/AuthContext";

export default function SignInPage() {
  const { signInWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const { error } = await signInWithEmail(email);

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  }

  return (
    <div className="container">
      <h1>Sign in with Magic Link</h1>
      {sent ? (
        <p>Check your email for a magic link to sign in.</p>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
          />
          <button type="submit">Send Magic Link</button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      )}
    </div>
  );
}
