/*
  Plant data for the Phoenix Garden Guide.

  Planting windows ("windows") for vegetables come from the University of Arizona
  Cooperative Extension publication AZ1005, "Vegetable Planting Calendar for
  Maricopa County" (revised 2018). Fruit windows come from the Extension guides
  listed in each plant's "sources". See js/data/sources.js for the full list.

  Each window covers half-month steps: "from" is the 1st or 15th of a month and
  "to" is the 14th or the last day of a month.

  Planting methods:
    S = seeds sown directly in the garden
    T = transplants (nursery starts or seedlings)
    B = seeds or transplants both work
    X = sets, cloves or tubers (onion sets, garlic cloves)
    P = plant a nursery tree, vine or plant (container or bare-root)

  "leafy: true" marks plants where the plant itself is what you eat (greens, herbs,
  green onions). Their photos are wide shots and close-ups instead of
  harvest and whole-plant shots.
*/
window.PLANTS = [
  // ---------------------------------------------------------------- warm season
  {
    id: "tomato",
    name: "Tomatoes",
    category: "vegetable",
    season: "warm",
    summary: "The most popular home crop. In Phoenix, fruit sets poorly once nights stay above about 75°F, so timing is everything.",
    windows: [
      { from: "Feb 15", to: "Mar 31", method: "T" },
      { from: "Jul 15", to: "Aug 14", method: "T" }
    ],
    timeToHarvest: "50 to 120 days from transplant, depending on variety",
    spacing: "18 to 36 inches apart; rows 3 to 4 feet apart",
    water: "Moderate to high. Water deeply (about 18 to 24 inches) and keep moisture steady to prevent blossom-end rot and cracking.",
    sun: "Full sun in spring; afternoon shade cloth (30 to 50%) helps once temperatures pass 95°F.",
    growth: "Fast. Determinate types stay 3 to 4 feet; indeterminate types keep growing and need tall cages.",
    yield: "Roughly 10 to 15 pounds per plant in a good season; cherry types give hundreds of small fruit.",
    tips: [
      "Choose early, small or medium-fruited, heat-tolerant varieties; cherry tomatoes cope with heat best.",
      "Plant as early as frost allows (mid-February) so fruit sets before the heat arrives.",
      "Use transplants, not seeds, in the garden. Start seeds indoors in December or January.",
      "The fall planting (mid-July to mid-August) produces until the first frost."
    ],
    sources: ["az1005"]
  },
  {
    id: "peppers",
    name: "Peppers",
    category: "vegetable",
    season: "warm",
    summary: "Bell, chile and hot peppers all grow well here, and plants often survive summer to produce again in fall.",
    windows: [
      { from: "Feb 15", to: "Mar 31", method: "T" },
      { from: "Jul 1", to: "Jul 31", method: "T" }
    ],
    timeToHarvest: "90 to 120 days from transplant",
    spacing: "18 to 24 inches apart; rows 2 to 3 feet apart",
    water: "Moderate. Keep soil evenly moist; mulch to keep roots cool.",
    sun: "Full sun in spring; light afternoon shade in midsummer prevents sunscald on fruit.",
    growth: "Moderate. Bushy plants 2 to 3 feet tall.",
    yield: "About 5 to 10 bell peppers per plant, or many more for small chiles.",
    tips: [
      "Chiles and jalapeños handle heat better than large bell peppers.",
      "Flowers may drop in peak summer heat; plants usually start setting fruit again in fall.",
      "Keep plants dense and leafy so leaves shade the fruit."
    ],
    sources: ["az1005"]
  },
  {
    id: "eggplant",
    name: "Eggplant",
    category: "vegetable",
    season: "warm",
    summary: "A true heat lover that keeps producing well into summer when most crops quit.",
    windows: [
      { from: "Mar 1", to: "Mar 31", method: "T" }
    ],
    timeToHarvest: "70 to 120 days from transplant",
    spacing: "24 inches apart; rows 3 feet apart",
    water: "Moderate. Deep, regular watering; do not let plants wilt repeatedly.",
    sun: "Full sun; tolerates summer heat better than tomatoes or peppers.",
    growth: "Moderate. Upright plants 2 to 4 feet tall; may need a stake.",
    yield: "About 4 to 8 large fruit, or 15 or more of the slim Asian types, per plant.",
    tips: [
      "Slender Asian varieties are especially productive in the heat.",
      "Harvest while skin is glossy; dull skin means the fruit is overripe and seedy.",
      "Watch for flea beetles on young plants."
    ],
    sources: ["az1005"]
  },
  {
    id: "summer-squash",
    name: "Summer Squash & Zucchini",
    category: "vegetable",
    season: "warm",
    summary: "Fast and productive in spring and fall; plants often decline in midsummer from heat and squash bugs.",
    windows: [
      { from: "Feb 15", to: "Apr 14", method: "S" },
      { from: "Aug 15", to: "Sep 14", method: "S" }
    ],
    timeToHarvest: "60 to 90 days from seed",
    spacing: "24 to 36 inches apart; rows 3 to 4 feet apart",
    water: "High. Big leaves lose a lot of water; water deeply and often in warm weather.",
    sun: "Full sun.",
    growth: "Fast. Bushy plants 2 to 3 feet tall and up to 4 feet wide.",
    yield: "Often 6 to 10 pounds per plant over the season.",
    tips: [
      "Pick zucchini at 6 to 8 inches long; large ones slow the plant down.",
      "Check leaf undersides for squash bug eggs and remove them.",
      "If fruit shrivels at the tip, flowers are not being pollinated; hand-pollinate early in the morning."
    ],
    sources: ["az1005"]
  },
  {
    id: "winter-squash",
    name: "Winter Squash",
    category: "vegetable",
    season: "warm",
    summary: "Butternut, acorn and similar squash. Vines need room, and fruit stores for months.",
    windows: [
      { from: "Mar 1", to: "Mar 31", method: "S" },
      { from: "Jul 1", to: "Aug 14", method: "S" }
    ],
    timeToHarvest: "90 to 120 days from seed",
    spacing: "3 to 4 feet apart; rows 6 to 8 feet apart",
    water: "High while vines are growing; cut back a little as fruit ripens.",
    sun: "Full sun.",
    growth: "Fast, sprawling vines 10 feet or longer.",
    yield: "About 3 to 6 squash per plant.",
    tips: [
      "Butternut and other moschata types handle heat and squash vine borers better than most.",
      "Harvest when the rind is hard and you cannot dent it with a fingernail.",
      "Cure in a warm, dry spot for about 10 days before storing."
    ],
    sources: ["az1005"]
  },
  {
    id: "pumpkin",
    name: "Pumpkins",
    category: "vegetable",
    season: "warm",
    summary: "Plant in July for Halloween pumpkins, or in March for an early-summer crop.",
    windows: [
      { from: "Mar 1", to: "Mar 31", method: "S" },
      { from: "Jul 1", to: "Aug 14", method: "S" }
    ],
    timeToHarvest: "90 to 120 days from seed",
    spacing: "3 to 5 feet apart; rows 6 to 10 feet apart",
    water: "High while vines are growing; water at the base to keep leaves dry.",
    sun: "Full sun.",
    growth: "Fast, sprawling vines up to 15 feet.",
    yield: "About 2 to 5 pumpkins per vine, fewer for giant types.",
    tips: [
      "Small pie pumpkins are easier to grow here than giant varieties.",
      "Set ripening fruit on a board or straw so it does not rot on wet soil.",
      "Harvest when the skin is fully colored and the stem starts to dry."
    ],
    sources: ["az1005"]
  },
  {
    id: "cucumber",
    name: "Cucumbers",
    category: "vegetable",
    season: "warm",
    summary: "Grow quickly in spring and early fall; a trellis saves space and keeps fruit clean.",
    windows: [
      { from: "Feb 15", to: "Apr 30", method: "S" },
      { from: "Aug 15", to: "Sep 30", method: "S" }
    ],
    timeToHarvest: "60 to 90 days from seed",
    spacing: "12 inches apart on a trellis, or 3 feet apart if sprawling; rows 4 to 6 feet apart",
    water: "High. Uneven watering makes fruit bitter.",
    sun: "Full sun; light afternoon shade once it gets hot.",
    growth: "Fast vines 4 to 6 feet long.",
    yield: "Roughly 10 to 20 cucumbers per plant.",
    tips: [
      "Pick often and young; leaving big cucumbers on the vine stops new ones from forming.",
      "For summer, grow Armenian cucumbers instead; they take the heat much better."
    ],
    sources: ["az1005"]
  },
  {
    id: "armenian-cucumber",
    name: "Armenian Cucumber",
    category: "vegetable",
    season: "warm",
    summary: "Technically a melon. A Phoenix favorite because it keeps producing through the summer heat.",
    windows: [
      { from: "Feb 15", to: "Jul 14", method: "S" }
    ],
    timeToHarvest: "About 55 days from seed",
    spacing: "12 to 18 inches apart on a trellis; rows 4 to 6 feet apart",
    water: "High. Water deeply and regularly in summer.",
    sun: "Full sun.",
    growth: "Fast, vigorous vines 6 to 10 feet long.",
    yield: "Very productive; often 15 or more fruit per plant.",
    tips: [
      "Harvest at 12 to 15 inches long, before the skin toughens.",
      "No peeling needed, and it is rarely bitter.",
      "Grow on a trellis for straight fruit."
    ],
    sources: ["az1005"]
  },
  {
    id: "cantaloupe",
    name: "Cantaloupe & Honeydew",
    category: "fruit",
    season: "warm",
    summary: "Desert heat makes for very sweet melons. Spring plantings ripen in early summer.",
    windows: [
      { from: "Feb 15", to: "Jul 31", method: "S" }
    ],
    timeToHarvest: "80 to 120 days from seed",
    spacing: "2 to 3 feet apart; rows 5 to 6 feet apart",
    water: "High during growth; water less as fruit ripens for the sweetest melons.",
    sun: "Full sun.",
    growth: "Fast, sprawling vines 6 to 8 feet long.",
    yield: "About 2 to 4 melons per plant.",
    tips: [
      "A ripe cantaloupe slips off the vine with a light push and smells sweet at the stem end.",
      "Honeydews do not slip; pick when the skin turns creamy and slightly waxy.",
      "Earlier plantings (February to April) usually do best."
    ],
    sources: ["az1005"]
  },
  {
    id: "watermelon",
    name: "Watermelon",
    category: "fruit",
    season: "warm",
    summary: "Needs a long, hot season, which Phoenix provides. Plant early in spring.",
    windows: [
      { from: "Feb 15", to: "Mar 31", method: "S" }
    ],
    timeToHarvest: "90 to 120 days from seed",
    spacing: "3 to 4 feet apart; rows 6 to 8 feet apart",
    water: "High during growth; cut back as fruit ripens.",
    sun: "Full sun.",
    growth: "Fast, sprawling vines 10 feet or longer.",
    yield: "About 2 to 4 melons per plant; more for small 'icebox' types.",
    tips: [
      "Ripe signs: the curly tendril next to the fruit dries up and the underside turns creamy yellow.",
      "Smaller 'icebox' varieties ripen faster and fit small gardens."
    ],
    sources: ["az1005"]
  },
  {
    id: "okra",
    name: "Okra",
    category: "vegetable",
    season: "warm",
    summary: "One of the few vegetables that thrives in a Phoenix summer, producing until fall.",
    windows: [
      { from: "Mar 15", to: "May 31", method: "S" }
    ],
    timeToHarvest: "70 to 100 days from seed",
    spacing: "12 to 18 inches apart; rows 3 feet apart",
    water: "Moderate. Deep-rooted and fairly drought tolerant once established.",
    sun: "Full sun; loves heat.",
    growth: "Fast once warm. Plants reach 4 to 8 feet by late summer.",
    yield: "Roughly 1 to 2 pounds of pods per plant; harvest every day or two.",
    tips: [
      "Soak seeds overnight before planting to speed germination.",
      "Pick pods at 2 to 4 inches long; bigger pods get woody fast.",
      "Wear gloves and long sleeves; leaves and pods can irritate skin."
    ],
    sources: ["az1005"]
  },
  {
    id: "black-eyed-peas",
    name: "Black-eyed Peas",
    category: "vegetable",
    season: "warm",
    summary: "Southern peas (cowpeas) love heat and improve the soil. One of the best summer crops.",
    windows: [
      { from: "Apr 1", to: "Aug 31", method: "S" }
    ],
    timeToHarvest: "90 to 120 days from seed (fresh shelling peas sooner)",
    spacing: "3 to 6 inches apart; rows 2 to 3 feet apart",
    water: "Low to moderate. Tolerates heat and some drought once established.",
    sun: "Full sun.",
    growth: "Fast. Bushy or semi-vining plants about 2 to 3 feet tall.",
    yield: "Roughly 1 to 2 pounds of dry peas per 10 feet of row.",
    tips: [
      "Pick young pods to cook like green beans, plump pods for fresh peas, or let them dry on the plant.",
      "Like other legumes, they add nitrogen to the soil; a good summer cover crop."
    ],
    sources: ["az1005"]
  },
  {
    id: "beans",
    name: "Green Beans",
    category: "vegetable",
    season: "warm",
    summary: "Bush and pole snap beans. Flowers drop in hot weather, so spring and late-summer plantings work best.",
    windows: [
      { from: "Mar 15", to: "Apr 30", method: "S" },
      { from: "Jul 15", to: "Sep 14", method: "S" }
    ],
    timeToHarvest: "60 to 90 days from seed",
    spacing: "Bush: 3 to 4 inches apart in rows 2 feet apart. Pole: 6 inches apart along a trellis.",
    water: "Moderate. Keep evenly moist while flowering and setting pods.",
    sun: "Full sun.",
    growth: "Fast. Bush beans reach 1 to 2 feet; pole beans climb 6 to 8 feet.",
    yield: "About 3 to 5 pounds per 10 feet of row.",
    tips: [
      "Do not plant into cold soil in spring; seeds rot.",
      "Pick every few days while pods are slim and snap cleanly.",
      "For midsummer, try yardlong beans, which tolerate heat better."
    ],
    sources: ["az1005"]
  },
  {
    id: "corn",
    name: "Sweet Corn",
    category: "vegetable",
    season: "warm",
    summary: "Needs space and lots of water, but fresh-picked corn is worth it. Plant in blocks, not single rows.",
    windows: [
      { from: "Feb 15", to: "Apr 14", method: "S" },
      { from: "Jul 15", to: "Aug 31", method: "S" }
    ],
    timeToHarvest: "70 to 90 days from seed",
    spacing: "8 to 12 inches apart; rows 2.5 to 3 feet apart, in a block of at least 4 rows",
    water: "High, especially when tassels and silks appear.",
    sun: "Full sun.",
    growth: "Fast. Stalks 5 to 8 feet tall.",
    yield: "About 1 to 2 ears per stalk.",
    tips: [
      "Corn is wind-pollinated; a block of short rows gives fuller ears than one long row.",
      "Harvest when silks turn brown and kernels squirt milky juice when pressed.",
      "Very high heat during pollination causes poorly filled ears; plant early in spring."
    ],
    sources: ["az1005"]
  },
  {
    id: "sweet-potato",
    name: "Sweet Potatoes",
    category: "vegetable",
    season: "warm",
    summary: "Grow happily through the hottest months. Plant rooted cuttings (slips), not seed.",
    windows: [
      { from: "Mar 1", to: "Jun 30", method: "T" }
    ],
    timeToHarvest: "120 to 160 days from planting slips",
    spacing: "12 to 18 inches apart; rows 3 to 4 feet apart",
    water: "Moderate. Water less in the last few weeks before harvest.",
    sun: "Full sun.",
    growth: "Fast, spreading vines that make a good summer ground cover.",
    yield: "Roughly 1 to 3 pounds per plant.",
    tips: [
      "Plant slips (rooted sprouts); you can grow your own from a store-bought sweet potato.",
      "Dig before the soil gets cold in fall; handle gently, as skins bruise easily.",
      "Cure in a warm place for about a week to sweeten them."
    ],
    sources: ["az1005"]
  },
  {
    id: "artichoke",
    name: "Globe Artichokes",
    category: "vegetable",
    season: "perennial",
    summary: "Large, striking perennial that produces buds in spring and can live several years.",
    windows: [
      { from: "Jan 15", to: "Mar 31", method: "T" },
      { from: "Nov 1", to: "Dec 14", method: "S" }
    ],
    timeToHarvest: "4 to 6 months",
    spacing: "3 to 4 feet apart; rows 4 to 6 feet apart",
    water: "Moderate. Water deeply during the cool season and spring; plants may go dormant in summer.",
    sun: "Full sun in winter and spring; afternoon shade in summer helps them survive.",
    growth: "Moderate. Plants grow 3 to 4 feet tall and wide.",
    yield: "Roughly 5 to 10 buds per plant per year once established.",
    tips: [
      "Harvest buds while tight, before the scales open.",
      "Cut plants back after spring harvest; they often regrow in fall.",
      "Leave a few buds to bloom; the purple flowers attract bees."
    ],
    sources: ["az1005"]
  },
  {
    id: "basil",
    name: "Basil",
    leafy: true,
    category: "herb",
    season: "warm",
    summary: "The classic warm-season herb. Grows fast in spring and summer and is a good companion for tomatoes.",
    windows: [
      { from: "Feb 15", to: "Feb 28", method: "S" },
      { from: "Mar 1", to: "May 31", method: "B" }
    ],
    timeToHarvest: "About 30 days from transplant; 60 to 75 days from seed",
    spacing: "12 inches apart",
    water: "Moderate. Keep soil lightly moist; wilts quickly in summer if it dries out.",
    sun: "Full sun to light afternoon shade.",
    growth: "Fast. Bushy plants 1 to 2 feet tall.",
    yield: "A steady supply of leaves all summer from a few plants.",
    tips: [
      "Pinch off flower spikes to keep leaves coming.",
      "Harvest by cutting stems just above a pair of leaves, which makes the plant bushier.",
      "Frost kills basil; it is strictly a warm-season herb here."
    ],
    sources: ["az1005"]
  },

  // ---------------------------------------------------------------- cool season
  {
    id: "lettuce",
    name: "Lettuce",
    leafy: true,
    category: "vegetable",
    season: "cool",
    summary: "Leaf lettuce is one of the easiest winter crops. It turns bitter and bolts once spring heat arrives.",
    windows: [
      { from: "Jan 1", to: "Feb 14", method: "B" },
      { from: "Feb 15", to: "Feb 28", method: "T" },
      { from: "Aug 15", to: "Sep 14", method: "S" },
      { from: "Sep 15", to: "Dec 31", method: "B" }
    ],
    timeToHarvest: "30 to 90 days (leaf lettuce); 50 to 100 days (head lettuce)",
    spacing: "Leaf: 6 to 8 inches apart. Head: 10 to 12 inches apart. Rows 12 to 18 inches apart.",
    water: "Moderate. Shallow roots; keep the top few inches of soil moist.",
    sun: "Full sun in winter; some shade in early fall and spring.",
    growth: "Fast.",
    yield: "Leaf lettuce can be cut repeatedly for several weeks.",
    tips: [
      "Sow a short row every 2 to 3 weeks for a steady supply.",
      "Pick outer leaves and let the center keep growing.",
      "Leaf and romaine types are easier here than head (iceberg) lettuce."
    ],
    sources: ["az1005"]
  },
  {
    id: "spinach",
    name: "Spinach",
    leafy: true,
    category: "vegetable",
    season: "cool",
    summary: "A quick winter green. Bolts (goes to flower) fast once days get long and warm.",
    windows: [
      { from: "Jan 1", to: "Feb 28", method: "S" },
      { from: "Sep 1", to: "Dec 31", method: "S" }
    ],
    timeToHarvest: "30 to 90 days from seed",
    spacing: "3 to 6 inches apart; rows 12 to 18 inches apart",
    water: "Moderate. Keep soil consistently moist.",
    sun: "Full sun in winter.",
    growth: "Fast.",
    yield: "About 4 to 6 pounds per 10 feet of row with repeated picking.",
    tips: [
      "Seeds germinate poorly in hot soil; wait until fall soil cools.",
      "Pick outer leaves or cut the whole plant an inch above the soil to regrow."
    ],
    sources: ["az1005"]
  },
  {
    id: "kale",
    name: "Kale",
    leafy: true,
    category: "vegetable",
    season: "cool",
    summary: "Hardy, productive and frost tolerant. Frost actually sweetens the leaves.",
    windows: [
      { from: "Aug 15", to: "Dec 31", method: "S" }
    ],
    timeToHarvest: "60 to 90 days from seed",
    spacing: "12 to 18 inches apart; rows 18 to 24 inches apart",
    water: "Moderate.",
    sun: "Full sun; tolerates some shade.",
    growth: "Moderate. Plants 1 to 3 feet tall.",
    yield: "Pick leaves for months from each plant.",
    tips: [
      "Harvest lower leaves first; the plant keeps growing from the top.",
      "Watch for aphids and cabbage loopers on leaf undersides."
    ],
    sources: ["az1005"]
  },
  {
    id: "chard",
    name: "Swiss Chard",
    leafy: true,
    category: "vegetable",
    season: "cool",
    summary: "Colorful, easy and long lasting. Often survives into summer longer than other greens.",
    windows: [
      { from: "Jan 1", to: "Jan 31", method: "B" },
      { from: "Aug 15", to: "Sep 14", method: "S" },
      { from: "Sep 15", to: "Dec 31", method: "B" }
    ],
    timeToHarvest: "60 to 90 days",
    spacing: "8 to 12 inches apart; rows 18 inches apart",
    water: "Moderate.",
    sun: "Full sun in winter; afternoon shade if kept into late spring.",
    growth: "Moderate. Plants 1 to 2 feet tall.",
    yield: "Pick outer leaves continuously for months.",
    tips: [
      "Cut outer stalks near the base and leave the center to keep producing.",
      "Rainbow varieties make an attractive edible border."
    ],
    sources: ["az1005"]
  },
  {
    id: "bok-choy",
    name: "Bok Choy",
    leafy: true,
    category: "vegetable",
    season: "cool",
    summary: "Very fast Asian green. Baby bok choy can be ready in about a month.",
    windows: [
      { from: "Jan 1", to: "Feb 28", method: "S" },
      { from: "Aug 15", to: "Dec 31", method: "S" }
    ],
    timeToHarvest: "About 45 days from seed",
    spacing: "6 to 10 inches apart; rows 18 inches apart",
    water: "Moderate. Keep evenly moist so it stays tender.",
    sun: "Full sun to part shade.",
    growth: "Fast.",
    yield: "One head per plant; harvest whole or pick outer leaves.",
    tips: [
      "Harvest before warm weather causes bolting.",
      "Sow small batches every few weeks."
    ],
    sources: ["az1005"]
  },
  {
    id: "broccoli",
    name: "Broccoli",
    category: "vegetable",
    season: "cool",
    summary: "A reliable winter crop. After the main head, side shoots keep coming for weeks.",
    windows: [
      { from: "Jan 1", to: "Jan 14", method: "B" },
      { from: "Jan 15", to: "Jan 31", method: "T" },
      { from: "Aug 15", to: "Sep 14", method: "S" },
      { from: "Sep 15", to: "Dec 31", method: "B" }
    ],
    timeToHarvest: "90 to 100 days from transplant; 120 to 130 days from seed",
    spacing: "18 inches apart; rows 2 to 3 feet apart",
    water: "Moderate. Keep evenly moist.",
    sun: "Full sun.",
    growth: "Moderate. Plants 2 to 3 feet tall.",
    yield: "One main head plus many side shoots per plant.",
    tips: [
      "Cut the main head while buds are tight and before any yellow flowers show.",
      "Fall transplants (September to November) are the most reliable.",
      "Watch for aphids and cabbage worms."
    ],
    sources: ["az1005"]
  },
  {
    id: "cauliflower",
    name: "Cauliflower",
    category: "vegetable",
    season: "cool",
    summary: "A bit fussier than broccoli, but it grows well in a Phoenix winter.",
    windows: [
      { from: "Jan 1", to: "Jan 14", method: "B" },
      { from: "Jan 15", to: "Jan 31", method: "T" },
      { from: "Aug 15", to: "Aug 31", method: "S" },
      { from: "Sep 1", to: "Dec 31", method: "B" }
    ],
    timeToHarvest: "90 to 100 days from transplant; 120 to 130 days from seed",
    spacing: "18 to 24 inches apart; rows 2 to 3 feet apart",
    water: "Moderate. Steady moisture; stress makes small, loose heads.",
    sun: "Full sun.",
    growth: "Moderate. Plants 2 feet tall and wide.",
    yield: "One head per plant.",
    tips: [
      "For white heads, tie the outer leaves over the head when it is egg-sized (called blanching).",
      "Colored varieties (purple, orange, green) do not need blanching."
    ],
    sources: ["az1005"]
  },
  {
    id: "cabbage",
    name: "Cabbage",
    category: "vegetable",
    season: "cool",
    summary: "Grows steadily through winter. Smaller, early varieties fit gardens best.",
    windows: [
      { from: "Jan 1", to: "Jan 14", method: "B" },
      { from: "Jan 15", to: "Jan 31", method: "T" },
      { from: "Aug 15", to: "Sep 14", method: "S" },
      { from: "Sep 15", to: "Dec 31", method: "B" }
    ],
    timeToHarvest: "80 to 90 days from transplant; 120 to 130 days from seed",
    spacing: "12 to 24 inches apart; rows 2 to 3 feet apart",
    water: "Moderate. Uneven watering can split heads.",
    sun: "Full sun.",
    growth: "Moderate.",
    yield: "One 2 to 4 pound head per plant.",
    tips: [
      "Harvest when the head feels firm when squeezed.",
      "Cover young plants with fabric row cover to keep out cabbage moths."
    ],
    sources: ["az1005"]
  },
  {
    id: "carrots",
    name: "Carrots",
    category: "vegetable",
    season: "cool",
    summary: "Long planting window from late summer through spring. Loose soil gives straight roots.",
    windows: [
      { from: "Jan 1", to: "Apr 30", method: "S" },
      { from: "Aug 1", to: "Dec 31", method: "S" }
    ],
    timeToHarvest: "60 to 100 days from seed",
    spacing: "Thin to 2 to 3 inches apart; rows 12 to 18 inches apart",
    water: "Moderate. Keep the surface moist until seeds sprout (they can take 2 to 3 weeks).",
    sun: "Full sun.",
    growth: "Slow to sprout, then steady.",
    yield: "About 7 to 10 pounds per 10 feet of row.",
    tips: [
      "Phoenix soil is often hard; shorter varieties (Nantes, Danvers, round types) or raised beds work best.",
      "Cover the seed row with burlap or a board to hold moisture, and remove it once sprouts appear.",
      "Thin seedlings early or the roots will be small and tangled."
    ],
    sources: ["az1005"]
  },
  {
    id: "beets",
    name: "Beets",
    category: "vegetable",
    season: "cool",
    summary: "Two crops in one: sweet roots and tender greens.",
    windows: [
      { from: "Jan 1", to: "Mar 14", method: "S" },
      { from: "Sep 15", to: "Dec 31", method: "S" }
    ],
    timeToHarvest: "60 to 80 days from seed",
    spacing: "Thin to 3 to 4 inches apart; rows 12 to 18 inches apart",
    water: "Moderate. Even moisture keeps roots tender.",
    sun: "Full sun.",
    growth: "Moderate.",
    yield: "About 10 pounds of roots per 10 feet of row, plus greens.",
    tips: [
      "Each 'seed' is a cluster that sprouts several seedlings; thin to one.",
      "Eat the thinnings as baby greens.",
      "Harvest roots at 1.5 to 3 inches across for the best texture."
    ],
    sources: ["az1005"]
  },
  {
    id: "radishes",
    name: "Radishes",
    category: "vegetable",
    season: "cool",
    summary: "The fastest crop in the garden, and great for kids and impatient gardeners.",
    windows: [
      { from: "Jan 1", to: "Apr 30", method: "S" },
      { from: "Sep 1", to: "Dec 31", method: "S" }
    ],
    timeToHarvest: "30 to 60 days from seed",
    spacing: "1 to 2 inches apart; rows 12 inches apart",
    water: "Moderate. Dry spells make radishes hot and pithy.",
    sun: "Full sun.",
    growth: "Very fast.",
    yield: "One radish per seed.",
    tips: [
      "Sow small amounts every 1 to 2 weeks.",
      "Pull them as soon as they size up; they go woody if left too long."
    ],
    sources: ["az1005"]
  },
  {
    id: "turnips",
    name: "Turnips",
    category: "vegetable",
    season: "cool",
    summary: "Easy cool-season root with edible greens.",
    windows: [
      { from: "Jan 1", to: "Feb 28", method: "S" },
      { from: "Aug 15", to: "Dec 31", method: "S" }
    ],
    timeToHarvest: "75 to 120 days from seed (greens much sooner)",
    spacing: "Thin to 3 to 4 inches apart; rows 12 to 18 inches apart",
    water: "Moderate.",
    sun: "Full sun.",
    growth: "Fast.",
    yield: "About 8 to 10 pounds per 10 feet of row.",
    tips: [
      "Harvest roots at 2 to 3 inches across; larger ones get woody.",
      "Young greens are tasty cooked like spinach."
    ],
    sources: ["az1005"]
  },
  {
    id: "peas",
    name: "Peas",
    category: "vegetable",
    season: "cool",
    summary: "Snap, snow and shelling peas grow through the mild winter and finish before the heat.",
    windows: [
      { from: "Jan 1", to: "Feb 28", method: "S" },
      { from: "Sep 15", to: "Dec 31", method: "S" }
    ],
    timeToHarvest: "60 to 120 days if sown in September; 120 to 150 days if sown in November",
    spacing: "2 to 3 inches apart along a trellis; rows 18 to 30 inches apart",
    water: "Moderate. Do not overwater before sprouting, or seeds may rot.",
    sun: "Full sun.",
    growth: "Moderate. Climbing types reach 4 to 6 feet and need support.",
    yield: "About 2 to 4 pounds of pods per 10 feet of row.",
    tips: [
      "Snap and snow peas give more food per plant than shelling peas.",
      "Pick often; peas get starchy quickly once mature.",
      "Frost on flowers can reduce early pods but rarely kills plants."
    ],
    sources: ["az1005"]
  },
  {
    id: "potatoes",
    name: "Potatoes",
    category: "vegetable",
    season: "cool",
    summary: "Plant seed potatoes in mid-winter and dig them before summer heat.",
    windows: [
      { from: "Jan 1", to: "Mar 14", method: "X" }
    ],
    timeToHarvest: "90 to 120 days",
    spacing: "10 to 12 inches apart; rows 2 to 3 feet apart",
    water: "Moderate. Keep evenly moist while tubers form; stop when the tops yellow.",
    sun: "Full sun.",
    growth: "Moderate. Leafy plants 2 feet tall.",
    yield: "Roughly 2 to 5 pounds per plant.",
    tips: [
      "Use certified seed potatoes cut into pieces with 2 or 3 eyes each.",
      "Pile soil or straw around the stems as they grow so tubers are not exposed to sun (which turns them green).",
      "Dig by late May before the soil gets very hot."
    ],
    sources: ["az1005"]
  },
  {
    id: "onions",
    name: "Bulb Onions",
    category: "vegetable",
    season: "cool",
    summary: "Grow 'short-day' varieties here. Bulbs form as days lengthen in spring.",
    windows: [
      { from: "Jan 1", to: "Feb 14", method: "X" },
      { from: "Oct 1", to: "Nov 30", method: "S" },
      { from: "Dec 1", to: "Dec 31", method: "X" }
    ],
    timeToHarvest: "4 to 5 months from sets or transplants; 7 to 8 months from seed",
    spacing: "4 to 6 inches apart; rows 12 to 18 inches apart",
    water: "Moderate. Shallow roots need regular water; stop when tops fall over.",
    sun: "Full sun.",
    growth: "Slow and steady through winter.",
    yield: "One bulb per plant.",
    tips: [
      "Choose short-day varieties (such as Texas Grano or Red Creole); long-day types will not bulb here.",
      "Harvest when most tops have fallen over, then dry the bulbs in shade for a couple of weeks."
    ],
    sources: ["az1005"]
  },
  {
    id: "green-onions",
    name: "Green Onions",
    leafy: true,
    category: "vegetable",
    season: "cool",
    summary: "Scallions are easy to tuck into any gap, and the planting window is long.",
    windows: [
      { from: "Jan 1", to: "Apr 30", method: "S" },
      { from: "Aug 1", to: "Dec 31", method: "S" }
    ],
    timeToHarvest: "90 to 100 days (the Extension guide's figure); young thinnings can be eaten sooner",
    spacing: "1 to 2 inches apart; rows 12 inches apart",
    water: "Moderate.",
    sun: "Full sun.",
    growth: "Moderate.",
    yield: "One bunch of 6 to 8 per foot of row.",
    tips: [
      "Sow small batches every few weeks.",
      "Regrow store-bought green onions by planting the root ends."
    ],
    sources: ["az1005"]
  },
  {
    id: "garlic",
    name: "Garlic",
    category: "vegetable",
    season: "cool",
    summary: "Plant cloves in October and harvest in late spring. Very little work in between.",
    windows: [
      { from: "Oct 1", to: "Oct 31", method: "X" }
    ],
    timeToHarvest: "5 to 7 months",
    spacing: "4 to 6 inches apart; rows 12 inches apart",
    water: "Moderate through winter; stop watering when leaves start to brown in spring.",
    sun: "Full sun.",
    growth: "Slow and steady.",
    yield: "One bulb per clove planted.",
    tips: [
      "Plant cloves pointy end up, about 1 to 2 inches deep.",
      "Softneck and Creole types usually do better in the low desert than hardneck types.",
      "Harvest when about half the leaves have browned, then cure in shade for 2 to 3 weeks."
    ],
    sources: ["az1005"]
  },

  // ---------------------------------------------------------------- fruit
  {
    id: "strawberries",
    name: "Strawberries",
    category: "fruit",
    season: "cool",
    summary: "Grown here as a fall-planted annual: plant in fall, pick in spring, replace the next fall.",
    windows: [
      { from: "Sep 15", to: "Nov 14", method: "P" }
    ],
    timeToHarvest: "Fruit the following spring",
    spacing: "12 inches apart",
    water: "Moderate to high. Shallow roots; drip irrigation works well. Very sensitive to salty water and soil.",
    sun: "Full sun in winter; shade cloth in late spring extends the harvest.",
    growth: "Moderate. Low plants about 6 to 12 inches tall.",
    yield: "Roughly 1 pound or more per plant in a good spring.",
    tips: [
      "June-bearing types (such as Chandler, Camarosa, Sweet Charlie) do best in the low desert.",
      "Raised beds help because they drain well and keep salts away from the crown.",
      "Set plants so the crown sits level with the soil surface; too deep or too shallow can kill them.",
      "Summer heat usually ends the plants; most gardeners replant each fall."
    ],
    sources: ["az1667"]
  },
  {
    id: "citrus",
    name: "Citrus",
    category: "fruit",
    season: "perennial",
    summary: "Oranges, lemons, grapefruit and tangerines are Phoenix backyard classics.",
    windows: [
      { from: "Mar 1", to: "Apr 30", method: "P" }
    ],
    timeToHarvest: "Usually 3 or more years to a good crop; harvest season depends on the variety (most ripen between fall and spring)",
    spacing: "Standard trees 12 to 20 feet apart; dwarf trees 8 to 10 feet",
    water: "Water deeply and less often, wetting soil 2 to 3 feet down. Young trees need water more often than established ones.",
    sun: "Full sun; paint or wrap exposed young trunks to prevent sunburn.",
    growth: "Moderate. Evergreen trees 10 to 25 feet depending on type and rootstock.",
    yield: "A mature orange tree can produce several hundred fruit a year.",
    tips: [
      "Plant in spring once frost danger has passed so roots establish before summer.",
      "Lemons and limes are the most frost-sensitive; cover young trees on freezing nights.",
      "Fruit does not ripen after picking; taste-test before harvesting the whole tree.",
      "Leave the lower branches (the 'skirt') on; they shade the trunk."
    ],
    sources: ["az1001", "monthly-march", "az1222"]
  },
  {
    id: "fig",
    name: "Figs",
    category: "fruit",
    season: "perennial",
    summary: "Heat-loving and productive. Often gives a small early crop and a larger late-summer crop.",
    windows: [
      { from: "Feb 1", to: "Mar 31", method: "P" },
      { from: "Sep 15", to: "Oct 14", method: "P" }
    ],
    timeToHarvest: "Fruit often begins in the second or third year",
    spacing: "15 to 20 feet apart (can be kept smaller with pruning)",
    water: "Moderate. Deep watering; mulch heavily, as roots are shallow and sensitive to drying out.",
    sun: "Full sun; afternoon shade helps young trees through their first summers.",
    growth: "Fast. Deciduous tree or large shrub 10 to 30 feet.",
    yield: "A mature tree can produce many pounds of fruit per season.",
    tips: [
      "Black Mission is well adapted to the low desert (below 2,000 feet).",
      "Plant in fall or early spring so roots establish before summer heat.",
      "Figs do not ripen after picking; harvest when soft and drooping on the stem.",
      "Birds love figs; netting helps."
    ],
    sources: ["figs-low-desert", "az1269", "monthly-march"]
  },
  {
    id: "pomegranate",
    name: "Pomegranate",
    category: "fruit",
    season: "perennial",
    summary: "Extremely well suited to the desert: tolerates heat, alkaline soil and some drought.",
    windows: [
      { from: "Feb 1", to: "Mar 31", method: "P" },
      { from: "Sep 15", to: "Oct 14", method: "P" }
    ],
    timeToHarvest: "Fruit often begins in 2 to 3 years; ripens in fall",
    spacing: "12 to 18 feet apart, or 6 feet for a hedge",
    water: "Low to moderate once established; regular deep watering gives better fruit and less splitting.",
    sun: "Full sun.",
    growth: "Moderate. Deciduous shrub or small tree 10 to 20 feet.",
    yield: "A mature plant can produce dozens of fruit a year.",
    tips: [
      "Uneven watering as fruit ripens causes splitting.",
      "Harvest when the skin is fully colored and the fruit sounds metallic when tapped.",
      "The bright orange-red flowers in spring are a bonus."
    ],
    sources: ["monthly-march"]
  },
  {
    id: "grapes",
    name: "Grapes",
    category: "fruit",
    season: "perennial",
    summary: "Table grapes ripen early here, in June and July, before the worst heat.",
    windows: [
      { from: "Jan 1", to: "Feb 28", method: "P" }
    ],
    timeToHarvest: "Usually a first small crop in the third year",
    spacing: "European types 6 to 7 feet apart; American or French hybrid types 8 to 9 feet apart",
    water: "Moderate. Drip irrigation works very well. Roots go 2 to 4 feet deep.",
    sun: "Full sun.",
    growth: "Fast, vigorous vines that need a trellis, arbor or fence.",
    yield: "A mature vine can produce 15 pounds or more.",
    tips: [
      "Buy dormant bare-root vines in winter and plant before buds swell.",
      "Prune during winter dormancy (through mid-February).",
      "Early-ripening varieties such as Flame Seedless and Perlette do well in the low desert.",
      "Avoid low spots where cold air settles and soils with shallow caliche."
    ],
    sources: ["az1657", "az1269", "monthly-january"]
  },
  {
    id: "peach",
    name: "Peaches (low-chill)",
    category: "fruit",
    season: "perennial",
    summary: "Possible here with 'low-chill' varieties, which ripen in May before summer heat.",
    windows: [
      { from: "Jan 1", to: "Feb 28", method: "P" }
    ],
    timeToHarvest: "Fruit often begins in the second or third year; ripens late April to May",
    spacing: "15 to 20 feet apart (or closer with summer pruning to keep trees small)",
    water: "Moderate to high during spring fruit growth; deep watering through summer.",
    sun: "Full sun; whitewash or shade the trunk and main limbs to prevent sunburn.",
    growth: "Fast. Deciduous trees 10 to 20 feet if not pruned.",
    yield: "Thinned mature trees can produce a bushel or more.",
    tips: [
      "Choose varieties needing under 400 chill hours, such as Desert Gold, Earligrande, Florida Prince, Tropic Snow or Mid-Pride.",
      "Plant bare-root trees in winter while dormant.",
      "Thin small fruit to 6 to 8 inches apart in spring for bigger peaches."
    ],
    sources: ["az1269", "monthly-january", "monthly-march"]
  },
  {
    id: "apricot",
    name: "Apricots (low-chill)",
    category: "fruit",
    season: "perennial",
    summary: "Low-chill apricots ripen in late May to June in the low desert.",
    windows: [
      { from: "Jan 1", to: "Feb 28", method: "P" }
    ],
    timeToHarvest: "Fruit often begins in the third year; ripens late May to early June",
    spacing: "15 to 20 feet apart",
    water: "Moderate to high during spring; deep watering through summer.",
    sun: "Full sun.",
    growth: "Moderate. Deciduous trees 12 to 20 feet.",
    yield: "A mature tree can produce many pounds of fruit.",
    tips: [
      "Pick varieties needing 400 chill hours or less, such as Gold Kist, Katy or Modesto.",
      "The low desert averages about 300 to 400 chill hours a year, so lower-chill varieties are safer.",
      "Plant bare-root trees in winter while dormant."
    ],
    sources: ["az1269", "monthly-january", "monthly-march"]
  }
];
