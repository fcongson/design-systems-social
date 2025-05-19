import type { Metadata } from "next";
import { AuthProvider } from "./components/AuthContext";
import "./globals.css";
import { Header } from "./components/Header";

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
    <AuthProvider>
      <html lang="en">
        <body>
          <Header />
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
    </AuthProvider>
  );
}
