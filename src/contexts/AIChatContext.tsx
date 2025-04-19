import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { sendMessageToGemini, ChatMessage } from "@/lib/gemini";
import { useUserPreferences } from "./UserPreferencesContext";

interface AIChatContextType {
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (message: string) => Promise<void>;
  clearMessages: () => void;
  error: string | null;
  isExpanded: boolean;
  toggleExpanded: () => void;
  initializeChat: (systemPrompt?: string) => void;
}

const AIChatContext = createContext<AIChatContextType | undefined>(undefined);

export const useAIChat = () => {
  const context = useContext(AIChatContext);
  if (context === undefined) {
    throw new Error("useAIChat must be used within an AIChatProvider");
  }
  return context;
};

const SYSTEM_PROMPT = `You are VImaTe AI, a helpful AI assistant integrated within the VImaTe app, a platform specifically designed for VIT Chennai students. 
Your role is to provide accurate, helpful, and concise information about campus resources, academic programs, events, and student life at VIT Chennai.

Key Information about VIT Chennai:
- VIT Chennai is a private university located in Chennai, Tamil Nadu, India.
- It offers undergraduate, postgraduate, and doctoral programs in engineering, technology, sciences, and management.
- The campus includes academic blocks, hostels, sports facilities, and various student amenities.

Your capabilities:
- Provide information about academic programs, courses, and departments
- Help with campus navigation and information about facilities
- Share details about university policies, procedures, and schedules
- Offer general advice on student life, extracurricular activities, and campus events
- Provide basic academic support and study resources

When responding:
- Be friendly, professional, and respectful
- Keep responses concise and relevant to the query
- If you don't know specific VIT Chennai information, acknowledge the limitation
- For serious academic, health, or administrative issues, recommend speaking with appropriate university staff
- Never share false information about VIT Chennai

Remember that your primary purpose is to enhance the student experience at VIT Chennai by providing helpful information and guidance.`;

export const AIChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Get user preferences to provide context to the AI
  const { theme, textSize, accessibilityMode } = useUserPreferences();

  // Initialize chat with custom or default system prompt
  const initializeChat = useCallback((systemPrompt: string = SYSTEM_PROMPT) => {
    // Set ONLY the system message first
    const systemMessage: ChatMessage = {
      role: "system",
      content: systemPrompt
    };
    
    // Set only the system message
    setMessages([systemMessage]);
    
    // Then add the welcome message separately to avoid any risk of the system prompt being shown
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "model",
        content: "Hello! I'm your VImaTe AI assistant. How can I help you with VIT Chennai-related questions today?"
      }]);
    }, 100);
    
    setError(null);
  }, []);

  // Initialize with a welcome message and system prompt
  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  // Send a message to the AI
  const sendMessage = useCallback(async (content: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Add user message to chat
      const userMessage: ChatMessage = { role: "user", content };
      setMessages(prev => [...prev, userMessage]);
      
      // Create context about the user's settings and preferences
      const userContext = `User preferences: Using ${theme} theme, ${textSize} text size, and accessibility mode is ${accessibilityMode ? "enabled" : "disabled"}.`;

      // Get response from Gemini
      const aiResponse = await sendMessageToGemini(
        content,
        userContext,
        messages
      );

      // Add AI response to chat
      const aiMessage: ChatMessage = { 
        role: "model", 
        content: aiResponse.includes("Sorry, I couldn't process") 
          ? "Sorry, I couldn't process your request. Please try again later." 
          : aiResponse 
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Set error state if there was an issue
      if (aiResponse.includes("Sorry, I couldn't process")) {
        setError("Failed to get a response. Please try again.");
      }
    } catch (err) {
      console.error("Error in AI chat:", err);
      
      // Add error message to chat
      const errorMessage: ChatMessage = { 
        role: "model", 
        content: "Sorry, I couldn't process your request. Please try again later." 
      };
      setMessages(prev => [...prev, errorMessage]);
      
      setError("Failed to get a response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [messages, theme, textSize, accessibilityMode]);

  // Clear all messages except the system prompt
  const clearMessages = useCallback(() => {
    initializeChat();
  }, [initializeChat]);

  // Toggle chat expansion
  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const value = {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    error,
    isExpanded,
    toggleExpanded,
    initializeChat,
  };

  return <AIChatContext.Provider value={value}>{children}</AIChatContext.Provider>;
}; 