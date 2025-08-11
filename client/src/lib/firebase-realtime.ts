// Firebase Realtime Database manager with APK environment detection
import { getDatabase, ref, set, push } from 'firebase/database';
import { isCordova } from './apk-environment-fix';
import { getFirebaseDatabase } from './firebase-cordova-fix';

export async function saveReport(reportData: any) {
  try {
    const db = getFirebaseDatabase();
    const reportsRef = ref(db, 'reports');
    const newReportRef = push(reportsRef);
    await set(newReportRef, reportData);
    return true;
  } catch (error) {
    if (isCordova()) {
      // Optionally, fallback to local storage or show error
      alert('Failed to save report. Please check your network connection.');
    }
    throw error;
  }
}
