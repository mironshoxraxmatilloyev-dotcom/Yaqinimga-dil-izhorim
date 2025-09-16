# 🎛️ Backend - Tabriklar Xizmati

Tabriklar xizmati loyihasining backend API serveri.

## 🚀 Ishga tushirish

### Talablar
- Node.js 16+
- MongoDB Atlas

### O'rnatish
```bash
npm install
```

### Environment Variables
`.env` fayl yarating:
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tabrikDB
```

### Serverni ishga tushirish
```bash
npm start
```

Server http://localhost:5000 da ishga tushadi.

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
- `GET /` - Frontend sahifa (../frontend dan)

## 🛠️ Texnologiyalar

- **Express.js** - Web framework
- **MongoDB** - Ma'lumotlar bazasi
- **Mongoose** - ODM
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

## 📂 Fayllar

- `server.js` - Asosiy Express.js server
- `server-test.js` - Test server (MongoDB siz)
- `package.json` - Dependencies
- `backup.js` - Ma'lumotlar zaxirasi
- `quick-test.js` - Tezkor test

## 🔧 Development

### Test server (MongoDB siz)
```bash
node server-test.js
```

### Backup yaratish
```bash
node backup.js
```

### Tezkor test
```bash
node quick-test.js
```

## 🌐 Deployment

### Render.com
1. GitHub repository ni Render.com ga ulang
2. Build Command: `npm install`
3. Start Command: `npm start`
4. Environment variables qo'shing

### Environment Variables (Production)
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
PORT=5000
```

## 📝 API Response Format

### Success Response
```json
{
  "message": "Success message",
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "error": "Error message",
  "details": "Additional error details"
}
```

---
**© 2025 Tabriklar Xizmati Backend API**