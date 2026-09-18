import type { CSSProperties } from 'react'

interface IconProps {
  size?: number
  style?: CSSProperties
  className?: string
}

/** A cute rounded flower. kawaii=true adds a smiley face in the center. */
export function Flower({ size = 40, style, className, kawaii = false, color = 'var(--blush)' }: IconProps & { kawaii?: boolean; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={style} className={className}>
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="30" cy="16" rx="9" ry="13"
          fill={color}
          transform={`rotate(${deg} 30 30)`}
        />
      ))}
      <circle cx="30" cy="30" r="9" fill="var(--gold)" />
      {kawaii && (
        <g>
          <circle cx="27" cy="29" r="1.4" fill="var(--plum-deep)" />
          <circle cx="33" cy="29" r="1.4" fill="var(--plum-deep)" />
          <path d="M27 32 Q30 34.5 33 32" stroke="var(--plum-deep)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </g>
      )}
    </svg>
  )
}

export function Balloon({ size = 44, style, className, color = 'var(--lilac)', tag }: IconProps & { color?: string; tag?: string }) {
  return (
    <svg width={size} height={size * 1.6} viewBox="0 0 40 64" style={style} className={className}>
      <ellipse cx="20" cy="22" rx="18" ry="21" fill={color} />
      <ellipse cx="14" cy="14" rx="5" ry="7" fill="rgba(255,255,255,0.35)" />
      <path d="M20 43 L16 50 L24 50 Z" fill={color} />
      <path d="M20 50 Q26 58 20 64" stroke="var(--ink-soft)" strokeWidth="1.4" fill="none" />
      {tag && (
        <g>
          <rect x="8" y="58" width="24" height="12" rx="2" fill="var(--white)" stroke="var(--gold)" strokeWidth="1" transform="rotate(-4 20 64)" />
        </g>
      )}
    </svg>
  )
}

export function PartyHat({ size = 40, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 60" style={style} className={className}>
      <polygon points="25,2 4,54 46,54" fill="var(--lilac)" />
      <circle cx="12" cy="38" r="3" fill="var(--gold)" />
      <circle cx="25" cy="24" r="3" fill="var(--white)" />
      <circle cx="35" cy="44" r="3" fill="var(--blush)" />
      <circle cx="25" cy="2" r="4" fill="var(--gold)" />
    </svg>
  )
}

export function GiftBox({ size = 48, style, className, color = 'var(--blush)' }: IconProps & { color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 56" style={style} className={className}>
      <rect x="6" y="20" width="48" height="32" rx="4" fill={color} />
      <rect x="6" y="20" width="48" height="10" fill="var(--gold-soft)" />
      <rect x="26" y="20" width="8" height="32" fill="var(--gold)" />
      <path d="M30 20 C18 4, 6 12, 20 20 Z" fill={color} />
      <path d="M30 20 C42 4, 54 12, 40 20 Z" fill={color} />
    </svg>
  )
}

export function Cake({ size = 60, style, className, kawaii = true }: IconProps & { kawaii?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 70" style={style} className={className}>
      <rect x="10" y="34" width="60" height="30" rx="8" fill="var(--blush-soft)" />
      <rect x="10" y="34" width="60" height="10" fill="var(--blush)" />
      <rect x="16" y="18" width="48" height="20" rx="8" fill="var(--white)" />
      {[20, 34, 48, 62].map((x) => (
        <rect key={x} x={x} y="6" width="4" height="14" rx="2" fill="var(--gold)" />
      ))}
      {[22, 36, 50, 64].map((x) => (
        <ellipse key={x} cx={x} cy="6" rx="3" ry="5" fill="#f2a552" />
      ))}
      {kawaii && (
        <g>
          <circle cx="32" cy="48" r="2" fill="var(--plum-deep)" />
          <circle cx="48" cy="48" r="2" fill="var(--plum-deep)" />
          <path d="M32 53 Q40 58 48 53" stroke="var(--plum-deep)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <circle cx="27" cy="52" r="2.4" fill="var(--blush)" opacity="0.7" />
          <circle cx="53" cy="52" r="2.4" fill="var(--blush)" opacity="0.7" />
        </g>
      )}
    </svg>
  )
}

export function Sparkle({ size = 18, style, className, color = 'var(--gold)' }: IconProps & { color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} className={className}>
      <path d="M12 0 C12 7 14 9 24 12 C14 15 12 17 12 24 C12 17 10 15 0 12 C10 9 12 7 12 0 Z" fill={color} />
    </svg>
  )
}

export function Heart({ size = 20, style, className, color = 'var(--blush)' }: IconProps & { color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 28" style={style} className={className}>
      <path
        d="M16 27 C-4 14 2 0 12 3 C14 4 15.5 6 16 8 C16.5 6 18 4 20 3 C30 0 36 14 16 27 Z"
        fill={color}
      />
    </svg>
  )
}

