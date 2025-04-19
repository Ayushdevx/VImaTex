import { useState } from "react";
import { MessageCircle, Send, Image, Smile, Paperclip, User, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useAnalytics } from "@/contexts/AnalyticsContext";

interface Message {
  id: string;
  text: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: string;
  isCurrentUser: boolean;
}

interface ChatGroup {
  id: string;
  name: string;
  type: "class" | "project" | "club" | "study";
  unreadCount?: number;
  lastMessage?: string;
}

export const GroupChatWidget = () => {
  const { trackEvent } = useAnalytics();
  const [newMessage, setNewMessage] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState<string>("1"); // Default to first group
  
  // Mock data for chat groups
  const [groups, setGroups] = useState<ChatGroup[]>([
    {
      id: "1",
      name: "CS-301 Class Group",
      type: "class",
      unreadCount: 5,
      lastMessage: "When is the next assignment due?"
    },
    {
      id: "2",
      name: "ML Project Team",
      type: "project",
      lastMessage: "I've pushed the code to the repo"
    },
    {
      id: "3",
      name: "Study Group - Finals",
      type: "study",
      unreadCount: 2,
      lastMessage: "Let's meet at the library at 7pm"
    },
    {
      id: "4",
      name: "Photography Club",
      type: "club",
      lastMessage: "Don't forget to submit your entries!"
    }
  ]);
  
  // Mock data for messages
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    "1": [
      {
        id: "101",
        text: "Has anyone started on the new assignment yet?",
        sender: {
          id: "u1",
          name: "Sarah Johnson",
          avatar: "/assets/avatars/avatar-1.png"
        },
        timestamp: "2025-04-18T14:35:00Z",
        isCurrentUser: false
      },
      {
        id: "102",
        text: "I've looked at it briefly. Seems challenging but doable.",
        sender: {
          id: "u2",
          name: "Michael Chen",
          avatar: "/assets/avatars/avatar-2.png"
        },
        timestamp: "2025-04-18T14:37:00Z",
        isCurrentUser: false
      },
      {
        id: "103",
        text: "I'm planning to start it tomorrow. Would anyone like to discuss it over a call?",
        sender: {
          id: "current",
          name: "You",
          avatar: "/assets/avatars/avatar-you.png"
        },
        timestamp: "2025-04-18T14:40:00Z",
        isCurrentUser: true
      },
      {
        id: "104",
        text: "When is the next assignment due again?",
        sender: {
          id: "u3",
          name: "Emily Rodriguez",
          avatar: "/assets/avatars/avatar-3.png"
        },
        timestamp: "2025-04-18T14:42:00Z",
        isCurrentUser: false
      }
    ],
    "2": [
      {
        id: "201",
        text: "I've pushed the latest model training code to the repo",
        sender: {
          id: "u4",
          name: "Alex Wong",
          avatar: "/assets/avatars/avatar-4.png"
        },
        timestamp: "2025-04-18T13:15:00Z",
        isCurrentUser: false
      },
      {
        id: "202",
        text: "Great job! The results look promising.",
        sender: {
          id: "current",
          name: "You",
          avatar: "/assets/avatars/avatar-you.png"
        },
        timestamp: "2025-04-18T13:18:00Z",
        isCurrentUser: true
      }
    ],
    "3": [
      {
        id: "301",
        text: "I've booked a study room at the library for tomorrow at 7pm",
        sender: {
          id: "u5",
          name: "Taylor Smith",
          avatar: "/assets/avatars/avatar-5.png"
        },
        timestamp: "2025-04-18T10:23:00Z",
        isCurrentUser: false
      },
      {
        id: "302",
        text: "Let's meet at the library at 7pm",
        sender: {
          id: "u6",
          name: "Jordan Lee",
          avatar: "/assets/avatars/avatar-6.png"
        },
        timestamp: "2025-04-18T10:25:00Z",
        isCurrentUser: false
      },
      {
        id: "303",
        text: "I'll be there. Should we focus on chapters 7-9?",
        sender: {
          id: "current",
          name: "You",
          avatar: "/assets/avatars/avatar-you.png"
        },
        timestamp: "2025-04-18T10:30:00Z",
        isCurrentUser: true
      }
    ],
    "4": [
      {
        id: "401",
        text: "The photo exhibition is next Friday. Don't forget to submit your entries!",
        sender: {
          id: "u7",
          name: "Jamie Evans",
          avatar: "/assets/avatars/avatar-7.png"
        },
        timestamp: "2025-04-17T15:45:00Z",
        isCurrentUser: false
      },
      {
        id: "402",
        text: "What's the theme again?",
        sender: {
          id: "u8",
          name: "Riley Kim",
          avatar: "/assets/avatars/avatar-8.png"
        },
        timestamp: "2025-04-17T15:48:00Z",
        isCurrentUser: false
      },
      {
        id: "403",
        text: "Urban Nature - contrasting city life with natural elements",
        sender: {
          id: "u7",
          name: "Jamie Evans",
          avatar: "/assets/avatars/avatar-7.png"
        },
        timestamp: "2025-04-17T15:50:00Z",
        isCurrentUser: false
      }
    ]
  });

  // Format timestamp to readable time
  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Send a new message
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const currentGroupMessages = messages[selectedGroupId] || [];
    const newMessageObj: Message = {
      id: `msg-${Date.now()}`,
      text: newMessage.trim(),
      sender: {
        id: "current",
        name: "You",
        avatar: "/assets/avatars/avatar-you.png"
      },
      timestamp: new Date().toISOString(),
      isCurrentUser: true
    };
    
    // Update messages for the selected group
    setMessages(prev => ({
      ...prev,
      [selectedGroupId]: [...currentGroupMessages, newMessageObj]
    }));
    
    // Update last message in groups list
    setGroups(prev => 
      prev.map(group => 
        group.id === selectedGroupId 
          ? { ...group, lastMessage: newMessage.trim(), unreadCount: 0 } 
          : group
      )
    );
    
    // Track message sent event
    trackEvent("feature_use", { 
      featureName: "chat_message_sent",
      groupId: selectedGroupId
    });
    
    // Clear input
    setNewMessage("");
  };

  // Handle group selection
  const handleGroupSelect = (groupId: string) => {
    setSelectedGroupId(groupId);
    
    // Mark messages as read when group is selected
    setGroups(prev => 
      prev.map(group => 
        group.id === groupId 
          ? { ...group, unreadCount: 0 } 
          : group
      )
    );
    
    trackEvent("feature_use", { 
      featureName: "chat_group_selected",
      groupId: groupId
    });
  };

  // Get the current group
  const currentGroup = groups.find(g => g.id === selectedGroupId);
  
  // Get messages for the current group
  const currentMessages = messages[selectedGroupId] || [];

  return (
    <Card className="shadow-sm h-[400px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <MessageCircle className="mr-2 h-5 w-5 text-primary" />
          Group Chats
        </CardTitle>
        <CardDescription>Connect with your classmates</CardDescription>
      </CardHeader>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Groups sidebar */}
        <div className="w-1/3 border-r">
          <ScrollArea className="h-[302px]">
            <div className="p-2 space-y-1">
              {groups.map((group) => (
                <button
                  key={group.id}
                  className={cn(
                    "w-full text-left px-2 py-2 rounded-md transition-colors",
                    selectedGroupId === group.id 
                      ? "bg-primary/10 text-primary" 
                      : "hover:bg-muted"
                  )}
                  onClick={() => handleGroupSelect(group.id)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{group.name}</span>
                    {group.unreadCount ? (
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                        {group.unreadCount}
                      </span>
                    ) : null}
                  </div>
                  
                  {group.lastMessage && (
                    <p className="text-xs text-muted-foreground truncate mt-1">
                      {group.lastMessage}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {currentGroup && (
            <>
              {/* Chat header */}
              <div className="px-4 py-2 border-b">
                <h4 className="font-medium text-sm">{currentGroup.name}</h4>
              </div>
              
              {/* Messages */}
              <ScrollArea className="flex-1">
                <div className="p-3 space-y-3">
                  {currentMessages.map((message) => (
                    <div 
                      key={message.id}
                      className={cn(
                        "flex gap-2",
                        message.isCurrentUser ? "justify-end" : "justify-start"
                      )}
                    >
                      {!message.isCurrentUser && (
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                          <AvatarFallback>
                            {message.sender.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div className="space-y-1 max-w-[80%]">
                        {!message.isCurrentUser && (
                          <p className="text-xs text-muted-foreground">
                            {message.sender.name}
                          </p>
                        )}
                        
                        <div className={cn(
                          "rounded-lg px-3 py-2 text-sm",
                          message.isCurrentUser 
                            ? "bg-primary text-primary-foreground ml-auto" 
                            : "bg-muted"
                        )}>
                          {message.text}
                        </div>
                        
                        <p className={cn(
                          "text-[10px] text-muted-foreground flex items-center",
                          message.isCurrentUser ? "justify-end" : "justify-start"
                        )}>
                          <Clock className="h-2 w-2 mr-1" />
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                      
                      {message.isCurrentUser && (
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={message.sender.avatar} alt="You" />
                          <AvatarFallback>Y</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Message input */}
              <div className="p-2 flex gap-2 border-t">
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <Button 
                  variant="primary" 
                  size="icon" 
                  className="shrink-0"
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};