import * as functions from "firebase-functions";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google AI Model (replace with your API key)
const genAI = new GoogleGenerativeAI("YOUR_GOOGLE_AI_API_KEY");

export const optimizeText = functions.https.onRequest(async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).send("Text input required");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    try {
        const result = await model.generateContent(text);
        const responseText = result.response.candidates[0]?.content.parts[0]?.text || "No response";
        
        res.json({ optimizedText: responseText });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
