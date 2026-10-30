/*
  Vietnamese (Southern dialect) text for each plant in plants.js, keyed by plant id.
  Planting windows, categories and sources are shared with plants.js; only the words differ.
  Measurements keep US units first (matching seed packets sold in Arizona) with metric in
  parentheses. Every plant needs every field, and the same number of tips as in English
  (the validator checks this).
*/
window.PLANTS_VI = {
  // ---------------------------------------------------------------- warm season
  "tomato": {
    name: "Cà chua",
    summary: "Loại cây trồng tại nhà phổ biến nhất. Ở Phoenix, cà chua khó đậu trái khi ban đêm nóng trên khoảng 75°F (24°C), nên trồng đúng lúc là quan trọng nhất.",
    timeToHarvest: "50 đến 120 ngày kể từ khi trồng cây con, tùy giống",
    spacing: "Cây cách cây 18–36 inch (45–90 cm); hàng cách hàng 3–4 feet (0,9–1,2 m)",
    water: "Vừa đến nhiều. Tưới sâu (khoảng 18–24 inch, tức 45–60 cm) và giữ độ ẩm đều để tránh thối đít trái và nứt trái.",
    sun: "Nắng đầy đủ vào mùa xuân; khi trời nóng trên 95°F (35°C) thì che lưới (30–50%) vào buổi chiều.",
    growth: "Nhanh. Giống lùn (determinate) cao 3–4 feet (0,9–1,2 m); giống leo (indeterminate) lớn hoài và cần lồng cao để đỡ.",
    yield: "Khoảng 10–15 pound (4,5–7 kg) mỗi cây nếu gặp mùa thuận; cà chua bi cho cả trăm trái nhỏ.",
    tips: [
      "Lựa giống chín sớm, trái nhỏ hoặc vừa, chịu nóng; cà chua bi chịu nóng giỏi nhất.",
      "Trồng sớm nhất có thể khi hết sương giá (giữa tháng 2) để cây đậu trái trước khi nóng tới.",
      "Ngoài vườn thì trồng cây con, đừng gieo hạt. Ươm hạt trong nhà từ tháng 12 hoặc tháng 1.",
      "Vụ thu (giữa tháng 7 đến giữa tháng 8) cho trái tới đợt sương giá đầu tiên."
    ]
  },
  "peppers": {
    name: "Ớt",
    summary: "Ớt chuông, ớt Mexico và ớt cay đều trồng tốt ở đây, và cây thường sống qua mùa hè để ra trái lại vào mùa thu.",
    timeToHarvest: "90 đến 120 ngày kể từ khi trồng cây con",
    spacing: "Cây cách cây 18–24 inch (45–60 cm); hàng cách hàng 2–3 feet (60–90 cm)",
    water: "Vừa phải. Giữ đất ẩm đều; phủ gốc để rễ mát.",
    sun: "Nắng đầy đủ vào mùa xuân; giữa mùa hè che bớt nắng chiều để trái khỏi bị cháy nắng.",
    growth: "Trung bình. Cây bụi cao 2–3 feet (60–90 cm).",
    yield: "Khoảng 5–10 trái ớt chuông mỗi cây; ớt trái nhỏ thì nhiều hơn nhiều.",
    tips: [
      "Ớt Mexico và ớt jalapeño chịu nóng tốt hơn ớt chuông trái bự.",
      "Giữa mùa hè nóng gắt bông có thể rụng; tới mùa thu cây thường đậu trái lại.",
      "Để cây rậm lá cho lá che trái."
    ]
  },
  "eggplant": {
    name: "Cà tím",
    summary: "Loại cây thật sự ưa nóng, vẫn ra trái tới giữa mùa hè khi phần lớn cây khác đã ngưng.",
    timeToHarvest: "70 đến 120 ngày kể từ khi trồng cây con",
    spacing: "Cây cách cây 24 inch (60 cm); hàng cách hàng 3 feet (90 cm)",
    water: "Vừa phải. Tưới sâu, đều đặn; đừng để cây héo nhiều lần.",
    sun: "Nắng đầy đủ; chịu nóng mùa hè giỏi hơn cà chua hay ớt.",
    growth: "Trung bình. Cây đứng cao 2–4 feet (60–120 cm); có thể cần cắm cọc.",
    yield: "Khoảng 4–8 trái lớn mỗi cây, hoặc 15 trái trở lên với giống cà tím dài kiểu châu Á.",
    tips: [
      "Các giống cà tím dài, thon kiểu châu Á ra trái rất sai trong trời nóng.",
      "Hái khi vỏ còn bóng; vỏ đục là trái đã già và nhiều hột.",
      "Coi chừng bọ nhảy trên cây con."
    ]
  },
  "summer-squash": {
    name: "Bí ngòi & bí mùa hè",
    summary: "Lớn nhanh và ra nhiều trái vào mùa xuân và mùa thu; giữa mùa hè cây thường yếu đi vì nóng và bọ xít bí.",
    timeToHarvest: "60 đến 90 ngày kể từ khi gieo hạt",
    spacing: "Cây cách cây 24–36 inch (60–90 cm); hàng cách hàng 3–4 feet (0,9–1,2 m)",
    water: "Nhiều. Lá to thoát nước nhiều; khi trời ấm thì tưới sâu và thường xuyên.",
    sun: "Nắng đầy đủ.",
    growth: "Nhanh. Cây bụi cao 2–3 feet (60–90 cm) và rộng tới 4 feet (1,2 m).",
    yield: "Thường được 6–10 pound (2,7–4,5 kg) mỗi cây trong cả mùa.",
    tips: [
      "Hái bí ngòi khi dài 6–8 inch (15–20 cm); để trái bự quá làm cây chậm ra trái mới.",
      "Lật mặt dưới lá kiếm trứng bọ xít bí và gỡ bỏ.",
      "Nếu trái teo ở đầu là bông chưa được thụ phấn; thụ phấn bằng tay vào sáng sớm."
    ]
  },
  "winter-squash": {
    name: "Bí mùa đông",
    summary: "Bí hồ lô, bí acorn và các loại tương tự. Dây cần nhiều chỗ, và trái để dành được nhiều tháng.",
    timeToHarvest: "90 đến 120 ngày kể từ khi gieo hạt",
    spacing: "Cây cách cây 3–4 feet (0,9–1,2 m); hàng cách hàng 6–8 feet (1,8–2,4 m)",
    water: "Nhiều khi dây đang lớn; bớt lại chút khi trái bắt đầu chín.",
    sun: "Nắng đầy đủ.",
    growth: "Nhanh; dây bò dài 10 feet (3 m) trở lên.",
    yield: "Khoảng 3–6 trái mỗi cây.",
    tips: [
      "Bí hồ lô và các giống moschata chịu nóng và sâu đục thân bí tốt hơn phần lớn giống khác.",
      "Thu hoạch khi vỏ cứng, bấm móng tay không lún.",
      "Để trái ở chỗ ấm, khô khoảng 10 ngày trước khi cất."
    ]
  },
  "pumpkin": {
    name: "Bí đỏ",
    summary: "Trồng vào tháng 7 để có bí đỏ cho lễ Halloween, hoặc tháng 3 để thu hoạch đầu mùa hè.",
    timeToHarvest: "90 đến 120 ngày kể từ khi gieo hạt",
    spacing: "Cây cách cây 3–5 feet (0,9–1,5 m); hàng cách hàng 6–10 feet (1,8–3 m)",
    water: "Nhiều khi dây đang lớn; tưới ở gốc để lá khô ráo.",
    sun: "Nắng đầy đủ.",
    growth: "Nhanh; dây bò dài tới 15 feet (4,5 m).",
    yield: "Khoảng 2–5 trái mỗi dây; ít hơn với giống trái khổng lồ.",
    tips: [
      "Bí đỏ nhỏ để làm bánh dễ trồng ở đây hơn giống khổng lồ.",
      "Kê trái đang chín lên miếng ván hoặc rơm để khỏi thối vì đất ướt.",
      "Thu hoạch khi vỏ lên màu đều và cuống bắt đầu khô."
    ]
  },
  "cucumber": {
    name: "Dưa leo",
    summary: "Lớn nhanh vào mùa xuân và đầu thu; làm giàn cho leo vừa đỡ tốn chỗ vừa giữ trái sạch.",
    timeToHarvest: "60 đến 90 ngày kể từ khi gieo hạt",
    spacing: "Cây cách cây 12 inch (30 cm) nếu leo giàn, hoặc 3 feet (90 cm) nếu để bò; hàng cách hàng 4–6 feet (1,2–1,8 m)",
    water: "Nhiều. Tưới không đều làm trái bị đắng.",
    sun: "Nắng đầy đủ; che nắng nhẹ buổi chiều khi trời nóng.",
    growth: "Nhanh; dây dài 4–6 feet (1,2–1,8 m).",
    yield: "Khoảng 10–20 trái mỗi cây.",
    tips: [
      "Hái thường xuyên và hái non; để trái già trên dây thì cây ngưng ra trái mới.",
      "Mùa hè thì trồng dưa leo Armenia thay cho dưa leo thường; nó chịu nóng giỏi hơn nhiều."
    ]
  },
  "armenian-cucumber": {
    name: "Dưa leo Armenia",
    summary: "Thật ra là một loại dưa lưới. Rất được ưa chuộng ở Phoenix vì vẫn ra trái suốt mùa hè nóng.",
    timeToHarvest: "Khoảng 55 ngày kể từ khi gieo hạt",
    spacing: "Cây cách cây 12–18 inch (30–45 cm) trên giàn; hàng cách hàng 4–6 feet (1,2–1,8 m)",
    water: "Nhiều. Mùa hè tưới sâu và đều đặn.",
    sun: "Nắng đầy đủ.",
    growth: "Nhanh; dây khỏe, dài 6–10 feet (1,8–3 m).",
    yield: "Rất sai trái; thường 15 trái trở lên mỗi cây.",
    tips: [
      "Hái khi trái dài 12–15 inch (30–38 cm), trước khi vỏ cứng lại.",
      "Không cần gọt vỏ, và hiếm khi bị đắng.",
      "Cho leo giàn để trái thẳng."
    ]
  },
  "cantaloupe": {
    name: "Dưa lưới & dưa lê",
    summary: "Cái nóng sa mạc làm dưa rất ngọt. Trồng vụ xuân thì đầu hè có dưa ăn.",
    timeToHarvest: "80 đến 120 ngày kể từ khi gieo hạt",
    spacing: "Cây cách cây 2–3 feet (60–90 cm); hàng cách hàng 5–6 feet (1,5–1,8 m)",
    water: "Nhiều khi cây đang lớn; bớt nước khi trái chín để dưa ngọt nhất.",
    sun: "Nắng đầy đủ.",
    growth: "Nhanh; dây bò dài 6–8 feet (1,8–2,4 m).",
    yield: "Khoảng 2–4 trái mỗi cây.",
    tips: [
      "Dưa lưới chín thì đẩy nhẹ là tróc khỏi cuống, và đầu cuống có mùi thơm ngọt.",
      "Dưa lê không tự tróc cuống; hái khi vỏ ngả màu kem và hơi bóng như sáp.",
      "Trồng sớm (tháng 2 đến tháng 4) thường cho kết quả tốt nhất."
    ]
  },
  "watermelon": {
    name: "Dưa hấu",
    summary: "Cần một mùa dài và nóng, mà Phoenix thì có thừa. Trồng sớm vào mùa xuân.",
    timeToHarvest: "90 đến 120 ngày kể từ khi gieo hạt",
    spacing: "Cây cách cây 3–4 feet (0,9–1,2 m); hàng cách hàng 6–8 feet (1,8–2,4 m)",
    water: "Nhiều khi cây đang lớn; bớt lại khi trái chín.",
    sun: "Nắng đầy đủ.",
    growth: "Nhanh; dây bò dài 10 feet (3 m) trở lên.",
    yield: "Khoảng 2–4 trái mỗi cây; nhiều hơn với giống dưa hấu nhỏ.",
    tips: [
      "Dấu hiệu chín: tua cuốn gần trái khô lại và mặt dưới trái ngả vàng kem.",
      "Các giống dưa hấu nhỏ (loại 'icebox') chín nhanh hơn và hợp vườn nhỏ."
    ]
  },
  "okra": {
    name: "Đậu bắp",
    summary: "Một trong số ít loại rau sống khỏe qua mùa hè Phoenix, ra trái tới mùa thu.",
    timeToHarvest: "70 đến 100 ngày kể từ khi gieo hạt",
    spacing: "Cây cách cây 12–18 inch (30–45 cm); hàng cách hàng 3 feet (90 cm)",
    water: "Vừa phải. Rễ ăn sâu và khá chịu hạn khi cây đã bén.",
    sun: "Nắng đầy đủ; rất ưa nóng.",
    growth: "Nhanh khi trời ấm. Tới cuối hè cây cao 4–8 feet (1,2–2,4 m).",
    yield: "Khoảng 1–2 pound (0,5–0,9 kg) trái mỗi cây; hái mỗi ngày hoặc cách ngày.",
    tips: [
      "Ngâm hạt qua đêm trước khi gieo để hạt nảy mầm nhanh hơn.",
      "Hái trái khi dài 2–4 inch (5–10 cm); trái lớn hơn mau bị xơ.",
      "Mang găng tay và áo tay dài; lá và trái có thể làm ngứa da."
    ]
  },
  "black-eyed-peas": {
    name: "Đậu mắt đen",
    summary: "Loại đậu cowpea của miền Nam nước Mỹ, rất ưa nóng và giúp đất tốt hơn. Một trong những cây trồng mùa hè tốt nhất.",
    timeToHarvest: "90 đến 120 ngày kể từ khi gieo hạt (hái đậu tươi để lột hột thì sớm hơn)",
    spacing: "Cây cách cây 3–6 inch (8–15 cm); hàng cách hàng 2–3 feet (60–90 cm)",
    water: "Ít đến vừa phải. Chịu nóng và chịu hạn nhẹ khi cây đã bén.",
    sun: "Nắng đầy đủ.",
    growth: "Nhanh. Cây bụi hoặc bán leo cao khoảng 2–3 feet (60–90 cm).",
    yield: "Khoảng 1–2 pound (0,5–0,9 kg) đậu khô cho mỗi 10 feet (3 m) hàng.",
    tips: [
      "Hái trái non để nấu như đậu que, trái mẩy để lột hột ăn tươi, hoặc để khô luôn trên cây.",
      "Giống như các loại đậu khác, cây bổ sung đạm cho đất; là cây phủ đất tốt cho mùa hè."
    ]
  },
  "beans": {
    name: "Đậu que",
    summary: "Đậu que dạng bụi và dạng leo. Trời nóng làm rụng bông, nên trồng vào mùa xuân và cuối hè là tốt nhất.",
    timeToHarvest: "60 đến 90 ngày kể từ khi gieo hạt",
    spacing: "Dạng bụi: cây cách cây 3–4 inch (8–10 cm), hàng cách hàng 2 feet (60 cm). Dạng leo: cách nhau 6 inch (15 cm) dọc theo giàn.",
    water: "Vừa phải. Giữ ẩm đều khi cây ra bông và đậu trái.",
    sun: "Nắng đầy đủ.",
    growth: "Nhanh. Đậu bụi cao 1–2 feet (30–60 cm); đậu leo leo cao 6–8 feet (1,8–2,4 m).",
    yield: "Khoảng 3–5 pound (1,4–2,3 kg) cho mỗi 10 feet (3 m) hàng.",
    tips: [
      "Đừng gieo khi đất còn lạnh vào mùa xuân; hạt sẽ bị thối.",
      "Cứ vài ngày hái một lần, khi trái còn thon và bẻ nghe giòn.",
      "Giữa mùa hè thì thử đậu đũa, loại này chịu nóng giỏi hơn."
    ]
  },
  "corn": {
    name: "Bắp ngọt",
    summary: "Tốn chỗ và tốn nước, nhưng bắp mới bẻ thì đáng công. Trồng thành khối, đừng trồng một hàng dài.",
    timeToHarvest: "70 đến 90 ngày kể từ khi gieo hạt",
    spacing: "Cây cách cây 8–12 inch (20–30 cm); hàng cách hàng 2,5–3 feet (75–90 cm), trồng thành khối ít nhất 4 hàng",
    water: "Nhiều, nhất là khi trổ cờ và ra râu.",
    sun: "Nắng đầy đủ.",
    growth: "Nhanh. Thân cao 5–8 feet (1,5–2,4 m).",
    yield: "Khoảng 1–2 trái mỗi cây.",
    tips: [
      "Bắp thụ phấn nhờ gió; trồng thành khối nhiều hàng ngắn thì trái đầy hạt hơn một hàng dài.",
      "Thu hoạch khi râu ngả nâu và bấm hạt thấy chảy nước sữa.",
      "Nóng gắt lúc thụ phấn làm trái bị lép hạt; nên trồng sớm vào mùa xuân."
    ]
  },
  "sweet-potato": {
    name: "Khoai lang",
    summary: "Sống khỏe qua những tháng nóng nhất. Trồng bằng dây giâm có rễ, không trồng bằng hạt.",
    timeToHarvest: "120 đến 160 ngày kể từ khi trồng dây",
    spacing: "Cây cách cây 12–18 inch (30–45 cm); hàng cách hàng 3–4 feet (0,9–1,2 m)",
    water: "Vừa phải. Bớt tưới vài tuần cuối trước khi thu hoạch.",
    sun: "Nắng đầy đủ.",
    growth: "Nhanh; dây bò lan, làm lớp phủ đất tốt vào mùa hè.",
    yield: "Khoảng 1–3 pound (0,5–1,4 kg) mỗi cây.",
    tips: [
      "Trồng dây giâm (mầm đã ra rễ); bạn có thể tự ươm từ củ khoai lang mua ở chợ.",
      "Đào củ trước khi đất lạnh vào mùa thu; làm nhẹ tay vì vỏ dễ trầy.",
      "Để củ ở chỗ ấm khoảng một tuần cho ngọt hơn."
    ]
  },
  "artichoke": {
    name: "Atiso",
    summary: "Cây lâu năm to và đẹp, ra búp vào mùa xuân và có thể sống vài năm.",
    timeToHarvest: "4 đến 6 tháng",
    spacing: "Cây cách cây 3–4 feet (0,9–1,2 m); hàng cách hàng 4–6 feet (1,2–1,8 m)",
    water: "Vừa phải. Tưới sâu vào mùa mát và mùa xuân; cây có thể ngủ nghỉ vào mùa hè.",
    sun: "Nắng đầy đủ vào mùa đông và mùa xuân; mùa hè có bóng mát buổi chiều thì cây dễ sống sót hơn.",
    growth: "Trung bình. Cây cao và rộng 3–4 feet (0,9–1,2 m).",
    yield: "Khoảng 5–10 búp mỗi cây mỗi năm khi cây đã lớn.",
    tips: [
      "Thu hoạch búp khi còn chặt, trước khi các lá bắc xòe ra.",
      "Cắt bớt cây sau vụ thu hoạch mùa xuân; tới mùa thu cây thường mọc lại.",
      "Để lại vài búp cho trổ bông; bông màu tím thu hút ong."
    ]
  },
  "basil": {
    name: "Húng quế",
    summary: "Loại rau thơm mùa nóng quen thuộc. Lớn nhanh vào mùa xuân và mùa hè, và trồng chung với cà chua rất hợp.",
    timeToHarvest: "Khoảng 30 ngày kể từ khi trồng cây con; 60 đến 75 ngày kể từ khi gieo hạt",
    spacing: "Cách nhau 12 inch (30 cm)",
    water: "Vừa phải. Giữ đất hơi ẩm; mùa hè mà để khô là cây héo liền.",
    sun: "Nắng đầy đủ đến hơi râm buổi chiều.",
    growth: "Nhanh. Cây bụi cao 1–2 feet (30–60 cm).",
    yield: "Chỉ vài cây là có lá hái đều suốt mùa hè.",
    tips: [
      "Ngắt bỏ cành bông để cây ra lá hoài.",
      "Hái bằng cách cắt cành ngay trên một cặp lá, cây sẽ đâm nhánh rậm hơn.",
      "Sương giá làm chết húng quế; ở đây nó chỉ là rau thơm mùa nóng."
    ]
  },

  // ---------------------------------------------------------------- cool season
  "lettuce": {
    name: "Xà lách",
    summary: "Xà lách lá là một trong những cây trồng mùa đông dễ nhất. Khi mùa xuân nóng lên thì lá bị đắng và cây trổ ngồng.",
    timeToHarvest: "30 đến 90 ngày (xà lách lá); 50 đến 100 ngày (xà lách cuốn)",
    spacing: "Xà lách lá: cách nhau 6–8 inch (15–20 cm). Xà lách cuốn: cách nhau 10–12 inch (25–30 cm). Hàng cách hàng 12–18 inch (30–45 cm).",
    water: "Vừa phải. Rễ cạn; giữ ẩm lớp đất vài inch trên mặt.",
    sun: "Nắng đầy đủ vào mùa đông; đầu thu và mùa xuân thì che bớt nắng.",
    growth: "Nhanh.",
    yield: "Xà lách lá có thể cắt nhiều lần trong vài tuần.",
    tips: [
      "Cứ 2–3 tuần gieo một hàng ngắn để có rau ăn liên tục.",
      "Hái lá bên ngoài và để phần đọt giữa tiếp tục lớn.",
      "Xà lách lá và xà lách romaine dễ trồng ở đây hơn xà lách cuốn (iceberg)."
    ]
  },
  "spinach": {
    name: "Cải bó xôi (rau bina)",
    summary: "Rau xanh mùa đông lớn nhanh. Trổ ngồng (ra bông) rất nhanh khi ngày dài và trời ấm.",
    timeToHarvest: "30 đến 90 ngày kể từ khi gieo hạt",
    spacing: "Cây cách cây 3–6 inch (8–15 cm); hàng cách hàng 12–18 inch (30–45 cm)",
    water: "Vừa phải. Giữ đất ẩm đều.",
    sun: "Nắng đầy đủ vào mùa đông.",
    growth: "Nhanh.",
    yield: "Khoảng 4–6 pound (1,8–2,7 kg) cho mỗi 10 feet (3 m) hàng nếu hái nhiều lần.",
    tips: [
      "Hạt nảy mầm kém trong đất nóng; chờ đất mùa thu nguội bớt rồi gieo.",
      "Hái lá bên ngoài, hoặc cắt cả cây cách mặt đất 1 inch (2,5 cm) để cây mọc lại."
    ]
  },
  "kale": {
    name: "Cải kale (cải xoăn)",
    summary: "Khỏe, sai lá và chịu được sương giá. Sương giá còn làm lá ngọt hơn.",
    timeToHarvest: "60 đến 90 ngày kể từ khi gieo hạt",
    spacing: "Cây cách cây 12–18 inch (30–45 cm); hàng cách hàng 18–24 inch (45–60 cm)",
    water: "Vừa phải.",
    sun: "Nắng đầy đủ; chịu được chút bóng râm.",
    growth: "Trung bình. Cây cao 1–3 feet (30–90 cm).",
    yield: "Mỗi cây hái lá được nhiều tháng.",
    tips: [
      "Hái lá dưới trước; cây tiếp tục lớn từ ngọn.",
      "Coi chừng rệp và sâu đo ở mặt dưới lá."
    ]
  },
  "chard": {
    name: "Cải cầu vồng (Swiss chard)",
    summary: "Nhiều màu, dễ trồng và bền. Thường sống tới mùa hè lâu hơn các loại rau lá khác.",
    timeToHarvest: "60 đến 90 ngày",
    spacing: "Cây cách cây 8–12 inch (20–30 cm); hàng cách hàng 18 inch (45 cm)",
    water: "Vừa phải.",
    sun: "Nắng đầy đủ vào mùa đông; nếu để tới cuối xuân thì che bớt nắng chiều.",
    growth: "Trung bình. Cây cao 1–2 feet (30–60 cm).",
    yield: "Hái lá bên ngoài liên tục trong nhiều tháng.",
    tips: [
      "Cắt cọng ngoài sát gốc và chừa phần giữa để cây tiếp tục ra lá.",
      "Giống nhiều màu (rainbow) làm viền vườn vừa đẹp vừa ăn được."
    ]
  },
  "bok-choy": {
    name: "Cải thìa",
    summary: "Rau châu Á lớn rất nhanh. Cải thìa non có thể ăn được sau khoảng một tháng.",
    timeToHarvest: "Khoảng 45 ngày kể từ khi gieo hạt",
    spacing: "Cây cách cây 6–10 inch (15–25 cm); hàng cách hàng 18 inch (45 cm)",
    water: "Vừa phải. Giữ ẩm đều để rau mềm.",
    sun: "Nắng đầy đủ đến hơi râm.",
    growth: "Nhanh.",
    yield: "Mỗi cây một bụi; nhổ cả cây hoặc hái lá bên ngoài.",
    tips: [
      "Thu hoạch trước khi trời ấm làm cây trổ ngồng.",
      "Cứ vài tuần gieo một ít."
    ]
  },
  "broccoli": {
    name: "Bông cải xanh",
    summary: "Cây trồng mùa đông đáng tin cậy. Sau bông chính, các nhánh phụ còn ra bông thêm nhiều tuần.",
    timeToHarvest: "90 đến 100 ngày kể từ khi trồng cây con; 120 đến 130 ngày kể từ khi gieo hạt",
    spacing: "Cây cách cây 18 inch (45 cm); hàng cách hàng 2–3 feet (60–90 cm)",
    water: "Vừa phải. Giữ ẩm đều.",
    sun: "Nắng đầy đủ.",
    growth: "Trung bình. Cây cao 2–3 feet (60–90 cm).",
    yield: "Một bông chính và nhiều bông nhánh mỗi cây.",
    tips: [
      "Cắt bông chính khi nụ còn chặt và chưa thấy bông vàng nào.",
      "Trồng cây con vào mùa thu (tháng 9 đến tháng 11) là chắc ăn nhất.",
      "Coi chừng rệp và sâu xanh ăn lá cải."
    ]
  },
  "cauliflower": {
    name: "Bông cải trắng",
    summary: "Hơi khó trồng hơn bông cải xanh, nhưng vẫn lớn tốt trong mùa đông ở Phoenix.",
    timeToHarvest: "90 đến 100 ngày kể từ khi trồng cây con; 120 đến 130 ngày kể từ khi gieo hạt",
    spacing: "Cây cách cây 18–24 inch (45–60 cm); hàng cách hàng 2–3 feet (60–90 cm)",
    water: "Vừa phải. Ẩm đều; cây bị thiếu nước thì bông nhỏ và lỏng.",
    sun: "Nắng đầy đủ.",
    growth: "Trung bình. Cây cao và rộng 2 feet (60 cm).",
    yield: "Một bông mỗi cây.",
    tips: [
      "Muốn bông trắng thì khi bông lớn cỡ hột gà, túm lá ngoài lại phủ lên bông (gọi là che trắng).",
      "Các giống có màu (tím, cam, xanh) không cần che."
    ]
  },
  "cabbage": {
    name: "Bắp cải",
    summary: "Lớn đều suốt mùa đông. Các giống nhỏ, chín sớm hợp với vườn nhà nhất.",
    timeToHarvest: "80 đến 90 ngày kể từ khi trồng cây con; 120 đến 130 ngày kể từ khi gieo hạt",
    spacing: "Cây cách cây 12–24 inch (30–60 cm); hàng cách hàng 2–3 feet (60–90 cm)",
    water: "Vừa phải. Tưới không đều có thể làm nứt bắp.",
    sun: "Nắng đầy đủ.",
    growth: "Trung bình.",
    yield: "Một bắp nặng 2–4 pound (0,9–1,8 kg) mỗi cây.",
    tips: [
      "Thu hoạch khi bóp thấy bắp chắc.",
      "Phủ vải lưới cho cây con để ngăn bướm trắng đẻ trứng."
    ]
  },
  "carrots": {
    name: "Cà rốt",
    summary: "Mùa trồng kéo dài từ cuối hè tới mùa xuân. Đất tơi xốp thì củ thẳng.",
    timeToHarvest: "60 đến 100 ngày kể từ khi gieo hạt",
    spacing: "Tỉa còn cách nhau 2–3 inch (5–8 cm); hàng cách hàng 12–18 inch (30–45 cm)",
    water: "Vừa phải. Giữ mặt đất ẩm tới khi hạt nảy mầm (có thể mất 2–3 tuần).",
    sun: "Nắng đầy đủ.",
    growth: "Nảy mầm chậm, sau đó lớn đều.",
    yield: "Khoảng 7–10 pound (3–4,5 kg) cho mỗi 10 feet (3 m) hàng.",
    tips: [
      "Đất ở Phoenix thường cứng; giống củ ngắn (Nantes, Danvers, loại củ tròn) hoặc luống cao là hợp nhất.",
      "Phủ bao bố hoặc tấm ván lên hàng hạt để giữ ẩm, và lấy ra khi mầm nhú lên.",
      "Tỉa cây con sớm, không thì củ nhỏ và rối vào nhau."
    ]
  },
  "beets": {
    name: "Củ dền",
    summary: "Một vốn hai lời: củ ngọt và lá non đều ăn được.",
    timeToHarvest: "60 đến 80 ngày kể từ khi gieo hạt",
    spacing: "Tỉa còn cách nhau 3–4 inch (8–10 cm); hàng cách hàng 12–18 inch (30–45 cm)",
    water: "Vừa phải. Ẩm đều thì củ mềm.",
    sun: "Nắng đầy đủ.",
    growth: "Trung bình.",
    yield: "Khoảng 10 pound (4,5 kg) củ cho mỗi 10 feet (3 m) hàng, cộng thêm lá.",
    tips: [
      "Mỗi “hạt” thật ra là một chùm, mọc ra vài cây con; tỉa chừa lại một cây.",
      "Cây tỉa ra đem ăn như rau non.",
      "Nhổ củ khi đường kính 1,5–3 inch (4–8 cm) là ngon nhất."
    ]
  },
  "radishes": {
    name: "Củ cải đỏ",
    summary: "Cây lớn nhanh nhất trong vườn, rất hợp với trẻ nhỏ và người nóng ruột.",
    timeToHarvest: "30 đến 60 ngày kể từ khi gieo hạt",
    spacing: "Cây cách cây 1–2 inch (2,5–5 cm); hàng cách hàng 12 inch (30 cm)",
    water: "Vừa phải. Đất khô làm củ cay và xốp ruột.",
    sun: "Nắng đầy đủ.",
    growth: "Rất nhanh.",
    yield: "Mỗi hạt một củ.",
    tips: [
      "Cứ 1–2 tuần gieo một ít.",
      "Nhổ ngay khi củ đủ lớn; để lâu củ sẽ bị xơ."
    ]
  },
  "turnips": {
    name: "Củ cải tròn (turnip)",
    summary: "Loại củ mùa mát dễ trồng, lá cũng ăn được.",
    timeToHarvest: "75 đến 120 ngày kể từ khi gieo hạt (ăn lá thì sớm hơn nhiều)",
    spacing: "Tỉa còn cách nhau 3–4 inch (8–10 cm); hàng cách hàng 12–18 inch (30–45 cm)",
    water: "Vừa phải.",
    sun: "Nắng đầy đủ.",
    growth: "Nhanh.",
    yield: "Khoảng 8–10 pound (3,5–4,5 kg) cho mỗi 10 feet (3 m) hàng.",
    tips: [
      "Nhổ củ khi đường kính 2–3 inch (5–8 cm); củ lớn hơn bị xơ.",
      "Lá non nấu ăn như cải bó xôi rất ngon."
    ]
  },
  "peas": {
    name: "Đậu Hà Lan",
    summary: "Đậu ăn trái, đậu tuyết và đậu lột hột lớn suốt mùa đông ấm áp và thu hoạch xong trước khi nóng tới.",
    timeToHarvest: "60 đến 120 ngày nếu gieo tháng 9; 120 đến 150 ngày nếu gieo tháng 11",
    spacing: "Cách nhau 2–3 inch (5–8 cm) dọc theo giàn; hàng cách hàng 18–30 inch (45–75 cm)",
    water: "Vừa phải. Đừng tưới quá nhiều trước khi hạt nảy mầm, không thì hạt có thể thối.",
    sun: "Nắng đầy đủ.",
    growth: "Trung bình. Giống leo cao 4–6 feet (1,2–1,8 m) và cần giàn đỡ.",
    yield: "Khoảng 2–4 pound (0,9–1,8 kg) trái cho mỗi 10 feet (3 m) hàng.",
    tips: [
      "Đậu ăn cả trái (đậu snap và đậu tuyết) cho nhiều đồ ăn trên mỗi cây hơn đậu lột hột.",
      "Hái thường xuyên; đậu già mau bị bở.",
      "Sương giá trên bông có thể làm hao lứa trái đầu nhưng ít khi làm chết cây."
    ]
  },
  "potatoes": {
    name: "Khoai tây",
    summary: "Trồng củ giống vào giữa mùa đông và đào lên trước khi mùa hè nóng.",
    timeToHarvest: "90 đến 120 ngày",
    spacing: "Cây cách cây 10–12 inch (25–30 cm); hàng cách hàng 2–3 feet (60–90 cm)",
    water: "Vừa phải. Giữ ẩm đều khi cây đang tạo củ; ngưng tưới khi lá ngả vàng.",
    sun: "Nắng đầy đủ.",
    growth: "Trung bình. Cây nhiều lá, cao 2 feet (60 cm).",
    yield: "Khoảng 2–5 pound (0,9–2,3 kg) mỗi cây.",
    tips: [
      "Dùng khoai giống có chứng nhận, cắt thành miếng có 2 hoặc 3 mắt.",
      "Vun đất hoặc rơm quanh gốc khi cây lớn để củ không bị nắng chiếu (làm củ bị xanh).",
      "Đào củ trước cuối tháng 5, trước khi đất quá nóng."
    ]
  },
  "onions": {
    name: "Hành tây",
    summary: "Ở đây nên trồng giống “ngày ngắn”. Củ hình thành khi ngày dài dần vào mùa xuân.",
    timeToHarvest: "4 đến 5 tháng nếu trồng củ giống hoặc cây con; 7 đến 8 tháng nếu gieo hạt",
    spacing: "Cây cách cây 4–6 inch (10–15 cm); hàng cách hàng 12–18 inch (30–45 cm)",
    water: "Vừa phải. Rễ cạn nên cần tưới đều; ngưng tưới khi lá ngã xuống.",
    sun: "Nắng đầy đủ.",
    growth: "Chậm và đều suốt mùa đông.",
    yield: "Mỗi cây một củ.",
    tips: [
      "Lựa giống ngày ngắn (như Texas Grano hoặc Red Creole); giống ngày dài sẽ không lên củ ở đây.",
      "Thu hoạch khi phần lớn lá đã ngã xuống, rồi để củ khô trong bóng mát vài tuần."
    ]
  },
  "green-onions": {
    name: "Hành lá",
    summary: "Hành lá dễ trồng xen vô bất kỳ chỗ trống nào, và mùa trồng kéo dài.",
    timeToHarvest: "90 đến 100 ngày (theo bảng của Extension); cây tỉa non có thể ăn sớm hơn",
    spacing: "Cây cách cây 1–2 inch (2,5–5 cm); hàng cách hàng 12 inch (30 cm)",
    water: "Vừa phải.",
    sun: "Nắng đầy đủ.",
    growth: "Trung bình.",
    yield: "Mỗi foot (30 cm) hàng được một bó 6–8 cây.",
    tips: [
      "Cứ vài tuần gieo một ít.",
      "Trồng lại gốc hành lá mua ở chợ là nó mọc lại."
    ]
  },
  "garlic": {
    name: "Tỏi",
    summary: "Trồng tép vào tháng 10 và thu hoạch cuối mùa xuân. Ở giữa gần như không phải làm gì.",
    timeToHarvest: "5 đến 7 tháng",
    spacing: "Cây cách cây 4–6 inch (10–15 cm); hàng cách hàng 12 inch (30 cm)",
    water: "Vừa phải suốt mùa đông; ngưng tưới khi lá bắt đầu ngả nâu vào mùa xuân.",
    sun: "Nắng đầy đủ.",
    growth: "Chậm và đều.",
    yield: "Mỗi tép trồng ra một củ.",
    tips: [
      "Trồng tép với đầu nhọn hướng lên, sâu khoảng 1–2 inch (2,5–5 cm).",
      "Tỏi cổ mềm (softneck) và tỏi Creole thường trồng tốt ở vùng sa mạc thấp hơn tỏi cổ cứng (hardneck).",
      "Thu hoạch khi khoảng nửa số lá đã ngả nâu, rồi phơi trong bóng mát 2–3 tuần."
    ]
  },

  // ---------------------------------------------------------------- fruit
  "strawberries": {
    name: "Dâu tây",
    summary: "Ở đây dâu tây được trồng như cây một vụ: trồng mùa thu, hái mùa xuân, mùa thu năm sau trồng lại.",
    timeToHarvest: "Có trái vào mùa xuân năm sau",
    spacing: "Cách nhau 12 inch (30 cm)",
    water: "Vừa đến nhiều. Rễ cạn; tưới nhỏ giọt rất hợp. Rất nhạy với nước và đất bị mặn.",
    sun: "Nắng đầy đủ vào mùa đông; cuối xuân che lưới để kéo dài mùa hái.",
    growth: "Trung bình. Cây thấp, cao khoảng 6–12 inch (15–30 cm).",
    yield: "Khoảng 1 pound (0,5 kg) trở lên mỗi cây nếu mùa xuân thuận.",
    tips: [
      "Giống ra trái một lần (June-bearing) như Chandler, Camarosa, Sweet Charlie trồng tốt nhất ở vùng sa mạc thấp.",
      "Luống cao có ích vì thoát nước tốt và giữ muối tránh xa gốc.",
      "Đặt cây sao cho thân gốc (crown) ngang mặt đất; trồng sâu quá hay cạn quá đều có thể làm chết cây.",
      "Nắng hè thường làm cây tàn; phần lớn người trồng trồng lại mỗi mùa thu."
    ]
  },
  "citrus": {
    name: "Cây có múi",
    summary: "Cam, chanh vàng, bưởi và quýt là những cây quen thuộc trong sân nhà ở Phoenix.",
    timeToHarvest: "Thường 3 năm trở lên mới cho trái nhiều; mùa thu hoạch tùy giống (phần lớn chín từ mùa thu tới mùa xuân)",
    spacing: "Cây thường cách nhau 12–20 feet (3,5–6 m); cây lùn cách nhau 8–10 feet (2,4–3 m)",
    water: "Tưới sâu và thưa, cho nước thấm xuống 2–3 feet (60–90 cm). Cây non cần tưới thường hơn cây đã lớn.",
    sun: "Nắng đầy đủ; sơn hoặc quấn thân cây non chỗ bị nắng chiếu để khỏi cháy nắng.",
    growth: "Trung bình. Cây xanh quanh năm cao 10–25 feet (3–7,5 m) tùy loại và gốc ghép.",
    yield: "Một cây cam đã lớn có thể cho vài trăm trái mỗi năm.",
    tips: [
      "Trồng vào mùa xuân khi hết lo sương giá để rễ bén trước mùa hè.",
      "Chanh vàng và chanh dễ bị sương giá nhất; phủ cây non vào những đêm có sương giá.",
      "Trái không chín thêm sau khi hái; ăn thử trước khi hái cả cây.",
      "Để nguyên các cành thấp (phần “váy” của cây); chúng che nắng cho thân."
    ]
  },
  "fig": {
    name: "Sung Mỹ (trái vả)",
    summary: "Ưa nóng và sai trái. Thường cho một lứa trái sớm nhỏ và một lứa lớn hơn vào cuối hè.",
    timeToHarvest: "Thường bắt đầu có trái vào năm thứ hai hoặc thứ ba",
    spacing: "Cách nhau 15–20 feet (4,5–6 m) (có thể tỉa để giữ cây nhỏ hơn)",
    water: "Vừa phải. Tưới sâu; phủ gốc dày, vì rễ cạn và dễ bị khô.",
    sun: "Nắng đầy đủ; bóng mát buổi chiều giúp cây non qua mấy mùa hè đầu.",
    growth: "Nhanh. Cây hoặc bụi lớn rụng lá, cao 10–30 feet (3–9 m).",
    yield: "Một cây đã lớn có thể cho rất nhiều trái mỗi mùa.",
    tips: [
      "Giống Black Mission hợp với vùng sa mạc thấp (dưới 2.000 feet, tức khoảng 600 m).",
      "Trồng vào mùa thu hoặc đầu xuân để rễ bén trước cái nóng mùa hè.",
      "Sung không chín thêm sau khi hái; hái khi trái mềm và rũ xuống trên cuống.",
      "Chim rất thích sung; giăng lưới sẽ đỡ."
    ]
  },
  "pomegranate": {
    name: "Lựu",
    summary: "Rất hợp với sa mạc: chịu nóng, chịu đất kiềm và chịu hạn nhẹ.",
    timeToHarvest: "Thường bắt đầu có trái sau 2–3 năm; trái chín vào mùa thu",
    spacing: "Cách nhau 12–18 feet (3,5–5,5 m), hoặc 6 feet (1,8 m) nếu trồng làm hàng rào",
    water: "Ít đến vừa phải khi cây đã bén; tưới sâu đều đặn thì trái đẹp hơn và ít nứt.",
    sun: "Nắng đầy đủ.",
    growth: "Trung bình. Cây bụi hoặc cây nhỏ rụng lá, cao 10–20 feet (3–6 m).",
    yield: "Một cây đã lớn có thể cho vài chục trái mỗi năm.",
    tips: [
      "Tưới không đều khi trái đang chín làm trái bị nứt.",
      "Thu hoạch khi vỏ lên màu đều và gõ nghe tiếng kêu như kim loại.",
      "Bông màu cam đỏ rực vào mùa xuân là phần thưởng thêm."
    ]
  },
  "grapes": {
    name: "Nho",
    summary: "Nho ăn tươi chín sớm ở đây, vào tháng 6 và tháng 7, trước cái nóng gắt nhất.",
    timeToHarvest: "Thường có lứa trái nhỏ đầu tiên vào năm thứ ba",
    spacing: "Giống châu Âu cách nhau 6–7 feet (1,8–2,1 m); giống Mỹ hoặc lai Pháp cách nhau 8–9 feet (2,4–2,7 m)",
    water: "Vừa phải. Tưới nhỏ giọt rất hợp. Rễ ăn sâu 2–4 feet (0,6–1,2 m).",
    sun: "Nắng đầy đủ.",
    growth: "Nhanh; dây khỏe, cần giàn, giàn che hoặc hàng rào.",
    yield: "Một dây đã lớn có thể cho 15 pound (7 kg) trở lên.",
    tips: [
      "Mua dây rễ trần đang ngủ nghỉ vào mùa đông và trồng trước khi mầm nhú.",
      "Tỉa cành trong thời gian cây ngủ nghỉ mùa đông (tới giữa tháng 2).",
      "Các giống chín sớm như Flame Seedless và Perlette trồng tốt ở vùng sa mạc thấp.",
      "Tránh chỗ trũng nơi khí lạnh đọng lại và đất có lớp caliche (đất vôi cứng) nằm cạn."
    ]
  },
  "peach": {
    name: "Đào (ít giờ lạnh)",
    summary: "Trồng được ở đây với các giống “ít giờ lạnh”, chín vào tháng 5 trước khi hè nóng.",
    timeToHarvest: "Thường bắt đầu có trái vào năm thứ hai hoặc thứ ba; chín từ cuối tháng 4 tới tháng 5",
    spacing: "Cách nhau 15–20 feet (4,5–6 m) (hoặc gần hơn nếu tỉa vào mùa hè để giữ cây nhỏ)",
    water: "Vừa đến nhiều khi trái đang lớn vào mùa xuân; tưới sâu suốt mùa hè.",
    sun: "Nắng đầy đủ; quét vôi trắng hoặc che thân và cành chính để khỏi cháy nắng.",
    growth: "Nhanh. Cây rụng lá cao 10–20 feet (3–6 m) nếu không tỉa.",
    yield: "Cây đã lớn, có tỉa bớt trái, có thể cho một giạ (bushel) trái hoặc hơn.",
    tips: [
      "Lựa giống cần dưới 400 giờ lạnh, như Desert Gold, Earligrande, Florida Prince, Tropic Snow hoặc Mid-Pride.",
      "Trồng cây rễ trần vào mùa đông khi cây đang ngủ nghỉ.",
      "Vào mùa xuân, tỉa bớt trái non cho cách nhau 6–8 inch (15–20 cm) để đào trái bự hơn."
    ]
  },
  "apricot": {
    name: "Mơ (ít giờ lạnh)",
    summary: "Mơ ít giờ lạnh chín vào cuối tháng 5 tới tháng 6 ở vùng sa mạc thấp.",
    timeToHarvest: "Thường bắt đầu có trái vào năm thứ ba; chín từ cuối tháng 5 tới đầu tháng 6",
    spacing: "Cách nhau 15–20 feet (4,5–6 m)",
    water: "Vừa đến nhiều vào mùa xuân; tưới sâu suốt mùa hè.",
    sun: "Nắng đầy đủ.",
    growth: "Trung bình. Cây rụng lá cao 12–20 feet (3,5–6 m).",
    yield: "Một cây đã lớn có thể cho rất nhiều trái.",
    tips: [
      "Lựa giống cần 400 giờ lạnh trở xuống, như Gold Kist, Katy hoặc Modesto.",
      "Vùng sa mạc thấp trung bình có khoảng 300–400 giờ lạnh mỗi năm, nên giống càng ít giờ lạnh càng chắc ăn.",
      "Trồng cây rễ trần vào mùa đông khi cây đang ngủ nghỉ."
    ]
  }
};
