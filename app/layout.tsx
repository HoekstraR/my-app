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
        {/* Logo — fixed top-right, uploaded PNG via URL-encoded public path */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Logo%20(6).png"
          alt="Logo"
          style={{
            position: 'fixed',
            top: '16px',
            right: '16px',
            zIndex: 50,
            height: '48px',
            width: 'auto',
            pointerEvents: 'none',
            userSelect: 'none',
            filter:
              'drop-shadow(0 0 6px rgba(0,255,200,0.9)) drop-shadow(0 0 14px rgba(0,255,200,0.55)) drop-shadow(0 0 30px rgba(0,255,200,0.25))',
          }}
        />
        {children}
      </body>
    </html>
  );
}
