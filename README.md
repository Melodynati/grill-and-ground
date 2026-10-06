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
  index.html            page markup; {{tokens}} mark where CSS, JS and assets go
  styles/
    main.css            layout, journey, builder, branches, packaging
    cinematic.css       full-screen Confirm Selection sequence
  scripts/
    01-branches.js      branch status by date, branch count
    02-builder.js       menu data (MAINS, CATS, photos), builder, basket, pricing
    03-journey.js       opening scene: frame-sequence camera, pollen, clouds
    04-packaging.js     packaging scene layout and packing film scrub
    05-scroll-sync.js   connects the opening to GSAP ScrollTrigger
    06-campaign.js      packaging scenes 1–8, QR seal, scan-to-win campaign
    07-reveal.js        section fade-in on scroll, counting numbers
    08-confirm.js       Confirm Selection button and hand-off
    09-cinematic.js     the cinematic order creation sequence
  vendor/               GSAP 3.15.0, ScrollTrigger 3.15.0, qrcode-generator
  assets/
    images/ph/          menu photos, one file per dish id (e.g. truffle.webp)
    images/sc/          sky, cloud and plate plates for the opening
    images/ing/         ingredient images used in packaging
    images/...          logos, final still and other page images
    frames/farm_frames/ opening farm footage, 120 frames (960×540)
    frames/steak_frames/steak-in-the-clouds footage, 48 frames
    frames/pack_frames/ packing film, 275 frames (16 fps)
build.py                inlines src/ into the published index.html
index.html              BUILT OUTPUT served by GitHub Pages; do not edit by hand
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
- **Edit menu items, prices, badges:** `src/scripts/02-builder.js` (`MAINS`, `CURATE`, `CATS`).
- **Edit branches:** the `.br` cards in `src/index.html` (`data-open="YYYY-MM-DD"` drives the status).
- **Edit styling:** `src/styles/main.css`.

## Workflow
1. Edit files in `src/`.
2. Run `python3 build.py`.
3. Commit **both** your `src/` changes and the rebuilt `index.html`.
4. Push to `main`; GitHub Pages republishes within a minute or two.

`python3 build.py --check` fails if `index.html` is out of date. Useful before committing.

## Notes
- Keep embedded media under GitHub's 100 MB per-file limit. The built page is about 16 MB.
- Footage is stored as still frames, not video: scroll-scrubbing frames is smoother on every browser, and some hosts block blob video.
- GSAP is used under its standard no-charge license; qrcode-generator is MIT.
