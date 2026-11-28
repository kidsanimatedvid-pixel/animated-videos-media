import sys, soundfile as sf, numpy as np
sys.path.insert(0,'/home/claude/kids-stories/scripts')
from kokoro_onnx import Kokoro
from tts_kokoro import resolve_voice
k=Kokoro('/home/claude/kids-stories/models/kokoro-v1.0.onnx','/home/claude/kids-stories/models/voices-v1.0.bin')
line="This hot dog has cost a dollar fifty since 1985. Costco's CEO says that price will not change as long as he's around."
for name,lang in [('mix','en-us'),('am_michael','en-us'),('brit','en-gb'),('am_onyx:0.4,am_eric:0.6','en-us')]:
    s,sr=k.create(line,voice=resolve_voice(k,name),speed=1.0,lang=lang)
    fn=f"/home/claude/cb/vt_{name.replace(':','').replace(',','_').replace('.','')}.wav"; sf.write(fn,s,sr); print(fn, round(len(s)/sr,2))
