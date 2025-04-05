
import { initializeServiceAccounts } from './serviceAccounts';

async function testVertexAIIntegration() {
  try {
    console.log('Starting Vertex AI integration test...');
    
    // Initialize Vertex AI client
    const { vertexai } = initializeServiceAccounts();
    console.log('✓ Successfully initialized Vertex AI client');
    
    // Create model instance
    const model = vertexai.preview.getGenerativeModel({ 
      model: 'gemini-pro',
      generationConfig: {
        maxOutputTokens: 256,
        temperature: 0.1
      }
    });
    console.log('✓ Successfully created model instance');

    // Test prompt
    const testPrompt = "Generate a one sentence test response to verify the integration.";
    
    // Send test request
    const response = await model.generateContent(testPrompt);
    const result = await response.response;
    const text = result.text();
    
    console.log('\nTest Results:');
    console.log('-------------');
    console.log('Response received:', text);
    console.log('✓ Successfully received response from Vertex AI');
    
    return true;
  } catch (error) {
    console.error('\nTest Failed:');
    console.error('------------');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    return false;
  }
}

// Run test and log results
testVertexAIIntegration()
  .then(success => {
    if (success) {
      console.log('\n✅ All tests passed - Vertex AI integration is working correctly');
    } else {
      console.log('\n❌ Tests failed - Please check the error logs above');
    }
  });

export { testVertexAIIntegration };
