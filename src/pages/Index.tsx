import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import Header from "@/components/layout/Header";
import ProfileCard from "@/components/cards/ProfileCard";
import FeaturesMenu from "@/components/layout/FeaturesMenu";
import { mockProfiles } from "@/data/mockProfiles";
import { Button } from "@/components/ui/button";
import { Filter, MapPin, School, Heart, Sparkles, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react";

const Index = () => {
  const [profiles, setProfiles] = useState(mockProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<string[]>([]);
  const [showMatched, setShowMatched] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<typeof mockProfiles[0] | null>(null);
  const [swipedRight, setSwipedRight] = useState<Set<string>>(new Set());
  const [studyMode, setStudyMode] = useState(false);
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      // Show welcome animation/toast for first time visitors
      setTimeout(() => {
        toast({
          title: "Welcome to VImaTe!",
          description: "The dating and social app made for college students.",
        });
      }, 1000);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const currentProfile = profiles[currentIndex];

  const handleLike = () => {
    if (!isSignedIn) {
      toast({
        title: "Login Required",
        description: "Please login or create an account to like profiles.",
      });
      return;
    }
    
    const profileId = currentProfile.id;
    setSwipedRight(prev => new Set(prev).add(profileId));
    
    // Simulate 60% chance of matching
    const isMatch = Math.random() < 0.6;
    
    if (isMatch) {
      setMatches(prev => [...prev, profileId]);
      setMatchedProfile(currentProfile);
      setShowMatched(true);
    } else {
      nextProfile();
    }
  };

  const handleDislike = () => {
    if (!isSignedIn) {
      toast({
        title: "Login Required",
        description: "Please login or create an account to interact with profiles.",
      });
      return;
    }
    
    nextProfile();
  };

  const handleSuperLike = () => {
    if (!isSignedIn) {
      toast({
        title: "Login Required",
        description: "Please login or create an account to Super Like profiles.",
      });
      return;
    }
    
    const profileId = currentProfile.id;
    setSwipedRight(prev => new Set(prev).add(profileId));
    
    // Super likes have 90% chance of matching
    const isMatch = Math.random() < 0.9;
    
    if (isMatch) {
      setMatches(prev => [...prev, profileId]);
      setMatchedProfile(currentProfile);
      setShowMatched(true);
      
      toast({
        title: "Super Like Sent!",
        description: `${currentProfile.name} will see that you Super Liked them!`,
      });
    } else {
      nextProfile();
      
      toast({
        title: "Super Like Sent!",
        description: `${currentProfile.name} will see that you Super Liked them!`,
      });
    }
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

  const toggleStudyMode = () => {
    if (!isSignedIn) {
      toast({
        title: "Login Required",
        description: "Please login or create an account to change modes.",
      });
      return;
    }
    
    setStudyMode(prev => !prev);
    
    toast({
      title: studyMode ? "Dating Mode Activated" : "Study Buddy Mode Activated",
      description: studyMode ? 
        "Now showing people looking to date" : 
        "Now showing people looking for study partners",
    });
  };

  const closeMatch = () => {
    setShowMatched(false);
    nextProfile();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 pb-8 px-4">
        {/* Login/Register CTA for non-logged in users - use Clerk's SignedOut component */}
        <SignedOut>
          <div className="max-w-4xl mx-auto mb-4 bg-card p-4 rounded-lg shadow-sm border border-vimate-purple/20 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="bg-vimate-purple/10 p-2 rounded-full">
                <User className="h-5 w-5 text-vimate-purple" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Join VImaTe</h3>
                <p className="text-sm text-gray-600">Create an account to access all campus features</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-vimate-purple text-vimate-purple hover:bg-vimate-purple/10"
                  asChild
                >
                  <Link to="/auth">Login</Link>
                </Button>
                <Button 
                  size="sm"
                  className="bg-vimate-purple hover:bg-vimate-purple-dark"
                  asChild
                >
                  <Link to="/auth?tab=signup">Join</Link>
                </Button>
              </div>
            </div>
          </div>
        </SignedOut>
        
        {/* App Tabs */}
        <div className="max-w-4xl mx-auto mb-8">
          <Tabs defaultValue="dating" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="dating">Dating</TabsTrigger>
              <TabsTrigger value="campus">Campus Features</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dating" className="mt-6">
              {/* Filters */}
              <div className="flex items-center justify-between max-w-sm mx-auto py-3">
                <Button 
                  variant={studyMode ? "default" : "outline"} 
                  size="sm" 
                  className={`${studyMode ? "bg-vimate-purple hover:bg-vimate-purple-dark" : "text-vimate-purple border-vimate-purple hover:bg-vimate-purple/10"}`}
                  onClick={toggleStudyMode}
                >
                  {studyMode ? "Study Mode" : "Dating Mode"}
                </Button>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MapPin className="h-5 w-5 text-vimate-purple" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <School className="h-5 w-5 text-vimate-purple" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Filter className="h-5 w-5 text-vimate-purple" />
                  </Button>
                </div>
              </div>
              
              {studyMode ? (
                <div className="text-center mb-2">
                  <Badge variant="outline" className="bg-vimate-purple/10 text-vimate-purple">
                    Finding Study Partners
                  </Badge>
                </div>
              ) : null}
              
              {/* Card Stack */}
              <div className="relative h-[32rem] max-w-sm mx-auto">
                {currentProfile && (
                  <ProfileCard
                    key={currentProfile.id}
                    profile={currentProfile}
                    onLike={handleLike}
                    onDislike={handleDislike}
                    onSuperLike={handleSuperLike}
                  />
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="campus" className="mt-6">
              {/* Add prominent link to the Collage Dashboard */}
              <div className="mb-6 bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-primary">New! Campus Hub Dashboard</h3>
                    <p className="text-sm text-gray-600">Access all campus features in one place - timetable, mess menu, assignments and more!</p>
                  </div>
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    asChild
                  >
                    <Link to="/collage">Open Dashboard</Link>
                  </Button>
                </div>
              </div>
              
              <FeaturesMenu />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Match Popup */}
      {showMatched && matchedProfile && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-card rounded-xl overflow-hidden max-w-sm w-full animate-bounce-in">
            <div className="p-6 text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-vimate-purple to-vimate-orange rounded-full animate-pulse-heart"></div>
                <img 
                  src={matchedProfile.images[0]} 
                  alt={matchedProfile.name} 
                  className="w-full h-full object-cover rounded-full border-4 border-white"
                />
              </div>
              
              <h2 className="text-2xl font-bold mb-2">It's a Match!</h2>
              <p className="text-gray-600 mb-6">
                You and {matchedProfile.name} have liked each other.
              </p>
              
              <div className="flex gap-3 justify-center">
                <Button 
                  variant="outline" 
                  className="flex-1 border-vimate-purple text-vimate-purple hover:bg-vimate-purple/10"
                  onClick={closeMatch}
                >
                  Keep Swiping
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-vimate-purple to-vimate-orange hover:opacity-90"
                  onClick={closeMatch}
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
