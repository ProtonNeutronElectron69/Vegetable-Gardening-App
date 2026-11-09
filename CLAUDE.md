# Phoenix Garden Guide

Reference app for vegetable and fruit gardening in the Phoenix, AZ metro area (low desert, Maricopa County).

## Owner context

- The owner is non-technical. Make technical decisions yourself and explain changes in plain language.
- Current scope is a read-only reference (no accounts, no saved user data). Primary target is a desktop browser; it must also work well on phone browsers.
- Must keep working when `index.html` is opened directly from disk (`file://`): no ES modules, no `fetch()` of local files, no build step, no external CDNs. Data files set globals on `window` (`PLANTS`, `SOURCES`, `PHOTOS`, `PEST_PHOTOS`, `TASKS`, `PESTS`, `WATERING`, `I18N` and the `*_VI` Vietnamese ones) and are loaded with plain `<script>` tags.

## Releases

- The site is published with GitHub Pages from `main` (https://protonneutronelectron69.github.io/Vegetable-Gardening-App/). Pages tells browsers to cache files for 10 minutes.
- Every CSS and JS link in `index.html` carries the same `?v=YYYY-MM-DD` tag (add `.2`, `.3` for a second release on the same day). Change it in every PR that edits CSS, JS or data, so visitors never get a mix of old and new files (which breaks images). The validator checks that all tags match.

## Layout

- `js/app.js`: single IIFE; hash routes `#/calendar`, `#/plants`, `#/plant/<id>`, `#/care[/<month 1-12>]`, `#/water`, `#/pests`, `#/pest/<id>`, `#/gallery`, `#/about`. Views render HTML strings into `<main>`; always pass data through `esc()`.
- Garden care (the "Garden care" tab, with links between its three pages):
  - `js/data/tasks.js`: a to-do list per month (index 0 = January), each task with a `group` (`protect`, `water`, `feed`, `pests`, `care`), optional `pests`/`plants` ids to link, and `sources`. What to plant each month is built from `plants.js`, not listed here.
  - `js/data/watering.js`: the numbers for the watering guide (days between waterings by season, depths, citrus by tree age); its words are `water.*` keys in `i18n.js`.
  - `js/data/pests.js`: pests and problems with `type` (`insect`, `animal`, `disease`, `condition`), `months` to watch (1-12), affected `plants` (shown on those plant pages), `signs`, `control` and `sources`.
- Each source in `sources.js` has a `group` (`plants`, `care`, `pests`, `monthly`) that sets where the About page lists it.
- `js/data/plants.js`: plant entries. Planting windows use half-month steps (`from` is the 1st or 15th, `to` is the 14th or month end). Methods: `S` seeds, `T` transplants, `B` both, `X` sets/cloves/tubers, `P` nursery plant or bare-root.
- `js/data/sources.js`: citations keyed by id; every plant lists at least one.
- `js/data/photos.js` and `images/plants/<id>/`: several photos per plant (Wikimedia Commons, free license). Each photo has a `kind`: `produce` (the harvest), `plant` (whole plant showing size and shape) or `closeup` (leafy plants only). Full images are up to 1000px with 400px versions in `thumbs/`. The first photo in a plant's list is its cover. Keep `images/plants/CREDITS.md` in sync.
- Photo rules (enforced by the validator): at least 3 `produce` and 3 `plant` photos per plant; plants marked `leafy: true` in `plants.js` instead get 1 to 2 `plant` (wide) and 1 to 2 `closeup` photos. Avoid photos showing diseased plants, and check the species matches.
- Pest photos: `PEST_PHOTOS` in `photos.js` and `images/pests/<id>/` (same sizes and fields), at least one per pest, `kind` `pest` (what it looks like) or `damage`. They come from iNaturalist (research-grade observations, so the species is confirmed) and Flickr (via Openverse), free licenses only; the credit link names the site from `sourceUrl`. Credits in `images/pests/CREDITS.md`.
- `css/styles.css`: base styles. Color tokens on `:root` with dark-mode overrides; mobile rules under `@media (max-width: 760px)`. This is also the "Classic" theme.
- Themes: visitors pick one from the header's Theme menu; the choice is saved in `localStorage` (`garden-guide-theme`). Each theme is `css/themes/<id>.css`, with every rule scoped under `[data-skin="<id>"]` on `<html>` and its own light-only token values. All theme files load on every page; only the active one applies. To add a theme: add the CSS file and its `<link>`, and add the id to both `THEMES` in `js/app.js` and the early script in `index.html` (same order; the first is the default). The validator checks these stay in sync.
- Fonts are bundled in `css/fonts/` (Latin and Vietnamese subsets from Google Fonts, SIL Open Font License, license texts alongside) so the app works offline; `fonts.css` declares them.
- Vietnamese letters: several theme fonts lack Vietnamese glyphs, so each theme swaps fonts under `:root[data-skin="<id>"][lang="vi"]`: Baloo 2 (patch), Be Vietnam Pro (sonoran), Bitter (packet body), Playfair Display (harvest headings). Bundled fonts include both the `latin` and `vietnamese` subsets via `unicode-range`.
- Header: `js/app.js` adds `.is-stacked` to `.site-header` when its items would wrap, so the title, Theme and EN/VI stay on the top row and the tabs get their own row. Below 400px the tabs show short names (`nav.*Short`). Check new header text at 1280, 1024, 800, 390, 360 and 320px in both languages.
- Keep the shared planting colors meaning the same thing in every theme (`--m-seed`, `--m-transplant`, `--m-sets`, `--m-plant`).

## Languages (English and Vietnamese)

- The whole site is available in English and Vietnamese, switched with the EN/VI toggle in the header (top right). The choice is saved in `localStorage` (`garden-guide-lang`) and set as `<html lang>` by the early script in `index.html`; browsers set to Vietnamese default to it.
- Every piece of visible text needs both languages, or the validator fails:
  - Interface text: `js/i18n.js`, keyed like `"plant.spacing": { en, vi }`, read with `t(key, params)`. Placeholders may differ per language (Vietnamese dates use month numbers). Keys ending in `Html` hold trusted markup. Static text in `index.html` uses `data-i18n`, `data-i18n-html` or `data-i18n-aria`.
  - Plant text: `js/data/plants.vi.js` (same fields as `plants.js`, same number of tips). Source notes: `js/data/sources.vi.js`. Monthly tasks: `js/data/tasks.vi.js` (same order). Pests: `js/data/pests.vi.js` (same number of signs and controls).
- Vietnamese uses the Southern dialect (Saigon / Nam Bộ). Glossary: trái (fruit, not quả), bông (flower, not hoa), bắp (corn), đậu phộng (peanut), dưa leo (cucumber), đậu que (green bean), bông cải xanh / bông cải trắng (broccoli / cauliflower), xà lách (lettuce), cải thìa (bok choy), cải bó xôi (spinach), bí đỏ (pumpkin / winter squash), húng quế (basil), củ dền (beet), hột gà (egg), coi (look, not xem), vô (go into, as in "bấm vô"; "vào" is still fine for times, like "vào mùa xuân"), lựa (choose, not chọn), chớ (emphatic "not"), xuống giống (to sow / plant out).
- Measurements: US units first, metric in parentheses with a Vietnamese decimal comma (for example `18 inch (45 cm)`, `1,5 m`). Dates in Vietnamese are day/month (`15/2`) and months are `tháng 2` (short `T2`).
- Plant names and search: search ignores accents, so "ca chua" finds "Cà chua".

## Data accuracy rules

- Vegetable planting windows must match UA Extension AZ1005 (Maricopa County planting calendar). Do not invent or "round" dates. Herbs that AZ1005 doesn't list (cilantro) use the UA Yuma County low-desert calendar (AZ1615); say so in a comment on the entry.
- `varieties` (optional, both languages) is a one-line note shown quietly under a plant's growing facts. Only add it where a UA low-desert source names varieties (AZ1001 citrus, AZ1269 deciduous fruit, AZ1657 grapes, AZ1667 strawberries) or gives selection advice (AZ2078 tomatoes); that source must be in the plant's `sources`. Don't use high-desert (Yavapai) variety lists.
- `container: true` and `partShade: true` (optional) drive the Plants page filters "Good in containers" and "Tolerates some shade" and show as tags on the plant page. Set them only from AZ1713's container table (its FS/PS and PS crops count as shade-tolerant), AZ1435 ("leafy and root vegetables will tolerate partial shade") or, for herbs in pots, AZ2061; the validator requires one of those in `sources`. Keep the plant's `sun` text consistent. There's no UA list of beginner-friendly plants, so there's no such filter.
- Fruit windows must cite a UA Extension source in `sources.js`.
- Spacing, yield and tips are general guidance; keep them conservative and Phoenix-relevant.
- Only use photos with a free license (public domain, CC0, CC BY, CC BY-SA) and record artist, license and source URL.
- Garden care advice (monthly tasks, watering, pests) must come from a cited source: UA Extension publications, the Extension's monthly reminders (written for Tucson, so adjust timing for Phoenix, e.g. frost dates from AZ1222), or for watering frequencies the Phoenix-area "Landscape Watering by the Numbers" chart and AZ1151 for citrus. Don't add pesticide products or rates beyond what a source says.

## Checks

- `node scripts/validate-data.js` validates plants, sources and photos (runs in CI on every PR).
- To see the app, open `index.html` in a browser, or serve the folder (`python3 -m http.server`) and open it with Playwright for screenshots at desktop (1280px) and phone (390px) widths.
