# iPolice Bengaluru - Mobile APK Setup Guide

## 🚀 Complete Mobile APK Conversion with Firebase Integration

This guide will help you convert your iPolice Bengaluru web app to a mobile APK with Firebase Realtime Database integration.

## 📋 Prerequisites

1. **Node.js** (v16 or higher)
2. **Android Studio** with Android SDK
3. **Cordova CLI**: `npm install -g cordova`
4. **Firebase Project** with Realtime Database enabled
5. **Java Development Kit (JDK) 8 or higher**

## 🔧 Environment Setup

### 1. Set Environment Variables
Set your `ANDROID_HOME` environment variable:
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

### 2. Firebase Configuration
Create a `.env` file in the client directory with your Firebase credentials:
```bash
cp client/.env.example client/.env
# Edit .env with your Firebase project details
```

## 🏗️ Build Process

### Step 1: Prepare React App for Mobile
```bash
# Install dependencies
npm install

# Build the React application
npm run build
```

### Step 2: Run APK Build Script
```bash
# Execute the automated build script
node build-apk.js
```

### Step 3: Setup Cordova Project
```bash
cd cordova-app

# Add Android platform
cordova platform add android

# Install required plugins
cordova plugin add cordova-plugin-whitelist
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-file
cordova plugin add cordova-plugin-geolocation
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-splashscreen
cordova plugin add cordova-plugin-statusbar
cordova plugin add cordova-plugin-network-information
cordova plugin add cordova-plugin-vibration
```

### Step 4: Build APK
```bash
# Debug build (for testing)
cordova build android

# Release build (for production)
cordova build android --release
```

## 📱 APK Output Locations

- **Debug APK**: `cordova-app/platforms/android/app/build/outputs/apk/debug/app-debug.apk`
- **Release APK**: `cordova-app/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk`

## 🔥 Firebase Features Implemented

### Real-time Data Synchronization
- **Reports**: Real-time submission and viewing of traffic violation reports
- **User Profiles**: Live updates of user stats and rankings
- **Leaderboard**: Dynamic leaderboard with real-time score updates
- **Rewards**: Live rewards system with point tracking

### Mobile-Specific Features
- **Offline Support**: Data cached locally and synced when online
- **Device Integration**: Camera access, GPS location, file picker
- **Push Notifications**: Real-time notifications for report updates
- **Network Detection**: Automatic sync when network becomes available

## 🛠️ Mobile App Features

### Enhanced Camera Functionality
- Multiple camera access methods with fallbacks
- Image compression for mobile storage
- Base64 encoding for Firebase storage
- Permission handling for Android devices

### Location Services
- GPS integration with Bengaluru boundary validation
- Fallback to manual location entry
- Coordinate validation and area mapping

### Offline-First Architecture
- IndexedDB for local data storage
- Automatic sync with Firebase when online
- Conflict resolution for offline changes
- Status indicators for sync state

## 🧪 Testing Your APK

### Installation
1. Enable "Developer Options" on your Android device
2. Enable "USB Debugging" and "Install Unknown Apps"
3. Transfer the APK to your device
4. Install the APK file

### Testing Checklist
- [ ] Camera functionality works
- [ ] Location services are accurate
- [ ] Reports can be submitted offline
- [ ] Data syncs with Firebase when online
- [ ] All UI elements are mobile-friendly
- [ ] Push notifications work (if implemented)
- [ ] App works without internet connection

## 🔐 Security Considerations

### Firebase Security Rules
Configure your Firebase Realtime Database rules:
```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid || root.child('users').child(auth.uid).child('role').val() === 'admin'",
        ".write": "$uid === auth.uid || root.child('users').child(auth.uid).child('role').val() === 'admin'"
      }
    },
    "reports": {
      ".read": true,
      ".write": "auth != null"
    },
    "rewards": {
      ".read": true,
      ".write": "root.child('users').child(auth.uid).child('role').val() === 'admin'"
    }
  }
}
```

### APK Signing (Production)
For production release, sign your APK:
```bash
# Generate a keystore (one-time)
keytool -genkey -v -keystore ipolice-release-key.keystore -alias ipolice -keyalg RSA -keysize 2048 -validity 10000

# Build signed APK
cordova build android --release -- --keystore="../ipolice-release-key.keystore" --storePassword=mypassword --alias=ipolice --password=mypassword
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Camera Not Working
- Ensure camera permissions are granted in device settings
- Check if camera plugin is properly installed
- Test on physical device (emulator camera might not work)

#### 2. Location Services Failing
- Enable GPS on device
- Grant location permissions to the app
- Test with physical device (emulator location might be inaccurate)

#### 3. Firebase Connection Issues
- Verify `.env` file has correct Firebase configuration
- Check internet connectivity
- Ensure Firebase project has Realtime Database enabled

#### 4. APK Build Failures
- Verify Android SDK is properly installed
- Check ANDROID_HOME environment variable
- Ensure Java JDK is installed and accessible

#### 5. App Crashes on Startup
- Check Cordova plugin compatibility
- Review device logs using `adb logcat`
- Ensure all required permissions are declared

### Debug Commands
```bash
# View device logs
adb logcat

# List connected devices
adb devices

# Install APK via ADB
adb install app-debug.apk

# Clear app data (for testing)
adb shell pm clear com.ipolice.bengaluru
```

## 🚀 Deployment to Play Store

### Pre-deployment Checklist
- [ ] APK is signed with production keystore
- [ ] Firebase security rules are configured
- [ ] All features tested on multiple devices
- [ ] App icons and splash screens are ready
- [ ] Privacy policy and terms of service are prepared
- [ ] Play Store listing content is ready

### Play Store Requirements
1. **Target API Level**: Ensure your APK targets recent Android API
2. **Permissions**: Justify all requested permissions in store description
3. **Content Rating**: Complete content rating questionnaire
4. **Screenshots**: Provide screenshots from actual device
5. **APK Size**: Optimize APK size (current: ~15-25MB)

## 📞 Support

For issues with this mobile conversion:
1. Check the troubleshooting section above
2. Review Firebase console for database connectivity
3. Test camera and location on physical device
4. Check Cordova documentation for plugin issues

## 🔄 Updates and Maintenance

### Updating the App
1. Make changes to the React codebase
2. Run `npm run build` to rebuild
3. Run `node build-apk.js` to update Cordova files
4. Build new APK with `cordova build android`

### Firebase Database Maintenance
- Monitor Firebase usage in the console
- Implement data cleanup scripts for old reports
- Regular backup of critical data
- Monitor security rule effectiveness

---

**iPolice Bengaluru** - Empowering civic engagement through mobile technology 🚔📱