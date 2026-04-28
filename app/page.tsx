
// Hoofdpagina — blijft altijd een Server Component (geen 'use client' hier)
import TellerApp from '@/components/TellerApp';

export const metadata = {
  title: 'Teller App 🎉',
  description: 'Een vrolijke teller-app voor kinderen!',
};

export default function Page() {
  return <TellerApp />;
}
