# 🚀 Tabrik Xizmati - Deploy Yo'riqnomasi

## 1. Render.com orqali Deploy (Tavsiya etiladi)

### Bosqichlar:
1. **Render.com** ga kirinng: https://render.com
2. GitHub akkauntingiz bilan ro'yxatdan o'ting
3. "New +" tugmasini bosing va "Web Service" ni tanlang
4. GitHub repository ni ulang: `mironshoxraxmatilloyev-dotcom/Yaqinimga-dil-ishorim`
5. Quyidagi sozlamalarni kiriting:

```
Name: tabrik-xizmati
Environment: Node
Region: Oregon (US West)
Branch: main
Build Command: npm install
Start Command: npm start
Plan: Free
```

6. **Environment Variables** ga o'ting va qo'shing:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://mironshox:D1WVdeVfthVP1Z2F@cluster0.zthjn1c.mongodb.net/tabrikDB?retryWrites=true&w=majority
```

7. "Create Web Service" tugmasini bosing

### ✅ Natija:
- Sizning saytingiz: `https://tabrik-xizmati.onrender.com` manzilida ishlaydi
- Bepul SSL sertifikat
- Avtomatik deployment GitHub push da

---

## 2. Vercel.com orqali Deploy

### Bosqichlar:
1. **Vercel.com** ga kirinng: https://vercel.com
2. GitHub akkauntingiz bilan ro'yxatdan o'ting
3. "New Project" tugmasini bosing
4. GitHub repository ni import qiling
5. Environment Variables ga qo'shing:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://mironshox:D1WVdeVfthVP1Z2F@cluster0.zthjn1c.mongodb.net/tabrikDB?retryWrites=true&w=majority
```

### ✅ Natija:
- Saytingiz: `https://tabrik-xizmati.vercel.app` da ishlaydi
- Tezkor deploy
- Global CDN

---

## 3. Railway.app orqali Deploy

### Bosqichlar:
1. **Railway.app** ga kirinng: https://railway.app
2. GitHub akkauntingiz bilan ro'yxatdan o'ting
3. "New Project" -> "Deploy from GitHub repo"
4. Repository ni tanlang
5. Environment Variables ga qo'shing:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://mironshox:D1WVdeVfthVP1Z2F@cluster0.zthjn1c.mongodb.net/tabrikDB?retryWrites=true&w=majority
```

### ✅ Natija:
- Saytingiz Railway subdomain da ishlaydi
- Bepul $5 kredit har oy

---

## 📋 Loyiha Xususiyatlari:

### ✅ Tayyorlangan:
- ✅ Frontend: HTML/CSS/JavaScript
- ✅ Backend: Node.js + Express.js
- ✅ Database: MongoDB Atlas
- ✅ API Endpoints: `/api/orders`, `/api/tabriklar`
- ✅ Admin Panel: Login + CRUD
- ✅ Responsive Design
- ✅ Environment Variables
- ✅ Health Check: `/health`

### 🔧 Konfiguratsiya:
- Port: `process.env.PORT || 5000`
- Database: MongoDB Atlas (cloud)
- Static Files: `/frontend` papkasi
- Environment: Production ready

---

## 🎯 Test Qilish:

Deploy bo'lgandan so'ng quyidagi URL larni tekshiring:

1. **Bosh sahifa**: `https://your-domain.com/`
2. **Admin sahifa**: `https://your-domain.com/admin.html`
3. **Buyurtma sahifasi**: `https://your-domain.com/buyurtma.html`
4. **API Test**: `https://your-domain.com/api/test`
5. **Health Check**: `https://your-domain.com/health`

### 🔑 Admin Login:
- **Login**: `dildora.naimova_admin`
- **Parol**: `Dildora@2025`

---

## 📞 Qo'llab-quvvatlash:

Agar muammolar bo'lsa:
1. Deployment logs ni tekshiring
2. Environment Variables to'g'ri kiritilganini tekshiring
3. MongoDB Atlas ulanishini tekshiring
4. Browser Developer Tools (F12) da console xatolarini ko'ring

---

**💡 Eslatma**: Render.com eng yaxshi variant chunki:
- To'liq bepul
- MongoDB bilan yaxshi ishlaydi
- SSL sertifikat
- Avtomatik deployment