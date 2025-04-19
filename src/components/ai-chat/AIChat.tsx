import React, { useState, useRef, useEffect } from "react";
import { useAIChat } from "@/contexts/AIChatContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User, X, Minimize2, Maximize2, Trash2, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const ChatMessage: React.FC<{ content: string; role: "user" | "model" | "system" }> = ({
  content,
  role,
}) => {
  const isUser = role === "user";
  
  return (
    <div className={cn("flex w-full items-start gap-2 mb-4", isUser && "justify-end")}>
      {!isUser && (
        <Avatar className="h-8 w-8 border border-primary/20">
          <AvatarImage src="/images/ai-avatar.png" alt="AI" />
          <AvatarFallback className="bg-primary/10">
            <Bot className="h-4 w-4 text-primary" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={cn(
          "rounded-lg px-3 py-2 max-w-[85%] text-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted border border-border"
        )}
      >
        {content}
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8 border border-primary/20">
          <AvatarImage src="/images/user-avatar.png" alt="User" />
          <AvatarFallback className="bg-primary/10">
            <User className="h-4 w-4 text-primary" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export const AIChat: React.FC = () => {
  const {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    error,
    isExpanded,
    toggleExpanded,
  } = useAIChat();
  
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Focus input when expanded
  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus();
    }
  }, [isExpanded]);
  
  const handleSendMessage = async () => {
    if (inputValue.trim() && !isLoading) {
      const message = inputValue.trim();
      setInputValue("");
      await sendMessage(message);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Collapsed button state
  if (!isExpanded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={toggleExpanded}
                className="h-12 w-12 rounded-full shadow-lg"
              >
                <Bot className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Open VImaTe AI Assistant</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>
    );
  }

  // Expanded chat UI
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 md:w-[450px]"
      >
        <Card className="border shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-0">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/images/ai-avatar.png" alt="AI" />
                <AvatarFallback className="bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">VImaTe AI</CardTitle>
                {isLoading && (
                  <Badge variant="outline" className="text-xs animate-pulse">
                    Thinking...
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={clearMessages}
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={toggleExpanded}
                className="h-8 w-8"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-4 pt-0">
            <ScrollArea className="h-[350px] mt-4 pr-4">
              <div className="flex flex-col">
                {messages.map((message, index) => (
                  <ChatMessage
                    key={index}
                    content={message.content}
                    role={message.role}
                  />
                ))}
                {error && (
                  <div className="text-sm text-destructive text-center my-2 p-2 bg-destructive/10 rounded">
                    {error}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>
          
          <CardFooter className="p-3 pt-0">
            <div className="flex w-full items-center gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask VImaTe AI something..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}; 