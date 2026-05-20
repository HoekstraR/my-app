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
        {children}
      </body>
    </html>
  );
}
