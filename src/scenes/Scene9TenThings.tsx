import { useEffect, useState } from 'react'
import { Flower, Heart, MusicNote, PawPrint, Star, DiaryBook, Sun, Sparkle } from '../components/Icons'
import type { AppConfig } from '../types'

interface Props {
  config: AppConfig
  onNext: () => void
}

const ICONS: Record<string, JSX.Element> = {
  sparkle: <Sparkle size={18} />,
  heart: <Heart size={18} />,
  music: <MusicNote size={18} />,
  paw: <PawPrint size={18} />,
  star: <Star size={18} />,
  diary: <DiaryBook size={18} />,
  sun: <Sun size={18} />,
  flower: <Flower size={18} kawaii />,
}

export default function Scene9TenThings({ config, onNext }: Props) {
  const [revealed, setRevealed] = useState(1)

  useEffect(() => {
    if (revealed < config.tenThings.length) {
      const t = window.setTimeout(() => setRevealed((r) => r + 1), 650)
      return () => window.clearTimeout(t)
    }
  }, [revealed, config.tenThings.length])

  return (
    <div className="scene" style={{ justifyContent: 'flex-start', paddingTop: 50 }}>
      <h2 className="display" style={{ fontSize: 22, color: 'var(--plum-deep)', marginBottom: 2 }}>
        ten things I love about you, {config.petNames.tenThings}
      </h2>
      <div className="wavy-divider" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 360 }}>
        {config.tenThings.slice(0, revealed).map((item, i) => (
          <div
            key={i}
            className="fx-pop-in"
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'var(--white)', borderRadius: 16, padding: '10px 14px',
              boxShadow: 'var(--shadow-paper-sm)', textAlign: 'left',
            }}
          >
            <span className="sticker-badge" style={{ minWidth: 26, justifyContent: 'center', padding: '4px 8px' }}>
              {i + 1}
            </span>
            {ICONS[item.icon] ?? <Heart size={18} />}
            <span style={{ fontSize: 14, color: 'var(--ink)' }}>{item.text}</span>
          </div>
        ))}
      </div>

      {revealed >= config.tenThings.length && (
        <button className="pill-btn fx-wiggle fx-pop-in" onClick={onNext} style={{ marginTop: 26, marginBottom: 16 }}>
          Keep going
        </button>
      )}
    </div>
  )
}
