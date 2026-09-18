import { useEffect, useRef, useState } from 'react'
import { Teddy } from './Icons'

/* ---------------- Day Counter ---------------- */
export function DayCounter({ startDate, endDate, suffix = 'loving you' }: { startDate: string; endDate: string; suffix?: string }) {
  const [tapped, setTapped] = useState(false)
  const tapCountRef = useRef(0)
  const [secret, setSecret] = useState(false)

  const days = Math.max(0, Math.floor((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000))

  const handleTap = () => {
    tapCountRef.current += 1
    setTapped(true)
    window.setTimeout(() => setTapped(false), 250)
    if (tapCountRef.current >= 5) {
      setSecret(true)
      tapCountRef.current = 0
    }
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        className={`sticker-badge ${tapped ? 'fx-squash' : ''}`}
        onClick={handleTap}
      >
        💕 Day {days} of {suffix}
      </button>
      {secret && (
        <div
          className="hand fx-pop-in"
          style={{
            position: 'absolute', top: '115%', left: '50%', transform: 'translateX(-50%)',
            background: 'var(--white)', padding: '6px 14px', borderRadius: 12,
            boxShadow: 'var(--shadow-paper-sm)', fontSize: 17, whiteSpace: 'nowrap', zIndex: 5,
          }}
          onAnimationEnd={() => window.setTimeout(() => setSecret(false), 1800)}
        >
          you found me ♡
        </div>
      )}
    </div>
  )
}

/* ---------------- Mute Button ---------------- */
export function MuteButton({ muted, onToggle }: { muted: boolean; onToggle: () => void }) {
  return (
    <button className="icon-btn" onClick={onToggle} aria-label={muted ? 'Unmute' : 'Mute'}>
      <span style={{ fontSize: 16 }}>{muted ? '🔇' : '🔊'}</span>
    </button>
  )
}

/* ---------------- Heart Trail ---------------- */
interface FloatingHeart { id: number; x: number; y: number }

export function useHeartPops(reducedMotion: boolean) {
  const [hearts, setHearts] = useState<FloatingHeart[]>([])
  const idRef = useRef(0)

  const pop = (x: number, y: number, count = 3) => {
    if (reducedMotion) return
    const newHearts: FloatingHeart[] = []
    for (let i = 0; i < count; i++) {
      idRef.current += 1
      newHearts.push({ id: idRef.current, x: x + (Math.random() - 0.5) * 30, y: y + (Math.random() - 0.5) * 14 })
    }
    setHearts((h) => [...h, ...newHearts])
    window.setTimeout(() => {
      setHearts((h) => h.filter((item) => !newHearts.find((n) => n.id === item.id)))
    }, 900)
  }

  const HeartLayer = () => (
    <>
      {hearts.map((h) => (
        <span key={h.id} className="floating-heart" style={{ left: h.x, top: h.y }}>
          💗
        </span>
      ))}
    </>
  )

  return { pop, HeartLayer }
}

/* ---------------- Teddy Cameo (between scene transitions) ---------------- */
export function TeddyCameo({ show, message = 'psst... keep going →' }: { show: boolean; message?: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const t = window.setTimeout(() => setVisible(false), 1800)
      return () => window.clearTimeout(t)
    }
  }, [show])

  if (!visible) return null

  return (
    <div className="teddy-cameo fx-pop-in">
      <Teddy size={34} mood="happy" />
      <span className="hand" style={{ fontSize: 16, color: 'var(--plum-deep)' }}>{message}</span>
    </div>
  )
}

/* ---------------- Loading Whisper (between heavy scenes) ---------------- */
const WHISPERS = ['baking your cake...', 'inflating balloons...', "teaching teddy his dance...", 'folding the letter...', 'stringing the bunting...']

export function LoadingWhisper({ show }: { show: boolean }) {
  const [msg] = useState(() => WHISPERS[Math.floor(Math.random() * WHISPERS.length)])
  if (!show) return null
  return (
    <div
      className="fx-pop-in hand"
      style={{
        position: 'fixed', inset: 0, zIndex: 90,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(253, 246, 238, 0.88)',
        fontSize: 20, color: 'var(--plum-deep)',
        pointerEvents: 'none',
      }}
    >
      {msg}
    </div>
  )
}

/* ---------------- Teddy Diary (rare corner entries) ---------------- */
const DIARY_ENTRIES = [
  'Day 98: he laughed at my joke today. keeper.',
  "Day 210: stole a fry when he wasn't looking. no regrets.",
  'Day 154: caught him smiling at his phone again.',
]

export function TeddyDiary({ show }: { show: boolean }) {
  const [entry] = useState(() => DIARY_ENTRIES[Math.floor(Math.random() * DIARY_ENTRIES.length)])
  if (!show) return null
  return (
    <div
      className="hand fx-pop-in"
      style={{
        position: 'absolute', bottom: 14, left: 14, maxWidth: 180,
        background: 'var(--gold-soft)', padding: '8px 12px', borderRadius: 10,
        fontSize: 14, color: 'var(--plum-deep)', transform: 'rotate(-3deg)',
        boxShadow: 'var(--shadow-paper-sm)', zIndex: 5,
      }}
    >
      {entry}
    </div>
  )
}
