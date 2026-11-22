#!/bin/bash
# usage: contact.sh <composition-id> <frame> [<frame> ...]  -> out/<id>-sheet.png (270x480 tiles, 5 per row)
set -e
cd /home/claude/kids-stories
id=$1; shift
mkdir -p out/stills
for fr in "$@"; do
  npx remotion still build "$id" "out/stills/$id-$fr.png" --frame="$fr" --browser-executable=/usr/bin/google-chrome --log=error >/dev/null
done
python3 - "$id" "$@" <<'EOF'
import sys
from PIL import Image, ImageDraw
cid, frames = sys.argv[1], sys.argv[2:]
W, H, cols = 270, 480, 5
rows = (len(frames) + cols - 1) // cols
sheet = Image.new('RGB', (W * cols, (H + 24) * rows), 'white')
d = ImageDraw.Draw(sheet)
for i, fr in enumerate(frames):
    im = Image.open(f'out/stills/{cid}-{fr}.png').convert('RGB').resize((W, H))
    x, y = (i % cols) * W, (i // cols) * (H + 24)
    sheet.paste(im, (x, y + 24))
    d.text((x + 6, y + 4), f'f{fr}', fill='black')
    # safe-zone guides (y 300 / 1430, right 140 px)
    d.line([(x, y + 24 + 300 // 4), (x + W, y + 24 + 300 // 4)], fill=(255, 0, 0))
    d.line([(x, y + 24 + 1430 // 4), (x + W, y + 24 + 1430 // 4)], fill=(255, 0, 0))
    d.line([(x + W - 35, y + 24), (x + W - 35, y + 24 + H)], fill=(255, 0, 0))
sheet.save(f'out/{cid}-sheet.png')
print('sheet', f'out/{cid}-sheet.png')
EOF
