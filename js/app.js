/*
  Phoenix Garden Guide: a small single-page app with no build step.
  Views are chosen by the URL hash: #/calendar, #/plants, #/plant/<id>, #/gallery, #/about.
  All visible text comes from js/i18n.js (interface) and js/data/plants.vi.js /
  sources.vi.js (Vietnamese plant and source text); English plant text is in plants.js.
*/
(function () {
  "use strict";

  var PLANTS = window.PLANTS || [];
  var PHOTOS = window.PHOTOS || {};
  var SOURCES = window.SOURCES || {};
  var I18N = window.I18N || {};
  var PLANTS_VI = window.PLANTS_VI || {};
  var SOURCES_VI = window.SOURCES_VI || {};

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

  function byName(a, b) { return pname(a).localeCompare(pname(b), lang); }

  // ------------------------------------------------------------ state

  var state = {
    half: todayHalf(),
    category: "all",
    season: "all",
    query: "",
    plantableOnly: false,
    galleryCategory: "all",
    galleryKind: "all"
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

  function photoAlt(p, ph) {
    return lang === "en" ? ph.alt : pname(p) + ": " + kindLower(ph.kind);
  }

  function imgTag(p, ph, cls, useThumb) {
    return '<img class="' + cls + '" src="' + esc(useThumb ? ph.thumb : ph.src) + '" alt="' + esc(photoAlt(p, ph)) +
      '" loading="lazy" decoding="async">';
  }

  // The plant's first photo is its cover, used on cards and at the top of its page.
  function photoImg(p, cls, useThumb) {
    var ph = photosOf(p)[0];
    if (!ph) {
      return '<div class="' + cls + ' photo-missing" aria-hidden="true"><span>' + esc(pname(p).charAt(0)) + "</span></div>";
    }
    return imgTag(p, ph, cls, useThumb);
  }

  // A clickable grid of photos; indexes point into lightboxItems.
  function photoGrid(items, offset) {
    return '<ul class="gallery">' + items.map(function (it, i) {
      return '<li><button type="button" class="gallery-item" data-photo="' + (offset + i) + '" aria-label="' +
        esc(t("photo.viewLarger", { plant: pname(it.plant), kind: kindLower(it.photo.kind) })) + '">' +
        imgTag(it.plant, it.photo, "gallery-img", true) +
        '<span class="gallery-label">' + esc(kindLabel(it.photo.kind)) + "</span></button></li>";
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
    lightboxItems = photosOf(p).map(function (photo) { return { plant: p, photo: photo }; });
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
      "</dl></section>" +

      '<section aria-labelledby="tips-title"><h2 id="tips-title">' + esc(t("plant.tips")) + '</h2><ul class="tips">' +
      pt(p, "tips").map(function (tip) { return "<li>" + esc(tip) + "</li>"; }).join("") + "</ul></section>" +

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
        .map(function (ph) { return { plant: p, photo: ph }; });
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
    var p = lightboxItems[lightboxIndex].plant;
    var ph = lightboxItems[lightboxIndex].photo;
    var img = lightbox.querySelector(".lightbox-img");
    img.src = ph.src;
    img.alt = photoAlt(p, ph);
    lightbox.querySelector(".lightbox-caption").innerHTML =
      "<strong>" + esc(pname(p)) + '<span class="lightbox-kind"> · ' + esc(kindLabel(ph.kind)) + "</span></strong>" +
      '<span class="lightbox-count">' + esc(t("viewer.count", { i: lightboxIndex + 1, n: lightboxItems.length })) + "</span>" +
      '<a class="lightbox-link" href="#/plant/' + p.id + '" data-lightbox="close">' + esc(t("viewer.guide")) + "</a>" +
      '<span class="credit">' + photoCredit(ph) + "</span>";
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
    var sources = Object.keys(SOURCES).map(function (k) {
      var note = lang === "vi" && SOURCES_VI[k] ? SOURCES_VI[k] : SOURCES[k].note;
      return "<li>" + sourceLink(k) + (note ? '<span class="fine"> ' + esc(note) + "</span>" : "") + "</li>";
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

      "<h2>" + esc(t("about.water")) + "</h2><ul>" +
      ["about.water1", "about.water2", "about.water3", "about.water4"].map(function (k) {
        return "<li>" + esc(t(k)) + "</li>";
      }).join("") + "</ul>" +

      "<h2>" + esc(t("about.sources")) + "</h2>" +
      "<p>" + t("about.sourcesHtml") + '</p><ul class="source-list">' + sources + "</ul>" +
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
    else if (view === "gallery") renderGallery();
    else if (view === "about") renderAbout();
    else renderNotFound();

    var navKey = view === "plant" ? "plants" : view;
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
      else refresh();
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