export function Star({ size = 20, style, className, color = 'var(--gold)' }: IconProps & { color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={style} className={className}>
      <path d="M20 2 L24.5 15 L38 15 L27 23 L31 37 L20 28.5 L9 37 L13 23 L2 15 L15.5 15 Z" fill={color} />
    </svg>
  )
}

export function MusicNote({ size = 22, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" style={style} className={className}>
      <circle cx="8" cy="24" r="5" fill="var(--plum)" />
      <circle cx="22" cy="20" r="5" fill="var(--plum)" />
      <rect x="12" y="4" width="2.6" height="21" fill="var(--plum)" />
      <rect x="26.4" y="0" width="2.6" height="21" fill="var(--plum)" />
      <path d="M12 4 L29 0 V6 L12 10 Z" fill="var(--plum)" />
    </svg>
  )
}

export function Camera({ size = 26, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 32" style={style} className={className}>
      <rect x="2" y="8" width="36" height="22" rx="4" fill="var(--lilac)" />
      <rect x="13" y="1" width="10" height="7" rx="2" fill="var(--lilac)" />
      <circle cx="20" cy="19" r="8" fill="var(--white)" />
      <circle cx="20" cy="19" r="5" fill="var(--plum)" />
      <circle cx="32" cy="13" r="1.6" fill="var(--gold)" />
    </svg>
  )
}

export function Envelope({ size = 40, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 44" style={style} className={className}>
      <rect x="2" y="4" width="56" height="38" rx="5" fill="var(--blush-soft)" />
      <path d="M2 8 L30 28 L58 8" stroke="var(--blush)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="30" cy="24" r="7" fill="var(--blush)" />
      <path d="M27 24 C27 21 33 21 33 24 C33 27 30 28 30 30 C30 28 27 27 27 24 Z" fill="var(--white)" />
    </svg>
  )
}

export function PawPrint({ size = 18, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" style={style} className={className}>
      <ellipse cx="15" cy="20" rx="8" ry="7" fill="var(--lilac)" />
      <circle cx="5" cy="10" r="3.4" fill="var(--lilac)" />
      <circle cx="13" cy="5" r="3.4" fill="var(--lilac)" />
      <circle cx="21" cy="5" r="3.4" fill="var(--lilac)" />
      <circle cx="27" cy="12" r="3.2" fill="var(--lilac)" />
    </svg>
  )
}

export function DiaryBook({ size = 22, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 26" style={style} className={className}>
      <rect x="2" y="2" width="26" height="22" rx="3" fill="var(--gold-soft)" />
      <rect x="14" y="2" width="1.6" height="22" fill="var(--gold)" />
      <path d="M6 8 H11 M19 8 H24 M6 13 H11 M19 13 H24" stroke="var(--white)" strokeWidth="1.4" />
    </svg>
  )
}

export function Sun({ size = 22, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" style={style} className={className}>
      <circle cx="15" cy="15" r="7" fill="var(--gold)" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <rect key={deg} x="14" y="0" width="2" height="6" rx="1" fill="var(--gold)" transform={`rotate(${deg} 15 15)`} />
      ))}
    </svg>
  )
}

export function Crown({ size = 40, style, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 40" style={style} className={className}>
      <path d="M6 36 L6 18 L18 28 L30 10 L42 28 L54 18 L54 36 Z" fill="var(--gold)" />
      <circle cx="6" cy="16" r="4" fill="var(--gold)" />
      <circle cx="30" cy="8" r="4" fill="var(--gold)" />
      <circle cx="54" cy="16" r="4" fill="var(--gold)" />
      <rect x="6" y="34" width="48" height="6" rx="2" fill="#c99a3a" />
    </svg>
  )
}

export function CassetteTape({ size = 60, style, className }: IconProps) {
  return (
    <svg width={size} height={size * 0.65} viewBox="0 0 100 64" style={style} className={className}>
      <rect x="2" y="2" width="96" height="60" rx="8" fill="var(--lilac-soft)" stroke="var(--lilac)" strokeWidth="2" />
      <rect x="14" y="14" width="72" height="22" rx="4" fill="var(--white)" />
      <circle cx="30" cy="25" r="9" fill="none" stroke="var(--plum)" strokeWidth="2.4" />
      <circle cx="70" cy="25" r="9" fill="none" stroke="var(--plum)" strokeWidth="2.4" />
      <rect x="10" y="44" width="80" height="10" rx="3" fill="var(--gold-soft)" />
    </svg>
  )
}

export function Confetti({ size = 24, style, className }: IconProps) {
  const bits = ['var(--gold)', 'var(--blush)', 'var(--lilac)', 'var(--plum)']
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} className={className}>
      {Array.from({ length: 6 }).map((_, i) => (
        <rect
          key={i}
          x={2 + (i % 3) * 8}
          y={2 + Math.floor(i / 3) * 12}
          width="4" height="4"
          rx="1"
          fill={bits[i % bits.length]}
          transform={`rotate(${i * 37} 12 12)`}
        />
      ))}
    </svg>
  )
}

