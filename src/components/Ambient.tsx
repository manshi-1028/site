import { useMemo } from 'react'
import { Flower, Balloon, Cake } from './Icons'

export interface ReleasedBalloon {
  id: string
  color: string
  tag?: string
}

interface AmbientProps {
  releasedBalloons?: ReleasedBalloon[]
  reducedMotion?: boolean
}

const COLORS = ['var(--lilac)', 'var(--blush)', 'var(--gold-soft)', 'var(--lilac-soft)']

/** Fixed, non-interactive drifting background: flowers, balloons, rare tiny cakes. */
export function Ambient({ releasedBalloons = [], reducedMotion = false }: AmbientProps) {
  const items = useMemo(() => {
    const arr: { kind: 'flower' | 'balloon' | 'cake'; x: number; y: number; size: number; delay: number; color: string }[] = []
    for (let i = 0; i < 12; i++) {
      const roll = Math.random()
      arr.push({
        kind: roll < 0.55 ? 'flower' : roll < 0.9 ? 'balloon' : 'cake',
        x: Math.random() * 94,
        y: Math.random() * 94,
        size: 22 + Math.random() * 26,
        delay: Math.random() * 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    }
    return arr
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="ambient-layer" aria-hidden="true">
      {items.map((it, i) => (
        <div
          key={i}
          className={reducedMotion ? 'ambient-item' : 'ambient-item fx-float'}
          style={{ left: `${it.x}%`, top: `${it.y}%`, animationDelay: `${it.delay}s` }}
        >
          {it.kind === 'flower' && <Flower size={it.size} color={it.color} />}
          {it.kind === 'balloon' && <Balloon size={it.size * 0.8} color={it.color} />}
          {it.kind === 'cake' && <Cake size={it.size} kawaii={false} />}
        </div>
      ))}
      {releasedBalloons.map((b, i) => (
        <div
          key={b.id}
          className={reducedMotion ? 'ambient-item' : 'ambient-item fx-float'}
          style={{ left: `${10 + ((i * 17) % 80)}%`, top: `${8 + ((i * 23) % 60)}%`, opacity: 0.5 }}
        >
          <Balloon size={30} color={b.color} />
        </div>
      ))}
    </div>
  )
}
