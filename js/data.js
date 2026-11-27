/* GROAGRI ORGANICS – product & crop catalogue (English + Tamil)
   Source: product labels (Coco Gold, Root Max, Grovia, LF-21) and the
   Groagri Crop Guide brochure. Edit here to change product content. */

var COMPANY = {
  phone: "+91 8925184969",
  phoneHref: "tel:+918925184969",
  whatsapp: "918925184969",
  web: "www.groagriorganics.in",
  licence: "க.எண். உரம்1/95384/2026",
  manufacturer: "Mazhaithuli Organics",
  marketer: "Groagri Organics",
  mrp: "₹850",
  netQty: "1 L",
  mfg: "July 2026"
};

var PRODUCTS = [
  {
    id: "coco-gold",
    name: "Coco Gold",
    image: "images/packs/coco-gold.jpg",
    color: "#1f5a2e",
    accent: "#e8c24a",
    tag: { en: "Plant Promoter", ta: "Plant Promoter" },
    type: {
      en: "Coconut Special Organic Liquid Fertilizer",
      ta: "தென்னைக்கான சிறப்பு ஆர்கானிக் திரவ உரம்"
    },
    benefit: {
      en: "Reduces button shedding; improves nut set, size and yield; keeps fronds green and strong.",
      ta: "குரும்பை உதிர்வு குறைய, காய் பிடிப்பு மற்றும் காய் அளவு அதிகரிக்க, மட்டை பசுமையாக இருக்க"
    },
    method: "soil",
    dose: 100,
    interval: 30
  },
  {
    id: "root-max",
    name: "Root Max",
    image: "images/packs/root-max.jpg",
    color: "#7a4a1e",
    accent: "#f0c75e",
    tag: { en: "Organic Growth Enhancer", ta: "Organic Growth Enhancer" },
    type: {
      en: "Root Growth Promoter · Liquid Organic Fertilizer",
      ta: "வேர் வளர்ச்சி ஊக்கி · திரவ ஆர்கானிக் உரம்"
    },
    benefit: {
      en: "Supports root development, nutrient uptake and healthy, vigorous plant growth.",
      ta: "வேர் வளர்ச்சி மேம்பட, பயிர்கள் செழிப்பாக வளர, செடி வலுவாக இருக்க"
    },
    method: "soil",
    dose: 10,
    interval: 20
  },
  {
    id: "grovia",
    name: "Grovia",
    image: "images/packs/grovia.jpg",
    color: "#0f5e52",
    accent: "#f2a33a",
    tag: { en: "Soil & Crop Enhancer", ta: "Soil & Crop Enhancer" },
    type: {
      en: "Soil & Crop Promoter · Liquid Organic Fertilizer",
      ta: "மண் மற்றும் பயிர் ஊக்கி · திரவ ஆர்கானிக் உரம்"
    },
    benefit: {
      en: "Improves soil health, nutrient availability and crop vigour for better yield.",
      ta: "மண் வளம் மேம்பட, நுண்ணுயிர் செயல்பாடு மற்றும் ஊட்டச்சத்து பயன்பாடு அதிகரிக்க, மகசூல் அதிகரிக்க"
    },
    method: "soil",
    dose: 10,
    interval: 20
  },
  {
    id: "lf-21",
    name: "LF-21",
    image: "images/packs/lf-21.jpg",
    color: "#5b2b8f",
    accent: "#ff5a7a",
    tag: { en: "Leaf Feed – Flowering", ta: "Leaf Feed – Flowering" },
    type: {
      en: "Foliar Liquid Fertilizer · Flowering Stage",
      ta: "இலை வழி திரவ உரம் · பூக்கும் பருவம்"
    },
    benefit: {
      en: "Promotes flowering, fruit set and yield; keeps leaves green and healthy.",
      ta: "பூக்கள் அதிகம் பூக்க, பூ உதிர்வு குறைய, காய் பிடிப்பு மற்றும் மகசூல் மேம்பட"
    },
    method: "foliar",
    dose: 10,
    interval: 15
  }
];

