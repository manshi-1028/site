import { useRef, useState } from 'react'

interface ProgressFlowerProps {
  completed: number
  total: number
  onSecretHold?: () => void
}

/** Corner bud that blooms one petal per completed scene. Tap for a count, long-press for a secret. */
export function ProgressFlower({ completed, total, onSecretHold }: ProgressFlowerProps) {
  const [showCount, setShowCount] = useState(false)
  const holdTimer = useRef<number | null>(null)

  const petals = Array.from({ length: total })

  const handlePointerDown = () => {
    holdTimer.current = window.setTimeout(() => {
      onSecretHold?.()
    }, 2000)
  }
  const clearHold = () => {
    if (holdTimer.current) window.clearTimeout(holdTimer.current)
  }

  return (
    <button
      className="icon-btn"
      aria-label={`Progress: ${completed} of ${total}`}
      onClick={() => {
        setShowCount(true)
        window.setTimeout(() => setShowCount(false), 1400)
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={clearHold}
      onPointerLeave={clearHold}
      style={{ position: 'relative' }}
    >
      <svg width="26" height="26" viewBox="0 0 60 60">
        {petals.map((_, i) => {
          const deg = (360 / total) * i
          const bloomed = i < completed
          return (
            <ellipse
              key={i}
              cx="30" cy="14" rx="6" ry="9"
              fill={bloomed ? 'var(--blush)' : 'var(--lilac-soft)'}
              opacity={bloomed ? 1 : 0.5}
              transform={`rotate(${deg} 30 30)`}
            />
          )
        })}
        <circle cx="30" cy="30" r="7" fill="var(--gold)" />
      </svg>
      {showCount && (
        <span
          className="hand fx-pop-in"
          style={{
            position: 'absolute',
            top: '110%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--white)',
            borderRadius: 12,
            padding: '4px 10px',
            fontSize: 16,
            whiteSpace: 'nowrap',
            boxShadow: 'var(--shadow-paper-sm)',
            color: 'var(--plum-deep)',
          }}
        >
          {completed} of {total}, baby.
        </span>
      )}
    </button>
  )
}
