# 🎉 Tabrik Xizmati

**Professional tabrik va kutlash xizmati sayti**

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/mironshoxraxmatilloyev-dotcom/Yaqinimga-dil-ishorim)

## 🚀 Avtomatik Deploy

### One-Click Deploy (Render.com)
Yuqoridagi tugmani bosing va deploy avtomatik boshlanadi!

### Manual Deploy
1. [Render.com](https://render.com) ga o'ting
2. GitHub bilan ro'yxatdan o'ting
3. "New +" → "Web Service"
4. Repository: `mironshoxraxmatilloyev-dotcom/Yaqinimga-dil-ishorim`
5. Sozlamalar:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** `Node`
   - **Plan:** `Free`

6. Environment Variables:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://mironshox:D1WVdeVfthVP1Z2F@cluster0.zthjn1c.mongodb.net/tabrikDB?retryWrites=true&w=majority
```

## 📋 Loyiha Hususiyatlari

### ✅ Frontend
- 🏠 **Bosh sahifa** - Tabriklar ko'rsatish
- 📝 **Buyurtma sahifasi** - Yangi buyurtmalar berish
- 👨‍💼 **Admin panel** - Ma'lumotlarni boshqarish
- 📱 **Responsive design** - Barcha qurilmalarda ishlaydi

### ✅ Backend
- 🛠 **Node.js + Express.js** - Server
- 🗃️ **MongoDB Atlas** - Cloud database
- 🌐 **REST API** - Frontend-backend bog'lanishi
- 🔐 **Admin autentifikatsiya** - Xavfsizlik

### ✅ Deployment
- 🚀 **Production ready** - Deploy uchun tayyor
- 🔧 **Environment variables** - Konfiguratsiya
- 📊 **Health check** - `/health` endpoint
- 🛡️ **Security** - CORS, environment variables

## 🔑 Admin Ma'lumotlari

```
Login: dildora.naimova_admin
Parol: Dildora@2025
```

## 📊 API Endpoints

```
GET  /                  - Bosh sahifa
GET  /api/orders        - Buyurtmalar ro'yxati
POST /api/orders        - Yangi buyurtma
GET  /api/tabriklar     - Tabriklar ro'yxati
POST /api/tabriklar     - Yangi tabrik
GET  /health            - Server holati
```

## 🛠 Development

### Local ishga tushirish:
```bash
npm install
npm start
```

### Environment o'rnatish:
`.env` faylini yarating:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
```

## 🎯 Deploy Variantlari

### 1. Render.com (Bepul)
- ✅ SSL sertifikat
- ✅ Avtomatik deployment
- ✅ MongoDB qo'llab-quvvatlash

### 2. Vercel.com
- ✅ Tezkor deploy
- ✅ Global CDN
- ✅ Serverless functions

### 3. Railway.app
- ✅ $5 bepul kredit
- ✅ Oson sozlash
- ✅ Database integrations

## 📞 Qo'llab-quvvatlash

Muammolar bo'lsa:
1. Deployment logs ni tekshiring
2. Environment Variables to'g'ri kiritilganini tekshiring
3. MongoDB Atlas ulanishini tekshiring
4. Browser Developer Tools (F12) da console xatolarini ko'ring

## 🏆 Professional Xususiyatlar

- ✅ **Responsive Design** - Mobile/Desktop optimized
- ✅ **Real-time Updates** - Dynamic content loading
- ✅ **Admin Dashboard** - CRUD operations
- ✅ **Audio Support** - Media file handling
- ✅ **Cloud Database** - MongoDB Atlas integration
- ✅ **Production Ready** - Deployment optimized

---

**© 2025 Tabrik Xizmati - Professional tabrik va kutlash xizmati**