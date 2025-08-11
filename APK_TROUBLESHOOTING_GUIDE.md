# 🔧 APK Troubleshooting Guide - Camera & Firebase Issues

## 🚨 Common Issues After APK Installation

### Issue 1: Camera Opens Gallery Instead of Camera
**Problem**: When clicking camera button, device gallery opens instead of native camera.

#### Root Cause
- Web `getUserMedia()` API doesn't work in Cordova APK environment
- Need to use Cordova Camera plugin instead of web camera API
- HTML `input[capture]` attribute opens gallery, not camera in APK

#### Solutions Implemented

**1. Cordova Camera Plugin Configuration**
```xml
<!-- In cordova-config.xml -->
<plugin name="cordova-plugin-camera" spec="^7.0.0">
    <variable name="ANDROID_SUPPORT_V4_VERSION" value="27.+" />
</plugin>

<!-- Required permissions -->
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

**2. Fixed Camera Implementation**
```typescript
// client/src/lib/cordova-camera.ts - NEW FILE
async capturePhotoWithCordova(): Promise<string> {
  const options = {
    quality: 80,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.CAMERA, // NOT PHOTOLIBRARY
    encodingType: Camera.EncodingType.JPEG,
    allowEdit: false,
    correctOrientation: true
  };
  
  return new Promise((resolve, reject) => {
    navigator.camera.getPicture(
      (imageData) => resolve(`data:image/jpeg;base64,${imageData}`),
      (error) => reject(new Error(error)),
      options
    );
  });
}
```

#### Testing Camera Fix
1. Build APK with: `node build-apk.js`
2. Install APK on device
3. Grant camera permissions in device settings
4. Test camera button - should open native camera, not gallery

---

### Issue 2: Firebase Data Not Saving in APK
**Problem**: Reports submitted from APK don't appear in Firebase Realtime Database.

#### Root Cause
- Environment variables not properly loaded in APK build
- Firebase configuration missing in production build
- Network restrictions in APK environment

#### Solutions Implemented

**1. Environment Variable Fix**
```bash
# client/.env.production (NEW FILE)
VITE_FIREBASE_API_KEY=${FIREBASE_API_KEY}
VITE_FIREBASE_AUTH_DOMAIN=${FIREBASE_AUTH_DOMAIN}
VITE_FIREBASE_DATABASE_URL=${FIREBASE_DATABASE_URL}
VITE_FIREBASE_PROJECT_ID=${FIREBASE_PROJECT_ID}
VITE_FIREBASE_STORAGE_BUCKET=${FIREBASE_STORAGE_BUCKET}
VITE_FIREBASE_MESSAGING_SENDER_ID=${FIREBASE_MESSAGING_SENDER_ID}
VITE_FIREBASE_APP_ID=${FIREBASE_APP_ID}
```

**2. Firebase Network Configuration**
```xml
<!-- In cordova-config.xml -->
<access origin="*" />
<allow-intent href="https://*/*" />
<allow-navigation href="https://firebaseio.com/*" />
<allow-navigation href="https://*.firebaseio.com/*" />
<allow-navigation href="https://firebase.google.com/*" />
```

**3. Hybrid Storage with Fallback**
```typescript
// Firebase with IndexedDB fallback for offline support
class FirebaseRealtimeManager {
  async createReport(reportData) {
    if (!this.isFirebaseReady()) {
      const storage = await this.getFallbackStorage();
      return storage.saveReport(reportData);
    }
    
    // Firebase operations...
  }
}
```

#### Testing Firebase Fix
1. Configure Firebase project in console
2. Set environment variables in Replit secrets
3. Build APK: `node build-apk.js`
4. Submit test report from APK
5. Check Firebase console for data

---

## 🛠️ Step-by-Step APK Build Process

### Prerequisites
```bash
# Install Cordova CLI
npm install -g cordova

# Install Android SDK and set ANDROID_HOME
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

### Build Steps
```bash
# 1. Set Firebase environment variables in Replit
# Go to Secrets tab and add your Firebase credentials

# 2. Build React app with Firebase config
npm run build

# 3. Run APK build script
node build-apk.js

# 4. Setup Cordova project
cd cordova-app
cordova platform add android

# 5. Install required plugins
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-file
cordova plugin add cordova-plugin-geolocation
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-whitelist

# 6. Build APK
cordova build android

# 7. Find your APK
# Location: cordova-app/platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🧪 Testing Checklist

### Camera Testing
- [ ] Camera button opens native camera (not gallery)
- [ ] Photo can be captured successfully
- [ ] Image appears in preview after capture
- [ ] Base64 data is properly generated
- [ ] Works on different Android versions

### Firebase Testing
- [ ] Internet connection available on device
- [ ] Firebase project has Realtime Database enabled
- [ ] Environment variables are set correctly
- [ ] Reports appear in Firebase console after submission
- [ ] Real-time updates work between devices

### Device Permissions
- [ ] Camera permission granted in device settings
- [ ] Location permission granted
- [ ] Internet/network permission granted
- [ ] Storage permission granted

---

## 🐛 Advanced Debugging

### Enable Debug Logging
```bash
# View device logs while testing
adb logcat | grep -i "ipolice\|camera\|firebase"

# Check specific errors
adb logcat | grep -E "(error|exception|fail)"
```

### Firebase Debug
```typescript
// Add to firebase-realtime.ts for debugging
console.log('Firebase Config:', {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? 'SET' : 'MISSING',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'SET' : 'MISSING',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL ? 'SET' : 'MISSING'
});
```

### Camera Debug
```typescript
// Add to cordova-camera.ts for debugging
console.log('Camera Environment:', {
  cordova: !!(window as any).cordova,
  camera: !!(window as any).Camera,
  navigator: !!navigator.camera
});
```

---

## 🚀 Production Deployment

### Sign APK for Release
```bash
# Generate keystore (one-time)
keytool -genkey -v -keystore ipolice-key.keystore -alias ipolice -keyalg RSA -keysize 2048 -validity 10000

# Build signed APK
cordova build android --release -- --keystore="../ipolice-key.keystore" --storePassword=yourpassword --alias=ipolice --password=yourpassword
```

### Firebase Security Rules
```json
{
  "rules": {
    "reports": {
      ".read": true,
      ".write": "auth != null || newData.child('userId').exists()"
    },
    "users": {
      "$uid": {
        ".read": true,
        ".write": "auth == null || auth.uid == $uid"
      }
    }
  }
}
```

---

## 📱 Device-Specific Issues

### Samsung Devices
- May require additional camera permissions
- Test on Samsung Galaxy S series and Note series

### Xiaomi/MIUI
- Enable "Install from Unknown Sources"
- Disable MIUI optimization during testing

### OnePlus/OxygenOS
- Check battery optimization settings
- Ensure app isn't being killed in background

---

## 🔄 Update Process

When making changes to fix issues:

1. **Update Code**: Make changes in client/src files
2. **Rebuild**: Run `npm run build`
3. **Update APK**: Run `node build-apk.js`
4. **Rebuild Cordova**: In cordova-app, run `cordova build android`
5. **Reinstall**: Transfer new APK to device and install

---

## 📞 Support Resources

### Cordova Documentation
- **Camera Plugin**: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-camera/
- **File Plugin**: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-file/

### Firebase Documentation
- **Realtime Database**: https://firebase.google.com/docs/database/web/start
- **Web Configuration**: https://firebase.google.com/docs/web/setup

### Android Development
- **Permissions**: https://developer.android.com/guide/topics/permissions/overview
- **WebView**: https://developer.android.com/guide/webapps/webview

---

**Remember**: Always test on physical Android device, not emulator, for camera and Firebase functionality!