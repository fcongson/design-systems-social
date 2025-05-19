"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

export const Header = () => {
  const { user, signOut } = useAuth();

  const router = useRouter();

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    const { error } = await signOut();
    if (error) {
      console.error("Sign out error:", error.message);
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <header
      className="container"
      style={{
        padding: "var(--spacing-md) 0",
        borderBottom: "1px solid var(--color-border)",
        marginBottom: "var(--spacing-md)",
      }}
    >
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: "var(--font-size-xl)",
            fontWeight: "bold",
            color: "var(--color-text)",
          }}
        >
          DesignSystems.social
        </Link>
        <div style={{ display: "flex", gap: "var(--spacing-md)" }}>
          <Link href="/media" style={{ color: "var(--color-text)" }}>
            Media
          </Link>
          <Link href="/about" style={{ color: "var(--color-text)" }}>
            About
          </Link>
          {user?.email ? (
            <Link
              href="/sign-in"
              style={{ color: "var(--color-text)" }}
              onClick={handleSignOut}
            >
              Sign out
            </Link>
          ) : (
            <Link href="/sign-in" style={{ color: "var(--color-text)" }}>
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};
