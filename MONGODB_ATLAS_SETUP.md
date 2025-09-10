# MongoDB Atlas sozlash qo'llanmasi

## 1. Connection String olish

MongoDB Atlas saytida (sizning ochiq sahifangizda):

1. **"Connect" tugmasini bosing** (Cluster0 yonidagi)
2. **"Drivers" ni tanlang**
3. **"Node.js" driver ni tanlang**
4. **Connection string ni nusxalang**

Connection string quyidagicha ko'rinadi:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/tabrikDB?retryWrites=true&w=majority
```

## 2. .env faylini yangilash

1. `.env` faylini oching
2. `MONGODB_URI` qatorini quyidagicha o'zgartiring:

```env
PORT=5000
# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/tabrikDB?retryWrites=true&w=majority
NODE_ENV=development
```

**MUHIM:** 
- `username` va `password` ni o'z ma'lumotlaringiz bilan almashtiring
- `cluster0.xxxxx` qismini o'z cluster manzilingiz bilan almashtiring

## 3. Database user yaratish

Agar database user yo'q bo'lsa:

1. Atlas saytida **"Database Access"** ga o'ting
2. **"Add New Database User"** tugmasini bosing
3. Username va parol yarating
4. **"Read and write to any database"** ni tanlang
5. **"Add User"** tugmasini bosing

## 4. Network Access sozlash

1. **"Network Access"** ga o'ting
2. **"Add IP Address"** tugmasini bosing
3. **"Allow Access from Anywhere"** ni tanlang (0.0.0.0/0)
4. Yoki o'z IP manzilingizni qo'shing

## 5. Paketlarni o'rnatish va ishga tushirish

```bash
# Yangi paketni o'rnatish
npm install dotenv

# Serverni ishga tushirish
npm start
```

## 6. Tekshirish

Server ishga tushganda quyidagi xabarlarni ko'rishingiz kerak:
```
✅ MongoDB muvaffaqiyatli ulandi: cluster0-shard-00-00.xxxxx.mongodb.net
📊 Database: tabrikDB
🚀 Server http://localhost:5000 da ishlayapti
```

## Xatolar va yechimlar

### Xato: "Authentication failed"
- Username/password to'g'riligini tekshiring
- Database user yaratilganligini tekshiring

### Xato: "IP not whitelisted"
- Network Access dan IP manzilni qo'shing
- 0.0.0.0/0 (har qanday IP) qo'shishni tavsiya qilaman

### Xato: "Connection timeout"
- Internet aloqasini tekshiring
- Firewall sozlamalarini tekshiring