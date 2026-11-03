/*
  Phoenix Garden Guide: a small single-page app with no build step.
  Views are chosen by the URL hash: #/calendar, #/plants, #/plant/<id>, #/care[/<month>],
  #/water, #/pests, #/pest/<id>, #/gallery, #/about.
  All visible text comes from js/i18n.js (interface) and the *.vi.js files in js/data/
  (Vietnamese plant, source, task and pest text); English text is in the data files.
*/
(function () {
  "use strict";

  var PLANTS = window.PLANTS || [];
  var PHOTOS = window.PHOTOS || {};
  var SOURCES = window.SOURCES || {};
  var I18N = window.I18N || {};
  var PLANTS_VI = window.PLANTS_VI || {};
  var SOURCES_VI = window.SOURCES_VI || {};
  var TASKS = window.TASKS || [];
  var TASKS_VI = window.TASKS_VI || [];
  var PESTS = window.PESTS || [];
  var PESTS_VI = window.PESTS_VI || {};
  var PEST_PHOTOS = window.PEST_PHOTOS || {};
  var WATERING = window.WATERING || { seasons: [], seasonOfMonth: [], rows: [], citrusPeriods: [], citrus: [], sources: [] };

  // Month abbreviations as written in plants.js ("Feb 15"); display names come from i18n.js.
  var DATA_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // Day counts used for labels; February uses 28 to match the Extension charts.
  var MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var METHOD_CODES = ["S", "T", "B", "X", "P"];
  var SEASON_ORDER = ["warm", "cool", "perennial"];

  // Visual themes (css/themes/<id>.css); names are in i18n.js as "theme.<id>". The first is
  // the default; the inline script in index.html has the same id list so the saved theme
  // applies before first paint.
  var THEMES = [
    { id: "patch", colors: ["#8fd8ff", "#6fd16a", "#ffd84a", "#ff6b4a"] },
    { id: "sonoran", colors: ["#2c2350", "#7a3b6e", "#e2714f", "#f6b65a"] },
    { id: "plot", colors: ["#2e9e5b", "#f6c343", "#e5533d", "#3a86c8"] },
    { id: "harvest", colors: ["#3f6b2a", "#3b2a1e", "#b5452a", "#f2c48a"] },
    { id: "packet", colors: ["#b23a2e", "#d99a2b", "#2f6f6a", "#8a4f7d"] },
    { id: "classic", colors: ["#4d7c32", "#c0622f", "#faf6ee", "#e5efd9"] }
  ];
  var THEME_KEY = "garden-guide-theme";

  // Languages. The inline script in index.html sets <html lang> before first paint
  // (saved choice, else the browser's language).
  var LANGS = ["en", "vi"];
  var LANG_KEY = "garden-guide-lang";
  var lang = document.documentElement.getAttribute("lang") === "vi" ? "vi" : "en";

  // ------------------------------------------------------------ text

  // Interface text for the current language, with {placeholders} filled from params.
  function t(key, params) {
    var entry = I18N[key];
    if (!entry) return key;
    var s = entry[lang] !== undefined ? entry[lang] : entry.en;
    if (typeof s !== "string") return s;
    return s.replace(/\{(\w+)\}/g, function (m, name) {
      return params && params[name] !== undefined ? params[name] : m;
    });
  }

  // A plant field in the current language (English text lives on the plant itself).
  function pt(p, field) {
    var vi = lang === "vi" && PLANTS_VI[p.id];
    return vi && vi[field] != null ? vi[field] : p[field];
  }
  function pname(p) { return pt(p, "name"); }

  // The same for pests (English text lives on the pest in pests.js).
  function xt(x, field) {
    var vi = lang === "vi" && PESTS_VI[x.id];
    return vi && vi[field] != null ? vi[field] : x[field];
  }
  function xname(x) { return xt(x, "name"); }

  function lowerFirst(s) { return s.charAt(0).toLocaleLowerCase(lang) + s.slice(1); }

  // Lowercase without accents, so "ca chua" finds "cà chua".
  function fold(s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d");
  }

  function methodLabel(code) { return t("method." + code); }
  function kindLabel(kind) { return t("kind." + kind)[0]; }
  function kindLower(kind) { return t("kind." + kind)[1]; }

  // ------------------------------------------------------------ dates

  // "Feb 15" -> half-month index 0..23 (0 = Jan 1-14, 1 = Jan 15-31, ...).
  function halfIndex(text) {
    var parts = text.trim().split(/\s+/);
    var month = DATA_MONTHS.indexOf(parts[0]);
    var day = parseInt(parts[1], 10);
    if (month < 0 || isNaN(day)) throw new Error("Bad date in plant data: " + text);
    return month * 2 + (day >= 15 ? 1 : 0);
  }

  // Values every date template may need, in the current language.
  function monthParams(m, day) {
    return { month: t("months.long")[m], mon: t("months.short")[m], n: m + 1, d: day, end: MONTH_DAYS[m] };
  }

  function halfRange(i) {
    return t(i % 2 === 0 ? "range.early" : "range.late", monthParams(Math.floor(i / 2)));
  }

  function halfName(i) {
    return t(i % 2 === 0 ? "half.early" : "half.late", monthParams(Math.floor(i / 2)));
  }

  // Both forms of a period name; a template picks the one its grammar needs.
  function halfParams(i) {
    var name = halfName(i);
    return { half: name, halfLower: lowerFirst(name) };
  }

  function todayHalf() {
    var d = new Date();
    return d.getMonth() * 2 + (d.getDate() >= 15 ? 1 : 0);
  }

  // Precompute each plant's 24 half-month cells.
  PLANTS.forEach(function (p) {
    p.cells = new Array(24).fill(null);
    p.windows.forEach(function (w) {
      var a = halfIndex(w.from);
      var b = halfIndex(w.to);
      for (var i = a; ; i = (i + 1) % 24) {
        p.cells[i] = w.method;
        if (i === b) break;
      }
    });
  });

  var PLANT_BY_ID = {};
  PLANTS.forEach(function (p) { PLANT_BY_ID[p.id] = p; });
  var PEST_BY_ID = {};
  PESTS.forEach(function (x) { PEST_BY_ID[x.id] = x; });

  function byName(a, b) { return pname(a).localeCompare(pname(b), lang); }

  // ------------------------------------------------------------ state

  var state = {
    half: todayHalf(),
    category: "all",
    season: "all",
    query: "",
    plantableOnly: false,
    galleryCategory: "all",
    galleryKind: "all",
    careMonth: new Date().getMonth(),
    pestType: "all",
    pestPlant: ""
  };

  function matchesFilters(p) {
    if (state.category !== "all" && p.category !== state.category) return false;
    if (state.season !== "all" && p.season !== state.season) return false;
    if (state.plantableOnly && !p.cells[state.half]) return false;
    if (state.query) {
      // Search both languages, so an English name still works in Vietnamese and vice versa.
      var q = fold(state.query);
      var vi = PLANTS_VI[p.id] || {};
      var hay = [p.name, p.summary, vi.name || "", vi.summary || ""].map(fold).join(" ");
      if (hay.indexOf(q) < 0) return false;
    }
    return true;
  }

  // ------------------------------------------------------------ helpers

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  var main = document.getElementById("main");

  function setView(html, title) {
    main.innerHTML = html;
    document.title = title ? title + " · " + t("site.name") : t("site.name");
  }

  function methodBadge(code) {
    return '<span class="badge m-' + code + '">' + esc(methodLabel(code)) + "</span>";
  }

  function photosOf(p) { return PHOTOS[p.id] || []; }
  function pestPhotosOf(x) { return PEST_PHOTOS[x.id] || []; }

  // A photo as the grids and the viewer show it: whose it is, its label, alt text and link.
  function plantPhoto(p, ph) {
    return { photo: ph, name: pname(p), label: kindLabel(ph.kind), lower: kindLower(ph.kind),
      alt: lang === "en" ? ph.alt : pname(p) + ": " + kindLower(ph.kind),
      href: "#/plant/" + p.id, link: t("viewer.guide") };
  }
  function pestPhoto(x, ph) {
    var kind = t("pestKind." + ph.kind);
    return { photo: ph, name: xname(x), label: kind[0], lower: kind[1],
      alt: lang === "en" ? ph.alt : xname(x) + ": " + kind[1],
      href: "#/pest/" + x.id, link: t("viewer.pestGuide") };
  }

  function imgTag(item, cls, useThumb) {
    return '<img class="' + cls + '" src="' + esc(useThumb ? item.photo.thumb : item.photo.src) + '" alt="' + esc(item.alt) +
      '" loading="lazy" decoding="async">';
  }

  // The first photo is the cover, used on cards and at the top of a plant or pest page.
  function coverImg(item, name, cls, useThumb) {
    if (!item) {
      return '<div class="' + cls + ' photo-missing" aria-hidden="true"><span>' + esc(name.charAt(0)) + "</span></div>";
    }
    return imgTag(item, cls, useThumb);
  }
  function photoImg(p, cls, useThumb) {
    var ph = photosOf(p)[0];
    return coverImg(ph && plantPhoto(p, ph), pname(p), cls, useThumb);
  }
  function pestImg(x, cls, useThumb) {
    var ph = pestPhotosOf(x)[0];
    return coverImg(ph && pestPhoto(x, ph), xname(x), cls, useThumb);
  }

  // A clickable grid of photos; indexes point into lightboxItems.
  function photoGrid(items, offset) {
    return '<ul class="gallery">' + items.map(function (it, i) {
      return '<li><button type="button" class="gallery-item" data-photo="' + (offset + i) + '" aria-label="' +
        esc(t("photo.viewLarger", { plant: it.name, kind: it.lower })) + '">' +
        imgTag(it, "gallery-img", true) +
        '<span class="gallery-label">' + esc(it.label) + "</span></button></li>";
    }).join("") + "</ul>";
  }

  function photoCredit(ph) {
    if (!ph) return "";
    var lic = ph.licenseUrl
      ? '<a href="' + esc(ph.licenseUrl) + '" target="_blank" rel="noopener">' + esc(ph.license) + "</a>"
      : esc(ph.license);
    return esc(t("photo.credit", { artist: ph.artist || t("photo.unknown") })) + " · " + lic +
      ' · <a href="' + esc(ph.sourceUrl) + '" target="_blank" rel="noopener">Wikimedia Commons</a>';
  }

  function sourceLink(k) {
    var s = SOURCES[k];
    return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.title) + "</a>" + esc(t("source.english"));
  }

  function segmented(name, options, current, label) {
    return '<div class="segmented" role="group" aria-label="' + esc(label) + '">' +
      options.map(function (o) {
        return '<button type="button" data-filter="' + name + '" data-value="' + o[0] + '" aria-pressed="' +
          (o[0] === current) + '">' + esc(o[1]) + "</button>";
      }).join("") + "</div>";
  }

  function categoryOptions() {
    return [["all", t("filter.all")], ["vegetable", t("filter.vegetables")], ["fruit", t("filter.fruit")], ["herb", t("filter.herbs")]];
  }

  function filterToolbar(opts) {
    return '<div class="toolbar">' +
      '<label class="search"><span class="visually-hidden">' + esc(t("filter.searchLabel")) + "</span>" +
      '<input type="search" data-filter="query" placeholder="' + esc(t("filter.search")) + '" value="' + esc(state.query) + '"></label>' +
      segmented("category", categoryOptions(), state.category, t("filter.typeLabel")) +
      segmented("season", [["all", t("filter.anySeason")], ["warm", t("filter.warm")], ["cool", t("filter.cool")],
        ["perennial", t("filter.perennial")]], state.season, t("filter.seasonLabel")) +
      '<label class="check"><input type="checkbox" data-filter="plantableOnly"' + (state.plantableOnly ? " checked" : "") +
      "> " + esc(opts.plantableLabel) + "</label>" +
      "</div>";
  }

  function legend() {
    return '<ul class="legend" aria-label="' + esc(t("legend.label")) + '">' +
      METHOD_CODES.map(function (k) {
        return '<li><span class="swatch m-' + k + '"></span>' + esc(methodLabel(k)) + "</li>";
      }).join("") + "</ul>";
  }

  // ------------------------------------------------------------ calendar

  function renderCalendar() {
    var h = state.half;
    var isToday = h === todayHalf();
    var plantable = PLANTS.filter(function (p) { return p.cells[h]; }).sort(byName);

    var nowList = plantable.length
      ? '<ul class="now-list">' + plantable.map(function (p) {
          return '<li><a href="#/plant/' + p.id + '"><span class="now-name">' + esc(pname(p)) + "</span>" +
            methodBadge(p.cells[h]) + "</a></li>";
        }).join("") + "</ul>"
      : '<p class="empty">' + esc(t("cal.empty")) + "</p>";

    var count = plantable.length === 1 ? t("cal.countOne") : t("cal.countMany", { n: plantable.length });

    var html =
      '<section class="page">' +
      '<div class="page-head"><h1>' + esc(t("cal.title")) + "</h1><p>" + esc(t("cal.intro")) + "</p></div>" +

      '<section class="now-panel" aria-labelledby="now-title">' +
      '<div class="now-head">' +
      '<button type="button" class="icon-btn" data-step="-1" aria-label="' + esc(t("cal.prev")) + '">&#8249;</button>' +
      '<div class="now-title"><span class="eyebrow">' + esc(isToday ? t("cal.plantNow") : t("cal.whatToPlant")) + "</span>" +
      '<h2 id="now-title">' + esc(halfName(h)) + "</h2>" +
      '<span class="now-range">' + esc(halfRange(h) + (isToday ? t("cal.isToday") : "")) + "</span></div>" +
      '<button type="button" class="icon-btn" data-step="1" aria-label="' + esc(t("cal.next")) + '">&#8250;</button>' +
      "</div>" +
      (isToday ? "" : '<button type="button" class="link-btn" data-today>' + esc(t("cal.backToday")) + "</button>") +
      '<p class="now-count">' + esc(count) + "</p>" +
      nowList +
      '<p class="panel-link"><a href="#/care">' + esc(t("cal.careLink")) + "</a></p>" +
      "</section>" +

      filterToolbar({ plantableLabel: t("cal.onlyFor", halfParams(h)) }) +
      legend() +
      '<p class="hint">' + esc(t("cal.hint")) + "</p>" +
      '<div class="cal-scroll" tabindex="0" aria-label="' + esc(t("cal.scrollLabel")) + '">' + calendarTable() + "</div>" +
      "</section>";

    setView(html, t("cal.title"));
  }

  function calendarTable() {
    var h = state.half;
    var today = todayHalf();
    var plants = PLANTS.filter(matchesFilters);
    var months = t("months.short");

    var head1 = '<tr><th class="cal-plant-col" rowspan="2" scope="col">' + esc(t("cal.plantColumn")) + "</th>" +
      months.map(function (m, i) {
        var sel = Math.floor(h / 2) === i ? " is-selected-month" : "";
        return '<th colspan="2" scope="colgroup" class="cal-month' + sel + '">' + esc(m) + "</th>";
      }).join("") + "</tr>";
    var head2 = "<tr>" + months.map(function (m, mi) {
      return [0, 1].map(function (k) {
        var i = mi * 2 + k;
        var cls = "cal-half" + (i === h ? " is-selected" : "") + (i === today ? " is-today" : "");
        return '<th scope="col" class="' + cls + '"><button type="button" data-half="' + i + '" aria-label="' +
          esc(halfName(i) + " (" + halfRange(i) + ")") + '" aria-pressed="' + (i === h) + '">' +
          (k === 0 ? "1" : "15") + "</button></th>";
      }).join("");
    }).join("") + "</tr>";

    var body = "";
    SEASON_ORDER.forEach(function (season) {
      var group = plants.filter(function (p) { return p.season === season; }).sort(byName);
      if (!group.length) return;
      body += '<tr class="cal-group cal-group-' + season + '"><th colspan="25" scope="rowgroup"><span>' +
        esc(t("group." + season)) + "</span></th></tr>";
      group.forEach(function (p) {
        body += '<tr><th scope="row" class="cal-plant-col"><a href="#/plant/' + p.id + '">' + esc(pname(p)) + "</a></th>" +
          p.cells.map(function (c, i) {
            var cls = (c ? "m-" + c : "") + (i === h ? " is-selected" : "") + (i % 2 === 1 ? " half-b" : "");
            var tip = pname(p) + ", " + halfName(i) + ": " + (c ? methodLabel(c) : t("cal.notOnChart"));
            return '<td class="' + cls.trim() + '" data-half="' + i + '" title="' + esc(tip) + '">' +
              (c ? '<span class="visually-hidden">' + esc(methodLabel(c)) + "</span>" : "") + "</td>";
          }).join("") + "</tr>";
      });
    });
    if (!body) {
      body = '<tr><td colspan="25" class="empty">' + esc(t("filter.noPlants")) + "</td></tr>";
    }

    return '<table class="cal"><caption class="visually-hidden">' + esc(t("cal.caption")) + "</caption>" +
      "<thead>" + head1 + head2 + "</thead><tbody>" + body + "</tbody></table>";
  }

  // ------------------------------------------------------------ plant list

  function renderPlants() {
    var html = '<section class="page">' +
      '<div class="page-head"><h1>' + esc(t("plants.title")) + "</h1><p>" +
      esc(t("plants.intro", { n: PLANTS.length })) + "</p></div>" +
      filterToolbar({ plantableLabel: t("plants.canPlantNow", halfParams(todayHalf())) }) +
      '<div class="card-grid" id="plant-grid">' + plantCards() + "</div></section>";
    setView(html, t("plants.title"));
  }

  function plantCards() {
    // On the Plants page "plantable" always means today, not the calendar's selected period.
    var saved = state.half;
    state.half = todayHalf();
    var list = PLANTS.filter(matchesFilters).sort(byName);
    state.half = saved;
    if (!list.length) return '<p class="empty">' + esc(t("filter.noPlants")) + "</p>";
    var now = todayHalf();
    return list.map(function (p) {
      return '<a class="card" href="#/plant/' + p.id + '">' +
        '<div class="card-media">' + photoImg(p, "card-img", true) + "</div>" +
        '<div class="card-body"><h2 class="card-title">' + esc(pname(p)) + "</h2>" +
        '<div class="tags"><span class="tag season-' + p.season + '">' + esc(t("season." + p.season)) + "</span>" +
        '<span class="tag">' + esc(t("category." + p.category)) + "</span>" +
        (p.cells[now] ? '<span class="tag tag-now">' + esc(t("plants.tagNow")) + "</span>" : "") + "</div>" +
        '<p class="card-text">' + esc(pt(p, "summary")) + "</p></div></a>";
    }).join("");
  }

  // ------------------------------------------------------------ plant detail

  function dayLabel(text) {
    var parts = text.trim().split(/\s+/);
    return t("date.day", monthParams(DATA_MONTHS.indexOf(parts[0]), parseInt(parts[1], 10)));
  }

  function windowText(w) {
    var a = halfIndex(w.from), b = halfIndex(w.to);
    // A window covering exactly one whole month reads better as "All of March".
    if (a % 2 === 0 && b === a + 1) return t("date.wholeMonth", monthParams(a / 2));
    return dayLabel(w.from) + " – " + dayLabel(w.to);
  }

  function renderPlant(id) {
    var p = PLANT_BY_ID[id];
    if (!p) return renderNotFound();
    var ph = photosOf(p)[0];
    lightboxItems = photosOf(p).map(function (photo) { return plantPhoto(p, photo); });
    var sorted = PLANTS.slice().sort(byName);
    var idx = sorted.indexOf(p);
    var prev = sorted[(idx - 1 + sorted.length) % sorted.length];
    var next = sorted[(idx + 1) % sorted.length];
    var now = todayHalf();
    var months = t("months.short");
    var tiny = t("months.tiny");

    var strip = '<div class="strip" role="img" aria-label="' + esc(t("plant.months", { name: pname(p) })) + '">' +
      months.map(function (m, mi) {
        return '<div class="strip-month' + (Math.floor(now / 2) === mi ? " is-now" : "") + '">' +
          '<div class="strip-cells">' + [0, 1].map(function (k) {
            var c = p.cells[mi * 2 + k];
            return '<span class="strip-cell' + (c ? " m-" + c : "") + (mi * 2 + k === now ? " is-today" : "") + '"></span>';
          }).join("") + "</div>" +
          '<span class="strip-label"><span class="strip-label-full">' + esc(m) + '</span><span class="strip-label-tiny">' +
          esc(tiny[mi]) + "</span></span></div>";
      }).join("") + "</div>";

    var windows = '<ul class="window-list">' + p.windows.map(function (w) {
      return "<li>" + methodBadge(w.method) + "<span>" + esc(windowText(w)) + "</span></li>";
    }).join("") + "</ul>";

    var nowNote = p.cells[now]
      ? '<p class="now-note yes">' + esc(t("plant.nowYes", { method: lowerFirst(methodLabel(p.cells[now])) })) + "</p>"
      : '<p class="now-note">' + esc(t("plant.nowNo", halfParams(now))) + "</p>";

    function fact(key, field) {
      return '<div class="fact"><dt>' + esc(t(key)) + "</dt><dd>" + esc(pt(p, field)) + "</dd></div>";
    }

    var sources = p.sources.map(function (k) {
      return SOURCES[k] ? "<li>" + sourceLink(k) + "</li>" : "";
    }).join("");

    var pests = PESTS.filter(function (x) { return x.plants.indexOf(p.id) >= 0; });

    var html = '<article class="page plant">' +
      '<nav class="crumbs" aria-label="' + esc(t("plant.breadcrumb")) + '"><a href="#/plants">' + esc(t("plant.back")) + "</a></nav>" +
      '<div class="plant-hero">' +
      '<figure class="plant-photo">' + photoImg(p, "plant-img", false) +
      (ph ? '<figcaption class="credit">' + photoCredit(ph) + "</figcaption>" : "") + "</figure>" +
      '<div class="plant-intro">' +
      '<div class="tags"><span class="tag season-' + p.season + '">' + esc(t("season." + p.season)) + "</span>" +
      '<span class="tag">' + esc(t("category." + p.category)) + "</span></div>" +
      "<h1>" + esc(pname(p)) + "</h1>" +
      '<p class="lead">' + esc(pt(p, "summary")) + "</p>" +
      '<section class="when" aria-labelledby="when-title"><h2 id="when-title">' + esc(t("plant.when")) + "</h2>" +
      strip + windows + nowNote + "</section>" +
      "</div></div>" +

      '<section aria-labelledby="facts-title"><h2 id="facts-title">' + esc(t("plant.facts")) + '</h2><dl class="facts">' +
      fact("fact.timeToHarvest", "timeToHarvest") +
      fact("fact.spacing", "spacing") +
      fact("fact.water", "water") +
      fact("fact.sun", "sun") +
      fact("fact.growth", "growth") +
      fact("fact.yield", "yield") +
      '</dl><p class="more-link"><a href="#/water">' + esc(t("plant.waterLink")) + "</a></p></section>" +

      '<section aria-labelledby="tips-title"><h2 id="tips-title">' + esc(t("plant.tips")) + '</h2><ul class="tips">' +
      pt(p, "tips").map(function (tip) { return "<li>" + esc(tip) + "</li>"; }).join("") + "</ul></section>" +

      (pests.length
        ? '<section class="plant-pests" aria-labelledby="pests-title"><h2 id="pests-title">' + esc(t("plant.watchFor")) + "</h2>" +
          pestLinks(pests) + "</section>"
        : "") +

      (lightboxItems.length
        ? '<section class="plant-gallery" aria-labelledby="photos-title"><h2 id="photos-title">' + esc(t("plant.photos")) + "</h2>" +
          photoGrid(lightboxItems, 0) + "</section>"
        : "") +

      '<section class="plant-sources" aria-labelledby="src-title"><h2 id="src-title">' + esc(t("plant.sources")) + "</h2><ul>" +
      sources + "</ul>" + '<p class="fine">' + esc(t("plant.sourcesNote")) + "</p></section>" +

      '<nav class="pager" aria-label="' + esc(t("plant.more")) + '">' +
      '<a href="#/plant/' + prev.id + '">← ' + esc(pname(prev)) + "</a>" +
      '<a href="#/plant/' + next.id + '">' + esc(pname(next)) + " →</a></nav>" +
      "</article>";

    setView(html, pname(p));
  }

  // ------------------------------------------------------------ garden care

  var CARE_TABS = [["care", "care.tabMonth"], ["water", "care.tabWater"], ["pests", "care.tabPests"]];
  var TASK_GROUPS = ["protect", "water", "feed", "pests", "care"];
  var PEST_TYPES = ["insect", "animal", "disease", "condition"];

  // Heading shared by the three garden care pages, with links between them.
  function careHead(active, title, intro) {
    return '<div class="page-head"><span class="eyebrow">' + esc(t("care.eyebrow")) + "</span><h1>" + esc(title) + "</h1>" +
      "<p>" + esc(intro) + "</p></div>" +
      '<nav class="segmented care-nav" aria-label="' + esc(t("care.sections")) + '">' +
      CARE_TABS.map(function (tab) {
        return '<a href="#/' + tab[0] + '"' + (tab[0] === active ? ' aria-current="page"' : "") + ">" + esc(t(tab[1])) + "</a>";
      }).join("") + "</nav>";
  }

  function sourceList(keys, note) {
    var seen = {};
    var items = keys.filter(function (k) {
      if (seen[k] || !SOURCES[k]) return false;
      seen[k] = true;
      return true;
    }).map(function (k) { return "<li>" + sourceLink(k) + "</li>"; }).join("");
    return "<ul>" + items + "</ul>" + (note ? '<p class="fine">' + esc(note) + "</p>" : "");
  }

  // Links to pest pages (chips; .now-list is only for inside the colored panels).
  function pestLinks(list) {
    return '<ul class="chip-list">' + list.map(function (x) {
      return '<li><a href="#/pest/' + x.id + '"><span class="now-name">' + esc(xname(x)) + "</span>" +
        '<span class="tag">' + esc(t("pests.type." + x.type)) + "</span></a></li>";
    }).join("") + "</ul>";
  }

  function plantLinks(ids) {
    return '<ul class="chip-list">' + ids.map(function (id) {
      var p = PLANT_BY_ID[id];
      return p ? '<li><a href="#/plant/' + p.id + '"><span class="now-name">' + esc(pname(p)) + "</span></a></li>" : "";
    }).join("") + "</ul>";
  }

  function pestCard(x, month) {
    return '<a class="card" href="#/pest/' + x.id + '">' +
      '<div class="card-media">' + pestImg(x, "card-img", true) + "</div>" +
      '<div class="card-body"><h2 class="card-title">' + esc(xname(x)) + "</h2>" +
      '<div class="tags"><span class="tag pest-' + x.type + '">' + esc(t("pests.type." + x.type)) + "</span>" +
      (x.months.length < 12 && x.months.indexOf(month + 1) >= 0 ? '<span class="tag tag-now">' + esc(t("pests.watchNow")) + "</span>" : "") +
      "</div>" + '<p class="card-text">' + esc(xt(x, "summary")) + "</p></div></a>";
  }

  // ---- month by month (#/care, #/care/<1-12>)

  function renderCare() {
    var m = state.careMonth;
    var now = new Date().getMonth();
    var data = TASKS[m] || { weather: "", tasks: [] };
    var vi = lang === "vi" ? TASKS_VI[m] : null;
    var params = monthParams(m);

    var plantable = PLANTS.filter(function (p) { return p.cells[m * 2] || p.cells[m * 2 + 1]; }).sort(byName);
    var plantList = plantable.length
      ? '<ul class="now-list">' + plantable.map(function (p) {
          return '<li><a href="#/plant/' + p.id + '"><span class="now-name">' + esc(pname(p)) + "</span>" +
            methodBadge(p.cells[m * 2] || p.cells[m * 2 + 1]) + "</a></li>";
        }).join("") + "</ul>"
      : '<p class="empty">' + esc(t("tasks.plantNone")) + "</p>";

    var groups = TASK_GROUPS.map(function (g) {
      var items = data.tasks.map(function (task, i) { return { task: task, text: vi ? vi.tasks[i] : task.text }; })
        .filter(function (it) { return it.task.group === g; });
      if (!items.length) return "";
      return '<section class="task-group task-' + g + '"><h3>' + esc(t("tasks.group." + g)) + '</h3><ul class="task-list">' +
        items.map(function (it) {
          var links = (it.task.pests || []).map(function (id) {
            var x = PEST_BY_ID[id];
            return x ? '<a href="#/pest/' + x.id + '">' + esc(xname(x)) + "</a>" : "";
          }).concat((it.task.plants || []).map(function (id) {
            var p = PLANT_BY_ID[id];
            return p ? '<a href="#/plant/' + p.id + '">' + esc(pname(p)) + "</a>" : "";
          })).filter(Boolean);
          return "<li>" + esc(it.text) +
            (links.length ? ' <span class="task-links">' + esc(t("tasks.see")) + " " + links.join(", ") + "</span>" : "") + "</li>";
        }).join("") + "</ul></section>";
    }).join("");

    var watch = PESTS.filter(function (x) { return x.months.indexOf(m + 1) >= 0; });
    var sources = [];
    data.tasks.forEach(function (task) { sources = sources.concat(task.sources); });

    var html = '<section class="page care">' +
      careHead("care", t("tasks.title"), t("tasks.intro")) +

      '<section class="now-panel month-panel" aria-labelledby="month-title">' +
      '<div class="now-head">' +
      '<button type="button" class="icon-btn" data-month-step="-1" aria-label="' + esc(t("tasks.prev")) + '">&#8249;</button>' +
      '<div class="now-title"><span class="eyebrow">' + esc(m === now ? t("tasks.eyebrowNow") : t("tasks.eyebrow")) + "</span>" +
      '<h2 id="month-title">' + esc(t("tasks.monthTitle", params)) + "</h2></div>" +
      '<button type="button" class="icon-btn" data-month-step="1" aria-label="' + esc(t("tasks.next")) + '">&#8250;</button>' +
      "</div>" +
      (m === now ? "" : '<button type="button" class="link-btn" data-month-now>' + esc(t("tasks.backNow")) + "</button>") +
      '<p class="month-weather">' + esc(vi ? vi.weather : data.weather) + "</p>" +
      '<h3 class="month-plant-title">' + esc(t("tasks.plantTitle")) + "</h3>" +
      plantList +
      '<p class="fine">' + esc(t("tasks.plantIntro")) + "</p>" +
      "</section>" +

      segmented("careMonth", t("months.short").map(function (name, i) { return [String(i), name]; }), String(m), t("tasks.pickMonth")) +

      '<section class="month-todo" aria-labelledby="todo-title"><h2 id="todo-title">' + esc(t("tasks.todoTitle")) + "</h2>" +
      '<div class="task-groups">' + groups + "</div></section>" +

      '<section aria-labelledby="watch-title"><h2 id="watch-title">' + esc(t("tasks.watchTitle")) + "</h2>" +
      '<div class="card-grid card-grid-small">' + watch.map(function (x) { return pestCard(x, m); }).join("") + "</div></section>" +

      '<section class="plant-sources" aria-labelledby="src-title"><h2 id="src-title">' + esc(t("tasks.sources")) + "</h2>" +
      sourceList(sources, t("tasks.note")) + "</section>" +
      "</section>";
    setView(html, t("tasks.title"));
  }

  function setCareMonth(m) {
    state.careMonth = (m + 12) % 12;
    // Keep the address in step without a hashchange, so the page doesn't jump to the top.
    lastRoute = "care/" + (state.careMonth + 1);
    if (history.replaceState) history.replaceState(null, "", "#/" + lastRoute);
    var y = window.scrollY;
    var active = document.activeElement;
    var focus = active && active.getAttribute ? active.getAttribute("data-month-step") : null;
    renderCare();
    window.scrollTo(0, y);
    var el = focus !== null && main.querySelector('[data-month-step="' + focus + '"]');
    if (el) el.focus({ preventScroll: true });
  }

  // ---- watering guide (#/water)

  function dayRange(r) {
    return r[0] === r[1] ? t("water.daysSame", { a: r[0] }) : t("water.days", { a: r[0], b: r[1] });
  }

  function monthSpan(a, b) {
    var short = t("months.short");
    return short[a - 1] + "–" + short[b - 1];
  }

  function renderWater() {
    var month = new Date().getMonth() + 1;
    var season = WATERING.seasonOfMonth[month - 1];
    var seasonSpans = { spring: [3, 5], summer: [5, 10], fall: [10, 12], winter: [12, 3] };
    var cm = function (inches) { return Math.round(inches * 2.54 / 5) * 5; };

    var head = '<tr><th scope="col">' + esc(t("water.plantCol")) + "</th>" + WATERING.seasons.map(function (s) {
      var span = seasonSpans[s];
      return '<th scope="col"' + (s === season ? ' class="is-now"' : "") + ">" + esc(t("water.season." + s)) +
        '<span class="th-sub">' + esc(monthSpan(span[0], span[1])) + "</span>" +
        (s === season ? '<span class="tag tag-now">' + esc(t("water.now")) + "</span>" : "") + "</th>";
    }).join("") + '<th scope="col">' + esc(t("water.depthCol")) + "</th></tr>";
    // data-label repeats the column heading for the stacked layout on phones.
    var rows = WATERING.rows.map(function (r) {
      return '<tr><th scope="row">' + esc(t("water.row." + r.id)) + '<span class="th-sub">' + esc(t("water.row." + r.id + "Note")) + "</span></th>" +
        r.days.map(function (d, i) {
          var s = WATERING.seasons[i], span = seasonSpans[s];
          return '<td data-label="' + esc(t("water.season." + s) + " (" + monthSpan(span[0], span[1]) + ")") + '"' +
            (s === season ? ' class="is-now"' : "") + ">" + esc(dayRange(d)) + "</td>";
        }).join("") +
        '<td data-label="' + esc(t("water.depthCol")) + '">' +
        esc(t("water.depth", { a: r.depth[0], b: r.depth[1], ca: cm(r.depth[0]), cb: cm(r.depth[1]) })) + "</td></tr>";
    }).join("");

    var inPeriod = function (pr) { return pr[0] <= pr[1] ? month >= pr[0] && month <= pr[1] : month >= pr[0] || month <= pr[1]; };
    var citrusHead = '<tr><th scope="col">' + esc(t("water.ageCol")) + "</th>" + WATERING.citrusPeriods.map(function (pr) {
      return '<th scope="col"' + (inPeriod(pr) ? ' class="is-now"' : "") + ">" + esc(monthSpan(pr[0], pr[1])) +
        (inPeriod(pr) ? '<span class="tag tag-now">' + esc(t("water.now")) + "</span>" : "") + "</th>";
    }).join("") + "</tr>";
    var citrusRows = WATERING.citrus.map(function (r) {
      var cells = r.allYear
        ? '<td colspan="' + WATERING.citrusPeriods.length + '">' + esc(t("water.allYear", { a: r.allYear[0], b: r.allYear[1] })) + "</td>"
        : r.days.map(function (d, i) {
            var pr = WATERING.citrusPeriods[i];
            return '<td data-label="' + esc(monthSpan(pr[0], pr[1])) + '"' + (inPeriod(pr) ? ' class="is-now"' : "") + ">" +
              esc(dayRange(d)) + "</td>";
          }).join("");
      return '<tr><th scope="row">' + esc(t("water.age." + r.age)) + "</th>" + cells + "</tr>";
    }).join("");

    function list(key) { return "<ul>" + t(key).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>"; }

    var html = '<section class="page care">' +
      careHead("water", t("water.title"), t("water.intro")) +

      '<section aria-labelledby="basics-title"><h2 id="basics-title">' + esc(t("water.basics")) + '</h2><ul class="tips">' +
      t("water.tips").map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></section>" +

      '<section aria-labelledby="schedule-title"><h2 id="schedule-title">' + esc(t("water.scheduleTitle")) + "</h2>" +
      "<p>" + esc(t("water.scheduleIntro")) + "</p>" +
      '<div class="table-scroll" tabindex="0" aria-label="' + esc(t("water.tableLabel")) + '"><table class="data-table">' +
      "<thead>" + head + "</thead><tbody>" + rows + "</tbody></table></div></section>" +

      '<section aria-labelledby="citrus-title"><h2 id="citrus-title">' + esc(t("water.citrusTitle")) + "</h2>" +
      "<p>" + esc(t("water.citrusIntro")) + "</p>" +
      '<div class="table-scroll" tabindex="0" aria-label="' + esc(t("water.citrusLabel")) + '"><table class="data-table">' +
      "<thead>" + citrusHead + "</thead><tbody>" + citrusRows + "</tbody></table></div>" +
      '<p class="fine">' + esc(t("water.citrusSign")) + "</p></section>" +

      '<section aria-labelledby="signs-title"><h2 id="signs-title">' + esc(t("water.signsTitle")) + '</h2><div class="sign-cols">' +
      '<div class="fact sign-under"><h3>' + esc(t("water.under")) + "</h3>" + list("water.underList") + "</div>" +
      '<div class="fact sign-over"><h3>' + esc(t("water.over")) + "</h3>" + list("water.overList") + "</div>" +
      "</div></section>" +

      '<section class="plant-sources" aria-labelledby="src-title"><h2 id="src-title">' + esc(t("plant.sources")) + "</h2>" +
      sourceList(WATERING.sources, t("water.sourcesNote")) + "</section>" +
      "</section>";
    setView(html, t("water.title"));
  }

  // ---- pests and problems (#/pests, #/pest/<id>)

  function pestCards() {
    var month = new Date().getMonth();
    var list = PESTS.filter(function (x) {
      if (state.pestType !== "all" && x.type !== state.pestType) return false;
      if (state.pestPlant && x.plants.length && x.plants.indexOf(state.pestPlant) < 0) return false;
      return true;
    });
    if (!list.length) return '<p class="empty">' + esc(t("pests.none")) + "</p>";
    return list.map(function (x) { return pestCard(x, month); }).join("");
  }

  function renderPests() {
    var plantIds = {};
    PESTS.forEach(function (x) { x.plants.forEach(function (id) { plantIds[id] = true; }); });
    var plants = Object.keys(plantIds).map(function (id) { return PLANT_BY_ID[id]; }).filter(Boolean).sort(byName);
    var select = '<label class="jump"><span class="visually-hidden">' + esc(t("pests.plantLabel")) + '</span><select data-filter="pestPlant">' +
      '<option value="">' + esc(t("pests.plantLabel") + ": " + t("pests.anyPlant")) + "</option>" +
      plants.map(function (p) {
        return '<option value="' + p.id + '"' + (p.id === state.pestPlant ? " selected" : "") + ">" +
          esc(t("pests.plantLabel") + ": " + pname(p)) + "</option>";
      }).join("") + "</select></label>";

    var html = '<section class="page care">' +
      careHead("pests", t("pests.title"), t("pests.intro")) +
      '<div class="toolbar">' +
      segmented("pestType", [["all", t("pests.typeAll")]].concat(PEST_TYPES.map(function (k) { return [k, t("pests.type." + k)]; })),
        state.pestType, t("pests.typeLabel")) +
      select + "</div>" +
      '<div class="card-grid" id="pest-grid">' + pestCards() + "</div></section>";
    setView(html, t("pests.title"));
  }

  function renderPest(id) {
    var x = PEST_BY_ID[id];
    if (!x) return renderNotFound();
    var month = new Date().getMonth();
    var ph = pestPhotosOf(x)[0];
    lightboxItems = pestPhotosOf(x).map(function (photo) { return pestPhoto(x, photo); });
    var idx = PESTS.indexOf(x);
    var prev = PESTS[(idx - 1 + PESTS.length) % PESTS.length];
    var next = PESTS[(idx + 1) % PESTS.length];
    var short = t("months.short"), tiny = t("months.tiny");
    var allYear = x.months.length === 12;

    var strip = '<div class="strip" role="img" aria-label="' + esc(t("pest.months", { name: xname(x) })) + '">' +
      short.map(function (name, mi) {
        var on = x.months.indexOf(mi + 1) >= 0;
        return '<div class="strip-month' + (mi === month ? " is-now" : "") + '"><div class="strip-cells">' +
          '<span class="strip-cell' + (on ? " is-watch" : "") + '"></span><span class="strip-cell' + (on ? " is-watch" : "") + '"></span></div>' +
          '<span class="strip-label"><span class="strip-label-full">' + esc(name) + '</span><span class="strip-label-tiny">' +
          esc(tiny[mi]) + "</span></span></div>";
      }).join("") + "</div>";
    var note = allYear ? t("pest.allYear")
      : x.months.indexOf(month + 1) >= 0 ? t("pest.watchYes") : t("pest.watchNo", monthParams(month));

    function list(field) { return '<ul class="tips">' + xt(x, field).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>"; }

    var html = '<article class="page plant pest">' +
      '<nav class="crumbs" aria-label="' + esc(t("plant.breadcrumb")) + '"><a href="#/pests">' + esc(t("pest.back")) + "</a></nav>" +
      '<div class="plant-hero">' +
      '<figure class="plant-photo">' + pestImg(x, "plant-img", false) +
      (ph ? '<figcaption class="credit">' + photoCredit(ph) + "</figcaption>" : "") + "</figure>" +
      '<div class="plant-intro">' +
      '<div class="tags"><span class="tag pest-' + x.type + '">' + esc(t("pests.type." + x.type)) + "</span></div>" +
      "<h1>" + esc(xname(x)) + "</h1>" +
      '<p class="lead">' + esc(xt(x, "summary")) + "</p>" +
      '<section class="when" aria-labelledby="when-title"><h2 id="when-title">' + esc(t("pest.when")) + "</h2>" +
      strip + '<p class="now-note' + (x.months.indexOf(month + 1) >= 0 ? " yes" : "") + '">' + esc(note) + "</p></section>" +
      "</div></div>" +

      '<div class="pest-cols">' +
      '<section aria-labelledby="signs-title"><h2 id="signs-title">' + esc(t("pest.signs")) + "</h2>" + list("signs") + "</section>" +
      '<section aria-labelledby="control-title"><h2 id="control-title">' + esc(t("pest.control")) + "</h2>" + list("control") + "</section>" +
      "</div>" +

      '<section class="plant-pests" aria-labelledby="affects-title"><h2 id="affects-title">' + esc(t("pest.plants")) + "</h2>" +
      (x.plants.length ? plantLinks(x.plants) : "<p>" + esc(t("pest.plantsAll")) + "</p>") + "</section>" +

      (lightboxItems.length
        ? '<section class="plant-gallery" aria-labelledby="photos-title"><h2 id="photos-title">' + esc(t("plant.photos")) + "</h2>" +
          photoGrid(lightboxItems, 0) + "</section>"
        : "") +

      '<section class="plant-sources" aria-labelledby="src-title"><h2 id="src-title">' + esc(t("plant.sources")) + "</h2>" +
      sourceList(x.sources, t("pest.sourcesNote")) + "</section>" +

      '<nav class="pager" aria-label="' + esc(t("pest.more")) + '">' +
      '<a href="#/pest/' + prev.id + '">← ' + esc(xname(prev)) + "</a>" +
      '<a href="#/pest/' + next.id + '">' + esc(xname(next)) + " →</a></nav>" +
      "</article>";
    setView(html, xname(x));
  }

  // ------------------------------------------------------------ gallery

  // Photos the viewer steps through: whatever the current gallery or plant page shows.
  var lightboxItems = [];

  function kindMatches(kind) {
    if (state.galleryKind === "all") return true;
    if (state.galleryKind === "plant") return kind === "plant";
    return kind !== "plant"; // "harvest": the edible part, including leafy close-ups
  }

  function renderGallery() {
    var plants = PLANTS.filter(function (p) {
      return state.galleryCategory === "all" || p.category === state.galleryCategory;
    }).sort(byName);

    lightboxItems = [];
    var groups = "";
    plants.forEach(function (p) {
      var items = photosOf(p).filter(function (ph) { return kindMatches(ph.kind); })
        .map(function (ph) { return plantPhoto(p, ph); });
      if (!items.length) return;
      groups += '<section class="gallery-group" id="g-' + p.id + '">' +
        '<h2><a href="#/plant/' + p.id + '">' + esc(pname(p)) + "</a></h2>" +
        photoGrid(items, lightboxItems.length) + "</section>";
      lightboxItems = lightboxItems.concat(items);
    });

    var jump = '<label class="jump"><span class="visually-hidden">' + esc(t("gallery.jumpLabel")) + "</span><select data-jump>" +
      '<option value="">' + esc(t("gallery.jump")) + "</option>" +
      plants.map(function (p) { return '<option value="' + p.id + '">' + esc(pname(p)) + "</option>"; }).join("") +
      "</select></label>";

    var html = '<section class="page">' +
      '<div class="page-head"><h1>' + esc(t("gallery.title")) + "</h1><p>" +
      esc(t("gallery.intro", { n: lightboxItems.length })) + "</p></div>" +
      '<div class="toolbar">' +
      segmented("galleryCategory", categoryOptions(), state.galleryCategory, t("filter.typeLabel")) +
      segmented("galleryKind", [["all", t("gallery.allPhotos")], ["harvest", t("gallery.harvest")], ["plant", t("gallery.wholePlants")]],
        state.galleryKind, t("gallery.photoType")) +
      jump + "</div>" +
      (groups || '<p class="empty">' + esc(t("gallery.none")) + "</p>") + "</section>";
    setView(html, t("gallery.title"));
  }

  var lightbox = document.getElementById("lightbox");
  var lightboxIndex = 0;

  function showPhoto(i) {
    if (!lightboxItems.length) return;
    lightboxIndex = (i + lightboxItems.length) % lightboxItems.length;
    var it = lightboxItems[lightboxIndex];
    var img = lightbox.querySelector(".lightbox-img");
    img.src = it.photo.src;
    img.alt = it.alt;
    lightbox.querySelector(".lightbox-caption").innerHTML =
      "<strong>" + esc(it.name) + '<span class="lightbox-kind"> · ' + esc(it.label) + "</span></strong>" +
      '<span class="lightbox-count">' + esc(t("viewer.count", { i: lightboxIndex + 1, n: lightboxItems.length })) + "</span>" +
      '<a class="lightbox-link" href="' + it.href + '" data-lightbox="close">' + esc(it.link) + "</a>" +
      '<span class="credit">' + photoCredit(it.photo) + "</span>";
  }

  function openLightbox(i) {
    showPhoto(i);
    if (typeof lightbox.showModal === "function") lightbox.showModal();
    else lightbox.setAttribute("open", "");
  }

  function closeLightbox() {
    if (typeof lightbox.close === "function") lightbox.close();
    else lightbox.removeAttribute("open");
  }

  lightbox.addEventListener("click", function (e) {
    var action = e.target.closest("[data-lightbox]");
    if (action) {
      var a = action.getAttribute("data-lightbox");
      if (a === "prev") showPhoto(lightboxIndex - 1);
      else if (a === "next") showPhoto(lightboxIndex + 1);
      else closeLightbox();
      return;
    }
    // Click on the dark backdrop closes the viewer.
    if (e.target === lightbox) closeLightbox();
  });

  lightbox.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") showPhoto(lightboxIndex - 1);
    if (e.key === "ArrowRight") showPhoto(lightboxIndex + 1);
  });

  // ------------------------------------------------------------ about

  function renderAbout() {
    var photoCount = 0;
    var credits = PLANTS.slice().sort(byName).filter(function (p) { return photosOf(p).length; }).map(function (p) {
      photoCount += photosOf(p).length;
      return "<li><strong>" + esc(pname(p)) + "</strong><ul>" + photosOf(p).map(function (ph) {
        return "<li>" + esc(kindLabel(ph.kind)) + ": " + photoCredit(ph) + "</li>";
      }).join("") + "</ul></li>";
    }).join("");
    credits += PESTS.filter(function (x) { return pestPhotosOf(x).length; }).map(function (x) {
      photoCount += pestPhotosOf(x).length;
      return "<li><strong>" + esc(xname(x)) + "</strong><ul>" + pestPhotosOf(x).map(function (ph) {
        return "<li>" + esc(t("pestKind." + ph.kind)[0]) + ": " + photoCredit(ph) + "</li>";
      }).join("") + "</ul></li>";
    }).join("");
    // Sources grouped by what they're used for (the "group" field in sources.js).
    var sources = ["plants", "care", "pests", "monthly"].map(function (g) {
      var keys = Object.keys(SOURCES).filter(function (k) { return SOURCES[k].group === g; });
      if (g === "monthly") {
        // Twelve sheets from the same series: one line of month links and a shared note.
        return "<h3>" + esc(t("sourceGroup." + g)) + "</h3><p>" + keys.map(function (k, i) {
          var s = SOURCES[k];
          return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener" title="' + esc(s.title) + '">' +
            esc(t("months.short")[i]) + "</a>";
        }).join(" · ") + esc(t("source.english")) + '<br><span class="fine">' + esc(t("sourceGroup.monthlyNote")) + "</span></p>";
      }
      return "<h3>" + esc(t("sourceGroup." + g)) + '</h3><ul class="source-list">' + keys.map(function (k) {
        var note = lang === "vi" && SOURCES_VI[k] ? SOURCES_VI[k] : SOURCES[k].note;
        return "<li>" + sourceLink(k) + (note ? '<span class="fine"> ' + esc(note) + "</span>" : "") + "</li>";
      }).join("") + "</ul>";
    }).join("");

    var html = '<article class="page prose">' +
      "<h1>" + esc(t("about.title")) + "</h1>" +
      "<p>" + esc(t("about.intro")) + "</p>" +

      "<h2>" + esc(t("about.seasons")) + "</h2>" +
      "<p>" + esc(t("about.seasonsIntro")) + "</p><ul>" +
      "<li>" + t("about.fallHtml") + "</li>" +
      "<li>" + t("about.springHtml") + "</li></ul>" +
      "<p>" + esc(t("about.summer")) + "</p>" +

      "<h2>" + esc(t("about.read")) + "</h2>" +
      "<p>" + esc(t("about.readIntro")) + "</p>" +
      legend() +
      "<p>" + esc(t("about.readEmpty")) + "</p>" +

      "<h2>" + esc(t("about.care")) + "</h2>" +
      "<p>" + t("about.careHtml") + "</p>" +

      "<h2>" + esc(t("about.sources")) + "</h2>" +
      "<p>" + t("about.sourcesHtml") + "</p>" + sources +
      '<p class="fine">' + esc(t("about.sourcesNote")) + "</p>" +

      "<h2>" + esc(t("about.credits")) + "</h2>" +
      "<p>" + esc(t("about.creditsIntro")) + "</p>" +
      '<details class="credits"><summary>' + esc(t("about.creditsShow", { n: photoCount })) + "</summary>" +
      '<ul class="credit-list">' + credits + "</ul></details>" +
      "</article>";
    setView(html, t("nav.about"));
  }

  function renderNotFound() {
    setView('<section class="page"><h1>' + esc(t("notFound.title")) + '</h1><p><a href="#/calendar">' +
      esc(t("notFound.link")) + "</a></p></section>", t("notFound.title"));
  }

  // ------------------------------------------------------------ routing

  var lastRoute = "";

  function route() {
    var hash = location.hash.replace(/^#\/?/, "");
    var parts = hash.split("/");
    var view = parts[0] || "calendar";

    if (view === "calendar") renderCalendar();
    else if (view === "plants") renderPlants();
    else if (view === "plant") renderPlant(parts[1]);
    else if (view === "care") {
      var m = parseInt(parts[1], 10);
      if (m >= 1 && m <= 12) state.careMonth = m - 1;
      renderCare();
    }
    else if (view === "water") renderWater();
    else if (view === "pests") renderPests();
    else if (view === "pest") renderPest(parts[1]);
    else if (view === "gallery") renderGallery();
    else if (view === "about") renderAbout();
    else renderNotFound();

    var navKey = { plant: "plants", water: "care", pests: "care", pest: "care" }[view] || view;
    document.querySelectorAll("[data-nav]").forEach(function (a) {
      if (a.getAttribute("data-nav") === navKey) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });

    if (hash !== lastRoute) {
      window.scrollTo(0, 0);
      if (lastRoute) main.focus({ preventScroll: true });
    }
    lastRoute = hash;
  }

  // Re-render only the parts affected by a filter change, so the search box keeps focus.
  function refresh() {
    var view = (location.hash.replace(/^#\/?/, "").split("/")[0]) || "calendar";
    if (view === "calendar") {
      var scroller = main.querySelector(".cal-scroll");
      if (scroller) scroller.innerHTML = calendarTable();
    } else if (view === "plants") {
      var grid = document.getElementById("plant-grid");
      if (grid) grid.innerHTML = plantCards();
    } else if (view === "pests") {
      var pestGrid = document.getElementById("pest-grid");
      if (pestGrid) pestGrid.innerHTML = pestCards();
    }
  }

  main.addEventListener("input", function (e) {
    if (e.target.matches('[data-filter="query"]')) {
      state.query = e.target.value.trim();
      refresh();
    }
  });

  main.addEventListener("change", function (e) {
    if (e.target.matches("[data-jump]")) {
      var group = document.getElementById("g-" + e.target.value);
      if (group) group.scrollIntoView({ behavior: "smooth", block: "start" });
      e.target.value = "";
      return;
    }
    if (e.target.matches('[data-filter="plantableOnly"]')) {
      state.plantableOnly = e.target.checked;
      refresh();
    }
    if (e.target.matches('[data-filter="pestPlant"]')) {
      state.pestPlant = e.target.value;
      refresh();
    }
  });

  main.addEventListener("click", function (e) {
    var target = e.target;

    var seg = target.closest("button[data-filter]");
    if (seg) {
      var name = seg.getAttribute("data-filter");
      state[name] = seg.getAttribute("data-value");
      seg.parentNode.querySelectorAll("button").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === seg));
      });
      if (name === "galleryCategory" || name === "galleryKind") renderGallery();
      else if (name === "careMonth") setCareMonth(parseInt(state.careMonth, 10));
      else refresh();
      return;
    }

    var monthStep = target.closest("[data-month-step]");
    if (monthStep) {
      setCareMonth(state.careMonth + parseInt(monthStep.getAttribute("data-month-step"), 10));
      return;
    }
    if (target.closest("[data-month-now]")) {
      setCareMonth(new Date().getMonth());
      return;
    }

    var step = target.closest("[data-step]");
    if (step) {
      state.half = (state.half + parseInt(step.getAttribute("data-step"), 10) + 24) % 24;
      renderCalendarKeepScroll();
      return;
    }

    if (target.closest("[data-today]")) {
      state.half = todayHalf();
      renderCalendarKeepScroll();
      return;
    }

    var half = target.closest("[data-half]");
    if (half && half.closest(".cal")) {
      state.half = parseInt(half.getAttribute("data-half"), 10);
      renderCalendarKeepScroll();
      return;
    }

    var photo = target.closest("[data-photo]");
    if (photo) {
      openLightbox(parseInt(photo.getAttribute("data-photo"), 10));
    }
  });

  // Changing the selected period re-renders the calendar; keep the page and chart scroll positions.
  function renderCalendarKeepScroll() {
    var y = window.scrollY;
    var scroller = main.querySelector(".cal-scroll");
    var x = scroller ? scroller.scrollLeft : 0;
    var active = document.activeElement;
    var focusKey = active && active.getAttribute ? (active.getAttribute("data-half") || active.getAttribute("data-step")) : null;
    var focusAttr = active && active.hasAttribute && active.hasAttribute("data-step") ? "data-step" : "data-half";
    renderCalendar();
    window.scrollTo(0, y);
    var s2 = main.querySelector(".cal-scroll");
    if (s2) s2.scrollLeft = x;
    if (focusKey !== null) {
      var el = main.querySelector("button[" + focusAttr + '="' + focusKey + '"]');
      if (el) el.focus({ preventScroll: true });
    }
  }

  // ------------------------------------------------------------ language

  // Text in index.html (header, footer, viewer buttons) is marked with data-i18n attributes.
  function applyStaticText() {
    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("site.description"));
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
  }

  function setLanguage(next) {
    if (LANGS.indexOf(next) < 0 || next === lang) return;
    lang = next;
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* private mode: the choice lasts for this visit only */ }
    applyStaticText();
    if (!themeMenu.hidden) renderThemeMenu();
    route();
  }

  document.querySelector(".lang-toggle").addEventListener("click", function (e) {
    var b = e.target.closest("[data-lang]");
    if (b) setLanguage(b.getAttribute("data-lang"));
  });

  // ------------------------------------------------------------ theme picker

  var themeBtn = document.getElementById("theme-btn");
  var themeMenu = document.getElementById("theme-menu");

  function currentTheme() {
    return document.documentElement.getAttribute("data-skin") || THEMES[0].id;
  }

  function renderThemeMenu() {
    var cur = currentTheme();
    themeMenu.innerHTML = THEMES.map(function (th) {
      var label = t("theme." + th.id);
      return '<button type="button" role="menuitemradio" data-theme-id="' + th.id + '" aria-checked="' + (th.id === cur) + '">' +
        '<span class="theme-dots" aria-hidden="true">' + th.colors.map(function (c) {
          return '<span style="background:' + c + '"></span>';
        }).join("") + "</span>" +
        '<span class="theme-name">' + esc(label[0]) + "<small>" + esc(label[1]) + "</small></span></button>";
    }).join("");
  }

  function openThemeMenu() {
    renderThemeMenu();
    themeMenu.hidden = false;
    themeBtn.setAttribute("aria-expanded", "true");
    var checked = themeMenu.querySelector('[aria-checked="true"]');
    if (checked) checked.focus();
  }

  function closeThemeMenu(refocus) {
    themeMenu.hidden = true;
    themeBtn.setAttribute("aria-expanded", "false");
    if (refocus) themeBtn.focus();
  }

  function applyTheme(id) {
    document.documentElement.setAttribute("data-skin", id);
    try { localStorage.setItem(THEME_KEY, id); } catch (e) { /* private mode: the choice lasts for this visit only */ }
  }

  themeBtn.addEventListener("click", function () {
    if (themeMenu.hidden) openThemeMenu();
    else closeThemeMenu(false);
  });

  themeMenu.addEventListener("click", function (e) {
    var item = e.target.closest("[data-theme-id]");
    if (!item) return;
    applyTheme(item.getAttribute("data-theme-id"));
    closeThemeMenu(true);
  });

  themeMenu.addEventListener("keydown", function (e) {
    var items = Array.prototype.slice.call(themeMenu.querySelectorAll("[data-theme-id]"));
    var i = items.indexOf(document.activeElement);
    if (e.key === "ArrowDown") { e.preventDefault(); items[(i + 1) % items.length].focus(); }
    if (e.key === "ArrowUp") { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    if (e.key === "Escape") closeThemeMenu(true);
  });

  document.addEventListener("click", function (e) {
    if (!themeMenu.hidden && !e.target.closest(".theme-picker")) closeThemeMenu(false);
  });

  // ------------------------------------------------------------ header fit

  // If the header items don't fit on one line, switch to the two-row layout
  // (title, Theme and language on top; tabs below) instead of letting buttons wrap.
  var header = document.querySelector(".site-header");
  var fitPending = false;

  function fitHeader() {
    fitPending = false;
    header.classList.remove("is-stacked");
    var brand = header.querySelector(".brand").getBoundingClientRect();
    var wrapped = [".site-nav", ".theme-picker", ".lang-toggle"].some(function (sel) {
      return header.querySelector(sel).getBoundingClientRect().top >= brand.bottom - 1;
    });
    if (wrapped) header.classList.add("is-stacked");
  }

  function scheduleFitHeader() {
    if (fitPending) return;
    fitPending = true;
    requestAnimationFrame(fitHeader);
  }

  window.addEventListener("resize", scheduleFitHeader);
  if (document.fonts) {
    // Fonts arriving (including the Vietnamese ones, loaded on demand) change label widths.
    document.fonts.addEventListener("loadingdone", scheduleFitHeader);
  }
  themeMenu.addEventListener("click", scheduleFitHeader);
  document.querySelector(".lang-toggle").addEventListener("click", scheduleFitHeader);

  window.addEventListener("hashchange", route);
  applyStaticText();
  route();
  fitHeader();
})();
