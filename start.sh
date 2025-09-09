#!/bin/bash

echo "🚀 Starting Tabrik Xizmati deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if MongoDB URI is set
if [ -z "$MONGODB_URI" ]; then
    echo "⚠️  MONGODB_URI environment variable is not set."
    echo "   Using default local MongoDB connection."
    echo "   For production, please set MONGODB_URI environment variable."
fi

# Start the server
echo "🌟 Starting Tabrik Xizmati server..."
npm start