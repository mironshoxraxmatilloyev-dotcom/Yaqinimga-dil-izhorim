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
app.use(express.static(path.join(__dirname, "frontend"))); 

// ====== MongoDB ulash ======
const connectDB = async () => {
  try {
    // MongoDB Atlas connection string
    const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tabrikDB";
    
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      // Yangi Mongoose versiyasi uchun optimallashtirilgan
    });
    
    console.log("✅ MongoDB muvaffaqiyatli ulandi:", conn.connection.host);
    console.log("📊 Database:", conn.connection.name);
  } catch (err) {
    console.error("❌ MongoDB ulanishida xato:", err.message);
    console.log("📝 MongoDB Atlas connection string tekshiring:");
    console.log("   1. .env faylida MONGODB_URI ni to'g'ri sozlang");
    console.log("   2. Database parolini tekshiring");
    console.log("   3. Network Access da IP ruxsat berilganligini tekshiring");
    console.log("💡 Yoki test server ishlating: node server-test.js");
    process.exit(1);
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
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

app.post("/api/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.json({ message: "✅ Buyurtma qabul qilindi", order: newOrder });
  } catch (err) {
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

// --- MEDIA ---
app.get("/api/media", async (req, res) => {
  try {
    const medias = await Media.find().sort({ createdAt: -1 });
    console.log("📋 Media so'raldi:", medias.length, "ta");
    res.json(medias);
  } catch (err) {
    console.error("❌ Media olishda xato:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/media", async (req, res) => {
  try {
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
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// --- serverni ishga tushirish ---
app.listen(5000, () => {
  console.log("🚀 Server http://localhost:5000 da ishlayapti");
});


