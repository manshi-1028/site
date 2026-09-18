export type SceneId =
  | 'lock'
  | 'burst'
  | 'wish'
  | 'gift'
  | 'thanks'
  | 'letter'
  | 'timeline'
  | 'cake'
  | 'tenThings'
  | 'closing'

export interface Milestone {
  date: string
  label: string
  caption: string
  photo: string // base64 data URI or empty string for placeholder
}

export interface LetterConfig {
  greeting: string
  // Each blank line is an array of literal text chunks; blanks are
  // filled in as ___ if left empty. Keep it short & sincere.
  lines: string[]
  ps: string
  invisibleLine: string
  signOff: string
}

export interface TemplateChoices {
  lock: 'sticker' | 'giftbox' | 'seal'
  burst: 'bloom' | 'hearts' | 'confetti'
  wish: 'stickers' | 'bunting' | 'giftpop'
  gift: 'teddyPair' | 'giftboxes' | 'bubbleDebate'
  thanks: 'teddyBalloon' | 'giftPop' | 'waving'
  letter: 'mailOpener' | 'giftUnfold' | 'paperPlane'
  timeline: 'centerLine' | 'leftRail' | 'scatter' | 'filmStrip'
  cake: 'table' | 'picnic' | 'bunting'
  closing: 'wagon' | 'giftboxes' | 'nightSky'
}

export interface BonusToggles {
  gumball: boolean
  scratchReveal: boolean
  wishJar: boolean
  balloonPop: boolean
  heartPuzzle: boolean
  photoWall: boolean
  mixtape: boolean
  loveCoupons: boolean
  memoryMatch: boolean
  constellation: boolean
  wrappingTear: boolean
  knowUsQuiz: boolean
}

export interface AppConfig {
  password: string
  name: string
  petNames: {
    wish: string // "baby"
    thanks: string // "sweetie"
    tenThings: string // "cutie"
    closing: string // "babie"
  }
  startDate: string // ISO date, relationship start
  nextOccasion: string // ISO date for the countdown chip
  milestones: Milestone[]
  tenThings: { text: string; icon: string }[]
  letter: LetterConfig
  mixtapeTracks: string[]
  puzzlePhoto: string
  photos: {
    scene5?: string
    cardCamera: string[] // 3-4 photos for the polaroid shower
  }
  audioSrc: string // base64 audio override, empty = built-in synth melody
  templates: TemplateChoices
  bonus: BonusToggles
}
