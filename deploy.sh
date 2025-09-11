#!/bin/bash
# Render.com deployment script
# Bu script yangi commit push qilinganda avtomatik deploy qilish uchun

echo "🚀 Deploying to Render.com..."

# GitHub ga push qilish
git add .
git commit -m "Update: Auto-deploy trigger"
git push origin main

echo "✅ Pushed to GitHub"
echo "🔄 Render.com automatic deployment boshlandi..."
echo "📊 Deployment holatini tekshirish: https://dashboard.render.com"

# Manual deploy trigger (webhook URL kerak)
# curl -X POST "YOUR_RENDER_WEBHOOK_URL"

echo "🌐 Deployment tugagach saytni tekshiring"