/* Shared directions & precautions (same on every label) */
var DIRECTIONS = {
  en: [
    "Shake well before use.",
    "Mix the dose in clean water.",
    "Apply in the early morning or evening."
  ],
  ta: [
    "பயன்படுத்தும் முன் பாட்டிலை நன்கு குலுக்கவும்.",
    "பரிந்துரைக்கப்பட்ட அளவை சுத்தமான தண்ணீரில் கலக்கவும்.",
    "காலை அல்லது மாலை வேளையில் பயன்படுத்தவும்."
  ]
};
var DIRECTIONS_FOLIAR = {
  en: "Mix in clean water; spray on leaves.",
  ta: "பரிந்துரைக்கப்பட்ட அளவை சுத்தமான தண்ணீரில் கலக்கவும். LF-21-ஐ இலைகளில் தெளிக்கவும்."
};
var PRECAUTIONS = {
  en: [
    "Keep away from children and pets.",
    "Not for human or animal consumption.",
    "Store in a cool, dry place away from sunlight."
  ],
  ta: [
    "குழந்தைகள், செல்லப்பிராணிகளிடமிருந்து தள்ளி வைக்கவும்.",
    "உண்ணவோ குடிக்கவோ கூடாது.",
    "குளிர்ந்த, உலர்ந்த இடத்தில் சேமிக்கவும்."
  ]
};

/* Crop-wise benefits (Crop Guide brochure) */
var B = {
  rmStrong:     { en: "Better root growth; the plant grows strong.", ta: "வேர் வளர்ச்சி மேம்பட்டு செடி வலுவாக வளரும்" },
  rmTransplant: { en: "After transplanting, roots establish well and the plant grows strong.", ta: "நாற்று நட்ட பின் வேர் நன்கு பிடித்து செடி வலுவாக வளரும்" },
  rmVine:       { en: "Better root growth; the vine grows strong.", ta: "வேர் வளர்ச்சி மேம்பட்டு கொடி வலுவாக வளரும்" },
  gvLush:       { en: "Improves soil fertility; the plant grows lush.", ta: "மண் வளம் மேம்பட்டு செடி செழிப்பாக வளரும்" },
  gvYield:      { en: "Improves soil fertility; the plant grows lush and yield increases.", ta: "மண் வளம் மேம்பட்டு செடி செழிப்பாக வளர்ந்து மகசூல் அதிகரிக்கும்" },
  gvBranches:   { en: "Leaves turn green and more new branches emerge.", ta: "இலைகள் பசுமையாகி புதிய கிளைகள் அதிகம் வரும்" },
  lfDropFruit:  { en: "Reduces flower drop and improves fruit set.", ta: "பூ உதிர்வு குறைந்து காய் பிடிப்பு மேம்படும்" }
};

