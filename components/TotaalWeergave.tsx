
'use client';

// =====================================================================
// TotaalWeergave — Toont de som van alle drie tellers
// Heeft een feestelijke kleur wanneer het totaal hoog is
// =====================================================================

interface TotaalWeergaveProps {
  totaal: number;
}

export default function TotaalWeergave({ totaal }: TotaalWeergaveProps) {
  // Kies een kleur afhankelijk van het totaal
  const getTotaalKleur = () => {
    if (totaal >= 200) return 'text-purple-700';
    if (totaal >= 100) return 'text-orange-600';
    if (totaal >= 50) return 'text-pink-600';
    return 'text-gray-700';
  };

  return (
    <div
      className="max-w-md mx-auto mb-6 bg-white rounded-3xl shadow-xl border-4 border-yellow-300 p-4 text-center"
      role="region"
      aria-label="Totaal van alle tellers"
    >
      <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">
        🏆 Totaal Samen
      </p>
      <p
        className={`text-7xl font-black tabular-nums transition-all duration-300 ${getTotaalKleur()}`}
        aria-live="polite"
        aria-atomic="true"
      >
        {totaal}
      </p>
      {totaal >= 100 && (
        <p className="text-sm font-bold text-orange-500 mt-1 animate-pulse">
          Wauw, meer dan 100! 🚀
        </p>
      )}
    </div>
  );
}
