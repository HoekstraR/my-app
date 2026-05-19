import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import HealthSignal from "@/components/HealthSignal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-sharetech",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Your Website - Ready to Customize!",
  description: "This is your starter website. Chat with AI to transform it into exactly what you need - no technical skills required!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} ${shareTechMono.variable} antialiased`}
      >
        <HealthSignal />
        {children}
      </body>
    </html>
  );
}