type TeddyMood = 'happy' | 'sad' | 'sleeping' | 'diary' | 'chef' | 'gasp' | 'peek' | 'clapping' | 'waving'

/** The reusable teddy character in every mood the spec calls for. */
export function Teddy({ size = 90, style, className, mood = 'happy' }: IconProps & { mood?: TeddyMood }) {
  const eyesClosed = mood === 'sleeping'
  const showHat = mood === 'chef'
  const pawsUp = mood === 'gasp' || mood === 'clapping'
  const pawsOverEyes = mood === 'peek'
  const droopy = mood === 'sad'

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={style} className={className}>
      {/* ears */}
      <circle cx="24" cy="20" r="13" fill="#c99a6e" transform={droopy ? 'rotate(18 24 20)' : undefined} />
      <circle cx="76" cy="20" r="13" fill="#c99a6e" transform={droopy ? 'rotate(-18 76 20)' : undefined} />
      <circle cx="24" cy="21" r="6" fill="#e6c39a" />
      <circle cx="76" cy="21" r="6" fill="#e6c39a" />
      {/* head */}
      <circle cx="50" cy="46" r="34" fill="#d7ab7a" />
      {/* muzzle */}
      <ellipse cx="50" cy="56" rx="16" ry="12" fill="#f0dcbf" />
      <circle cx="50" cy="50" r="4" fill="#7a5230" />
      {/* mouth */}
      {droopy ? (
        <path d="M42 62 Q50 58 58 62" stroke="#7a5230" strokeWidth="2" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M42 58 Q50 66 58 58" stroke="#7a5230" strokeWidth="2" fill="none" strokeLinecap="round" />
      )}
      {/* eyes */}
      {eyesClosed || pawsOverEyes ? (
        <g stroke="#5a3d22" strokeWidth="2" strokeLinecap="round">
          <path d="M36 42 Q40 45 44 42" fill="none" />
          <path d="M56 42 Q60 45 64 42" fill="none" />
        </g>
      ) : (
        <g fill="#3b2718">
          <circle cx="40" cy="42" r={droopy ? 2.6 : 3.4} />
          <circle cx="60" cy="42" r={droopy ? 2.6 : 3.4} />
          {droopy && (
            <>
              <ellipse cx="38" cy="49" rx="1.6" ry="3" fill="#a9d6f5" opacity="0.85" />
              <ellipse cx="62" cy="49" rx="1.6" ry="3" fill="#a9d6f5" opacity="0.85" />
            </>
          )}
        </g>
      )}
      {/* cheeks */}
      <circle cx="28" cy="54" r="5" fill="var(--blush)" opacity="0.6" />
      <circle cx="72" cy="54" r="5" fill="var(--blush)" opacity="0.6" />
      {mood === 'chef' && (
        <>
          <circle cx="34" cy="56" r="1.4" fill="var(--white)" />
          <circle cx="66" cy="56" r="1.4" fill="var(--white)" />
        </>
      )}
      {/* body */}
      <ellipse cx="50" cy="90" rx="26" ry="18" fill="#d7ab7a" />
      {/* paws */}
      {pawsUp ? (
        <>
          <circle cx="26" cy="70" r="9" fill="#c99a6e" />
          <circle cx="74" cy="70" r="9" fill="#c99a6e" />
        </>
      ) : pawsOverEyes ? (
        <>
          <circle cx="38" cy="44" r="9" fill="#c99a6e" />
          <circle cx="62" cy="44" r="9" fill="#c99a6e" />
        </>
      ) : (
        <>
          <circle cx="24" cy="86" r="9" fill="#c99a6e" />
          <circle cx="76" cy="86" r="9" fill="#c99a6e" />
        </>
      )}
      {/* chef hat */}
      {showHat && (
        <g>
          <rect x="36" y="2" width="28" height="14" rx="6" fill="var(--white)" />
          <circle cx="40" cy="4" r="7" fill="var(--white)" />
          <circle cx="50" cy="0" r="8" fill="var(--white)" />
          <circle cx="60" cy="4" r="7" fill="var(--white)" />
        </g>
      )}
    </svg>
  )
}

export function ZzzBubbles({ size = 26, style, className }: IconProps) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', width: size, height: size, ...style }} className={className}>
      {['Z', 'z', 'z'].map((z, i) => (
        <span
          key={i}
          className="fx-zzz hand"
          style={{
            position: 'absolute',
            left: i * 6,
            bottom: i * 4,
            fontSize: 18 - i * 4,
            color: 'var(--ink-soft)',
            animationDelay: `${i * 0.4}s`,
          }}
        >
          {z}
        </span>
      ))}
    </span>
  )
}
