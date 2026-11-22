"""Cast sheet: Suhail, Qamra, Jummul, Hudhud (each drawn in a 400x400 box)."""
import pathlib, subprocess
B = pathlib.Path("/home/claude/brand")
font = "/home/claude/kids-stories/public/fonts/cairo-arabic-800-normal.woff2"
SUHAIL = (B / "suhail.svg.part").read_text()

QAMRA = """
<g id="qamra">
  <circle cx="190" cy="200" r="185" fill="#9FD8FF" opacity="0.15"/>
  <circle cx="190" cy="200" r="160" fill="#9FD8FF" opacity="0.18"/>
  <mask id="qm"><rect width="400" height="400" fill="#fff"/><circle cx="290" cy="150" r="125" fill="#000"/></mask>
  <circle cx="190" cy="200" r="145" fill="#FFE08A" mask="url(#qm)"/>
  <circle cx="190" cy="200" r="145" fill="none" stroke="#F5C451" stroke-width="8" mask="url(#qm)"/>
  <!-- sleepy eyes -->
  <path d="M78 190 Q 92 202 106 190" stroke="#6B4A12" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M128 198 Q 142 210 156 198" stroke="#6B4A12" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M76 186 L 70 178 M86 184 L 83 175" stroke="#6B4A12" stroke-width="4" stroke-linecap="round"/>
  <!-- cheeks + smile -->
  <ellipse cx="86" cy="222" rx="14" ry="9" fill="#FF9FB0" opacity="0.75"/>
  <ellipse cx="150" cy="228" rx="12" ry="8" fill="#FF9FB0" opacity="0.75"/>
  <path d="M104 236 Q 118 250 134 238" stroke="#6B4A12" stroke-width="6" fill="none" stroke-linecap="round"/>
  <!-- star hair clip -->
  <path d="M118 62 l9 18 20 3 -14 14 3 20 -18 -9 -18 9 3 -20 -14 -14 20 -3z" fill="#FFFFFF" stroke="#F5C451" stroke-width="4" stroke-linejoin="round"/>
  <!-- sparkles -->
  <path d="M300 300 l6 14 14 6 -14 6 -6 14 -6 -14 -14 -6 14 -6z" fill="#FFF7D6"/>
  <path d="M330 230 l4 9 9 4 -9 4 -4 9 -4 -9 -9 -4 9 -4z" fill="#FFF7D6"/>
</g>"""

JUMMUL = """
<g id="jummul">
  <!-- tail -->
  <path d="M95 290 C 70 300, 65 330, 78 345" stroke="#C9A06A" stroke-width="8" fill="none" stroke-linecap="round"/>
  <ellipse cx="78" cy="350" rx="10" ry="14" fill="#8A6440"/>
  <!-- back legs -->
  <rect x="115" y="320" width="34" height="62" rx="17" fill="#D9A866"/>
  <rect x="245" y="320" width="34" height="62" rx="17" fill="#D9A866"/>
  <!-- floppy hump -->
  <path d="M130 255 C 120 185, 175 160, 215 180 C 240 195, 245 225, 250 255 Z" fill="#EFC88C"/>
  <path d="M205 178 C 235 170, 262 190, 258 215 C 245 205, 228 200, 215 198 Z" fill="#D9A866"/>
  <!-- body -->
  <ellipse cx="200" cy="290" rx="112" ry="62" fill="#EFC88C"/>
  <ellipse cx="205" cy="305" rx="70" ry="38" fill="#FFF3DE"/>
  <!-- front legs -->
  <rect x="150" y="325" width="36" height="62" rx="18" fill="#EFC88C"/>
  <rect x="215" y="325" width="36" height="62" rx="18" fill="#EFC88C"/>
  <ellipse cx="168" cy="386" rx="22" ry="9" fill="#C9A06A"/>
  <ellipse cx="233" cy="386" rx="22" ry="9" fill="#C9A06A"/>
  <!-- neck -->
  <path d="M270 270 C 300 240, 300 200, 292 170 L 330 165 C 345 205, 330 255, 300 290 Z" fill="#EFC88C"/>
  <!-- ears -->
  <ellipse cx="282" cy="88" rx="12" ry="20" fill="#D9A866" transform="rotate(-25 282 88)"/>
  <ellipse cx="330" cy="84" rx="12" ry="20" fill="#D9A866" transform="rotate(20 330 84)"/>
  <!-- head -->
  <ellipse cx="308" cy="135" rx="62" ry="52" fill="#EFC88C"/>
  <ellipse cx="350" cy="160" rx="42" ry="32" fill="#FFF3DE"/>
  <!-- tuft -->
  <path d="M290 88 q 8 -16 18 -2 q 8 -16 18 0 q 6 -12 14 4" fill="#C9A06A"/>
  <!-- eye with long lashes -->
  <ellipse cx="315" cy="125" rx="13" ry="17" fill="#2B1B12"/>
  <circle cx="320" cy="118" r="5" fill="#fff"/>
  <path d="M304 110 l -10 -12 M312 107 l -4 -15 M321 107 l 2 -15 M329 111 l 8 -12" stroke="#2B1B12" stroke-width="4" stroke-linecap="round"/>
  <!-- nostril, smile, cheek -->
  <ellipse cx="372" cy="150" rx="5" ry="3" fill="#8A6440"/>
  <path d="M340 178 Q 356 190 374 178" stroke="#8A6440" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="300" cy="158" rx="13" ry="8" fill="#FF9FB0" opacity="0.6"/>
  <!-- a date (snack) -->
  <ellipse cx="385" cy="190" rx="11" ry="16" fill="#7A3E1D" transform="rotate(25 385 190)"/>
  <path d="M382 176 q 6 -6 10 -2" stroke="#4E7A3A" stroke-width="3" fill="none"/>
</g>"""

