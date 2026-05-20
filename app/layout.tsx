import type { Metadata } from "next";
import "./globals.css";
import HealthSignal from "@/components/HealthSignal";

export const metadata: Metadata = {
  title: "Futuristische Digitale Klok",
  description: "Een cyberpunk × glassmorphism digitale klok met neon accenten.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <HealthSignal />
        {/* Logo — fixed top-right, visible on every page */}
        <div
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          <img
            src="/Logo (6).png"
            alt="Logo"
            style={{
              width: "120px",
              height: "auto",
              display: "block",
              filter: "drop-shadow(0 0 8px #00FFC8) drop-shadow(0 0 18px #00B4FF)",
              opacity: 0.92,
            }}
          />
        </div>
        {children}
      </body>
    </html>
  );
}
