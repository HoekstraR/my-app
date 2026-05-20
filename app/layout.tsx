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
        {/* Logo — fixed top-right, visible on all pages */}
        <div
          style={{
            position: 'fixed',
            top: '16px',
            right: '16px',
            zIndex: 50,
            pointerEvents: 'none',
          }}
        >
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              height: '48px',
              width: 'auto',
              maxWidth: '120px',
              display: 'block',
              filter:
                'drop-shadow(0 0 6px rgba(0, 255, 200, 0.7)) drop-shadow(0 0 12px rgba(0, 180, 255, 0.4))',
            }}
          />
        </div>
        {children}
      </body>
    </html>
  );
}
