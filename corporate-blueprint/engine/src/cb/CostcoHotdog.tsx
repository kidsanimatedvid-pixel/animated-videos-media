// Corporate Blueprint #001 — Why Costco won't raise its $1.50 hot dog price
import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import vo from './costco-hotdog.vo.json';
import {Backdrop, C, COL, Captions, Finish, Kicker, MONO, SANS, SERIF, Source, draw, fade, loadCbFonts, prog, rnd} from './kit';

const FPS = 30;
const L = Object.fromEntries(vo.lines.map((l) => [l.id, {s: Math.round(l.start * FPS), e: Math.round(l.end * FPS)}]));
export const COSTCO_FRAMES = Math.round(vo.total * FPS) + 15;
const words = vo.lines.flatMap((l) => l.words);

// ---------- drawings ----------
const HotDog: React.FC<{p: number; glow?: number; scale?: number}> = ({p, glow = 0, scale = 1}) => {
  const zig = Array.from({length: 13}, (_, i) => `${i === 0 ? 'M' : 'L'}${95 + i * 42} ${i % 2 ? 112 : 136}`).join(' ');
  const sw = 6;
  return (
    <svg width={720 * scale} height={320 * scale} viewBox="-10 -10 720 320" style={{overflow: 'visible', filter: `drop-shadow(0 0 ${8 + glow * 30}px rgba(212,175,106,${0.35 + glow * 0.5}))`}}>
      <rect x={40} y={150} width={620} height={110} rx={55} fill="rgba(212,175,106,0.10)" opacity={Math.min(1, p * 1.4)} />
      <rect x={10} y={95} width={680} height={78} rx={39} fill="rgba(243,223,169,0.08)" opacity={Math.max(0, Math.min(1, p * 1.4 - 0.2))} />
      <g fill="none" stroke={C.gold} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <rect x={40} y={150} width={620} height={110} rx={55} {...draw(Math.min(1, p * 1.4))} />
        <rect x={10} y={95} width={680} height={78} rx={39} stroke={C.goldHi} {...draw(Math.max(0, Math.min(1, p * 1.4 - 0.2)))} />
        <path d="M70 160 Q350 30 630 160" {...draw(Math.max(0, Math.min(1, p * 1.6 - 0.5)))} />
        <path d={zig} stroke={C.white} strokeWidth={4} {...draw(Math.max(0, Math.min(1, p * 2 - 1)))} />
      </g>
      {/* construction lines */}
      <g stroke={C.line} strokeWidth={2} strokeDasharray="8 10" opacity={0.9 * Math.min(1, p * 2)}>
        <line x1={-10} y1={275} x2={710} y2={275} />
        <line x1={40} y1={285} x2={40} y2={300} /><line x1={660} y1={285} x2={660} y2={300} />
      </g>
      <text x={350} y={305} textAnchor="middle" fill={C.dim} fontFamily={MONO} fontSize={20} opacity={Math.min(1, p * 2)} letterSpacing={3}>FIG. 1 — THE HOT DOG</text>
    </svg>
  );
};

const PriceTag: React.FC<{text: string; p: number; swing: number}> = ({text, p, swing}) => (
  <div style={{transformOrigin: '50% -120px', transform: `rotate(${swing}deg) scale(${0.85 + 0.15 * p})`, opacity: p}}>
    <div style={{position: 'absolute', left: '50%', top: -120, width: 2, height: 120, background: C.gold, opacity: 0.8}} />
    <div style={{position: 'relative', padding: '18px 60px 22px 80px', border: `4px solid ${C.gold}`, borderRadius: '22px 18px 18px 22px', background: 'linear-gradient(160deg, rgba(212,175,106,0.18), rgba(12,23,38,0.9))', boxShadow: '0 20px 60px rgba(0,0,0,0.5)'}}>
      <div style={{position: 'absolute', left: 26, top: '50%', width: 22, height: 22, marginTop: -11, borderRadius: 11, border: `4px solid ${C.gold}`}} />
      <div style={{fontFamily: SERIF, fontSize: 190, color: C.goldHi, lineHeight: 1, letterSpacing: -2}}>{text}</div>
    </div>
  </div>
);

