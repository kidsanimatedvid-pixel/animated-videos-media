# Channel playbook — Arabic kids' story Shorts (v1.3, 22 Nov 2026)

Adapted from the shared football/WONDER setup pack. Claude reads this before every video. The engine, pipeline and checks from the original pack still apply unless this doc says otherwise. Items marked DRAFT wait for the owner's approval.

## 0. Channel basics
- **Audience:** children aged 2–8 in the **Gulf** (Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, Oman), and the parents who choose what they watch.
- **Language:** Modern Standard Arabic (فصحى), short simple sentences, full tashkeel (تشكيل) on all on-screen text. Gulf flavour in names, settings and everyday details (desert, sea, palm trees, majlis, dates, dhow boats).
- **Content:** a mix of stories with a value, gentle adventures, and light learning (letters, numbers, colours, animals, manners).
- **Output:** 2 Shorts a day (one STORY + one LEARN), 1080×1920, 30 fps.
- **Voices:** free Microsoft Edge Arabic voices via `scripts/tts_edge.py` (needs internet at render time).
- **YouTube audience setting:** every video is **Made for Kids**. That turns off comments, the notification bell and personalized ads, so nothing in this channel relies on comments or "follow" asks.
- **TikTok / Instagram (optional):** their users must be 13+, so captions there speak to parents ("a 40-second story about sharing for your little one").

## 1. Accounts (filled in at setup)
| Platform | Account | ID |
|---|---|---|
| vidIQ | kidsanimatedvid@gmail.com | connected |
| YouTube | سُهَيْل وأصحابه (@suhailandfriends, see `youtube-channel-setup.md`) | `UC6gCo7DuNY2Lg9g-rVCjCFg` (connected in vidIQ, can publish), category 27 (Education), Made for Kids |
| TikTok (optional) | `<name>` | `<id>` |
| Instagram (optional) | `<name>` | `<id>` |
| GitHub (MP4 hosting) | `kidsanimatedvid-pixel/animated-videos-media` | public repo, holds `engine2.tgz` + `videos/`; Claude can push |

Posting: `vidiq_video_upload(url)` → `vidiq_social_post_draft_create` → owner approves → `vidiq_social_post_publish`. **Never publish without the owner's "post it" / "post both".** TikTok: AI-generated label on.

## 2. The cast (original characters, simple shapes, easy to animate)
| Character | Who | Look (fixed every video) | Role |
|---|---|---|---|
| **سُهَيْل Suhail** | a curious little fennec fox, about 6 (named after the Suhail star every Gulf family knows) | sand-orange body, huge ears, teal scarf; ears droop when sad, shoot up when curious | main hero; makes small mistakes and learns |
| **قَمْرة Qamra** | a tiny crescent moon who floats and glows | pale gold crescent, soft blue glow, sleepy smile | narrator and big-sister voice; opens and closes every story |
| **جُمّول Jummul** | a baby camel | cream body, very long eyelashes, one floppy hump, always snacking on dates | comic relief, slow and kind |
| **هُدهُد Hudhud** | a small hoopoe | striped wings, big fan crest that pops up when he has news | brings the problem or question that starts each story |

Each character has one catchphrase, one signature move and a fixed palette (written into `src/components/` once approved).

## 3. Daily formats and posting times (set 22 Nov 2026 — see `growth-plan.md`)
| Slot | Format | Length | Shape |
|---|---|---|---|
| LEARN — Sun–Thu **15:30 KSA** (after school) · Fri–Sat **10:00 KSA** (weekend morning) | **تعلَّم مع سُهَيْل #N**: one letter / number / colour / animal / good habit, shown through a tiny scene with the cast (use the `bigtext` prop for the letter/number card) | 30–40 s | show → repeat → playful check ("أين الحرف ب؟") → answer |
| STORY — every day **19:00 KSA** (before bedtime) | **حكايات سُهَيْل #N**, framed as a bedtime story: Hudhud brings a problem → Suhail tries, gets it wrong → small turn → kind solution → Qamra's one-line lesson | 40–55 s | 3-act mini story |

- Times are KSA (UTC+3). Schedule with `publishAt` like `2026-11-24T19:00:00+03:00`.
- Production: a scheduled run every evening at 20:43 Jerusalem makes the NEXT day's two videos and sends ONE approval message ("Reply post both"). Approval schedules both. If a slot has already passed when the owner approves, publish that one at now + 10 min.
- Re-check the times in the weekly review once YouTube shows when viewers are online.

