
interface ClockColonProps {
  fontClass: string
}

export default function ClockColon({ fontClass }: ClockColonProps) {
  return (
    <span
      className={`${fontClass} font-light text-[#00f5ff] colon-pulse select-none`}
      aria-hidden="true"
      style={{
        fontSize: 'clamp(3rem, 10vw, 7rem)',
        lineHeight: 1,
        textShadow: '0 0 10px #00f5ff, 0 0 20px #ff00aa66',
      }}
    >
      :
    </span>
  )
}
