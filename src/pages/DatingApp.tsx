import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockProfiles } from "@/data/mockProfiles";
import {
  Heart, X, Star, MessageCircle, Filter, MapPin, School, Zap,
  BookOpen, Coffee, Music, Utensils, User, Pin, Send, Image, Smile,
  ChevronRight, Check, Bell, Sparkles, Camera, Info, Users
} from "lucide-react";

import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

export default function DatingApp() {
  const [currentTab, setCurrentTab] = useState("discover");
  const [profiles, setProfiles] = useState(mockProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<any[]>([]);
  const [matchedProfile, setMatchedProfile] = useState<any | null>(null);
  const [showMatchPopup, setShowMatchPopup] = useState(false);
  const [activeConversation, setActiveConversation] = useState<any | null>(null);
  const [messages, setMessages] = useState<{[key: string]: any[]}>({});
  const [messageInput, setMessageInput] = useState("");
  const [filters, setFilters] = useState({
    studyMode: false,
    department: "all",
    year: "all",
    interests: []
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true); // For demo purposes
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);

  // Motion values for interactive card
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-20, 0, 20]);
  const cardOpacity = useTransform(
    x, 
    [-200, -150, 0, 150, 200], 
    [0.8, 1, 1, 1, 0.8]
  );
  
  // Transform x position to show the correct action badge
  const likeOpacity = useTransform(
    x, 
    [25, 100, 200], 
    [0, 0.8, 1]
  );
  
  const dislikeOpacity = useTransform(
    x, 
    [-200, -100, -25], 
    [1, 0.8, 0]
  );
  
  const superlikeOpacity = useTransform(
    y, 
    [-200, -100, -25], 
    [1, 0.8, 0]
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading matches from API
    const savedMatches = profiles.slice(5, 10).map(profile => ({
      ...profile,
      lastMessage: "Hey, how's it going?",
      timestamp: "Just now",
      unread: Math.random() > 0.5
    }));
    setMatches(savedMatches);
    
    // Initialize message threads for each match
    const initialMessages: {[key: string]: any[]} = {};
    savedMatches.forEach(match => {
      initialMessages[match.id] = [
        {
          id: 1,
          senderId: match.id,
          text: "Hey there! How are you doing today?",
          timestamp: "12:03 PM"
        }
      ];
    });
    setMessages(initialMessages);
  }, []);

  // Auto scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeConversation, messages]);

  // Reset card rotation when we move to a new profile
  useEffect(() => {
    x.set(0);
    y.set(0);
    setCurrentImageIndex(0);
    setShowCardDetails(false);
  }, [currentIndex, x, y]);

  const currentProfile = profiles[currentIndex];

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please login or create an account to interact with profiles.",
      });
      return;
    }
    
    // Set swipe direction for animation
    setSwipeDirection(direction);
    
    if (direction === 'right') {
      // Right swipe (like)
      const isMatch = Math.random() < 0.6; // 60% match chance
      
      if (isMatch) {
        const newMatch = {
          ...currentProfile,
          lastMessage: "You matched just now!",
          timestamp: "Just now",
          unread: true
        };
        
        setMatches(prev => [newMatch, ...prev]);
        setMatchedProfile(currentProfile);
        
        // Delay showing match popup for animation to complete
        setTimeout(() => {
          setShowMatchPopup(true);
        }, 500);
        
        // Initialize message thread
        setMessages(prev => ({
          ...prev,
          [currentProfile.id]: []
        }));
      } else {
        // Show feedback toast
        toast({
          title: "Like Sent!",
          description: `You liked ${currentProfile.name}`,
        });
      }
    } else if (direction === 'up') {
      // Up swipe (super like)
      const isMatch = Math.random() < 0.9; // 90% match chance
      
      if (isMatch) {
        const newMatch = {
          ...currentProfile,
          lastMessage: "You super liked each other!",
          timestamp: "Just now",
          unread: true
        };
        
        setMatches(prev => [newMatch, ...prev]);
        setMatchedProfile(currentProfile);
        
        // Delay showing match popup for animation to complete
        setTimeout(() => {
          setShowMatchPopup(true);
        }, 500);
        
        // Initialize message thread
        setMessages(prev => ({
          ...prev,
          [currentProfile.id]: []
        }));
      }
      
      toast({
        title: "Super Like Sent!",
        description: `${currentProfile.name} will see that you Super Liked them!`,
      });
    } else {
      // Left swipe (dislike)
      toast({
        title: "Passed",
        description: `You skipped ${currentProfile.name}`,
        variant: "destructive",
      });
    }
    
    // Move to next profile regardless of action after a slight delay
    setTimeout(() => {
      nextProfile();
      setSwipeDirection(null); // Reset swipe direction
    }, 300);
  };

  const nextProfile = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
      // Shuffle profiles for a new "set" of cards
      setProfiles([...profiles].sort(() => Math.random() - 0.5));
      
      toast({
        title: "That's everyone for now!",
        description: "Check back soon to see new people.",
      });
    }
  };

  const toggleFilter = (filter: string) => {
    setFilters(prev => ({
      ...prev,
      studyMode: filter === 'studyMode' ? !prev.studyMode : prev.studyMode
    }));
    
    toast({
      title: filters.studyMode ? "Dating Mode Activated" : "Study Buddy Mode Activated",
      description: filters.studyMode ? 
        "Now showing people looking to date" : 
        "Now showing people looking for study partners",
    });
  };

  const handleSelectConversation = (match: any) => {
    setActiveConversation(match);
    
    // Mark messages as read
    const updatedMatches = matches.map(m => 
      m.id === match.id ? { ...m, unread: false } : m
    );
    setMatches(updatedMatches);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageInput.trim() || !activeConversation) return;
    
    // Add user message
    const newMessage = {
      id: Date.now(),
      senderId: 'user',
      text: messageInput,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setMessages(prev => ({
      ...prev,
      [activeConversation.id]: [...(prev[activeConversation.id] || []), newMessage]
    }));
    
    setMessageInput("");
    
    // Simulate response after a delay
    setTimeout(() => {
      const responseMessage = {
        id: Date.now() + 1,
        senderId: activeConversation.id,
        text: getRandomResponse(messageInput),
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      
      setMessages(prev => ({
        ...prev,
        [activeConversation.id]: [...(prev[activeConversation.id] || []), responseMessage]
      }));
      
      // Update last message in matches list
      const updatedMatches = matches.map(m => 
        m.id === activeConversation.id 
          ? { ...m, lastMessage: responseMessage.text, timestamp: "Just now" } 
          : m
      );
      setMatches(updatedMatches);
    }, 1000 + Math.random() * 2000);
  };

  // Helper function to generate contextual responses
  const getRandomResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("hi") || lowerMessage.includes("hello") || lowerMessage.includes("hey")) {
      return "Hey there! How's your day going at VIT?";
    } else if (lowerMessage.includes("class") || lowerMessage.includes("course")) {
      return "I'm taking Advanced Computer Science this semester. What about you?";
    } else if (lowerMessage.includes("coffee") || lowerMessage.includes("meet")) {
      return "I'd love to grab coffee! How about at the campus café tomorrow?";
    } else if (lowerMessage.includes("study") || lowerMessage.includes("assignment")) {
      return "I'm actually heading to the library later. Want to join and study together?";
    } else if (lowerMessage.includes("movie") || lowerMessage.includes("watch")) {
      return "I've been wanting to see the new Marvel movie! Are you free this weekend?";
    } else {
      const responses = [
        "That sounds interesting! Tell me more.",
        "I was just thinking about that too!",
        "That's awesome! What else are you into?",
        "I'd definitely be up for that sometime!",
        "Sounds fun! I'm free this weekend if you want to hang out."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };

  const cycleProfileImage = (direction: 'next' | 'prev') => {
    if (!currentProfile?.images?.length) return;
    
    if (direction === 'next') {
      setCurrentImageIndex((prev) => 
        prev < currentProfile.images.length - 1 ? prev + 1 : 0
      );
    } else {
      setCurrentImageIndex((prev) => 
        prev > 0 ? prev - 1 : currentProfile.images.length - 1
      );
    }
  };

  const getSwipeAnimationVariants = () => {
    if (!swipeDirection) return {};
    
    switch(swipeDirection) {
      case 'left':
        return {
          exit: { x: -500, opacity: 0, transition: { duration: 0.3 } }
        };
      case 'right':
        return {
          exit: { x: 500, opacity: 0, transition: { duration: 0.3 } }
        };
      case 'up':
        return {
          exit: { y: -500, opacity: 0, transition: { duration: 0.3 } }
        };
      default:
        return {};
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <Tabs 
              value={currentTab} 
              onValueChange={setCurrentTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="discover" className="relative">
                  Discover
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: currentTab === "discover" ? 1 : 0 }}
                    className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center"
                  >
                    <Zap className="h-3 w-3 text-yellow-400" />
                  </motion.span>
                </TabsTrigger>
                <TabsTrigger value="matches" className="relative">
                  Matches
                  {matches.some(m => m.unread) && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white flex items-center justify-center rounded-full w-4 h-4 text-[10px]"
                    >
                      {matches.filter(m => m.unread).length}
                    </motion.span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>
            </Tabs>

            {currentTab === "matches" && (
              <div className="mt-6 space-y-1">
                <div className="mb-4 px-1">
                  <Input 
                    placeholder="Search conversations..." 
                    className="bg-muted/50"
                  />
                </div>
                
                <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
                  {matches.length > 0 ? (
                    matches.map((match) => (
                      <motion.div 
                        key={match.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          activeConversation?.id === match.id
                            ? "bg-vimate-purple/10 border-l-4 border-vimate-purple"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => handleSelectConversation(match)}
                      >
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={match.images[0]} alt={match.name} />
                            <AvatarFallback>{match.name[0]}</AvatarFallback>
                          </Avatar>
                          {match.online && (
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium truncate">{match.name}</h4>
                            <span className="text-xs text-muted-foreground">{match.timestamp}</span>
                          </div>
                          <p className="text-xs truncate text-muted-foreground">
                            {match.lastMessage}
                          </p>
                        </div>
                        {match.unread && (
                          <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 bg-vimate-purple rounded-full flex-shrink-0" 
                          />
                        )}
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-muted-foreground">
                      <Users className="h-8 w-8 mx-auto mb-2 opacity-30" />
                      <p>No matches yet</p>
                      <p className="text-xs mt-1">Start swiping to find matches!</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {currentTab === "discover" && (
              <>
                {/* Filters */}
                <div className="bg-card rounded-lg p-4 mb-6 border">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button 
                      size="sm" 
                      variant={filters.studyMode ? "default" : "outline"}
                      className={filters.studyMode ? "bg-vimate-purple" : "border-vimate-purple text-vimate-purple"}
                      onClick={() => toggleFilter('studyMode')}
                    >
                      <BookOpen className="mr-1 h-4 w-4" />
                      Study Mode
                    </Button>
                    <Button size="sm" variant="outline">
                      <School className="mr-1 h-4 w-4" />
                      All Departments
                    </Button>
                    <Button size="sm" variant="outline">
                      <MapPin className="mr-1 h-4 w-4" />
                      VIT Chennai
                    </Button>
                    <Button size="sm" variant="outline">
                      <Filter className="mr-1 h-4 w-4" />
                      More Filters
                    </Button>
                  </div>
                </div>
                
                {/* Profile Card */}
                <div className="relative max-w-md mx-auto h-[500px]">
                  {/* Stack of cards effect - show blurred/offset cards behind current card */}
                  <div className="absolute inset-0 scale-[0.97] -translate-y-2 rounded-xl bg-gray-200/30 blur-sm"></div>
                  <div className="absolute inset-0 scale-[0.98] -translate-y-1 rounded-xl bg-gray-200/20 blur-[1px]"></div>
                
                  <AnimatePresence mode="popLayout">
                    {currentProfile && (
                      <motion.div
                        key={currentProfile.id}
                        className="relative bg-white rounded-xl overflow-hidden shadow-lg h-full"
                        style={{ 
                          x, 
                          y, 
                          rotate,
                          opacity: cardOpacity,
                        }}
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        dragElastic={0.7}
                        onDragEnd={(e, { offset, velocity }) => {
                          const swipe = swipePower(offset.x, velocity.x);
                          const upSwipe = swipePower(offset.y, velocity.y);
                          
                          if (swipe < -swipeConfidenceThreshold) {
                            handleSwipe('left');
                          } else if (swipe > swipeConfidenceThreshold) {
                            handleSwipe('right');
                          } else if (upSwipe < -swipeConfidenceThreshold) {
                            handleSwipe('up');
                          }
                        }}
                        variants={getSwipeAnimationVariants()}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Action Badges */}
                        <motion.div 
                          className="absolute top-6 left-6 bg-red-500 text-white py-1 px-4 rounded-full font-bold transform -rotate-12 z-30"
                          style={{ opacity: dislikeOpacity }}
                        >
                          NOPE
                        </motion.div>
                        
                        <motion.div 
                          className="absolute top-6 right-6 bg-green-500 text-white py-1 px-4 rounded-full font-bold transform rotate-12 z-30"
                          style={{ opacity: likeOpacity }}
                        >
                          LIKE
                        </motion.div>
                        
                        <motion.div 
                          className="absolute top-6 left-1/2 -translate-x-1/2 bg-blue-500 text-white py-1 px-4 rounded-full font-bold z-30"
                          style={{ opacity: superlikeOpacity }}
                        >
                          SUPER LIKE
                        </motion.div>
                
                        {/* Profile Image */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-10" />
                        
                        <div className="relative h-full">
                          <img 
                            src={currentProfile.images[currentImageIndex]} 
                            alt={currentProfile.name}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          
                          {/* Photo navigation */}
                          <div className="absolute top-2 w-full z-20 px-2">
                            <div className="flex gap-1">
                              {currentProfile.images.map((_, idx) => (
                                <div 
                                  key={idx} 
                                  className={`h-1 flex-1 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/40'}`}
                                />
                              ))}
                            </div>
                          </div>
                          
                          {/* Left/Right buttons for image cycling */}
                          <button 
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white"
                            onClick={(e) => {
                              e.stopPropagation(); 
                              cycleProfileImage('prev');
                            }}
                          >
                            ‹
                          </button>
                          <button 
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white"
                            onClick={(e) => {
                              e.stopPropagation(); 
                              cycleProfileImage('next');
                            }}
                          >
                            ›
                          </button>
                          
                          {/* Tap to show details */}
                          <div 
                            className="absolute bottom-0 left-0 right-0 z-20 text-white p-4"
                            onClick={() => setShowCardDetails(!showCardDetails)}
                          >
                            <div className="flex justify-between items-end">
                              <div>
                                <h2 className="text-2xl font-bold">{currentProfile.name}, {currentProfile.age}</h2>
                                <p className="flex items-center text-white/90">
                                  <School className="h-4 w-4 mr-1" />
                                  {currentProfile.major}
                                </p>
                                <p className="flex items-center text-white/90">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {currentProfile.distance} km away
                                </p>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-white bg-white/20 backdrop-blur-sm hover:bg-white/30"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowCardDetails(!showCardDetails);
                                }}
                              >
                                <Info className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-3">
                              {currentProfile.interests.slice(0, 3).map((interest, i) => (
                                <Badge key={i} variant="outline" className="bg-white/20 text-white border-none">
                                  {interest}
                                </Badge>
                              ))}
                              {currentProfile.interests.length > 3 && (
                                <Badge variant="outline" className="bg-white/20 text-white border-none">
                                  +{currentProfile.interests.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          {/* Extended profile info - shows when card is tapped */}
                          <AnimatePresence>
                            {showCardDetails && (
                              <motion.div 
                                className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-20 flex flex-col justify-end p-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <h2 className="text-2xl font-bold text-white">{currentProfile.name}, {currentProfile.age}</h2>
                                <p className="flex items-center text-white/90 mt-1">
                                  <School className="h-4 w-4 mr-1" />
                                  {currentProfile.major}
                                </p>
                                <p className="flex items-center text-white/90 mb-3">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {currentProfile.distance} km away
                                </p>
                                
                                <div className="mb-4">
                                  <h3 className="text-white font-medium mb-2">About me</h3>
                                  <p className="text-white/90 text-sm">
                                    {currentProfile.bio || "Hey there! I'm a student at VIT Chennai looking to connect with like-minded people. Let's chat and see if we click!"}
                                  </p>
                                </div>
                                
                                <div className="mb-4">
                                  <h3 className="text-white font-medium mb-2">Interests</h3>
                                  <div className="flex flex-wrap gap-2">
                                    {currentProfile.interests.map((interest, i) => (
                                      <Badge key={i} variant="outline" className="bg-white/20 text-white border-none">
                                        {interest}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <Button
                                  variant="ghost"
                                  className="w-full text-white border border-white/30 mt-2 hover:bg-white/20"
                                  onClick={() => setShowCardDetails(false)}
                                >
                                  Close
                                </Button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-center mt-8 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-full h-14 w-14 flex items-center justify-center border-2 border-red-500 text-red-500 hover:bg-red-50 transition-colors"
                    onClick={() => handleSwipe('left')}
                  >
                    <X className="h-6 w-6" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-full h-14 w-14 flex items-center justify-center border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
                    onClick={() => handleSwipe('up')}
                  >
                    <Star className="h-6 w-6" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-full h-14 w-14 flex items-center justify-center border-2 border-green-500 text-green-500 hover:bg-green-50 transition-colors"
                    onClick={() => handleSwipe('right')}
                  >
                    <Heart className="h-6 w-6" />
                  </motion.button>
                </div>
              </>
            )}
            
            {currentTab === "matches" && (
              <div className="bg-card rounded-lg border h-[600px] overflow-hidden flex flex-col">
                {activeConversation ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-card z-10">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={activeConversation.images[0]} alt={activeConversation.name} />
                          <AvatarFallback>{activeConversation.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{activeConversation.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {activeConversation.online ? 
                              <span className="flex items-center">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></span> Online
                              </span> : 'Last seen recently'}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <a href="#" onClick={(e) => e.preventDefault()}>View Profile</a>
                      </Button>
                    </div>
                    
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
                      {messages[activeConversation.id]?.map((message, index) => (
                        <motion.div 
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          className={`flex ${message.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[70%] px-4 py-2 rounded-lg ${
                              message.senderId === 'user' 
                                ? 'bg-vimate-purple text-white rounded-br-none' 
                                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                            }`}
                          >
                            <p>{message.text}</p>
                            <span className={`text-xs ${message.senderId === 'user' ? 'text-white/70' : 'text-gray-500'} block text-right mt-1`}>
                              {message.timestamp}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                    
                    {/* Message Input */}
                    <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2 bg-white sticky bottom-0">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-full"
                      >
                        <Image className="h-5 w-5 text-muted-foreground" />
                      </Button>
                      <Input 
                        placeholder="Type a message..." 
                        className="flex-1"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className={`rounded-full h-10 w-10 flex items-center justify-center ${
                          messageInput.trim() 
                            ? 'bg-vimate-purple text-white' 
                            : 'bg-gray-200 text-gray-400'
                        }`}
                        disabled={!messageInput.trim()}
                      >
                        <Send className="h-5 w-5" />
                      </motion.button>
                    </form>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <MessageCircle className="h-16 w-16 text-muted-foreground/30 mb-4" />
                      <h3 className="text-lg font-medium">Your Messages</h3>
                      <p className="text-muted-foreground max-w-sm mt-1">
                        Select a conversation from the sidebar or match with someone new to start chatting
                      </p>
                      <Button className="mt-6 bg-vimate-purple" onClick={() => setCurrentTab("discover")}>
                        Find Matches
                      </Button>
                    </motion.div>
                  </div>
                )}
              </div>
            )}
            
            {currentTab === "profile" && (
              <div className="space-y-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                        <div className="relative group">
                          <Avatar className="h-24 w-24 ring-4 ring-vimate-purple/20">
                            <AvatarImage src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Your profile" />
                            <AvatarFallback>You</AvatarFallback>
                          </Avatar>
                          <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <Camera className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                          <h2 className="text-2xl font-bold">Raj Singh</h2>
                          <p className="text-muted-foreground">B.Tech Computer Science, 2nd Year</p>
                          <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-3">
                            <Badge>Photography</Badge>
                            <Badge>Gaming</Badge>
                            <Badge>Music</Badge>
                            <Badge>AI</Badge>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                            <Button className="bg-vimate-purple hover:bg-vimate-purple/90">
                              Edit Profile
                            </Button>
                            <Button variant="outline">Settings</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-5">
                        <h3 className="font-medium flex items-center gap-2">
                          <Coffee className="h-4 w-4 text-vimate-purple" />
                          Preferences
                        </h3>
                        <div className="mt-4 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Show me in Study Mode</span>
                            <Button size="sm" variant="ghost" className="rounded-full h-6 w-6 p-0">
                              <motion.div 
                                initial={false}
                                animate={{ backgroundColor: true ? "#7c3aed" : "transparent" }}
                                className="h-5 w-5 rounded-full flex items-center justify-center"
                              >
                                <Check className="h-3 w-3 text-white" />
                              </motion.div>
                            </Button>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Show me in Dating Mode</span>
                            <Button size="sm" variant="ghost" className="rounded-full h-6 w-6 p-0">
                              <motion.div 
                                initial={false}
                                animate={{ backgroundColor: true ? "#7c3aed" : "transparent" }}
                                className="h-5 w-5 rounded-full flex items-center justify-center"
                              >
                                <Check className="h-3 w-3 text-white" />
                              </motion.div>
                            </Button>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Display department in profile</span>
                            <Button size="sm" variant="ghost" className="rounded-full h-6 w-6 p-0">
                              <motion.div 
                                initial={false}
                                animate={{ backgroundColor: true ? "#7c3aed" : "transparent" }}
                                className="h-5 w-5 rounded-full flex items-center justify-center"
                              >
                                <Check className="h-3 w-3 text-white" />
                              </motion.div>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Card>
                      <CardContent className="p-5">
                        <h3 className="font-medium flex items-center gap-2">
                          <Bell className="h-4 w-4 text-vimate-purple" />
                          Notifications
                        </h3>
                        <div className="mt-4 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">New Matches</span>
                            <Button size="sm" variant="ghost" className="rounded-full h-6 w-6 p-0">
                              <motion.div 
                                initial={false}
                                animate={{ backgroundColor: true ? "#7c3aed" : "transparent" }}
                                className="h-5 w-5 rounded-full flex items-center justify-center"
                              >
                                <Check className="h-3 w-3 text-white" />
                              </motion.div>
                            </Button>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Messages</span>
                            <Button size="sm" variant="ghost" className="rounded-full h-6 w-6 p-0">
                              <motion.div 
                                initial={false}
                                animate={{ backgroundColor: true ? "#7c3aed" : "transparent" }}
                                className="h-5 w-5 rounded-full flex items-center justify-center"
                              >
                                <Check className="h-3 w-3 text-white" />
                              </motion.div>
                            </Button>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Super Likes</span>
                            <Button size="sm" variant="ghost" className="rounded-full h-6 w-6 p-0">
                              <motion.div 
                                initial={false}
                                animate={{ backgroundColor: true ? "#7c3aed" : "transparent" }}
                                className="h-5 w-5 rounded-full flex items-center justify-center"
                              >
                                <Check className="h-3 w-3 text-white" />
                              </motion.div>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-medium flex items-center gap-2 mb-4">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        Activity Stats
                      </h3>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-vimate-purple">24</div>
                          <div className="text-xs text-muted-foreground">Matches</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-vimate-purple">142</div>
                          <div className="text-xs text-muted-foreground">Profiles Viewed</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-vimate-purple">8</div>
                          <div className="text-xs text-muted-foreground">Super Likes</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Match Popup */}
      <AnimatePresence>
        {showMatchPopup && matchedProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowMatchPopup(false)}
            />
            <motion.div 
              className="relative z-10 bg-gradient-to-br from-vimate-purple to-pink-700 rounded-xl p-8 max-w-md w-full text-white text-center shadow-2xl"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Sparkles className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
              </motion.div>
              
              <motion.h2 
                className="text-2xl font-bold mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                It's a Match!
              </motion.h2>
              
              <motion.p 
                className="mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                You and {matchedProfile.name} liked each other
              </motion.p>
              
              <motion.div 
                className="flex justify-center items-center gap-4 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div 
                  className="relative"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7, type: "spring" }}
                >
                  <Avatar className="h-20 w-20 border-4 border-white">
                    <AvatarImage src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Your profile" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  <Heart className="h-8 w-8 text-pink-300 mx-2" />
                </motion.div>
                <motion.div 
                  className="relative"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7, type: "spring" }}
                >
                  <Avatar className="h-20 w-20 border-4 border-white">
                    <AvatarImage src={matchedProfile.images[0]} alt={matchedProfile.name} />
                    <AvatarFallback>{matchedProfile.name[0]}</AvatarFallback>
                  </Avatar>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <Button 
                  className="w-full bg-white text-vimate-purple hover:bg-white/90"
                  onClick={() => {
                    setShowMatchPopup(false);
                    setCurrentTab("matches");
                    setActiveConversation(matches.find(m => m.id === matchedProfile.id));
                  }}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send a Message
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white/10"
                  onClick={() => setShowMatchPopup(false)}
                >
                  Keep Swiping
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

// Swipe power calculation for drag gesture
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
}; 