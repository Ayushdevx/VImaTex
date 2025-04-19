import { GoogleGenerativeAI } from "@google/generative-ai";

// API Key
const API_KEY = "AIzaSyCYYB8Oe-jtYkcbYa60-76nq0SBTp7Hzr0";

// Create the API client
const genAI = new GoogleGenerativeAI(API_KEY);

// Chat history interface
export interface ChatMessage {
  role: "user" | "model" | "system";
  content: string;
}

// Simple function to generate AI response
export const sendMessageToGemini = async (
  message: string,
  context?: string,
  history?: ChatMessage[]
) => {
  try {
    console.log("Sending message to Gemini:", message);
    
    // Use the text-only gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    // Prepare messages for the API
    const formattedHistory: { role: string, parts: { text: string }[] }[] = [];
    
    // Add system message if it exists
    const systemMessage = history?.find(msg => msg.role === "system");
    if (systemMessage) {
      formattedHistory.push({
        role: "user",
        parts: [{ text: `${systemMessage.content}\n\nPlease follow these instructions carefully.` }]
      });
    }
    
    // Add remaining chat history (skipping system messages since we've handled them)
    history?.filter(msg => msg.role !== "system").forEach(msg => {
      formattedHistory.push({
        role: msg.role === "model" ? "model" : "user",
        parts: [{ text: msg.content }]
      });
    });
    
    // Start chat
    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 1024,
      },
    });
    
    // Add context to the message if provided
    let userMessage = message;
    if (context) {
      userMessage = `${context}\n\n${message}`;
    }
    
    // Send the message and get response
    const result = await chat.sendMessage(userMessage);
    const response = result.response.text();
    
    return response;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "Sorry, I couldn't process your request. Please try again later.";
  }
}; 