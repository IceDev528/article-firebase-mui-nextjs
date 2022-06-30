import admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(process.env as any),
    });
  } catch (error: any) {
    console.log("Firebase admin initialization error", error.stack);
  }
}
export default admin.firestore();
