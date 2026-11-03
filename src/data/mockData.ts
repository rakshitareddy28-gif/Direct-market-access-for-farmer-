import { Farmer, ProduceItem, ActiveDelivery } from '../types';

export const FARMERS: Farmer[] = [
  {
    id: 'farmer-1',
    name: 'Elena & Mateo Vance',
    farmName: 'Stillfield River Basin Plots',
    location: 'Sebastopol, Russian River Valley',
    region: 'Sonoma Highlands',
    distanceKm: 14.2,
    gpsCoords: { lat: 38.4021, lng: -122.8239 },
    portraitUrl: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=600&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    bio: 'Fourth-generation stewards cultivating rare Romanesco, Tuscan Lacinato kale, and heirloom brassicas using no-till practices, compost teas, and insectary hedgerows.',
    payoutPercentage: 88.5,
    acreage: 42,
    farmingPhilosophy: 'Biological soil vitality with complete zero-pesticide and mycorrhizal root inoculation.',
    certifications: ['Regenerative Organic Certified (ROC)', 'Demeter Biodynamic', 'Salmon-Safe'],
    soilMetrics: {
      soilType: 'Goldridge Sandy Loam with volcanic ash',
      organicMatterPercentage: 6.4,
      phLevel: 6.6,
      elevationMeters: 185,
      irrigationMethod: 'Solar drip with rainwater catchment reservoir',
      seedLineage: 'Open-pollinated heirloom preserved since 1978'
    },
    generationsFarming: 4
  },
  {
    id: 'farmer-2',
    name: 'Alejandro Cruz',
    farmName: 'Cruz Heirloom Groves',
    location: 'Winters, Putah Creek Corridor',
    region: 'Sacramento Delta Foothills',
    distanceKm: 26.8,
    gpsCoords: { lat: 38.5249, lng: -121.9708 },
    portraitUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=1200&q=80',
    bio: 'Specialist in Heritage San Marzano tomatoes, sweet sunburst peppers, and tree-ripened stonefruit. Alejandro has preserved dry-farmed root networks for over 30 years.',
    payoutPercentage: 89.2,
    acreage: 65,
    farmingPhilosophy: 'Deep root dry-farming that forces vines to seek natural subterranean mineral aquifers.',
    certifications: ['California Certified Organic Farmers (CCOF)', 'Fair Trade USA', 'Soil Stewardship Seal'],
    soilMetrics: {
      soilType: 'Yolo Silt Loam deep river deposit',
      organicMatterPercentage: 5.1,
      phLevel: 7.1,
      elevationMeters: 42,
      irrigationMethod: 'Sub-surface precision micro-emitters',
      seedLineage: 'Campania coastal heirloom landrace'
    },
    generationsFarming: 3
  },
  {
    id: 'farmer-3',
    name: 'Dr. Arthur & Sylvi Chen',
    farmName: 'MycoTerra Forest Reserve',
    location: 'Point Reyes Station, Olema Creek',
    region: 'Marin Coastal Fog Belt',
    distanceKm: 19.5,
    gpsCoords: { lat: 38.0691, lng: -122.8069 },
    portraitUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
    bio: 'Cultivating wild-strain golden Chanterelles, Lion\'s Mane, and Black Pearl King oysters on oak and alder sawdust inoculated inside sustainable maritime fog vaults.',
    payoutPercentage: 91.0,
    acreage: 28,
    farmingPhilosophy: 'Fungal biotechnology aligned with native forest floor biodiversity cycles.',
    certifications: ['USDA Organic Fungi Standard', 'Zero Carbon Verified', 'Wildcraft Ethical Harvester'],
    soilMetrics: {
      soilType: 'Marine Terraced Humus & Decomposed Conifer Litter',
      organicMatterPercentage: 11.8,
      phLevel: 5.9,
      elevationMeters: 96,
      irrigationMethod: 'Ultrasonic micro-fogging with filtered spring water',
      seedLineage: 'Wild northern coastal spore clone'
    },
    generationsFarming: 2
  },
  {
    id: 'farmer-4',
    name: 'Margaret & Sarah O\'Donnell',
    farmName: 'Highland Crest Heritage Apiary & Orchard',
    location: 'Healdsburg, Dry Creek Valley',
    region: 'Dry Creek Foothills',
    distanceKm: 31.0,
    gpsCoords: { lat: 38.6105, lng: -122.8692 },
    portraitUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1200&q=80',
    bio: 'Pioneering treatment-free pollinator sanctuaries producing raw wild lavender and blackberry comb honey alongside crisp heritage Gravenstein and Pink Pearl apples.',
    payoutPercentage: 86.8,
    acreage: 50,
    farmingPhilosophy: 'Bee-centric holistic beekeeping without synthetic acaricides or sugar syrup feeding.',
    certifications: ['Certified Naturally Grown', 'Certified Bee Friendly Farm', 'Non-GMO Project Verified'],
    soilMetrics: {
      soilType: 'Laniger Gravelly Loam with sandstone bedrock',
      organicMatterPercentage: 4.8,
      phLevel: 6.4,
      elevationMeters: 290,
      irrigationMethod: 'Natural precipitation & gravity-fed mountain spring',
      seedLineage: '19th century orchard heritage stock'
    },
    generationsFarming: 3
  },
  {
    id: 'farmer-5',
    name: 'Devon Takahashi',
    farmName: 'Sunstone Heritage Mill & Fields',
    location: 'Petaluma River Basin',
    region: 'Sonoma South Marshland',
    distanceKm: 11.5,
    gpsCoords: { lat: 38.2324, lng: -122.6367 },
    portraitUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    bio: 'Devon grows and granite stone-mills antique Einkorn, Sonora Wheat, and Purple Karma Barley. Milled cold under 32°C every morning to preserve raw germ enzymes.',
    payoutPercentage: 87.5,
    acreage: 85,
    farmingPhilosophy: 'Regenerative grain rotation with multi-species nitrogen fixing winter cover crops.',
    certifications: ['ROC Certified Silver', 'Artisan Millers Guild', 'Non-GMO Verified'],
    soilMetrics: {
      soilType: 'Clear Lake Clay Alluvium with rich mineral silt',
      organicMatterPercentage: 5.8,
      phLevel: 6.9,
      elevationMeters: 14,
      irrigationMethod: 'Dry farmed with seasonal high water table retention',
      seedLineage: 'Ancient Fertile Crescent landrace grain'
    },
    generationsFarming: 2
  }
];

