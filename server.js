const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, 'data');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/brand logo.png', express.static(path.join(__dirname, 'brand logo.png')));

// Ensure Data Directory & Storage Files Exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readData(file, defaultData) {
  const filePath = path.join(DATA_DIR, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeData(file, data) {
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2));
}

// Initial Grains Database (100% Heirloom Grains Only)
const initialGrains = [
  {
    id: "bh-emmer",
    name: "Ancient Khapli (Emmer) Wheat",
    category: "wheat",
    categoryName: "Ancient Wheats",
    price: 15.00,
    originalPrice: 18.50,
    rating: 4.96,
    reviewsCount: 384,
    badge: "Diabetic Friendly",
    weight: "2 Kg Pack",
    batchNumber: "BH-KHAPLI-2026",
    millingOptions: ["Stoneground Atta (Fine)", "Coarse Daliya", "Whole Grain Kernel"],
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80",
    description: "Centuries-old diploid AABB heirloom grain. Low glycemic index (48), high water-soluble gluten that is easy on sensitive intestines. Cold stone-milled at <35°C.",
    origin: "Bijapur Organic Farmlands, Karnataka",
    curator: "Kisan Sangathan Heritage Collective",
    glycemicIndex: "Low (48)",
    protein: "14.4g / 100g",
    fiber: "12.8g / 100g",
    pesticideResidue: "0.000% across 220 tests"
  },
  {
    id: "bh-bansi",
    name: "Native Bansi Kathiya Cracked Wheat (Daliya)",
    category: "wheat",
    categoryLabel: "Ancient Wheats",
    categoryName: "Ancient Wheats",
    price: 11.50,
    originalPrice: 14.00,
    rating: 4.90,
    reviewsCount: 195,
    badge: "100% Germ Intact",
    weight: "1 Kg Pack",
    batchNumber: "BH-BANSI-2026",
    millingOptions: ["Coarse Porridge Grain", "Fine Rava (Suji)"],
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=900&q=80",
    description: "Golden heirloom durum wheat from rainfed black soils. High in natural beta-carotene with live wheat germ preserved without degermination.",
    origin: "Nimar Valley, Madhya Pradesh",
    curator: "Estate of Gangadhar Rao",
    glycemicIndex: "Moderate (52)",
    protein: "13.8g / 100g",
    fiber: "11.2g / 100g",
    pesticideResidue: "0.000% across 220 tests"
  },
  {
    id: "bh-foxtail",
    name: "Sacred Unpolished Foxtail Millet (Kangni)",
    category: "millets",
    categoryName: "Positive Millets",
    price: 10.80,
    originalPrice: 13.50,
    rating: 4.94,
    reviewsCount: 260,
    badge: "Zero Polish",
    weight: "1 Kg Pack",
    batchNumber: "BH-FOXTAIL-2026",
    millingOptions: ["Whole Dehulled Grain", "Stoneground Millet Flour"],
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
    description: "Positive millet nurtured exclusively by monsoon rains. Rich in magnesium, plant iron, and resistant starch that protects blood glucose stability.",
    origin: "Deccan Dryland Belt, Andhra Pradesh",
    curator: "Savitri Organic Guild",
    glycemicIndex: "Low (49)",
    protein: "12.3g / 100g",
    fiber: "10.0g / 100g",
    pesticideResidue: "0.000% across 220 tests"
  },
  {
    id: "bh-ragi",
    name: "Sprouted Mandya Ragi (Finger Millet)",
    category: "millets",
    categoryName: "Positive Millets",
    price: 10.00,
    originalPrice: 12.50,
    rating: 4.98,
    reviewsCount: 420,
    badge: "10x Calcium",
    weight: "1 Kg Pack",
    batchNumber: "BH-RAGI-2026",
    millingOptions: ["Sprouted Fine Flour", "Whole Grain"],
    image: "https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?auto=format&fit=crop&w=900&q=80",
    description: "48-hour germinated finger millet. Sprouting destroys enzyme inhibitors, elevating bio-available calcium up to 344mg per 100g.",
    origin: "Mandya Agro Valley, Karnataka",
    curator: "Vaidya Organic Farmers Federation",
    glycemicIndex: "Low (51)",
    protein: "11.6g / 100g",
    fiber: "14.1g / 100g",
    pesticideResidue: "0.000% across 220 tests"
  },
  {
    id: "bh-blackrice",
    name: "Himalayan Aromatic Black Rice (Chak-Hao)",
    category: "rice",
    categoryName: "Heritage Rice",
    price: 18.50,
    originalPrice: 22.50,
    rating: 5.00,
    reviewsCount: 212,
    badge: "Royal Supergrain",
    weight: "1 Kg Pack",
    batchNumber: "BH-BLACKRICE-2026",
    millingOptions: ["Whole Aromatic Kernel"],
    image: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=900&q=80",
    description: "Legendary forbidden heirloom rice possessing anthocyanin levels higher than blueberries. Deep floral hazelnut aroma upon steaming.",
    origin: "Imphal Foothills, Manipur",
    curator: "Meitei Indigenous Reserve",
    glycemicIndex: "Low (43)",
    protein: "9.9g / 100g",
    fiber: "9.2g / 100g",
    pesticideResidue: "0.000% across 220 tests"
  },
  {
    id: "bh-redrice",
    name: "Navara 2,000-Year Ayurvedic Red Rice",
    category: "rice",
    categoryName: "Heritage Rice",
    price: 16.80,
    originalPrice: 20.00,
    rating: 4.88,
    reviewsCount: 164,
    badge: "GI Tagged",
    weight: "1 Kg Pack",
    batchNumber: "BH-NAVARA-2026",
    millingOptions: ["100% Unpolished Red Bran", "Semi-Polished"],
    image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=900&q=80",
    description: "Documented in Charaka Samhita. Celebrated for convalescence, internal strengthening, and anti-inflammatory cellular nourishment.",
    origin: "Palakkad Wetland Valley, Kerala",
    curator: "Namboodiri Organic Trust",
    glycemicIndex: "Low (50)",
    protein: "9.5g / 100g",
    fiber: "10.4g / 100g",
    pesticideResidue: "0.000% across 220 tests"
  },
  {
    id: "bh-browntop",
    name: "Rare Brown Top Detox Millet (Korale)",
    category: "millets",
    categoryName: "Positive Millets",
    price: 14.00,
    originalPrice: 17.50,
    rating: 4.95,
    reviewsCount: 138,
    badge: "12.5% Fiber",
    weight: "1 Kg Pack",
    batchNumber: "BH-BROWNTOP-2026",
    millingOptions: ["Whole Dehulled Grain"],
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=900&q=80",
    description: "The rarest positive grain. Acts as an internal gastro-intestinal scrubber with 12.5% balanced soluble and insoluble dietary fibers.",
    origin: "Tumkur Rainfed Lands, Karnataka",
    curator: "Khadar Valli Certified Cooperative",
    glycemicIndex: "Ultra-Low (42)",
    protein: "11.5g / 100g",
    fiber: "12.5g / 100g",
    pesticideResidue: "0.000% across 220 tests"
  },
  {
    id: "bh-jowar",
    name: "Solapur Maldandi White Jowar (M-35-1)",
    category: "coarse",
    categoryName: "Barley & Sorghum",
    price: 9.80,
    originalPrice: 12.00,
    rating: 4.91,
    reviewsCount: 180,
    badge: "Gluten Free",
    weight: "2 Kg Pack",
    batchNumber: "BH-MALDANDI-2026",
    millingOptions: ["Superfine Bhakri Flour", "Whole Grains"],
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80",
    description: "Sweet winter-stalk winter sorghum. Hand-threshed and slow-ground into pliable, velvety gluten-free rotis that remain soft for 24 hours.",
    origin: "Solapur Black Belt, Maharashtra",
    curator: "Sahyadri Heritage Seed Banks",
    glycemicIndex: "Low (48)",
    protein: "10.4g / 100g",
    fiber: "10.8g / 100g",
    pesticideResidue: "0.000% across 220 tests"
  }
];

