# 🚀 Tabrik Xizmati - Deployment Guide

This guide will help you deploy your Tabrik Xizmati website to various cloud platforms.

## 📋 Pre-deployment Checklist

✅ **Project Structure Ready**
- ✅ server.js configured for production
- ✅ package.json updated with proper scripts
- ✅ Frontend files optimized
- ✅ Database connection configured

## 🌟 Deployment Options

### 🥇 Option 1: Render.com (RECOMMENDED - FREE)

**Why Render?**
- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Built-in database hosting
- ✅ Easy GitHub integration
- ✅ Zero configuration needed

**Steps:**
1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/tabrik-xizmati.git
   git push -u origin main
   ```

2. **Deploy on Render**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub
   - Click "New Web Service"
   - Connect your GitHub repository
   - Use these settings:
     - **Name**: `tabrik-xizmati`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`

3. **Add MongoDB Database**
   - In Render dashboard, click "New PostgreSQL" or use MongoDB Atlas
   - For MongoDB Atlas (recommended):
     - Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
     - Create free cluster
     - Get connection string
     - Add to Render environment variables

**Live URL**: `https://tabrik-xizmati.onrender.com`

---

### 🥈 Option 2: Vercel (Good for Frontend)

**Steps:**
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   cd c:\Users\user\Desktop\Tabrik\Tabrik
   vercel
   ```

3. Follow prompts and configure MongoDB Atlas connection

**Live URL**: `https://tabrik-xizmati.vercel.app`

---

### 🥉 Option 3: Railway (Easy Setup)

**Steps:**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect Node.js and deploy

**Live URL**: `https://tabrik-xizmati.up.railway.app`

---

### 🥉 Option 4: Heroku (Popular Choice)

**Steps:**
1. Install Heroku CLI
2. Create app:
   ```bash
   heroku create tabrik-xizmati
   ```
3. Add MongoDB addon:
   ```bash
   heroku addons:create mongolab:sandbox
   ```
4. Deploy:
   ```bash
   git push heroku main
   ```

**Live URL**: `https://tabrik-xizmati.herokuapp.com`

---

## 🔧 Environment Variables Setup

For any platform, you'll need these environment variables:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tabriklar
```

## 🗄️ Database Setup (MongoDB Atlas)

1. **Create Account**: Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. **Create Cluster**: Choose free tier (M0)
3. **Create Database User**: 
   - Username: `tabrik_user`
   - Password: Generate strong password
4. **Whitelist IP**: Add `0.0.0.0/0` for global access
5. **Get Connection String**: 
   ```
   mongodb+srv://tabrik_user:<password>@cluster0.xxxxx.mongodb.net/tabriklar
   ```

## 🎯 Quick Deploy Commands

### Using Render (Recommended):
```bash
# 1. Create GitHub repo
git init
git add .
git commit -m "Deploy Tabrik Xizmati"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tabrik-xizmati.git
git push -u origin main

# 2. Go to render.com and connect GitHub repo
# 3. Your site will be live at: https://tabrik-xizmati.onrender.com
```

### Using Vercel:
```bash
npm install -g vercel
vercel
# Follow prompts
```

### Using Railway:
```bash
# Just push to GitHub and connect at railway.app
git push origin main
```

## 🔍 Testing Your Deployment

After deployment, test these URLs:
- ✅ Homepage: `https://your-domain.com/`
- ✅ Order page: `https://your-domain.com/buyurtma.html`
- ✅ About page: `https://your-domain.com/bizhaqimizda.html`
- ✅ Admin page: `https://your-domain.com/admin.html`
- ✅ API: `https://your-domain.com/api/test`

## 🆘 Troubleshooting

**Common Issues:**
1. **Port Error**: Make sure server.js uses `process.env.PORT`
2. **Database Connection**: Check MONGODB_URI environment variable
3. **Static Files**: Ensure frontend folder is properly served
4. **CORS Issues**: Add proper CORS configuration

**Support:**
- Check deployment logs in your platform dashboard
- Verify environment variables are set correctly
- Test API endpoints directly

## 🎉 Congratulations!

Your Tabrik Xizmati website is now live! Share your website URL with your customers.

**Next Steps:**
- 📱 Test on mobile devices
- 🔒 Set up custom domain (optional)
- 📊 Add analytics (optional)
- 🔄 Set up automatic deployments

---
*Made with ❤️ for Tabrik Xizmati*