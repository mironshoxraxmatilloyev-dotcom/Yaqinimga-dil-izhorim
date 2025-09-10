#!/bin/bash
echo "🚀 Tabrik Server ishga tushirilmoqda..."

# Paketlarni o'rnatish
echo "📦 Paketlar tekshirilmoqda..."
npm install

# MongoDB Atlas connection string tekshirish
echo "🔍 .env fayli tekshirilmoqda..."
if [ ! -f .env ]; then
    echo "⚠️ .env fayli topilmadi!"
    echo "📝 .env fayli yaratilmoqda..."
    echo "PORT=5000" > .env
    echo "MONGODB_URI=mongodb://127.0.0.1:27017/tabrikDB" >> .env
    echo "NODE_ENV=development" >> .env
fi

echo "✅ Tayyor! Server ishga tushirilmoqda..."
echo "🌐 Sayt: http://localhost:5000"
echo "👨‍💼 Admin: http://localhost:5000/admin.html"
echo "📋 Buyurtma: http://localhost:5000/buyurtma.html"
echo ""

# Serverni ishga tushirish
node server.js