import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCQkv-uSNWHCotMzZUoc6XHvwn82r2-G10",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "cuerosportenos-35545.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "cuerosportenos-35545",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "cuerosportenos-35545.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "635538591561",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:635538591561:web:4ac19f80e2ed7252ff5498",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-TLN4FH8H4H"
};

// Initialize Firebase (safely handles SSR environments)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getDatabase(app, "https://cuerosportenos-35545-default-rtdb.firebaseio.com/");
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
