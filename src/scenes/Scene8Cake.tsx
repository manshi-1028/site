import { useState } from 'react'
import { Teddy, Confetti, Heart, Sparkle, Star } from '../components/Icons'

interface Props {
  candleCount?: number
  onNext: () => void
  onBlip: (kind?: 'pop' | 'stamp' | 'snap' | 'squeak') => void
}

const SPRINKLE_COLORS = ['var(--gold)', 'var(--blush)', 'var(--lilac)', 'var(--plum)', '#f2a552']

export default function Scene8Cake({ candleCount = 6, onNext, onBlip }: Props) {
  const [lit, setLit] = useState<boolean[]>(Array(candleCount).fill(true))
  const [bounced, setBounced] = useState(false)
  const [wishReady, setWishReady] = useState(false)

  const allOut = lit.every((l) => !l)
  const outCount = lit.filter((l) => !l).length

  const sprinkles = Array.from({ length: 22 }).map((_, i) => ({
    x: 20 + Math.random() * 150,
    y: 78 + Math.random() * 18,
    rot: Math.random() * 360,
    color: SPRINKLE_COLORS[i % SPRINKLE_COLORS.length],
  }))

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
      <p className="hand fx-pop-in" style={{ fontSize: 15, color: 'var(--ink-soft)', marginBottom: 2 }}>
        don't tell him I licked the spoon 🥄
      </p>
      <Teddy size={58} mood="chef" className="fx-float" />

      <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Sparkle size={16} className="fx-sparkle" style={{ position: 'absolute', left: '18%', top: 10 }} />
        <Star size={14} className="fx-float" style={{ position: 'absolute', right: '16%', top: 4 }} />
        <Sparkle size={14} className="fx-sparkle" style={{ position: 'absolute', right: '22%', bottom: 6 }} />

        <div
          className={bounced ? 'fx-squash' : ''}
          style={{ position: 'relative', margin: '10px 0 22px' }}
          onAnimationEnd={handleAllOut}
        >
          <svg width="220" height="200" viewBox="0 0 220 200">
            <ellipse cx="110" cy="182" rx="88" ry="10" fill="var(--gold-soft)" opacity="0.6" />

            <rect x="20" y="118" width="180" height="58" rx="14" fill="var(--blush-soft)" />
            <rect x="20" y="118" width="180" height="16" fill="var(--blush)" />
            <path
              d="M20 134 Q30 148 40 134 T60 134 T80 134 T100 134 T120 134 T140 134 T160 134 T180 134 T200 134 V118 H20 Z"
              fill="var(--white)"
            />

            <rect x="52" y="66" width="116" height="52" rx="12" fill="var(--white)" />
            <rect x="52" y="66" width="116" height="14" fill="var(--lilac-soft)" />
            <path
              d="M52 80 Q60 92 68 80 T84 80 T100 80 T116 80 T132 80 T148 80 T164 80 T168 80 V66 H52 Z"
              fill="var(--gold-soft)"
              opacity="0.85"
            />

            {sprinkles.map((s, i) => (
              <rect
                key={i}
                x={s.x}
                y={s.y}
                width="5"
                height="2.4"
                rx="1"
                fill={s.color}
                transform={`rotate(${s.rot} ${s.x} ${s.y})`}
              />
            ))}

            <circle cx="80" cy="152" r="3" fill="var(--plum-deep)" />
            <circle cx="140" cy="152" r="3" fill="var(--plum-deep)" />
            <path d="M80 159 Q110 168 140 159" stroke="var(--plum-deep)" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="70" cy="156" r="4" fill="var(--blush)" opacity="0.7" />
            <circle cx="150" cy="156" r="4" fill="var(--blush)" opacity="0.7" />

            <circle cx="110" cy="58" r="8" fill="#c94f6d" />
            <path d="M110 50 Q116 38 124 34" stroke="#4a7a4a" strokeWidth="2" fill="none" strokeLinecap="round" />
            <ellipse cx="107" cy="55" rx="2" ry="1.4" fill="rgba(255,255,255,0.6)" />

            <text x="110" y="98" textAnchor="middle" fontFamily="var(--font-hand)" fontSize="20" fill="var(--plum-deep)">
              ANMOL
            </text>
          </svg>

          <div
            style={{
              position: 'absolute',
              top: -30,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            {lit.map((isLit, i) => (
              <button key={i} onClick={() => (isLit ? blowCandle(i) : relightOne())} aria-label={"candle " + (i + 1)}>
                <svg width="12" height="32" viewBox="0 0 12 32">
                  <rect x="4" y="10" width="4" height="22" rx="2" fill={SPRINKLE_COLORS[i % SPRINKLE_COLORS.length]} />
                  {isLit && <ellipse cx="6" cy="6" rx="3.2" ry="5.6" fill="#f2a552" className="fx-heartbeat" />}
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {!allOut && (
        <p className="hand" style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 4 }}>
          {outCount === 0 ? 'tap each candle to blow it out' : (candleCount - outCount) + ' left...'}
        </p>
      )}

      {allOut ? (
        <>
          {wishReady && (
            <div className="fx-pop-in" style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4 }}>
              <Confetti size={26} />
              <Heart size={20} className="fx-heartbeat" />
              <Confetti size={26} />
            </div>
          )}
          <p className="hand fx-pop-in" style={{ fontSize: 22, color: 'var(--plum-deep)', margin: '6px 0 16px' }}>
            make a wish ✨
          </p>
          <button className="pill-btn fx-wiggle" onClick={onNext}>
            I made one
          </button>
        </>
      ) : (
        <div style={{ height: 44 }} />
      )}
    </div>
  )
}
