#!/bin/bash
# Setup script for private deployment repo

echo "🚀 Setting up private deployment repo..."

# 1. Create new directory for private repo
cd ~/Desktop
mkdir -p deadman-private
cd deadman-private

# 2. Copy all files from main repo
cp -r ../dead-mans-trigger/* .
cp ../dead-mans-trigger/.gitignore .

# 3. Create .env with real credentials
cat > .env << 'EOF'
PORT=3000

# PRODUCTION EMAIL CONFIGURATION
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=deadmanstriggerswitch@gmail.com
EMAIL_PASS=qikzjihgxbreynah

# Production environment
NODE_ENV=production
EOF

echo "✅ Created .env file with credentials"

# 4. Update .gitignore to ALLOW .env in private repo
cat > .gitignore << 'EOF'
# Node modules
node_modules/

# Database (regenerate on server)
*.db
*.sqlite
*.sqlite3

# Logs
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Local development only
*.local
.cache/

# NOTE: .env is INCLUDED in private repo (contains production credentials)
# This repo should ALWAYS be PRIVATE!
EOF

echo "✅ Updated .gitignore for private repo"

# 5. Initialize git and push to private repo
git init
git add .
git commit -m "Initial private deployment setup"
git branch -M main
git remote add origin https://github.com/Ringmast4r/DMT-WEBSITE.git
git push -u origin main

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://railway.app/ and sign up with GitHub"
echo "2. Create new project → Deploy from GitHub repo"
echo "3. Select: Ringmast4r/DMT-WEBSITE"
echo "4. Railway will auto-detect and deploy!"
echo "5. Get your Railway URL and connect to Cloudflare"
echo ""
echo "🌐 Your private repo: https://github.com/Ringmast4r/DMT-WEBSITE"
