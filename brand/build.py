import pathlib, subprocess
B = pathlib.Path("/home/claude/brand")
suhail = (B / "suhail.svg.part").read_text()
font = "/home/claude/kids-stories/public/fonts/cairo-arabic-800-normal.woff2"

QAMRA = """
<g id="qamra">
  <circle cx="100" cy="100" r="95" fill="#9FD8FF" opacity="0.18"/>
  <circle cx="100" cy="100" r="70" fill="#9FD8FF" opacity="0.18"/>
  <mask id="cres"><rect width="200" height="200" fill="#fff"/><circle cx="130" cy="78" r="58" fill="#000"/></mask>
  <circle cx="100" cy="100" r="62" fill="#FFE08A" mask="url(#cres)"/>
  <path d="M62 112 Q 70 106 78 112" stroke="#7A5A1E" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M72 132 Q 80 138 90 132" stroke="#7A5A1E" stroke-width="4" fill="none" stroke-linecap="round"/>
  <ellipse cx="62" cy="126" rx="8" ry="5" fill="#FF9FB0" opacity="0.7"/>
</g>"""

STARS = "".join(
    f'<circle cx="{x}" cy="{y}" r="{r}" fill="#FFF7D6" opacity="{o}"/>'
    for x, y, r, o in [(300,120,4,.9),(520,260,3,.7),(900,90,5,.9),(1150,200,3,.6),(1500,110,4,.8),
                       (1800,240,3,.7),(2050,100,5,.9),(2300,220,3,.6),(700,330,3,.5),(1950,360,3,.5)])

CSS = f"""@font-face{{font-family:Cairo;src:url('file://{font}') format('woff2');font-weight:800}}
html,body{{margin:0;padding:0;background:transparent}}"""

avatar = f"""<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body>
<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <defs><radialGradient id="bg" cx="50%" cy="40%" r="65%"><stop offset="0" stop-color="#FFE7B8"/><stop offset="1" stop-color="#F7B267"/></radialGradient></defs>
  <rect width="800" height="800" fill="url(#bg)"/>
  <circle cx="400" cy="400" r="330" fill="#FFF4DD" opacity="0.45"/>
  <g transform="translate(70,60) scale(1.65)">{suhail}</g>
</svg></body></html>"""

banner = f"""<!doctype html><html><head><meta charset="utf-8"><style>{CSS}
.t{{font-family:Cairo;font-weight:800}}</style></head><body>
<svg width="2560" height="1440" viewBox="0 0 2560 1440" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#2B2F6B"/><stop offset="0.55" stop-color="#7B5EA7"/><stop offset="1" stop-color="#F7A072"/></linearGradient></defs>
  <rect width="2560" height="1440" fill="url(#sky)"/>
  {STARS}
  <path d="M0 980 C 400 880, 800 1000, 1280 930 C 1700 870, 2100 990, 2560 900 L2560 1440 L0 1440Z" fill="#E9A15A"/>
  <path d="M0 1080 C 500 1000, 900 1110, 1400 1040 C 1900 980, 2200 1080, 2560 1030 L2560 1440 L0 1440Z" fill="#D98A45"/>
  <!-- palm -->
  <g transform="translate(330,600)">
    <path d="M40 360 C 30 250, 50 120, 70 40" stroke="#5B3A29" stroke-width="22" fill="none" stroke-linecap="round"/>
    <path d="M70 40 C 0 10, -60 40, -90 90 C -30 60, 20 60, 70 40Z M70 40 C 140 0, 210 30, 240 80 C 180 55, 120 55, 70 40Z M70 40 C 40 -40, 80 -90, 130 -100 C 100 -50, 90 -10, 70 40Z M70 40 C 10 -30, -40 -40, -80 -20 C -20 -10, 30 10, 70 40Z" fill="#3E8E5A"/>
  </g>
  <g transform="translate(2080,330) scale(1.2)">{QAMRA}</g>
  <!-- safe area 1546x423 centred: x 507-2053, y 508-931 -->
  <g transform="translate(1720,540) scale(1.05)">{suhail}</g>
  <text x="1150" y="720" text-anchor="middle" class="t" font-size="150" fill="#FFFFFF" direction="rtl"
        stroke="#3A2350" stroke-width="10" paint-order="stroke">سُهَيْل وأصحابه</text>
  <text x="1150" y="840" text-anchor="middle" class="t" font-size="62" fill="#FFE08A" direction="rtl">حكاياتٌ وتعلُّمٌ للأطفال · قصّةٌ جديدةٌ كلَّ يوم</text>
</svg></body></html>"""

(B / "avatar.html").write_text(avatar)
(B / "banner.html").write_text(banner)
chrome = "google-chrome"
for name, w, h in [("avatar", 800, 800), ("banner", 2560, 1440)]:
    subprocess.run([chrome, "--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
                    "--allow-file-access-from-files", f"--window-size={w},{h}",
                    f"--screenshot={B}/{name}.png", f"file://{B}/{name}.html"],
                   check=True, capture_output=True, timeout=60)
print("ok")
