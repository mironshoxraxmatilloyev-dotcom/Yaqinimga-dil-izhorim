const express = require("express");
const path = require("path");
const app = express();

const PORT = 5000;

// === In-memory storage (test uchun) ===
let orders = [];
let tabriklar = [];
let orderIdCounter = 1;
let tabrikIdCounter = 1;

console.log('🧪 TEST SERVER - MongoDBsiz test rejimi');

// === Middleware ===
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, "frontend")));

// Request logging
app.use((req, res, next) => {
  console.log(`🚀 ${req.method} ${req.path} - ${new Date().toISOString()}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('📦 Request body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// === Asosiy sahifa ===
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// ===== API yollari =====

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({
    message: "TEST SERVER ishlayapti",
    mongodbConnected: false,
    database: "memory",
    ordersCount: orders.length,
    tabriklarCount: tabriklar.length,
    timestamp: new Date().toISOString()
  });
});

// Buyurtma qoshish
app.post("/api/orders", (req, res) => {
  try {
    console.log("📝 Yangi buyurtma keldi:", req.body);
    
    const order = {
      _id: (orderIdCounter++).toString(),
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    orders.push(order);
    console.log("✅ Buyurtma memoryga saqlandi:", order._id);
    console.log(`📊 Jami buyurtmalar: ${orders.length}`);
    
    res.json(order);
  } catch (err) {
    console.error("❌ Buyurtma saqlashda xato:", err.message);
    res.status(500).json({ error: "Buyurtma saqlanmadi: " + err.message });
  }
});

// Barcha buyurtmalarni olish
app.get("/api/orders", (req, res) => {
  try {
    console.log(`📋 ${orders.length} ta buyurtma soraldi`);
    console.log("📄 Buyurtmalar royhati:", orders.map(o => ({id: o._id, ism: o.ism})));
    res.json(orders);
  } catch (err) {
    console.error("❌ Buyurtmalarni olishda xato:", err.message);
    res.status(500).json({ error: "Buyurtmalarni olishda xato" });
  }
});

// Buyurtmani ochirish
app.delete("/api/orders/:id", (req, res) => {
  try {
    const id = req.params.id;
    const index = orders.findIndex(o => o._id === id);
    
    if (index !== -1) {
      orders.splice(index, 1);
      console.log(`🗑️ Buyurtma ochirildi: ${id}`);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Buyurtma topilmadi" });
    }
  } catch (err) {
    res.status(500).json({ error: "Ochirishda xato" });
  }
});

// Tabrik qoshish
app.post("/api/tabriklar", (req, res) => {
  try {
    console.log("🎵 Yangi tabrik keldi:", req.body);
    
    const tabrik = {
      _id: (tabrikIdCounter++).toString(),
      ...req.body,
      sana: new Date()
    };
    
    tabriklar.push(tabrik);
    console.log("✅ Tabrik memoryga saqlandi:", tabrik._id);
    console.log(`📊 Jami tabriklar: ${tabriklar.length}`);
    
    res.json(tabrik);
  } catch (err) {
    console.error("❌ Tabrik saqlashda xato:", err.message);
    res.status(500).json({ error: "Tabrik qoshilmadi: " + err.message });
  }
});

// Tabriklarni olish
app.get("/api/tabriklar", (req, res) => {
  try {
    const sortedTabriklar = tabriklar.sort((a, b) => new Date(b.sana) - new Date(a.sana));
    console.log(`🎵 ${sortedTabriklar.length} ta tabrik soraldi`);
    res.json(sortedTabriklar);
  } catch (err) {
    console.error("❌ Tabriklarni olishda xato:", err.message);
    res.status(500).json({ error: "Tabriklarni olishda xato" });
  }
});

// Tabrikni ochirish
app.delete("/api/tabriklar/:id", (req, res) => {
  try {
    const id = req.params.id;
    const index = tabriklar.findIndex(t => t._id === id);
    
    if (index !== -1) {
      tabriklar.splice(index, 1);
      console.log(`🗑️ Tabrik ochirildi: ${id}`);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Tabrik topilmadi" });
    }
  } catch (err) {
    res.status(500).json({ error: "Tabrikni ochirishda xato" });
  }
});

// Tabrikni tahrirlash
app.put("/api/tabriklar/:id", (req, res) => {
  try {
    const id = req.params.id;
    const index = tabriklar.findIndex(t => t._id === id);
    
    if (index !== -1) {
      tabriklar[index] = { ...tabriklar[index], ...req.body };
      console.log(`✏️ Tabrik tahrirlandi: ${id}`);
      res.json(tabriklar[index]);
    } else {
      res.status(404).json({ error: "Tabrik topilmadi" });
    }
  } catch (err) {
    res.status(500).json({ error: "Tabrikni tahrirlaashda xato" });
  }
});

// Debug endpoints
app.get("/api/debug/orders", (req, res) => {
  res.json({
    count: orders.length,
    orders: orders,
    message: "Memorydagi barcha buyurtmalar"
  });
});

app.get("/api/debug/tabriklar", (req, res) => {
  res.json({
    count: tabriklar.length,
    tabriklar: tabriklar,
    message: "Memorydagi barcha tabriklar"
  });
});

// === Serverni ishga tushirish ===
app.listen(PORT, () => {
  console.log(`🚀 TEST SERVER http://localhost:${PORT} da ishlayapti`);
  console.log(`📁 Frontend files: ${path.join(__dirname, "frontend")}`);
  console.log(`🧪 MongoDBsiz test rejimi - malumotlar memoryda saqlanadi`);
  console.log(`🔍 Debug URLs:`);
  console.log(`   http://localhost:${PORT}/api/debug/orders`);
  console.log(`   http://localhost:${PORT}/api/debug/tabriklar`);
});