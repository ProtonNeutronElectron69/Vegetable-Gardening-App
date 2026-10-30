#!/usr/bin/env node
/*
  Checks the plant, source and photo data for mistakes.
  Run with:  node scripts/validate-data.js
*/
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const context = { window: {} };
vm.createContext(context);
for (const file of ["js/data/sources.js", "js/data/plants.js", "js/data/photos.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
}
const { PLANTS, SOURCES, PHOTOS } = context.window;

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

if (warnings.length) {
  console.warn(`Warning(s):\n  - ${warnings.join("\n  - ")}`);
}
if (errors.length) {
  console.error(`Found ${errors.length} problem(s):\n  - ${errors.join("\n  - ")}`);
  process.exit(1);
}
const photoTotal = Object.values(PHOTOS).reduce((n, list) => n + list.length, 0);
console.log(`OK: ${PLANTS.length} plants, ${Object.keys(SOURCES).length} sources, ${photoTotal} photos.`);
