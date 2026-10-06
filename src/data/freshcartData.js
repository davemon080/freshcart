// FreshCart Master Operations & Risk Framework Data
// Reference: FC-OPS-2026-V1 & FC-RISK-2026-V1
// Project Lead: Ujah Israel O. | Primary Region: AMAC & FCT LGAs

export const LGA_REGIONS = [
  {
    id: 'AMAC',
    name: 'Abuja Municipal Area Council (AMAC)',
    hubs: [
      { id: 'hub-utako', name: 'Utako Market Booth (Primary Hub)', zone: 'Zone A', lat: 9.0625, lng: 7.4412, agentsCount: 4, ridersCount: 15 },
      { id: 'hub-garki', name: 'Garki Model Market Booth', zone: 'Zone A', lat: 9.0289, lng: 7.4912, agentsCount: 3, ridersCount: 10 },
      { id: 'hub-wuse', name: 'Wuse Market Aggregation Center', zone: 'Zone A', lat: 9.0715, lng: 7.4645, agentsCount: 2, ridersCount: 8 }
    ],
    landmarks: [
      'Opposite Mobil Filling Station, Utako',
      'Estate Gate B, Mabushi Junction',
      'Federal Secretariat Phase 1 Gate, Maitama',
      'Banex Plaza Corner, Wuse 2',
      'Area 1 Shopping Complex Gate, Garki',
      'Jabi Lake Mall Main Gate',
      'Guzape Hilltop View Estate Gate',
      'Games Village Main Security Gate'
    ],
    maxRadiusKm: 10,
    peakRadiusKm: 5,
    active: true
  },
  {
    id: 'BWARI',
    name: 'Bwari Area Council (Kubwa)',
    hubs: [
      { id: 'hub-kubwa', name: 'Kubwa Market Hub', zone: 'Zone B', lat: 9.1550, lng: 7.3320, agentsCount: 2, ridersCount: 8 }
    ],
    landmarks: [
      'Kubwa Phase 4 Junction',
      'NYSC Camp Gate, Kubwa',
      'Total Filling Station, PW Road'
    ],
    maxRadiusKm: 10,
    peakRadiusKm: 5,
    active: true
  },
  {
    id: 'GWAGWALADA',
    name: 'Gwagwalada Area Council',
    hubs: [
      { id: 'hub-gwagwalada', name: 'Gwagwalada Central Market Hub', zone: 'Zone C', lat: 8.9432, lng: 7.0890, agentsCount: 2, ridersCount: 6 }
    ],
    landmarks: [
      'UniAbuja Mini-Campus Gate',
      'Specialist Hospital Roundabout',
      'Park Road Motor Park'
    ],
    maxRadiusKm: 10,
    peakRadiusKm: 5,
    active: true
  }
];

