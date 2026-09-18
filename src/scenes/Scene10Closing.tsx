import { useState } from 'react'
import { Teddy, MusicNote, Camera, Envelope, Balloon } from '../components/Icons'
import type { AppConfig } from '../types'

interface Props {
  config: AppConfig
  onWatchAgain: () => void
  onPlayMelody: () => void
  onBalloonRelease: (color: string) => void
}

type CardKind = 'music' | 'camera' | 'letter'

export default function Scene10Closing({ config, onWatchAgain, onPlayMelody, onBalloonRelease }: Props) {
  const [opened, setOpened] = useState<Set<CardKind>>(new Set())
  const [showLetter, setShowLetter] = useState(false)
  const [showPhotos, setShowPhotos] = useState(false)
  const [released, setReleased] = useState(0)

  const pick = (kind: CardKind) => {
    setOpened((prev) => new Set(prev).add(kind))
    if (kind === 'music') onPlayMelody()
    if (kind === 'camera') setShowPhotos(true)
    if (kind === 'letter') setShowLetter(true)
  }

  const releaseBalloon = () => {
    if (released >= 3) return
    const colors = ['var(--lilac)', 'var(--blush)', 'var(--gold-soft)']
    onBalloonRelease(colors[released])
    setReleased((r) => r + 1)
  }

  const tags = ['to many more', 'always, me', 'see you next year']

  const daysToNext = Math.max(
    0,
    Math.ceil((new Date(config.nextOccasion).getTime() - Date.now()) / 86400000)
  )

  return (
    <div className="scene">
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, marginBottom: 4 }}>
        <Teddy size={40} mood="happy" className="fx-float" />
        <svg width="60" height="30" viewBox="0 0 60 30">
          <rect x="4" y="6" width="52" height="16" rx="3" fill="var(--gold-soft)" stroke="var(--gold)" strokeWidth="1.5" />
          <circle cx="16" cy="24" r="4" fill="var(--plum)" />
          <circle cx="44" cy="24" r="4" fill="var(--plum)" />
        </svg>
      </div>
      <p className="hand" style={{ fontSize: 18, color: 'var(--plum-deep)', margin: '0 0 16px' }}>
        these are for you ♡
      </p>

      <div style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
        {(
          [
            { kind: 'music' as CardKind, icon: <MusicNote size={26} /> },
            { kind: 'camera' as CardKind, icon: <Camera size={28} /> },
            { kind: 'letter' as CardKind, icon: <Envelope size={30} /> },
          ]
        ).map(({ kind, icon }) => {
          const done = opened.has(kind)
          return (
            <button
              key={kind}
              onClick={() => pick(kind)}
              className="scrap-card fx-wiggle"
              style={{
                padding: '18px 14px',
                width: 84,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                position: 'relative',
              }}
            >
              <div style={{ border: '2px solid var(--gold)', borderRadius: 10, width: '100%', height: '100%', position: 'absolute', inset: 0, margin: 6, pointerEvents: 'none', opacity: 0.5 }} />
              {icon}
              {done && (
                <span
                  className="hand fx-stamp-on"
                  style={{
                    position: 'absolute', top: -8, right: -10, background: 'var(--blush)',
                    color: 'var(--plum-deep)', fontSize: 11, padding: '2px 6px', borderRadius: 6,
                    transform: 'rotate(-8deg)',
                  }}
                >
                  OPENED ♡
                </span>
              )}
            </button>
          )
        })}
      </div>

      {showPhotos && (
        <div className="fx-pop-in" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 16, maxWidth: 320 }}>
          {(config.photos.cardCamera.length > 0 ? config.photos.cardCamera : ['', '', '']).map((src, i) => (
            <div key={i} style={{ background: 'var(--white)', padding: 5, boxShadow: 'var(--shadow-paper-sm)', transform: `rotate(${(i - 1) * 6}deg)` }}>
              {src ? (
                <img src={src} alt="" style={{ width: 84, display: 'block' }} />
              ) : (
                <div style={{ width: 84, height: 84, background: 'var(--lilac-soft)' }} />
              )}
            </div>
          ))}
        </div>
      )}

      {showLetter && (
        <div
          onClick={() => setShowLetter(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(74,47,92,0.55)', zIndex: 80,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
          }}
        >
          <div className="scrap-card fx-pop-in" style={{ textAlign: 'left', maxHeight: '80vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <p className="hand" style={{ fontSize: 20, color: 'var(--plum-deep)' }}>{config.letter.greeting}</p>
            {config.letter.lines.map((l, i) => (
              <p key={i} style={{ fontSize: 14, lineHeight: 1.6 }}>{l}</p>
            ))}
            <p className="hand" style={{ fontSize: 18, color: 'var(--plum-deep)', textAlign: 'right' }}>{config.letter.signOff}</p>
            <button className="pill-btn ghost small" onClick={() => setShowLetter(false)} style={{ marginTop: 10 }}>close</button>
          </div>
        </div>
      )}

      {opened.size > 0 && (
        <div className="fx-pop-in" style={{ marginTop: 8 }}>
          <p style={{ fontSize: 16, color: 'var(--plum-deep)', marginBottom: 4 }}>
            here's to more of us, {config.petNames.closing}.
          </p>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', margin: '10px 0' }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <button key={i} onClick={releaseBalloon} disabled={i < released} aria-label="release balloon">
                <Balloon
                  size={26}
                  color={['var(--lilac)', 'var(--blush)', 'var(--gold-soft)'][i]}
                  className={i >= released ? 'fx-wiggle' : ''}
                  style={{ opacity: i < released ? 0.25 : 1 }}
                />
                {i < released && (
                  <div className="hand" style={{ fontSize: 11, color: 'var(--ink-soft)' }}>{tags[i]}</div>
                )}
              </button>
            ))}
          </div>

          <button className="pill-btn ghost" onClick={onWatchAgain} style={{ marginTop: 10 }}>
            watch it again
          </button>

          <p className="hand" style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 14 }}>
            next one in {daysToNext} days...
          </p>
        </div>
      )}
    </div>
  )
}
