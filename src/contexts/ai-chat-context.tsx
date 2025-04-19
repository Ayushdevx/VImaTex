import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

interface AIContextType {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => void;
  clearMessages: () => void;
}

const defaultContext: AIContextType = {
  messages: [],
  isLoading: false,
  sendMessage: () => {},
  clearMessages: () => {},
};

const AIContext = createContext<AIContextType>(defaultContext);

export const useAIChat = () => useContext(AIContext);

// Mock responses for demo purposes
const getAIResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // Domain-specific responses for campus questions
  if (lowerMessage.includes('exam')) {
    return "The next exams are scheduled for November 15-28, 2023. You can view your personal exam schedule in the Academic Calendar section.";
  } else if (lowerMessage.includes('library')) {
    return "The main library is located in the Academic Block. It's open from 8:00 AM to 10:00 PM on weekdays, and 9:00 AM to 6:00 PM on weekends. You can access digital resources 24/7 through the library portal.";
  } else if (lowerMessage.includes('lab')) {
    return "The science labs are located in the Science Block, floors 2-4. The CS labs are in the Technology Tower, floors 1-3. You can check the availability and book lab sessions through the Resources tab.";
  } else if (lowerMessage.includes('scholarship')) {
    return "VIT offers several scholarships based on merit, sports excellence, and financial need. The application window for the next semester opens on October 10. Visit the Financial Aid section for more details and eligibility criteria.";
  } else if (lowerMessage.includes('fee') || lowerMessage.includes('tuition')) {
    return "The tuition fee payment for the next semester is due by December 15. You can pay through the student portal using net banking, credit/debit cards, or UPI. Early payment discounts are available until November 30.";
  } else if (lowerMessage.includes('hostel') || lowerMessage.includes('accommodation')) {
    return "Hostel allocation for the next semester will begin on December 1. You can apply through the Housing portal with your preferences. There are various room options available including single, double and triple sharing.";
  } else if (lowerMessage.includes('class') || lowerMessage.includes('schedule')) {
    return "Your class schedule can be viewed in the Timetable section of your dashboard. If you need to request a change, please contact your academic advisor before the add/drop deadline on September 15.";
  } else if (lowerMessage.includes('professor') || lowerMessage.includes('faculty')) {
    return "You can find faculty contact information and office hours in the Faculty Directory. Most professors also maintain virtual office hours which can be booked through the Academic Support portal.";
  }
  
  // Generic fallback response
  return "I'm your VIT Chennai assistant, here to help with campus information, academic questions, and student resources. Could you please provide more details about what you're looking for?";
};

export const AIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate AI response with a delay
    setTimeout(() => {
      const aiResponse: Message = {
        role: 'assistant',
        content: getAIResponse(content),
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };
  
  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <AIContext.Provider
      value={{
        messages,
        isLoading,
        sendMessage,
        clearMessages,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}; 