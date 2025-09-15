const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// static fayllar uchun (frontend)
app.use(express.static(path.join(__dirname, "../frontend"))); 

// ====== MongoDB ulash ======
const connectDB = async () => {
  console.log("🔗 Ma'lumotlar bazasiga ulanishga harakat qilinmoqda...");
  
  const mongoURI = process.env.MONGODB_URI;
  
  if (!mongoURI) {
    console.log("⚠️ MONGODB_URI topilmadi, test rejimida ishlayapti");
    return;
  }
  
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000,
    });
    
    console.log("✅ MongoDB muvaffaqiyatli ulandi:", conn.connection.host);
  } catch (err) {
    console.log("⚠️ MongoDB ulanmadi, server test rejimida ishlaydi");
    console.log("MongoDB xato:", err.message);
  }
};

connectDB();

// ====== Schema & Model ======
const OrderSchema = new mongoose.Schema({
  ism: String,
  yosh: Number,
  tugilgan_sana: Date,
  telefon: String,
  tabriklovchilar: String,
  asosiy: String,
  murojaat: String,
  qoshiq: String,
  buyurtmachi_telefon: String,
  createdAt: { type: Date, default: Date.now }
});

const MediaSchema = new mongoose.Schema({
  text: String,
  audioUrl: String,
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", OrderSchema);
const Media = mongoose.model("Media", MediaSchema);

// ====== API marshrutlar ======

// --- BUYURTMALAR ---
app.get("/api/orders", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json([]);
    }
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Orders olishda xato:", err.message);
    res.json([]);
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log("📝 MongoDB ulanmagan, buyurtma console da ko'rsatiladi:");
      console.log(req.body);
      return res.json({ message: "✅ Buyurtma qabul qilindi (test rejimi)", order: req.body });
    }
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.json({ message: "✅ Buyurtma qabul qilindi", order: newOrder });
  } catch (err) {
    console.error("Buyurtma saqlashda xato:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/orders/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "🗑️ Buyurtma o‘chirildi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- MEDIA / TABRIKLAR ---
// Tabriklar endpoint (index.html uchun)
app.get("/api/tabriklar", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json([]);
    }
    const medias = await Media.find().sort({ createdAt: -1 });
    console.log("📋 Tabriklar so'raldi:", medias.length, "ta");
    res.json(medias);
  } catch (err) {
    console.error("❌ Tabriklar olishda xato:", err.message);
    res.json([]);
  }
});

// Media endpoint (admin.html uchun)
app.get("/api/media", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json([]);
    }
    const medias = await Media.find().sort({ createdAt: -1 });
    console.log("📋 Media so'raldi:", medias.length, "ta");
    res.json(medias);
  } catch (err) {
    console.error("❌ Media olishda xato:", err.message);
    res.json([]);
  }
});

// Tabriklar POST endpoint (admin.html dan)
app.post("/api/tabriklar", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log("📺 MongoDB ulanmagan, tabrik console da ko'rsatiladi:");
      console.log({ text: req.body.matn ? 'Mavjud' : 'Yo\'q', audio: req.body.audio ? 'Mavjud' : 'Yo\'q' });
      return res.json({ message: "✅ Tabrik qo'shildi (test rejimi)", media: req.body });
    }
    console.log("📺 Yangi tabrik keldi:", { text: req.body.matn ? 'Mavjud' : 'Yo\'q', audio: req.body.audio ? 'Mavjud' : 'Yo\'q' });
    const newMedia = new Media({ text: req.body.matn, audioUrl: req.body.audio });
    await newMedia.save();
    console.log("✅ Tabrik saqlandi:", newMedia._id);
    res.json({ message: "✅ Tabrik qo'shildi", media: newMedia });
  } catch (err) {
    console.error("❌ Tabrik saqlashda xato:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Media POST endpoint (eski format)
app.post("/api/media", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log("📺 MongoDB ulanmagan, media console da ko'rsatiladi:");
      console.log({ text: req.body.text ? 'Mavjud' : 'Yo\'q', audio: req.body.audioUrl ? 'Mavjud' : 'Yo\'q' });
      return res.json({ message: "✅ Media qo'shildi (test rejimi)", media: req.body });
    }
    console.log("📺 Yangi media keldi:", { text: req.body.text ? 'Mavjud' : 'Yo\'q', audio: req.body.audioUrl ? 'Mavjud' : 'Yo\'q' });
    const newMedia = new Media(req.body);
    await newMedia.save();
    console.log("✅ Media saqlandi:", newMedia._id);
    res.json({ message: "✅ Media qo'shildi", media: newMedia });
  } catch (err) {
    console.error("❌ Media saqlashda xato:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Tabriklar DELETE endpoint
app.delete("/api/tabriklar/:id", async (req, res) => {
  try {
    await Media.findByIdAndDelete(req.params.id);
    console.log("🗑️ Tabrik o'chirildi:", req.params.id);
    res.json({ message: "🗑️ Tabrik o'chirildi" });
  } catch (err) {
    console.error("❌ Tabrik o'chirishda xato:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Media DELETE endpoint (eski format)
app.delete("/api/media/:id", async (req, res) => {
  try {
    await Media.findByIdAndDelete(req.params.id);
    console.log("🗑️ Media o'chirildi:", req.params.id);
    res.json({ message: "🗑️ Media o'chirildi" });
  } catch (err) {
    console.error("❌ Media o'chirishda xato:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Tabriklar PUT endpoint
app.put("/api/tabriklar/:id", async (req, res) => {
  try {
    const updatedMedia = await Media.findByIdAndUpdate(req.params.id, 
      { text: req.body.matn, audioUrl: req.body.audio }, 
      { new: true });
    console.log("✏️ Tabrik yangilandi:", req.params.id);
    res.json({ message: "✏️ Tabrik yangilandi", media: updatedMedia });
  } catch (err) {
    console.error("❌ Tabrik yangilashda xato:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Media PUT endpoint (eski format)
app.put("/api/media/:id", async (req, res) => {
  try {
    const updatedMedia = await Media.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log("✏️ Media yangilandi:", req.params.id);
    res.json({ message: "✏️ Media yangilandi", media: updatedMedia });
  } catch (err) {
    console.error("❌ Media yangilashda xato:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// --- default route ---
app.get("/", (req, res) => {
  console.log("📄 Main page requested, serving index.html");
  console.log("📂 Frontend directory:", path.join(__dirname, "../frontend"));
  console.log("📄 Index.html path:", path.join(__dirname, "../frontend", "index.html"));
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

// --- catch all routes for HTML pages ---
app.get("/*.html", (req, res) => {
  const fileName = req.path.substring(1); // Remove leading /
  const filePath = path.join(__dirname, "../frontend", fileName);
  console.log("📄 Requested:", fileName);
  console.log("📂 Full path:", filePath);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("❌ File not found:", filePath);
      res.status(404).send("File not found");
    }
  });
});

// --- health check ---
app.get("/health", (req, res) => {
  const mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
    mongodb: mongoStatus,
    message: mongoStatus === 'connected' ? 'Database connected' : 'Running without database (test mode)'
  });
});

// --- test endpoint ---
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!", timestamp: new Date().toISOString() });
});

// --- serverni ishga tushirish ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server http://localhost:${PORT} da ishlayapti`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📡 Port: ${PORT}`);
});


