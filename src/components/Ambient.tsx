import { useMemo } from 'react'
import { Flower, Balloon, Cake, Heart, Star, Sparkle } from './Icons'

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

/** Fixed, non-interactive drifting background: flowers, balloons, hearts, stars, sparkles, rare cakes. */
export function Ambient({ releasedBalloons = [], reducedMotion = false }: AmbientProps) {
  const items = useMemo(() => {
    const arr: { kind: 'flower' | 'balloon' | 'cake' | 'heart' | 'star' | 'sparkle'; x: number; y: number; size: number; delay: number; color: string }[] = []
    for (let i = 0; i < 20; i++) {
      const roll = Math.random()
      let kind: typeof arr[number]['kind']
      if (roll < 0.34) kind = 'flower'
      else if (roll < 0.56) kind = 'balloon'
      else if (roll < 0.72) kind = 'heart'
      else if (roll < 0.86) kind = 'star'
      else if (roll < 0.95) kind = 'sparkle'
      else kind = 'cake'
      arr.push({
        kind,
        x: Math.random() * 94,
        y: Math.random() * 94,
        size: 18 + Math.random() * 26,
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
          style={{ left: it.x + '%', top: it.y + '%', animationDelay: it.delay + 's' }}
        >
          {it.kind === 'flower' && <Flower size={it.size} color={it.color} kawaii={Math.random() > 0.5} />}
          {it.kind === 'balloon' && <Balloon size={it.size * 0.8} color={it.color} />}
          {it.kind === 'cake' && <Cake size={it.size} kawaii={false} />}
          {it.kind === 'heart' && <Heart size={it.size * 0.6} color={it.color} />}
          {it.kind === 'star' && <Star size={it.size * 0.6} color={it.color === 'var(--lilac)' ? 'var(--gold)' : it.color} />}
          {it.kind === 'sparkle' && <Sparkle size={it.size * 0.5} />}
        </div>
      ))}
      {releasedBalloons.map((b, i) => (
        <div
          key={b.id}
          className={reducedMotion ? 'ambient-item' : 'ambient-item fx-float'}
          style={{ left: (10 + ((i * 17) % 80)) + '%', top: (8 + ((i * 23) % 60)) + '%', opacity: 0.5 }}
        >
          <Balloon size={30} color={b.color} />
        </div>
      ))}
    </div>
  )
}
