import type { Metadata } from "next";
import { AuthProvider } from "./components/AuthContext";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | DesignSystems.social",
    default: "DesignSystems.social",
  },
  description: "The Design Systems Community",
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
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
