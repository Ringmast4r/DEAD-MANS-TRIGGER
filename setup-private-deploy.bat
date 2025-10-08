@echo off
echo ========================================
echo Setting up private deployment repo
echo ========================================
echo.

REM Navigate to Desktop
cd /d "%USERPROFILE%\Desktop"

REM Create new directory for private repo
if not exist "deadman-private" mkdir deadman-private
cd deadman-private

REM Copy all files from main repo
echo Copying files...
xcopy /E /I /Y "..\dead-mans-trigger\*" .

REM Create .env with real credentials
echo Creating .env file...
(
echo PORT=3000
echo.
echo # PRODUCTION EMAIL CONFIGURATION
echo EMAIL_HOST=smtp.gmail.com
echo EMAIL_PORT=587
echo EMAIL_SECURE=false
echo EMAIL_USER=deadmanstriggerswitch@gmail.com
echo EMAIL_PASS=qikzjihgxbreynah
echo.
echo # Production environment
echo NODE_ENV=production
) > .env

echo.
echo ✓ Created .env file with credentials
echo.

REM Update .gitignore to ALLOW .env in private repo
(
echo # Node modules
echo node_modules/
echo.
echo # Database ^(regenerate on server^)
echo *.db
echo *.sqlite
echo *.sqlite3
echo.
echo # Logs
echo *.log
echo npm-debug.log*
echo.
echo # OS files
echo .DS_Store
echo Thumbs.db
echo.
echo # IDE
echo .vscode/
echo .idea/
echo.
echo # Local development only
echo *.local
echo .cache/
echo.
echo # NOTE: .env is INCLUDED in private repo ^(contains production credentials^)
echo # This repo should ALWAYS be PRIVATE!
) > .gitignore

echo ✓ Updated .gitignore for private repo
echo.

REM Initialize git
echo Initializing git repository...
git init
git add .
git commit -m "Initial private deployment setup"
git branch -M main
git remote add origin https://github.com/Ringmast4r/DMT-WEBSITE.git

echo.
echo ========================================
echo Ready to push!
echo ========================================
echo.
echo Run this command to push to GitHub:
echo.
echo   git push -u origin main
echo.
echo Then:
echo 1. Go to https://railway.app/
echo 2. Sign up with GitHub
echo 3. New Project → Deploy from GitHub
echo 4. Select: Ringmast4r/DMT-WEBSITE
echo 5. Railway auto-deploys!
echo.
echo Your private repo: https://github.com/Ringmast4r/DMT-WEBSITE
echo.
pause
