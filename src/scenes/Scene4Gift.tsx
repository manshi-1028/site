import { useRef, useState } from 'react'
import { Teddy, GiftBox } from '../components/Icons'

interface Props {
  onYes: () => void
  onBlip: (kind?: 'pop' | 'stamp' | 'snap' | 'squeak') => void
}

const BUBBLES = [
  'wait... what? 🥺',
  'but I worked SO hard on this...',
  'I even practiced my happy dance...',
  "okay. I'm not crying. you're crying.",
]

export default function Scene4Gift({ onYes, onBlip }: Props) {
  const [dodges, setDodges] = useState(0)
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null)
  const [clapping, setClapping] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const bubbleIndex = Math.min(dodges, BUBBLES.length) - 1
  const finalPlea = dodges >= 4

  const dodgeNo = () => {
    onBlip('pop')
    setDodges((d) => d + 1)
    const container = containerRef.current
    const w = container?.clientWidth ?? 300
    const h = container?.clientHeight ?? 400
    const x = 20 + Math.random() * (w - 100)
    const y = 40 + Math.random() * (h - 160)
    setNoPos({ x, y })
  }

  const handleYes = () => {
    setClapping(true)
    setAccepted(true)
    onBlip('stamp')
    window.setTimeout(onYes, 1200)
  }

  const noScale = Math.max(0.55, 1 - dodges * 0.09)

  return (
    <div className="scene" ref={containerRef} style={{ position: 'relative' }}>
      <h2 className="display" style={{ fontSize: 22, color: 'var(--plum-deep)', marginBottom: 26 }}>
        do you want your gift?
      </h2>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 40, marginBottom: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Teddy size={70} mood={clapping ? 'clapping' : 'gasp'} className="fx-float" />
          <GiftBox size={30} />
          <button
            className="pill-btn gold fx-wiggle fx-heartbeat"
            onClick={handleYes}
            style={{ fontSize: 18, padding: '16px 40px' }}
          >
            Yes
          </button>
        </div>

        {!accepted && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <Teddy size={54} mood="sad" className={dodges > 0 ? 'fx-teeter' : undefined} />
          </div>
        )}
      </div>

      {!accepted && (
        <button
          className="pill-btn ghost"
          onClick={dodgeNo}
          style={{
            position: noPos ? 'absolute' : 'static',
            left: noPos?.x,
            top: noPos?.y,
            transform: `scale(${noScale})`,
            transition: 'left .3s ease, top .3s ease',
            fontSize: 14,
            padding: '10px 22px',
          }}
        >
          {finalPlea ? 'fine. FINE. press yes 🙄' : 'No'}
        </button>
      )}

      {bubbleIndex >= 0 && !accepted && (
        <div
          className="speech-bubble fx-pop-in"
          style={{ position: 'absolute', top: '18%', right: '8%', maxWidth: 170 }}
        >
          {BUBBLES[bubbleIndex]}
        </div>
      )}
    </div>
  )
}
