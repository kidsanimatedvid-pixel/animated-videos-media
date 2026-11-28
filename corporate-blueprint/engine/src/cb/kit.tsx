// Corporate Blueprint — reusable visual kit (brand: obsidian / navy / metallic gold, blueprint linework)
import React from 'react';
import {AbsoluteFill, continueRender, delayRender, interpolate, staticFile, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';

export const C = {
  obsidian: '#07090D',
  navy: '#0C1726',
  navy2: '#13233A',
  line: '#2B4466',
  gold: '#D4AF6A',
  goldHi: '#F3DFA9',
  goldLo: '#8C6A2E',
  white: '#F4F1EA',
  dim: 'rgba(244,241,234,0.55)',
};
export const SERIF = '"Instrument Serif", Georgia, serif';
export const SANS = 'Inter, system-ui, sans-serif';
export const MONO = '"JetBrains Mono", monospace';
// Content column: keep clear of the Shorts right-hand buttons (140 px) and the top/bottom UI.
export const COL = {left: 70, right: 940, cx: 505, top: 300, bottom: 1430};

const faces: [string, string, string, string][] = [
  ['Instrument Serif', 'fonts/instrument-serif-latin-400-normal.woff2', '400', 'normal'],
  ['Instrument Serif', 'fonts/instrument-serif-latin-400-italic.woff2', '400', 'italic'],
  ['JetBrains Mono', 'fonts/jetbrains-mono-latin-500-normal.woff2', '500', 'normal'],
  ['Inter', 'fonts/inter-latin-500-normal.woff2', '500', 'normal'],
  ['Inter', 'fonts/inter-latin-600-normal.woff2', '600', 'normal'],
  ['Inter', 'fonts/inter-latin-700-normal.woff2', '700', 'normal'],
  ['Inter', 'fonts/inter-latin-800-normal.woff2', '800', 'normal'],
];
let loaded = false;
export const loadCbFonts = () => {
  if (loaded || typeof document === 'undefined') return;
  loaded = true;
  const h = delayRender('cb-fonts');
  Promise.all(faces.map(([fam, file, weight, style]) => new FontFace(fam, `url(${staticFile(file)})`, {weight, style}).load().then((f) => document.fonts.add(f))))
    .then(() => continueRender(h), () => continueRender(h));
};

export const ease = Easing.bezier(0.22, 1, 0.36, 1);
export const prog = (f: number, start: number, dur: number) => interpolate(f, [start, start + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});

// Blueprint backdrop: deep gradient + drifting grid (parallax) + vignette
export const Backdrop: React.FC<{drift?: number; glow?: [number, number]}> = ({drift = 0.35, glow = [505, 760]}) => {
  const f = useCurrentFrame();
  const off = (f * drift) % 40;
  const off2 = (f * drift * 0.5) % 200;
  return (
    <AbsoluteFill style={{background: `radial-gradient(ellipse 90% 60% at ${glow[0]}px ${glow[1]}px, ${C.navy2} 0%, ${C.navy} 45%, ${C.obsidian} 100%)`}}>
      <AbsoluteFill style={{
        backgroundImage: `linear-gradient(rgba(120,160,215,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(120,160,215,0.055) 1px, transparent 1px)`,
        backgroundSize: '40px 40px', backgroundPosition: `${-off}px ${-off}px`,
      }} />
      <AbsoluteFill style={{
        backgroundImage: `linear-gradient(rgba(140,180,235,0.09) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(140,180,235,0.09) 1.5px, transparent 1.5px)`,
        backgroundSize: '200px 200px', backgroundPosition: `${-off2}px ${-off2}px`,
      }} />
      <Dust />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse 75% 65% at 50% 45%, transparent 55%, rgba(0,0,0,0.65) 100%)'}} />
    </AbsoluteFill>
  );
};

