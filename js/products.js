/* GROAGRI ORGANICS – product catalogue
   Edit this file to add / change products. Images live in images/products/ */
const PRODUCTS = [
  {
    id: "grovermi-gold",
    name: "GroVermi Gold",
    sub: "Premium Vermicompost",
    category: "solid",
    image: "images/products/vermicompost.svg",
    pack: "5 kg · 25 kg · 50 kg",
    form: "Granular / Powder",
    crops: "All crops, gardens, nurseries",
    description:
      "Nutrient-rich vermicompost produced by earthworms from carefully selected farm and cattle waste. It improves soil structure, feeds beneficial microbes and supplies balanced plant nutrients in a slow-release form.",
    benefits: [
      "Improves soil texture, aeration and water-holding capacity",
      "Supplies macro and micro nutrients in natural form",
      "Boosts beneficial soil micro-organisms",
      "Reduces dependence on chemical fertilizers",
      "Odour-free and safe for home gardens"
    ],
    usage: "Field crops: 1–2 tonnes/acre at land preparation. Pots: 100–200 g per pot every 30 days.",
    disclosure:
      "Natural product; nutrient content may vary slightly between batches. Store in a cool, dry place away from direct sunlight. Results depend on soil type, climate and crop management."
  },
  {
    id: "neemshield",
    name: "NeemShield",
    sub: "Neem Cake Manure",
    category: "solid",
    image: "images/products/neem-cake.svg",
    pack: "25 kg · 50 kg",
    form: "Powder / Pellets",
    crops: "Vegetables, banana, sugarcane, coconut, turmeric",
    description:
      "Cold-pressed neem seed cake that acts as an organic manure and natural soil conditioner. Its natural limonoids help discourage soil-borne pests such as nematodes and grubs while slowly releasing nitrogen.",
    benefits: [
      "Organic source of nitrogen, phosphorus and potassium",
      "Helps protect roots from nematodes and soil insects",
      "Slows nitrogen loss when mixed with urea or other inputs",
      "Improves soil organic matter",
      "Biodegradable, leaves no harmful residue"
    ],
    usage: "100–200 kg/acre as basal application. Banana / coconut: 1–2 kg per plant per year.",
    disclosure:
      "Not a registered pesticide; pest-suppressing action is supportive and not a substitute for crop protection where infestation is severe. Keep away from children and animal feed. Avoid inhaling dust; wash hands after use."
  },
  {
    id: "bio-npk",
    name: "Bio NPK",
    sub: "Liquid Microbial Consortia",
    category: "bio",
    image: "images/products/bio-npk.svg",
    pack: "500 ml · 1 litre · 5 litre",
    form: "Liquid",
    crops: "All crops",
    description:
      "A balanced consortium of nitrogen-fixing, phosphate-solubilising and potash-mobilising bacteria. It makes locked-up soil nutrients available to plants and naturally reduces fertilizer requirement.",
    benefits: [
      "Fixes atmospheric nitrogen for the crop",
      "Solubilises fixed phosphorus and mobilises potash",
      "Can reduce chemical NPK use by up to 25% (varies by field)",
      "Promotes stronger root development",
      "Suitable for drip, soil drench and seed treatment"
    ],
    usage: "Soil / drip: 1 litre per acre mixed with 200 litres water or FYM. Seed treatment: 10 ml per kg seed.",
    disclosure:
      "Contains live micro-organisms – use before the expiry date. Do not mix with chemical fungicides or bactericides; keep a gap of 7 days. Store below 30 °C away from sunlight. Viable count may decline after opening."
  },
  {
    id: "panchagavya-plus",
    name: "Panchagavya Plus",
    sub: "Organic Growth Promoter",
    category: "liquid",
    image: "images/products/panchagavya.svg",
    pack: "1 litre · 5 litre",
    form: "Liquid",
    crops: "Vegetables, fruits, flowers, paddy",
    description:
      "A traditional fermented formulation made from five cow-derived products blended with jaggery, banana and coconut water. It energises plants, enhances flowering and supports overall crop vigour.",
    benefits: [
      "Stimulates vegetative growth and greener leaves",
      "Improves flowering, fruit set and fruit size",
      "Enhances shelf life and quality of produce",
      "Rich in beneficial microbes and growth hormones",
      "Based on time-tested traditional farming knowledge"
    ],
    usage: "Foliar spray: 30 ml per litre of water, every 15 days. Drip: 2–3 litres per acre.",
    disclosure:
      "Fermented product – a mild natural odour and slight gas build-up are normal; open the cap carefully. Shake well before use. Filter before spraying. Do not store in a closed vehicle or under direct sun."
  },
  {
    id: "seagro",
    name: "SeaGro",
    sub: "Seaweed Extract",
    category: "liquid",
    image: "images/products/seaweed.svg",
    pack: "250 ml · 1 litre",
    form: "Liquid concentrate",
    crops: "All crops, especially horticulture",
    description:
      "Extracted from marine brown algae, SeaGro contains natural cytokinins, auxins, alginates and trace minerals that help plants grow uniformly and cope better with heat, drought and transplant stress.",
    benefits: [
      "Natural plant growth hormones and trace elements",
      "Improves tolerance to heat, drought and salinity stress",
      "Encourages flowering and reduces flower drop",
      "Improves colour, size and uniformity of fruits",
      "Compatible with most foliar nutrients"
    ],
    usage: "Foliar spray: 2–3 ml per litre of water. Drip: 500 ml per acre, at 15–20 day intervals.",
    disclosure:
      "Do not exceed the recommended dose; over-application may cause leaf scorch in sensitive crops. Test on a small area before mixing with other products. Store in a cool place and keep tightly closed."
  },
  {
    id: "humic-power",
    name: "Humic Power",
    sub: "Humic & Fulvic Acid Granules",
    category: "solid",
    image: "images/products/humic.svg",
    pack: "5 kg · 10 kg",
    form: "Granules",
    crops: "All crops",
    description:
      "Concentrated humic and fulvic acids derived from natural organic sources. Humic Power unlocks soil nutrients, improves fertilizer efficiency and stimulates white root growth.",
    benefits: [
      "Increases nutrient uptake and fertilizer efficiency",
      "Promotes vigorous white root development",
      "Improves soil structure and cation exchange capacity",
      "Helps correct soil compaction and salinity",
      "Easy broadcast with basal fertilizers"
    ],
    usage: "Broadcast 5–10 kg per acre with basal dose or at first top-dressing, followed by light irrigation.",
    disclosure:
      "Humic content may vary naturally between batches. Granules are dark and may stain hands and clothing – use gloves. Keep the bag sealed to prevent moisture absorption."
  },
  {
    id: "phosphorich",
    name: "PhosphoRich",
    sub: "Phosphate Rich Organic Manure (PROM)",
    category: "solid",
    image: "images/products/prom.svg",
    pack: "50 kg",
    form: "Granular",
    crops: "Pulses, oilseeds, cereals, vegetables",
    description:
      "An enriched organic manure prepared by co-composting rock phosphate with organic matter. It gives crops a steady supply of phosphorus for root growth, flowering and seed formation – an organic alternative to DAP.",
    benefits: [
      "Slow and sustained phosphorus release",
      "Supports strong roots, early flowering and seed setting",
      "Effective in neutral and alkaline soils",
      "Adds organic carbon while feeding the crop",
      "Organic alternative to DAP / SSP"
    ],
    usage: "100–200 kg per acre as basal application at sowing or transplanting.",
    disclosure:
      "Use as part of a balanced nutrient programme; final dose should be based on a soil test. Store away from moisture. Results may vary with soil pH and crop."
  },
  {
    id: "bone-meal",
    name: "Bone Meal Organic",
    sub: "Natural Phosphorus & Calcium",
    category: "solid",
    image: "images/products/bone-meal.svg",
    pack: "1 kg · 5 kg · 25 kg",
    form: "Fine powder",
    crops: "Flowering plants, fruit trees, bulbs, vegetables",
    description:
      "Steamed and finely ground bone meal providing slow-release phosphorus and calcium. Ideal for flowering plants, roses, fruit trees and root vegetables.",
    benefits: [
      "Rich natural source of phosphorus and calcium",
      "Promotes root growth and abundant flowering",
      "Helps prevent calcium deficiency disorders",
      "Long-lasting slow-release action",
      "Great for home gardens and nurseries"
    ],
    usage: "Pots: 1–2 tablespoons per pot, mixed into the topsoil. Trees: 250–500 g per tree twice a year.",
    disclosure:
      "Animal-origin product (not vegan). Contains steamed bone; may attract pets and animals – cover with soil after application. Not for human or animal consumption."
  },
  {
    id: "azospirillum",
    name: "Azospirillum",
    sub: "Nitrogen-Fixing Bio-fertilizer",
    category: "bio",
    image: "images/products/azospirillum.svg",
    pack: "1 kg carrier · 1 litre liquid",
    form: "Carrier powder / Liquid",
    crops: "Paddy, maize, millets, sugarcane, vegetables",
    description:
      "Associative nitrogen-fixing bacteria that live around plant roots, fix atmospheric nitrogen and produce growth substances. Especially effective for cereals, millets and grasses.",
    benefits: [
      "Fixes 20–40 kg nitrogen per hectare (varies by conditions)",
      "Produces natural growth hormones for better rooting",
      "Improves germination and seedling vigour",
      "Lowers urea requirement",
      "Eco-friendly and safe for soil life"
    ],
    usage: "Seed treatment: 200 g per acre of seed. Seedling dip: 1 kg in 40 litres water for 20 minutes. Soil: 2 kg with 50 kg FYM per acre.",
    disclosure:
      "Contains live bacteria – use within the shelf life printed on the pack. Do not mix with chemical fertilizers or pesticides directly. Store in a cool, shaded place; avoid freezing and heat above 35 °C."
  },
  {
    id: "fish-amino",
    name: "Fish Amino Acid",
    sub: "Organic Amino Acid Tonic",
    category: "liquid",
    image: "images/products/fish-amino.svg",
    pack: "500 ml · 1 litre · 5 litre",
    form: "Liquid",
    crops: "Vegetables, fruits, flowers, plantation crops",
    description:
      "Fermented fish extract rich in amino acids, proteins and natural nitrogen. A fast-acting organic tonic that boosts green growth, especially during the vegetative stage.",
    benefits: [
      "Quick-acting organic nitrogen and amino acids",
      "Promotes lush, healthy foliage",
      "Improves plant recovery after stress",
      "Increases microbial activity in soil",
      "Easily absorbed through leaves and roots"
    ],
    usage: "Foliar spray: 2–3 ml per litre of water every 10–15 days. Drip: 1 litre per acre.",
    disclosure:
      "Animal-origin product with a natural fish odour. Shake well before use. Do not spray during hot afternoon hours. Keep away from children and pets; store tightly sealed."
  }
];
