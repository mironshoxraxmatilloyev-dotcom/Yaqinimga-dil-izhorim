const mongoose = require("mongoose");

// MongoDB Atlas ulanishini test qilish
async function testMongoDB() {
  try {
    console.log("🔄 MongoDB Atlas ulanishini tekshirayapman...");
    
    await mongoose.connect("mongodb+srv://mironshoxraxmatilloyev_db_user:N9S6UB0otf3L3XV2@cluster0.2jbh9b2.mongodb.net/tabriklar", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log("✅ MongoDB Atlas ulanishi muvaffaqiyatli!");
    
    // Test Schema
    const TestSchema = new mongoose.Schema({
      message: String,
      created: { type: Date, default: Date.now }
    });
    
    const TestModel = mongoose.model("Test", TestSchema);
    
    // Test ma'lumot yaratish va saqlash
    const testData = new TestModel({
      message: "Test ma'lumoti - " + new Date().toISOString()
    });
    
    const saved = await testData.save();
    console.log("✅ Test ma'lumoti saqlandi:", saved._id);
    
    // Saqlangan ma'lumotni o'qish
    const allTests = await TestModel.find();
    console.log(`📊 Jami test ma'lumotlari: ${allTests.length}`);
    
    // Test ma'lumotni o'chirish
    await TestModel.findByIdAndDelete(saved._id);
    console.log("🗑️ Test ma'lumoti o'chirildi");
    
    console.log("🎉 Barcha testlar muvaffaqiyatli o'tdi!");
    
  } catch (error) {
    console.error("❌ MongoDB test xatosi:", error.message);
    console.error("📍 Xato turi:", error.name);
    
    if (error.name === 'MongoNetworkError') {
      console.error("🌐 Internet ulanishini tekshiring");
    }
    if (error.name === 'MongooseError') {
      console.error("🔐 Login/parol yoki database nomini tekshiring");
    }
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB ulanishi yopildi");
    process.exit(0);
  }
}

testMongoDB();