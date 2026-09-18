import { Crown, Star, Balloon, Confetti } from '../components/Icons'
import { DayCounter } from '../components/Bits'
import type { AppConfig } from '../types'

interface Props {
  config: AppConfig
  onNext: () => void
}

export default function Scene3Wish({ config, onNext }: Props) {
  return (
    <div className="scene">
      <Crown size={54} className="fx-float" />
      <h1 className="display fx-shimmer fx-pop-in" style={{ fontSize: 34, margin: '14px 0 6px', lineHeight: 1.15 }}>
        Happy Birthday,
        <br />
        {config.name}
      </h1>
      <div style={{ margin: '8px 0 14px' }}>
        <DayCounter startDate={config.startDate} endDate={config.counterEndDate} />
      </div>
      <p className="hand" style={{ fontSize: 19, color: 'var(--plum-deep)', maxWidth: 320 }}>
        today is all about you, {config.petNames.wish}.
      </p>
      <div className="wavy-divider" />

      <div style={{ display: 'flex', gap: 14, margin: '8px 0 20px' }}>
        <Star size={22} className="fx-float" style={{ animationDelay: '0.2s' }} />
        <Balloon size={26} color="var(--lilac)" className="fx-float" style={{ animationDelay: '0.5s' }} />
        <Confetti size={22} />
        <Star size={18} className="fx-float" style={{ animationDelay: '0.8s' }} />
      </div>

      <button className="pill-btn fx-wiggle" onClick={onNext}>
        Keep going
      </button>

      <div style={{ display: 'flex', gap: 6, marginTop: 22, opacity: 0.7 }}>
        <span className="hand" style={{ fontSize: 14, color: 'var(--ink-soft)' }}>
          follow the paw prints →
        </span>
      </div>
    </div>
  )
}