def feather(angle):
    return (f'<g transform="rotate({angle} 200 125)">'
            '<rect x="188" y="25" width="24" height="100" rx="12" fill="#F0A35E"/>'
            '<rect x="188" y="40" width="24" height="12" fill="#FFFFFF"/>'
            '<path d="M188 52 V 37 A 12 12 0 0 1 212 37 V 40 H 188 Z" fill="#2B1B12"/>'
            '</g>')

HUDHUD = f"""
<g id="hudhud">
  <!-- crest -->
  {''.join(feather(a) for a in (-50, -25, 0, 25, 50))}
  <!-- tail -->
  <path d="M120 270 L 40 320 L 55 345 L 135 300 Z" fill="#2B1B12"/>
  <path d="M62 309 L 74 332 L 88 324 L 76 300 Z" fill="#FFFFFF"/>
  <!-- legs -->
  <path d="M185 320 V 375 M220 320 V 375" stroke="#7A5A48" stroke-width="7" stroke-linecap="round"/>
  <path d="M170 378 H 200 M205 378 H 235" stroke="#7A5A48" stroke-width="7" stroke-linecap="round"/>
  <!-- body -->
  <ellipse cx="200" cy="260" rx="88" ry="72" fill="#E8A36B"/>
  <ellipse cx="225" cy="280" rx="50" ry="45" fill="#FFE2C4"/>
  <!-- striped wing -->
  <path d="M120 230 C 150 215, 205 225, 215 262 C 200 300, 140 300, 115 275 Z" fill="#2B1B12"/>
  <path d="M135 236 L 150 294 M160 228 L 172 298 M186 232 L 194 290" stroke="#FFFFFF" stroke-width="9" stroke-linecap="round"/>
  <!-- head -->
  <circle cx="215" cy="165" r="60" fill="#F0A35E"/>
  <!-- beak -->
  <path d="M265 170 C 300 172, 335 185, 362 210 C 330 200, 298 192, 262 188 Z" fill="#3A2A20"/>
  <!-- eye -->
  <circle cx="232" cy="155" r="17" fill="#2B1B12"/>
  <circle cx="238" cy="149" r="6" fill="#fff"/>
  <ellipse cx="218" cy="185" rx="12" ry="7" fill="#FF8FA3" opacity="0.6"/>
</g>"""

CAST = [("سُهَيْل", "Suhail", SUHAIL, "#FFE7B8"),
        ("قَمْرة", "Qamra", QAMRA, "#3B3F7E"),
        ("جُمّول", "Jummul", JUMMUL, "#DCEFFD"),
        ("هُدهُد", "Hudhud", HUDHUD, "#CFEFEA")]

def tile(i, ar, en, art, bg):
    x, y = (i % 2) * 600, (i // 2) * 640
    light = bg != "#3B3F7E"
    col = "#3A2350" if light else "#FFE08A"
    return (f'<g transform="translate({x},{y})"><rect x="12" y="12" width="576" height="616" rx="40" fill="{bg}"/>'
            f'<g transform="translate(70,40) scale(1.15)">{art}</g>'
            f'<text x="300" y="560" text-anchor="middle" class="t" font-size="64" fill="{col}">{ar}</text>'
            f'<text x="300" y="608" text-anchor="middle" class="e" font-size="30" fill="{col}" opacity="0.8">{en}</text></g>')

html = f"""<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:Cairo;src:url('file://{font}') format('woff2');font-weight:800}}
html,body{{margin:0;background:#fff}} .t{{font-family:Cairo;font-weight:800}} .e{{font-family:sans-serif;font-weight:700}}
</style></head><body><svg width="1200" height="1280" viewBox="0 0 1200 1280" xmlns="http://www.w3.org/2000/svg">
{''.join(tile(i, *c) for i, c in enumerate(CAST))}</svg></body></html>"""
(B / "cast.html").write_text(html)
for name, part in [("qamra", QAMRA), ("jummul", JUMMUL), ("hudhud", HUDHUD)]:
    (B / f"{name}.svg.part").write_text(part)
subprocess.run(["google-chrome", "--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
                "--allow-file-access-from-files", "--window-size=1200,1280",
                f"--screenshot={B}/cast.png", f"file://{B}/cast.html"], check=True, capture_output=True, timeout=60)
print("ok")
