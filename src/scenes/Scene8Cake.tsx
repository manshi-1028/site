import { useState } from 'react'
import { Teddy, Confetti } from '../components/Icons'

interface Props {
  candleCount?: number
  onNext: () => void
  onBlip: (kind?: 'pop' | 'stamp' | 'snap' | 'squeak') => void
}

export default function Scene8Cake({ candleCount = 4, onNext, onBlip }: Props) {
  const [lit, setLit] = useState<boolean[]>(Array(candleCount).fill(true))
  const [bounced, setBounced] = useState(false)
  const [wishReady, setWishReady] = useState(false)

  const allOut = lit.every((l) => !l)

  const blowCandle = (i: number) => {
    setLit((prev) => {
      const next = [...prev]
      next[i] = false
      return next
    })
    onBlip('pop')
    setBounced(true)
    window.setTimeout(() => setBounced(false), 400)
  }

  const relightOne = () => {
    const outIdx = lit.findIndex((l) => !l)
    if (outIdx === -1) return
    setLit((prev) => {
      const next = [...prev]
      next[outIdx] = true
      return next
    })
  }

  const handleAllOut = () => {
    if (allOut && !wishReady) {
      setWishReady(true)
      onBlip('stamp')
    }
  }

  return (
    <div className="scene">
      <p className="hand fx-pop-in" style={{ fontSize: 15, color: 'var(--ink-soft)', marginBottom: 4 }}>
        don't tell him I licked the spoon 🥄
      </p>
      <Teddy size={56} mood="chef" className="fx-float" />

      <div
        className={bounced ? 'fx-squash' : ''}
        style={{ position: 'relative', margin: '10px 0 20px' }}
        onAnimationEnd={handleAllOut}
      >
        <svg width="160" height="140" viewBox="0 0 160 140">
          <rect x="16" y="86" width="128" height="46" rx="10" fill="var(--blush-soft)" />
          <rect x="16" y="86" width="128" height="14" fill="var(--blush)" />
          <rect x="30" y="52" width="100" height="40" rx="10" fill="var(--white)" />
          <text x="80" y="78" textAnchor="middle" fontFamily="var(--font-hand)" fontSize="18" fill="var(--plum-deep)">
            {'ANMOL'}
          </text>
          <circle cx="55" cy="118" r="2.4" fill="var(--plum-deep)" />
          <circle cx="105" cy="118" r="2.4" fill="var(--plum-deep)" />
          <path d="M55 123 Q80 130 105 123" stroke="var(--plum-deep)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>

        <div style={{ position: 'absolute', top: -28, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 14 }}>
          {lit.map((isLit, i) => (
            <button key={i} onClick={() => (isLit ? blowCandle(i) : relightOne())} aria-label={`candle ${i + 1}`}>
              <svg width="14" height="34" viewBox="0 0 14 34">
                <rect x="5" y="10" width="4" height="24" rx="2" fill="var(--gold)" />
                {isLit && <ellipse cx="7" cy="6" rx="3.5" ry="6" fill="#f2a552" className="fx-heartbeat" />}
              </svg>
            </button>
          ))}
        </div>
      </div>

      {allOut ? (
        <>
          {wishReady && <Confetti size={30} className="fx-pop-in" />}
          <p className="hand fx-pop-in" style={{ fontSize: 20, color: 'var(--plum-deep)', margin: '10px 0 16px' }}>
            make a wish
          </p>
          <button className="pill-btn fx-wiggle" onClick={onNext}>
            I made one
          </button>
        </>
      ) : (
        <p className="hand" style={{ fontSize: 15, color: 'var(--ink-soft)' }}>
          tap each candle to blow it out
        </p>
      )}
    </div>
  )
}
