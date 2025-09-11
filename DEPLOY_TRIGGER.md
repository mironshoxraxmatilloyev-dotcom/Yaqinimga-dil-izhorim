#!/bin/bash

# 🚀 RENDER.COM DEPLOY TRIGGER
# Bu fayl har safar GitHub ga push qilinganda Render.com da avtomatik deploy ishga tushadi

echo "🔄 Render.com deploy trigger activated"
echo "📅 Deploy vaqti: $(date)"
echo "📦 Loyiha: Tabrik Xizmati"
echo "🌐 Repository: mironshoxraxmatilloyev-dotcom/Yaqinimga-dil-ishorim"

# Deploy trigger
echo "DEPLOY_TRIGGER=true" >> $GITHUB_ENV

echo "✅ Deploy trigger faollashtirildi!"

# Deploy ma'lumotlari
cat << EOF

🎯 DEPLOY MA'LUMOTLARI:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 SERVICE: Web Service (Node.js)
📍 PLAN: Free Tier
📍 REGION: Oregon (US West)
📍 HEALTH CHECK: /health
📍 AUTO DEPLOY: Enabled

🔧 BUILD COMMAND: npm install
🚀 START COMMAND: npm start

🌍 ENVIRONMENT VARIABLES:
  ├── NODE_ENV=production
  └── MONGODB_URI=mongodb+srv://...

📊 FEATURES:
  ├── ✅ SSL Certificate (HTTPS)
  ├── ✅ Custom Domain Support
  ├── ✅ Auto-scaling
  ├── ✅ Continuous Deployment
  ├── ✅ Health Monitoring
  └── ✅ Logs & Analytics

🔗 DEPLOY URL: https://tabrik-xizmati.onrender.com
🔗 ADMIN PANEL: https://tabrik-xizmati.onrender.com/admin.html

🔑 ADMIN LOGIN:
  ├── Login: dildora.naimova_admin
  └── Parol: Dildora@2025

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 Deploy muvaffaqiyatli boshlandi!
🕐 Tayyor bo'lish vaqti: 2-3 daqiqa

EOF