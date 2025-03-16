
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCpKb1BE5TW_U9K1Gy-1rsBC8Qcsrn_qk4",
  authDomain: "blowup-ai.firebaseapp.com",
  projectId: "blowup-ai",
  storageBucket: "blowup-ai.firebasestorage.app",
  messagingSenderId: "259167100596",
  appId: "1:259167100596:web:489f3d684e31d29a0e01e1"
};

let app;
let auth;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export { auth };
