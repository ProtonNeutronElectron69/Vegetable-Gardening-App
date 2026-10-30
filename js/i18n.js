/*
  Interface text in English (en) and Vietnamese (vi), side by side.
  Vietnamese uses the Southern dialect (Saigon / Nam Bộ vocabulary): trái (not quả),
  bông (flower), bắp (corn), đậu (beans), dưa leo, bông cải, cải thìa, bí đỏ, coi, vô.
  See CLAUDE.md for the glossary.

  {name} placeholders are filled in by t() in js/app.js. English and Vietnamese may use
  different placeholders for the same key (dates are "Feb 15" in English but "15/2" in
  Vietnamese), so the app passes every value either language needs.
  Keys ending in "Html" contain trusted markup written here, not visitor data.
  Plant and source text lives in js/data/plants.vi.js and js/data/sources.vi.js.
*/
window.I18N = {
  // ---------------------------------------------------------------- site
  "site.name": { en: "Phoenix Garden Guide", vi: "Cẩm nang làm vườn Phoenix" },
  "site.tag": { en: "Vegetables & fruit for the low desert", vi: "Rau củ & trái cây cho vùng sa mạc thấp" },
  "site.description": {
    en: "Planting calendar and growing guide for vegetables and fruit in the Phoenix, Arizona metro area.",
    vi: "Lịch trồng và hướng dẫn trồng rau củ, trái cây ở khu vực Phoenix, Arizona."
  },
  "site.home": { en: "Phoenix Garden Guide home", vi: "Trang chủ Cẩm nang làm vườn Phoenix" },
  "site.skip": { en: "Skip to content", vi: "Chuyển tới nội dung chính" },
  "site.noscript": { en: "This guide needs JavaScript turned on in your browser.", vi: "Cẩm nang này cần bật JavaScript trong trình duyệt." },
  "site.footerHtml": {
    en: 'Planting dates follow University of Arizona Cooperative Extension guides for Maricopa County. Photos from Wikimedia Commons; see <a href="#/about">About</a> for sources and credits.',
    vi: 'Thời điểm trồng theo hướng dẫn của Cooperative Extension, Đại học Arizona, cho quận Maricopa. Hình ảnh từ Wikimedia Commons; coi trang <a href="#/about">Giới thiệu</a> để biết nguồn và tác giả.'
  },

  "nav.label": { en: "Main", vi: "Điều hướng chính" },
  "nav.calendar": { en: "Calendar", vi: "Lịch trồng" },
  "nav.plants": { en: "Plants", vi: "Cây trồng" },
  "nav.gallery": { en: "Gallery", vi: "Hình ảnh" },
  "nav.about": { en: "About", vi: "Giới thiệu" },

  "lang.group": { en: "Language", vi: "Ngôn ngữ" },

  "theme.button": { en: "Theme", vi: "Giao diện" },
  "theme.menu": { en: "Choose a theme", vi: "Chọn giao diện" },
  "theme.patch": { en: ["Sunny Patch", "Cartoon"], vi: ["Vườn Nắng", "Hoạt hình"] },
  "theme.sonoran": { en: ["Sonoran Sunset", "Desert dusk"], vi: ["Hoàng hôn Sonoran", "Chiều tà sa mạc"] },
  "theme.plot": { en: ["Garden Plot", "Simple shapes"], vi: ["Luống Vườn", "Hình khối đơn giản"] },
  "theme.harvest": { en: ["Raised Bed", "Garden photo"], vi: ["Luống Cao", "Ảnh khu vườn"] },
  "theme.packet": { en: ["Seed Packet", "Vintage print"], vi: ["Gói Hạt Giống", "Kiểu in xưa"] },
  "theme.classic": { en: ["Classic", "Original look"], vi: ["Cổ điển", "Giao diện gốc"] },

  // ---------------------------------------------------------------- dates
  // Calendar column headings, then the compact form used on narrow screens.
  "months.short": {
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    vi: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"]
  },
  "months.tiny": {
    en: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    vi: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
  },
  "months.long": {
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    vi: ["tháng 1", "tháng 2", "tháng 3", "tháng 4", "tháng 5", "tháng 6", "tháng 7", "tháng 8", "tháng 9", "tháng 10", "tháng 11", "tháng 12"]
  },
  // {month} = full month name, {mon} = short name, {n} = month number, {d} = day, {end} = last day
  "half.early": { en: "Early {month}", vi: "Đầu tháng {n}" },
  "half.late": { en: "Late {month}", vi: "Cuối tháng {n}" },
  "range.early": { en: "{mon} 1–14", vi: "1–14/{n}" },
  "range.late": { en: "{mon} 15–{end}", vi: "15–{end}/{n}" },
  "date.day": { en: "{mon} {d}", vi: "{d}/{n}" },
  "date.wholeMonth": { en: "All of {month}", vi: "Cả {month}" },

  // ---------------------------------------------------------------- shared labels
  "method.S": { en: "Seeds", vi: "Gieo hạt" },
  "method.T": { en: "Transplants", vi: "Trồng cây con" },
  "method.B": { en: "Seeds or transplants", vi: "Hạt hoặc cây con" },
  "method.X": { en: "Sets, cloves or tubers", vi: "Củ hoặc tép giống" },
  "method.P": { en: "Nursery plants", vi: "Cây giống" },

  "category.vegetable": { en: "Vegetable", vi: "Rau củ" },
  "category.fruit": { en: "Fruit", vi: "Trái cây" },
  "category.herb": { en: "Herb", vi: "Rau thơm" },

  "season.warm": { en: "Warm season", vi: "Mùa nóng" },
  "season.cool": { en: "Cool season", vi: "Mùa mát" },
  "season.perennial": { en: "Perennial", vi: "Lâu năm" },
  "group.warm": { en: "Warm-season crops", vi: "Cây trồng mùa nóng" },
  "group.cool": { en: "Cool-season crops", vi: "Cây trồng mùa mát" },
  "group.perennial": { en: "Trees, vines & perennials", vi: "Cây ăn trái, dây leo & cây lâu năm" },

  // Photo kinds: label on the photo, then the lowercase form used in descriptions.
  "kind.produce": { en: ["The harvest", "harvest"], vi: ["Thu hoạch", "phần thu hoạch"] },
  "kind.plant": { en: ["Whole plant", "whole plant"], vi: ["Cả cây", "cả cây"] },
  "kind.closeup": { en: ["Close-up", "close-up"], vi: ["Cận cảnh", "cận cảnh"] },

  "filter.searchLabel": { en: "Search plants", vi: "Tìm cây trồng" },
  "filter.search": { en: "Search plants…", vi: "Tìm cây trồng…" },
  "filter.typeLabel": { en: "Plant type", vi: "Loại cây" },
  "filter.all": { en: "All", vi: "Tất cả" },
  "filter.vegetables": { en: "Vegetables", vi: "Rau củ" },
  "filter.fruit": { en: "Fruit", vi: "Trái cây" },
  "filter.herbs": { en: "Herbs", vi: "Rau thơm" },
  "filter.seasonLabel": { en: "Growing season", vi: "Mùa trồng" },
  "filter.anySeason": { en: "Any season", vi: "Mọi mùa" },
  "filter.warm": { en: "Warm", vi: "Nóng" },
  "filter.cool": { en: "Cool", vi: "Mát" },
  "filter.perennial": { en: "Perennial", vi: "Lâu năm" },
  "filter.noPlants": { en: "No plants match these filters.", vi: "Không có cây nào khớp với bộ lọc." },
  "legend.label": { en: "Legend", vi: "Chú thích" },

  "photo.credit": { en: "Photo: {artist}", vi: "Ảnh: {artist}" },
  "photo.unknown": { en: "Unknown", vi: "Không rõ" },
  "photo.viewLarger": { en: "{plant}, {kind}: view larger", vi: "{plant}, {kind}: coi hình lớn" },
  "source.english": { en: "", vi: " (tiếng Anh)" },

  // ---------------------------------------------------------------- calendar page
  "cal.title": { en: "Planting calendar", vi: "Lịch trồng" },
  "cal.intro": {
    en: "When to plant vegetables and fruit in the Phoenix metro area (low desert, about 1,100 feet). Pick a plant to see spacing, watering and growing tips.",
    vi: "Khi nào trồng rau củ và trái cây ở khu vực Phoenix (vùng sa mạc thấp, cao khoảng 1.100 feet, tức 335 m). Bấm vô một loại cây để coi khoảng cách, cách tưới và mẹo trồng."
  },
  "cal.prev": { en: "Previous half-month", vi: "Nửa tháng trước" },
  "cal.next": { en: "Next half-month", vi: "Nửa tháng sau" },
  "cal.plantNow": { en: "Plant now", vi: "Trồng bây giờ" },
  "cal.whatToPlant": { en: "What to plant", vi: "Nên trồng gì" },
  "cal.isToday": { en: " · this is today", vi: " · hôm nay" },
  "cal.backToday": { en: "Back to today", vi: "Về hôm nay" },
  "cal.countOne": { en: "1 plant can go in the ground", vi: "Có 1 loại cây xuống giống được" },
  "cal.countMany": { en: "{n} plants can go in the ground", vi: "Có {n} loại cây xuống giống được" },
  "cal.empty": {
    en: "Nothing on the planting chart for this period. It is a good time to plan, prepare beds and harvest.",
    vi: "Không có cây nào trong lịch trồng cho khoảng thời gian này. Đây là lúc tốt để lên kế hoạch, chuẩn bị luống và thu hoạch."
  },
  "cal.onlyFor": { en: "Only show plants for {half}", vi: "Chỉ hiện cây trồng được vào {halfLower}" },
  "cal.hint": {
    en: "Tip: click any column to see what to plant in that half of the month.",
    vi: "Mẹo: bấm vô bất kỳ cột nào để coi nên trồng gì trong nửa tháng đó."
  },
  "cal.scrollLabel": { en: "Planting chart, scrolls sideways", vi: "Bảng lịch trồng, kéo ngang để coi thêm" },
  "cal.plantColumn": { en: "Plant", vi: "Cây trồng" },
  "cal.caption": { en: "Planting windows by half-month", vi: "Thời điểm trồng theo từng nửa tháng" },
  "cal.notOnChart": { en: "not on the chart", vi: "không có trong lịch" },

  // ---------------------------------------------------------------- plant list
  "plants.title": { en: "Plants", vi: "Cây trồng" },
  "plants.intro": {
    en: "{n} vegetables, herbs and fruits that grow well in the Phoenix area.",
    vi: "{n} loại rau củ, rau thơm và trái cây trồng tốt ở vùng Phoenix."
  },
  "plants.canPlantNow": { en: "Can plant now ({half})", vi: "Trồng được bây giờ ({halfLower})" },
  "plants.tagNow": { en: "Plant now", vi: "Trồng được" },

  // ---------------------------------------------------------------- plant page
  "plant.back": { en: "← All plants", vi: "← Tất cả cây trồng" },
  "plant.breadcrumb": { en: "Breadcrumb", vi: "Đường dẫn" },
  "plant.months": { en: "{name} planting months", vi: "Các tháng trồng {name}" },
  "plant.when": { en: "When to plant", vi: "Khi nào trồng" },
  "plant.nowYes": { en: "Good news: you can plant this now ({method}).", vi: "Tin vui: bây giờ bạn trồng được cây này ({method})." },
  "plant.nowNo": { en: "Not a planting time right now ({half}).", vi: "Bây giờ ({halfLower}) chưa phải lúc trồng." },
  "plant.facts": { en: "Growing facts", vi: "Thông tin trồng trọt" },
  "fact.timeToHarvest": { en: "Time to harvest", vi: "Thời gian thu hoạch" },
  "fact.spacing": { en: "Spacing", vi: "Khoảng cách" },
  "fact.water": { en: "Water", vi: "Tưới nước" },
  "fact.sun": { en: "Sun", vi: "Nắng" },
  "fact.growth": { en: "Growth", vi: "Sinh trưởng" },
  "fact.yield": { en: "Typical yield", vi: "Sản lượng thường gặp" },
  "plant.tips": { en: "Phoenix growing tips", vi: "Mẹo trồng ở Phoenix" },
  "plant.photos": { en: "Photos", vi: "Hình ảnh" },
  "plant.sources": { en: "Sources", vi: "Nguồn tham khảo" },
  "plant.sourcesNote": {
    en: "Planting windows come from the sources above. Spacing, yield and tips are general home-garden guidance; results vary with variety, soil and weather.",
    vi: "Thời điểm trồng lấy từ các nguồn trên. Khoảng cách, sản lượng và mẹo trồng là hướng dẫn chung cho vườn nhà; kết quả thay đổi tùy giống, đất và thời tiết."
  },
  "plant.more": { en: "More plants", vi: "Cây khác" },

  // ---------------------------------------------------------------- gallery
  "gallery.title": { en: "Gallery", vi: "Hình ảnh" },
  "gallery.intro": {
    en: "{n} photos: the harvest and the whole plant for every crop in the guide. Click a photo to see it larger.",
    vi: "{n} hình: phần thu hoạch và cả cây của mọi loại cây trong cẩm nang. Bấm vô hình để coi lớn hơn."
  },
  "gallery.photoType": { en: "Photo type", vi: "Loại hình" },
  "gallery.allPhotos": { en: "All photos", vi: "Tất cả hình" },
  "gallery.harvest": { en: "The harvest", vi: "Thu hoạch" },
  "gallery.wholePlants": { en: "Whole plants", vi: "Cả cây" },
  "gallery.jumpLabel": { en: "Jump to a plant", vi: "Đi tới một loại cây" },
  "gallery.jump": { en: "Jump to a plant…", vi: "Đi tới loại cây…" },
  "gallery.none": { en: "No photos match these filters.", vi: "Không có hình nào khớp với bộ lọc." },

  "viewer.label": { en: "Photo viewer", vi: "Trình xem hình" },
  "viewer.close": { en: "Close photo viewer", vi: "Đóng trình xem hình" },
  "viewer.prev": { en: "Previous photo", vi: "Hình trước" },
  "viewer.next": { en: "Next photo", vi: "Hình kế tiếp" },
  "viewer.count": { en: "{i} of {n}", vi: "{i} / {n}" },
  "viewer.guide": { en: "Open growing guide →", vi: "Mở hướng dẫn trồng →" },

  // ---------------------------------------------------------------- about
  "about.title": { en: "About this guide", vi: "Giới thiệu cẩm nang" },
  "about.intro": {
    en: "Phoenix Garden Guide is a quick reference for growing vegetables and fruit in the Phoenix metro area (the “low desert” of Maricopa County). It works offline in any web browser.",
    vi: "Cẩm nang làm vườn Phoenix là tài liệu tra cứu nhanh về cách trồng rau củ và trái cây ở khu vực Phoenix (vùng “sa mạc thấp” của quận Maricopa). Trang này chạy được trên mọi trình duyệt, kể cả khi không có mạng."
  },
  "about.seasons": { en: "Two growing seasons, not one", vi: "Hai mùa trồng, chớ không phải một" },
  "about.seasonsIntro": {
    en: "Phoenix gardens run backwards compared to most of the country. Summer heat, not winter cold, is the hard season. There are two main planting times:",
    vi: "Làm vườn ở Phoenix ngược với phần lớn nước Mỹ. Mùa khó khăn là cái nóng mùa hè, chớ không phải cái lạnh mùa đông. Có hai thời điểm trồng chính:"
  },
  "about.fallHtml": {
    en: "<strong>Fall (late August to November)</strong> for cool-season crops such as lettuce, broccoli, carrots, peas and onions, which grow through the mild winter.",
    vi: "<strong>Mùa thu (cuối tháng 8 đến tháng 11)</strong> cho cây trồng mùa mát như xà lách, bông cải xanh, cà rốt, đậu Hà Lan và hành tây, lớn suốt mùa đông ấm áp."
  },
  "about.springHtml": {
    en: "<strong>Late winter to spring (mid-February to April)</strong> for warm-season crops such as tomatoes, squash, melons and corn, which need to fruit before June heat.",
    vi: "<strong>Cuối đông đến mùa xuân (giữa tháng 2 đến tháng 4)</strong> cho cây trồng mùa nóng như cà chua, bí, dưa và bắp, vì cần ra trái trước cái nóng tháng 6."
  },
  "about.summer": {
    en: "A few crops (okra, black-eyed peas, sweet potatoes, Armenian cucumbers) actually thrive through summer. Light frosts can happen on some winter nights, so keep frost cloth handy for tender plants.",
    vi: "Một vài loại (đậu bắp, đậu mắt đen, khoai lang, dưa leo Armenia) lại sống khỏe qua mùa hè. Có những đêm mùa đông bị sương giá nhẹ, nên để sẵn vải che sương cho các cây yếu."
  },
  "about.read": { en: "How to read the calendar", vi: "Cách đọc lịch trồng" },
  "about.readIntro": {
    en: "Each month is split into two halves (the 1st to the 14th, and the 15th to the end), matching the University of Arizona chart. Colors show how to plant:",
    vi: "Mỗi tháng chia làm hai nửa (từ ngày 1 đến ngày 14, và từ ngày 15 đến cuối tháng), giống bảng của Đại học Arizona. Màu sắc cho biết cách trồng:"
  },
  "about.readEmpty": {
    en: "An empty square means that period is not recommended for planting that crop in the Extension guide.",
    vi: "Ô trống nghĩa là theo hướng dẫn của Extension, khoảng thời gian đó không nên trồng loại cây đó."
  },
  "about.water": { en: "Watering basics", vi: "Tưới nước cơ bản" },
  "about.water1": {
    en: "Water deeply and less often rather than a little every day. Most vegetables root in the top 1 to 2 feet; trees much deeper.",
    vi: "Tưới sâu và thưa, đừng tưới mỗi ngày một chút. Phần lớn rau củ có rễ trong khoảng 1–2 feet (30–60 cm) đất trên mặt; cây ăn trái thì rễ sâu hơn nhiều."
  },
  "about.water2": {
    en: "Push a long screwdriver or soil probe into the soil after watering: it slides easily through moist soil and shows how deep the water went.",
    vi: "Sau khi tưới, cắm một cây tua vít dài hoặc que thử đất xuống: đất ẩm thì que xuyên xuống dễ, nhờ vậy biết nước đã thấm sâu tới đâu."
  },
  "about.water3": {
    en: "Drip irrigation and a 2 to 3 inch layer of mulch save a lot of water and keep roots cooler.",
    vi: "Tưới nhỏ giọt và phủ gốc dày 2–3 inch (5–8 cm) giúp tiết kiệm nhiều nước và giữ rễ mát hơn."
  },
  "about.water4": {
    en: "In summer, vegetable beds may need water daily; in winter, every several days is often enough.",
    vi: "Mùa hè, luống rau có thể cần tưới mỗi ngày; mùa đông thì vài ngày tưới một lần thường là đủ."
  },
  "about.sources": { en: "Sources", vi: "Nguồn tham khảo" },
  "about.sourcesHtml": {
    en: 'Planting windows come from University of Arizona Cooperative Extension publications. Check your local <a href="https://extension.arizona.edu/maricopa" target="_blank" rel="noopener">Maricopa County Extension</a> office or Master Gardeners for the latest advice.',
    vi: 'Thời điểm trồng lấy từ các tài liệu của Cooperative Extension thuộc Đại học Arizona (bằng tiếng Anh). Hỏi văn phòng <a href="https://extension.arizona.edu/maricopa" target="_blank" rel="noopener">Extension quận Maricopa</a> hoặc các Master Gardener ở địa phương để có lời khuyên mới nhất.'
  },
  "about.sourcesNote": {
    en: "Spacing, watering, yield and tips are general home-garden guidance compiled for this app; results vary with variety, soil, microclimate and weather.",
    vi: "Khoảng cách, cách tưới, sản lượng và mẹo trồng là hướng dẫn chung cho vườn nhà, được tổng hợp cho ứng dụng này; kết quả thực tế thay đổi tùy giống, đất, vi khí hậu và thời tiết."
  },
  "about.credits": { en: "Photo credits", vi: "Nguồn hình ảnh" },
  "about.creditsIntro": {
    en: "All photos are from Wikimedia Commons and are used under the license shown.",
    vi: "Tất cả hình ảnh lấy từ Wikimedia Commons và được dùng theo giấy phép ghi kèm."
  },
  "about.creditsShow": { en: "Show credits for all {n} photos", vi: "Hiện nguồn của tất cả {n} hình" },

  // ---------------------------------------------------------------- not found
  "notFound.title": { en: "Page not found", vi: "Không tìm thấy trang" },
  "notFound.link": { en: "Go to the planting calendar", vi: "Về lịch trồng" }
};
