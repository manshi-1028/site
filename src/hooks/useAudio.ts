import { useCallback, useRef, useState } from 'react'

/**
 * Tiny Web Audio helper. No external audio files needed unless
 * CONFIG.audioSrc is set, in which case that base64 clip is used
 * for the background loop instead of the synth melody.
 */
export function useAudio(audioSrcOverride?: string) {
  const ctxRef = useRef<AudioContext | null>(null)
  const loopTimeoutRef = useRef<number | null>(null)
  const [muted, setMuted] = useState(false)
  const [started, setStarted] = useState(false)
  const mediaElRef = useRef<HTMLAudioElement | null>(null)
  const mutedRef = useRef(false)

  const ensureCtx = useCallback(() => {
    if (!ctxRef.current) {
      const AC = window.AudioContext || (window as any).webkitAudioContext
      if (AC) ctxRef.current = new AC()
    }
    return ctxRef.current
  }, [])

  const playTone = useCallback(
    (freq: number, when: number, duration: number, gain = 0.05) => {
      const ctx = ensureCtx()
      if (!ctx || mutedRef.current) return
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      g.gain.setValueAtTime(0, ctx.currentTime + when)
      g.gain.linearRampToValueAtTime(gain, ctx.currentTime + when + 0.05)
      g.gain.linearRampToValueAtTime(0, ctx.currentTime + when + duration)
      osc.connect(g)
      g.connect(ctx.destination)
      osc.start(ctx.currentTime + when)
      osc.stop(ctx.currentTime + when + duration + 0.05)
    },
    [ensureCtx]
  )

  const MELODY = [523.25, 587.33, 659.25, 587.33, 523.25, 659.25, 587.33, 493.88]

  const playMelodyOnce = useCallback(
    (gain = 0.06) => {
      MELODY.forEach((f, i) => playTone(f, i * 0.42, 0.4, gain))
    },
    [playTone]
  )

  const loopMelody = useCallback(() => {
    if (mutedRef.current) {
      loopTimeoutRef.current = window.setTimeout(loopMelody, 9000)
      return
    }
    playMelodyOnce(0.035)
    loopTimeoutRef.current = window.setTimeout(loopMelody, 9000)
  }, [playMelodyOnce])

  const start = useCallback(() => {
    if (started) return
    setStarted(true)
    if (audioSrcOverride) {
      const el = new Audio(audioSrcOverride)
      el.loop = true
      el.volume = 0.35
      mediaElRef.current = el
      el.play().catch(() => {})
    } else {
      ensureCtx()
      loopMelody()
    }
  }, [audioSrcOverride, ensureCtx, loopMelody, started])

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m
      mutedRef.current = next
      if (mediaElRef.current) mediaElRef.current.muted = next
      return next
    })
  }, [])

  const blip = useCallback(
    (kind: 'pop' | 'stamp' | 'snap' | 'squeak' = 'pop') => {
      if (mutedRef.current) return
      ensureCtx()
      if (kind === 'pop') playTone(700, 0, 0.12, 0.05)
      if (kind === 'stamp') playTone(220, 0, 0.15, 0.05)
      if (kind === 'snap') playTone(880, 0, 0.08, 0.045)
      if (kind === 'squeak') playTone(1200, 0, 0.06, 0.03)
    },
    [ensureCtx, playTone]
  )

  const chime = useCallback(
    (index: number) => {
      ensureCtx()
      const scales = [
        [523.25, 659.25, 783.99],
        [493.88, 587.33, 739.99],
        [440, 554.37, 659.25],
        [587.33, 698.46, 880],
        [523.25, 622.25, 830.61],
        [466.16, 587.33, 698.46],
      ]
      const notes = scales[index % scales.length]
      notes.forEach((f, i) => playTone(f, i * 0.16, 0.35, 0.05))
    },
    [ensureCtx, playTone]
  )

  return { start, started, muted, toggleMute, blip, chime, playMelodyOnce }
}
