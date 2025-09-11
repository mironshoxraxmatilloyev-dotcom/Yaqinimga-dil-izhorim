# Tabrik Xizmati - Professional Greeting Service

Tabrik Xizmati - bu professional tabrik xizmatlari uchun web sayt.

## 🚀 Quick Deploy

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/mironshoxraxmatilloyev-dotcom/Tabrik.com)

## 🌐 Live Demo

**Website:** [Tabrik Xizmati](https://tabrik-xizmati.onrender.com)

## 📋 Xususiyatlar

- 🎉 **Bosh sahifa** - Tabriklar ko'rish
- 📝 **Buyurtma sahifasi** - Yangi buyurtma berish
- 👨‍💼 **Admin sahifasi** - Buyurtmalar va tabriklarni boshqarish
- 🗂️ **Biz haqimizda** - Kompaniya ma'lumotlari
- 🛠️ **Xizmatlar** - Mavjud xizmatlar ro'yxati

## 🛠️ Texnologiyalar

- **Frontend:** HTML5, CSS3, Bootstrap 5, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Deployment:** Render.com

## 🔧 Local Development

### Talablar:
- Node.js (16.0.0 yoki yuqori)
- MongoDB Atlas account

### O'rnatish:

1. **Repository ni klonlash:**
```bash
git clone https://github.com/mironshoxraxmatilloyev-dotcom/Tabrik.com.git
cd Tabrik.com
```

2. **Dependencies o'rnatish:**
```bash
npm install
```

3. **Environment variables sozlash:**
`.env` fayl yarating va quyidagilarni qo'shing:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
NODE_ENV=development
```

4. **Serverni ishga tushirish:**
```bash
npm start
```

5. **Browser da ochish:**
```
http://localhost:5000
```

## 📦 Deployment

### Render.com da deploy qilish:

#### 1-usul: Manual Deploy
1. **[Render.com Dashboard](https://dashboard.render.com)** ga o'ting
2. Sizning service ni toping
3. **"Manual Deploy"** tugmasini bosing
4. **"Deploy latest commit"** ni tanlang

#### 2-usul: Automatic Deploy
1. **Service Settings** ga o'ting
2. **"Auto-Deploy"** ni yoqing
3. **Branch:** `main` ni tanlang

#### 3-usul: Webhook
```bash
# GitHub repository settings
# Webhooks > Add webhook
# Payload URL: [Render webhook URL]
# Content type: application/json
```

### Environment Variables:

Render.com da quyidagi environment variable larni qo'shing:

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | `mongodb+srv://mironshox:D1WVdeVfthVP1Z2F@cluster0.zthjn1c.mongodb.net/tabrikDB?retryWrites=true&w=majority` |
| `NODE_ENV` | `production` |

### Deployment holati tekshirish:
- **Health Check:** `https://your-app.onrender.com/health`
- **Debug:** Render logs ni ko'ring

## 🔐 Admin Access

- **Login:** admin
- **Password:** 12345678

## 📱 API Endpoints

### Orders
- `GET /api/orders` - Barcha buyurtmalarni olish
- `POST /api/orders` - Yangi buyurtma yaratish
- `DELETE /api/orders/:id` - Buyurtmani o'chirish

### Media
- `GET /api/media` - Barcha tabriklarni olish
- `POST /api/media` - Yangi tabrik qo'shish
- `PUT /api/media/:id` - Tabrikni yangilash
- `DELETE /api/media/:id` - Tabrikni o'chirish

### Health Check
- `GET /health` - Server holati

## 🐛 Troubleshooting

### 502 Bad Gateway
- Render.com logs ni tekshiring
- Environment variables to'g'riligini tasdiqlang
- MongoDB Atlas connection stringini tekshiring

### MongoDB Connection Issues
- Network Access da IP whitelist tekshiring
- Database user credentials ni tasdiqlang
- Connection string formatini tekshiring

## 📞 Support

Muammolar yuzaga kelsa, GitHub Issues bo'limida xabar qoldiring.

## 📄 License

MIT License

---

**Yaratuvchi:** Mironshox Raxmatilloyev
**Email:** mironshoxraxmatilloyev@gmail.com