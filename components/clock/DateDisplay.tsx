
interface DateDisplayProps {
  dateStr: string
  fontClass: string
}

export default function DateDisplay({ dateStr, fontClass }: DateDisplayProps) {
  return (
    <div className="flex items-center gap-3 w-full justify-center mount-fade" style={{ animationDelay: '0.3s' }}>
      {/* Left decorative line */}
      <div
        className="flex-1 h-px max-w-[80px] date-line"
        style={{
          background: 'linear-gradient(to right, transparent, #1a3040)',
        }}
      />

      <span
        className={`${fontClass} text-[#4a6a7a] tracking-[0.3em] uppercase text-xs sm:text-sm whitespace-nowrap`}
        style={{
          textShadow: '0 0 8px #00f5ff22',
        }}
      >
        {dateStr}
      </span>

      {/* Right decorative line */}
      <div
        className="flex-1 h-px max-w-[80px] date-line"
        style={{
          background: 'linear-gradient(to left, transparent, #1a3040)',
        }}
      />
    </div>
  )
}
