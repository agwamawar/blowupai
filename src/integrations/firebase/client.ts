
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCpKb1BE5TW_U9K1Gy-1rsBC8Qcsrn_qk4",
  authDomain: "blowup-ai.firebaseapp.com",
  projectId: "blowup-ai",
  storageBucket: "blowup-ai.appspot.com", // Corrected from firebasestorage.app to appspot.com
  messagingSenderId: "259167100596",
  appId: "1:259167100596:web:489f3d684e31d29a0e01e1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
