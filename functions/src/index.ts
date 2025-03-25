
import * as functions from "firebase-functions";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from "node-fetch";

// Initialize Google AI Model (replace with your API key)
const genAI = new GoogleGenerativeAI("YOUR_GOOGLE_AI_API_KEY");

// OAuth credentials
const CLIENT_ID = "259167100596-gkmusb46hl8eg7k22901gvhh6ovl70b8.apps.googleusercontent.com";
const CLIENT_SECRET = "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";

export const optimizeText = functions.https.onRequest(async (req, res) => {
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
});

// OAuth token exchange endpoint for server-side processing
export const exchangeOAuthCode = functions.https.onRequest(async (req, res) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    };
    
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.set(corsHeaders).status(204).send('');
        return;
    }
    
    res.set(corsHeaders);
    
    try {
        const { code, redirectUri } = req.body;
        
        if (!code || !redirectUri) {
            res.status(400).json({ error: 'Missing code or redirect URI' });
            return;
        }
        
        // Exchange code for tokens
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code'
            }).toString()
        });
        
        const tokenData = await tokenResponse.json();
        
        if (!tokenResponse.ok) {
            console.error('Token exchange error:', tokenData);
            res.status(400).json({ error: tokenData.error_description || 'Token exchange failed' });
            return;
        }
        
        // Return tokens to client
        res.json({
            access_token: tokenData.access_token,
            refresh_token: tokenData.refresh_token,
            expires_in: tokenData.expires_in
        });
    } catch (error) {
        console.error('OAuth exchange error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
