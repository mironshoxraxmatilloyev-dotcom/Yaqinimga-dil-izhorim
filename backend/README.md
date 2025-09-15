# 🎛️ Backend - Tabrik Xizmati

Bu Tabrik Xizmati loyihasining backend qismi.

## 📋 Fayllar

- `server.js` - Asosiy Express.js server
- `server-test.js` - Test server (MongoDB siz)
- `package.json` - Node.js dependencies
- `backup.js` - Ma'lumotlar zaxirasi
- `start-server.sh` - Server ishga tushirish skripti

## 🚀 Ishga tushirish

```bash
npm install
npm start
```

## 🌐 Environment Variables

`.env` fayl yarating:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tabrikDB
```

## 📊 API Endpoints

### Buyurtmalar
- `GET /api/orders` - Barcha buyurtmalar
- `POST /api/orders` - Yangi buyurtma
- `DELETE /api/orders/:id` - Buyurtma o'chirish

### Tabriklar  
- `GET /api/tabriklar` - Barcha tabriklar
- `POST /api/tabriklar` - Yangi tabrik
- `PUT /api/tabriklar/:id` - Tabrik yangilash
- `DELETE /api/tabriklar/:id` - Tabrik o'chirish

### System
- `GET /health` - Server holati
- `GET /api/test` - Test endpoint