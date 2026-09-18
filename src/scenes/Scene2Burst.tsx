import React, { useEffect, useMemo } from 'react'
import { Flower, Heart } from '../components/Icons'

interface Props {
  onDone: () => void
  reducedMotion: boolean
}

export default function Scene2Burst({ onDone, reducedMotion }: Props) {
  useEffect(() => {
    const t = window.setTimeout(
      onDone,
      reducedMotion ? 400 : 3200
    )

    return () => window.clearTimeout(t)
  }, [onDone, reducedMotion])

  const flowers = useMemo(
    () =>
      Array.from({ length: 48 }).map((_, i) => {
        const angle = i * 43
        const radius = 20 + i * 12
        const size = 18 + (i % 5) * 7

        return {
          angle,
          radius,
          size,
          delay: i * 0.045,
          kawaii: i % 4 !== 0,
          heart: i % 9 === 0,
        }
      }),
    []
  )

  const petals = useMemo(
    () =>
      Array.from({ length: 35 }).map((_, i) => ({
        angle: i * 51,
        distance: 180 + i * 20,
        delay: 0.7 + i * 0.035,
      })),
    []
  )

  const sparkles = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        x: Math.cos(i * 1.8) * (150 + i * 14),
        y: Math.sin(i * 1.8) * (150 + i * 14),
        delay: 0.5 + i * 0.045,
      })),
    []
  )

  return (
    <div className="flower-spiral-scene">
      <div className="spiral-center-flower">
        <Flower size={58} kawaii />
      </div>

      {!reducedMotion &&
        flowers.map((flower, i) => (
          <div
            key={`flower-${i}`}
            className="spiral-flower"
            style={
              {
                '--angle': `${flower.angle}deg`,
                '--radius': `${flower.radius}px`,
                '--flower-size': `${flower.size}px`,
                '--delay': `${flower.delay}s`,
                '--duration': `${2.2 + i * 0.015}s`,
              } as React.CSSProperties
            }
          >
            {flower.heart ? (
              <Heart size={flower.size * 0.65} />
            ) : (
              <Flower
                size={flower.size}
                kawaii={flower.kawaii}
              />
            )}
          </div>
        ))}

      {!reducedMotion &&
        petals.map((petal, i) => (
          <div
            key={`petal-${i}`}
            className="spiral-petal"
            style={
              {
                '--petal-angle': `${petal.angle}deg`,
                '--petal-distance': `${petal.distance}px`,
                '--petal-delay': `${petal.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}

      {!reducedMotion &&
        sparkles.map((sparkle, i) => (
          <div
            key={`sparkle-${i}`}
            className="spiral-sparkle"
            style={
              {
                '--sparkle-x': `${sparkle.x}px`,
                '--sparkle-y': `${sparkle.y}px`,
                '--sparkle-delay': `${sparkle.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}

      <div className="spiral-message">
        ✨
      </div>
    </div>
  )
}
