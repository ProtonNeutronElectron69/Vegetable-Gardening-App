#!/usr/bin/env node
/*
  Checks the plant, source, photo and translation data for mistakes.
  Run with:  node scripts/validate-data.js
*/
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const context = { window: {} };
vm.createContext(context);
const DATA_FILES = ["js/i18n.js", "js/data/sources.js", "js/data/sources.vi.js", "js/data/plants.js",
  "js/data/plants.vi.js", "js/data/photos.js"];
for (const file of DATA_FILES) {
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
}
const { PLANTS, SOURCES, PHOTOS, I18N, PLANTS_VI, SOURCES_VI } = context.window;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const METHODS = ["S", "T", "B", "X", "P"];
const CATEGORIES = ["vegetable", "fruit", "herb"];
const SEASONS = ["warm", "cool", "perennial"];
const TEXT_FIELDS = ["name", "summary", "timeToHarvest", "spacing", "water", "sun", "growth", "yield"];

const errors = [];
const warnings = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

// Returns the half-month index (0-23) for a window start or end date, or null if invalid.
function parse(text, isEnd) {
  const m = /^([A-Z][a-z]{2}) (\d{1,2})$/.exec(text || "");
  if (!m) return null;
  const month = MONTHS.indexOf(m[1]);
  const day = Number(m[2]);
  if (month < 0) return null;
  if (!isEnd && day === 1) return month * 2;
  if (!isEnd && day === 15) return month * 2 + 1;
  if (isEnd && day === 14) return month * 2;
  if (isEnd && day === MONTH_DAYS[month]) return month * 2 + 1;
  return null;
}

if (!Array.isArray(PLANTS) || PLANTS.length === 0) fail("plants.js", "window.PLANTS is missing or empty");

const ids = new Set();
for (const p of PLANTS || []) {
  const where = `plant "${p.id}"`;
  if (!/^[a-z0-9-]+$/.test(p.id || "")) fail(where, "id must be lowercase letters, numbers and dashes");
  if (ids.has(p.id)) fail(where, "duplicate id");
  ids.add(p.id);

  for (const f of TEXT_FIELDS) {
    if (typeof p[f] !== "string" || !p[f].trim()) fail(where, `missing "${f}"`);
  }
  if (!CATEGORIES.includes(p.category)) fail(where, `category must be one of ${CATEGORIES.join(", ")}`);
  if (!SEASONS.includes(p.season)) fail(where, `season must be one of ${SEASONS.join(", ")}`);
  if (!Array.isArray(p.tips) || p.tips.length === 0) fail(where, "needs at least one tip");

  if (!Array.isArray(p.sources) || p.sources.length === 0) fail(where, "needs at least one source");
  for (const s of p.sources || []) {
    if (!SOURCES[s]) fail(where, `unknown source "${s}" (add it to js/data/sources.js)`);
  }

  if (!Array.isArray(p.windows) || p.windows.length === 0) fail(where, "needs at least one planting window");
  const used = new Array(24).fill(false);
  for (const w of p.windows || []) {
    const a = parse(w.from, false);
    const b = parse(w.to, true);
    if (a === null) fail(where, `window start "${w.from}" must be the 1st or 15th, like "Feb 15"`);
    if (b === null) fail(where, `window end "${w.to}" must be the 14th or last day of a month, like "Mar 31"`);
    if (!METHODS.includes(w.method)) fail(where, `window method "${w.method}" must be one of ${METHODS.join(", ")}`);
    if (a === null || b === null) continue;
    for (let i = a; ; i = (i + 1) % 24) {
      if (used[i]) fail(where, `windows overlap around ${w.from}`);
      used[i] = true;
      if (i === b) break;
    }
  }

  if (p.leafy !== undefined && p.leafy !== true) fail(where, 'leafy must be true or left out');

  const photos = PHOTOS[p.id];
  if (!Array.isArray(photos) || photos.length === 0) {
    // The app shows a placeholder, so a missing photo is allowed but worth knowing about.
    warn(where, "no photos in js/data/photos.js (a placeholder is shown)");
    continue;
  }
  const counts = { produce: 0, plant: 0, closeup: 0 };
  photos.forEach((ph, i) => {
    const at = `${where} photo ${i + 1}`;
    if (!(ph.kind in counts)) fail(at, `kind must be one of ${Object.keys(counts).join(", ")}`);
    else counts[ph.kind]++;
    for (const f of ["src", "thumb", "alt", "artist", "license", "sourceUrl"]) {
      if (!ph[f]) fail(at, `missing "${f}"`);
    }
    for (const f of ["src", "thumb"]) {
      if (ph[f] && !fs.existsSync(path.join(root, ph[f]))) fail(at, `file not found: ${ph[f]}`);
    }
  });
  // Gallery rules: 3+ harvest and 3+ whole-plant photos, or for leafy plants
  // 1-2 wide shots ("plant") and 1-2 close-ups.
  if (p.leafy) {
    if (counts.produce) fail(where, 'leafy plants use "plant" and "closeup" photos, not "produce"');
    if (counts.plant < 1 || counts.plant > 2) fail(where, `needs 1 to 2 wide "plant" photos (has ${counts.plant})`);
    if (counts.closeup < 1 || counts.closeup > 2) fail(where, `needs 1 to 2 "closeup" photos (has ${counts.closeup})`);
  } else {
    if (counts.closeup) fail(where, '"closeup" photos are only for leafy plants');
    if (counts.produce < 3) fail(where, `needs at least 3 "produce" photos (has ${counts.produce})`);
    if (counts.plant < 3) fail(where, `needs at least 3 whole "plant" photos (has ${counts.plant})`);
  }
}

