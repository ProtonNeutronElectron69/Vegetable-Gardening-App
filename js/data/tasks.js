/*
  Garden to-do list for each month (index 0 = January), for vegetable and fruit gardens
  in the Phoenix area. What to plant each month is not listed here: the app builds it from
  the planting windows in plants.js.
  group: "water", "feed" (fertilizing and soil), "protect" (frost, heat and animals),
  "pests" or "care" (pruning, harvest and garden chores).
  pests / plants: ids from pests.js / plants.js to link to.
  Vietnamese text is in tasks.vi.js, in the same order.
*/
window.TASKS = [
  {
    // January
    weather: "The coldest month. Frost is most likely now: in central Phoenix the average frost dates run from about Dec. 27 to Jan. 21, and colder spots such as Mesa and Deer Valley can see frost from late November to late February.",
    tasks: [
      { group: "protect", text: "When a freeze is forecast, cover frost-tender plants such as tomatoes, peppers and young citrus with frost cloth, old sheets or blankets. Never use plastic. Old-style incandescent Christmas lights under the cover add a little warmth.", plants: ["citrus"], sources: ["reminders-jan", "az1222"] },
      { group: "protect", text: "Water the day before a cold night. Moist soil holds the day's heat and gives it back overnight.", sources: ["az1222", "reminders-nov"] },
      { group: "care", text: "Don't prune frost-damaged plants yet. The dead growth helps shield the rest of the plant; wait until new growth shows in spring.", sources: ["reminders-jan"] },
      { group: "care", text: "Prune grapevines and dormant fruit trees such as peaches and apricots. Leave citrus alone except for broken branches.", plants: ["grapes", "peach", "apricot"], sources: ["reminders-jan"] },
      { group: "feed", text: "If winter vegetables grow slowly or turn yellow, sprinkle a nitrogen fertilizer (such as ammonium sulfate or fish fertilizer) near the roots and water it in well.", sources: ["reminders-jan"] },
      { group: "feed", text: "Citrus: the first of three yearly feedings is due in January or February.", plants: ["citrus"], sources: ["reminders-feb"] },
      { group: "feed", text: "Get beds ready for spring: spread 2 to 3 inches of compost or aged manure and dig it into the top 10 to 12 inches of soil, 1 to 2 months before planting.", sources: ["reminders-jan", "az1435"] },
      { group: "water", text: "Winter schedule: water vegetable beds about every 5 to 10 days and established fruit trees every 14 to 30 days. Skip a watering after a good rain.", sources: ["watering-numbers"] },
      { group: "water", text: "Do a yearly check of your drip system: flush the lines, clean the filter and fix leaks.", sources: ["reminders-jan", "watering-numbers"] },
      { group: "care", text: "Pull weeds that sprout after winter rains while they're still small.", sources: ["reminders-jan", "az1435"] }
    ]
  },
  {
    // February
    weather: "Days warm up quickly, but frost is still possible until late February in colder parts of the Valley.",
    tasks: [
      { group: "protect", text: "Keep watching for cold nights and cover tender plants when needed. Leave frost damage on plants until the danger of freezing has passed.", sources: ["reminders-feb", "az1222"] },
      { group: "feed", text: "Citrus: give the first of three yearly feedings now if you didn't in January.", plants: ["citrus"], sources: ["reminders-feb"] },
      { group: "feed", text: "Prepare spring beds. Desert soils usually have less than 1% organic matter, so add compost, composted manure or worm castings every planting season. Skip wood ash and eggshells: our soils are already alkaline and full of calcium.", sources: ["reminders-feb"] },
      { group: "care", text: "Finish pruning dormant fruit trees. Citrus only needs dead, diseased and crossing branches removed.", plants: ["citrus", "peach", "apricot"], sources: ["reminders-feb"] },
      { group: "care", text: "February and March are the best months to plant bare-root fruit trees, ideally about 30 days before the buds swell.", plants: ["peach", "apricot"], sources: ["reminders-mar"] },
      { group: "water", text: "Stay on the winter watering schedule through the end of the month.", sources: ["reminders-feb", "watering-numbers"] }
    ]
  },
  {
    // March
    weather: "Spring planting is in full swing. By March the risk of frost is low across most of the Valley.",
    tasks: [
      { group: "water", text: "Switch to the spring schedule (March to May): vegetable beds about every 3 to 7 days, fruit trees every 7 to 12 days.", sources: ["reminders-mar", "watering-numbers"] },
      { group: "care", text: "Once freezing nights are over, cut back frost damage. Scratch the bark with a knife: green underneath means the stem is alive, so prune only back to live wood.", sources: ["reminders-mar"] },
      { group: "care", text: "Thin peaches, apricots and other stone fruit when the fruit is marble-sized, leaving about 6 inches between fruits. You'll get bigger, better fruit.", plants: ["peach", "apricot"], sources: ["reminders-mar"] },
      { group: "pests", text: "Check new growth for aphids. A strong spray of water knocks them off, or spray the tops and undersides of leaves with 1 tablespoon of liquid dish soap in 1 gallon of water.", pests: ["aphids"], sources: ["reminders-mar"] },
      { group: "feed", text: "Citrus: the second of three yearly feedings is due in March or April.", plants: ["citrus"], sources: ["reminders-feb"] },
      { group: "care", text: "Plant citrus and other container-grown fruit trees now so their roots settle in before summer.", plants: ["citrus"], sources: ["reminders-mar", "reminders-apr"] }
    ]
  },
  {
    // April
    weather: "Warm days and mild nights. Plants grow fast, and so do pests.",
    tasks: [
      { group: "feed", text: "Citrus: give the second yearly feeding now if you didn't in March.", plants: ["citrus"], sources: ["reminders-apr"] },
      { group: "pests", text: "Watch for aphids and spider mites. Hose them off, or spray with 1 tablespoon of liquid dish soap per gallon of water, covering the undersides of leaves.", pests: ["aphids", "spider-mites"], sources: ["reminders-apr"] },
      { group: "protect", text: "Fence out rabbits with 1/2-inch poultry wire 2 to 3 feet high. Ground squirrels need 1/4-inch mesh with a cover on top, because they climb.", pests: ["rabbits"], sources: ["reminders-apr"] },
      { group: "water", text: "Flush built-up salts out of drip-watered root zones by running one watering three times as long as usual.", sources: ["reminders-apr"] },
      { group: "care", text: "Yellow leaves with green veins usually mean iron chlorosis. Treat it with chelated iron.", sources: ["reminders-apr"] },
      { group: "care", text: "Finish thinning stone fruit to about 6 inches apart.", plants: ["peach", "apricot"], sources: ["reminders-apr"] }
    ]
  },
  {
    // May
    weather: "One of the hottest and driest months, often with hot, dry winds. Plants need water more often.",
    tasks: [
      { group: "water", text: "Switch to the summer schedule (May to October). Vegetable beds may need water every day. Soak fruit trees about every 7 to 10 days, 2 to 3 feet deep; a soil probe shows how far the water went.", sources: ["reminders-may", "watering-numbers"] },
      { group: "protect", text: "Once temperatures reach about 95°F, shade vegetables with 30% to 40% shade cloth.", pests: ["sunburn"], sources: ["reminders-may"] },
      { group: "protect", text: "Spread 3 inches of mulch under plants to keep roots cool, hold moisture and stop weeds. Keep it a few inches away from stems and trunks.", sources: ["reminders-may", "reminders-jul"] },
      { group: "feed", text: "Oranges, tangerines and grapefruit: give the third and last feeding of the year (May or June). Spread it from 1 foot out from the trunk to past the branch tips, and water it in right away.", plants: ["citrus"], sources: ["reminders-may"] },
      { group: "pests", text: "Spray plants with a strong jet of water once a week through May and June to keep spider mites down.", pests: ["spider-mites"], sources: ["reminders-may"] },
      { group: "care", text: "Citrus dropping some small fruit and old leaves now is normal; the tree is shedding what it can't support.", plants: ["citrus"], sources: ["reminders-may"] }
    ]
  },
  {
    // June
    weather: "Hot and dry, and not a good month for planting. Give anything you do plant extra attention.",
    tasks: [
      { group: "water", text: "Keep watering steady and even. Swings between wet and dry soil cause blossom-end rot on tomatoes and peppers.", pests: ["blossom-end-rot"], sources: ["reminders-jun"] },
      { group: "water", text: "Pots may need water twice a day. Moving them where they get afternoon shade helps.", sources: ["reminders-jun"] },
      { group: "protect", text: "Cover tomatoes, peppers, cucumbers and other sun-sensitive crops with 30% to 40% shade cloth held up on stakes.", pests: ["sunburn"], sources: ["reminders-jun"] },
      { group: "care", text: "Tomatoes often stop setting fruit when it's in the 90s and above. Keep caring for them; they start again when it cools down.", plants: ["tomato"], sources: ["reminders-jun"] },
      { group: "care", text: "Hand-pollinate squash early in the morning: move pollen from a male flower to a female flower (the one with a tiny squash below it) with a small paintbrush.", plants: ["summer-squash"], sources: ["reminders-jun"] },
      { group: "pests", text: "Pull out tomato and pepper plants with curly top virus (curled, leathery leaves that don't perk up after watering). Don't compost them.", pests: ["curly-top"], sources: ["reminders-jun"] },
      { group: "care", text: "Solarize empty beds for fall: dig, rake smooth, soak the soil, then cover it with clear plastic tucked in at the edges for at least 4 weeks. It kills weed seeds, soil fungi and nematodes.", pests: ["root-knot-nematodes"], sources: ["reminders-jun"] },
      { group: "feed", text: "Vegetables may need a side-dressing of fertilizer; compost or fish fertilizer may be enough. Feed potted plants with half-strength fertilizer every two weeks.", sources: ["reminders-jun"] },
      { group: "care", text: "Look after yourself: work early, drink water often, wear a hat and sunscreen, and avoid outdoor work from 10 a.m. to 3 p.m.", sources: ["reminders-jun"] }
    ]
  },
  {
    // July
    weather: "Monsoon season: more humid, with storms that can bring heavy rain and strong winds.",
    tasks: [
      { group: "water", text: "Adjust watering for monsoon rains, and skip a watering after a good soaking.", sources: ["reminders-jul"] },
      { group: "water", text: "Water early in the morning so leaves dry during the day; watering at night invites disease.", sources: ["az1435"] },
      { group: "water", text: "Catch rain from the roof in barrels. Keep them covered so mosquitoes can't breed.", sources: ["reminders-jul"] },
      { group: "pests", text: "Check tomatoes for hornworms and pick them off by hand.", pests: ["hornworms"], plants: ["tomato"], sources: ["reminders-jul"] },
      { group: "pests", text: "Green fruit beetles swarm ripe figs and peaches in summer. Pick fruit as soon as it's ripe.", pests: ["green-fruit-beetle"], plants: ["fig", "peach"], sources: ["bg-green-fruit-beetles"] },
      { group: "care", text: "Pick melons when they're ripe. A ripe watermelon has a yellow patch underneath and a brown, dried tendril next to it; a ripe cantaloupe smells sweet and gives a little at the blossom end.", plants: ["watermelon", "cantaloupe"], sources: ["reminders-jul"] },
      { group: "protect", text: "Keep using 30% to 40% shade cloth in extreme heat, clipped to poles a few feet above the plants.", pests: ["sunburn"], sources: ["reminders-jul"] },
      { group: "protect", text: "If you haven't yet, spread 3 inches of mulch under plants, keeping it a few inches from stems.", sources: ["reminders-jul"] }
    ]
  },
  {
    // August
    weather: "Still very hot, too hot for tomatoes to set fruit. Monsoon storms may continue.",
    tasks: [
      { group: "care", text: "Cut tomato plants back by about two-thirds for a second harvest in fall.", plants: ["tomato"], sources: ["reminders-aug"] },
      { group: "feed", text: "Lemons and limes: give the last of three yearly feedings in August or September.", plants: ["citrus"], sources: ["reminders-aug"] },
      { group: "water", text: "Citrus or pomegranate fruit splitting can mean too much water. Water less often, but just as long each time.", plants: ["citrus", "pomegranate"], sources: ["reminders-aug"] },
      { group: "care", text: "Pull back soil or mulch that washed up against citrus trunks.", plants: ["citrus"], sources: ["reminders-aug"] },
      { group: "feed", text: "Plants that turn pale or slow down after monsoon rains may need fertilizer.", sources: ["reminders-aug"] },
      { group: "feed", text: "Start getting beds ready for fall planting with aged compost or composted steer manure.", sources: ["reminders-aug"] },
      { group: "protect", text: "Keep checking plants for signs of water stress and sunburn. Avoid heavy pruning in the heat; it exposes branches and fruit to the sun.", pests: ["sunburn"], sources: ["reminders-aug"] }
    ]
  },
  {
    // September
    weather: "Hot at first, cooling later in the month. Keep the summer watering schedule until temperatures drop.",
    tasks: [
      { group: "water", text: "Stay on the summer schedule until it cools off, adjusting for any rain.", sources: ["reminders-sep"] },
      { group: "feed", text: "Help plants recover from summer with a light feeding of a high-nitrogen fertilizer (such as ammonium sulfate or fish fertilizer), then water lightly. Feed stone-fruit trees such as peaches and apricots.", plants: ["peach", "apricot"], sources: ["reminders-sep"] },
      { group: "feed", text: "Prepare fall beds: dig in compost and aged manure, plus a starter fertilizer such as bone meal.", sources: ["reminders-sep", "az1435"] },
      { group: "pests", text: "Whiteflies are often bad in late summer. The county planting calendar suggests waiting to plant fall crops until they die down with cooler weather.", pests: ["whiteflies"], sources: ["az1005"] },
      { group: "pests", text: "Hose dust off plants to discourage spider mites.", pests: ["spider-mites"], sources: ["reminders-sep"] },
      { group: "care", text: "Throw away split citrus fruit; it attracts fruit flies and other insects.", plants: ["citrus"], sources: ["reminders-sep"] },
      { group: "care", text: "Prune off branches that died or dried out over the summer, and pull weeds before they go to seed.", sources: ["reminders-sep"] },
      { group: "care", text: "Move potted plants to sunnier spots as the sun shifts lower.", sources: ["reminders-sep"] }
    ]
  },
  {
    // October
    weather: "Warm soil and cooler air make this one of the best months for planting.",
    tasks: [
      { group: "water", text: "Switch to the fall schedule (October to December): vegetable beds about every 3 to 7 days, fruit trees every 7 to 12 days.", sources: ["reminders-oct", "watering-numbers"] },
      { group: "feed", text: "Give new vegetable plantings a high-phosphorus fertilizer to help their roots grow.", sources: ["reminders-oct"] },
      { group: "care", text: "Plant fruit trees early in the month. Trees from smaller 5 to 15 gallon containers settle in and grow faster than big ones.", plants: ["citrus", "fig", "pomegranate"], sources: ["reminders-oct"] },
      { group: "care", text: "Set citrus trees so the top of the root ball is level with, or a little above, the surrounding soil.", plants: ["citrus"], sources: ["reminders-oct"] },
      { group: "care", text: "Clear out spent summer plants to make room for cool-season crops.", sources: ["reminders-oct"] }
    ]
  },
  {
    // November
    weather: "Nights turn cool. Frost can come in late November in colder parts of the Valley (Mesa's average first frost is about Nov. 27; central Phoenix's is about Dec. 27).",
    tasks: [
      { group: "protect", text: "Get frost supplies ready: frost cloth, old sheets or blankets (not plastic), and old-style Christmas lights (not LED or miniature ones).", sources: ["reminders-nov", "az1222"] },
      { group: "protect", text: "Water before cold nights. Moist soil stores the sun's heat and releases it at night, keeping plants warmer.", sources: ["reminders-nov"] },
      { group: "pests", text: "Protect new transplants from cutworms with a collar around the stem at the soil line, such as a ring cut from a paper cup.", pests: ["cutworms"], sources: ["reminders-nov"] },
      { group: "feed", text: "Give winter vegetables a small amount of nitrogen fertilizer each month. Don't fertilize citrus or frost-tender plants now; it pushes out new growth that freezes easily.", plants: ["citrus"], sources: ["reminders-nov"] },
      { group: "water", text: "Mushrooms or fungus growing in a spot means it's getting too much water there. Cut back.", sources: ["reminders-nov"] },
      { group: "care", text: "Clean up: pull weeds, remove dead plants, rake fallen leaves into the compost and top up the mulch.", sources: ["reminders-nov"] }
    ]
  },
  {
    // December
    weather: "Cold nights, with frost likely from late December into January.",
    tasks: [
      { group: "water", text: "Switch to the winter schedule (December to March): vegetable beds about every 5 to 10 days, established fruit trees every 14 to 30 days.", sources: ["reminders-dec", "watering-numbers"] },
      { group: "protect", text: "Watch the forecast for cold nights and cover tender plants.", sources: ["reminders-dec", "az1222"] },
      { group: "protect", text: "Pick lemons and limes on the outside of the tree before a hard freeze; their fruit is damaged at about 28°F. Other citrus handles cold better.", plants: ["citrus"], sources: ["reminders-dec"] },
      { group: "pests", text: "If caterpillars are chewing holes in cabbage, broccoli, cauliflower or lettuce, spray Bt (Bacillus thuringiensis). It isn't harmful to people or animals.", pests: ["cabbage-loopers"], plants: ["cabbage", "broccoli", "cauliflower", "lettuce"], sources: ["reminders-dec"] },
      { group: "feed", text: "Feed cool-season vegetables with nitrogen, such as ammonium sulfate, blood meal, fish emulsion or worm castings.", sources: ["reminders-dec"] },
      { group: "care", text: "Start picking grapefruit late in the month, only as you need it. It gets sweeter the longer it stays on the tree.", plants: ["citrus"], sources: ["reminders-dec"] },
      { group: "care", text: "Prune dormant fruit trees, but leave frost-damaged plants alone until new growth appears in spring.", plants: ["peach", "apricot"], sources: ["reminders-dec"] },
      { group: "pests", text: "If insects were a problem last year, spray dormant fruit trees with horticultural oil to kill insects spending the winter on them.", sources: ["reminders-dec"] }
    ]
  }
];