## 4. Rules for kids' videos (these replace the adult "viral" rules)
- **Pace:** Arabic narration ~1.8 words/s (slower than adult videos). STORY ≈ 70–95 words, LEARN ≈ 50–70 words.
- **Hook:** a character doing something on frame 1 plus a clear spoken line in the first 2 s ("سُهيل وجد بيضة كبيرة… لمن هذه؟"). No loud jump sounds, no "you won't believe".
- **Something new on screen every 2–4 s**, but no flashing, strobe or shaky camera.
- **One idea per video.** Show the value through what happens, not a lecture; Qamra says the lesson in one short line at the end.
- **Repetition is good** for this age: repeat the key word or phrase 2–3 times.
- **Ending:** a soft loop back to the opening image is fine; no "follow / comment / subscribe" asks (Made for Kids). Series name + number on the last card.
- **Never:** scary or violent scenes, characters getting hurt as a joke, dangerous behaviour kids could copy, mocking anyone's looks/background, romance, product promotion, toys or brand names, real people, copyrighted characters or songs.
- **Religion:** stay with universal values (kindness, honesty, sharing, patience, saying thank you) unless the owner adds religious guidance.
- **Facts (LEARN):** any fact about animals, nature or science needs 2 reliable sources; keep it true even when simplified.
- **Safe zone:** key text between y 300 and 1430, nothing in the right 140 px.
- **Text:** Cairo font, right-to-left, full tashkeel, large (≥ 64 px), max 4 words on screen at a time.
- **Art:** original cartoons only, soft rounded shapes, warm palette, high contrast.
- **Animation:** SVG rigs with stable pivots; acting beats anticipation → action → hold → settle; check sampled frames for detached limbs, bad layering, off-frame characters and unreadable expressions before rendering.
- **Music:** own gentle synthesized beds only, quiet under the voice.
- **Platform quality:** every video has its own story and visuals (no template-only repeats), so it stays within YouTube's rules on repetitive/low-effort content.

## 5. Voices (Edge TTS, free) — set in each storyboard's "voices" block
| Character | Voice | Rate | Pitch |
|---|---|---|---|
| Qamra (narrator) | ar-SA-ZariyahNeural | -8% | +0Hz |
| Suhail | ar-QA-AmalNeural | +0% | +16Hz |
| Jummul | ar-AE-HamdanNeural | -14% | +12Hz |
| Hudhud | ar-SA-HamedNeural | +5% | +18Hz |
- Chosen after a Whisper check of clarity (higher pitches blurred words like عاجل and نأكل).
- Run: `python3 scripts/tts_edge.py storyboards/<slug>.json` (each scene's `speaker` picks the voice).
- Check pronunciation: transcribe key lines with faster-whisper "small" (resample to 16 kHz first).

## 6. Engine and pipeline
- Engine: `engine2.tgz` in `kidsanimatedvid-pixel/animated-videos-media`. Setup: `tar xzf engine2.tgz && bash setup.sh && pip install --break-system-packages -q edge-tts`.
- Kids additions: `src/kids/Cast.tsx` (rigged Suhail, Qamra, Jummul, Hudhud: blink, talk, moods, ears/crest/wings), `src/kids/KidScene.tsx` (one data-driven scene, visual `"kid"`: bg day/dusk/night, actors, props palm/dates/rumble/hearts/badge/title/sparkles, cam, tint), music bed `music_playful.wav` (`make_music.py playful`), storyboard flag `"soft": true` (no vignette/grain), per-speaker voices in `tts_edge.py`.
- Network: Settings > Capabilities, network egress on, Domain allowlist **All domains**. `tts_edge.py` trusts `/root/.ccr/ca-bundle.crt` when present.
- Pipeline: storyboard JSON → `tts_edge.py` → set sfx `at` times from the timing file → register in `src/Root.tsx` → `npx tsc -p .` → bundle → contact sheet (`/home/claude/tools/contact.sh <id> <frames…>`, recreate if missing) → `render_final.py` → captions/titles → push MP4 → vidIQ draft → owner approval → publish.
- After changing the engine, rebuild `engine2.tgz` (see the original pack's command) and push it.

## 7. Titles and captions
- Title pattern (what breaks out in Arabic kids stories): a question or surprise + emoji, then the search phrase. ≤ 70 chars.
  - STORY: "من أكل تمرات جُمّول؟ 🤔 | قصص اطفال قبل النوم #shorts" ("قصص اطفال قبل النوم" ≈ 23k searches/month, +96% — vidIQ, Nov 2026)
  - LEARN: "حرف الباء مع سُهَيْل 🦆 | تعليم الحروف للاطفال #shorts"
- Description: hook line, one line about the value or skill, series name + episode, 3–5 hashtags (#قصص_اطفال_قبل_النوم #حكايات_اطفال #قصص_اطفال #تعليم_الاطفال …).
- Tags: قصص اطفال, قصص اطفال قبل النوم, حكايات اطفال, قصص أطفال, كرتون عربي, حكايات عربية, arabic story, arabic kids stories + the topic.
- YouTube: public, category 27, Made for Kids (channel default).
- TikTok/IG captions (if added later) address the parent.

## 8. Measuring (weekly review, Sunday — scheduled)
- Made for Kids has no comments, so judge by: views, engaged views, average % viewed, subscribers gained, and which videos beat the channel median.
- vidIQ credits: 150/month. The weekly review may use at most 4 analytics calls (20 credits). Daily runs use only free calls (`vidiq_user_channels`, post status).
- Compare each video at 72 h with the median of the last 5–10 of the same format.
- After 14 days, the weaker format gets changed (one variable at a time); a clear winner can take both slots.
- Results go in `weekly-reviews.md`; changes to formats/times go into this playbook with the date.

## 9. Logs (Project docs)
- `autopilot-log.md` — date, slot, video, test variable.
- `stories-covered.md` — every story's value/problem so nothing repeats.
- `learn-covered.md` — every letter / number / topic already taught.
- `ideas-backlog.md` — next stories and lessons; take from the top, remove when used.
- `growth-plan.md` — research behind times, titles and growth moves.
- Copies of these docs also live in the GitHub repo under `docs/` for scheduled runs.
