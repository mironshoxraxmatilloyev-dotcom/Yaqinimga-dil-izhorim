const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// static fayllar uchun (frontend)
app.use(express.static(path.join(__dirname, "frontend")));

// === MEMORY STORAGE ===
let orders = [];
let medias = [];
let orderIdCounter = 1;
let mediaIdCounter = 1;

console.log('🚀 SERVER ISHGA TUSHDI - MEMORY REJIMIDA');

// ====== API marshrutlar ======

// --- BUYURTMALAR ---
app.get("/api/orders", (req, res) => {
  console.log(`📋 ${orders.length} ta buyurtma so'raldi`);
  res.json(orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

app.post("/api/orders", (req, res) => {
  try {
    console.log("📝 Yangi buyurtma keldi:", req.body.ism);
    
    const order = {
      _id: (orderIdCounter++).toString(),
      ...req.body,
      createdAt: new Date(),
    };
    
    orders.push(order);
    console.log(`✅ Buyurtma saqlandi. Jami: ${orders.length}`);
    
    res.json({ message: "✅ Buyurtma qabul qilindi", order: order });
  } catch (err) {
    console.error("❌ Buyurtma saqlashda xato:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/orders/:id", (req, res) => {
  try {
    const id = req.params.id;
    const index = orders.findIndex(o => o._id === id);
    
    if (index !== -1) {
      orders.splice(index, 1);
      console.log(`🗑️ Buyurtma o'chirildi: ${id}`);
      res.json({ message: "🗑️ Buyurtma o'chirildi" });
    } else {
      res.status(404).json({ error: "Buyurtma topilmadi" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- MEDIA ---
app.get("/api/media", (req, res) => {
  console.log(`📺 ${medias.length} ta media so'raldi`);
  res.json(medias.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

app.post("/api/media", (req, res) => {
  try {
    console.log("🎥 Yangi media keldi");
    
    const media = {
      _id: (mediaIdCounter++).toString(),
      ...req.body,
      createdAt: new Date(),
    };
    
    medias.push(media);
    console.log(`✅ Media saqlandi. Jami: ${medias.length}`);
    
    res.json({ message: "✅ Media qo'shildi", media: media });
  } catch (err) {
    console.error("❌ Media saqlashda xato:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/media/:id", (req, res) => {
  try {
    const id = req.params.id;
    const index = medias.findIndex(m => m._id === id);
    
    if (index !== -1) {
      medias.splice(index, 1);
      console.log(`🗑️ Media o'chirildi: ${id}`);
      res.json({ message: "🗑️ Media o'chirildi" });
    } else {
      res.status(404).json({ error: "Media topilmadi" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/media/:id", (req, res) => {
  try {
    const id = req.params.id;
    const index = medias.findIndex(m => m._id === id);
    
    if (index !== -1) {
      medias[index] = { ...medias[index], ...req.body };
      console.log(`✏️ Media yangilandi: ${id}`);
      res.json({ message: "✏️ Media yangilandi", media: medias[index] });
    } else {
      res.status(404).json({ error: "Media topilmadi" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- default route ---
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// --- health check ---
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
    storage: 'memory',
    orders: orders.length,
    medias: medias.length,
    message: 'Server ishlamoqda!'
  });
});

// --- serverni ishga tushirish ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server http://localhost:${PORT} da ishlayapti`);
  console.log(`📡 Port: ${PORT}`);
  console.log(`💾 Ma'lumotlar xotirada saqlanadi`);
  console.log(`✅ SAYT TAYYOR!`);
});