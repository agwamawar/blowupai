
const request = require("request");

request("YOUR_API_ENDPOINT", (error, response, body) => {
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
