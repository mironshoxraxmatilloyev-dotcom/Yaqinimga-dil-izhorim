# MongoDB O'rnatish Qo'llanmasi

## 1. MongoDB yuklab olish
1. https://www.mongodb.com/try/download/community ga o'ting
2. Quyidagi parametrlarni tanlang:
   - Version: Latest stable (7.0 yoki yangi)
   - OS: Windows
   - Package: msi
3. "Download" tugmasini bosing

## 2. O'rnatish
1. Yuklab olingan .msi faylni ishga tushiring
2. "Complete" o'rnatishni tanlang
3. "Install MongoD as a Service" belgisini qoldiring
4. "Run service as Network Service user" tanlang
5. O'rnatishni yakunlang

## 3. Xizmatni ishga tushirish
### Usul 1: Windows Services
1. Windows + R -> services.msc
2. "MongoDB" ni toping
3. Start tugmasini bosing

### Usul 2: Command Line (Administrator)
```cmd
net start MongoDB
```

### Usul 3: PowerShell (Administrator)
```powershell
Start-Service MongoDB
```

## 4. Tekshirish
MongoDB to'g'ri ishlayotganini tekshirish:
```cmd
mongo --version
```

## 5. Server ishga tushirish
MongoDB ishlagandan keyin:
```cmd
node server.js
```

## Muammolar
Agar muammolar bo'lsa, quyidagi loglarni tekshiring:
- Windows Event Viewer
- MongoDB log files: C:\Program Files\MongoDB\Server\7.0\log\