import { useState } from 'react'
import { Teddy, Flower, ZzzBubbles } from '../components/Icons'
import type { AppConfig } from '../types'

interface Props {
  config: AppConfig
  onUnlock: () => void
  onSkipToLetter: () => void
}

export default function Scene1Lock({ config, onUnlock, onSkipToLetter }: Props) {
  const [value, setValue] = useState('')
  const [awake, setAwake] = useState(false)
  const [shake, setShake] = useState(false)
  const [sadPeek, setSadPeek] = useState(false)
  const [correct, setCorrect] = useState(false)

  const handleChange = (v: string) => {
    setValue(v)
    if (!awake && v.length > 0) setAwake(true)
  }

  const tryUnlock = () => {
    if (value === config.password) {
      setCorrect(true)
      window.setTimeout(onUnlock, 1400)
    } else {
      setShake(true)
      setSadPeek(true)
      window.setTimeout(() => setShake(false), 400)
      window.setTimeout(() => setSadPeek(false), 1600)
    }
  }

  return (
    <div className="scene">
      <div
        className="scrap-card scallop-top fx-pop-in"
        style={{
          transform: shake ? 'translateX(0)' : undefined,
          animation: shake ? 'shakeX .4s ease' : undefined,
        }}
      >
        <style>{`@keyframes shakeX { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }`}</style>
        <div className="washi tl" />
        <div className="washi tr" />

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: -12 }}>
          {correct ? (
            <Teddy size={70} mood="peek" className="fx-pop-in" />
          ) : awake ? (
            <Teddy size={70} mood="gasp" />
          ) : (
            <div style={{ position: 'relative' }}>
              <Teddy size={70} mood="sleeping" />
              <ZzzBubbles style={{ position: 'absolute', top: -10, right: -6 }} />
            </div>
          )}
        </div>

        <Flower size={30} kawaii style={{ marginTop: 8 }} />
        <h1 className="display" style={{ fontSize: 24, color: 'var(--plum-deep)', margin: '10px 0 4px' }}>
          a little something
        </h1>
        <p className="hand" style={{ fontSize: 18, color: 'var(--ink-soft)', margin: '0 0 18px' }}>
          {correct ? 'no peeking until it\u2019s ready 🙈' : 'you know the code...'}
        </p>

        {!correct && (
          <>
            <input
              type="text"
              inputMode="numeric"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && tryUnlock()}
              placeholder="•••••••"
              style={{
                width: '100%',
                textAlign: 'center',
                fontSize: 20,
                letterSpacing: 4,
                padding: '12px 16px',
                borderRadius: 999,
                border: '2px solid var(--lilac-soft)',
                marginBottom: 14,
                background: 'var(--cream)',
                color: 'var(--plum-deep)',
              }}
            />
            {sadPeek && (
              <p className="hand fx-pop-in" style={{ color: 'var(--plum)', fontSize: 16 }}>
                not quite — try again 🥺
              </p>
            )}
            <button className="pill-btn fx-wiggle" onClick={tryUnlock}>
              Unlock
            </button>
          </>
        )}
      </div>

      <button className="skip-link" onClick={onSkipToLetter}>
        skip to letter
      </button>
    </div>
  )
}
