import { Flower } from '../components/Icons'
import type { AppConfig } from '../types'

interface Props {
  config: AppConfig
  onNext: () => void
}

export default function Scene7Timeline({ config, onNext }: Props) {
  return (
    <div className="scene" style={{ justifyContent: 'flex-start', paddingTop: 60 }}>
      <h2 className="display" style={{ fontSize: 24, color: 'var(--plum-deep)', marginBottom: 6 }}>
        our journey
      </h2>
      <div className="wavy-divider" />

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 380,
          display: 'flex',
          flexDirection: 'column',
          gap: 26,
          marginTop: 8,
          paddingLeft: 22,
          borderLeft: '3px dashed var(--lilac)',
        }}
      >
        {config.milestones.map((m, i) => (
          <div key={i} className="fx-pop-in" style={{ position: 'relative', textAlign: 'left' }}>
            <div style={{ position: 'absolute', left: -33, top: 4 }}>
              <Flower size={20} kawaii color="var(--gold)" />
            </div>
            <div
              className="scrap-card"
              style={{
                padding: '14px 16px',
                transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)`,
                maxWidth: 300,
              }}
            >
              <span className="sticker-badge" style={{ marginBottom: 8 }}>
                {m.label}
              </span>
              <p style={{ fontSize: 14, color: 'var(--ink)', marginTop: 8, lineHeight: 1.5 }}>{m.caption}</p>
              {m.photo && (
                <div
                  style={{
                    marginTop: 8,
                    background: 'var(--white)',
                    padding: 6,
                    boxShadow: 'var(--shadow-paper-sm)',
                    display: 'inline-block',
                    transform: `rotate(${i % 2 === 0 ? 2 : -2}deg)`,
                  }}
                >
                  <img src={m.photo} alt={m.label} style={{ width: 140, display: 'block' }} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="pill-btn fx-wiggle" onClick={onNext} style={{ marginTop: 30, marginBottom: 20 }}>
        Keep going
      </button>
    </div>
  )
}
