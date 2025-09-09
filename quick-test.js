// MongoDB ulanish testi (oddiy variant)
console.log("🔍 MongoDB test boshlandi...");

const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://mironshoxraxmatilloyev_db_user:N9S6UB0otf3L3XV2@cluster0.2jbh9b2.mongodb.net/tabriklar";

async function quickTest() {
  try {
    console.log("⏳ MongoDB ga ulanmoqda...");
    
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });
    
    console.log("✅ MongoDB ga muvaffaqiyatli ulandi!");
    
    // Test schema
    const TestSchema = new mongoose.Schema({
      test: String,
      created: { type: Date, default: Date.now }
    });
    
    const TestModel = mongoose.model("TestConnection", TestSchema);
    
    // Test data yaratish
    const testDoc = new TestModel({
      test: "MongoDB ulanish testi - " + Date.now()
    });
    
    const result = await testDoc.save();
    console.log("✅ Test ma'lumoti saqlandi! ID:", result._id);
    
    // Test ma'lumotni o'qish
    const found = await TestModel.findById(result._id);
    console.log("✅ Test ma'lumoti o'qildi:", found.test);
    
    // Test ma'lumotni o'chirish
    await TestModel.findByIdAndDelete(result._id);
    console.log("✅ Test ma'lumoti o'chirildi");
    
    console.log("🎉 MongoDB test MUVAFFAQIYATLI!");
    
  } catch (error) {
    console.error("❌ MongoDB test MUVAFFAQIYATSIZ!");
    console.error("Xato:", error.message);
    
    if (error.message.includes("ENOTFOUND")) {
      console.error("🌐 Internet ulanishini tekshiring");
    }
    if (error.message.includes("authentication")) {
      console.error("🔐 Login/parol noto'g'ri");
    }
    if (error.message.includes("timeout")) {
      console.error("⏰ Server javob bermayapti - IP whitelist tekshiring");
    }
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB ulanishi yopildi");
  }
}

quickTest();