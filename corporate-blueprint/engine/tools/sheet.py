import sys
from PIL import Image, ImageDraw
cid, frames = sys.argv[1], sys.argv[2:]
W, H, cols = 270, 480, 5
rows = (len(frames) + cols - 1) // cols
sheet = Image.new('RGB', (W * cols, (H + 24) * rows), 'white'); d = ImageDraw.Draw(sheet)
for i, fr in enumerate(frames):
    im = Image.open(f'/home/claude/kids-stories/out/stills/{cid}-{fr}.png').convert('RGB').resize((W, H))
    x, y = (i % cols) * W, (i // cols) * (H + 24); sheet.paste(im, (x, y + 24)); d.text((x + 6, y + 4), f'f{fr}', fill='black')
    for yy in (300, 1430): d.line([(x, y + 24 + yy // 4), (x + W, y + 24 + yy // 4)], fill=(255, 0, 0))
    d.line([(x + W - 35, y + 24), (x + W - 35, y + 24 + H)], fill=(255, 0, 0))
sheet.save(f'/home/claude/cb/{cid}-sheet.png'); print('ok')