// Drifting gold dust at three depths (parallax) — gives the flat blueprint some air
export const Dust: React.FC<{n?: number; front?: boolean}> = ({n = 36, front = false}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {Array.from({length: n}, (_, i) => {
        const depth = 0.3 + random(`z${i}${front}`) * (front ? 1.6 : 0.9);
        const x = (random(`x${i}${front}`) * 1180 + f * 0.25 * depth) % 1180 - 50;
        const y = (random(`y${i}${front}`) * 2000 - f * 0.6 * depth + 4000) % 2000 - 40;
        const r = (front ? 5 : 2) * depth;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: r * 2, height: r * 2, borderRadius: r, background: C.goldHi,
          opacity: (front ? 0.18 : 0.28) * (0.5 + 0.5 * Math.sin(f / 20 + i)), filter: `blur(${front ? 3 * depth : depth * 0.6}px)`}} />;
      })}
    </AbsoluteFill>
  );
};

// Film grain + slow gold light sweep, drawn above everything
export const Finish: React.FC = () => {
  const f = useCurrentFrame();
  const seed = Math.floor(f / 2) % 8;
  const sweep = interpolate((f % 300) / 300, [0, 1], [-600, 1700]);
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <Dust n={10} front />
      <AbsoluteFill style={{background: `linear-gradient(115deg, transparent ${sweep - 300}px, rgba(243,223,169,0.035) ${sweep}px, transparent ${sweep + 300}px)`}} />
      <svg width={1080} height={1920} style={{position: 'absolute', opacity: 0.07, mixBlendMode: 'overlay'}}>
        <filter id={`g${seed}`}><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={seed} /></filter>
        <rect width={1080} height={1920} filter={`url(#g${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};

// Stroke "draw-on" helper props
export const draw = (p: number) => ({pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - p});

export const Kicker: React.FC<{text: string; at: number; y?: number}> = ({text, at, y = 330}) => {
  const f = useCurrentFrame();
  const p = prog(f, at, 14);
  return (
    <div style={{position: 'absolute', left: COL.left, top: y, fontFamily: MONO, fontSize: 30, letterSpacing: 6, color: C.gold, opacity: p, transform: `translateX(${(1 - p) * -30}px)`, display: 'flex', alignItems: 'center', gap: 18}}>
      <div style={{width: 70 * p, height: 2, background: C.gold}} />
      {text}
    </div>
  );
};

export const Source: React.FC<{text: string; at: number; y?: number}> = ({text, at, y = 1150}) => {
  const f = useCurrentFrame();
  const p = prog(f, at, 12);
  return <div style={{position: 'absolute', left: COL.left, width: COL.right - COL.left, top: y, fontFamily: MONO, fontSize: 22, color: C.dim, opacity: p * 0.9, letterSpacing: 1}}>{text}</div>;
};

// Word-synced captions: chunks of <=3 words, active word in gold
type W = {w: string; s: number; e: number};
export const Captions: React.FC<{words: W[]; y?: number}> = ({words, y = 1255}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  const chunks: W[][] = [];
  let cur: W[] = [];
  words.forEach((w) => {
    cur.push(w);
    if (cur.length >= 3 || /[.?!,:]$/.test(w.w)) { chunks.push(cur); cur = []; }
  });
  if (cur.length) chunks.push(cur);
  const idx = chunks.findIndex((c, i) => t >= c[0].s - 0.05 && t < (chunks[i + 1] ? chunks[i + 1][0].s - 0.05 : c[c.length - 1].e + 0.4));
  if (idx < 0) return null;
  const ch = chunks[idx];
  const pin = prog(f, Math.round((ch[0].s - 0.05) * fps), 5);
  return (
    <div style={{position: 'absolute', left: COL.left, width: COL.right - COL.left, top: y, textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 66, lineHeight: 1.15, color: C.white, textShadow: '0 4px 24px rgba(0,0,0,0.85)', opacity: pin, transform: `translateY(${(1 - pin) * 14}px)`}}>
      {ch.map((w, i) => (
        <span key={i} style={{color: t >= w.s - 0.03 && t < w.e + 0.08 ? C.goldHi : C.white}}>{w.w}{i < ch.length - 1 ? ' ' : ''}</span>
      ))}
    </div>
  );
};

// Counting number
export const useCount = (from: number, to: number, start: number, dur: number) => {
  const f = useCurrentFrame();
  return from + (to - from) * prog(f, start, dur);
};

export const fade = (f: number, a: number, b: number, inDur = 10, outDur = 10) =>
  Math.min(interpolate(f, [a, a + inDur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), interpolate(f, [b - outDur, b], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));

export const rnd = random;
