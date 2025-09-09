const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

const PORT = 5000;

// === Local MongoDB ulanish ===
const MONGODB_URI = "mongodb://localhost:27017/tabriklar";

console.log('🔗 Local MongoDB ga ulanishni sinayapman...');

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Local MongoDB ga ulandi");
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
  })
  .catch(err => {
    console.error("❌ Local MongoDB ulanish xatosi:", err.message);
    console.error("💡 Local MongoDB o'rnatilganmi? 'mongod' servisi ishga tushirilganmi?");
    console.error("💡 Agar MongoDB o'rnatilmagan bo'lsa, test server ishlatishni tavsiya qilamiz:");
    console.error("    node server-test.js");
  });

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

// ===== Mongoose modellari =====
const OrderSchema = new mongoose.Schema({
  ism: { type: String, required: true, trim: true },
  yosh: { type: String, required: true },
  tugilgan_sana: { type: String, required: true },
  telefon: { type: String, required: true },
  tabriklovchilar: { type: String, required: true },
  asosiy: { type: String, required: true },
  qoshiq: { type: String, required: true },
  murojaat: { type: String, required: true },
  buyurtmachi_telefon: { type: String, required: true },
}, { 
  timestamps: true,
  collection: 'orders'
});

const Order = mongoose.model("Order", OrderSchema);

const TabrikSchema = new mongoose.Schema({
  matn: { type: String, trim: true },
  audio: { type: String },
  sana: { type: Date, default: Date.now }
}, {
  collection: 'tabriklar'
});

const Tabrik = mongoose.model("Tabrik", TabrikSchema);

// ===== API yo'llar =====

// Test endpoint
app.get("/api/test", async (req, res) => {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    const dbName = mongoose.connection.db?.databaseName;
    
    res.json({
      message: "Local server ishlayapti",
      mongodbConnected: isConnected,
      database: dbName,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: "Test xatosi: " + err.message });
  }
});

// Buyurtma qo'shish
app.post("/api/orders", async (req, res) => {
  try {
    console.log("📝 Yangi buyurtma keldi:", req.body);
    const order = new Order(req.body);
    const savedOrder = await order.save();
    console.log("✅ Buyurtma saqlandi:", savedOrder._id);
    res.json(savedOrder);
  } catch (err) {
    console.error("❌ Buyurtma saqlashda xato:", err.message);
    res.status(500).json({ error: "Buyurtma saqlanmadi: " + err.message });
  }
});

// Barcha buyurtmalarni olish
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    console.log(`📋 ${orders.length} ta buyurtma topildi`);
    res.json(orders);
  } catch (err) {
    console.error("❌ Buyurtmalarni olishda xato:", err.message);
    res.status(500).json({ error: "Buyurtmalarni olishda xato" });
  }
});

// Buyurtmani o'chirish
app.delete("/api/orders/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "O'chirishda xato" });
  }
});

// Tabrik qo'shish
app.post("/api/tabriklar", async (req, res) => {
  try {
    console.log("🎵 Yangi tabrik keldi:", req.body);
    const tabrik = new Tabrik(req.body);
    const savedTabrik = await tabrik.save();
    console.log("✅ Tabrik saqlandi:", savedTabrik._id);
    res.json(savedTabrik);
  } catch (err) {
    console.error("❌ Tabrik saqlashda xato:", err.message);
    res.status(500).json({ error: "Tabrik qo'shilmadi: " + err.message });
  }
});

// Tabriklarni olish
app.get("/api/tabriklar", async (req, res) => {
  try {
    const tabriklar = await Tabrik.find().sort({ sana: -1 });
    console.log(`🎵 ${tabriklar.length} ta tabrik topildi`);
    res.json(tabriklar);
  } catch (err) {
    console.error("❌ Tabriklarni olishda xato:", err.message);
    res.status(500).json({ error: "Tabriklarni olishda xato" });
  }
});

// Tabrikni o'chirish
app.delete("/api/tabriklar/:id", async (req, res) => {
  try {
    await Tabrik.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Tabrikni o'chirishda xato" });
  }
});

// Tabrikni tahrirlash
app.put("/api/tabriklar/:id", async (req, res) => {
  try {
    const { matn } = req.body;
    const tabrik = await Tabrik.findByIdAndUpdate(
      req.params.id,
      { matn },
      { new: true }
    );
    res.json(tabrik);
  } catch (err) {
    res.status(500).json({ error: "Tabrikni tahrirlaashda xato" });
  }
});

// === Serverni ishga tushirish ===
app.listen(PORT, () => {
  console.log(`🚀 Local server http://localhost:${PORT} da ishlayapti`);
  console.log(`📁 Frontend files: ${path.join(__dirname, "frontend")}`);
  console.log(`🔗 MongoDB: ${MONGODB_URI}`);
});