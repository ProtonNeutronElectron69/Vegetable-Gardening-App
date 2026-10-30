/*
  Phoenix Garden Guide: a small single-page app with no build step.
  Views are chosen by the URL hash: #/calendar, #/plants, #/plant/<id>, #/gallery, #/about.
*/
(function () {
  "use strict";

  var PLANTS = window.PLANTS || [];
  var PHOTOS = window.PHOTOS || {};
  var SOURCES = window.SOURCES || {};

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
  // Day counts used for labels; February uses 28 to match the Extension charts.
  var MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  var METHODS = {
    S: { label: "Seeds", long: "Sow seeds directly in the garden" },
    T: { label: "Transplants", long: "Set out transplants (nursery starts or your own seedlings)" },
    B: { label: "Seeds or transplants", long: "Sow seeds or set out transplants" },
    X: { label: "Sets, cloves or tubers", long: "Plant onion sets, garlic cloves or seed potatoes" },
    P: { label: "Nursery plants", long: "Plant nursery plants, container trees or bare-root stock" }
  };

  var CATEGORIES = { vegetable: "Vegetable", fruit: "Fruit", herb: "Herb" };

  // Photo kinds: the edible part, the whole plant, or (for leafy plants) a close-up of the leaves.
  var KINDS = { produce: "The harvest", plant: "Whole plant", closeup: "Close-up" };
  var SEASONS = {
    warm: { label: "Warm season", group: "Warm-season crops" },
    cool: { label: "Cool season", group: "Cool-season crops" },
    perennial: { label: "Perennial", group: "Trees, vines & perennials" }
  };
  var SEASON_ORDER = ["warm", "cool", "perennial"];

  // ------------------------------------------------------------ dates

  // "Feb 15" -> half-month index 0..23 (0 = Jan 1-14, 1 = Jan 15-31, ...).
  function halfIndex(text) {
    var parts = text.trim().split(/\s+/);
    var month = MONTHS.indexOf(parts[0]);
    var day = parseInt(parts[1], 10);
    if (month < 0 || isNaN(day)) throw new Error("Bad date in plant data: " + text);
    return month * 2 + (day >= 15 ? 1 : 0);
  }

  function halfRange(i) {
    var m = Math.floor(i / 2);
    return i % 2 === 0
      ? MONTHS[m] + " 1–" + 14
      : MONTHS[m] + " 15–" + MONTH_DAYS[m];
  }

  function halfName(i) {
    return (i % 2 === 0 ? "Early " : "Late ") + MONTH_NAMES[Math.floor(i / 2)];
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

  function byName(a, b) { return a.name.localeCompare(b.name); }

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
      var q = state.query.toLowerCase();
      if (p.name.toLowerCase().indexOf(q) < 0 && p.summary.toLowerCase().indexOf(q) < 0) return false;
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
    document.title = title ? title + " · Phoenix Garden Guide" : "Phoenix Garden Guide";
  }

  function methodBadge(code) {
    return '<span class="badge m-' + code + '">' + esc(METHODS[code].label) + "</span>";
  }

  function photosOf(p) { return PHOTOS[p.id] || []; }

  function imgTag(ph, cls, useThumb) {
    return '<img class="' + cls + '" src="' + esc(useThumb ? ph.thumb : ph.src) + '" alt="' + esc(ph.alt) +
      '" loading="lazy" decoding="async">';
  }

  // The plant's first photo is its cover, used on cards and at the top of its page.
  function photoImg(p, cls, useThumb) {
    var ph = photosOf(p)[0];
    if (!ph) {
      return '<div class="' + cls + ' photo-missing" aria-hidden="true"><span>' + esc(p.name.charAt(0)) + "</span></div>";
    }
    return imgTag(ph, cls, useThumb);
  }

  // A clickable grid of photos; indexes point into lightboxItems.
  function photoGrid(items, offset) {
    return '<ul class="gallery">' + items.map(function (it, i) {
      return '<li><button type="button" class="gallery-item" data-photo="' + (offset + i) + '" aria-label="' +
        esc(it.plant.name + ", " + KINDS[it.photo.kind].toLowerCase() + ": view larger") + '">' +
        imgTag(it.photo, "gallery-img", true) +
        '<span class="gallery-label">' + esc(KINDS[it.photo.kind]) + "</span></button></li>";
    }).join("") + "</ul>";
  }

  function photoCredit(ph) {
    if (!ph) return "";
    var lic = ph.licenseUrl
      ? '<a href="' + esc(ph.licenseUrl) + '" target="_blank" rel="noopener">' + esc(ph.license) + "</a>"
      : esc(ph.license);
    return 'Photo: ' + esc(ph.artist || "Unknown") + " · " + lic +
      ' · <a href="' + esc(ph.sourceUrl) + '" target="_blank" rel="noopener">Wikimedia Commons</a>';
  }

  function segmented(name, options, current, label) {
    return '<div class="segmented" role="group" aria-label="' + esc(label) + '">' +
      options.map(function (o) {
        return '<button type="button" data-filter="' + name + '" data-value="' + o[0] + '" aria-pressed="' +
          (o[0] === current) + '">' + esc(o[1]) + "</button>";
      }).join("") + "</div>";
  }

  function filterToolbar(opts) {
    return '<div class="toolbar">' +
      '<label class="search"><span class="visually-hidden">Search plants</span>' +
      '<input type="search" data-filter="query" placeholder="Search plants…" value="' + esc(state.query) + '"></label>' +
      segmented("category", [["all", "All"], ["vegetable", "Vegetables"], ["fruit", "Fruit"], ["herb", "Herbs"]],
        state.category, "Plant type") +
      segmented("season", [["all", "Any season"], ["warm", "Warm"], ["cool", "Cool"], ["perennial", "Perennial"]],
        state.season, "Growing season") +
      '<label class="check"><input type="checkbox" data-filter="plantableOnly"' + (state.plantableOnly ? " checked" : "") +
      "> " + esc(opts.plantableLabel) + "</label>" +
      "</div>";
  }

  function legend() {
    return '<ul class="legend" aria-label="Legend">' +
      Object.keys(METHODS).map(function (k) {
        return '<li><span class="swatch m-' + k + '"></span>' + esc(METHODS[k].label) + "</li>";
      }).join("") + "</ul>";
  }

  // ------------------------------------------------------------ calendar

  function renderCalendar() {
    var h = state.half;
    var isToday = h === todayHalf();
    var plantable = PLANTS.filter(function (p) { return p.cells[h]; }).sort(byName);

    var nowList = plantable.length
      ? '<ul class="now-list">' + plantable.map(function (p) {
          return '<li><a href="#/plant/' + p.id + '"><span class="now-name">' + esc(p.name) + "</span>" +
            methodBadge(p.cells[h]) + "</a></li>";
        }).join("") + "</ul>"
      : '<p class="empty">Nothing on the planting chart for this period. It is a good time to plan, prepare beds and harvest.</p>';

    var html =
      '<section class="page">' +
      '<div class="page-head"><h1>Planting calendar</h1>' +
      "<p>When to plant vegetables and fruit in the Phoenix metro area (low desert, about 1,100 feet). " +
      "Pick a plant to see spacing, watering and growing tips.</p></div>" +

      '<section class="now-panel" aria-labelledby="now-title">' +
      '<div class="now-head">' +
      '<button type="button" class="icon-btn" data-step="-1" aria-label="Previous half-month">&#8249;</button>' +
      '<div class="now-title"><span class="eyebrow">' + (isToday ? "Plant now" : "What to plant") + "</span>" +
      '<h2 id="now-title">' + esc(halfName(h)) + "</h2>" +
      '<span class="now-range">' + esc(halfRange(h)) + (isToday ? " · this is today" : "") + "</span></div>" +
      '<button type="button" class="icon-btn" data-step="1" aria-label="Next half-month">&#8250;</button>' +
      "</div>" +
      (isToday ? "" : '<button type="button" class="link-btn" data-today>Back to today</button>') +
      '<p class="now-count">' + plantable.length + (plantable.length === 1 ? " plant" : " plants") + " can go in the ground</p>" +
      nowList +
      "</section>" +

      filterToolbar({ plantableLabel: "Only show plants for " + halfName(h) }) +
      legend() +
      '<p class="hint">Tip: click any column to see what to plant in that half of the month.</p>' +
      '<div class="cal-scroll" tabindex="0" aria-label="Planting chart, scrolls sideways">' + calendarTable() + "</div>" +
      "</section>";

    setView(html, "Planting calendar");
  }

  function calendarTable() {
    var h = state.half;
    var today = todayHalf();
    var plants = PLANTS.filter(matchesFilters);

    var head1 = '<tr><th class="cal-plant-col" rowspan="2" scope="col">Plant</th>' +
      MONTHS.map(function (m, i) {
        var sel = Math.floor(h / 2) === i ? " is-selected-month" : "";
        return '<th colspan="2" scope="colgroup" class="cal-month' + sel + '">' + m + "</th>";
      }).join("") + "</tr>";
    var head2 = "<tr>" + MONTHS.map(function (m, mi) {
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
      body += '<tr class="cal-group"><th colspan="25" scope="rowgroup"><span>' + esc(SEASONS[season].group) + "</span></th></tr>";
      group.forEach(function (p) {
        body += '<tr><th scope="row" class="cal-plant-col"><a href="#/plant/' + p.id + '">' + esc(p.name) + "</a></th>" +
          p.cells.map(function (c, i) {
            var cls = (c ? "m-" + c : "") + (i === h ? " is-selected" : "") + (i % 2 === 1 ? " half-b" : "");
            var tip = p.name + ", " + halfName(i) + ": " + (c ? METHODS[c].label : "not on the chart");
            return '<td class="' + cls.trim() + '" data-half="' + i + '" title="' + esc(tip) + '">' +
              (c ? '<span class="visually-hidden">' + esc(METHODS[c].label) + "</span>" : "") + "</td>";
          }).join("") + "</tr>";
      });
    });
    if (!body) {
      body = '<tr><td colspan="25" class="empty">No plants match these filters.</td></tr>';
    }

    return '<table class="cal"><caption class="visually-hidden">Planting windows by half-month</caption>' +
      "<thead>" + head1 + head2 + "</thead><tbody>" + body + "</tbody></table>";
  }

  // ------------------------------------------------------------ plant list

  function renderPlants() {
    var html = '<section class="page">' +
      '<div class="page-head"><h1>Plants</h1><p>' + PLANTS.length +
      " vegetables, herbs and fruits that grow well in the Phoenix area.</p></div>" +
      filterToolbar({ plantableLabel: "Can plant now (" + halfName(todayHalf()) + ")" }) +
      '<div class="card-grid" id="plant-grid">' + plantCards() + "</div></section>";
    setView(html, "Plants");
  }

  function plantCards() {
    // On the Plants page "plantable" always means today, not the calendar's selected period.
    var saved = state.half;
    state.half = todayHalf();
    var list = PLANTS.filter(matchesFilters).sort(byName);
    state.half = saved;
    if (!list.length) return '<p class="empty">No plants match these filters.</p>';
    var now = todayHalf();
    return list.map(function (p) {
      return '<a class="card" href="#/plant/' + p.id + '">' +
        '<div class="card-media">' + photoImg(p, "card-img", true) + "</div>" +
        '<div class="card-body"><h2 class="card-title">' + esc(p.name) + "</h2>" +
        '<div class="tags"><span class="tag season-' + p.season + '">' + esc(SEASONS[p.season].label) + "</span>" +
        '<span class="tag">' + esc(CATEGORIES[p.category]) + "</span>" +
        (p.cells[now] ? '<span class="tag tag-now">Plant now</span>' : "") + "</div>" +
        '<p class="card-text">' + esc(p.summary) + "</p></div></a>";
    }).join("");
  }

  // ------------------------------------------------------------ plant detail

  function windowText(w) {
    var a = halfIndex(w.from), b = halfIndex(w.to);
    // A window covering exactly one whole month reads better as "All of March".
    if (a % 2 === 0 && b === a + 1) return "All of " + MONTH_NAMES[a / 2];
    return w.from + " – " + w.to;
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

    var strip = '<div class="strip" role="img" aria-label="' + esc(p.name + " planting months") + '">' +
      MONTHS.map(function (m, mi) {
        return '<div class="strip-month' + (Math.floor(now / 2) === mi ? " is-now" : "") + '">' +
          '<div class="strip-cells">' + [0, 1].map(function (k) {
            var c = p.cells[mi * 2 + k];
            return '<span class="strip-cell' + (c ? " m-" + c : "") + (mi * 2 + k === now ? " is-today" : "") + '"></span>';
          }).join("") + "</div><span class=\"strip-label\">" + m.charAt(0) + '<span class="strip-label-rest">' + m.slice(1) + "</span></span></div>";
      }).join("") + "</div>";

    var windows = '<ul class="window-list">' + p.windows.map(function (w) {
      return "<li>" + methodBadge(w.method) + "<span>" + esc(windowText(w)) + "</span></li>";
    }).join("") + "</ul>";

    var nowNote = p.cells[now]
      ? '<p class="now-note yes">Good news: you can plant this now (' + esc(METHODS[p.cells[now]].label.toLowerCase()) + ").</p>"
      : '<p class="now-note">Not a planting time right now (' + esc(halfName(now)) + ").</p>";

    function fact(label, value) {
      return '<div class="fact"><dt>' + esc(label) + "</dt><dd>" + esc(value) + "</dd></div>";
    }

    var sources = p.sources.map(function (k) {
      var s = SOURCES[k];
      return s ? '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.title) + "</a></li>" : "";
    }).join("");

    var html = '<article class="page plant">' +
      '<nav class="crumbs" aria-label="Breadcrumb"><a href="#/plants">← All plants</a></nav>' +
      '<div class="plant-hero">' +
      '<figure class="plant-photo">' + photoImg(p, "plant-img", false) +
      (ph ? '<figcaption class="credit">' + photoCredit(ph) + "</figcaption>" : "") + "</figure>" +
      '<div class="plant-intro">' +
      '<div class="tags"><span class="tag season-' + p.season + '">' + esc(SEASONS[p.season].label) + "</span>" +
      '<span class="tag">' + esc(CATEGORIES[p.category]) + "</span></div>" +
      "<h1>" + esc(p.name) + "</h1>" +
      '<p class="lead">' + esc(p.summary) + "</p>" +
      '<section class="when" aria-labelledby="when-title"><h2 id="when-title">When to plant</h2>' +
      strip + windows + nowNote + "</section>" +
      "</div></div>" +

      '<section aria-labelledby="facts-title"><h2 id="facts-title">Growing facts</h2><dl class="facts">' +
      fact("Time to harvest", p.timeToHarvest) +
      fact("Spacing", p.spacing) +
      fact("Water", p.water) +
      fact("Sun", p.sun) +
      fact("Growth", p.growth) +
      fact("Typical yield", p.yield) +
      "</dl></section>" +

      '<section aria-labelledby="tips-title"><h2 id="tips-title">Phoenix growing tips</h2><ul class="tips">' +
      p.tips.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></section>" +

      (lightboxItems.length
        ? '<section class="plant-gallery" aria-labelledby="photos-title"><h2 id="photos-title">Photos</h2>' +
          photoGrid(lightboxItems, 0) + "</section>"
        : "") +

      '<section class="plant-sources" aria-labelledby="src-title"><h2 id="src-title">Sources</h2><ul>' + sources + "</ul>" +
      '<p class="fine">Planting windows come from the sources above. Spacing, yield and tips are general home-garden guidance; results vary with variety, soil and weather.</p></section>' +

      '<nav class="pager" aria-label="More plants">' +
      '<a href="#/plant/' + prev.id + '">← ' + esc(prev.name) + "</a>" +
      '<a href="#/plant/' + next.id + '">' + esc(next.name) + " →</a></nav>" +
      "</article>";

    setView(html, p.name);
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
        '<h2><a href="#/plant/' + p.id + '">' + esc(p.name) + "</a></h2>" +
        photoGrid(items, lightboxItems.length) + "</section>";
      lightboxItems = lightboxItems.concat(items);
    });

    var jump = '<label class="jump"><span class="visually-hidden">Jump to a plant</span><select data-jump>' +
      '<option value="">Jump to a plant…</option>' +
      plants.map(function (p) { return '<option value="' + p.id + '">' + esc(p.name) + "</option>"; }).join("") +
      "</select></label>";

    var html = '<section class="page">' +
      '<div class="page-head"><h1>Gallery</h1><p>' + lightboxItems.length +
      " photos: the harvest and the whole plant for every crop in the guide. Click a photo to see it larger.</p></div>" +
      '<div class="toolbar">' +
      segmented("galleryCategory", [["all", "All"], ["vegetable", "Vegetables"], ["fruit", "Fruit"], ["herb", "Herbs"]],
        state.galleryCategory, "Plant type") +
      segmented("galleryKind", [["all", "All photos"], ["harvest", "The harvest"], ["plant", "Whole plants"]],
        state.galleryKind, "Photo type") +
      jump + "</div>" +
      (groups || '<p class="empty">No photos match these filters.</p>') + "</section>";
    setView(html, "Gallery");
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
    img.alt = ph.alt;
    lightbox.querySelector(".lightbox-caption").innerHTML =
      "<strong>" + esc(p.name) + '<span class="lightbox-kind"> · ' + esc(KINDS[ph.kind]) + "</span></strong>" +
      '<span class="lightbox-count">' + (lightboxIndex + 1) + " of " + lightboxItems.length + "</span>" +
      '<a class="lightbox-link" href="#/plant/' + p.id + '" data-lightbox="close">Open growing guide →</a>' +
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
      return "<li><strong>" + esc(p.name) + "</strong><ul>" + photosOf(p).map(function (ph) {
        return "<li>" + esc(KINDS[ph.kind]) + ": " + photoCredit(ph) + "</li>";
      }).join("") + "</ul></li>";
    }).join("");
    var sources = Object.keys(SOURCES).map(function (k) {
      var s = SOURCES[k];
      return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.title) + "</a>" +
        (s.note ? '<span class="fine"> ' + esc(s.note) + "</span>" : "") + "</li>";
    }).join("");

    var html = '<article class="page prose">' +
      "<h1>About this guide</h1>" +
      "<p>Phoenix Garden Guide is a quick reference for growing vegetables and fruit in the Phoenix metro area " +
      "(the “low desert” of Maricopa County). It works offline in any web browser.</p>" +

      "<h2>Two growing seasons, not one</h2>" +
      "<p>Phoenix gardens run backwards compared to most of the country. Summer heat, not winter cold, is the hard season. " +
      "There are two main planting times:</p><ul>" +
      "<li><strong>Fall (late August to November)</strong> for cool-season crops such as lettuce, broccoli, carrots, peas and onions, which grow through the mild winter.</li>" +
      "<li><strong>Late winter to spring (mid-February to April)</strong> for warm-season crops such as tomatoes, squash, melons and corn, which need to fruit before June heat.</li></ul>" +
      "<p>A few crops (okra, black-eyed peas, sweet potatoes, Armenian cucumbers) actually thrive through summer. Light frosts can happen on some winter nights, so keep frost cloth handy for tender plants.</p>" +

      "<h2>How to read the calendar</h2>" +
      "<p>Each month is split into two halves (the 1st to the 14th, and the 15th to the end), matching the University of Arizona chart. Colors show how to plant:</p>" +
      legend() +
      "<p>An empty square means that period is not recommended for planting that crop in the Extension guide.</p>" +

      "<h2>Watering basics</h2><ul>" +
      "<li>Water deeply and less often rather than a little every day. Most vegetables root in the top 1 to 2 feet; trees much deeper.</li>" +
      "<li>Push a long screwdriver or soil probe into the soil after watering: it slides easily through moist soil and shows how deep the water went.</li>" +
      "<li>Drip irrigation and a 2 to 3 inch layer of mulch save a lot of water and keep roots cooler.</li>" +
      "<li>In summer, vegetable beds may need water daily; in winter, every several days is often enough.</li></ul>" +

      "<h2>Sources</h2>" +
      "<p>Planting windows come from University of Arizona Cooperative Extension publications. Check your local " +
      '<a href="https://extension.arizona.edu/maricopa" target="_blank" rel="noopener">Maricopa County Extension</a> ' +
      "office or Master Gardeners for the latest advice.</p><ul class=\"source-list\">" + sources + "</ul>" +
      '<p class="fine">Spacing, watering, yield and tips are general home-garden guidance compiled for this app; ' +
      "results vary with variety, soil, microclimate and weather.</p>" +

      "<h2>Photo credits</h2>" +
      "<p>All photos are from Wikimedia Commons and are used under the license shown.</p>" +
      '<details class="credits"><summary>Show credits for all ' + photoCount + " photos</summary>" +
      '<ul class="credit-list">' + credits + "</ul></details>" +
      "</article>";
    setView(html, "About");
  }

  function renderNotFound() {
    setView('<section class="page"><h1>Page not found</h1><p><a href="#/calendar">Go to the planting calendar</a></p></section>', "Not found");
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
    var t = e.target;

    var seg = t.closest("button[data-filter]");
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

    var step = t.closest("[data-step]");
    if (step) {
      state.half = (state.half + parseInt(step.getAttribute("data-step"), 10) + 24) % 24;
      renderCalendarKeepScroll();
      return;
    }

    if (t.closest("[data-today]")) {
      state.half = todayHalf();
      renderCalendarKeepScroll();
      return;
    }

    var half = t.closest("[data-half]");
    if (half && half.closest(".cal")) {
      state.half = parseInt(half.getAttribute("data-half"), 10);
      renderCalendarKeepScroll();
      return;
    }

    var photo = t.closest("[data-photo]");
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

  window.addEventListener("hashchange", route);
  route();
})();
