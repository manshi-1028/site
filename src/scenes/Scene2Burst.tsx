import { useEffect, useMemo } from 'react'
import { Flower, Heart } from '../components/Icons'

interface Props {
  onDone: () => void
  reducedMotion: boolean
}

export default function Scene2Burst({ onDone, reducedMotion }: Props) {
  useEffect(() => {
    const t = window.setTimeout(onDone, reducedMotion ? 400 : 1800)
    return () => window.clearTimeout(t)
  }, [onDone, reducedMotion])

  const pieces = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 24 + Math.random() * 30,
        delay: Math.random() * 0.6,
        rot: Math.random() * 360,
        kawaii: Math.random() > 0.6,
        heart: Math.random() > 0.75,
      })),
    []
  )

  return (
    <div className="scene" style={{ overflow: 'hidden' }}>
      {pieces.map((p, i) => (
        <div
          key={i}
          className={reducedMotion ? '' : 'fx-pop-in'}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: `${p.top}%`,
            transform: `rotate(${p.rot}deg)`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.heart ? <Heart size={p.size * 0.6} /> : <Flower size={p.size} kawaii={p.kawaii} />}
        </div>
      ))}
      <p className="hand" style={{ position: 'relative', fontSize: 20, color: 'var(--plum-deep)', zIndex: 2 }}>
        ✨
      </p>
    </div>
  )
}
