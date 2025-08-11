// Utility to detect APK/Cordova environment
declare global {
  interface Window {
    cordova?: any;
  }
}

export function isCordova() {
  return typeof window !== 'undefined' && (window.cordova !== undefined || location.protocol === 'file:');
}
