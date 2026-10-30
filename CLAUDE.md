# Phoenix Garden Guide

Reference app for vegetable and fruit gardening in the Phoenix, AZ metro area (low desert, Maricopa County).

## Owner context

- The owner is non-technical. Make technical decisions yourself and explain changes in plain language.
- Current scope is a read-only reference (no accounts, no saved user data). Primary target is a desktop browser; it must also work well on phone browsers.
- Must keep working when `index.html` is opened directly from disk (`file://`): no ES modules, no `fetch()` of local files, no build step, no external CDNs. Data files set globals on `window` (`PLANTS`, `SOURCES`, `PHOTOS`, `I18N`, `PLANTS_VI`, `SOURCES_VI`) and are loaded with plain `<script>` tags.

## Releases

- The site is published with GitHub Pages from `main` (https://protonneutronelectron69.github.io/Vegetable-Gardening-App/). Pages tells browsers to cache files for 10 minutes.
- Every CSS and JS link in `index.html` carries the same `?v=YYYY-MM-DD` tag (add `.2`, `.3` for a second release on the same day). Change it in every PR that edits CSS, JS or data, so visitors never get a mix of old and new files (which breaks images). The validator checks that all tags match.

## Layout

- `js/app.js`: single IIFE; hash routes `#/calendar`, `#/plants`, `#/plant/<id>`, `#/gallery`, `#/about`. Views render HTML strings into `<main>`; always pass data through `esc()`.
- `js/data/plants.js`: plant entries. Planting windows use half-month steps (`from` is the 1st or 15th, `to` is the 14th or month end). Methods: `S` seeds, `T` transplants, `B` both, `X` sets/cloves/tubers, `P` nursery plant or bare-root.
- `js/data/sources.js`: citations keyed by id; every plant lists at least one.
- `js/data/photos.js` and `images/plants/<id>/`: several photos per plant (Wikimedia Commons, free license). Each photo has a `kind`: `produce` (the harvest), `plant` (whole plant showing size and shape) or `closeup` (leafy plants only). Full images are up to 1000px with 400px versions in `thumbs/`. The first photo in a plant's list is its cover. Keep `images/plants/CREDITS.md` in sync.
- Photo rules (enforced by the validator): at least 3 `produce` and 3 `plant` photos per plant; plants marked `leafy: true` in `plants.js` instead get 1 to 2 `plant` (wide) and 1 to 2 `closeup` photos. Avoid photos showing diseased plants, and check the species matches.
- `css/styles.css`: base styles. Color tokens on `:root` with dark-mode overrides; mobile rules under `@media (max-width: 760px)`. This is also the "Classic" theme.
- Themes: visitors pick one from the header's Theme menu; the choice is saved in `localStorage` (`garden-guide-theme`). Each theme is `css/themes/<id>.css`, with every rule scoped under `[data-skin="<id>"]` on `<html>` and its own light-only token values. All theme files load on every page; only the active one applies. To add a theme: add the CSS file and its `<link>`, and add the id to both `THEMES` in `js/app.js` and the early script in `index.html` (same order; the first is the default). The validator checks these stay in sync.
- Fonts are bundled in `css/fonts/` (Latin and Vietnamese subsets from Google Fonts, SIL Open Font License, license texts alongside) so the app works offline; `fonts.css` declares them.
- Vietnamese letters: several theme fonts lack Vietnamese glyphs, so each theme swaps fonts under `:root[data-skin="<id>"][lang="vi"]`: Baloo 2 (patch), Be Vietnam Pro (sonoran), Bitter (packet body), Playfair Display (harvest headings). Bundled fonts include both the `latin` and `vietnamese` subsets via `unicode-range`.
- Header: `js/app.js` adds `.is-stacked` to `.site-header` when its items would wrap, so the title, Theme and EN/VI stay on the top row and the tabs get their own row. Check new header text at 1280, 1024, 800, 390 and 320px in both languages.
- Keep the shared planting colors meaning the same thing in every theme (`--m-seed`, `--m-transplant`, `--m-sets`, `--m-plant`).

## Languages (English and Vietnamese)

- The whole site is available in English and Vietnamese, switched with the EN/VI toggle in the header (top right). The choice is saved in `localStorage` (`garden-guide-lang`) and set as `<html lang>` by the early script in `index.html`; browsers set to Vietnamese default to it.
- Every piece of visible text needs both languages, or the validator fails:
  - Interface text: `js/i18n.js`, keyed like `"plant.spacing": { en, vi }`, read with `t(key, params)`. Placeholders may differ per language (Vietnamese dates use month numbers). Keys ending in `Html` hold trusted markup. Static text in `index.html` uses `data-i18n`, `data-i18n-html` or `data-i18n-aria`.
  - Plant text: `js/data/plants.vi.js` (same fields as `plants.js`, same number of tips). Source notes: `js/data/sources.vi.js`.
- Vietnamese uses the Southern dialect (Saigon / Nam Bộ). Glossary: trái (fruit, not quả), bông (flower, not hoa), bắp (corn), đậu phộng (peanut), dưa leo (cucumber), đậu que (green bean), bông cải xanh / bông cải trắng (broccoli / cauliflower), xà lách (lettuce), cải thìa (bok choy), cải bó xôi (spinach), bí đỏ (pumpkin / winter squash), húng quế (basil), củ dền (beet), hột gà (egg), coi (look, not xem), vô (go into, as in "bấm vô"; "vào" is still fine for times, like "vào mùa xuân"), lựa (choose, not chọn), chớ (emphatic "not"), xuống giống (to sow / plant out).
- Measurements: US units first, metric in parentheses with a Vietnamese decimal comma (for example `18 inch (45 cm)`, `1,5 m`). Dates in Vietnamese are day/month (`15/2`) and months are `tháng 2` (short `T2`).
- Plant names and search: search ignores accents, so "ca chua" finds "Cà chua".

## Data accuracy rules

- Vegetable planting windows must match UA Extension AZ1005 (Maricopa County planting calendar). Do not invent or "round" dates.
- Fruit windows must cite a UA Extension source in `sources.js`.
- Spacing, yield and tips are general guidance; keep them conservative and Phoenix-relevant.
- Only use photos with a free license (public domain, CC0, CC BY, CC BY-SA) and record artist, license and source URL.

## Checks

- `node scripts/validate-data.js` validates plants, sources and photos (runs in CI on every PR).
- To see the app, open `index.html` in a browser, or serve the folder (`python3 -m http.server`) and open it with Playwright for screenshots at desktop (1280px) and phone (390px) widths.
