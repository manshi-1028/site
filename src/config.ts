import type { AppConfig } from './types'

/**
 * ============================================================
 *  EDIT EVERYTHING HERE. This is the only file you need to
 *  touch to make this site about your own story.
 * ============================================================
 *
 *  - password: what he types on the lock screen (digits or text)
 *  - photos: paste base64 data URIs (data:image/jpeg;base64,....)
 *    Remote image URLs will NOT load once this is deployed/shared,
 *    so everything must be embedded. Use a "file to base64" tool,
 *    or ask Claude to convert your images for you.
 *  - dates: use YYYY-MM-DD format.
 */
export const CONFIG: AppConfig = {
  password: '26062025',
  name: 'Anmol',

  petNames: {
    wish: 'baby',
    thanks: 'sweetie',
    tenThings: 'cutie',
    closing: 'babie',
  },

  startDate: '2025-06-26',
  nextOccasion: '2027-06-01',

  milestones: [
    {
      date: 'How we met',
      label: 'How we met',
      caption: 'The day it all started — add your own line here.',
      photo: '',
    },
    {
      date: 'First date',
      label: 'First date',
      caption: 'Replace this with your favorite memory from that day.',
      photo: '',
    },
    {
      date: 'First trip',
      label: 'First trip',
      caption: 'Where did you go? What made it unforgettable?',
      photo: '',
    },
    {
      date: 'Today',
      label: 'Today',
      caption: 'Still choosing you, every single day.',
      photo: '',
    },
  ],

  tenThings: [
    { text: 'The way you laugh at your own jokes before you finish them', icon: 'sparkle' },
    { text: 'How you always know exactly what to say', icon: 'heart' },
    { text: 'Your terrible, wonderful taste in music', icon: 'music' },
    { text: 'The way you take care of everyone around you', icon: 'paw' },
    { text: 'That one face you make when you\u2019re concentrating', icon: 'star' },
    { text: 'How safe I feel when I\u2019m with you', icon: 'heart' },
    { text: 'Your hands', icon: 'sparkle' },
    { text: 'How you remember the smallest things I say', icon: 'diary' },
    { text: 'The way today feels easier because of you', icon: 'sun' },
    { text: 'Just... you. All of you.', icon: 'heart' },
  ],

  letter: {
    greeting: 'hey babe!',
    lines: [
      'I\u2019ve been trying to write this for days and every version sounds too small for what I actually feel, so here\u2019s the honest one.',
      'Happy birthday to the person who makes even ___ feel like an adventure.',
      'This year I\u2019m most grateful for ___.',
      'If I could give you one thing today it would be ___.',
      'I hope this year brings you ___ and every bit of the ___ you deserve.',
    ],
    ps: 'P.S. — ___ (fill me in)',
    invisibleLine: 'You are, without question, the best thing that has happened to me. (highlight to reveal)',
    signOff: 'always yours',
  },

  mixtapeTracks: [
    'Track one — the one that reminds me of you',
    'Track two — our song',
    'Track three — for the long drives',
    'Track four — for slow dancing in the kitchen',
  ],

  puzzlePhoto: '',

  photos: {
    scene5: '',
    cardCamera: [],
  },

  audioSrc: '',

  templates: {
    lock: 'sticker',
    burst: 'bloom',
    wish: 'stickers',
    gift: 'teddyPair',
    thanks: 'teddyBalloon',
    letter: 'mailOpener',
    timeline: 'centerLine',
    cake: 'table',
    closing: 'wagon',
  },

  bonus: {
    gumball: false,
    scratchReveal: false,
    wishJar: false,
    balloonPop: false,
    heartPuzzle: false,
    photoWall: false,
    mixtape: true,
    loveCoupons: false,
    memoryMatch: false,
    constellation: false,
    wrappingTear: false,
    knowUsQuiz: false,
  },
}
