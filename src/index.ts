
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin
admin.initializeApp();

// Export functions
export const api = functions.https.onRequest((req, res) => {
  res.json({ message: 'API endpoint' });
});
