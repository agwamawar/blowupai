
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Request, Response } from "express";

// Initialize Firebase Admin SDK
admin.initializeApp();

// Initialize Google AI Model (replace with your API key)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "YOUR_GOOGLE_AI_API_KEY");

export const optimizeText = functions.https.onRequest(
  async (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text) {
      res.status(400).send("Text input required");
      return;
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    try {
      const result = await model.generateContent(text);
      const responseText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

      res.json({ optimizedText: responseText });
    } catch (error) {
      console.error("Error generating content:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);
