#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting APK build process for iPolice Bengaluru...');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Error: package.json not found. Please run this from your project root directory.');
  process.exit(1);
}

// Step 1: Build the React app
console.log('📦 Building React application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ React build completed successfully');
} catch (error) {
  console.error('❌ React build failed. Make sure you have run "npm install" first.');
  console.error('Run: npm install');
  process.exit(1);
}

// Step 2: Setup Cordova directory structure
console.log('📁 Setting up Cordova directory structure...');
const cordovaDir = path.join(__dirname, 'cordova-app');
const wwwDir = path.join(cordovaDir, 'www');

// Create cordova app structure
if (!fs.existsSync(cordovaDir)) {
  fs.mkdirSync(cordovaDir, { recursive: true });
}

if (!fs.existsSync(wwwDir)) {
  fs.mkdirSync(wwwDir, { recursive: true });
}

// Step 3: Copy built React app to Cordova www directory
console.log('📋 Copying React build to Cordova www directory...');
try {
  // Use Windows-compatible copy command
  const sourceDir = path.join(__dirname, 'dist', 'public');
  if (!fs.existsSync(sourceDir)) {
    console.error('❌ Build directory not found at dist/public. Make sure npm run build completed successfully.');
    process.exit(1);
  }
  
  // Copy files recursively
  function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
  
  copyDir(sourceDir, wwwDir);
  console.log('✅ Files copied successfully');
} catch (error) {
  console.error('❌ File copy failed:', error.message);
  process.exit(1);
}

// Step 4: Create Cordova config.xml
console.log('⚙️ Creating Cordova configuration...');
const configContent = `<?xml version='1.0' encoding='utf-8'?>
<widget id="com.ipolice.bengaluru" version="2.1.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>iPolice Bengaluru</name>
    <description>
        iPolice Bengaluru - Revolutionizing Traffic Management in Bengaluru. Report traffic violations, earn rewards, and build a safer community.
    </description>
    <author email="support@ipolice.com" href="https://ipolice.com">
        iPolice Team
    </author>
    <content src="index.html" />
    <access origin="*" />
    <allow-navigation href="*" />
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
    <allow-intent href="tel:*" />
    <allow-intent href="sms:*" />
    <allow-intent href="mailto:*" />
    <allow-intent href="geo:*" />
    
    <!-- Firebase specific navigation allowances -->
    <allow-navigation href="https://firebaseio.com/*" />
    <allow-navigation href="https://*.firebaseio.com/*" />
    <allow-navigation href="https://firebase.google.com/*" />
    <allow-navigation href="https://*.googleapis.com/*" />
    
    <!-- Platform-specific configurations -->
    <platform name="android">
        <allow-intent href="market:*" />
    </platform>
    
    <!-- Permissions -->
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.VIBRATE" />
    
    <!-- Preferences -->
    <preference name="DisallowOverscroll" value="true" />
    <preference name="android-minSdkVersion" value="22" />
    <preference name="android-targetSdkVersion" value="33" />
    <preference name="BackupWebStorage" value="none" />
    <preference name="AndroidInsecureFileModeEnabled" value="true" />
    <preference name="AndroidXEnabled" value="true" />
    <preference name="CameraUsesGeolocation" value="true" />
</widget>`;

const configDest = path.join(cordovaDir, 'config.xml');
fs.writeFileSync(configDest, configContent);
console.log('✅ Cordova config.xml created');

// Step 5: Update index.html for mobile
console.log('📱 Creating mobile-specific modifications...');
const indexPath = path.join(wwwDir, 'index.html');
if (fs.existsSync(indexPath)) {
  let indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Add mobile meta tags and Cordova script with Firebase-compatible CSP
  const mobileMetaTags = `
    <meta name="format-detection" content="telephone=no">
    <meta name="msapplication-tap-highlight" content="no">
    <meta name="viewport" content="initial-scale=1, width=device-width, height=device-height, viewport-fit=cover">
    <meta http-equiv="Content-Security-Policy" content="default-src * 'unsafe-inline' 'unsafe-eval' data: gap: content: https://firebaseio.com https://*.firebaseio.com https://firebase.google.com https://*.googleapis.com wss://*.firebaseio.com;">
    <script type="text/javascript" src="cordova.js"></script>
  `;
  
  indexContent = indexContent.replace('</head>', mobileMetaTags + '</head>');
  
  // Add device ready event
  const deviceReadyScript = `
    <script>
      document.addEventListener('deviceready', function() {
        console.log('Cordova device ready');
        if (window.StatusBar) {
          window.StatusBar.styleDefault();
        }
      }, false);
    </script>
  `;
  
  indexContent = indexContent.replace('</body>', deviceReadyScript + '</body>');
  
  fs.writeFileSync(indexPath, indexContent);
  console.log('✅ Mobile modifications applied to index.html');
}

// Step 6: Create Firebase environment file for APK
console.log('🔥 Setting up Firebase environment...');
const envContent = `# Firebase Configuration for APK Build
# Replace these with your actual Firebase project credentials

VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com/
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
`;

fs.writeFileSync(path.join(__dirname, 'client', '.env.production'), envContent);
console.log('✅ Firebase environment template created');

// Step 7: Generate next steps instructions
const nextSteps = `
# 🎉 APK Build Preparation Complete!

## Next Steps (Run these in your terminal):

### 1. Navigate to Cordova directory:
cd cordova-app

### 2. Initialize Cordova project:
cordova create . com.ipolice.bengaluru "iPolice Bengaluru" --copy-from=www

### 3. Add Android platform:
cordova platform add android

### 4. Install required plugins:
cordova plugin add cordova-plugin-whitelist
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-file
cordova plugin add cordova-plugin-geolocation
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-splashscreen
cordova plugin add cordova-plugin-statusbar
cordova plugin add cordova-plugin-network-information

### 5. Build your APK:
cordova build android

## Your APK will be located at:
cordova-app/platforms/android/app/build/outputs/apk/debug/app-debug.apk

## Before building, make sure to:
1. Install Android Studio and Android SDK
2. Set ANDROID_HOME environment variable
3. Update Firebase credentials in client/.env.production

## If you get errors:
- Make sure you have Java JDK installed
- Verify ANDROID_HOME points to your Android SDK
- Run "cordova requirements" to check what's missing
`;

fs.writeFileSync(path.join(__dirname, 'NEXT_STEPS.md'), nextSteps);

console.log(`
🎉 APK build preparation completed!

Your Cordova app structure is ready at: cordova-app/

Next steps:
1. cd cordova-app
2. cordova platform add android  
3. Install plugins (see NEXT_STEPS.md)
4. cordova build android

For detailed instructions, see: NEXT_STEPS.md

⚠️  IMPORTANT: Update your Firebase credentials in client/.env.production before building!
`);