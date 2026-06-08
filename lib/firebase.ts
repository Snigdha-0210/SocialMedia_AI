import * as admin from 'firebase-admin';

// Initialize Firebase Admin only once
if (!admin.apps.length) {
  try {
    if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PROJECT_ID) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      });
    } else {
      console.warn('Firebase credentials missing during build. Initializing mock app.');
      admin.initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID || "demo-project" });
    }
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
    // If it completely fails, initialize a completely empty app to prevent build crashes
    if (!admin.apps.length) {
       admin.initializeApp({ projectId: "demo-project" });
    }
  }
}

// Singletons
export const db = admin.firestore();
export const auth = admin.auth();
export const storage = admin.storage().bucket();
export { admin };
