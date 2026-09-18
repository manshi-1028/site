import { useState } from 'react'
import { Envelope } from '../components/Icons'
import type { AppConfig } from '../types'

interface Props {
  config: AppConfig
  onNext: () => void
}

export default function Scene6Letter({ config, onNext }: Props) {
  const [opened, setOpened] = useState(false)
  const { letter } = config

  if (!opened) {
    return (
      <div className="scene" onClick={() => setOpened(true)} style={{ cursor: 'pointer' }}>
        <p className="hand" style={{ fontSize: 20, color: 'var(--plum-deep)', marginBottom: 10 }}>
          {letter.greeting}
        </p>
        <Envelope size={90} className="fx-float fx-wiggle" />
        <p className="hand" style={{ fontSize: 17, color: 'var(--ink-soft)', marginTop: 10 }}>
          you've got new mail
        </p>
      </div>
    )
  }

  return (
    <div className="scene">
      <div className="scrap-card fx-pop-in" style={{ background: 'var(--paper)', position: 'relative', textAlign: 'left' }}>
        <div className="washi tl" />
        <div className="washi tr" />
        <p className="hand" style={{ fontSize: 22, color: 'var(--plum-deep)', margin: '0 0 14px' }}>
          {letter.greeting}
        </p>
        {letter.lines.map((line, i) => (
          <p key={i} style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink)', margin: '0 0 12px' }}>
            {line}
          </p>
        ))}
        <p
          className="invisible-ink"
          style={{ fontSize: 14, lineHeight: 1.6, margin: '0 0 6px', display: 'inline' }}
        >
          {letter.invisibleLine}
        </p>
        <p className="hand" style={{ fontSize: 13, color: 'var(--ink-soft)', margin: '0 0 16px' }}>
          (highlight me)
        </p>
        <p className="hand" style={{ fontSize: 20, color: 'var(--plum-deep)', textAlign: 'right' }}>
          {letter.signOff}
        </p>

        <div
          className="washi br fx-stamp-on"
          style={{
            position: 'absolute', bottom: -18, left: -10, width: 150, height: 'auto',
            background: 'var(--gold-soft)', padding: '8px 10px', borderRadius: 6,
            transform: 'rotate(-6deg)', boxShadow: 'var(--shadow-paper-sm)',
          }}
        >
          <p className="hand" style={{ fontSize: 14, color: 'var(--plum-deep)', margin: 0 }}>
            {letter.ps}
          </p>
        </div>
      </div>

      <button className="pill-btn fx-wiggle" onClick={onNext} style={{ marginTop: 36 }}>
        Keep going
      </button>
    </div>
  )
}