const Warehouse: React.FC<{p: number; w?: number}> = ({p, w = 760}) => (
  <svg width={w} height={w * 0.62} viewBox="0 0 760 470" style={{overflow: 'visible'}}>
    <g fill="none" stroke={C.gold} strokeWidth={4} strokeLinejoin="round">
      <path d="M60 180 L380 80 L700 180 L700 440 L60 440 Z" {...draw(p)} />
      <path d="M60 180 L700 180" stroke={C.line} {...draw(p)} />
      {Array.from({length: 7}, (_, i) => <line key={i} x1={60 + i * 106} y1={180 - Math.min(i, 6 - i) * 0} x2={60 + i * 106} y2={440} stroke={C.line} strokeWidth={2} {...draw(Math.max(0, p * 1.5 - 0.5))} />)}
      <rect x={300} y={300} width={160} height={140} stroke={C.goldHi} {...draw(Math.max(0, p * 2 - 1))} />
      <line x1={380} y1={300} x2={380} y2={440} stroke={C.goldHi} {...draw(Math.max(0, p * 2 - 1))} />
      <rect x={250} y={215} width={260} height={48} stroke={C.white} strokeWidth={3} {...draw(Math.max(0, p * 2 - 1))} />
    </g>
    <text x={380} y={248} textAnchor="middle" fill={C.white} fontFamily={MONO} fontSize={24} letterSpacing={8} opacity={Math.max(0, p * 2 - 1.2)}>WAREHOUSE</text>
  </svg>
);

// ---------- scenes ----------
const Steam: React.FC<{x: number; y: number}> = ({x, y}) => {
  const f = useCurrentFrame();
  return (<svg width={400} height={260} style={{position: 'absolute', left: x, top: y, overflow: 'visible'}}>
    {[0, 1, 2].map((i) => { const t = ((f + i * 22) % 66) / 66; const d = `M${80 + i * 120} 240 C${50 + i * 120} 190 ${110 + i * 120} 150 ${80 + i * 120} 100 S${60 + i * 120} 40 ${80 + i * 120} 10`;
      return <path key={i} d={d} fill="none" stroke={C.white} strokeWidth={4} strokeLinecap="round" opacity={Math.sin(t * Math.PI) * 0.45} transform={`translate(0 ${-t * 60})`} />; })}
  </svg>);
};

