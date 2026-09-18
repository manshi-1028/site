

A password-locked, scrapbook-styled birthday surprise site. Built with
Vite + React + TypeScript, zero backend, deploys straight to Vercel.

## Edit your content

Open **`src/config.ts`** — that's the only file you need to touch.
It has the password, his name, pet names, the relationship start
date, milestone photos/captions, the "ten things" list, the letter
text (fill-in-the-blank style), mixtape track titles, and per-scene
template choices.

Photos must be embedded as base64 data URIs (`data:image/jpeg;base64,...`)
— remote image URLs won't load once deployed. Ask Claude to convert
any photo file to base64 for you, or use a free "image to base64"
tool, then paste the resulting string into `config.ts`.

## Run it locally

```bash
npm install
npm run dev
```

Open the printed localhost URL.

## Deploy to Vercel

1. Push this folder to a GitHub repo (or run `vercel` from inside it
   with the [Vercel CLI](https://vercel.com/docs/cli)).
2. Import the repo at https://vercel.com/new — it auto-detects Vite,
   no configuration needed (a `vercel.json` is included anyway).
3. Deploy. Share the link (maybe with the password separately 😉).

## Project structure

```
src/
  config.ts          <- all your content lives here
  types.ts            TypeScript shapes for the config
  App.tsx              scene state machine + HUD + ambient layer
  main.tsx             React entry point
  styles/global.css    theme tokens, fonts, all animation classes
  components/
    Icons.tsx           SVG icon/illustration library (teddy, flowers,
                         balloons, cake, etc. — all inline SVG, zero
                         external image assets)
    Ambient.tsx          the drifting background layer
    ProgressFlower.tsx   HUD progress flower (tap for count, long-
                          press for a secret)
    Bits.tsx             day counter, mute button, heart-tap trail,
                          teddy cameo, loading whisper, teddy diary
  scenes/
    Scene1Lock.tsx        password screen
    Scene2Burst.tsx        flower burst transition
    Scene3Wish.tsx         "Happy Birthday" headline
    Scene4Gift.tsx         yes/no dodge scene
    Scene5ThankYou.tsx     teddy + balloon + hug meter
    Scene6Letter.tsx       envelope -> letter with invisible ink
    Scene7Timeline.tsx     milestone timeline
    Scene8Cake.tsx         blow out the candles
    Scene9TenThings.tsx    ten things I love about you
    Scene10Closing.tsx     pick-a-card + balloon release + watch again
```

## What's implemented vs. stubbed

All 10 core scenes are fully built, along with the main "global cute
systems": ambient background, progress flower, day counter, mute
button, heart-tap trail, teddy cameos, loading whispers, occasional
teddy diary notes, and a synth-melody soundtrack (Web Audio, no
external audio files — or drop a base64 clip into `CONFIG.audioSrc`
to override it).

The optional bonus scenes (gumball machine, scratch-to-reveal, wish
jar, heart puzzle, photo wall, love coupons, memory match,
constellation, wrapping tear, know-us quiz) are listed as toggles in
`CONFIG.bonus` but not built out — they're there so you know what's
possible to add later. The mixtape (B7) titles are wired into config
and ready to build a scene around if you want it. Ask Claude to build
out any specific one and it'll slot it into the scene order.
