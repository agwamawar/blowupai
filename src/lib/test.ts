
import { auth, db } from './firebase';
import { generateContent } from './gemini';
import { collection, getDocs } from 'firebase/firestore';

async function testIntegrations() {
  // Test Firebase
  console.log('Firebase initialized:', auth.app.name);
  const testCollection = await getDocs(collection(db, 'test'));
  console.log('Firestore connection working:', !testCollection.empty);

  // Test Gemini
  try {
    const response = await generateContent('Hello, how are you?');
    console.log('Gemini API response:', response);
  } catch (error) {
    console.error('Gemini API error:', error);
  }
}

testIntegrations();
