# Grill & Ground — Virtual Buffet

From Ground to Cloud: a single-page, scroll-driven experience for the Grill & Ground Virtual Buffet.

## What's inside
- **Opening journey** — real farm footage, scroll-scrubbed from the farm aisle up through the clouds to the steak in the cloud world
- **Virtual Buffet builder** — 12 chef-curated mains plus side, salad, soup & pasta, bake, dessert, beverage and add-on, with live pricing (main + beverage + add-on)
- **Confirm Selection** — full-screen cinematic order creation (bento assembly, crystal lid, live QR seal, scan-to-win rewards), then an automatic glide into the packaging section
- **Packaging scene** — scroll-controlled packing film, delivery, scan and the campaign

## Files
| File | Purpose |
|---|---|
| `index.html` | The whole site in one file — all photos, footage frames and scripts are embedded (about 16 MB) |
| `.nojekyll` | Tells GitHub Pages to serve the file as-is |

No build step and no dependencies. Fonts load from Google Fonts.

## Publish with GitHub Pages
1. Push this folder to a repository (or upload the files on github.com → **Add file → Upload files**).
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
4. After a minute the site is live at `https://<your-username>.github.io/<repo-name>/`.

## Run locally
Open `index.html` in any modern browser, or serve the folder:
```
python3 -m http.server 8000
```
then visit http://localhost:8000.
