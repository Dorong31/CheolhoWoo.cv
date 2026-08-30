#!/usr/bin/env python3
"""src/data/profile.yml 로 og:image(1200x630)를 생성합니다.  python3 scripts/make-og.py"""
import os, yaml
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
p = yaml.safe_load(open(os.path.join(ROOT, "src/data/profile.yml"), encoding="utf-8"))

PAPER, INK, MUTED = "#F2F4F3", "#16211F", "#4A5A57"
RAMP = ["#DCE6E3", "#A9C6BE", "#6FA396", "#3C7D6E", "#1F5E52"]
FONT = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
FONT_R = "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc"

def f(path, size):
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        return ImageFont.load_default(size)

img = Image.new("RGB", (1200, 630), PAPER)
d = ImageDraw.Draw(img)

for i, c in enumerate(RAMP):
    d.rectangle([0, i * 126, 18, (i + 1) * 126], fill=c)

x = 88
d.text((x, 132), p["lab"]["ko"], font=f(FONT_R, 26), fill=MUTED)
d.text((x, 186), p["name"]["ko"], font=f(FONT, 92), fill=INK)
d.text((x, 316), f'{p["role"]["ko"]} · {p["affiliation"]["ko"]}', font=f(FONT_R, 30), fill=MUTED)
if (p.get("tagline") or {}).get("ko"):
    d.rectangle([x, 388, x + 3, 470], fill=RAMP[2])

tag, line, y = (p.get("tagline") or {}).get("ko") or "", "", 388
fnt = f(FONT_R, 27)
for ch in tag:
    if d.textlength(line + ch, font=fnt) > 880:
        d.text((x + 22, y), line, font=fnt, fill=INK); y += 42; line = ch
    else:
        line += ch
if line:
    d.text((x + 22, y), line, font=fnt, fill=INK)

out = os.path.join(ROOT, "public/files/og.png")
img.save(out)
print("wrote", out)
