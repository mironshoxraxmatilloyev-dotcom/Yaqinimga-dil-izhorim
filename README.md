# 🎉 Tabrik Xizmati - Professional Tabrik Service

Tabrik Xizmati - bu professional tabrik va taklifnoma xizmati veb-sahifasi.

## 📁 Loyiha Strukturasi

```
Tabrik/
├── backend/          # Backend server fayllari
│   ├── server.js     # Asosiy server fayli  
│   ├── package.json  # Node.js dependencies
│   └── ...
├── frontend/         # Frontend HTML fayllari
│   ├── index.html    # Bosh sahifa
│   ├── buyurtma.html # Buyurtma sahifasi
│   ├── admin.html    # Admin panel
│   └── ...
└── deployment files  # Deployment konfiguratsiyalari
```

## 🚀 Ishga tushirish

### Backend serverni ishga tushirish:
```bash
cd backend
npm install
npm start
```

### Mahalliy development:
```bash
cd backend
node server.js
```

Server http://localhost:5000 da ishga tushadi.

## 🛠️ Texnologiyalar

- **Frontend**: HTML5, CSS3, Bootstrap 5, JavaScript
- **Backend**: Node.js, Express.js
- **Ma'lumotlar bazasi**: MongoDB Atlas
- **Deployment**: Render.com

## 🌟 Xususiyatlar

- 🎊 Professional tabrik xizmati
- 📱 Responsive dizayn
- 🎵 Audio va matn tabriklar
- 👑 Admin panel
- 📝 Buyurtma tizimi
- 💾 MongoDB ma'lumotlar bazasi

## 🔑 Admin Ma'lumotlari

```
Login: admin
Parol: admin123
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

## 🚀 Deployment

### Render.com (Tavsiya etiladi):
1. GitHub repository ni Render.com ga ulang
2. Environment variables qo'shing:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string
   ```
3. Auto-deploy yoqilgan

---

**© 2025 Tabrik Xizmati - Professional tabrik va kutlash xizmati**