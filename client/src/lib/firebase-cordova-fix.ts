// APK-compatible Firebase initialization

// @ts-ignore
import { initializeApp } from 'firebase/app';
// @ts-ignore
import { getDatabase } from 'firebase/database';

declare global {
  interface Window {
    cordova?: any;
    _firebaseApp?: any;
  }
}


const isCordovaEnvironment = () => {
  return typeof window !== 'undefined' && (window.cordova !== undefined || location.protocol === 'file:');
};

export function initFirebase(config: any) {
  if (!window._firebaseApp) {
    window._firebaseApp = initializeApp(config);
    if (isCordovaEnvironment()) {
      document.addEventListener('deviceready', () => {
        console.log('Firebase configured for Cordova APK');
      }, false);
    }
  }
  return window._firebaseApp;
}

export function getFirebaseDatabase() {
  if (!window._firebaseApp) throw new Error('Firebase not initialized');
  return getDatabase(window._firebaseApp);
}