// Initialize Storage
readData('grains.json', initialGrains);
readData('orders.json', []);
readData('inquiries.json', []);

// Valid Promo Codes
const PROMO_CODES = {
  "BHOOMI10": { type: "percent", discount: 10, minOrder: 20 },
  "HARVEST20": { type: "percent", discount: 20, minOrder: 60 },
  "FREESHIP": { type: "shipping", discount: 0, minOrder: 0 }
};

// ================= API ROUTES ================= //

// 1. Get Grains (supports category, sort, and query)
app.get('/api/grains', (req, res) => {
  const { category, search, sort } = req.query;
  let grains = readData('grains.json', initialGrains);

  if (category && category !== 'all') {
    grains = grains.filter(g => g.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    grains = grains.filter(g => 
      g.name.toLowerCase().includes(q) || 
      g.description.toLowerCase().includes(q) ||
      g.origin.toLowerCase().includes(q)
    );
  }

  if (sort === 'price-low') grains.sort((a, b) => a.price - b.price);
  if (sort === 'price-high') grains.sort((a, b) => b.price - a.price);
  if (sort === 'rating') grains.sort((a, b) => b.rating - a.rating);

  res.json({ success: true, count: grains.length, data: grains });
});

// 2. Validate Coupon Code
app.post('/api/coupon/validate', (req, res) => {
  const { code, subtotal } = req.body;
  if (!code) return res.status(400).json({ success: false, message: "Please provide a coupon code." });

  const promo = PROMO_CODES[code.toUpperCase()];
  if (!promo) {
    return res.status(404).json({ success: false, message: "Invalid coupon. Try 'BHOOMI10' or 'HARVEST20'." });
  }

  if (subtotal < promo.minOrder) {
    return res.status(400).json({ 
      success: false, 
      message: `Coupon requires a minimum order of $${promo.minOrder.toFixed(2)}.` 
    });
  }

  let discountAmount = 0;
  if (promo.type === 'percent') {
    discountAmount = (subtotal * promo.discount) / 100;
  }

  res.json({
    success: true,
    code: code.toUpperCase(),
    type: promo.type,
    discountAmount: parseFloat(discountAmount.toFixed(2)),
    message: `Coupon ${code.toUpperCase()} applied successfully!`
  });
});

// 3. Batch Traceability Verification
app.get('/api/trace/:batchId', (req, res) => {
  const batchId = req.params.batchId.toUpperCase();
  const grains = readData('grains.json', initialGrains);
  const found = grains.find(g => g.batchNumber.toUpperCase() === batchId);

  if (!found) {
    return res.status(404).json({
      success: false,
      message: "Batch number not recognized. Example valid batch: 'BH-KHAPLI-2026' or 'BH-BLACKRICE-2026'."
    });
  }

  res.json({
    success: true,
    grain: found.name,
    batch: found.batchNumber,
    estate: found.origin,
    curator: found.curator,
    harvestCycle: "Winter Harvest 2026 (Chemical Residue Free)",
    soilAnalysis: "Grade-1 Volcanic Humus Rich",
    labCertification: "NABL Certified Pesticide Residue: 0.000%",
    millingStandard: "Slow Emery Stone Churn at 32°C"
  });
});

// 4. Place Customer Order
app.post('/api/orders', (req, res) => {
  const { customer, items, totalAmount, discountAmount, couponUsed } = req.body;

  if (!customer || !customer.name || !customer.phone || !customer.address || !items || items.length === 0) {
    return res.status(400).json({ 
      success: false, 
      message: "Incomplete details. Name, contact phone, delivery address, and grain items are required." 
    });
  }

  const orders = readData('orders.json', []);
  const newOrder = {
    orderId: "BH-" + Math.floor(100000 + Math.random() * 900000),
    customer,
    items,
    totalAmount: parseFloat(totalAmount),
    discountAmount: parseFloat(discountAmount || 0),
    couponUsed: couponUsed || null,
    status: "Fresh Stone Milling Queued",
    dispatchWindow: "Within 36 Hours",
    placedAt: new Date().toISOString()
  };

  orders.push(newOrder);
  writeData('orders.json', orders);

  res.status(201).json({
    success: true,
    message: "Order placed directly with our artisan millers!",
    orderId: newOrder.orderId,
    order: newOrder
  });
});

// 5. Inquiries / Contact
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Please fill all fields." });
  }

  const inquiries = readData('inquiries.json', []);
  inquiries.push({ name, email, message, timestamp: new Date().toISOString() });
  writeData('inquiries.json', inquiries);

  res.json({ success: true, message: `Thank you, ${name}. Our agronomist will review your message within 24 hours.` });
});

app.listen(PORT, () => {
  console.log(`🌾 Bhoomi Harvest Enterprise Granary running on http://localhost:${PORT}`);
});