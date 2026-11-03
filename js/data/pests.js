/*
  Common pests and problems in Phoenix-area vegetable and fruit gardens.
  type: "insect" (insects and mites), "animal", "disease" (diseases and nematodes) or
  "condition" (heat and watering problems).
  months: when to watch for it (1 = January); general guidance for the low desert.
  plants: ids from plants.js it commonly affects (shown on those plant pages).
  Photos are in PEST_PHOTOS in photos.js. Vietnamese text is in pests.vi.js.
*/
window.PESTS = [
  {
    id: "aphids",
    type: "insect",
    months: [1, 2, 3, 4, 11, 12],
    plants: ["broccoli", "cabbage", "cauliflower", "kale", "bok-choy", "lettuce", "turnips", "radishes"],
    sources: ["reminders-mar", "reminders-apr", "veg-insects"],
    name: "Aphids",
    summary: "Tiny, soft insects that cluster on tender new growth and the undersides of leaves. They're most common on cool-season crops and die down as the weather heats up and their predators multiply.",
    signs: [
      "Clusters of small green, gray or black insects on new leaves and stems",
      "Sticky honeydew on leaves, often with ants or black sooty mold"
    ],
    control: [
      "Knock them off with a strong spray of water from the hose.",
      "Spray the tops and undersides of leaves with 1 tablespoon of liquid dish soap in 1 gallon of water, or use insecticidal soap.",
      "Leave lady beetles, lacewings and hover flies alone; they eat aphids."
    ]
  },
  {
    id: "whiteflies",
    type: "insect",
    months: [8, 9, 10],
    plants: ["cantaloupe", "watermelon"],
    sources: ["bg-whiteflies", "az1005"],
    name: "Whiteflies",
    summary: "Tiny white, moth-like insects that rise in a cloud when you brush the plant. They're worst in late summer and early fall; the county planting calendar suggests waiting to plant fall crops until cooler weather knocks them back.",
    signs: [
      "Tiny white insects on the undersides of leaves that fly up when disturbed",
      "Sticky honeydew and black sooty mold on leaves"
    ],
    control: [
      "Hang yellow sticky cards near plants, about one for every two plants, to catch adults.",
      "Lay aluminum foil on the soil around young plants to discourage them.",
      "Insecticidal soap or a light oil spray kills adults on contact, but only if it reaches the undersides of the leaves.",
      "Avoid strong, long-lasting insecticides. They kill the lady beetles, lacewings and tiny wasps that keep whiteflies in check."
    ]
  },
  {
    id: "squash-bugs",
    type: "insect",
    months: [4, 5, 6, 7, 8, 9],
    plants: ["summer-squash", "winter-squash", "pumpkin", "cucumber", "armenian-cucumber", "cantaloupe", "watermelon"],
    sources: ["bg-squash-bugs", "veg-insects"],
    name: "Squash bugs",
    summary: "Flat, grayish-brown bugs about 5/8 inch long that suck sap from squash, pumpkins and other vine crops. Adults are hard to kill, so finding eggs and young bugs early matters most.",
    signs: [
      "Rows of small brownish eggs on the undersides of leaves",
      "Groups of young bugs at the base of the plant or under leaves (green with red heads and legs at first, turning darker as they grow)",
      "Yellow specks on leaves, then wilting, then black, dried-out leaves"
    ],
    control: [
      "Check young plants every few days. Crush egg clusters and drop young bugs into a pail of soapy water.",
      "Lay boards or cardboard next to the plants. Bugs hide under them overnight; collect them in the morning.",
      "Clear away dead vines and plant debris, especially in fall, so adults have fewer places to spend the winter.",
      "Horticultural oil or neem works best on young bugs; adults are much harder to kill."
    ]
  },
  {
    id: "leaffooted-bugs",
    type: "insect",
    months: [3, 4, 5, 6, 7, 8, 9, 10],
    plants: ["pomegranate", "peach", "apricot", "tomato"],
    sources: ["bg-leaffooted-bug"],
    name: "Leaf-footed bugs",
    summary: "Grayish to black bugs about 3/4 inch long, with flat, leaf-like flaps on their back legs. They pierce ripening fruit and leave sunken, discolored scars.",
    signs: [
      "Sunken or scarred spots on fruit, sometimes oozing clear sap",
      "Reddish young bugs gathered on fruit or stems",
      "Undersized fruit, or fruit that drops early"
    ],
    control: [
      "Pick or vacuum the bugs off, early in the morning when they're sluggish.",
      "Clear weeds and woodpiles near the garden, where they spend the winter.",
      "Row cover keeps them off smaller plants.",
      "Small blemishes on homegrown fruit can usually just be cut away. Sprays only work on young bugs and are rarely needed."
    ]
  },
  {
    id: "spider-mites",
    type: "insect",
    months: [5, 6, 7, 8, 9],
    plants: ["cantaloupe", "watermelon", "eggplant", "beans", "tomato"],
    sources: ["bg-spider-mites", "veg-insects", "reminders-may"],
    name: "Spider mites",
    summary: "Specks almost too small to see that suck juices from the undersides of leaves. Hot, dry, dusty weather makes them multiply fast.",
    signs: [
      "Fine white or yellow speckling on leaves",
      "Fine webbing on leaves and stems",
      "Dull, tired-looking plants; leaves may drop",
      "Tap a leaf over white paper: tiny moving specks are mites"
    ],
    control: [
      "Spray plants hard with water, especially the undersides of leaves, about once a week in hot weather.",
      "Hose off dust and wet down dusty paths; dust favors mites.",
      "Keep plants well watered; thirsty plants suffer more.",
      "Use insecticidal soap or oil if needed, and avoid harsh sprays that kill the predatory mites that eat them."
    ]
  },
  {
    id: "hornworms",
    type: "insect",
    months: [4, 5, 6, 7, 8, 9],
    plants: ["tomato", "peppers", "eggplant", "potatoes"],
    sources: ["hornworm-article", "veg-insects", "reminders-jul"],
    name: "Tomato hornworms",
    summary: "Big green caterpillars, up to 4 inches long, with a horn at the tail end. They blend in with tomato stems and can strip a plant in days.",
    signs: [
      "Leaves and stems eaten away, usually starting near the top of the plant",
      "Large dark green or black droppings on leaves and on the ground below"
    ],
    control: [
      "Hand-pick them. Look at dawn or dusk, when they feed out in the open.",
      "Bt (Bacillus thuringiensis) kills caterpillars without harming other insects. Spray late in the day, because sunlight breaks it down, and repeat every 7 to 10 days.",
      "Turning the soil after harvest kills many of the hornworms resting underground."
    ]
  },
  {
    id: "cabbage-loopers",
    type: "insect",
    months: [1, 2, 3, 10, 11, 12],
    plants: ["broccoli", "cabbage", "cauliflower", "kale", "bok-choy", "lettuce", "turnips", "radishes"],
    sources: ["reminders-dec", "veg-insects"],
    name: "Cabbage loopers and other caterpillars",
    summary: "Green caterpillars that chew ragged holes in cabbage, broccoli, cauliflower, lettuce and other cool-season greens.",
    signs: [
      "Ragged holes in leaves",
      "Green caterpillars and their droppings on leaves and inside heads"
    ],
    control: [
      "Pick caterpillars off by hand.",
      "Spray Bt (Bacillus thuringiensis). It kills caterpillars but isn't harmful to people, animals or other insects."
    ]
  },
  {
    id: "cutworms",
    type: "insect",
    months: [2, 3, 9, 10, 11],
    plants: ["tomato", "cabbage", "summer-squash", "beans", "cucumber"],
    sources: ["reminders-nov", "veg-insects"],
    name: "Cutworms",
    summary: "Fat gray or brown caterpillars that hide in the soil by day and come out at night to chew through young stems at ground level.",
    signs: [
      "Seedlings or new transplants cut off at the soil line overnight"
    ],
    control: [
      "Put a collar around each transplant's stem, such as a ring cut from a paper cup, pushed about 1 inch into the soil and standing about 3 inches above it.",
      "Lay boards on the ground in the evening and collect the caterpillars hiding under them in the morning."
    ]
  },
  {
    id: "flea-beetles",
    type: "insect",
    months: [3, 4, 5, 6],
    plants: ["eggplant", "tomato", "potatoes"],
    sources: ["veg-insects"],
    name: "Flea beetles",
    summary: "Tiny black beetles that jump like fleas when disturbed. They pepper leaves with small holes and slow young plants down.",
    signs: [
      "Many tiny round holes in the leaves",
      "Small black beetles that hop away when you touch the plant"
    ],
    control: [
      "Cover young plants with row cover.",
      "Keep weeds down in and around the garden.",
      "Kaolin clay spray (sold as Surround) leaves a protective film on the leaves."
    ]
  },
  {
    id: "green-fruit-beetle",
    type: "insect",
    months: [6, 7, 8],
    plants: ["fig", "peach", "apricot", "tomato"],
    sources: ["bg-green-fruit-beetles"],
    name: "Green fruit beetles (fig beetles)",
    summary: "Large, shiny green beetles, about 1¼ inches long, that swarm ripe figs, peaches and other soft fruit in summer. Their white grubs live in compost and manure piles and don't harm fruit.",
    signs: [
      "Groups of big green beetles feeding on ripe or overripe fruit",
      "Fat, C-shaped white grubs in compost, manure or grass-clipping piles"
    ],
    control: [
      "Pick fruit as soon as it ripens; beetles showing up means it's time.",
      "Once fruit starts to ripen (after flowering, so you don't block pollinators), cover it with fruit bags, or cover the tree with window screen or row cover.",
      "Trap beetles in a gallon milk jug with a window-screen funnel in the opening, baited with half fruit juice and half water.",
      "Turn compost often, and keep manure and grass clippings away from fruit trees.",
      "Spraying isn't recommended, because the fruit is ripe or nearly so."
    ]
  },
  {
    id: "rabbits",
    type: "animal",
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    plants: [],
    sources: ["reminders-apr"],
    name: "Rabbits and ground squirrels",
    summary: "Cottontail rabbits, ground squirrels and chipmunks nibble seedlings and tender young plants.",
    signs: [
      "Seedlings and young leaves eaten down, often overnight"
    ],
    control: [
      "Fence beds with 1/2-inch poultry wire 2 to 3 feet high, staked so it stays upright. You can also cage single plants.",
      "For ground squirrels and chipmunks, use 1/4-inch woven wire and cover the top too, since they climb.",
      "Keep the fencing up until plants are bigger and less tempting."
    ]
  },
  {
    id: "curly-top",
    type: "disease",
    months: [5, 6, 7],
    plants: ["tomato", "peppers", "beets", "chard", "spinach", "beans", "summer-squash", "cantaloupe"],
    sources: ["bg-curly-top", "veg-insects", "reminders-jun"],
    name: "Curly top virus",
    summary: "A virus spread by the beet leafhopper, a tiny insect. Tomatoes are hit most often, and infected plants never recover.",
    signs: [
      "Tomato leaves curl and roll upward while the main leaf stems bend down",
      "Leaves turn thick, leathery and yellowish, with purple veins",
      "Plants stop growing and look wilted even after watering"
    ],
    control: [
      "Pull out and throw away infected plants as soon as you're sure. Don't compost them.",
      "Cover young plants with row cover from May to mid-July, the riskiest time, with the edges buried in the soil.",
      "Shade cloth over tomatoes may help, since leafhoppers prefer to feed in full sun.",
      "Insecticides don't help: leafhoppers only stop briefly on tomatoes."
    ]
  },
  {
    id: "powdery-mildew",
    type: "disease",
    months: [4, 5, 6, 7, 8, 9, 10],
    plants: ["summer-squash", "winter-squash", "pumpkin", "cucumber", "cantaloupe", "watermelon", "grapes"],
    sources: ["az1033"],
    name: "Powdery mildew",
    summary: "A fungus that coats leaves with white powder. Unlike most leaf diseases it doesn't need wet leaves, so it's common in the low desert; on squash, melons and cucumbers it's a problem all summer.",
    signs: [
      "White to gray powdery spots or patches on leaves, stems and fruit",
      "Shaded lower leaves and crowded plants are usually hit first"
    ],
    control: [
      "Space plants so air moves through them, and give them plenty of sun.",
      "Choose resistant varieties when you can.",
      "Potassium bicarbonate sprays treat spots on contact. Sulfur prevents infection but can burn leaves, especially on squash and melons in hot weather."
    ]
  },
  {
    id: "root-knot-nematodes",
    type: "disease",
    months: [5, 6, 7],
    plants: ["tomato", "peach", "apricot"],
    sources: ["bg-root-knot", "reminders-jun", "az1005"],
    name: "Root-knot nematodes",
    summary: "Microscopic worms in the soil that cause knobby swellings (galls) on roots. Damage is worst in warm, regularly watered, sandy soil.",
    signs: [
      "Plants wilt in the afternoon heat even though the soil is moist",
      "Yellowing, slow growth and smaller harvests, often from May to July",
      "Knobby swellings on the roots when you dig a plant up"
    ],
    control: [
      "Buy plants from reliable nurseries, and don't move soil from an infested bed to other parts of the garden.",
      "Choose tomatoes marked \"N\" (nematode resistant). For peaches and other stone fruit, ask for a resistant rootstock such as Nemaguard.",
      "Solarize beds in summer, rotate crops and add compost. These lower the damage for about a year.",
      "Some French marigolds, such as 'Nemagold' and 'Tangerine', help suppress nematodes."
    ]
  },
  {
    id: "blossom-end-rot",
    type: "condition",
    months: [5, 6, 7, 8],
    plants: ["tomato", "peppers"],
    sources: ["reminders-jun", "az1435"],
    name: "Blossom-end rot",
    summary: "A dark, sunken patch on the bottom (blossom end) of the fruit. It's common on tomatoes and peppers and is linked to uneven watering.",
    signs: [
      "A black or brown, sunken, leathery patch on the bottom of the fruit"
    ],
    control: [
      "Water evenly and consistently, so the soil doesn't swing between soggy and dry.",
      "Mulch around plants to keep soil moisture steady."
    ]
  },
  {
    id: "sunburn",
    type: "condition",
    months: [5, 6, 7, 8, 9],
    plants: ["tomato", "peppers", "cucumber", "citrus"],
    sources: ["reminders-may", "reminders-jun", "reminders-aug", "reminders-sep"],
    name: "Sunburn (sunscald)",
    summary: "Intense summer sun scorches fruit, leaves and stems, especially on the side of the plant facing the sun.",
    signs: [
      "Pale, whitish or tan patches on the sunny side of fruit",
      "Scorched leaves, and citrus fruit that splits late in summer because its sun-damaged rind can't stretch"
    ],
    control: [
      "Cover tomatoes, peppers, cucumbers and other sensitive crops with 30% to 40% shade cloth once temperatures reach about 95°F.",
      "Keep plants watered and leafy; their own leaves shade the fruit.",
      "Avoid heavy pruning in summer, which exposes branches and fruit to direct sun."
    ]
  }
];
