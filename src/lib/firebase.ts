
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Check if Firebase environment variables are properly defined
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;

// Log the environment variables for debugging (in development only)
if (import.meta.env.DEV) {
  console.log("Firebase Config:", {
    apiKey: apiKey ? "defined" : "undefined",
    authDomain: authDomain ? "defined" : "undefined",
    projectId: projectId ? "defined" : "undefined",
    storageBucket: storageBucket ? "defined" : "undefined",
    messagingSenderId: messagingSenderId ? "defined" : "undefined",
    appId: appId ? "defined" : "undefined",
  });
}

// Check if all required Firebase config values are present
const areFirebaseConfigValuesPresent = 
  apiKey && authDomain && projectId && 
  storageBucket && messagingSenderId && appId;

// Initialize Firebase only if all config values are present
let app;
let auth;
let db;
let storage;

if (areFirebaseConfigValuesPresent) {
  const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
  };

  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} else {
  console.warn(
    "Firebase initialization skipped. Missing environment variables. " +
    "Authentication and database features will not work."
  );
  
  // Create dummy objects to prevent runtime errors
  app = null;
  auth = {
    currentUser: null,
    onAuthStateChanged: () => () => {},
    signInWithEmailAndPassword: () => Promise.reject(new Error("Firebase not initialized")),
    createUserWithEmailAndPassword: () => Promise.reject(new Error("Firebase not initialized")),
    signOut: () => Promise.reject(new Error("Firebase not initialized"))
  };
  db = {};
  storage = {};
}

export { auth, db, storage };
export default app;
