/**
 * Root page — Server Component wrapper.
 *
 * This file imports and renders <HomePage /> and should NOT be changed
 * to a client component ('use client'). WebContainer has issues with
 * client components as the root page (parameter serialization problems).
 *
 * Dex writes the actual app in components/HomePage.tsx (which CAN be
 * a client component). This wrapper just renders it.
 */
import DigitalClock from '@/components/DigitalClock';

export default function Page() {
  return <DigitalClock />;
}
