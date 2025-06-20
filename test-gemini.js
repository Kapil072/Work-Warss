import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API with your key
const genAI = new GoogleGenerativeAI("AIzaSyDGJppzCpZMG_qAhLD_wOe-aVIz8baZi34");

async function testGeminiAPI() {
    try {
        console.log("Testing Gemini API connection...");
        
        // Test with a simple prompt
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.0-pro",
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 2048,
            }
        });

        console.log("\nTesting model with a simple prompt...");
        const result = await model.generateContent("Hello, are you working?");
        const response = await result.response;
        
        console.log("\nTest Response:", response.text());
        console.log("\nAPI Key is working correctly!");
    } catch (error) {
        console.error("\nError testing Gemini API:", error);
        console.log("\nTroubleshooting tips:");
        console.log("1. Check if your API key is valid");
        console.log("2. Verify if you have enabled the Gemini API in Google Cloud Console");
        console.log("3. Check if you have billing enabled (required even for free tier)");
        console.log("4. Verify your internet connection");
        console.log("\nError details:", error.message);
    }
}

testGeminiAPI(); 