
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import { mockMatches, mockConversations, type Match, type Message } from "@/data/mockMessages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Send, Image, Mic, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const Messages = () => {
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [conversations, setConversations] = useState(mockConversations);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Filter matches based on active tab
  const filteredMatches = activeTab === "all" 
    ? mockMatches 
    : mockMatches.filter(match => match.unread);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedMatch) return;
    
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newMessageObj: Message = {
      id: `${selectedMatch.id}-${Date.now()}`,
      senderId: "user",
      text: newMessage,
      timestamp: `Today, ${timestamp}`,
      read: true
    };
    
    setConversations(prev => {
      const conversation = prev[selectedMatch.id] || { matchId: selectedMatch.id, messages: [] };
      return {
        ...prev,
        [selectedMatch.id]: {
          ...conversation,
          messages: [...conversation.messages, newMessageObj]
        }
      };
    });
    
    setNewMessage("");
    
    // Simulate a reply after a few seconds
    if (Math.random() > 0.3) {
      setTimeout(() => {
        const replyMessages = [
          "That sounds great!",
          "I'd love to hear more about that.",
          "Tell me more about your interests!",
          "What are you studying?",
          "Do you want to meet up sometime?",
          "That's so cool! I'm interested in that too.",
          "Have you been to the new coffee shop on campus?",
          "What's your favorite place to study?"
        ];
        
        const replyMessageObj: Message = {
          id: `${selectedMatch.id}-${Date.now() + 1}`,
          senderId: selectedMatch.id,
          text: replyMessages[Math.floor(Math.random() * replyMessages.length)],
          timestamp: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          read: true
        };
        
        setConversations(prev => {
          const conversation = prev[selectedMatch.id];
          return {
            ...prev,
            [selectedMatch.id]: {
              ...conversation,
              messages: [...conversation.messages, replyMessageObj]
            }
          };
        });
      }, 2000 + Math.random() * 3000);
    }
  };

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations, selectedMatch]);

  // Mark messages as read when conversation is opened
  useEffect(() => {
    if (selectedMatch) {
      setConversations(prev => {
        const conversation = prev[selectedMatch.id];
        if (!conversation) return prev;
        
        return {
          ...prev,
          [selectedMatch.id]: {
            ...conversation,
            messages: conversation.messages.map(msg => ({
              ...msg,
              read: true
            }))
          }
        };
      });
    }
  }, [selectedMatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16 pb-20">
        {!selectedMatch ? (
          <div className="px-4 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mt-4 mb-6">Messages</h1>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger 
                  value="all" 
                  onClick={() => setActiveTab("all")}
                  className={activeTab === "all" ? "bg-vimate-purple text-white" : ""}
                >
                  All Matches
                </TabsTrigger>
                <TabsTrigger 
                  value="unread" 
                  onClick={() => setActiveTab("unread")}
                  className={activeTab === "unread" ? "bg-vimate-purple text-white" : ""}
                >
                  Unread
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                <MatchList 
                  matches={filteredMatches} 
                  onSelectMatch={setSelectedMatch} 
                />
              </TabsContent>
              
              <TabsContent value="unread" className="mt-0">
                <MatchList 
                  matches={filteredMatches} 
                  onSelectMatch={setSelectedMatch} 
                />
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="h-[calc(100vh-4rem)] flex flex-col">
            {/* Conversation Header */}
            <div className="px-4 py-3 border-b flex items-center bg-white">
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2"
                onClick={() => setSelectedMatch(null)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center flex-1">
                <div className="relative">
                  <img 
                    src={selectedMatch.image} 
                    alt={selectedMatch.name} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {selectedMatch.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                
                <div className="ml-3">
                  <h2 className="font-semibold text-base">{selectedMatch.name}</h2>
                  <p className="text-xs text-gray-500">
                    {selectedMatch.online ? "Online" : "Last seen recently"}
                  </p>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon"
                className="text-vimate-purple"
                onClick={() => navigate(`/profile/${selectedMatch.id}`)}
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {conversations[selectedMatch.id]?.messages.map((message, index) => (
                <div 
                  key={message.id}
                  className={cn(
                    "max-w-[80%] mb-3",
                    message.senderId === "user" ? "ml-auto" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "rounded-2xl p-3",
                    message.senderId === "user" 
                      ? "bg-vimate-purple text-white rounded-br-none" 
                      : "bg-white text-gray-800 rounded-bl-none shadow-sm"
                  )}>
                    <p>{message.text}</p>
                  </div>
                  <p className={cn(
                    "text-xs mt-1",
                    message.senderId === "user" ? "text-right" : "text-left",
                    "text-gray-500"
                  )}>
                    {message.timestamp}
                    {message.senderId === "user" && (
                      <span className="ml-1">
                        {message.read ? "✓✓" : "✓"}
                      </span>
                    )}
                  </p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Message Input */}
            <div className="p-3 border-t bg-white">
              <div className="flex items-center">
                <Button variant="ghost" size="icon" className="text-vimate-purple">
                  <Image className="h-5 w-5" />
                </Button>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 mx-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                />
                {newMessage ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-vimate-purple"
                    onClick={handleSendMessage}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                ) : (
                  <Button variant="ghost" size="icon" className="text-vimate-purple">
                    <Mic className="h-5 w-5" />
                  </Button>
                )}
              </div>
              
              <div className="flex mt-2 justify-center gap-2">
                <Button variant="outline" size="sm" className="text-vimate-purple">
                  <Calendar className="h-4 w-4 mr-1" />
                  Plan Date
                </Button>
                <Button variant="outline" size="sm" className="text-vimate-purple">
                  <MapPin className="h-4 w-4 mr-1" />
                  Share Location
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

interface MatchListProps {
  matches: Match[];
  onSelectMatch: (match: Match) => void;
}

const MatchList = ({ matches, onSelectMatch }: MatchListProps) => {
  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No matches yet</p>
        <Button 
          className="mt-4 bg-vimate-purple hover:bg-vimate-purple-dark"
          onClick={() => window.location.href = "/"}
        >
          Start Swiping
        </Button>
      </div>
    );
  }
  
  return (
    <div className="divide-y">
      {matches.map((match) => (
        <div 
          key={match.id}
          className="py-3 flex items-center cursor-pointer hover:bg-gray-50 rounded-lg px-2"
          onClick={() => onSelectMatch(match)}
        >
          <div className="relative">
            <img 
              src={match.image} 
              alt={match.name} 
              className="w-14 h-14 rounded-full object-cover"
            />
            {match.online && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            )}
          </div>
          
          <div className="ml-3 flex-1">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{match.name}</h3>
              <span className="text-xs text-gray-500">{match.lastMessageTime}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <p className={cn(
                "text-sm truncate max-w-[200px]",
                match.unread ? "font-medium text-gray-900" : "text-gray-500"
              )}>
                {match.lastMessage}
              </p>
              
              {match.unread && (
                <Badge className="bg-vimate-purple">New</Badge>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
