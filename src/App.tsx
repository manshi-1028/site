import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { CONFIG } from './config'
import type { SceneId } from './types'
import { useAudio } from './hooks/useAudio'
import { useReducedMotion } from './hooks/useReducedMotion'
import { Ambient, type ReleasedBalloon } from './components/Ambient'
import { ProgressFlower } from './components/ProgressFlower'
import { MuteButton, useHeartPops, TeddyCameo, LoadingWhisper, TeddyDiary } from './components/Bits'
import { Teddy, ZzzBubbles } from './components/Icons'

import Scene1Lock from './scenes/Scene1Lock'
import Scene2Burst from './scenes/Scene2Burst'
import Scene3Wish from './scenes/Scene3Wish'
import Scene4Gift from './scenes/Scene4Gift'
import Scene5ThankYou from './scenes/Scene5ThankYou'
import Scene6Letter from './scenes/Scene6Letter'
import Scene7Timeline from './scenes/Scene7Timeline'
import Scene8Cake from './scenes/Scene8Cake'
import Scene9TenThings from './scenes/Scene9TenThings'
import Scene10Closing from './scenes/Scene10Closing'

const SCENE_ORDER: SceneId[] = [
  'lock', 'burst', 'wish', 'gift', 'thanks', 'letter', 'timeline', 'cake', 'tenThings', 'closing',
]
// Petals bloom for every scene from "wish" onward (skips lock/burst, which are setup).
const PROGRESS_SCENES: SceneId[] = SCENE_ORDER.slice(2)

export default function App() {
  const [booting, setBooting] = useState(true)
  const [scene, setScene] = useState<SceneId>('lock')
  const [releasedBalloons, setReleasedBalloons] = useState<ReleasedBalloon[]>([])
  const [cameoMessage, setCameoMessage] = useState<string | null>(null)
  const [showWhisper, setShowWhisper] = useState(false)
  const [showDiary, setShowDiary] = useState(false)
  const [winkUsed, setWinkUsed] = useState(false)

  const reducedMotion = useReducedMotion()
  const audio = useAudio(CONFIG.audioSrc || undefined)
  const { pop, HeartLayer } = useHeartPops(reducedMotion)
  const balloonIdRef = useRef(0)

  useEffect(() => {
    const t = window.setTimeout(() => setBooting(false), reducedMotion ? 300 : 1400)
    return () => window.clearTimeout(t)
  }, [reducedMotion])

  const completedCount = PROGRESS_SCENES.indexOf(scene) + 1

  const goTo = (next: SceneId, opts?: { heavy?: boolean; cameo?: boolean }) => {
    if (opts?.heavy && !reducedMotion) {
      setShowWhisper(true)
      window.setTimeout(() => setShowWhisper(false), 700)
    }
    if (opts?.cameo && !reducedMotion && Math.random() > 0.4) {
      window.setTimeout(() => setCameoMessage('psst... keep going →'), 250)
    }
    if (Math.random() > 0.82 && !reducedMotion) {
      window.setTimeout(() => setShowDiary(true), 400)
      window.setTimeout(() => setShowDiary(false), 3200)
    }
    setScene(next)
  }

  const handleBackgroundTap = (e: MouseEvent) => {
    if (reducedMotion) return
    const target = e.target as HTMLElement
    if (target.closest('button, input, a, .scrap-card')) return
    pop(e.clientX, e.clientY)
  }

  const handleBalloonRelease = (color: string) => {
    balloonIdRef.current += 1
    setReleasedBalloons((prev) => [...prev, { id: `b${balloonIdRef.current}`, color }])
  }

  const handleWatchAgain = () => {
    setReleasedBalloons([])
    goTo('wish')
  }

  return (
    <div className="app-root" onClick={handleBackgroundTap}>
      <Ambient releasedBalloons={releasedBalloons} reducedMotion={reducedMotion} />
      <HeartLayer />

      {scene !== 'lock' && (
        <div className="hud">
          <ProgressFlower completed={completedCount} total={PROGRESS_SCENES.length} />
          <MuteButton muted={audio.muted} onToggle={audio.toggleMute} />
        </div>
      )}

      {booting && (
        <div className="loading-screen">
          <div style={{ position: 'relative' }}>
            <Teddy size={70} mood="sleeping" />
            <ZzzBubbles style={{ position: 'absolute', top: -10, right: -6 }} />
          </div>
          <p className="hand" style={{ fontSize: 18, color: 'var(--ink-soft)' }}>preparing something for you...</p>
        </div>
      )}

      <LoadingWhisper show={showWhisper} />
      <TeddyCameo show={!!cameoMessage} message={cameoMessage ?? undefined} />
      {showDiary && scene === 'timeline' && <TeddyDiary show={showDiary} />}

      {!booting && scene === 'lock' && (
        <Scene1Lock
          config={CONFIG}
          onUnlock={() => {
            audio.start()
            goTo('burst', { heavy: true })
          }}
          onSkipToLetter={() => {
            audio.start()
            goTo('letter')
          }}
        />
      )}

      {!booting && scene === 'burst' && (
        <Scene2Burst reducedMotion={reducedMotion} onDone={() => goTo('wish')} />
      )}

      {!booting && scene === 'wish' && (
        <Scene3Wish config={CONFIG} onNext={() => goTo('gift', { cameo: true })} />
      )}

      {!booting && scene === 'gift' && (
        <Scene4Gift onBlip={audio.blip} onYes={() => goTo('thanks')} />
      )}

      {!booting && scene === 'thanks' && (
        <Scene5ThankYou config={CONFIG} onBalloonRelease={handleBalloonRelease} onNext={() => goTo('letter', { heavy: true })} />
      )}

      {!booting && scene === 'letter' && (
        <Scene6Letter config={CONFIG} onNext={() => goTo('timeline', { cameo: true })} />
      )}

      {!booting && scene === 'timeline' && (
        <Scene7Timeline config={CONFIG} onNext={() => goTo('cake', { heavy: true })} />
      )}

      {!booting && scene === 'cake' && (
        <Scene8Cake onBlip={audio.blip} onNext={() => goTo('tenThings', { cameo: true })} />
      )}

      {!booting && scene === 'tenThings' && (
        <Scene9TenThings config={CONFIG} onNext={() => goTo('closing', { heavy: true })} />
      )}

      {!booting && scene === 'closing' && (
        <Scene10Closing
          config={CONFIG}
          onWatchAgain={handleWatchAgain}
          onPlayMelody={() => audio.playMelodyOnce(0.09)}
          onBalloonRelease={handleBalloonRelease}
        />
      )}
    </div>
  )
}
