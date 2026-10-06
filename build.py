#!/usr/bin/env python3
"""Build the published single-file site.

Reads src/index.html, inlines every {{include:...}} (CSS/JS) and embeds every
{{datauri:...}} / {{b64:...}} asset as base64, then writes ./index.html,
which GitHub Pages serves. No dependencies beyond Python 3.8+.

    python3 build.py            # build index.html
    python3 build.py --check    # fail if index.html is out of date or an asset is unused
"""
import base64, os, re, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, "src")
OUT = os.path.join(ROOT, "index.html")
MIME = {".webp": "image/webp", ".png": "image/png", ".gif": "image/gif", ".jpg": "image/jpeg", ".jpeg": "image/jpeg"}
TOKEN = re.compile(r"\{\{(include|datauri|b64):([^}]+)\}\}")


def read(rel, mode="rb"):
    path = os.path.join(SRC, rel)
    if not os.path.isfile(path):
        sys.exit(f"build: missing file src/{rel}")
    with open(path, mode, **({"encoding": "utf-8"} if "b" not in mode else {})) as f:
        return f.read()


USED = set()


def render(text):
    def sub(m):
        kind, rel = m.group(1), m.group(2)
        USED.add(rel)
        if kind == "include":
            return render(read(rel, "r"))
        data = base64.b64encode(read(rel)).decode("ascii")
        if kind == "b64":
            return data
        return f"data:{MIME[os.path.splitext(rel)[1].lower()]};base64,{data}"
    return TOKEN.sub(sub, text)


def main():
    html = render(read("index.html", "r"))
    unused = sorted(
        os.path.relpath(os.path.join(d, f), SRC).replace(os.sep, "/")
        for d, _, files in os.walk(SRC) for f in files
        if f != "index.html" and not f.startswith(".")
    )
    unused = [f for f in unused if f not in USED]
    if unused:
        print("build: unused files in src/ (delete them or reference them):")
        for f in unused:
            print("  -", f)
    if "--check" in sys.argv:
        if unused:
            sys.exit(1)
        current = open(OUT, encoding="utf-8").read() if os.path.exists(OUT) else ""
        if current != html:
            sys.exit("build: index.html is out of date - run `python3 build.py`")
        print("build: index.html is up to date")
        return
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(html)
    mb = len(html.encode("utf-8")) / 1e6
    print(f"build: wrote index.html ({mb:.1f} MB)")
    if mb > 16:
        print("build: note - over 16 MB; fine for GitHub Pages, too large for a Claude artifact")


if __name__ == "__main__":
    main()