export const PRODUCE_ITEMS: ProduceItem[] = [
  {
    id: 'prod-1',
    name: 'Fractal Romanesco Cauliflower',
    botanicalName: 'Brassica oleracea var. botrytis',
    category: 'Vegetables',
    price: 320,
    unit: '1 head (~750g)',
    harvestTimeAgo: 'Harvested 3h ago',
    harvestTimestamp: 'Today, 04:30 AM',
    farmerId: 'farmer-1',
    farmerName: 'Elena & Mateo Vance',
    farmName: 'Stillfield River Basin',
    distanceKm: 14.2,
    imageUrl: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=800&q=80',
    terroirTag: 'Volcanic Sandy Loam',
    flavorNotes: ['Nutty Hazelnut', 'Sweet Brassica', 'Firm Crisp Core'],
    nutrition: {
      calories: '25 kcal / 100g',
      highlights: ['High Vitamin C (140% DV)', 'Potassium', 'Dietary Fiber'],
      shelfLifeDays: 8
    },
    inventoryKg: 38,
    priceBreakdown: {
      farmerPayout: 283,
      coldChainLogistics: 23,
      platformFee: 14
    },
    harvestBatchCode: 'STF-26-RMC-09',
    batchTempCelsius: 4.8,
    description: 'Crisp chartreuse geometric florets cut at dawn while morning dew still coats the heads. Noticeably sweeter and nuttier than commercial cauliflower, perfect raw or roasted with cold-pressed mustard oil.',
    tastingNotes: 'Crisp snap with deep, earthy nuttiness and zero sulfur bitterness found in stored supermarket heads.',
    isPopular: true
  },
  {
    id: 'prod-2',
    name: 'San Marzano Heritage Tomatoes',
    botanicalName: 'Solanum lycopersicum cv. San Marzano',
    category: 'Vegetables',
    price: 380,
    unit: '1.2 kg crate',
    harvestTimeAgo: 'Harvested 4.5h ago',
    harvestTimestamp: 'Today, 03:15 AM',
    farmerId: 'farmer-2',
    farmerName: 'Alejandro Cruz',
    farmName: 'Cruz Heirloom Groves',
    distanceKm: 26.8,
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    terroirTag: 'Yolo River Silt',
    flavorNotes: ['Deep Umami', 'Low Acidity', 'Dense Flesh'],
    nutrition: {
      calories: '22 kcal / 100g',
      highlights: ['Potent Lycopene', 'Beta-Carotene', 'Vitamin C'],
      shelfLifeDays: 6
    },
    inventoryKg: 54,
    priceBreakdown: {
      farmerPayout: 338,
      coldChainLogistics: 26,
      platformFee: 16
    },
    harvestBatchCode: 'CHG-26-SMT-41',
    batchTempCelsius: 11.5,
    description: 'Dry-farmed heritage Italian plum tomatoes bursting with concentrated sugars and deep savory pectin. Harvested at peak blush directly from mature perennial vines.',
    tastingNotes: 'Rich velvety pulp, natural fruit sweetness and balanced mild tang with minimal seed cavities.',
    isPopular: true
  },
  {
    id: 'prod-3',
    name: 'Golden Chanterelle & Forest Oysters',
    botanicalName: 'Cantharellus cibarius & Pleurotus ostreatus',
    category: 'Mushrooms',
    price: 680,
    unit: '350g cedar box',
    harvestTimeAgo: 'Harvested 2h ago',
    harvestTimestamp: 'Today, 05:45 AM',
    farmerId: 'farmer-3',
    farmerName: 'Dr. Arthur & Sylvi Chen',
    farmName: 'MycoTerra Forest Reserve',
    distanceKm: 19.5,
    imageUrl: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
    terroirTag: 'Marin Fog Humus',
    flavorNotes: ['Apricot Aroma', 'Woody Pepper', 'Silky Velvety'],
    nutrition: {
      calories: '32 kcal / 100g',
      highlights: ['Bioactive Ergothioneine', 'Vitamin D2', 'Copper & Iron'],
      shelfLifeDays: 5
    },
    inventoryKg: 22,
    priceBreakdown: {
      farmerPayout: 618,
      coldChainLogistics: 38,
      platformFee: 24
    },
    harvestBatchCode: 'MTF-26-GCH-03',
    batchTempCelsius: 3.9,
    description: 'Hand-brushed coastal forest mushrooms gently gathered under morning fog conditions. Plump, aromatic caps with delicate hints of fresh stonefruit and woodland earth.',
    tastingNotes: 'Faint apricot perfumed bouquet transitioning into rich savory buttery texture when sautéed.',
    isPopular: true
  },
  {
    id: 'prod-4',
    name: 'Crisp Pink Pearl & Gravenstein Apples',
    botanicalName: 'Malus domestica \'Gravenstein\'',
    category: 'Fruits',
    price: 340,
    unit: '1.5 kg paper basket',
    harvestTimeAgo: 'Harvested 5h ago',
    harvestTimestamp: 'Today, 02:40 AM',
    farmerId: 'farmer-4',
    farmerName: 'Margaret & Sarah O\'Donnell',
    farmName: 'Highland Crest Apiary & Orchard',
    distanceKm: 31.0,
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80',
    terroirTag: 'Dry Creek Gravel Loam',
    flavorNotes: ['Crisp Tart Snap', 'Honey Blossom', 'Pink Rosé Juice'],
    nutrition: {
      calories: '52 kcal / 100g',
      highlights: ['Soluble Apple Pectin', 'Quercetin Flavonoids', 'Vitamin C'],
      shelfLifeDays: 14
    },
    inventoryKg: 70,
    priceBreakdown: {
      farmerPayout: 295,
      coldChainLogistics: 28,
      platformFee: 17
    },
    harvestBatchCode: 'HCA-26-APP-17',
    batchTempCelsius: 6.1,
    description: 'Hand-picked from 70-year-old hillside heritage standard rootstock. Thin skins with an electric champagne acidity and stunning translucent pink-veined flesh.',
    tastingNotes: 'Intense cidery aroma, sharp morning juiciness, and complex floral finish.',
    isPopular: false
  },
  {
    id: 'prod-5',
    name: 'Raw Mountain Wildflower & Bramble Honey',
    botanicalName: 'Raw Unfiltered Mel (Rubus & Lavandula)',
    category: 'Dairy & Apiary',
    price: 780,
    unit: '480g glass jar with beeswax seal',
    harvestTimeAgo: 'Extracted Yesterday, 4 PM',
    harvestTimestamp: 'Yesterday, 16:00 PM',
    farmerId: 'farmer-4',
    farmerName: 'Margaret & Sarah O\'Donnell',
    farmName: 'Highland Crest Apiary & Orchard',
    distanceKm: 31.0,
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    terroirTag: 'Foothill Wild Flora',
    flavorNotes: ['Wild Blackberry Blossom', 'Spiced Caramel', 'Raw Propolis'],
    nutrition: {
      calories: '64 kcal / tbsp',
      highlights: ['Live Diastase Enzymes', 'Active Pollen Grains', 'Antioxidant Polyphenols'],
      shelfLifeDays: 365
    },
    inventoryKg: 40,
    priceBreakdown: {
      farmerPayout: 677,
      coldChainLogistics: 62,
      platformFee: 41
    },
    harvestBatchCode: 'HCA-26-HNY-82',
    batchTempCelsius: 18.2,
    description: 'Cold-centrifuged unheated comb honey bursting with wild pollen clusters, propolis aromatics, and rich floral complexity. Never filtered or pasteurized.',
    tastingNotes: 'Thick crystalline spreadability with lingering blackberry bramble notes and warm golden amber body.',
    isPopular: true
  },
  {
    id: 'prod-6',
    name: 'Granite Cold-Milled Einkorn Flour',
    botanicalName: 'Triticum monococcum (Stone Ground)',
    category: 'Grains',
    price: 420,
    unit: '1 kg kraft sack',
    harvestTimeAgo: 'Milled 3h ago',
    harvestTimestamp: 'Today, 04:00 AM',
    farmerId: 'farmer-5',
    farmerName: 'Devon Takahashi',
    farmName: 'Sunstone Heritage Mill',
    distanceKm: 11.5,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    terroirTag: 'Petaluma River Alluvium',
    flavorNotes: ['Toasted Walnut', 'Golden Honey Crust', 'Sweet Cream'],
    nutrition: {
      calories: '340 kcal / 100g',
      highlights: ['Low-Allergenic Gluten Structure', 'Lutein (Eye Health)', 'High Protein (18%)'],
      shelfLifeDays: 90
    },
    inventoryKg: 65,
    priceBreakdown: {
      farmerPayout: 368,
      coldChainLogistics: 32,
      platformFee: 20
    },
    harvestBatchCode: 'SHM-26-EKF-12',
    batchTempCelsius: 16.0,
    description: 'Antique diploid grain cultivated by humanity for 10,000 years. Slowly milled between Austrian granite stones under 30°C to keep live wheat germ oils intact.',
    tastingNotes: 'Nutty golden crumb, soft digestibility, and buttery brioche aroma upon baking.',
    isPopular: false
  },
  {
    id: 'prod-7',
    name: 'Dew-Cut Dinosaur Lacinato Kale',
    botanicalName: 'Brassica oleracea var. palmifolia',
    category: 'Vegetables',
    price: 180,
    unit: '350g bundled bunch',
    harvestTimeAgo: 'Harvested 2.5h ago',
    harvestTimestamp: 'Today, 05:10 AM',
    farmerId: 'farmer-1',
    farmerName: 'Elena & Mateo Vance',
    farmName: 'Stillfield River Basin',
    distanceKm: 14.2,
    imageUrl: 'https://images.unsplash.com/photo-1524179091875-bf99a9a6fa57?auto=format&fit=crop&w=800&q=80',
    terroirTag: 'Volcanic Sandy Loam',
    flavorNotes: ['Sweet Mineral', 'Tender Ribs', 'Zero Bitterness'],
    nutrition: {
      calories: '35 kcal / 100g',
      highlights: ['Vitamin K1 (500% DV)', 'Lutein', 'Sulforaphane'],
      shelfLifeDays: 7
    },
    inventoryKg: 45,
    priceBreakdown: {
      farmerPayout: 159,
      coldChainLogistics: 13,
      platformFee: 8
    },
    harvestBatchCode: 'STF-26-KAL-04',
    batchTempCelsius: 4.2,
    description: 'Deep midnight-blue crinkled leaves harvested before sunrise while cellular sugars remain concentrated in the foliage. Tender enough to eat raw with citrus.',
    tastingNotes: 'Crisp juicy stem, sweet mineral finish with none of the rubbery texture of refrigerated grocery kale.',
    isPopular: false
  },
  {
    id: 'prod-8',
    name: 'Sweet Alpine Mara des Bois Strawberries',
    botanicalName: 'Fragaria vesca x ananassa',
    category: 'Fruits',
    price: 490,
    unit: '400g vented wood punnet',
    harvestTimeAgo: 'Harvested 1.5h ago',
    harvestTimestamp: 'Today, 06:15 AM',
    farmerId: 'farmer-2',
    farmerName: 'Alejandro Cruz',
    farmName: 'Cruz Heirloom Groves',
    distanceKm: 26.8,
    imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80',
    terroirTag: 'Yolo River Silt',
    flavorNotes: ['Wild Woodland Berry', 'Intense Perfume', 'High Sugar BRIX 14.8'],
    nutrition: {
      calories: '32 kcal / 100g',
      highlights: ['Anthocyanins', 'Vitamin C', 'Manganese'],
      shelfLifeDays: 3
    },
    inventoryKg: 18,
    priceBreakdown: {
      farmerPayout: 437,
      coldChainLogistics: 33,
      platformFee: 20
    },
    harvestBatchCode: 'CHG-26-MDB-22',
    batchTempCelsius: 5.5,
    description: 'Celebrated French culinary strawberry pairing the heady fragrance of wild alpine woods with the plump succulence of garden berries. Picked gently by hand with calyx attached.',
    tastingNotes: 'Aromatics perfume the room immediately; velvety melting bite with lingering wild berry essence.',
    isPopular: true
  },
  {
    id: 'prod-9',
    name: 'Freshly Dug Purple Majesty Fingerlings',
    botanicalName: 'Solanum tuberosum \'Purple Majesty\'',
    category: 'Vegetables',
    price: 260,
    unit: '1 kg earth sack',
    harvestTimeAgo: 'Harvested 4h ago',
    harvestTimestamp: 'Today, 03:45 AM',
    farmerId: 'farmer-1',
    farmerName: 'Elena & Mateo Vance',
    farmName: 'Stillfield River Basin',
    distanceKm: 14.2,
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    terroirTag: 'Volcanic Sandy Loam',
    flavorNotes: ['Buttery Chestnuts', 'Velvety Starch', 'Earthy Sweetness'],
    nutrition: {
      calories: '75 kcal / 100g',
      highlights: ['Anthocyanins (4x standard potato)', 'Potassium', 'Complex Carbs'],
      shelfLifeDays: 21
    },
    inventoryKg: 60,
    priceBreakdown: {
      farmerPayout: 230,
      coldChainLogistics: 19,
      platformFee: 11
    },
    harvestBatchCode: 'STF-26-POT-11',
    batchTempCelsius: 12.0,
    description: 'Intense violet skin and royal purple flesh retained even after roasting. Dug from cool morning soil with delicate paper skin intact.',
    tastingNotes: 'Firm, buttery texture that roasts with a delicate crisp blister and rich chestnut sweetness.',
    isPopular: false
  },
  {
    id: 'prod-10',
    name: 'Hydro-Cooled Genovese Sweet Basil',
    botanicalName: 'Ocimum basilicum var. macrophyllum',
    category: 'Herbs',
    price: 160,
    unit: '120g living root bunch',
    harvestTimeAgo: 'Harvested 2h ago',
    harvestTimestamp: 'Today, 05:30 AM',
    farmerId: 'farmer-2',
    farmerName: 'Alejandro Cruz',
    farmName: 'Cruz Heirloom Groves',
    distanceKm: 26.8,
    imageUrl: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=800&q=80',
    terroirTag: 'Yolo River Silt',
    flavorNotes: ['Sweet Anise', 'Clove Essential Oil', 'Peppery Finish'],
    nutrition: {
      calories: '23 kcal / 100g',
      highlights: ['Eugenol Essential Oils', 'Vitamin K', 'Rosmarinic Acid'],
      shelfLifeDays: 10
    },
    inventoryKg: 25,
    priceBreakdown: {
      farmerPayout: 142,
      coldChainLogistics: 11,
      platformFee: 7
    },
    harvestBatchCode: 'CHG-26-BSL-08',
    batchTempCelsius: 9.0,
    description: 'Bundled with tap roots moistly protected in organic moss. Retains live turgor and explosive volatile oils for authentic culinary pesto.',
    tastingNotes: 'Piercingly aromatic, sweet clove and floral licorice without any bitter oxidation.',
    isPopular: false
  }
];

