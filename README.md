# Grill & Ground — Virtual Buffet

**From Ground to Cloud.** A single-page, scroll-driven experience for the Grill & Ground Virtual Buffet.

**Live site:** https://melodynati.github.io/grill-and-ground/

## What's on the page
- **Opening journey**: real farm footage scrubbed by scroll, from the farm aisle up through the clouds to the steak in the cloud world (GSAP ScrollTrigger)
- **Facts and branches**: 4 branches whose status ("Opening 9 Oct" → "Open now") follows the calendar
- **Virtual Buffet builder**: 12 chef-curated mains plus side, salad, soup & pasta, bake, dessert, beverage and add-on; live total = main + beverage + add-on
- **Confirm Selection**: full-screen cinematic order creation (assembly, crystal lid, live QR seal, scan-to-win rewards), then an automatic glide to packaging
- **Packaging scene**: scroll-controlled packing film, delivery, scan and the campaign

## Quick start
```bash
git clone https://github.com/Melodynati/grill-and-ground.git
cd grill-and-ground
python3 build.py                 # rebuild index.html from src/
python3 -m http.server 8000      # then open http://localhost:8000
```
Requires only Python 3.8+. No npm install, no bundler.

## Project structure
```
src/
  index.html             page markup; {{tokens}} mark where CSS, JS and assets go
  styles/
    main.css             layout, journey, builder, branches, packaging
    cinematic.css        full-screen Confirm Selection sequence
  scripts/               loaded in this order (classic scripts sharing one scope)
    00-media.js          photo and footage-frame tables (PH, FARM_FRAMES, ...)
    01-frame-player.js   canvas frame player with a <video>-like API (GGFrames)
    02-dish-art.js       SVG fallback artwork for dishes
    03-menu.js           menu data (MAINS, CURATE, CATS) and pricing (setPrice)
    04-builder.js        builder UI: steps, dish cards, basket, sticky bar
    05-journey.js        opening scene: farm → clouds → steak
    06-packaging.js      packaging scene layout and packing-film scrub
    07-scroll-sync.js    ties the opening to GSAP ScrollTrigger
    08-campaign.js       packaging scenes, QR seal (links to the live site), rewards
    09-branches.js       branch status by date, branch count
    10-reveal.js         section fade-in on scroll, counting numbers
    11-confirm.js        Confirm Selection button and hand-off
    12-cinematic.js      cinematic order-creation sequence
  vendor/                GSAP 3.15.0, ScrollTrigger 3.15.0, qrcode-generator
  assets/
    images/ph/           menu photos, one per dish id (e.g. truffle.webp)
    images/sc/           cloud plates and plate photo for the opening
    images/ing/          ingredient photos used in packaging
    images/brand/        logo lockup and logo mark (also the favicon)
    images/leaves/       foreground lettuce in the opening
    images/cine_still/   final still of the cinematic
    frames/farm_frames/  opening farm footage, 120 frames (960×540)
    frames/steak_frames/ steak-in-the-clouds footage, 48 frames
    frames/pack_frames/  packing film, 275 frames (16 fps)
build.py                 inlines src/ into the published index.html
index.html               BUILT OUTPUT served by GitHub Pages; do not edit by hand
.github/workflows/       CI: checks index.html is current and every asset is used
```

## How the build works
`src/index.html` contains three kinds of tokens; `build.py` replaces them:

| Token | Becomes |
|---|---|
| `{{include:styles/main.css}}` | the file's text, inlined |
| `{{datauri:assets/images/ph/truffle.webp}}` | `data:image/webp;base64,...` |
| `{{b64:assets/frames/farm_frames/000.webp}}` | the raw base64 string |

The output is one self-contained `index.html` (about 16 MB), so the site also runs offline or as a single file.

## Common changes
- **Swap a menu photo:** replace `src/assets/images/ph/<dish-id>.webp` (720×480 works well), then build.
- **Edit menu items, prices, badges:** `src/scripts/03-menu.js` (`MAINS`, `CURATE`, `CATS`).
- **Edit branches:** the `.br` cards in `src/index.html` (`data-open="YYYY-MM-DD"` drives the status).
- **Edit styling:** `src/styles/main.css`.

## Workflow
1. Edit files in `src/`.
2. Run `python3 build.py`.
3. Commit **both** your `src/` changes and the rebuilt `index.html`.
4. Push to `main`; GitHub Pages republishes within a minute or two.

`python3 build.py --check` fails if `index.html` is out of date or a file in `src/` is no longer used. GitHub runs the same check on every push.

## Notes
- Keep embedded media under GitHub's 100 MB per-file limit. The built page is about 16 MB.
- Footage is stored as still frames, not video: scroll-scrubbing frames is smoother on every browser, and some hosts block blob video.
- GSAP is used under its standard no-charge license; qrcode-generator is MIT.
