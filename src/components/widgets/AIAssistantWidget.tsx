import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Send, Book, Calendar, Map, Lightbulb, ArrowRight, Loader, Mic, MicOff, RefreshCw, School, Home, ClipboardList } from "lucide-react";
import { useAIChat } from "@/contexts/AIChatContext";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ScrollArea } from '@/components/ui/scroll-area';

// Define quick suggestions with icons specific to VIT Chennai
const QUICK_SUGGESTIONS = [
  { text: "When is the next exam?", icon: Calendar },
  { text: "How do I access the library?", icon: Book },
  { text: "Where is the science lab?", icon: Map },
  { text: "Tell me about scholarships", icon: Lightbulb },
  { text: "Academic programs offered", icon: School },
  { text: "Hostel accommodation details", icon: Home },
  { text: "University policies", icon: ClipboardList },
];

// Move the system prompt to a separate file or keep it hidden from the UI
const VIMATE_SYSTEM_PROMPT = `You are VImaTe AI, a helpful AI assistant integrated within the VImaTe app, a platform specifically designed for VIT Chennai students. Your role is to provide accurate, helpful, and concise information about campus resources, academic programs, events, and student life at VIT Chennai.

Key Information about VIT Chennai:
- VIT Chennai is a private university located in Chennai, Tamil Nadu, India.
- It offers undergraduate, postgraduate, and doctoral programs in engineering, technology, sciences, and management.
- The campus includes academic blocks, hostels, sports facilities, and various student amenities.

Your capabilities:
- Provide information about academic programs, courses, and departments
- Help with campus navigation and information about facilities
- Share details about university policies, procedures, and academic calendar
- Answer questions about student services, clubs, and extracurricular activities
- Assist with general queries about admission, fees, placements, and scholarships`;

// Strings that would indicate a message is a system prompt
const SYSTEM_PROMPT_IDENTIFIERS = [
  "You are VImaTe AI",
  "Your role is to provide",
  "VIT Chennai is a private university",
  "Your capabilities:",
  "Key Information about VIT Chennai"
];

export function AIAssistantWidget() {
  const { messages, isLoading, sendMessage, error, clearMessages, initializeChat } = useAIChat();
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [filteredMessages, setFilteredMessages] = useState([]);

  // Initialize with VImaTe system prompt
  useEffect(() => {
    if (!isInitialized) {
      initializeChat(VIMATE_SYSTEM_PROMPT);
      setIsInitialized(true);
    }
  }, [initializeChat, isInitialized]);

  // Filter messages to remove system instructions
  useEffect(() => {
    const filtered = messages.filter(msg => {
      // Remove all system role messages
      if (msg.role === "system") return false;
      
      // Check if the message contains identifiers of system instructions
      const containsSystemInstructions = SYSTEM_PROMPT_IDENTIFIERS.some(identifier => 
        msg.content.includes(identifier)
      );
      
      return !containsSystemInstructions;
    });
    
    // If we accidentally filtered out all messages, add a welcome message
    if (filtered.length === 0 && messages.length > 0) {
      filtered.push({
        role: "model",
        content: "Hello! I'm your VImaTe AI assistant. How can I help you with VIT Chennai-related questions today?"
      });
    }
    
    setFilteredMessages(filtered);
    
    // If we detected system messages in user-visible content, restart the chat
    if (messages.length > filtered.length + 1) { // +1 accounts for the hidden system message
      clearMessages();
      initializeChat(VIMATE_SYSTEM_PROMPT);
    }
  }, [messages, clearMessages, initializeChat]);

  // Get the last message from user and AI if they exist
  const lastUserMessage = filteredMessages.filter(m => m.role === "user").pop();
  const lastAIMessage = filteredMessages.filter(m => m.role === "model").pop();

  // Handler for sending messages
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };
  
  // Handler for quick suggestion clicks
  const handleQuickSuggestion = (suggestion: { text: string, icon: any }) => {
    sendMessage(suggestion.text);
  };

  // Reset chat on error
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearMessages();
        initializeChat(VIMATE_SYSTEM_PROMPT);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, clearMessages, initializeChat]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [filteredMessages]);

  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Card className="shadow-md border-neutral-200 dark:border-neutral-800 h-full flex flex-col">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src="/vimate-logo.png" alt="VImaTe" />
              <AvatarFallback>VI</AvatarFallback>
            </Avatar>
            VImaTe AI
          </div>
          {error && (
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-6 w-6" 
              onClick={() => {
                clearMessages();
                initializeChat(VIMATE_SYSTEM_PROMPT);
              }}
              title="Restart conversation"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          )}
        </CardTitle>
        <CardDescription className="text-xs text-neutral-500">
          {error ? (
            <span className="text-red-500">Connection error. Restarting...</span>
          ) : (
            "Your campus companion for VIT Chennai resources and information"
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 pt-2 flex-grow overflow-auto">
        <ScrollArea className="h-[180px] pr-4">
          {filteredMessages.length > 0 ? (
            <div className="space-y-3">
              {filteredMessages.slice(-4).map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] px-3 py-2 rounded-lg ${
                      msg.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {msg.role === 'model' ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {msg.content}
                      </motion.div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-8">
              <div className="text-sm text-neutral-500">
                Hi! I'm VImaTe AI, your campus assistant for VIT Chennai. How can I help you today?
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {QUICK_SUGGESTIONS.slice(0, 4).map((suggestion, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-muted transition-colors flex items-center gap-1"
                    onClick={() => handleQuickSuggestion(suggestion)}
                  >
                    {React.createElement(suggestion.icon, { className: "h-3 w-3" })}
                    {suggestion.text}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </ScrollArea>

        {filteredMessages.length > 0 && !error && (
          <div className="mt-4 flex flex-wrap gap-2">
            {QUICK_SUGGESTIONS.slice(0, 4).map((suggestion, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="cursor-pointer hover:bg-muted transition-colors flex items-center gap-1"
                onClick={() => handleQuickSuggestion(suggestion)}
              >
                {React.createElement(suggestion.icon, { className: "h-3 w-3" })}
                {suggestion.text}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-2 border-t">
        <div className="flex w-full items-center space-x-2">
          <Button 
            size="icon" 
            variant="ghost" 
            className="shrink-0" 
            onClick={() => setIsRecording(!isRecording)}
            disabled={isLoading || !!error}
          >
            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={error ? "Restarting chat..." : "Ask VImaTe AI..."}
            className="flex-grow"
            disabled={isLoading || !!error}
          />
          <Button 
            size="icon" 
            className="shrink-0" 
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim() || !!error}
          >
            {isLoading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 