const S1: React.FC = () => {
  const f = useCurrentFrame();
  const year = Math.round(interpolate(f, [12, 100], [1985, 2026], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const stamp = prog(f, 98, 8);
  const cam = interpolate(f, [0, 140], [1.0, 1.07]);
  return (
    <AbsoluteFill style={{transform: `scale(${cam})`}}>
      <div style={{position: 'absolute', left: COL.left, top: 340, fontFamily: MONO, fontSize: 34, color: C.dim, letterSpacing: 6}}>PRICE IN</div>
      <div style={{position: 'absolute', left: COL.left, top: 380, fontFamily: MONO, fontSize: 120, color: C.white, letterSpacing: 4}}>{year}</div>
      <Steam x={COL.cx - 200} y={700} />
      <div style={{position: 'absolute', left: COL.cx - 360, top: 860}}><HotDog p={interpolate(f, [0, 24], [0.8, 1], {extrapolateRight: 'clamp'})} /></div>
      <div style={{position: 'absolute', left: COL.cx - 270, top: 610}}>
        <PriceTag text="$1.50" p={1} swing={Math.sin(f / 9) * 2.2 * Math.exp(-f / 120)} />
      </div>
      <div style={{position: 'absolute', left: 560, top: 548, transform: `rotate(-9deg) scale(${1.6 - 0.6 * stamp})`, opacity: stamp, border: `5px solid ${C.white}`, padding: '6px 18px', fontFamily: MONO, fontSize: 40, color: C.white, letterSpacing: 6, background: 'rgba(7,9,13,0.6)'}}>UNCHANGED</div>
    </AbsoluteFill>
  );
};

const S2: React.FC = () => {
  const f = useCurrentFrame();
  const p = prog(f, 4, 60);
  const X0 = 90, X1 = 880, Y0 = 1040, scale = 115; // $ per px
  const y = (v: number) => Y0 - (v - 1) * scale;
  // CPI path 1985->2026 ($1.50 -> $4.66), gently convex
  const pts = Array.from({length: 42}, (_, i) => { const t = i / 41; return [X0 + (X1 - X0) * t, y(1.5 * Math.pow(4.66 / 1.5, Math.pow(t, 0.92)))]; });
  const d = pts.map((q, i) => `${i ? 'L' : 'M'}${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join(' ');
  const area = `${d} L${X1} ${y(1.5)} L${X0} ${y(1.5)} Z`;
  const tip = pts[Math.min(41, Math.floor(p * 41))];
  return (
    <AbsoluteFill>
      <Kicker text="ADJUSTED FOR INFLATION" at={0} />
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <g stroke={C.line} strokeWidth={2}>
          {[1, 2, 3, 4, 5].map((v) => <line key={v} x1={X0} x2={X1} y1={y(v)} y2={y(v)} strokeDasharray="6 10" opacity={prog(f, 0, 15)} />)}
        </g>
        {[1, 2, 3, 4, 5].map((v) => <text key={v} x={X0 - 14} y={y(v) + 8} textAnchor="end" fill={C.dim} fontFamily={MONO} fontSize={22} opacity={prog(f, 0, 15)}>${v}</text>)}
        <path d={area} fill="rgba(212,175,106,0.10)" opacity={p} />
        <path d={d} fill="none" stroke={C.white} strokeWidth={5} {...draw(p)} />
        <line x1={X0} y1={y(1.5)} x2={X1} y2={y(1.5)} stroke={C.gold} strokeWidth={7} {...draw(prog(f, 0, 30))} />
        <circle cx={tip[0]} cy={tip[1]} r={10} fill={C.white} opacity={p > 0.02 ? 1 : 0} />
        <text x={X0} y={Y0 + 50} fill={C.dim} fontFamily={MONO} fontSize={26}>1985</text>
        <text x={X1} y={Y0 + 50} textAnchor="end" fill={C.dim} fontFamily={MONO} fontSize={26}>2026</text>
      </svg>
      <div style={{position: 'absolute', left: X1 - 300, top: y(4.66) - 175, width: 300, textAlign: 'right', fontFamily: SERIF, fontSize: 120, color: C.white, opacity: prog(f, 50, 12)}}>$4.66</div>
      <div style={{position: 'absolute', left: X0 + 10, top: y(1.5) - 110, fontFamily: SERIF, fontSize: 84, color: C.goldHi, opacity: prog(f, 10, 12)}}>$1.50</div>
      <Source at={20} y={1150} text="$1.50 in 1985 dollars, CPI-adjusted to 2026 · in2013dollars.com" />
    </AbsoluteFill>
  );
};

const S3: React.FC = () => {
  const f = useCurrentFrame();
  const p = prog(f, 0, 18);
  const rot = interpolate(f, [0, 150], [-14, 10]);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: COL.cx - 300, top: 790, perspective: 1400, opacity: 0.55}}>
        <div style={{transform: `rotateY(${rot}deg) rotateX(8deg)`}}><Warehouse p={prog(f, 0, 50)} w={600} /></div>
      </div>
      <div style={{position: 'absolute', left: COL.left, top: 360, width: COL.right - COL.left, opacity: p, transform: `translateY(${(1 - p) * 30}px)`}}>
        <div style={{fontFamily: SERIF, fontSize: 190, color: C.gold, lineHeight: 0.6, height: 90}}>“</div>
        <div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 80, lineHeight: 1.08, color: C.white}}>
          The hot dog price will not change as long as I'm around.
        </div>
        <div style={{marginTop: 34, display: 'flex', alignItems: 'center', gap: 18, opacity: prog(f, 14, 12)}}>
          <div style={{width: 60, height: 2, background: C.gold}} />
          <div style={{fontFamily: MONO, fontSize: 26, color: C.gold, letterSpacing: 3}}>RON VACHRIS · COSTCO CEO · MARCH 2026</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const S4: React.FC<{split: number}> = ({split}) => {
  const f = useCurrentFrame();
  const p = prog(f, 0, 16);
  const s = prog(f, split, 36);
  const g = prog(f, split + 30, 16);
  const CX = COL.cx, CY = 760, SP = 50;
  const dots = Array.from({length: 100}, (_, i) => {
    const a = rnd(`a${i}`) * Math.PI * 2, r = Math.sqrt(rnd(`r${i}`)) * 150;
    const gx = CX + ((i % 10) - 4.5) * SP, gy = CY - 60 + (Math.floor(i / 10) - 4.5) * SP;
    const k = Math.min(1, Math.max(0, s * 1.35 - rnd(`d${i}`) * 0.35));
    return {x: CX + Math.cos(a) * r + (gx - CX - Math.cos(a) * r) * k, y: CY + Math.sin(a) * r + (gy - CY - Math.sin(a) * r) * k, gold: i >= 97};
  });
  return (
    <AbsoluteFill>
      <Kicker text="RAZOR-THIN MARGINS" at={0} />
      <AbsoluteFill style={{perspective: 1200, opacity: 1 - s}}><AbsoluteFill style={{transform: `rotateY(${Math.sin(f / 14) * 32}deg)`, transformOrigin: `${CX}px ${CY}px`}}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <circle cx={CX} cy={CY} r={200} fill="rgba(212,175,106,0.12)" stroke={C.gold} strokeWidth={6} opacity={p} />
        <circle cx={CX} cy={CY} r={170} fill="none" stroke={C.goldLo} strokeWidth={3} strokeDasharray="4 8" opacity={p} />
      </svg>
      <div style={{position: 'absolute', left: CX - 200, top: CY - 80, width: 400, textAlign: 'center', fontFamily: SERIF, fontSize: 150, color: C.goldHi, opacity: p}}>$1.00</div>
      </AbsoluteFill></AbsoluteFill>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        {dots.map((q, i) => <circle key={i} cx={q.x} cy={q.y} r={q.gold ? 14 + 4 * g : 13} fill={q.gold && g > 0 ? C.goldHi : 'rgba(244,241,234,0.75)'} opacity={s > 0.01 ? (q.gold ? 1 : 1 - 0.55 * g) : 0}
          style={q.gold ? {filter: `drop-shadow(0 0 ${12 * g}px ${C.gold})`} : undefined} />)}
      </svg>
      <div style={{position: 'absolute', left: COL.left, width: COL.right - COL.left, top: CY + 220, display: 'flex', justifyContent: 'space-around', opacity: g, fontFamily: SANS, fontWeight: 700}}>
        <div style={{textAlign: 'center'}}><div style={{fontSize: 96, color: C.white, opacity: 0.6}}>97¢</div><div style={{fontFamily: MONO, fontWeight: 500, fontSize: 26, letterSpacing: 5, color: C.dim}}>COSTS</div></div>
        <div style={{textAlign: 'center'}}><div style={{fontSize: 96, color: C.goldHi}}>3¢</div><div style={{fontFamily: MONO, fontWeight: 500, fontSize: 26, letterSpacing: 5, color: C.gold}}>PROFIT</div></div>
      </div>
      <Source at={split + 30} y={1170} text="FY2026: $9.2B net income on $303B total revenue (Costco, 24 Sep 2026)" />
    </AbsoluteFill>
  );
};

const S5: React.FC<{count: number}> = ({count}) => {
  const f = useCurrentFrame();
  const flip = prog(f, 0, 26);
  const shimmer = interpolate(f, [18, 50], [-100, 140], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const c = prog(f, count + 4, 60);
  const grid = prog(f, count + 10, 50);
  return (
    <AbsoluteFill>
      {/* sea of cards behind */}
      <svg width={1080} height={1920} style={{position: 'absolute', opacity: grid * 0.5}}>
        {Array.from({length: 22 * 30}, (_, i) => {
          const gx = i % 22, gy = Math.floor(i / 22);
          const show = rnd(`c${i}`) < grid;
          return show ? <rect key={i} x={20 + gx * 48} y={300 + gy * 38} width={36} height={23} rx={4} fill="none" stroke={C.gold} strokeWidth={1.5} opacity={0.3 + rnd(`o${i}`) * 0.5} /> : null;
        })}
      </svg>
      <div style={{position: 'absolute', left: COL.cx - 330, top: 640, perspective: 1600}}>
        <div style={{width: 660, height: 416, borderRadius: 34, transform: `rotateY(${(1 - flip) * 88 + Math.sin(f / 22) * 7 * flip}deg) rotateX(${(1 - flip) * 12 + Math.cos(f / 27) * 4 * flip}deg) translateY(${-c * 90}px) scale(${1 - c * 0.12})`,
          background: `linear-gradient(135deg, ${C.navy2}, ${C.obsidian})`, border: `5px solid ${C.gold}`, boxShadow: `0 30px 90px rgba(0,0,0,0.6), 0 0 ${40 + 40 * flip}px rgba(212,175,106,0.25)`, overflow: 'hidden', position: 'relative'}}>
          <div style={{position: 'absolute', inset: 0, background: `linear-gradient(110deg, transparent ${shimmer - 20}%, rgba(243,223,169,0.35) ${shimmer}%, transparent ${shimmer + 20}%)`}} />
          <div style={{position: 'absolute', left: 50, top: 60, width: 96, height: 72, borderRadius: 12, border: `3px solid ${C.gold}`, background: 'rgba(212,175,106,0.18)'}} />
          <div style={{position: 'absolute', left: 50, top: 190, fontFamily: MONO, fontSize: 36, color: C.goldHi, letterSpacing: 10}}>MEMBER</div>
          <div style={{position: 'absolute', left: 50, top: 250, fontFamily: MONO, fontSize: 30, color: C.dim, letterSpacing: 6}}>•••• •••• •••• 2026</div>
          <div style={{position: 'absolute', right: 46, bottom: 40, fontFamily: SERIF, fontStyle: 'italic', fontSize: 46, color: C.gold}}>annual fee</div>
        </div>
      </div>
      <div style={{position: 'absolute', left: COL.left, width: COL.right - COL.left, top: 1035, textAlign: 'center', opacity: c > 0 ? 1 : 0}}>
        <div style={{fontFamily: SERIF, fontSize: 170, color: C.goldHi, lineHeight: 1}}>${(5.907 * c).toFixed(1)}B</div>
        <div style={{fontFamily: MONO, fontSize: 28, color: C.white, letterSpacing: 5, marginTop: 6}}>MEMBERSHIP FEES · FY2026</div>
      </div>
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const f = useCurrentFrame();
  const a = prog(f, 0, 24), b = prog(f, 12, 34);
  const W = COL.right - COL.left;
  const bar = (top: number, label: string, val: string, frac: number, gold: boolean, p: number) => (
    <div style={{position: 'absolute', left: COL.left, top, width: W}}>
      <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: MONO, fontSize: 28, color: gold ? C.gold : C.white, letterSpacing: 3, marginBottom: 14, opacity: p}}><span>{label}</span><span>{val}</span></div>
      <div style={{height: 110, width: W * frac * p, borderRadius: 10, background: gold ? `linear-gradient(90deg, ${C.goldLo}, ${C.gold}, ${C.goldHi})` : 'transparent', border: gold ? 'none' : `4px solid ${C.white}`, boxShadow: gold ? '0 0 50px rgba(212,175,106,0.35)' : 'none'}} />
    </div>
  );
  return (
    <AbsoluteFill>
      <Kicker text="WHERE THE PROFIT COMES FROM" at={0} />
      {bar(520, 'NET INCOME', '$9.2B', 1, false, a)}
      {bar(760, 'MEMBERSHIP FEES', '$5.9B', 5.907 / 9.226, true, b)}
      <div style={{position: 'absolute', left: COL.left + W * (5.907 / 9.226) - 120, top: 935, width: 240, textAlign: 'center', fontFamily: SERIF, fontSize: 120, color: C.goldHi, opacity: prog(f, 30, 12), transform: `scale(${0.8 + 0.2 * prog(f, 30, 12)})`}}>64%</div>
      <Source at={20} y={1120} text="Fees vs. net income, FY ended 30 Aug 2026. Comparison, not a breakdown of profit." />
    </AbsoluteFill>
  );
};

const S7: React.FC = () => {
  const f = useCurrentFrame();
  const p = prog(f, 0, 40);
  const X = 140, Y = 470, W = 720, H = 640;
  const hx = X + 130, hy = Y + H - 110; // food court near exit
  const targets = [[X + 220, Y + 120], [X + 400, Y + 120], [X + 580, Y + 120], [X + 580, Y + 330], [X + 400, Y + 330], [X + 220, Y + 330]];
  const pulse = 0.5 + 0.5 * Math.sin(f / 6);
  return (
    <AbsoluteFill>
      <Kicker text="THE LOSS LEADER" at={0} />
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <rect x={X} y={Y} width={W} height={H} fill="rgba(12,23,38,0.6)" stroke={C.gold} strokeWidth={5} {...draw(p)} />
        {Array.from({length: 4}, (_, i) => <rect key={i} x={X + 170 + i * 0} y={Y + 70 + i * 0} width={0} height={0} />)}
        {Array.from({length: 5}, (_, i) => <line key={i} x1={X + 160 + i * 110} y1={Y + 60} x2={X + 160 + i * 110} y2={Y + 420} stroke={C.line} strokeWidth={14} strokeLinecap="round" {...draw(Math.max(0, p * 1.6 - 0.4))} />)}
        <text x={X + 20} y={Y + H + 50} fill={C.dim} fontFamily={MONO} fontSize={22} letterSpacing={3} opacity={p}>FIG. 2 — FLOOR PLAN (ILLUSTRATIVE)</text>
        {targets.map(([tx, ty], i) => {
          const k = prog(f, 40 + i * 8, 22);
          return <g key={i}>
            <line x1={hx} y1={hy} x2={hx + (tx - hx) * k} y2={hy + (ty - hy) * k} stroke={C.goldHi} strokeWidth={3} strokeDasharray="10 10" strokeDashoffset={-f * 2} />
            <circle cx={tx} cy={ty} r={16 * k} fill="none" stroke={C.goldHi} strokeWidth={3} />
          </g>;
        })}
        <circle cx={hx} cy={hy} r={54 + pulse * 14} fill="rgba(212,175,106,0.15)" stroke={C.gold} strokeWidth={3} opacity={prog(f, 10, 12)} />
      </svg>
      <div style={{position: 'absolute', left: hx - 90, top: hy - 42, opacity: prog(f, 10, 12)}}><HotDog p={1} scale={0.25} glow={pulse} /></div>
    </AbsoluteFill>
  );
};

const S8: React.FC<{end: number}> = ({end}) => {
  const f = useCurrentFrame();
  const p = prog(f, 0, 30);
  const DX = COL.cx, DY = 1010;
  const ppl = Array.from({length: 40}, (_, i) => {
    const t = ((f + rnd(`t${i}`) * 90) % 90) / 90;
    const lane = (rnd(`l${i}`) - 0.5) * 520;
    return {x: DX + lane * (1 - t), y: 1190 - 200 * t, o: Math.sin(t * Math.PI)};
  });
  const out = prog(f, end - 34, 20);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: COL.cx - 380, top: 560, opacity: 1 - out}}><Warehouse p={p} /></div>
      <svg width={1080} height={1920} style={{position: 'absolute', opacity: p * (1 - out)}}>
        {ppl.map((q, i) => <circle key={i} cx={q.x} cy={q.y} r={9} fill={C.white} opacity={q.o * 0.85} />)}
      </svg>
      <div style={{position: 'absolute', left: COL.cx - 270, top: 640, opacity: out}}>
        <PriceTag text="$1.50" p={out} swing={Math.sin(f / 9) * 1.5} />
      </div>
      <div style={{position: 'absolute', left: COL.left, width: COL.right - COL.left, top: 1060, textAlign: 'center', fontFamily: MONO, fontSize: 26, letterSpacing: 10, color: C.gold, opacity: out}}>CORPORATE BLUEPRINT</div>
    </AbsoluteFill>
  );
};

// ---------- audio ----------
const SFX: React.FC<{at: number; file: string; vol: number}> = ({at, file, vol}) => (
  <Sequence from={Math.max(0, at)} durationInFrames={90}><Audio src={staticFile(`sfx/${file}`)} volume={vol} /></Sequence>
);

export const CostcoHotdog: React.FC = () => {
  loadCbFonts();
  const f = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const cut = [0, L.L2.s - 6, L.L3.s - 6, L.L4.s - 6, L.L6.s - 6, L.L8.s - 6, L.L9.s - 6, L.L10.s - 6, durationInFrames];
  const scenes = [<S1 />, <S2 />, <S3 />, <S4 split={L.L5.s - (L.L4.s - 6)} />, <S5 count={L.L7.s - (L.L6.s - 6)} />, <S6 />, <S7 />, <S8 end={durationInFrames - cut[7]} />];
  const glowY = [760, 820, 900, 760, 860, 800, 780, 880];
  const si = Math.max(0, cut.findIndex((c, i) => f >= c && f < cut[i + 1]));
  const music = (fr: number) => interpolate(fr, [0, 8, durationInFrames - 40, durationInFrames], [0, 0.16, 0.16, 0.02], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: C.obsidian}}>
      <Backdrop glow={[505, glowY[si]]} />
      {scenes.map((sc, i) => (
        <Sequence key={i} from={cut[i]} durationInFrames={cut[i + 1] - cut[i] + 10}>
          <AbsoluteFill style={{opacity: i === 0 ? fade(f, -10, cut[1] + 10, 1, 10) : fade(f - cut[i], 0, cut[i + 1] - cut[i] + 10, 10, 10), transform: `translateY(${interpolate(f - cut[i], [0, 12], [i === 0 ? 0 : 24, 0], {extrapolateRight: 'clamp'}) - (f - cut[i]) * 0.12}px) scale(${i === 0 ? 1 : 1 + (f - cut[i]) * 0.0002})`, transformOrigin: '50% 45%'}}>{sc}</AbsoluteFill>
        </Sequence>
      ))}
      <Captions words={words} />
      <Finish />
      <Audio src={staticFile('cb/costco-hotdog/vo.wav')} />
      <Audio src={staticFile('sfx/px_ambient-electronic-background-explainer.mp3')} startFrom={90} volume={music} />
      <SFX at={98} file="stamp.wav" vol={0.35} />
      {cut.slice(1, 8).map((c, i) => <SFX key={i} at={c - 4} file="whoosh.wav" vol={0.12} />)}
      <SFX at={L.L6.s} file="shimmer.wav" vol={0.25} />
      <SFX at={L.L5.s} file="cb_tick.wav" vol={0.2} />
    </AbsoluteFill>
  );
};
