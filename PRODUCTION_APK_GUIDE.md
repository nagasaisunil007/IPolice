# 🚀 Production APK Build Guide

## Overview

This guide will help you create a production-ready APK for **iPolice Bengaluru** with all optimizations, security features, and proper configuration for app store deployment.

## Quick Build Process

### 1. Run Production Build Script
```bash
node build-apk-production.js
```

This script will:
- Clean previous builds
- Set up production environment
- Build React app with optimizations
- Configure Cordova for production
- Apply security and mobile optimizations
- Create placeholder icons and splash screens

### 2. Build the APK
```bash
cd cordova-app
cordova platform add android
cordova build android --release
```

### 3. Find Your APK
The production APK will be located at:
```
cordova-app/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk
```

## Production Features

### ✅ Optimizations Applied
- **Minified code** - Smaller APK size
- **Production environment** - No debug logs
- **Optimized assets** - Compressed images and resources
- **Tree shaking** - Unused code removed
- **CSP headers** - Content Security Policy for security

### ✅ Security Features
- **Strict CSP** - Prevents XSS attacks
- **Firebase security** - Proper origin restrictions
- **No debug logs** - Console logs removed in production
- **Secure plugins** - Latest stable plugin versions

### ✅ Mobile Optimizations
- **Status bar styling** - Branded blue status bar
- **Back button handling** - Proper navigation behavior
- **Splash screen** - Professional loading screen
- **Orientation lock** - Portrait mode only
- **Keyboard optimization** - Better form interactions

## Customization for App Store

### 1. Update App Information
Edit `cordova-app/config.xml`:
```xml
<widget id="com.yourcompany.ipolice" version="1.0.0">
    <name>iPolice Bengaluru</name>
    <description>Your app description</description>
    <author email="your@email.com" href="https://yourwebsite.com">
        Your Company Name
    </author>
</widget>
```

### 2. Replace Placeholder Icons
Replace the generated icons in `cordova-app/www/img/` with your custom app icons:
- **Icons**: `icon-ldpi.png`, `icon-mdpi.png`, `icon-hdpi.png`, etc.
- **Splash Screens**: `splash-port-ldpi.png`, `splash-port-mdpi.png`, etc.

### 3. For Google Play Store Release

#### Sign Your APK:
```bash
# Generate keystore (one time only)
keytool -genkey -v -keystore ipolice-release.keystore -alias ipolice -keyalg RSA -keysize 2048 -validity 10000

# Build signed APK
cordova build android --release -- --keystore=ipolice-release.keystore --alias=ipolice
```

#### Upload Requirements:
- **Target API Level**: 34 (Android 14)
- **Minimum API Level**: 24 (Android 7.0)
- **App Bundle**: Consider using `cordova build android --release --packageType=bundle`

## Firebase Configuration

### Production Environment Variables
Make sure these are set in your Replit secrets:
```
FIREBASE_API_KEY=your_production_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com/
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

### Firebase Security Rules (Production)
```json
{
  "rules": {
    "reports": {
      ".read": true,
      ".write": "newData.child('userId').exists()"
    },
    "users": {
      ".read": true,
      ".write": true
    },
    "rewards": {
      ".read": true,
      ".write": false
    },
    "activities": {
      ".read": true,
      ".write": "newData.child('userId').exists()"
    }
  }
}
```

## Testing Checklist

### ✅ Before Release
- [ ] Test camera functionality on multiple devices
- [ ] Verify Firebase data sync works
- [ ] Test offline functionality
- [ ] Check location permissions
- [ ] Verify app icons and splash screens
- [ ] Test on different screen sizes
- [ ] Verify back button behavior
- [ ] Check status bar styling
- [ ] Test report submission flow
- [ ] Verify rewards system works

### ✅ Device Testing
- [ ] Samsung Galaxy devices
- [ ] Google Pixel devices  
- [ ] OnePlus devices
- [ ] Xiaomi/MIUI devices
- [ ] Different Android versions (7.0+)

## App Store Metadata

### Google Play Store
- **Title**: iPolice Bengaluru - Crime Reporting
- **Short Description**: Report traffic violations and safety issues in Bengaluru
- **Full Description**: A comprehensive civic engagement app for Bengaluru residents...
- **Category**: Lifestyle / Social
- **Age Rating**: Everyone
- **Permissions**: Camera, Location, Storage

### Screenshots Needed
- Main dashboard
- Report creation flow
- Camera interface
- Rewards system
- User profile
- Report history

## Maintenance

### Regular Updates
- Update Cordova plugins quarterly
- Monitor Firebase usage and costs
- Update Android target SDK annually
- Review and update security policies

### Performance Monitoring
- Firebase Analytics integration
- Crash reporting setup
- User feedback collection
- Performance metrics tracking

## Support

For issues during production build:
1. Check Firebase environment variables are set
2. Ensure Cordova platforms are up to date
3. Verify Android SDK and build tools versions
4. Review build logs for specific errors

Your production APK is now ready for deployment to the Google Play Store!