import React, { useState } from "react";
import { Layout } from "@/components/layout";
import { useAIChat } from "@/contexts/AIChatContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Bot, User, Trash2, Send, Library, Lightbulb, School, Calendar, Map, HelpCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ChatMessage } from "@/lib/gemini";

// Quick question suggestions
const QUICK_SUGGESTIONS = [
  {
    icon: <Calendar className="h-4 w-4" />,
    text: "What's the academic calendar for this semester?",
  },
  {
    icon: <School className="h-4 w-4" />,
    text: "How do I register for courses?",
  },
  {
    icon: <Map className="h-4 w-4" />,
    text: "Where is the library located on campus?",
  },
  {
    icon: <Lightbulb className="h-4 w-4" />,
    text: "What clubs are available for students?",
  },
  {
    icon: <HelpCircle className="h-4 w-4" />,
    text: "How can I contact student services?",
  },
];

// Message component
const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.role === "user";
  
  return (
    <div className={cn("flex w-full mb-4 items-start gap-3", isUser && "flex-row-reverse")}>
      <Avatar className="mt-0.5">
        {isUser ? (
          <>
            <AvatarImage src="/images/user-avatar.png" alt="User" />
            <AvatarFallback className="bg-primary/20">
              <User className="h-4 w-4 text-primary" />
            </AvatarFallback>
          </>
        ) : (
          <>
            <AvatarImage src="/images/ai-avatar.png" alt="AI" />
            <AvatarFallback className="bg-primary/10">
              <Bot className="h-4 w-4 text-primary" />
            </AvatarFallback>
          </>
        )}
      </Avatar>
      
      <div
        className={cn(
          "rounded-lg px-4 py-2 max-w-[80%]",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted/80 border border-border"
        )}
      >
        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
      </div>
    </div>
  );
};

const AIAssistant = () => {
  const { messages, isLoading, sendMessage, clearMessages, error } = useAIChat();
  const [inputValue, setInputValue] = useState("");
  
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
  
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };
  
  return (
    <Layout>
      <div className="container max-w-7xl mx-auto py-6 px-4 md:px-6">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">VImaTe AI Assistant</h1>
            <p className="text-muted-foreground">
              Your AI assistant for all things related to VIT Chennai. Ask questions about campus,
              academics, events, or get help with your student life.
            </p>
          </div>
          
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                <span>Chat</span>
              </TabsTrigger>
              <TabsTrigger value="learn" className="flex items-center gap-2">
                <Library className="h-4 w-4" />
                <span>Learn</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <Card className="lg:col-span-3 h-[calc(100vh-300px)] flex flex-col">
                  <CardHeader className="p-4 pb-2 pt-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/images/ai-avatar.png" alt="AI" />
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>VImaTe AI</CardTitle>
                          <CardDescription>Powered by Gemini 2.0 Flash</CardDescription>
                        </div>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={clearMessages}
                        className="h-8"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear chat
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-4 overflow-y-auto flex-grow">
                    <div className="flex flex-col">
                      {messages.map((message, index) => (
                        <MessageBubble key={index} message={message} />
                      ))}
                      
                      {isLoading && (
                        <div className="flex justify-center my-2">
                          <Badge variant="outline" className="animate-pulse">
                            AI is typing...
                          </Badge>
                        </div>
                      )}
                      
                      {error && (
                        <div className="text-sm text-destructive text-center my-2 p-2 bg-destructive/10 rounded">
                          {error}
                        </div>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-4 border-t">
                    <div className="flex w-full items-center gap-2">
                      <Textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask the VImaTe AI something..."
                        disabled={isLoading}
                        className="min-h-12 flex-1 resize-none"
                      />
                      <Button
                        size="icon"
                        onClick={handleSendMessage}
                        disabled={isLoading || !inputValue.trim()}
                        className="h-12 w-12"
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
                
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Questions</CardTitle>
                      <CardDescription>
                        Choose a question to get started with the AI assistant
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {QUICK_SUGGESTIONS.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="w-full justify-start text-left h-auto py-3"
                            onClick={() => handleSuggestionClick(suggestion.text)}
                          >
                            <span className="mr-2">{suggestion.icon}</span>
                            <span className="truncate">{suggestion.text}</span>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>About VImaTe AI</CardTitle>
                      <CardDescription>
                        How this AI assistant can help you
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Contextual Awareness</h4>
                        <p className="text-sm text-muted-foreground">
                          The AI understands your preferences and VIT Chennai
                          information to provide relevant answers.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Campus Knowledge</h4>
                        <p className="text-sm text-muted-foreground">
                          Ask about locations, events, academic programs, and
                          resources available at VIT Chennai.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Limitations</h4>
                        <p className="text-sm text-muted-foreground">
                          The AI provides general guidance but may not have
                          real-time information about specific events or changes
                          on campus.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="learn" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learn About VIT Chennai</CardTitle>
                  <CardDescription>
                    Explore resources and information about your campus
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Key Topics</h3>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => handleSuggestionClick("Tell me about the academic programs at VIT Chennai")}
                      >
                        <School className="mr-2 h-4 w-4" />
                        Academic Programs
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => handleSuggestionClick("What facilities are available on campus?")}
                      >
                        <Map className="mr-2 h-4 w-4" />
                        Campus Facilities
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => handleSuggestionClick("How does the semester registration process work?")}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Registration Process
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => handleSuggestionClick("What student clubs and organizations can I join?")}
                      >
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Student Organizations
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">How To Guides</h3>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => handleSuggestionClick("How do I check my academic performance?")}
                      >
                        <Bot className="mr-2 h-4 w-4" />
                        Access Academic Records
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => handleSuggestionClick("How do I find and reserve library books?")}
                      >
                        <Library className="mr-2 h-4 w-4" />
                        Library Services
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => handleSuggestionClick("How can I get involved in research at VIT?")}
                      >
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Research Opportunities
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => handleSuggestionClick("What internship opportunities are available?")}
                      >
                        <School className="mr-2 h-4 w-4" />
                        Internship Programs
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Featured Content</CardTitle>
                  <CardDescription>
                    Helpful information curated for VIT Chennai students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {["New Student Guide", "Campus Resources", "Career Development"].map((title, i) => (
                      <Card key={i} className="overflow-hidden">
                        <div className="h-32 bg-muted flex items-center justify-center">
                          {i === 0 && <School className="h-10 w-10 text-muted-foreground/60" />}
                          {i === 1 && <Library className="h-10 w-10 text-muted-foreground/60" />}
                          {i === 2 && <Lightbulb className="h-10 w-10 text-muted-foreground/60" />}
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-1">{title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            {i === 0 && "Essential information for new students starting at VIT Chennai."}
                            {i === 1 && "Explore the resources available to support your academic journey."}
                            {i === 2 && "Prepare for your career with our professional development services."}
                          </p>
                          <Button 
                            variant="link" 
                            className="p-0 h-auto"
                            onClick={() => handleSuggestionClick(`Tell me about ${title.toLowerCase()} at VIT Chennai`)}
                          >
                            Learn more
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AIAssistant; 