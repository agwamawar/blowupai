import * as admin from 'firebase-admin';
import { VertexAI } from '@google-cloud/vertexai';

export function initializeServiceAccounts() {
  try {
    // Initialize Firebase Admin
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
      })
    });

    // Initialize Vertex AI
    const vertexai = new VertexAI({
      project: process.env.VERTEX_PROJECT_ID,
      location: process.env.VERTEX_LOCATION || 'us-central1',
      credentials: {
        client_email: process.env.VERTEX_CLIENT_EMAIL,
        private_key: process.env.VERTEX_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }
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
    const analysis = processModelOutput(response.text);
    return analysis;
  } catch (error) {
    console.error('Error analyzing viral trend:', error);
    throw error;
  }
}

function processModelOutput(text) {
  return { summary: text };
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