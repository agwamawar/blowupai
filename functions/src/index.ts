
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Request, Response } from "express";
import { initializeServiceAccounts } from '../../src/lib/serviceAccounts';

// Initialize service accounts
const { admin, vertexai } = initializeServiceAccounts();
const model = vertexai.preview.getGenerativeModel({ model: 'gemini-pro' });

export const optimizeText = functions.https.onRequest(
  async (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text) {
      res.status(400).send("Text input required");
      return;
    }

    try {
      const result = await model.generateContent(text);
      const response = await result.response;
      const responseText = response.text() || "No response";

      res.json({ optimizedText: responseText });
    } catch (error) {
      console.error("Error generating content:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);
