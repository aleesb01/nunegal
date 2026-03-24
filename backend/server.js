const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ─── Mock Data ──────────────────────────────────────────────────────────

const products = [
  {
    id: '0001',
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    price: '1199',
    imgUrl: 'https://cdn.dummyjson.com/products/images/smartphones/iPhone%2015%20Pro/1.png',
    cpu: 'A17 Pro Bionic',
    ram: '8 GB',
    os: 'iOS 17',
    displayResolution: '2556 x 1179',
    battery: '3274 mAh',
    primaryCamera: '48 MP + 12 MP + 12 MP',
    secondaryCmera: '12 MP',
    dimentions: '146.6 x 70.6 x 8.25 mm',
    weight: '187',
    internalMemory: [
      { code: 1, name: '128 GB' },
      { code: 2, name: '256 GB' },
      { code: 3, name: '512 GB' },
      { code: 4, name: '1 TB' },
    ],
    colors: [
      { code: 1, name: 'Natural Titanium' },
      { code: 2, name: 'Blue Titanium' },
      { code: 3, name: 'White Titanium' },
      { code: 4, name: 'Black Titanium' },
    ],
  },
  {
    id: '0002',
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra',
    price: '1299',
    imgUrl: 'https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S24/1.png',
    cpu: 'Snapdragon 8 Gen 3',
    ram: '12 GB',
    os: 'Android 14',
    displayResolution: '3120 x 1440',
    battery: '5000 mAh',
    primaryCamera: '200 MP + 12 MP + 50 MP + 10 MP',
    secondaryCmera: '12 MP',
    dimentions: '162.3 x 79.0 x 8.6 mm',
    weight: '232',
    internalMemory: [
      { code: 1, name: '256 GB' },
      { code: 2, name: '512 GB' },
      { code: 3, name: '1 TB' },
    ],
    colors: [
      { code: 1, name: 'Titanium Gray' },
      { code: 2, name: 'Titanium Black' },
      { code: 3, name: 'Titanium Violet' },
      { code: 4, name: 'Titanium Yellow' },
    ],
  },
  {
    id: '0003',
    brand: 'Google',
    model: 'Pixel 8 Pro',
    price: '899',
    imgUrl: 'https://cdn.dummyjson.com/products/images/smartphones/iPhone%2013%20Pro/1.png',
    cpu: 'Google Tensor G3',
    ram: '12 GB',
    os: 'Android 14',
    displayResolution: '2992 x 1344',
    battery: '5050 mAh',
    primaryCamera: '50 MP + 48 MP + 48 MP',
    secondaryCmera: '10.5 MP',
    dimentions: '162.6 x 76.5 x 8.8 mm',
    weight: '213',
    internalMemory: [
      { code: 1, name: '128 GB' },
      { code: 2, name: '256 GB' },
      { code: 3, name: '512 GB' },
    ],
    colors: [
      { code: 1, name: 'Obsidian' },
      { code: 2, name: 'Porcelain' },
      { code: 3, name: 'Bay' },
    ],
  },
  {
    id: '0004',
    brand: 'OnePlus',
    model: '12',
    price: '799',
    imgUrl: 'https://cdn.dummyjson.com/products/images/smartphones/iPhone%20X/1.png',
    cpu: 'Snapdragon 8 Gen 3',
    ram: '16 GB',
    os: 'Android 14 OxygenOS 14',
    displayResolution: '3168 x 1440',
    battery: '5400 mAh',
    primaryCamera: '50 MP + 48 MP + 64 MP',
    secondaryCmera: '32 MP',
    dimentions: '164.3 x 75.8 x 9.15 mm',
    weight: '220',
    internalMemory: [
      { code: 1, name: '256 GB' },
      { code: 2, name: '512 GB' },
    ],
    colors: [
      { code: 1, name: 'Flowy Emerald' },
      { code: 2, name: 'Silky Black' },
    ],
  },
  {
    id: '0005',
    brand: 'Xiaomi',
    model: '14 Ultra',
    price: '999',
    imgUrl: 'https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S24/1.png',
    cpu: 'Snapdragon 8 Gen 3',
    ram: '16 GB',
    os: 'Android 14 HyperOS',
    displayResolution: '3200 x 1440',
    battery: '5000 mAh',
    primaryCamera: '50 MP x 4 Leica',
    secondaryCmera: '32 MP',
    dimentions: '161.4 x 75.3 x 9.2 mm',
    weight: '229',
    internalMemory: [
      { code: 1, name: '256 GB' },
      { code: 2, name: '512 GB' },
    ],
    colors: [
      { code: 1, name: 'Black' },
      { code: 2, name: 'White' },
    ],
  },
  {
    id: '0006',
    brand: 'Sony',
    model: 'Xperia 1 VI',
    price: '1099',
    imgUrl: 'https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/1.png',
    cpu: 'Snapdragon 8 Gen 3',
    ram: '12 GB',
    os: 'Android 14',
    displayResolution: '2340 x 1080',
    battery: '5000 mAh',
    primaryCamera: '52 MP + 12 MP + 12 MP',
    secondaryCmera: '12 MP',
    dimentions: '162.0 x 74.0 x 8.2 mm',
    weight: '192',
    internalMemory: [
      { code: 1, name: '256 GB' },
      { code: 2, name: '512 GB' },
    ],
    colors: [
      { code: 1, name: 'Black' },
      { code: 2, name: 'Platinum Silver' },
      { code: 3, name: 'Khaki Green' },
    ],
  },
  {
    id: '0007',
    brand: 'Samsung',
    model: 'Galaxy Z Fold 6',
    price: '1899',
    imgUrl: 'https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S24/1.png',
    cpu: 'Snapdragon 8 Gen 3',
    ram: '12 GB',
    os: 'Android 14 One UI 6.1',
    displayResolution: '2160 x 1856',
    battery: '4400 mAh',
    primaryCamera: '50 MP + 12 MP + 10 MP',
    secondaryCmera: '10 MP + 4 MP',
    dimentions: '153.5 x 132.6 x 5.6 mm',
    weight: '239',
    internalMemory: [
      { code: 1, name: '256 GB' },
      { code: 2, name: '512 GB' },
      { code: 3, name: '1 TB' },
    ],
    colors: [
      { code: 1, name: 'Silver Shadow' },
      { code: 2, name: 'Pink' },
      { code: 3, name: 'Navy' },
    ],
  },
  {
    id: '0008',
    brand: 'Apple',
    model: 'iPhone SE 4',
    price: '499',
    imgUrl: 'https://cdn.dummyjson.com/products/images/smartphones/iPhone%206/1.png',
    cpu: 'A16 Bionic',
    ram: '6 GB',
    os: 'iOS 18',
    displayResolution: '2556 x 1179',
    battery: '3279 mAh',
    primaryCamera: '48 MP',
    secondaryCmera: '12 MP',
    dimentions: '147.6 x 71.6 x 7.8 mm',
    weight: '167',
    internalMemory: [
      { code: 1, name: '128 GB' },
      { code: 2, name: '256 GB' },
    ],
    colors: [
      { code: 1, name: 'Midnight' },
      { code: 2, name: 'Starlight' },
    ],
  },
  {
    id: '0009',
    brand: 'Nothing',
    model: 'Phone (2a)',
    price: '349',
    imgUrl: 'https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/1.png',
    cpu: 'MediaTek Dimensity 7200 Pro',
    ram: '12 GB',
    os: 'Android 14 Nothing OS 2.5',
    displayResolution: '2412 x 1080',
    battery: '5000 mAh',
    primaryCamera: '50 MP + 50 MP',
    secondaryCmera: '32 MP',
    dimentions: '161.7 x 76.3 x 8.6 mm',
    weight: '190',
    internalMemory: [
      { code: 1, name: '128 GB' },
      { code: 2, name: '256 GB' },
    ],
    colors: [
      { code: 1, name: 'Black' },
      { code: 2, name: 'White' },
      { code: 3, name: 'Blue' },
    ],
  },
  {
    id: '0010',
    brand: 'Motorola',
    model: 'Edge 50 Pro',
    price: '599',
    imgUrl: 'https://cdn.dummyjson.com/products/images/smartphones/iPhone%20X/1.png',
    cpu: 'Snapdragon 7 Gen 3',
    ram: '12 GB',
    os: 'Android 14',
    displayResolution: '2712 x 1220',
    battery: '4500 mAh',
    primaryCamera: '50 MP + 13 MP + 10 MP',
    secondaryCmera: '50 MP',
    dimentions: '161.2 x 72.4 x 8.2 mm',
    weight: '186',
    internalMemory: [
      { code: 1, name: '256 GB' },
      { code: 2, name: '512 GB' },
    ],
    colors: [
      { code: 1, name: 'Luxe Lavender' },
      { code: 2, name: 'Black Beauty' },
      { code: 3, name: 'Vanilla Cream' },
    ],
  },
  {
    id: '0011',
    brand: 'Huawei',
    model: 'Pura 70 Ultra',
    price: '1499',
    imgUrl: 'https://cdn.dummyjson.com/products/images/smartphones/iPhone%2013%20Pro/1.png',
    cpu: 'Kirin 9010',
    ram: '16 GB',
    os: 'HarmonyOS 4.2',
    displayResolution: '2844 x 1260',
    battery: '5200 mAh',
    primaryCamera: '50 MP + 40 MP + 50 MP',
    secondaryCmera: '13 MP',
    dimentions: '162.6 x 75.1 x 8.4 mm',
    weight: '226',
    internalMemory: [
      { code: 1, name: '256 GB' },
      { code: 2, name: '512 GB' },
      { code: 3, name: '1 TB' },
    ],
    colors: [
      { code: 1, name: 'Black' },
      { code: 2, name: 'Green' },
      { code: 3, name: 'Brown' },
    ],
  },
  {
    id: '0012',
    brand: 'Oppo',
    model: 'Find X7 Ultra',
    price: '949',
    imgUrl: 'https://cdn.dummyjson.com/products/images/smartphones/iPhone%206/1.png',
    cpu: 'Snapdragon 8 Gen 3',
    ram: '16 GB',
    os: 'Android 14 ColorOS 14',
    displayResolution: '3168 x 1440',
    battery: '5600 mAh',
    primaryCamera: '50 MP x 4 Hasselblad',
    secondaryCmera: '32 MP',
    dimentions: '164.3 x 76.2 x 9.5 mm',
    weight: '221',
    internalMemory: [
      { code: 1, name: '256 GB' },
      { code: 2, name: '512 GB' },
    ],
    colors: [
      { code: 1, name: 'Hasselblad Brown' },
      { code: 2, name: 'Ocean Blue' },
    ],
  },
];

// In-memory cart count
let cartCount = 0;

// ─── Routes ─────────────────────────────────────────────────────────────

// GET /api/product — List all products (summary view)
app.get('/api/product', (req, res) => {
  const summary = products.map(({ id, brand, model, price, imgUrl }) => ({
    id,
    brand,
    model,
    price,
    imgUrl,
  }));
  res.json(summary);
});

// GET /api/product/:id — Get product details
app.get('/api/product/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// POST /api/cart — Add product to cart
app.post('/api/cart', (req, res) => {
  const { id, colorCode, storageCode } = req.body;

  if (!id || colorCode === undefined || storageCode === undefined) {
    return res.status(400).json({ error: 'Missing required fields: id, colorCode, storageCode' });
  }

  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  cartCount++;
  res.json({ count: cartCount });
});

// ─── Start Server ───────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`🚀 Mock API Server running on http://localhost:${PORT}`);
  console.log(`   GET  /api/product`);
  console.log(`   GET  /api/product/:id`);
  console.log(`   POST /api/cart`);
});