var CROPS = [
  { id: "coconut", img: "images/crops/coconut.jpg", group: "plantation", en: "Coconut", ta: "தென்னை", rows: [
    ["coco-gold", { en: "Reduces button shedding and increases nut set; nuts grow bigger.", ta: "குரும்பை உதிர்வு குறைந்து காய் பிடிப்பு அதிகரிக்கும்; காய் பெரிதாகும்" }],
    ["root-max", { en: "Improves root growth in young palms; the tree grows strong.", ta: "இளம் மரங்களில் வேர் வளர்ச்சி மேம்பட்டு மரம் வலுவாக வளரும்" }],
    ["grovia", { en: "Improves soil fertility and increases nutrient uptake.", ta: "மண் வளம் மேம்பட்டு ஊட்டச்சத்து பயன்பாடு அதிகரிக்கும்" }]
  ]},
  { id: "paddy", img: "images/crops/paddy.jpg", group: "field", en: "Paddy", ta: "நெல்", rows: [
    ["root-max", { en: "After transplanting, roots establish well and more tillers emerge.", ta: "நாற்று நட்ட பின் வேர் நன்கு பிடித்து தூர் அதிகம் வெடிக்கும்" }],
    ["grovia", { en: "Improves soil fertility; the crop grows lush.", ta: "மண் வளம் மேம்பட்டு பயிர் செழிப்பாக வளரும்" }],
    ["lf-21", { en: "Helps improve grain setting during flowering.", ta: "பூக்கும் பருவத்தில் மணி பிடிப்பு மேம்பட உதவும்" }]
  ]},
  { id: "banana", img: "images/crops/banana.jpg", group: "plantation", en: "Banana", ta: "வாழை", rows: [
    ["root-max", { en: "Better root growth; the sucker grows strong.", ta: "வேர் வளர்ச்சி மேம்பட்டு கன்று வலுவாக வளரும்" }],
    ["grovia", { en: "Improves soil fertility and helps increase bunch weight.", ta: "மண் வளம் மேம்பட்டு தார் எடை அதிகரிக்க உதவும்" }],
    ["lf-21", { en: "Helps improve flowering and bunch setting.", ta: "பூ மற்றும் தார் பிடிப்பு மேம்பட உதவும்" }]
  ]},
  { id: "maize", img: "images/crops/maize.jpg", group: "field", en: "Maize", ta: "மக்காச்சோளம்", rows: [
    ["root-max", { en: "Roots grow strong and help the plant stand without lodging.", ta: "வேர் வலுவாகி செடி சாயாமல் நிற்க உதவும்" }],
    ["grovia", { en: "The plant grows lush and yield increases.", ta: "செடி செழிப்பாக வளர்ந்து மகசூல் அதிகரிக்கும்" }],
    ["lf-21", { en: "Helps improve cob setting.", ta: "கதிர் பிடிப்பு மேம்பட உதவும்" }]
  ]},
  { id: "cotton", img: "images/crops/cotton.jpg", group: "field", en: "Cotton", ta: "பருத்தி", rows: [
    ["root-max", B.rmStrong],
    ["grovia", B.gvLush],
    ["lf-21", { en: "Reduces flower drop and improves boll setting.", ta: "பூ உதிர்வு குறைந்து காய் பிடிப்பு மேம்படும்" }]
  ]},
  { id: "sunflower", img: "images/crops/sunflower.jpg", group: "field", en: "Sunflower", ta: "சூரியகாந்தி", rows: [
    ["root-max", B.rmStrong],
    ["grovia", B.gvLush],
    ["lf-21", { en: "Flower heads grow larger and seed setting improves.", ta: "பூ தட்டு பெரிதாகி விதை பிடிப்பு மேம்படும்" }]
  ]},
  { id: "green-chilli", img: "images/crops/green-chilli.jpg", group: "vegetable", en: "Green Chilli", ta: "பச்சை மிளகாய்", rows: [
    ["root-max", B.rmTransplant],
    ["grovia", B.gvYield],
    ["lf-21", { en: "Reduces flower drop; more fruits set.", ta: "பூ உதிர்வு குறைந்து காய் அதிகம் பிடிக்கும்" }]
  ]},
  { id: "tomato", img: "images/crops/tomato.jpg", group: "vegetable", en: "Tomato", ta: "தக்காளி", rows: [
    ["root-max", B.rmTransplant],
    ["grovia", B.gvYield],
    ["lf-21", B.lfDropFruit]
  ]},
  { id: "brinjal", img: "images/crops/brinjal.jpg", group: "vegetable", en: "Brinjal", ta: "கத்தரிக்காய்", rows: [
    ["root-max", B.rmTransplant],
    ["grovia", B.gvYield],
    ["lf-21", { en: "Better flower retention; the plant bears more fruits.", ta: "பூ பிடிப்பு மேம்பட்டு காய்கள் அதிகம் காய்க்கும்" }]
  ]},
  { id: "french-beans", img: "images/crops/french-beans.jpg", group: "vegetable", en: "French Beans", ta: "பீன்ஸ்", rows: [
    ["root-max", B.rmVine],
    ["grovia", B.gvLush],
    ["lf-21", { en: "Reduces flower drop; pod setting increases.", ta: "பூ உதிர்வு குறைந்து காய் பிடிப்பு அதிகரிக்கும்" }]
  ]},
  { id: "broad-beans", img: "images/crops/broad-beans.jpg", group: "vegetable", en: "Broad Beans", ta: "அவரைக்காய்", rows: [
    ["root-max", B.rmVine],
    ["grovia", B.gvLush],
    ["lf-21", { en: "Reduces flower drop and improves pod setting.", ta: "பூ உதிர்வு குறைந்து காய் பிடிப்பு மேம்படும்" }]
  ]},
  { id: "cabbage", img: "images/crops/cabbage.jpg", group: "vegetable", en: "Cabbage", ta: "முட்டைக்கோஸ்", rows: [
    ["root-max", B.rmTransplant],
    ["grovia", { en: "Improves soil fertility and helps the cabbage head form large.", ta: "மண் வளம் மேம்பட்டு கோஸ் பெரிதாக திரள உதவும்" }]
  ]},
  { id: "cauliflower", img: "images/crops/cauliflower.jpg", group: "vegetable", en: "Cauliflower", ta: "காலிஃப்ளவர்", rows: [
    ["root-max", B.rmTransplant],
    ["grovia", { en: "Improves soil fertility and helps improve curd size and quality.", ta: "மண் வளம் மேம்பட்டு பூவின் அளவும் தரமும் மேம்பட உதவும்" }]
  ]},
  { id: "onion", img: "images/crops/onion.jpg", group: "vegetable", en: "Onion", ta: "வெங்காயம்", rows: [
    ["root-max", { en: "Better root growth; seedlings establish well.", ta: "வேர் வளர்ச்சி மேம்பட்டு நாற்று நன்கு பிடிக்கும்" }],
    ["grovia", { en: "Improves soil fertility and helps bulbs grow plump.", ta: "மண் வளம் மேம்பட்டு வெங்காயம் பருமனாக வளர உதவும்" }]
  ]},
  { id: "beetroot", img: "images/crops/beetroot.jpg", group: "vegetable", en: "Beetroot", ta: "பீட்ரூட்", rows: [
    ["root-max", { en: "Better root growth; tuber growth becomes uniform.", ta: "வேர் வளர்ச்சி மேம்பட்டு கிழங்கு வளர்ச்சி சீராகும்" }],
    ["grovia", { en: "Improves soil fertility and helps improve tuber colour and size.", ta: "மண் வளம் மேம்பட்டு கிழங்கின் நிறமும் அளவும் மேம்பட உதவும்" }]
  ]},
  { id: "mint", img: "images/crops/mint.jpg", group: "vegetable", en: "Mint", ta: "புதினா", rows: [
    ["root-max", { en: "Better root growth; more stems sprout.", ta: "வேர் வளர்ச்சி மேம்பட்டு தண்டுகள் அதிகம் துளிர்க்கும்" }],
    ["grovia", { en: "Leaves grow green and dense.", ta: "இலைகள் பசுமையாகவும் அடர்த்தியாகவும் வளரும்" }]
  ]},
  { id: "rose", img: "images/crops/rose.jpg", group: "flower", en: "Rose", ta: "ரோஜா", rows: [
    ["root-max", B.rmStrong],
    ["grovia", B.gvBranches],
    ["lf-21", { en: "More buds form and flowers bloom larger.", ta: "மொட்டு அதிகம் உருவாகி பூக்கள் பெரிதாக பூக்கும்" }]
  ]},
  { id: "jasmine", img: "images/crops/jasmine.jpg", group: "flower", en: "Jasmine", ta: "மல்லிகை", rows: [
    ["root-max", B.rmStrong],
    ["grovia", { en: "Helps more new branches grow.", ta: "புதிய கிளைகள் அதிகம் வளர உதவும்" }],
    ["lf-21", { en: "Bud formation increases and flower yield improves.", ta: "மொட்டு உருவாக்கம் அதிகரித்து பூ மகசூல் மேம்படும்" }]
  ]},
  { id: "hibiscus", img: "images/crops/hibiscus.jpg", group: "flower", en: "Hibiscus", ta: "செம்பருத்தி", rows: [
    ["root-max", B.rmStrong],
    ["grovia", B.gvBranches],
    ["lf-21", { en: "More buds form and help continuous flowering.", ta: "மொட்டு அதிகம் உருவாகி தொடர்ந்து பூக்க உதவும்" }]
  ]},
  { id: "marigold", img: "images/crops/marigold.jpg", group: "flower", en: "Marigold", ta: "சாமந்தி", rows: [
    ["root-max", B.rmStrong],
    ["grovia", B.gvLush],
    ["lf-21", { en: "Increases the number and size of flowers.", ta: "பூக்களின் எண்ணிக்கையும் அளவும் அதிகரிக்கும்" }]
  ]}
];

function getProduct(id) {
  for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i];
  return null;
}
