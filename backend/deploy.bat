@echo off
REM 🚀 Tabrik Xizmati - Windows Deploy Skripti

echo 🔄 Deploy jarayoni boshlandi...
echo.

REM Git holatini tekshirish
echo 📝 Git holatini tekshirmoqda...
git add .

REM O'zgarishlarni commit qilish
echo 💾 O'zgarishlarni saqlash...
git commit -m "Ready for deployment - %date% %time%"

REM GitHub ga push qilish
echo 📤 GitHub ga yuborish...
git push origin main

echo.
echo ✅ DEPLOY TAYYOR!
echo.
echo 🎯 KEYINGI QADAMLAR:
echo.
echo 1. RENDER.COM (Tavsiya etiladi):
echo    - https://render.com ga o'ting
echo    - GitHub bilan ro'yxatdan o'ting
echo    - 'New +' ^> 'Web Service'
echo    - Repository: mironshoxraxmatilloyev-dotcom/Yaqinimga-dil-ishorim
echo    - Build Command: npm install
echo    - Start Command: npm start
echo    - Environment Variables:
echo      NODE_ENV=production
echo      MONGODB_URI=mongodb+srv://mironshox:D1WVdeVfthVP1Z2F@cluster0.zthjn1c.mongodb.net/tabrikDB?retryWrites=true^&w=majority
echo.
echo 2. VERCEL.COM:
echo    - https://vercel.com ga o'ting
echo    - GitHub import qiling
echo    - Environment Variables ni qo'shing
echo.
echo 3. RAILWAY.APP:
echo    - https://railway.app ga o'ting
echo    - GitHub repo connect qiling
echo.
echo 📍 Repository URL: https://github.com/mironshoxraxmatilloyev-dotcom/Yaqinimga-dil-ishorim
echo.
echo 🔑 Admin Login:
echo    Login: dildora.naimova_admin
echo    Parol: Dildora@2025
echo.
echo 🎉 Deploy muvaffaqiyatli tugadi!
echo.
pause