# Corporate Blueprint — Channel Strategy (v1, 28 Nov 2026)

Read this, `LESSONS_LEARNED.md` and the last 14 rows of `ANALYTICS_LOG.csv` before every production run.

## 1. Audit of the existing channel (UC6gCo7DuNY2Lg9g-rVCjCFg, data pulled 28 Nov 2026)
| Item | Finding (source) |
|---|---|
| Age / size | Created ~22 Nov 2026. 4 subscribers, 22 lifetime views, 7 public Shorts (vidIQ `user_channels`) |
| Content | 7 Arabic (Fusha) animated Shorts for ages 2–8, all **Made for Kids** (4 stories + 3 lessons live; 2 more made but never posted) |
| Traffic sources, 20–28 Nov | Channel page 15 views · other YouTube pages 5 · notifications 1 · **Shorts feed 0** (vidIQ analytics, `traffic_sources`) |
| Retention | Channel-page viewers watched ~74% on average (29 s); too few views for per-video retention (`top_videos` returned no rows) |
| Geography / demographics | Below YouTube's reporting threshold (no rows) |
| Copyright / restrictions | None known; all music self-synthesised or Pixabay-licensed; no claims reported. (Studio "restrictions" report needs the vidIQ browser extension, not connected.) |
| Monetization | Not in YPP; far below 1,000 subs. Nothing to lose |
| Workflow | Remotion engine (`engine2.tgz`), Edge/Kokoro TTS, daily scheduled run → owner approval → vidIQ publish. Works; 2 days were missed because approval never arrived |
| Tools / subscriptions | vidIQ (150 credits/month, renews 22 Dec), GitHub repo, Claude scheduled tasks, Kokoro (free, Apache-2.0), Pixabay music, Chrome/Playwright, ffmpeg, faster-whisper. No Blender/GPU, no After Effects, no paid voice |

**Why it "failed" (evidence, not opinion):** it never really started. In 6 days the Shorts feed served the videos to **zero** viewers; every view came from the channel page (owner/friends). Likely causes, in order: (1) Made-for-Kids Shorts on a brand-new channel get very limited feed distribution; (2) a tiny Arabic-preschool niche with no search demand for these titles; (3) only 7 uploads, 2 missed days. There is no evidence about content quality either way — the sample is too small. Lesson kept: *distribution is decided by the audience setting and niche before quality gets a chance.*

**Decision: rebrand the existing channel** (owner approved 28 Nov 2026). It costs nothing (4 subs, no monetization progress) and keeps the working vidIQ publishing connection. The 7 kids Shorts should go **Private** (not deleted) once the owner OKs it — see `CHANNEL_SETUP_CHECKLIST.md` §4 for consequences. Their Made-for-Kids flag stays as it is.

## 2. Name
"Hidden Empires" is taken: @hiddenempires (ant documentaries, 1.5K subs), 6+ other "Hidden Empires" channels including a Russian business-history one in this exact niche. The other candidates were also crowded: "Behind the Billions" (5+ business channels), "Empire Explained" (@empire-explained-yt, same niche), "Empire Files" (an established investigative show), "The Hidden Economy" (@thehiddeneconomy265), "Beyond the Brand" (a podcast plus an empty channel).
**Chosen: Corporate Blueprint.** The only clash is one dormant "The Corporate Blueprint" (0 subs, 5 videos). It sits outside the dozens of interchangeable "Empire ___" channels launched in 2026, describes the promise exactly (the hidden mechanism of a business), and gives a visual identity (gold blueprint linework). Handle to try in order: @corporateblueprint → @corporateblueprinttv → @thecorporateblueprint (only Studio can confirm availability).

## 3. Positioning
Premium cinematic mini-documentaries that show **how the world's most powerful businesses really make money** — one hidden mechanism per Short, one full story per long-form. Every figure sourced and dated. Audience: English-speaking adults 18–44 (US, UK, CA, AU). Tone: calm authority, curiosity, no hype, no "money guru" promises.

## 4. Content pillars and starting mix (adjust after 30 uploads)
| Pillar | Share | Notes |
|---|---|---|
| Corporate secrets — how famous companies really make money | 30% | strongest Shorts format (question → mechanism → number) |
| Rise and fall | 25% | best long-form material; myth-busting angle (e.g., Blockbuster) |
| Billion-dollar strategies | 20% | |
| Hidden monopolies | 10% | ASML, EssilorLuxottica, YKK |
| Business psychology | 10% | only when tied to a named company (generic psychology channels flop — Signal Logic) |
| Future empires | 5% | AI chips, GLP-1, space |

## 5. What the market research says (28 Nov 2026; full notes in `SOURCE_REGISTRY.md`)
- The premium players barely use Shorts (Company Man, Modern MBA, ColdFusion, fern ≈ 0%; MagnatesMedia ~15%) → open lane for premium business Shorts.
- Business Casual (dormant ~3 years) and MagnatesMedia (no upload ~12 months) left a gap in premium animated business history; their catalogues still earn 4–12M views per hit.
- Small-channel outliers prove demand: "McDonald's Built an Empire by Owning Real Estate" (7.2K-sub channel, 55K views in 3 days), Costco hot-dog loss-leader Short (43K-sub channel, 116K), "Visa's biggest business isn't lending" (4.8K-sub channel, 51K in a week) (vidIQ outliers, 28 Nov).
- 2026 saw a flood of near-identical "Empire ___" faceless channels with ~300 avg views → distinctiveness and accuracy are the moat.
- Title patterns that recur in outliers: $-figure + loss/creation; "How [small actor] killed/built [giant]"; "Why X can't/won't…"; hidden-mechanism questions.

## 6. Publishing
- Start: **1 Short/day**, test window **18:00–21:00 Jerusalem** (= 11:00–14:00 ET). After 14 Shorts, A/B the window against 01:00–02:00 Jerusalem (18:00–19:00 ET) one variable at a time.
- Long-form: **1/week once 3 Shorts are approved and the long-form pipeline is tested** (target first long-form in week 3).
- Approval: the owner approves each of the first 3 videos before public publishing. After that, scheduled publishing within the agreed rules (`DAILY_TASK.md`).

## 7. Policy guardrails (YouTube, as of Nov 2026)
- YPP "inauthentic content" (renamed July 2025, clarified 16 July 2026): no templated, mass-produced slideshows; every video needs its own narrative arc, original analysis and visuals; never an AI "finance expert" persona.
- AI disclosure: required only for realistic synthetic people/events. Our stylised animation + synthetic narrator does not need the label; **never** create realistic depictions of real executives.
- Audience: all new videos **Not made for kids**. Historical kids videos keep Made for Kids.
- No financial advice or promises; "Educational content — not financial advice" in every description.
- No purchased engagement. No real company logos as artwork (use names in text only; nominative use).

## 8. KPIs (diagnostic benchmarks, not promises)
Shorts at 72 h vs. channel median: engaged views, stayed-to-watch %, average % viewed (aim >70% for 40–50 s), subs per 1,000 engaged views. Long-form: CTR (aim 4–8% early), 30-s retention (>65%), AVD. First strategic pivot review after **30–50 quality uploads**, never after a handful.
