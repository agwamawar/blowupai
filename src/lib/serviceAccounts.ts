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
    let vertexServiceAccount;
    try {
      vertexServiceAccount = JSON.parse(process.env.VERTEX_AI_SERVICE_ACCOUNT || '{}');
      if (!vertexServiceAccount.project_id || !vertexServiceAccount.private_key) {
        throw new Error('Missing required Vertex AI service account fields');
      }
    } catch (error) {
      console.error('Error parsing Vertex AI service account:', error);
      throw new Error('Invalid Vertex AI service account configuration');
    }

    // Initialize Vertex AI
    const vertexai = new VertexAI({
      project: vertexServiceAccount.project_id,
      location: 'us-central1',
      credentials: vertexServiceAccount
    });

    return { admin, vertexai };
  } catch (error) {
    console.error('Error initializing service accounts:', error);
    throw error;
  }
}


export async function analyzeViralTrend(text) {
  try {
    const { vertexai } = initializeServiceAccounts();
    const model = vertexai.preview.getGenerativeModel({ 
      model: 'gemini-pro',
      generation_config: {
        max_output_tokens: 1024,
        temperature: 0.7,
        top_p: 0.8,
        top_k: 40
      }
    });

    const [response] = await model.generateText({ prompt: text });
    const analysis = processModelOutput(response.text); // Placeholder for actual processing
    return analysis;
  } catch (error) {
    console.error('Error analyzing viral trend:', error);
    throw error;
  }
}

// Placeholder function - replace with actual model output processing logic
function processModelOutput(text){
    return {summary: text}
}


//Example usage
async function main(){
    try{
        const analysis = await analyzeViralTrend("Analyze the virality of #cats on twitter");
        console.log(analysis);
    } catch (error){
        console.error("Error in main function:", error);
    }
}


main();