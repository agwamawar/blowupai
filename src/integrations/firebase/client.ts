
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCpKb1BE5TW_U9K1Gy-1rsBC8Qcsrn_qk4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "blowup-ai.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "blowup-ai",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "blowup-ai.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "259167100596",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:259167100596:web:489f3d684e31d29a0e01e1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
