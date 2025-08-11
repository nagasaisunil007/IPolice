
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