for (const id of Object.keys(PHOTOS || {})) {
  if (!ids.has(id)) fail(`photo "${id}"`, "does not match any plant id");
}

for (const [key, s] of Object.entries(SOURCES || {})) {
  if (!s.title || !/^https:\/\//.test(s.url || "")) fail(`source "${key}"`, "needs a title and an https url");
}

// Every local CSS and JS link in index.html needs the same ?v= tag, so browsers
// fetch a matching set after an update instead of mixing old and new files.
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const assetLinks = [...indexHtml.matchAll(/(?:href|src)="((?:css|js)\/[^"]+)"/g)].map((m) => m[1]);
const versions = new Set(assetLinks.map((link) => (/\?v=([^"&]+)$/.exec(link) || [])[1]));
if (assetLinks.length === 0) fail("index.html", "no CSS or JS links found");
if (versions.has(undefined)) fail("index.html", "every CSS and JS link needs a ?v= tag");
if (versions.size > 1) fail("index.html", `CSS and JS links use different ?v= tags: ${[...versions].join(", ")}`);

// Themes: the early script in index.html and THEMES in js/app.js must list the same ids,
// and every theme except "classic" (the base styles) needs its stylesheet linked.
const appJs = fs.readFileSync(path.join(root, "js/app.js"), "utf8");
const appThemes = [...appJs.matchAll(/\{ id: "([a-z-]+)", colors:/g)].map((m) => m[1]);
const htmlThemesMatch = /var themes = \[([^\]]+)\]/.exec(indexHtml);
const htmlThemes = htmlThemesMatch ? [...htmlThemesMatch[1].matchAll(/"([a-z-]+)"/g)].map((m) => m[1]) : [];
if (appThemes.length === 0) fail("js/app.js", "no THEMES found");
if (appThemes.join() !== htmlThemes.join()) {
  fail("index.html", `theme list (${htmlThemes.join(", ")}) must match THEMES in js/app.js (${appThemes.join(", ")}) in the same order`);
}
for (const id of appThemes) {
  if (id === "classic") continue;
  if (!fs.existsSync(path.join(root, `css/themes/${id}.css`))) fail(`theme "${id}"`, `missing css/themes/${id}.css`);
  if (!assetLinks.some((link) => link.startsWith(`css/themes/${id}.css`))) fail(`theme "${id}"`, "stylesheet is not linked in index.html");
}

// ---------------------------------------------------------------- translations
const LANGS = ["en", "vi"];

// Interface text: every key has English and Vietnamese of the same shape.
// A blank value is allowed only where English has nothing to add ("source.english").
for (const [key, entry] of Object.entries(I18N || {})) {
  for (const l of LANGS) {
    if (!(l in entry)) fail(`i18n "${key}"`, `missing ${l}`);
  }
  const en = entry.en, vi = entry.vi;
  if (Array.isArray(en) !== Array.isArray(vi)) fail(`i18n "${key}"`, "en and vi must both be text or both be lists");
  else if (Array.isArray(en)) {
    if (en.length !== vi.length) fail(`i18n "${key}"`, `en has ${en.length} items but vi has ${vi.length}`);
    if (vi.some((s) => typeof s !== "string" || !s.trim())) fail(`i18n "${key}"`, "vi has an empty item");
  } else if (typeof vi !== "string" || (!vi.trim() && en.trim())) {
    fail(`i18n "${key}"`, "vi is empty");
  }
}
// Every key the app or the page asks for must exist.
const usedKeys = new Set([
  ...[...appJs.matchAll(/\bt\("([a-zA-Z0-9.]*[a-zA-Z0-9])"/g)].map((m) => m[1]),
  ...[...indexHtml.matchAll(/data-i18n(?:-html|-aria)?="([a-zA-Z0-9.]+)"/g)].map((m) => m[1])
]);
for (const p of ["kind.", "method.", "season.", "group.", "category.", "theme."]) {
  // Built from a prefix plus an id in app.js; check the ids that can occur.
  const ids = { "kind.": ["produce", "plant", "closeup"], "method.": METHODS, "season.": SEASONS, "group.": SEASONS,
    "category.": CATEGORIES, "theme.": appThemes }[p];
  ids.forEach((id) => usedKeys.add(p + id));
}
for (const key of usedKeys) {
  if (!I18N[key]) fail("js/i18n.js", `missing key "${key}" used by the app`);
}

// Vietnamese plant text: every plant, every field, same number of tips as English.
for (const p of PLANTS || []) {
  const vi = PLANTS_VI[p.id];
  const where = `plants.vi.js "${p.id}"`;
  if (!vi) { fail(where, "missing (every plant needs Vietnamese text)"); continue; }
  for (const f of TEXT_FIELDS) {
    if (typeof vi[f] !== "string" || !vi[f].trim()) fail(where, `missing "${f}"`);
  }
  if (!Array.isArray(vi.tips) || vi.tips.length !== p.tips.length) {
    fail(where, `needs ${p.tips.length} tips to match English (has ${Array.isArray(vi.tips) ? vi.tips.length : 0})`);
  }
}
for (const id of Object.keys(PLANTS_VI || {})) {
  if (!PLANTS.some((p) => p.id === id)) fail(`plants.vi.js "${id}"`, "does not match any plant id");
}
for (const key of Object.keys(SOURCES || {})) {
  if (typeof SOURCES_VI[key] !== "string" || !SOURCES_VI[key].trim()) fail(`sources.vi.js "${key}"`, "missing Vietnamese note");
}

if (warnings.length) {
  console.warn(`Warning(s):\n  - ${warnings.join("\n  - ")}`);
}
if (errors.length) {
  console.error(`Found ${errors.length} problem(s):\n  - ${errors.join("\n  - ")}`);
  process.exit(1);
}
const photoTotal = Object.values(PHOTOS).reduce((n, list) => n + list.length, 0);
console.log(`OK: ${PLANTS.length} plants, ${Object.keys(SOURCES).length} sources, ${photoTotal} photos.`);
