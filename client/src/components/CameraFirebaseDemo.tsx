import React, { useState } from 'react';
import { capturePhoto } from '../lib/cordova-camera';
import { saveReport } from '../lib/firebase-realtime';
import { initFirebase } from '../lib/firebase-cordova-fix';

// Initialize Firebase with your config (replace with your actual config or import from env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
initFirebase(firebaseConfig);

const CameraFirebaseDemo: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleCapture = async () => {
    setMessage('');
    try {
      const img = await capturePhoto();
      setImage(img);
    } catch (err: any) {
      setMessage('Camera error: ' + err.message);
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    setUploading(true);
    setMessage('');
    try {
      await saveReport({ image, timestamp: Date.now() });
      setMessage('Upload successful!');
    } catch (err: any) {
      setMessage('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Camera + Firebase Demo</h2>
      <button onClick={handleCapture} disabled={uploading} style={{ marginRight: 8 }}>
        Capture Photo
      </button>
      {image && (
        <>
          <div style={{ margin: '16px 0' }}>
            <img src={image} alt="Captured" style={{ maxWidth: 300, border: '1px solid #ccc' }} />
          </div>
          <button onClick={handleUpload} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload to Firebase'}
          </button>
        </>
      )}
      {message && <div style={{ marginTop: 16, color: 'red' }}>{message}</div>}
    </div>
  );
};

export default CameraFirebaseDemo;