export const PRODUCE_CATALOG = [
  {
    id: 'veg-01',
    name: 'Fresh Fluted Pumpkin (Ugu)',
    category: 'Fresh Vegetables',
    traditionalUnit: '"Tie" / Bunch',
    standardUnit: 'Standard 500g Cleaned & Tied Bundle',
    qualityTolerance: 'Washed, root-trimmed, zero yellowing leaves',
    price: 1200,
    wholesalePrice: 950,
    marketHub: 'Utako Market Booth',
    stock: 45,
    image: '🥬',
    description: 'Fresh morning harvest from vetted vegetable gardens. Washed, de-soiled, root-trimmed, ready to slice.',
    tempRequirement: 'Ambient / Ventilated Mesh Compartment'
  },
  {
    id: 'veg-02',
    name: 'Waterleaf / Spinach (Efo)',
    category: 'Fresh Vegetables',
    traditionalUnit: '"Tie" / Bunch',
    standardUnit: 'Standard 500g Cleaned Bundle',
    qualityTolerance: 'Washed, root-trimmed, zero slimy stems',
    price: 900,
    wholesalePrice: 700,
    marketHub: 'Utako Market Booth',
    stock: 35,
    image: '🌱',
    description: 'Crisp green waterleaf for soups, thoroughly rinsed to remove sand particles.',
    tempRequirement: 'Ambient / Ventilated Mesh Compartment'
  },
  {
    id: 'veg-03',
    name: 'Scent Leaf / Efirin',
    category: 'Fresh Vegetables',
    traditionalUnit: '"Tie" / Small Bunch',
    standardUnit: 'Standard 250g Aromatic Bundle',
    qualityTolerance: 'Fresh aromatic leaves, zero browning',
    price: 600,
    wholesalePrice: 450,
    marketHub: 'Utako Market Booth',
    stock: 28,
    image: '🌿',
    description: 'Fragrant natural herbs for pepper soup and medicinal teas, handpicked at dawn.',
    tempRequirement: 'Ambient / Ventilated Mesh Compartment'
  },
  {
    id: 'tom-01',
    name: 'Fresh Jos Tomatoes',
    category: 'Raw Tomatoes / Peppers',
    traditionalUnit: '"Painter Bucket" (Small)',
    standardUnit: 'Exact 2.5kg Calibrated Bucket',
    qualityTolerance: 'Firm skin, maximum 2% softness tolerance, zero decay',
    price: 4500,
    wholesalePrice: 3800,
    marketHub: 'Utako Market Booth',
    stock: 25,
    image: '🍅',
    description: 'Plump, firm Jos tomatoes weighed on digital calibrated scales at the market booth.',
    tempRequirement: 'Dry Insulated Section'
  },
  {
    id: 'tom-02',
    name: 'Fresh Habanero Pepper (Rodo)',
    category: 'Raw Tomatoes / Peppers',
    traditionalUnit: '"Derica" / Half Bucket',
    standardUnit: 'Exact 1.0kg Calibrated Bag',
    qualityTolerance: 'Fiery red & yellow, firm skin, zero soft patches',
    price: 2800,
    wholesalePrice: 2300,
    marketHub: 'Utako Market Booth',
    stock: 30,
    image: '🌶️',
    description: 'Fresh pungent Scotch bonnet peppers, carefully checked for punctures and rot.',
    tempRequirement: 'Dry Insulated Section'
  },
  {
    id: 'tom-03',
    name: 'Bell Pepper (Tatashe)',
    category: 'Raw Tomatoes / Peppers',
    traditionalUnit: '"Painter Bucket" Portion',
    standardUnit: 'Exact 1.5kg Sealed Bag',
    qualityTolerance: 'Deep scarlet, thick walls, crisp feel',
    price: 3200,
    wholesalePrice: 2700,
    marketHub: 'Utako Market Booth',
    stock: 20,
    image: '🫑',
    description: 'High-grade Tatashe peppers perfect for native jollof and rich tomato paste base.',
    tempRequirement: 'Dry Insulated Section'
  },
  {
    id: 'meat-01',
    name: 'Prime Beef (Assorted / Lean Cut)',
    category: 'Fresh Meat & Poultry',
    traditionalUnit: '"Kilo"',
    standardUnit: 'Net Weight 1.0kg Vacuum-Sealed',
    qualityTolerance: 'Hygienically slaughtered same-day, kept chilled at 4°C',
    price: 5200,
    wholesalePrice: 4400,
    marketHub: 'Utako Market Booth',
    stock: 18,
    image: '🥩',
    description: 'Inspected local beef from clean abattoir stalls, vacuum-sealed with ice-pack transit box.',
    tempRequirement: 'Ice-Pack Cold Section (4°C Invariant)'
  },
  {
    id: 'meat-02',
    name: 'Tender Goat Meat',
    category: 'Fresh Meat & Poultry',
    traditionalUnit: '"Kilo"',
    standardUnit: 'Net Weight 1.0kg Vacuum-Sealed',
    qualityTolerance: 'Singed & thoroughly cleaned, slaughtered same-day, 4°C',
    price: 6800,
    wholesalePrice: 5800,
    marketHub: 'Utako Market Booth',
    stock: 15,
    image: '🍖',
    description: 'Naturally flavored local goat meat portioned and packaged in food-grade bio-bags.',
    tempRequirement: 'Ice-Pack Cold Section (4°C Invariant)'
  },
  {
    id: 'meat-03',
    name: 'Dressed Local Chicken',
    category: 'Fresh Meat & Poultry',
    traditionalUnit: '"Whole Bird"',
    standardUnit: 'Net Weight 1.8kg Dressed & Chilled',
    qualityTolerance: 'De-feathered, gutted, zero odor, chilled at 4°C',
    price: 7500,
    wholesalePrice: 6400,
    marketHub: 'Utako Market Booth',
    stock: 12,
    image: '🍗',
    description: 'Freshly dressed healthy village chicken, vacuum sealed for maximum freshness.',
    tempRequirement: 'Ice-Pack Cold Section (4°C Invariant)'
  },
  {
    id: 'grain-01',
    name: 'White Ijebu Garri',
    category: 'Grains & Staples',
    traditionalUnit: '"Mudu"',
    standardUnit: 'Standardized 1.5kg Sealed Pouch',
    qualityTolerance: 'De-stoned, machine-cleaned, moisture < 12%',
    price: 1800,
    wholesalePrice: 1500,
    marketHub: 'Utako Market Booth',
    stock: 40,
    image: '🥣',
    description: 'Crisp, sour white Ijebu garri, thoroughly sifted and packaged in moisture-proof pouches.',
    tempRequirement: 'Dry Insulated Section'
  },
  {
    id: 'grain-02',
    name: 'Stone-Free Nigerian Rice',
    category: 'Grains & Staples',
    traditionalUnit: '"Mudu"',
    standardUnit: 'Standardized 1.5kg Sealed Pouch',
    qualityTolerance: 'Zero stones, polished long grains, moisture < 12%',
    price: 3400,
    wholesalePrice: 2900,
    marketHub: 'Utako Market Booth',
    stock: 50,
    image: '🍚',
    description: 'Top-grade stone-free parboiled local rice, cleaned and pre-weighed into sealed packs.',
    tempRequirement: 'Dry Insulated Section'
  },
  {
    id: 'grain-03',
    name: 'Oloyin Honey Beans',
    category: 'Grains & Staples',
    traditionalUnit: '"Mudu"',
    standardUnit: 'Standardized 1.5kg Sealed Pouch',
    qualityTolerance: 'Machine cleaned, zero weevils, sweet variety',
    price: 3800,
    wholesalePrice: 3200,
    marketHub: 'Utako Market Booth',
    stock: 35,
    image: '🫘',
    description: 'Naturally sweet brown honey beans, sorted to eliminate stones, debris, and hollow pods.',
    tempRequirement: 'Dry Insulated Section'
  },
  {
    id: 'tuber-01',
    name: 'Large Abuja Yam (Benue Source)',
    category: 'Tubers & Roots',
    traditionalUnit: '"Heap of 5" / Single Tuber',
    standardUnit: 'Weight Grade: Large Yam Tuber (3.2kg+)',
    qualityTolerance: 'Unbroken skin, firm endpoints, zero rot or mold',
    price: 4000,
    wholesalePrice: 3300,
    marketHub: 'Utako Market Booth',
    stock: 30,
    image: '🥔',
    description: 'Grade-A dry Benue yam tuber weighed at over 3.2kg. Ideal for pounded yam or boiled yam.',
    tempRequirement: 'Dry Insulated Section'
  },
  {
    id: 'tuber-02',
    name: 'Sweet Potatoes (Bwari Farm)',
    category: 'Tubers & Roots',
    traditionalUnit: '"Heap of 5"',
    standardUnit: 'Standardized 2.5kg Mesh Bag',
    qualityTolerance: 'Firm tubers, cleaned surface, no fungal spots',
    price: 2200,
    wholesalePrice: 1750,
    marketHub: 'Utako Market Booth',
    stock: 25,
    image: '🍠',
    description: 'Naturally sweet orange-flesh potatoes, root-trimmed and packed in aerated mesh bags.',
    tempRequirement: 'Dry Insulated Section'
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'FC-8924',
    buyer: {
      name: 'Dr. Amina Bello',
      phone: '+234 803 555 0192',
      lga: 'AMAC',
      hub: 'Utako Market Booth',
      landmark: 'Opposite Mobil Filling Station, Utako',
      gpsCoords: '9.0642° N, 7.4435° E',
      deliveryAddress: 'Plot 412, Mike Akhigbe Way, Utako District, Abuja'
    },
    items: [
      { id: 'veg-01', name: 'Fresh Fluted Pumpkin (Ugu)', qty: 2, price: 1200, standardUnit: '500g Cleaned Bundle' },
      { id: 'tom-01', name: 'Fresh Jos Tomatoes', qty: 1, price: 4500, standardUnit: '2.5kg Bucket' },
      { id: 'meat-01', name: 'Prime Beef (Assorted)', qty: 1, price: 5200, standardUnit: '1.0kg Vacuum-Sealed' }
    ],
    produceTotal: 12100,
    deliveryFee: 1100, // 3.5km within LGA
    packagingFee: 200, // Flat eco-friendly hygienic seal
    totalAmount: 13400,
    vendorShare: 10600,
    riderPayout: 880,
    platformMargin: 1539,
    paymentMethod: 'In-App Escrow Wallet',
    paymentStatus: 'Escrow Locked',
    orderPin: '7492',
    status: 'IN_TRANSIT', // 'PENDING_HUB', 'PACKING', 'READY_FOR_PICKUP', 'IN_TRANSIT', 'DELIVERED', 'REJECTED'
    placedAt: '10:12 AM',
    slaTargetMinutes: 45,
    minutesElapsed: 28,
    rider: {
      name: 'Chinedu Okafor',
      phone: '+234 814 333 4455',
      id: 'RIDER-AMAC-04',
      vehicle: 'TVS Neo 125cc (Plate: ABJ-482-KU)',
      thermalBoxChecked: true,
      currentLocation: 'Obafemi Awolowo Way (1.2km to destination)',
      offRouteDriftMinutes: 0
    },
    agent: {
      name: 'Fatima Garba',
      id: 'AGENT-UTAKO-01',
      scaleCalibrationTimestamp: '06:30 AM',
      weighingCheckPassed: true,
      barcodeSealId: 'BC-AMAC-99201-OK'
    }
  },
  {
    id: 'FC-8925',
    buyer: {
      name: 'Segun Adebayo',
      phone: '+234 802 111 8834',
      lga: 'AMAC',
      hub: 'Utako Market Booth',
      landmark: 'Estate Gate B, Mabushi Junction',
      gpsCoords: '9.0812° N, 7.4621° E',
      deliveryAddress: 'House 14, Vintage Crest Estate, Mabushi, Abuja'
    },
    items: [
      { id: 'tuber-01', name: 'Large Abuja Yam (Benue Source)', qty: 2, price: 4000, standardUnit: '3.2kg+ Large Tuber' },
      { id: 'meat-02', name: 'Tender Goat Meat', qty: 1, price: 6800, standardUnit: '1.0kg Vacuum-Sealed' }
    ],
    produceTotal: 14800,
    deliveryFee: 1200,
    packagingFee: 200,
    totalAmount: 16200,
    vendorShare: 12400,
    riderPayout: 960,
    platformMargin: 2397,
    paymentMethod: 'Debit Card (Paystack)',
    paymentStatus: 'Escrow Locked',
    orderPin: '3185',
    status: 'PACKING',
    placedAt: '10:25 AM',
    slaTargetMinutes: 45,
    minutesElapsed: 12,
    rider: null,
    agent: {
      name: 'Fatima Garba',
      id: 'AGENT-UTAKO-01',
      scaleCalibrationTimestamp: '06:30 AM',
      weighingCheckPassed: true,
      barcodeSealId: 'BC-AMAC-99202-PENDING'
    }
  },
  {
    id: 'FC-8921',
    buyer: {
      name: 'Ngozi Eze',
      phone: '+234 806 777 9922',
      lga: 'AMAC',
      hub: 'Utako Market Booth',
      landmark: 'Federal Secretariat Phase 1 Gate, Maitama',
      gpsCoords: '9.0588° N, 7.4890° E',
      deliveryAddress: 'Flat 3B, Ibrahim Babangida Way, Maitama, Abuja'
    },
    items: [
      { id: 'grain-02', name: 'Stone-Free Nigerian Rice', qty: 2, price: 3400, standardUnit: '1.5kg Sealed Pouch' },
      { id: 'grain-03', name: 'Oloyin Honey Beans', qty: 1, price: 3800, standardUnit: '1.5kg Sealed Pouch' }
    ],
    produceTotal: 10600,
    deliveryFee: 1100,
    packagingFee: 200,
    totalAmount: 11900,
    vendorShare: 9000,
    riderPayout: 880,
    platformMargin: 1641,
    paymentMethod: 'Bank Transfer (Virtual Account)',
    paymentStatus: 'Settled to Vendors & Rider',
    orderPin: '8219',
    status: 'DELIVERED',
    placedAt: '09:15 AM',
    slaTargetMinutes: 45,
    minutesElapsed: 41,
    rider: {
      name: 'Ibrahim Musa',
      phone: '+234 818 999 1234',
      id: 'RIDER-AMAC-02',
      vehicle: 'Bajaj Boxer 100cc (Plate: RSH-129-AA)',
      thermalBoxChecked: true,
      currentLocation: 'Delivered at Doorstep',
      offRouteDriftMinutes: 0
    },
    agent: {
      name: 'Fatima Garba',
      id: 'AGENT-UTAKO-01',
      scaleCalibrationTimestamp: '06:30 AM',
      weighingCheckPassed: true,
      barcodeSealId: 'BC-AMAC-99180-VERIFIED'
    }
  }
];

