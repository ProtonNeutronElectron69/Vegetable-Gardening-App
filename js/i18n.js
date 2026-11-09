/*
  Interface text in English (en) and Vietnamese (vi), side by side.
  Vietnamese uses the Southern dialect (Saigon / Nam Bộ vocabulary): trái (not quả),
  bông (flower), bắp (corn), đậu (beans), dưa leo, bông cải, cải thìa, bí đỏ, coi, vô.
  See CLAUDE.md for the glossary.

  {name} placeholders are filled in by t() in js/app.js. English and Vietnamese may use
  different placeholders for the same key (dates are "Feb 15" in English but "15/2" in
  Vietnamese), so the app passes every value either language needs.
  Keys ending in "Html" contain trusted markup written here, not visitor data.
  Plant, source, task and pest text lives in the *.vi.js files in js/data/.
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
    en: 'Planting dates follow University of Arizona Cooperative Extension guides for Maricopa County. Photos from Wikimedia Commons, iNaturalist and Flickr; see <a href="#/about">About</a> for sources and credits.',
    vi: 'Thời điểm trồng theo hướng dẫn của Cooperative Extension, Đại học Arizona, cho quận Maricopa. Hình ảnh từ Wikimedia Commons, iNaturalist và Flickr; coi trang <a href="#/about">Giới thiệu</a> để biết nguồn và tác giả.'
  },

  "nav.label": { en: "Main", vi: "Điều hướng chính" },
  "nav.calendar": { en: "Calendar", vi: "Lịch trồng" },
  "nav.plants": { en: "Plants", vi: "Cây trồng" },
  "nav.care": { en: "Garden care", vi: "Chăm sóc" },
  "nav.gallery": { en: "Gallery", vi: "Hình ảnh" },
  "nav.about": { en: "About", vi: "Giới thiệu" },
  // Shorter tab names for small phones
  "nav.calendarShort": { en: "Calendar", vi: "Lịch" },
  "nav.plantsShort": { en: "Plants", vi: "Cây" },
  "nav.careShort": { en: "Care", vi: "Chăm sóc" },
  "nav.galleryShort": { en: "Gallery", vi: "Hình" },
  "nav.aboutShort": { en: "About", vi: "Giới thiệu" },

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
  "filter.container": { en: "Good in containers", vi: "Trồng chậu được" },
  "filter.shade": { en: "Tolerates some shade", vi: "Chịu được chỗ hơi râm" },
  "tag.container": { en: "Grows in pots", vi: "Trồng chậu được" },
  "tag.shade": { en: "Tolerates part shade", vi: "Chịu hơi râm" },
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
  "cal.careLink": { en: "This month's garden jobs →", vi: "Việc làm vườn tháng này →" },
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
  "plant.varieties": { en: "Varieties:", vi: "Chọn giống:" },
  "plant.waterLink": { en: "Seasonal watering guide →", vi: "Hướng dẫn tưới theo mùa →" },
  "plant.watchFor": { en: "Pests and problems to watch for", vi: "Sâu bệnh cần coi chừng" },

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
  "viewer.pestGuide": { en: "Open pest guide →", vi: "Mở hướng dẫn sâu bệnh →" },

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
  "about.care": { en: "Watering, monthly jobs and pests", vi: "Tưới nước, việc từng tháng và sâu bệnh" },
  "about.careHtml": {
    en: 'The <a href="#/care">Garden care</a> section has a month-by-month to-do list, a seasonal <a href="#/water">watering guide</a> and a guide to common <a href="#/pests">pests and problems</a>.',
    vi: 'Mục <a href="#/care">Chăm sóc</a> có danh sách việc cần làm từng tháng, <a href="#/water">hướng dẫn tưới nước</a> theo mùa và hướng dẫn về các loại <a href="#/pests">sâu bệnh và sự cố</a> thường gặp.'
  },
  "about.sources": { en: "Sources", vi: "Nguồn tham khảo" },
  "sourceGroup.plants": { en: "Planting and growing", vi: "Trồng và chăm cây" },
  "sourceGroup.care": { en: "Watering and garden care", vi: "Tưới nước và chăm sóc vườn" },
  "sourceGroup.pests": { en: "Pests and diseases", vi: "Sâu bệnh" },
  "sourceGroup.monthly": { en: "Monthly reminders (southern Arizona garden calendar)", vi: "Lời nhắc hằng tháng (lịch làm vườn miền nam Arizona)" },
  "sourceGroup.monthlyNote": {
    en: "One sheet per month from the University of Arizona Cooperative Extension, written for the Tucson area. The monthly garden jobs come from them, adjusted for Phoenix where the timing differs; the March sheet is also the source for fruit tree planting times.",
    vi: "Mỗi tháng một tờ của Cooperative Extension, Đại học Arizona, viết cho vùng Tucson. Các việc làm vườn từng tháng lấy từ đây, có chỉnh lại cho hợp với Phoenix ở những chỗ thời điểm khác nhau; tờ tháng 3 cũng là nguồn cho thời điểm trồng cây ăn trái."
  },
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
    en: "Plant photos are from Wikimedia Commons; pest photos are from iNaturalist and Flickr. All are used under the free license shown.",
    vi: "Hình cây trồng lấy từ Wikimedia Commons; hình sâu bệnh lấy từ iNaturalist và Flickr. Tất cả đều được dùng theo giấy phép tự do ghi kèm."
  },
  "about.creditsShow": { en: "Show credits for all {n} photos", vi: "Hiện nguồn của tất cả {n} hình" },

  // ---------------------------------------------------------------- garden care (shared)
  "care.eyebrow": { en: "Garden care", vi: "Chăm sóc vườn" },
  "care.sections": { en: "Garden care sections", vi: "Các mục chăm sóc vườn" },
  "care.tabMonth": { en: "Month by month", vi: "Việc từng tháng" },
  "care.tabWater": { en: "Watering", vi: "Tưới nước" },
  "care.tabPests": { en: "Pests & problems", vi: "Sâu bệnh & sự cố" },

  // ---------------------------------------------------------------- month by month
  "tasks.title": { en: "Month-by-month garden jobs", vi: "Việc làm vườn từng tháng" },
  "tasks.intro": {
    en: "What to do in a Phoenix-area vegetable and fruit garden each month: watering, feeding, protecting plants from frost and heat, and pests to watch for.",
    vi: "Những việc cần làm mỗi tháng cho vườn rau và cây ăn trái ở khu vực Phoenix: tưới nước, bón phân, che chắn cây khỏi sương giá và nắng nóng, và các loại sâu bệnh cần coi chừng."
  },
  "tasks.eyebrowNow": { en: "This month", vi: "Tháng này" },
  "tasks.eyebrow": { en: "Garden jobs for", vi: "Việc làm vườn" },
  "tasks.monthTitle": { en: "{month}", vi: "Tháng {n}" },
  "tasks.prev": { en: "Previous month", vi: "Tháng trước" },
  "tasks.next": { en: "Next month", vi: "Tháng sau" },
  "tasks.backNow": { en: "Back to this month", vi: "Về tháng này" },
  "tasks.pickMonth": { en: "Choose a month", vi: "Chọn tháng" },
  "tasks.plantTitle": { en: "Plant this month", vi: "Trồng gì trong tháng này" },
  "tasks.plantIntro": {
    en: "From the planting calendar. Some can only go in during part of the month; open a plant for its exact dates.",
    vi: "Lấy từ lịch trồng. Có cây chỉ trồng được trong nửa tháng; mở từng cây để coi ngày cụ thể."
  },
  "tasks.plantNone": { en: "Nothing on the planting calendar this month.", vi: "Tháng này không có cây nào trong lịch trồng." },
  "tasks.todoTitle": { en: "To-do list", vi: "Việc cần làm" },
  "tasks.group.protect": { en: "Protect from frost, heat and animals", vi: "Che chắn khỏi sương giá, nắng nóng và thú phá" },
  "tasks.group.water": { en: "Watering", vi: "Tưới nước" },
  "tasks.group.feed": { en: "Feeding and soil", vi: "Bón phân và làm đất" },
  "tasks.group.pests": { en: "Pests", vi: "Sâu bệnh" },
  "tasks.group.care": { en: "Pruning, harvest and chores", vi: "Tỉa cành, thu hoạch và việc vặt" },
  "tasks.see": { en: "See:", vi: "Coi thêm:" },
  "tasks.watchTitle": { en: "Pests and problems to watch for", vi: "Sâu bệnh cần coi chừng" },
  "tasks.sources": { en: "Sources for this month", vi: "Nguồn tham khảo của tháng này" },
  "tasks.note": {
    en: "Most tasks come from the University of Arizona Cooperative Extension's monthly reminders for southern Arizona, adjusted for Phoenix. Your yard may run a little warmer or colder than the Valley average.",
    vi: "Phần lớn các việc lấy từ lời nhắc hằng tháng cho miền nam Arizona của Cooperative Extension, Đại học Arizona, có chỉnh lại cho hợp với Phoenix. Vườn nhà bạn có thể ấm hơn hoặc lạnh hơn mức trung bình của thung lũng một chút."
  },

  // ---------------------------------------------------------------- watering guide
  "water.title": { en: "Watering guide", vi: "Hướng dẫn tưới nước" },
  "water.intro": {
    en: "How often and how deeply to water vegetables and fruit trees in the Phoenix area through the year.",
    vi: "Bao lâu tưới một lần và tưới sâu cỡ nào cho rau củ và cây ăn trái ở khu vực Phoenix, theo từng mùa trong năm."
  },
  "water.basics": { en: "The basics", vi: "Những điều cơ bản" },
  "water.tips": {
    en: [
      "Keep the root zone moist but not soggy. Most vegetables take their water from the top 12 to 24 inches of soil; trees need water much deeper.",
      "Check before you water: when soil from root depth crumbles as you squeeze it, it's time. After watering, push a soil probe or long screwdriver in; it slides easily through moist soil and shows how deep the water went.",
      "Through the year, change how often you water, not how long. Each watering should still soak the whole root zone.",
      "Water early in the morning. Less water is lost to evaporation, and leaves dry off during the day, so there's less disease.",
      "Drip lines and soaker hoses put water right at the roots and cut down on weeds. With drip you'll need to water more often than when flooding a bed.",
      "Seeds and seedlings need light, frequent watering so the surface doesn't dry out or crust over. As plants grow, water less often but longer, so the water reaches deeper.",
      "A 3-inch layer of organic mulch keeps soil moist and cool. Keep it a little away from seedlings and stems.",
      "Pots dry out fastest. In June many need water twice a day; afternoon shade helps.",
      "Our water and soil carry salts. A few times each summer, run one watering two to three times as long as usual to wash salts below the roots."
    ],
    vi: [
      "Giữ vùng rễ ẩm nhưng không sũng nước. Phần lớn rau củ lấy nước từ lớp đất mặt sâu 12–24 inch (30–60 cm); cây lớn cần nước sâu hơn nhiều.",
      "Coi đất trước khi tưới: bốc đất ở độ sâu của rễ, bóp thấy đất vỡ vụn là tới lúc tưới. Tưới xong, cắm que thử đất hoặc cây tua vít dài xuống; đất ẩm thì que xuyên dễ, nhờ vậy biết nước thấm sâu tới đâu.",
      "Qua các mùa, thay đổi số lần tưới chớ không thay đổi thời gian mỗi lần tưới. Lần tưới nào cũng phải thấm hết vùng rễ.",
      "Tưới vào sáng sớm. Nước ít bị bốc hơi hơn, lá kịp khô trong ngày nên ít bệnh hơn.",
      "Ống nhỏ giọt và ống tưới thấm đưa nước thẳng tới rễ và giúp bớt cỏ. Tưới nhỏ giọt thì phải tưới thường hơn so với tưới tràn luống.",
      "Hột giống và cây con cần tưới nhẹ, thường xuyên để mặt đất không bị khô hay đóng váng. Cây lớn dần thì tưới thưa ra nhưng lâu hơn để nước thấm sâu hơn.",
      "Một lớp phủ gốc hữu cơ dày 3 inch (khoảng 8 cm) giữ đất ẩm và mát. Chừa lớp phủ cách cây con và thân cây một chút.",
      "Cây trồng chậu khô nhanh nhất. Tháng 6 nhiều chậu cần tưới ngày hai lần; có bóng mát buổi chiều sẽ đỡ hơn.",
      "Nước và đất ở đây có nhiều muối. Mỗi mùa hè vài lần, cho một lần tưới chạy lâu gấp hai tới ba lần bình thường để rửa muối xuống dưới vùng rễ."
    ]
  },
  "water.scheduleTitle": { en: "How often to water", vi: "Bao lâu tưới một lần" },
  "water.scheduleIntro": {
    en: "Days between waterings for established plants, from the Phoenix-area watering guide. Water more often for new plantings and in unusually hot or dry weather, and less when it's cool or rainy. This season's column is highlighted.",
    vi: "Số ngày giữa hai lần tưới cho cây đã bén rễ, theo hướng dẫn tưới của vùng Phoenix. Cây mới trồng hoặc lúc trời nóng, khô bất thường thì tưới thường hơn; trời mát hoặc có mưa thì tưới ít lại. Cột của mùa hiện tại được tô đậm."
  },
  "water.tableLabel": { en: "Days between waterings by season", vi: "Số ngày giữa hai lần tưới theo mùa" },
  "water.plantCol": { en: "Plants", vi: "Loại cây" },
  "water.depthCol": { en: "Water to a depth of", vi: "Tưới thấm sâu" },
  "water.season.spring": { en: "Spring", vi: "Mùa xuân" },
  "water.season.summer": { en: "Summer", vi: "Mùa hè" },
  "water.season.fall": { en: "Fall", vi: "Mùa thu" },
  "water.season.winter": { en: "Winter", vi: "Mùa đông" },
  "water.now": { en: "now", vi: "hiện tại" },
  "water.row.vegetables": { en: "Vegetables and herbs", vi: "Rau củ và rau thơm" },
  "water.row.vegetablesNote": {
    en: "Listed as annuals in the guide. In the May and June heat, vegetable beds may need water every day.",
    vi: "Trong hướng dẫn gọi là cây một năm. Trời nóng tháng 5, tháng 6 thì luống rau có thể cần tưới mỗi ngày."
  },
  "water.row.fruitTrees": { en: "Fruit trees", vi: "Cây ăn trái" },
  "water.row.fruitTreesNote": {
    en: "The guide's \"high water use\" trees. Wet the soil out to the edge of the branches. Citrus has its own table below.",
    vi: "Nhóm cây \"cần nhiều nước\" trong hướng dẫn. Tưới ướt đất ra tới mép tán cây. Cây có múi có bảng riêng ở dưới."
  },
  "water.days": { en: "{a}–{b} days", vi: "{a}–{b} ngày" },
  "water.daysSame": { en: "{a} days", vi: "{a} ngày" },
  "water.depth": { en: "{a}–{b} in ({ca}–{cb} cm)", vi: "{a}–{b} inch ({ca}–{cb} cm)" },
  "water.citrusTitle": { en: "Citrus trees", vi: "Cây có múi" },
  "water.citrusIntro": {
    en: "Days between waterings by tree age, from the University of Arizona's citrus watering guide (based on Maricopa County). Each time, wet the soil from the trunk to just past the branch tips, at least 2 feet deep. Established trees should not be watered every day.",
    vi: "Số ngày giữa hai lần tưới theo tuổi cây, theo hướng dẫn tưới cây có múi của Đại học Arizona (dựa trên số liệu quận Maricopa). Mỗi lần tưới, làm ướt đất từ gốc ra tới ngoài mép tán một chút, sâu ít nhất 2 feet (60 cm). Cây đã bén rễ thì không nên tưới mỗi ngày."
  },
  "water.citrusLabel": { en: "Citrus watering by tree age", vi: "Lịch tưới cây có múi theo tuổi cây" },
  "water.ageCol": { en: "Tree age", vi: "Tuổi cây" },
  "water.age.newest": { en: "First month after planting", vi: "Tháng đầu sau khi trồng" },
  "water.age.new": { en: "2 to 3 months", vi: "2–3 tháng" },
  "water.age.young": { en: "4 months to 1 year", vi: "4 tháng tới 1 năm" },
  "water.age.twoYears": { en: "1 to 2 years", vi: "1–2 năm" },
  "water.age.mature": { en: "3 years or older", vi: "Từ 3 năm trở lên" },
  "water.allYear": { en: "Every {a}–{b} days, any time of year", vi: "Mỗi {a}–{b} ngày, mùa nào cũng vậy" },
  "water.citrusSign": {
    en: "Curling leaves are usually the first sign that a citrus tree is thirsty.",
    vi: "Lá cuốn lại thường là dấu hiệu đầu tiên cho thấy cây có múi đang khát nước."
  },
  "water.signsTitle": { en: "Too little or too much?", vi: "Thiếu nước hay dư nước?" },
  "water.under": { en: "Signs of too little water", vi: "Dấu hiệu thiếu nước" },
  "water.underList": {
    en: [
      "Older leaves turn yellow or brown and drop",
      "Leaves look dull, wilted or droopy",
      "Leaves curl",
      "Stems or branches die back",
      "It's hard to push a screwdriver into the soil"
    ],
    vi: [
      "Lá già vàng hoặc nâu rồi rụng",
      "Lá xỉn màu, héo hoặc rũ xuống",
      "Lá cuốn lại",
      "Thân hoặc cành khô dần từ ngọn",
      "Khó cắm cây tua vít xuống đất"
    ]
  },
  "water.over": { en: "Signs of too much water", vi: "Dấu hiệu dư nước" },
  "water.overList": {
    en: [
      "Leaves turn a lighter green or yellow",
      "Young shoots wilt",
      "Soft, mushy soil or puddles that don't drain",
      "Algae or mushrooms on or around plants"
    ],
    vi: [
      "Lá nhạt màu hoặc ngả vàng",
      "Đọt non bị héo",
      "Đất mềm nhão hoặc nước đọng thành vũng không rút",
      "Rêu hoặc nấm mọc trên hay quanh gốc cây"
    ]
  },
  "water.sourcesNote": {
    en: "The seasonal schedule is from Landscape Watering by the Numbers, the guide used by Phoenix-area cities. The rest comes from University of Arizona Cooperative Extension publications.",
    vi: "Lịch tưới theo mùa lấy từ Landscape Watering by the Numbers, tài liệu mà các thành phố quanh Phoenix dùng. Phần còn lại lấy từ các tài liệu của Cooperative Extension, Đại học Arizona."
  },

  // ---------------------------------------------------------------- pests
  "pests.title": { en: "Pests and problems", vi: "Sâu bệnh và sự cố" },
  "pests.intro": {
    en: "Common insects, animals, diseases and heat problems in Phoenix-area vegetable and fruit gardens: how to spot them and what to do.",
    vi: "Các loại côn trùng, thú phá vườn, bệnh và sự cố do nắng nóng thường gặp trong vườn rau và cây ăn trái ở khu vực Phoenix: cách nhận biết và cách xử lý."
  },
  "pests.typeLabel": { en: "Kind of problem", vi: "Loại vấn đề" },
  "pests.typeAll": { en: "All", vi: "Tất cả" },
  "pests.type.insect": { en: "Insects & mites", vi: "Côn trùng & nhện" },
  "pests.type.animal": { en: "Animals", vi: "Thú phá vườn" },
  "pests.type.disease": { en: "Diseases & nematodes", vi: "Bệnh & tuyến trùng" },
  "pests.type.condition": { en: "Heat & watering", vi: "Do nắng & tưới" },
  "pests.plantLabel": { en: "Affects", vi: "Gây hại cho" },
  "pests.anyPlant": { en: "Any plant", vi: "Mọi loại cây" },
  "pests.watchNow": { en: "Watch now", vi: "Đang tới mùa" },
  "pests.none": { en: "Nothing matches these filters.", vi: "Không có mục nào khớp với bộ lọc." },
  "pest.back": { en: "← All pests and problems", vi: "← Tất cả sâu bệnh" },
  "pest.when": { en: "When to watch for it", vi: "Khi nào cần coi chừng" },
  "pest.months": { en: "{name}: months to watch", vi: "{name}: các tháng cần coi chừng" },
  "pest.watchYes": { en: "This is the time of year to watch for it.", vi: "Bây giờ đang là lúc cần coi chừng." },
  "pest.watchNo": { en: "Usually not a problem in {month}.", vi: "Thường không gây hại vào {month}." },
  "pest.allYear": { en: "Can show up any time of year.", vi: "Có thể xuất hiện quanh năm." },
  "pest.signs": { en: "How to spot it", vi: "Cách nhận biết" },
  "pest.control": { en: "What to do", vi: "Cách xử lý" },
  "pest.plants": { en: "Plants it affects", vi: "Cây bị hại" },
  "pest.plantsAll": { en: "Seedlings and young plants of all kinds.", vi: "Mọi loại cây con và cây non." },
  "pest.sourcesNote": {
    en: "Product labels change, so always read and follow the label. When in doubt, ask the Maricopa County Extension office or its Master Gardeners.",
    vi: "Nhãn thuốc có thể thay đổi, nên luôn đọc và làm đúng theo nhãn. Khi không chắc, hỏi văn phòng Extension quận Maricopa hoặc các Master Gardener ở đó."
  },
  "pest.more": { en: "More pests and problems", vi: "Sâu bệnh khác" },
  // Pest photo kinds: label on the photo, then the lowercase form used in descriptions.
  "pestKind.pest": { en: ["What it looks like", "what it looks like"], vi: ["Hình dạng", "hình dạng"] },
  "pestKind.damage": { en: ["Damage", "damage"], vi: ["Tác hại", "tác hại"] },

  // ---------------------------------------------------------------- not found
  "notFound.title": { en: "Page not found", vi: "Không tìm thấy trang" },
  "notFound.link": { en: "Go to the planting calendar", vi: "Về lịch trồng" }
};
