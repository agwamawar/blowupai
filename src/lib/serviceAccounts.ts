
import * as admin from 'firebase-admin';
import { VertexAI } from '@google-cloud/vertexai';

export function initializeServiceAccounts() {
  try {
    // Parse Firebase service account
    const firebaseServiceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
    if (!firebaseServiceAccount.project_id) {
      throw new Error('Invalid Firebase service account configuration');
    }
    
    // Initialize Firebase Admin
    admin.initializeApp({
      credential: admin.credential.cert(firebaseServiceAccount)
    });

    // Parse Vertex AI service account
    const vertexServiceAccount = JSON.parse(process.env.VERTEX_AI_SERVICE_ACCOUNT || '{}');
    if (!vertexServiceAccount.project_id) {
      throw new Error('Invalid Vertex AI service account configuration');
    }

    // Initialize Vertex AI with the service account
    const vertexai = new VertexAI({
      project: vertexServiceAccount.project_id,
      location: 'us-central1', // Update as needed
      credentials: vertexServiceAccount
    });

    return { admin, vertexai };
  } catch (error) {
    console.error('Error initializing service accounts:', error);
    throw error;
  }
}