export const INITIAL_ACTIVE_DELIVERY: ActiveDelivery = {
  orderId: 'STF-8842-DL',
  createdAt: '07:15 AM Today',
  estimatedArrivalMinutes: 14,
  courierName: 'Julian Morales (Electric Cargo Transit)',
  courierVehicle: 'Rivian Commercial Cold-Van #14',
  temperatureSensorReading: 4.6,
  currentRouteNodeIndex: 2,
  itemsCount: 4,
  totalPaid: 1680,
  farmerPayoutTotal: 1485,
  destinationAddress: '742 Heritage Lane, East Estate Hub',
  routeNodes: [
    {
      id: 'node-1',
      stepName: 'Dawn Soil Cut & Tagging',
      location: 'Stillfield River Basin Plots',
      timestamp: '05:30 AM',
      status: 'completed',
      detail: 'Produce selectively cut by Mateo Vance. RFID batch tags calibrated and logged.',
      temperatureCelsius: 11.2
    },
    {
      id: 'node-2',
      stepName: 'Hydro-Chill & Zero-Intermediary Depot',
      location: 'Stillfield Clean Hub (Node 4)',
      timestamp: '06:40 AM',
      status: 'completed',
      detail: 'Rapid hydro-cooling brought produce core temperature down to 4.5°C within 18 minutes. 100% direct grower disbursement issued.',
      temperatureCelsius: 4.5
    },
    {
      id: 'node-3',
      stepName: 'Electric Rapid Transit in Route',
      location: 'Express Corridor · Sector 18',
      timestamp: '07:18 AM',
      status: 'current',
      detail: 'Dispatched in insulated active chiller pod. Live vehicle telemetry linked.',
      temperatureCelsius: 4.6
    },
    {
      id: 'node-4',
      stepName: 'Doorstep Hand-Off',
      location: 'Customer Address (Downtown)',
      timestamp: 'Estimated 07:45 AM',
      status: 'upcoming',
      detail: 'Placed in breathable returnable cellulose tote at doorstep.',
      temperatureCelsius: 4.8
    }
  ]
};
