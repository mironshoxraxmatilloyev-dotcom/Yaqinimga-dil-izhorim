# MongoDB Atlas bosqichma-bosqich sozlash

## 1. 🔗 Connection String olish

Atlas sahifangizda (hozir ochiq sahifa):

1. **"Connect" tugmasini bosing** (Cluster0 yonidagi)
2. **"Drivers" ni tanlang**
3. **"Node.js" driver ni tanlang**
4. **Connection string ni nusxalang**

Misol:
```
mongodb+srv://myuser:mypassword@cluster0.abcde.mongodb.net/tabrikDB?retryWrites=true&w=majority
```

## 2. 🔑 Database User yaratish (agar yo'q bo'lsa)

1. Chap menuda **"Database Access"** ga o'ting
2. **"Add New Database User"** tugmasini bosing
3. **Username** va **Password** yarating (eslab qoling!)
4. **"Built-in Role"** da **"Read and write to any database"** ni tanlang
5. **"Add User"** tugmasini bosing

## 3. 🌐 Network Access sozlash

1. Chap menuda **"Network Access"** ga o'ting
2. **"Add IP Address"** tugmasini bosing
3. **"Allow Access from Anywhere"** ni tanlang (0.0.0.0/0)
   - Yoki o'z IP manzilingizni qo'shing
4. **"Confirm"** tugmasini bosing

## 4. 📝 .env faylini yangilash

1. `.env` faylini oching
2. `MONGODB_URI` qatorini yangilang:

```env
PORT=5000
MONGODB_URI=mongodb+srv://SIZNING_USERNAME:SIZNING_PASSWORD@cluster0.xxxxx.mongodb.net/tabrikDB?retryWrites=true&w=majority
NODE_ENV=development
```

**MUHIM:** 
- `SIZNING_USERNAME` va `SIZNING_PASSWORD` ni o'z ma'lumotlaringiz bilan almashtiring
- `cluster0.xxxxx` qismini o'z cluster manzilingiz bilan almashtiring

## 5. 🚀 Serverni ishga tushirish

```bash
# Paketlarni yangilash
npm install

# Serverni ishga tushirish
npm start
```

Yoki Windows uchun:
```cmd
start-server.bat
```

## 6. ✅ Muvaffaqiyat belgilari

Server to'g'ri ishlaganda console da ko'rasiz:
```
✅ MongoDB muvaffaqiyatli ulandi: cluster0-shard-00-00.xxxxx.mongodb.net
📊 Database: tabrikDB
🚀 Server http://localhost:5000 da ishlayapti
```

## 🚨 Keng tarqalgan xatolar

### Xato: "Authentication failed"
**Sabab:** Username/password noto'g'ri
**Yechim:** Database Access dan user ma'lumotlarini tekshiring

### Xato: "IP not whitelisted"  
**Sabab:** IP manzil ruxsat ro'yxatida yo'q
**Yechim:** Network Access da 0.0.0.0/0 qo'shing

### Xato: "Connection timeout"
**Sabab:** Internet yoki firewall muammosi
**Yechim:** Internet aloqasini va firewall sozlamalarini tekshiring

## 🔄 Test qilish

1. Saytga o'ting: http://localhost:5000
2. Admin sahifasi: http://localhost:5000/admin.html
3. Tabrik qo'shing va ma'lumot saqlanishini tekshiring
4. Server qayta ishga tushirganda ma'lumotlar yo'qolmasligini tekshiring