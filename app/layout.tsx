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
        {/* Logo — fixed top-right, SVG text fallback (WebContainer: no public/ uploads) */}
        <div
          style={{
            position: 'fixed',
            top: '16px',
            right: '16px',
            zIndex: 50,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="40"
            viewBox="0 0 120 40"
            aria-label="CLOCK logo"
            role="img"
          >
            <defs>
              <filter id="neon-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2.5" result="blur1" />
                <feGaussianBlur stdDeviation="5" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Outer glow layer */}
            <text
              x="60"
              y="30"
              textAnchor="middle"
              fontFamily="Orbitron, monospace"
              fontWeight="900"
              fontSize="26"
              fill="none"
              stroke="rgba(0,255,200,0.25)"
              strokeWidth="8"
            >
              CLOCK
            </text>
            {/* Mid glow layer */}
            <text
              x="60"
              y="30"
              textAnchor="middle"
              fontFamily="Orbitron, monospace"
              fontWeight="900"
              fontSize="26"
              fill="none"
              stroke="rgba(0,255,200,0.55)"
              strokeWidth="4"
            >
              CLOCK
            </text>
            {/* Core text */}
            <text
              x="60"
              y="30"
              textAnchor="middle"
              fontFamily="Orbitron, monospace"
              fontWeight="900"
              fontSize="26"
              fill="#00FFC8"
              filter="url(#neon-glow)"
            >
              CLOCK
            </text>
          </svg>
        </div>
        {children}
      </body>
    </html>
  );
}
