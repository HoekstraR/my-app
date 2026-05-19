
'use client'

interface SecondsBarProps {
  seconds: number
}

export default function SecondsBar({ seconds }: SecondsBarProps) {
  const pct = (seconds / 60) * 100

  return (
    <div
      className="w-full h-[2px] rounded-full overflow-hidden"
      style={{ background: '#1a3040' }}
    >
      <div
        className="h-full rounded-full"
        style={{
          width: `${pct}%`,
          background: '#00f5ff',
          boxShadow: '0 0 8px #00f5ff, 0 0 16px #00f5ff44',
          transition: seconds === 0 ? 'none' : 'width 0.9s linear',
        }}
      />
    </div>
  )
}
