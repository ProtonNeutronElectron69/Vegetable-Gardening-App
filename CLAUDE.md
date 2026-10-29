# Phoenix Garden Guide

Reference app for vegetable and fruit gardening in the Phoenix, AZ metro area (low desert, Maricopa County).

## Owner context

- The owner is non-technical. Make technical decisions yourself and explain changes in plain language.
- Current scope is a read-only reference (no accounts, no saved user data). Primary target is a desktop browser; it must also work well on phone browsers.
- Must keep working when `index.html` is opened directly from disk (`file://`): no ES modules, no `fetch()` of local files, no build step, no external CDNs. Data files set globals on `window` (`PLANTS`, `SOURCES`, `PHOTOS`) and are loaded with plain `<script>` tags.

## Layout

- `js/app.js`: single IIFE; hash routes `#/calendar`, `#/plants`, `#/plant/<id>`, `#/gallery`, `#/about`. Views render HTML strings into `<main>`; always pass data through `esc()`.
- `js/data/plants.js`: plant entries. Planting windows use half-month steps (`from` is the 1st or 15th, `to` is the 14th or month end). Methods: `S` seeds, `T` transplants, `B` both, `X` sets/cloves/tubers, `P` nursery plant or bare-root.
- `js/data/sources.js`: citations keyed by id; every plant lists at least one.
- `js/data/photos.js` and `images/plants/`: one photo per plant (Wikimedia Commons, free license, ~900px JPEG). Keep `images/plants/CREDITS.md` in sync.
- `css/styles.css`: color tokens on `:root` with dark-mode overrides; mobile rules under `@media (max-width: 760px)`.

## Data accuracy rules

- Vegetable planting windows must match UA Extension AZ1005 (Maricopa County planting calendar). Do not invent or "round" dates.
- Fruit windows must cite a UA Extension source in `sources.js`.
- Spacing, yield and tips are general guidance; keep them conservative and Phoenix-relevant.
- Only use photos with a free license (public domain, CC0, CC BY, CC BY-SA) and record artist, license and source URL.

## Checks

- `node scripts/validate-data.js` validates plants, sources and photos (runs in CI on every PR).
- To see the app, open `index.html` in a browser, or serve the folder (`python3 -m http.server`) and open it with Playwright for screenshots at desktop (1280px) and phone (390px) widths.
