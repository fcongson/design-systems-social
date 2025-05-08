import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Your Site Name",
    default: "Your Site Name",
  },
  description: "Your site description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
              Your Site Name
            </Link>
            <div style={{ display: "flex", gap: "var(--spacing-md)" }}>
              <Link href="/media" style={{ color: "var(--color-text)" }}>
                Media
              </Link>
              <Link href="/about" style={{ color: "var(--color-text)" }}>
                About
              </Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer
          className="container"
          style={{
            padding: "var(--spacing-md) 0",
            marginTop: "var(--spacing-2xl)",
            borderTop: "1px solid var(--color-border)",
            color: "var(--color-text-light)",
            textAlign: "center",
          }}
        >
          <p>
            &copy; {new Date().getFullYear()} Your Site Name. All rights
            reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
