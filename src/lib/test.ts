
import { auth, db } from './firebase';
import { generateContent } from './genai';
import { collection, getDocs, addDoc } from 'firebase/firestore';

async function testFirebase() {
  console.log('\n--- Testing Firebase ---');
  try {
    console.log('Firebase app name:', auth.app.name);
    
    // Test Firestore write and read
    const testCollection = collection(db, 'test');
    const testDoc = await addDoc(testCollection, {
      test: true,
      timestamp: new Date()
    });
    console.log('✅ Firestore write successful:', testDoc.id);
    
    const snapshot = await getDocs(testCollection);
    console.log('✅ Firestore read successful. Documents:', snapshot.size);
  } catch (error) {
    console.error('❌ Firebase test failed:', error);
  }
}

async function testVertexAI() {
  console.log('\n--- Testing Vertex AI ---');
  try {
    const prompt = 'Generate a quick test response to verify the connection.';
    const response = await generateContent(prompt);
    console.log('✅ Vertex AI response:', response);
  } catch (error) {
    console.error('❌ Vertex AI test failed:', error);
  }
}

async function runTests() {
  console.log('Starting integration tests...\n');
  await testFirebase();
  await testVertexAI();
  console.log('\nTests completed.');
}

runTests();
