# Corporate Blueprint — Brand Guidelines (v1, 28 Nov 2026)

**Idea:** every video is a technical drawing of a business. Gold linework draws itself on deep navy paper, showing the hidden mechanism behind a familiar brand. It should feel like a documentary studio's case file, not a kids' cartoon or a stock-footage AI channel.

## Palette (also in `engine/src/cb/kit.tsx` → `C`)
| Token | Hex | Use |
|---|---|---|
| obsidian | `#07090D` | outer background, vignette |
| navy | `#0C1726` | paper |
| navy2 | `#13233A` | glow centre |
| line | `#2B4466` | construction lines, grids, secondary strokes |
| gold | `#D4AF6A` | primary linework, kickers, key figures |
| goldHi | `#F3DFA9` | highlights, active caption word, hero numbers |
| goldLo | `#8C6A2E` | gradients, shadows |
| white | `#F4F1EA` | narration captions, contrast lines |
Rule: gold means "the hidden thing / the answer". White means "the familiar thing". No other hues. No pure black and no pure white.

## Type (all SIL Open Font License, bundled locally)
- **Instrument Serif** (regular and italic): hero numbers, quotes, wordmark. Never for long text.
- **Inter** 600–800: captions and data labels.
- **JetBrains Mono** 500: kickers, "FIG." labels, sources and dates, spaced 3–10 px.
- Minimum on-screen size: captions 64 px; sources 22 px (meant for pausing, not reading in flow).

## Layout for 1080×1920 Shorts
- Content column x 70–940 (keeps the right 140 px clear of Shorts buttons); key content y 300–1430.
- Kicker top-left at y≈330. Hero visual y 450–1100. Sources y≈1150. Captions y≈1255 (max 3 words, active word gold).
- No logo or intro at the start. The wordmark "CORPORATE BLUEPRINT" (mono, gold) appears only in the last second.

## Motion
- Draw-on linework (stroke dash), slow camera push (≤7%), parallax gold dust at 3 depths, film grain 7%, a soft gold light sweep.
- Ease: cubic-bezier(0.22, 1, 0.36, 1). Scene changes are a 10-frame cross-fade plus 24 px rise. No flashes, shakes or glitch effects.
- Something new every 2–4 s. Land each number on the word that says it.
- Frame 0 must work muted: the hero object and the key number are already on screen.

## Assets
- `brand/logo.png` (800×800 profile picture): a classical facade (institution) in gold on a blueprint grid. Reads at 48 px.
- `brand/banner.jpg` (2560×1440): wordmark and tagline inside the 1546×423 safe area; generic archetype buildings (factory, warehouse, tower, ship).
- `brand/watermark.png` (300×300, transparent): the facade mark for YouTube's "branding watermark".
- Never use real company logos, product photos or likenesses of real people. Company names in text are fine.

## Voice and sound
- Narrator: Kokoro "mix" (55% am_onyx + 45% am_michael), speed 1.1, US English. Calm, confident, not hype. Owner can switch (samples in `brand/voice-samples/`).
- Music: licensed beds only (Pixabay Content License, logged in `ASSET_LICENSES.md`), −18 to −22 dB under voice. Final mix loudness −14 LUFS, true peak −1.5 dB.
- SFX are self-synthesised (`make_sfx.py`, `cb_tick`), kept subtle (whoosh at 12%).

## Writing
- Hook = the familiar object plus an unexpected fact in one sentence. No greetings, no "you won't believe", no subscribe asks.
- One mechanism per Short. Every number is dated and sourced on screen. Interpretation is marked as such ("It's a signal…").
- Titles: honest curiosity. A question or contrast plus a concrete number, ≤60 characters, no ALL CAPS.
