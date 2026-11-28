"""Corporate Blueprint narration: one Kokoro line per beat, Whisper word timings, one vo.wav.
Usage: python3 cb_tts.py <script.json>   (script: {slug, voice, speed, gap, lines:[{id,text,spoken?,pauseAfter?}]})"""
import sys, json, re, os, numpy as np, soundfile as sf
sys.path.insert(0, '/home/claude/kids-stories/scripts'); sys.path.insert(0, '/home/claude/cb')
from kokoro_onnx import Kokoro
from tts_kokoro import resolve_voice
from wcheck import m as whisper, load16
ENG = '/home/claude/kids-stories'
sc = json.load(open(sys.argv[1])); slug = sc['slug']
k = Kokoro(f'{ENG}/models/kokoro-v1.0.onnx', f'{ENG}/models/voices-v1.0.bin')
voice = resolve_voice(k, sc.get('voice', 'mix'))
SR = 24000; LEAD = 0.25
out = [np.zeros(int(LEAD * SR), dtype='float32')]; t = LEAD; lines = []
for ln in sc['lines']:
    s, sr = k.create(ln.get('spoken', ln['text']), voice=voice, speed=sc.get('speed', 1.0), lang='en-us')
    s = s.astype('float32')
    # trim silence
    idx = np.where(np.abs(s) > 0.01)[0]
    s = s[max(0, idx[0] - int(0.03 * SR)): idx[-1] + int(0.06 * SR)]
    tmp = f'/tmp/claude-0/{ln["id"]}.wav'; sf.write(tmp, s, SR)
    segs, _ = whisper.transcribe(load16(tmp), language='en', word_timestamps=True)
    ww = [w for sg in segs for w in sg.words]
    words = ln['text'].split(); dur = len(s) / SR
    if len(ww) == len(words):
        wt = [{'w': w, 's': round(t + x.start, 3), 'e': round(t + x.end, 3)} for w, x in zip(words, ww)]
    else:  # fall back: spread script words over whisper span, weighted by length
        st = ww[0].start if ww else 0; en = ww[-1].end if ww else dur
        wts = [len(re.sub(r"[^\w]", "", w)) + 2 for w in words]; tot = sum(wts); c = st; wt = []
        for w, x in zip(words, wts):
            d = (en - st) * x / tot; wt.append({'w': w, 's': round(t + c, 3), 'e': round(t + c + d, 3)}); c += d
    heard = ' '.join(x.word.strip() for x in ww)
    lines.append({'id': ln['id'], 'text': ln['text'], 'start': round(t, 3), 'end': round(t + dur, 3), 'words': wt, 'heard': heard, 'matched': len(ww) == len(words)})
    gap = ln.get('pauseAfter', sc.get('gap', 0.28))
    out += [s, np.zeros(int(gap * SR), dtype='float32')]; t += dur + gap
vo = np.concatenate(out); os.makedirs(f'{ENG}/public/cb/{slug}', exist_ok=True)
sf.write(f'{ENG}/public/cb/{slug}/vo.wav', vo, SR)
json.dump({'slug': slug, 'total': round(t + 0.9, 2), 'lines': lines}, open(f'{ENG}/src/cb/{slug}.vo.json', 'w'), indent=1)
for l in lines: print(l['id'], l['start'], l['end'], 'OK' if l['matched'] else 'FALLBACK', '|', l['heard'])
print('total', round(t, 2))
