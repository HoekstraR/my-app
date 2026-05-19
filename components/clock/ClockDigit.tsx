
'use client'

interface ClockDigitProps {
  value: string
  fontClass: string
}

export default function ClockDigit({ value, fontClass }: ClockDigitProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)', lineHeight: 1, width: '1.05ch' }}
    >
      <span
        key={value}
        className={`${fontClass} font-bold text-[#00f5ff] block digit-in tabular-nums`}
        style={{
          letterSpacing: '-0.05em',
          textShadow:
            '0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 40px #00f5ffaa, 0 0 80px #00f5ff44',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </span>
    </div>
  )
}
