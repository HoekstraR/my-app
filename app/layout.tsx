import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HealthSignal from "@/components/HealthSignal";
// JetBrains Mono is loaded inside DigitalClock as a component-level font

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Futuristische Digitale Klok",
  description: "Een cyberpunk digitale klok — neon cyan op een zwart scherm met scanlines, digit flip animaties en een pulserende progressiebalk.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HealthSignal />
        {children}
      </body>
    </html>
  );
}
