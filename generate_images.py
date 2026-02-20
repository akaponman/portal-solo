"""わさびソロ版ポータル用プレースホルダー画像生成"""
from html2image import Html2Image
import os

OUTPUT = os.path.join(os.path.dirname(__file__), 'images')
os.makedirs(OUTPUT, exist_ok=True)

hti = Html2Image(output_path=OUTPUT, size=(800, 600))

# 共通スタイル
BASE_STYLE = """
body { margin:0; display:flex; align-items:center; justify-content:center;
       font-family:'Segoe UI',sans-serif; overflow:hidden; }
"""

def gen(filename, html, css="", w=800, h=600):
    hti.size = (w, h)
    hti.screenshot(html_str=html, css_str=BASE_STYLE + css, save_as=filename)
    print(f"  -> {filename}")

# --- わさびキャラ画像 ---
gen("wasabi.png", """
<div style="width:400px;height:400px;border-radius:50%;
background:linear-gradient(135deg,#0EA5A0,#065F5B);
display:flex;align-items:center;justify-content:center;flex-direction:column;">
<div style="font-size:120px">🐢</div>
<div style="color:white;font-size:28px;font-weight:bold;margin-top:10px">わさび</div>
</div>
""", w=400, h=400)

gen("wasabi-profile.png", """
<div style="width:600px;height:500px;
background:linear-gradient(135deg,#CCFBF1,#E6FAF5);
display:flex;align-items:center;justify-content:center;flex-direction:column;gap:20px;">
<div style="font-size:160px">🐢</div>
<div style="font-size:32px;font-weight:bold;color:#0EA5A0">わさび</div>
<div style="font-size:16px;color:#4A7C78">Claude AI専門家 / ニホンイシガメ</div>
</div>
""", w=600, h=500)

# --- ヒーローデコ ---
gen("hero-deco-1.png", """
<div style="width:300px;height:300px;display:flex;align-items:center;justify-content:center;">
<div style="width:200px;height:200px;border-radius:50%;
background:radial-gradient(circle,rgba(14,165,160,0.3),transparent);"></div>
</div>
""", w=300, h=300)

gen("hero-deco-2.png", """
<div style="width:250px;height:250px;display:flex;align-items:center;justify-content:center;">
<div style="width:180px;height:180px;border-radius:30%;transform:rotate(45deg);
background:radial-gradient(circle,rgba(99,102,241,0.25),transparent);"></div>
</div>
""", w=250, h=250)

# --- プラットフォームヘッダー ---
headers = [
    ("header-blog.png", "Blog", "#0EA5A0", "#065F5B", "📖"),
    ("header-x.png", "X / Twitter", "#1D1D1D", "#333", "𝕏"),
    ("header-zenn.png", "Zenn", "#3EA8FF", "#2563EB", "Z"),
    ("header-qiita.png", "Qiita", "#55C500", "#2d8200", "Q"),
]
for fname, label, c1, c2, icon in headers:
    gen(fname, f"""
<div style="width:800px;height:280px;background:linear-gradient(135deg,{c1},{c2});
display:flex;align-items:center;justify-content:center;gap:20px;">
<div style="font-size:60px;color:white;opacity:0.8">{icon}</div>
<div style="font-size:36px;font-weight:bold;color:white;opacity:0.9">{label}</div>
</div>
""", w=800, h=280)

# --- ギャラリー画像 ---
gallery_items = [
    ("gallery-1.png", "Claude Code", "#0EA5A0", "#134E4A", "🤖"),
    ("gallery-2.png", "AI News", "#6366F1", "#3730A3", "📰"),
    ("gallery-3.png", "Prompt Tips", "#F59E0B", "#B45309", "💡"),
    ("gallery-4.png", "MCP Server", "#38BDF8", "#0369A1", "🔌"),
    ("gallery-5.png", "Agent SDK", "#5EEAD4", "#0D9488", "🛠"),
    ("gallery-6.png", "Tech Blog", "#0EA5A0", "#065F5B", "📝"),
]
for fname, label, c1, c2, icon in gallery_items:
    gen(fname, f"""
<div style="width:560px;height:400px;background:linear-gradient(135deg,{c1},{c2});
display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;">
<div style="font-size:72px">{icon}</div>
<div style="font-size:28px;font-weight:bold;color:white">{label}</div>
</div>
""", w=560, h=400)

# --- ブログカード画像 ---
blog_items = [
    ("blog-1.png", "AIでWebサイトが\n118分で完成？", "#0EA5A0", "#065F5B"),
    ("blog-2.png", "Claude Sonnet 4.6\nリリース", "#6366F1", "#3730A3"),
    ("blog-3.png", "Draw.io MCP\nServer", "#F59E0B", "#B45309"),
]
for fname, label, c1, c2 in blog_items:
    lines = label.split('\n')
    html_lines = ''.join(f'<div style="font-size:28px;font-weight:bold;color:white;text-align:center">{l}</div>' for l in lines)
    gen(fname, f"""
<div style="width:800px;height:360px;background:linear-gradient(135deg,{c1},{c2});
display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;">
<div style="font-size:48px;margin-bottom:8px">🐢</div>
{html_lines}
<div style="margin-top:12px;font-size:14px;color:rgba(255,255,255,0.7)">あかはらVラボ</div>
</div>
""", w=800, h=360)

print(f"\nDone! {len(os.listdir(OUTPUT))} images generated in {OUTPUT}")