export const RISK_ENFORCEMENT_RULES = [
  {
    riskVector: 'Damaged Produce',
    detectionMechanism: 'Buyer photo upload + Market Agent return check',
    penalty: 'Vendor absorbs item cost; 3 strikes = Vendor ban',
    severity: 'High',
    activeIncidents: 0
  },
  {
    riskVector: 'Broken Package Seal',
    detectionMechanism: 'Rider inspection audit at doorstep',
    penalty: 'Rider fined 100% of delivery compensation',
    severity: 'Critical',
    activeIncidents: 0
  },
  {
    riskVector: 'False Quality Claim',
    detectionMechanism: 'Market Agent return inspection at booth',
    penalty: 'Buyer account flagged for mandatory PIN pre-validation',
    severity: 'Medium',
    activeIncidents: 0
  },
  {
    riskVector: 'Rider Off-Route Drift',
    detectionMechanism: 'GPS tracking alerts if rider stops > 10 mins off-route',
    penalty: 'Rider flagged for investigation and queue hold',
    severity: 'High',
    activeIncidents: 0
  }
];

export const VENDOR_STRIKE_LIST = [
  { vendorName: 'Alhaji Danladi Meats (Stall 44, Utako)', category: 'Fresh Meat', strikes: 0, status: 'Active Verified', hygieneRating: '98%' },
  { vendorName: 'Mama Nkechi Veggie Hub (Stall 12, Utako)', category: 'Vegetables', strikes: 1, status: 'Warning Notice (1/3)', hygieneRating: '92%' },
  { vendorName: 'Mallam Sani Tubers & Yams (Stall 88, Utako)', category: 'Tubers & Roots', strikes: 0, status: 'Active Verified', hygieneRating: '96%' },
  { vendorName: 'Madam Blessing Grains (Stall 21, Utako)', category: 'Grains & Staples', strikes: 0, status: 'Active Verified', hygieneRating: '95%' }
];
