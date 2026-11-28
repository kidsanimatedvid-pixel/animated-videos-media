# Production Workflow — Corporate Blueprint (v1, 28 Nov 2026)

Everything runs free in a cloud session: Remotion 4 (React/SVG/CSS 3D) in headless Chrome, Kokoro TTS (offline, Apache-2.0), faster-whisper (word timing and pronunciation check), ffmpeg. No GPU, 2 CPUs: a 45 s Short renders in ~15–25 min.

## 0. Setup (fresh session)
```
cd /home/claude && git clone -q https://github.com/kidsanimatedvid-pixel/animated-videos-media.git
mkdir -p kids-stories && cd kids-stories && tar xzf ../animated-videos-media/engine2.tgz && bash setup.sh
pip install --break-system-packages -q kokoro-onnx soundfile faster-whisper scipy
# Kokoro model files (once, ~350 MB) into kids-stories/models/:
#   github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/{kokoro-v1.0.onnx,voices-v1.0.bin}
mkdir -p /home/claude/cb && cp ../animated-videos-media/corporate-blueprint/engine/tools/* /home/claude/cb/
```
`engine2.tgz` already contains `src/cb/` (kit + compositions) and the fonts. The canonical copies are in `corporate-blueprint/engine/`.

## 1. Choose the topic (≥5 candidates, scored /100)
Take the top 5 unproduced rows of `CONTENT_IDEAS.csv` (skip anything in `VIDEO_HISTORY.csv`). Re-score each with fresh evidence: one vidIQ `outliers` call (5 credits) on the topic, plus a check of how recently competitors covered it. Pick the highest score whose premise is VERIFIED or NUANCE. CANDIDATE topics must be fact-checked first (step 2).

## 2. Research and fact-check (blocking)
- Primary sources first: annual report / 10-K / results release, regulator data, then Reuters/Bloomberg/FT/WSJ/CNBC.
- Every on-screen number needs a source and a date. Cross-check key claims with 2 sources where possible.
- Log each source in `SOURCE_REGISTRY.md` under the video's slug. Mark estimates as estimates and interpretation as interpretation.

## 3. Script (35–60 s, ~110–135 words)
0–2 s hook (object + contradiction) → 2–8 s familiar setup + twist → 8–25 s mechanism → 25–45 s reveal (the number) → payoff line that reframes the hook. Write `<slug>.script.json` (see `engine/tools/costco-hotdog.script.json`). Use `spoken` for numbers ("a dollar fifty"), `text` for captions ("$1.50").

## 4. Voice
`python3 /home/claude/cb/cb_tts.py <slug>.script.json` writes `public/cb/<slug>/vo.wav` and `src/cb/<slug>.vo.json` (line timings + Whisper word timings). Check that every line's `heard` text matches. FALLBACK is fine when it's only tokenisation ("$1 .50").

## 5. Animate
New file `src/cb/<Name>.tsx` built from `kit.tsx` (Backdrop, Finish, Kicker, Source, Captions, draw()). Scenes are keyed to line starts in the vo.json. **Each video gets its own drawings and visual metaphors.** Reuse the kit, never a whole scene. Register in `src/Root.tsx`; then `npx tsc -p .` and `npx remotion bundle src/index.ts --out-dir=build`.

## 6. Look before rendering (mandatory)
Render ~15 stills: `npx remotion still build <id> out/stills/<id>-<f>.png --frame=<f>`, then `python3 /home/claude/cb/sheet.py <id> <frames…>`, then READ the sheet. Check:
- frame 0 is strong with the sound off
- safe zone and right margin
- no overlaps between captions, labels and sources
- glyphs render (watch for missing ¢ € in serif fonts)
- nothing static for more than 3 s

Fix and re-check.

## 7. Render and finish
```
npx remotion render build <id> out/<id>-raw.mp4 --concurrency=2 --crf=16      # background, ~20 min
ffmpeg -i out/<id>-raw.mp4 -c:v copy -af "loudnorm=I=-14:TP=-1.5:LRA=11" -c:a aac -b:a 192k out/<id>.mp4
ffprobe → 1080×1920, 30 fps, audio present, 35–60 s
```
Then watch it: extract a 2 fps strip plus Whisper-transcribe the final audio, and compare against the script.

## 8. QC score (/100, must be ≥85; any factual, copyright, broken-animation or misleading issue blocks)
Hook 20 · Story 20 · Animation/visual 25 · Narration/sound 10 · Originality 10 · Accuracy 10 · Technical 5. Write the score **with the evidence for each line** in `VIDEO_HISTORY.csv`.

## 9. Publish
Copy the MP4 to `videos/<date>/`, commit and push. Then `vidiq_video_upload(url=<commit-pinned raw URL>)` and `vidiq_social_post_draft_create` (YouTube, public, category 27, title/description/tags, `publishAt` within the test window). Send the owner one message. Publish only after approval (first 3 videos; afterwards per `DAILY_TASK.md`).

## 10. Log
Add a `VIDEO_HISTORY.csv` row and an `ANALYTICS_LOG.csv` placeholder. Update `CONTENT_IDEAS.csv` status. If the engine changed, rebuild `engine2.tgz` (command in the kids playbook) and copy `src/cb/*` to `corporate-blueprint/engine/src/cb/`.
