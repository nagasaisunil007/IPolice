// Universal camera manager for Cordova and Web
export async function capturePhoto(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (window.cordova && navigator.camera) {
      // Cordova Camera Plugin
      const options = {
        quality: 80,
        destinationType: (window as any).Camera.DestinationType.DATA_URL,
        sourceType: (window as any).Camera.PictureSourceType.CAMERA,
        encodingType: (window as any).Camera.EncodingType.JPEG,
        allowEdit: false,
        correctOrientation: true
      };
      (navigator as any).camera.getPicture(
        (imageData: string) => resolve(`data:image/jpeg;base64,${imageData}`),
        (error: any) => reject(new Error(error)),
        options
      );
    } else if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Web fallback
      reject(new Error('Web camera capture not implemented. Use Cordova APK.'));
    } else {
      reject(new Error('Camera not available.'));
    }
  });
}
