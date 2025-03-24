
const request = require("request");

request(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, (error, response, body) => {
    if (error) {
        console.error("Request Error:", error);
        return;
    }
    console.log("Trend Analysis Response:", body); // Log raw response
    try {
        const parsedData = JSON.parse(body);
        console.log("Parsed Data:", parsedData);
    } catch (error) {
        console.error("JSON Parsing Error:", error);
    }
});
