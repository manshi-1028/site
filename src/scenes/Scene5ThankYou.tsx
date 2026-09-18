import { useRef, useState } from 'react'
import { Teddy, Balloon, Heart } from '../components/Icons'
import type { AppConfig } from '../types'

interface Props {
  config: AppConfig
  onNext: () => void
  onBalloonRelease: (color: string) => void
}

export default function Scene5ThankYou({ config, onNext, onBalloonRelease }: Props) {
  const [balloonGone, setBalloonGone] = useState(false)
  const [bounced, setBounced] = useState(false)
  const [hugFill, setHugFill] = useState(0)
  const [hugDone, setHugDone] = useState(false)
  const holdTimer = useRef<number | null>(null)
  const holdInterval = useRef<number | null>(null)

  const popBalloon = () => {
    setBalloonGone(true)
    onBalloonRelease('var(--lilac)')
  }

  const startHug = () => {
    if (hugDone) return
    let progress = 0
    holdInterval.current = window.setInterval(() => {
      progress += 100 / 30
      setHugFill(Math.min(100, progress))
      if (progress >= 100) {
        window.clearInterval(holdInterval.current!)
        setHugDone(true)
      }
    }, 100)
  }
  const stopHug = () => {
    if (holdInterval.current) window.clearInterval(holdInterval.current)
    if (!hugDone) setHugFill(0)
  }

  return (
    <div className="scene">
      <div
        onClick={() => setBounced(true)}
        onAnimationEnd={() => setBounced(false)}
        onPointerDown={startHug}
        onPointerUp={stopHug}
        onPointerLeave={stopHug}
        style={{ position: 'relative', cursor: 'pointer' }}
      >
        <Teddy size={100} mood={hugDone ? 'clapping' : 'happy'} className={bounced ? 'fx-squash' : 'fx-float'} />
        {!balloonGone && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              popBalloon()
            }}
            style={{ position: 'absolute', top: -30, right: -20 }}
            aria-label="Tap the balloon"
          >
            <Balloon size={30} color="var(--lilac)" className="fx-float" tag="A" />
          </button>
        )}
        {hugFill > 0 && !hugDone && (
          <div
            style={{
              position: 'absolute', bottom: -14, left: '50%', transform: 'translateX(-50%)',
              width: 60, height: 8, background: 'var(--lilac-soft)', borderRadius: 8, overflow: 'hidden',
            }}
          >
            <div style={{ width: `${hugFill}%`, height: '100%', background: 'var(--blush)' }} />
          </div>
        )}
      </div>

      {hugDone && (
        <p className="hand fx-pop-in" style={{ fontSize: 17, color: 'var(--plum-deep)', marginTop: 8 }}>
          best. hug. ever. <Heart size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
        </p>
      )}

      <h2 className="display" style={{ fontSize: 22, margin: '16px 0 4px', color: 'var(--plum-deep)' }}>
        Thank you for saying yes
      </h2>
      <p className="hand" style={{ fontSize: 18, color: 'var(--ink-soft)', marginBottom: 22 }}>
        this one's just getting started, {config.petNames.thanks}.
      </p>

      <button className="pill-btn fx-wiggle" onClick={onNext}>
        Open your gift
      </button>
    </div>
  )
}
