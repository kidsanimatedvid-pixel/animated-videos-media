import sys, soundfile as sf, numpy as np
from scipy.signal import resample_poly
from faster_whisper import WhisperModel
m=WhisperModel('small',device='cpu',compute_type='int8')
def load16(f):
    a,sr=sf.read(f,dtype='float32')
    if a.ndim>1:a=a.mean(1)
    from math import gcd
    g=gcd(sr,16000); return resample_poly(a,16000//g,sr//g).astype('float32')
if __name__=='__main__':
    for f in sys.argv[1:]:
        segs,_=m.transcribe(load16(f),language='en')
        print(f.split('/')[-1],'|',' '.join(s.text.strip() for s in segs))
