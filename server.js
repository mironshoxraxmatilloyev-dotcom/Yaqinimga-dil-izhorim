const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// static fayllar uchun (frontend)
app.use(express.static(path.join(__dirname, "frontend"))); 

// ====== MongoDB ulash ======
mongoose.connect("mongodb://127.0.0.1:27017/tabrikDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB ulandi"))
.catch(err => console.error("❌ MongoDB xato:", err));

// ====== Schema & Model ======
const OrderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  message: String,
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
  const medias = await Media.find().sort({ createdAt: -1 });
  res.json(medias);
});

app.post("/api/media", async (req, res) => {
  try {
    const newMedia = new Media(req.body);
    await newMedia.save();
    res.json({ message: "✅ Media qo‘shildi", media: newMedia });
  } catch (err) {
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


