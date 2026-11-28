from playwright.sync_api import sync_playwright
import os
d=os.path.dirname(os.path.abspath(__file__))
with sync_playwright() as p:
    b=p.chromium.launch()
    for name,w,h,transp in [('logo',800,800,False),('banner',2560,1440,False),('watermark',300,300,True)]:
        pg=b.new_page(viewport={'width':w,'height':h})
        pg.goto(f'file://{d}/{name}.html'); pg.wait_for_timeout(600)
        pg.screenshot(path=f'{d}/{name}.png',omit_background=transp,clip={'x':0,'y':0,'width':w,'height':h})
    b.close()
