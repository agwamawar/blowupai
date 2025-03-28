
import { postToEndpoint } from "./services/api";

interface UserData {
  name: string;
  email: string;
}

async function testAPI() {
  try {
    const response = await postToEndpoint<{ message: string }, UserData>({
      name: "John Doe",
      email: "john@example.com",
    });

    console.log("Response:", response);
  } catch (error) {
    console.error("API Error:", error);
  }
}

testAPI();
