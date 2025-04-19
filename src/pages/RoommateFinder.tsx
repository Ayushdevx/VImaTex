import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { useUserPreferences } from "@/contexts/UserPreferencesContext";
import { Home, User, Clock, Filter, Heart, MessageSquare, Calendar, Star, Coffee, X, CheckCircle, Music, Moon, Zap, Users } from "lucide-react";

// Types
interface Roommate {
  id: string;
  name: string;
  avatar: string;
  age: number;
  gender: string;
  year: string;
  major: string;
  compatibility: number; 
  cleanliness: number;
  sleepSchedule: "early" | "late" | "flexible";
  studyHabits: "quiet" | "music" | "group" | "flexible";
  visitors: "often" | "sometimes" | "rarely" | "never";
  bio: string;
  interests: string[];
  socialMedia?: {
    instagram?: string;
    snapchat?: string;
    linkedin?: string;
  };
  contactInfo?: {
    email?: string;
    phone?: string;
  };
  isPremium: boolean;
  moveInDate?: string;
  duration: "semester" | "year" | "flexible";
  budget?: {
    min: number;
    max: number;
  };
}

const RoommateFinder = () => {
  const { roommatePreferences, updateRoommatePreferences } = useUserPreferences();
  
  const [activeTab, setActiveTab] = useState("find");
  const [showCompatibilityDialog, setShowCompatibilityDialog] = useState(false);
  const [selectedRoommate, setSelectedRoommate] = useState<Roommate | null>(null);
  
  // Filter states
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [yearFilter, setYearFilter] = useState<string | null>(null);
  const [budgetMax, setBudgetMax] = useState<number>(15000);
  const [onlyAvailableNow, setOnlyAvailableNow] = useState(false);
  
  // Preference update states
  const [cleanliness, setCleanliness] = useState(roommatePreferences.cleanliness);
  const [sleepSchedule, setSleepSchedule] = useState(roommatePreferences.sleepSchedule);
  const [studyHabits, setStudyHabits] = useState(roommatePreferences.studyHabits);
  const [visitors, setVisitors] = useState(roommatePreferences.visitors);
  const [lookingForRoommate, setLookingForRoommate] = useState(roommatePreferences.lookingForRoommate);
  
  // Sample data - in a real app, this would come from an API
  const [roommates, setRoommates] = useState<Roommate[]>([
    {
      id: "1",
      name: "Aditya Sharma",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      age: 19,
      gender: "Male",
      year: "Sophomore",
      major: "Computer Science",
      compatibility: 92,
      cleanliness: 4,
      sleepSchedule: "flexible",
      studyHabits: "quiet",
      visitors: "sometimes",
      bio: "CS major looking for a roommate who respects quiet study time. I keep things neat and organized.",
      interests: ["Coding", "Gaming", "Chess"],
      socialMedia: {
        instagram: "@adisharma",
        snapchat: "@aditya_s"
      },
      isPremium: true,
      moveInDate: "2025-06-15",
      duration: "year",
      budget: {
        min: 8000,
        max: 12000
      }
    },
    {
      id: "2",
      name: "Priya Patel",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      age: 20,
      gender: "Female",
      year: "Junior",
      major: "Biotech",
      compatibility: 85,
      cleanliness: 5,
      sleepSchedule: "early",
      studyHabits: "music",
      visitors: "rarely",
      bio: "I'm an early riser and like to keep my space spotless. Looking for someone with similar habits.",
      interests: ["Reading", "Yoga", "Cooking"],
      socialMedia: {
        instagram: "@priya_p",
        linkedin: "priyapatel"
      },
      isPremium: false,
      moveInDate: "2025-05-30",
      duration: "year",
      budget: {
        min: 9000,
        max: 13000
      }
    },
    {
      id: "3",
      name: "Rajiv Kumar",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      age: 21,
      gender: "Male",
      year: "Senior",
      major: "Mechanical Engineering",
      compatibility: 78,
      cleanliness: 3,
      sleepSchedule: "late",
      studyHabits: "group",
      visitors: "often",
      bio: "Mech engineering student who enjoys socializing. I'm okay with having friends over occasionally.",
      interests: ["Football", "Movies", "Music"],
      contactInfo: {
        email: "rajiv@example.com"
      },
      isPremium: true,
      moveInDate: "2025-06-01",
      duration: "semester",
      budget: {
        min: 7000,
        max: 11000
      }
    },
    {
      id: "4",
      name: "Sneha Reddy",
      avatar: "https://randomuser.me/api/portraits/women/17.jpg",
      age: 19,
      gender: "Female",
      year: "Sophomore",
      major: "Electronics",
      compatibility: 94,
      cleanliness: 4,
      sleepSchedule: "flexible",
      studyHabits: "quiet",
      visitors: "sometimes",
      bio: "ECE student looking for a roommate who values quiet study time but is also open to occasional hangouts.",
      interests: ["Circuit Design", "Art", "Hiking"],
      socialMedia: {
        instagram: "@sneha_r",
      },
      isPremium: false,
      moveInDate: "2025-05-25",
      duration: "flexible",
      budget: {
        min: 8500,
        max: 12500
      }
    },
    {
      id: "5",
      name: "Vikram Singh",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      age: 20,
      gender: "Male",
      year: "Junior",
      major: "Civil Engineering",
      compatibility: 72,
      cleanliness: 3,
      sleepSchedule: "early",
      studyHabits: "flexible",
      visitors: "rarely",
      bio: "Civil engineering student who enjoys sports. I prefer a tidy living space and am an early riser.",
      interests: ["Cricket", "Drawing", "Documentaries"],
      contactInfo: {
        email: "vikram@example.com",
        phone: "+91987654xxxx"
      },
      isPremium: true,
      moveInDate: "2025-07-01",
      duration: "year",
      budget: {
        min: 9000,
        max: 14000
      }
    }
  ]);

  // Apply filters to roommates
  const filteredRoommates = roommates.filter(roommate => {
    if (genderFilter && roommate.gender !== genderFilter) return false;
    if (yearFilter && roommate.year !== yearFilter) return false;
    if (onlyAvailableNow && new Date(roommate.moveInDate || "") > new Date()) return false;
    if (roommate.budget && roommate.budget.min > budgetMax) return false;
    return true;
  });

  // Sort roommates by compatibility
  const sortedRoommates = [...filteredRoommates].sort((a, b) => b.compatibility - a.compatibility);

  // Save preference changes
  useEffect(() => {
    updateRoommatePreferences({
      cleanliness,
      sleepSchedule,
      studyHabits,
      visitors,
      lookingForRoommate
    });
  }, [cleanliness, sleepSchedule, studyHabits, visitors, lookingForRoommate, updateRoommatePreferences]);

  // Handle send message
  const handleSendMessage = (roommate: Roommate) => {
    toast({
      title: `Message sent to ${roommate.name}`,
      description: "They will receive your contact request.",
    });
  };

  // Handle view compatibility
  const handleViewCompatibility = (roommate: Roommate) => {
    setSelectedRoommate(roommate);
    setShowCompatibilityDialog(true);
  };

  // Display compatibility attributes
  const getCompatibilityFactor = (attribute: string, value: any, userValue: any) => {
    const match = value === userValue;
    return (
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className="text-sm font-medium">{attribute}</p>
          <div className="flex items-center">
            <p className="text-xs text-muted-foreground">{value}</p>
            <p className="text-xs text-muted-foreground mx-1">•</p>
            <p className="text-xs text-muted-foreground">You: {userValue}</p>
          </div>
        </div>
        {match ? 
          <CheckCircle className="h-5 w-5 text-green-500" /> : 
          <X className="h-5 w-5 text-red-500" />
        }
      </div>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Roommate Finder</h1>
          <div className="space-x-3">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button>
              <Star className="mr-2 h-4 w-4" />
              Premium Matches
            </Button>
          </div>
        </div>

        <Tabs defaultValue="find" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="find">Find Roommate</TabsTrigger>
            <TabsTrigger value="my-profile">My Preferences</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
          </TabsList>

          {/* Find Roommate Tab */}
          <TabsContent value="find" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Filters Card */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Filter className="h-5 w-5 mr-2" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select value={genderFilter || 'any'} onValueChange={(value) => setGenderFilter(value === 'any' ? null : value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Non-Binary">Non-Binary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Select value={yearFilter || 'any'} onValueChange={(value) => setYearFilter(value === 'any' ? null : value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="Freshman">Freshman</SelectItem>
                        <SelectItem value="Sophomore">Sophomore</SelectItem>
                        <SelectItem value="Junior">Junior</SelectItem>
                        <SelectItem value="Senior">Senior</SelectItem>
                        <SelectItem value="Graduate">Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Budget (Max ₹{budgetMax})</Label>
                    </div>
                    <Slider
                      defaultValue={[budgetMax]}
                      max={20000}
                      min={5000}
                      step={500}
                      onValueChange={(value) => setBudgetMax(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <p>₹5,000</p>
                      <p>₹20,000</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Switch 
                      id="available-now" 
                      checked={onlyAvailableNow} 
                      onCheckedChange={setOnlyAvailableNow}
                    />
                    <Label htmlFor="available-now">Available now only</Label>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <Label className="text-sm mb-1 block">My Compatibility Priorities</Label>
                    <div className="space-y-2 pl-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-slate-500" />
                        <span>Cleanliness: {cleanliness}/5</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4 text-slate-500" />
                        <span>Sleep: {sleepSchedule}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Music className="h-4 w-4 text-slate-500" />
                        <span>Study: {studyHabits}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-slate-500" />
                        <span>Visitors: {visitors}</span>
                      </div>
                    </div>
                    <Button variant="link" className="px-0 h-auto text-sm" onClick={() => setActiveTab("my-profile")}>
                      Change Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Roommate List */}
              <div className="md:col-span-3 space-y-4">
                {sortedRoommates.length > 0 ? (
                  sortedRoommates.map((roommate) => (
                    <Card key={roommate.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-64 p-6 flex flex-col items-center justify-center bg-slate-50 border-b md:border-b-0 md:border-r dark:bg-slate-800">
                          <div className="relative">
                            <Avatar className="h-24 w-24 mb-4">
                              <AvatarImage src={roommate.avatar} alt={roommate.name} />
                              <AvatarFallback>{roommate.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {roommate.isPremium && (
                              <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-white text-xs p-1 rounded-full">
                                <Star className="h-3 w-3" />
                              </div>
                            )}
                          </div>
                          <h3 className="font-medium text-lg">{roommate.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{roommate.year}, {roommate.major}</p>
                          
                          <div className="w-full mt-2">
                            <div className="flex justify-between items-center mb-1 text-sm">
                              <span>Compatibility</span>
                              <span className="font-medium">{roommate.compatibility}%</span>
                            </div>
                            <Progress value={roommate.compatibility} className="h-2" />
                          </div>
                        </div>
                        
                        <div className="flex-1 p-6">
                          <div className="space-y-4">
                            <p>{roommate.bio}</p>
                            
                            <div>
                              <h4 className="text-sm font-medium mb-2">Interests</h4>
                              <div className="flex flex-wrap gap-2">
                                {roommate.interests.map((interest, i) => (
                                  <Badge key={i} variant="secondary">{interest}</Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-medium mb-1">Budget Range</h4>
                                <p className="text-sm">₹{roommate.budget?.min.toLocaleString()} - ₹{roommate.budget?.max.toLocaleString()}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Duration</h4>
                                <p className="text-sm capitalize">{roommate.duration}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-6 flex justify-end">
                            <div className="space-x-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewCompatibility(roommate)}>
                                <Heart className="mr-1 h-4 w-4" />
                                View Match
                              </Button>
                              <Button size="sm" onClick={() => handleSendMessage(roommate)}>
                                <MessageSquare className="mr-1 h-4 w-4" />
                                Contact
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                      <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium text-lg">No roommates found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* My Preferences Tab */}
          <TabsContent value="my-profile" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Roommate Preferences</CardTitle>
                  <CardDescription>Set your preferences to find the perfect roommate match</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Cleanliness Preference (1-5)</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          defaultValue={[cleanliness]}
                          max={5}
                          min={1}
                          step={1}
                          value={[cleanliness]}
                          onValueChange={(val) => setCleanliness(val[0] as 1|2|3|4|5)}
                          className="flex-1"
                        />
                        <span className="font-medium">{cleanliness}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">1 = Relaxed, 5 = Very Neat</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Sleep Schedule</Label>
                      <RadioGroup value={sleepSchedule} onValueChange={(val) => setSleepSchedule(val as "early"|"late"|"flexible")}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="early" id="sleep-early" />
                          <Label htmlFor="sleep-early">Early to bed/rise</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="late" id="sleep-late" />
                          <Label htmlFor="sleep-late">Night owl</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="flexible" id="sleep-flexible" />
                          <Label htmlFor="sleep-flexible">Flexible</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label>Study Habits</Label>
                      <RadioGroup value={studyHabits} onValueChange={(val) => setStudyHabits(val as "quiet"|"music"|"group"|"flexible")}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="quiet" id="study-quiet" />
                          <Label htmlFor="study-quiet">Prefer silence</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="music" id="study-music" />
                          <Label htmlFor="study-music">Study with music/background noise</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="group" id="study-group" />
                          <Label htmlFor="study-group">Prefer group study</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="flexible" id="study-flexible" />
                          <Label htmlFor="study-flexible">Flexible</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label>Visitors Preference</Label>
                      <RadioGroup value={visitors} onValueChange={(val) => setVisitors(val as "often"|"sometimes"|"rarely"|"never")}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="often" id="visitors-often" />
                          <Label htmlFor="visitors-often">Often (multiple times per week)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sometimes" id="visitors-sometimes" />
                          <Label htmlFor="visitors-sometimes">Sometimes (weekends/occasionally)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="rarely" id="visitors-rarely" />
                          <Label htmlFor="visitors-rarely">Rarely (special occasions only)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="never" id="visitors-never" />
                          <Label htmlFor="visitors-never">Prefer no visitors</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-6 flex justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="looking-status" 
                      checked={lookingForRoommate} 
                      onCheckedChange={setLookingForRoommate}
                    />
                    <Label htmlFor="looking-status">I am actively looking for a roommate</Label>
                  </div>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Profile Visibility</CardTitle>
                    <CardDescription>Control who can see and contact you</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="visibility-everyone" className="cursor-pointer">Show my profile to everyone</Label>
                      <Switch id="visibility-everyone" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="visibility-contact" className="cursor-pointer">Allow people to contact me</Label>
                      <Switch id="visibility-contact" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="visibility-alert" className="cursor-pointer">Alert me about new compatible matches</Label>
                      <Switch id="visibility-alert" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Premium</CardTitle>
                    <CardDescription>Get more features with a premium subscription</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <p>Unlimited roommate matches</p>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <p>Priority in search results</p>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <p>See who viewed your profile</p>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <p>Advanced compatibility filtering</p>
                      </div>
                    </div>
                    <Button className="w-full">Upgrade Now</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle>Roommate Requests</CardTitle>
                  <CardDescription>People who have contacted you about roommate matching</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center py-12">
                      <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                        <MessageSquare className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium text-lg">No requests yet</h3>
                      <p className="text-muted-foreground">When someone contacts you about roommate matching, it will appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Compatibility Dialog */}
      {selectedRoommate && (
        <Dialog open={showCompatibilityDialog} onOpenChange={setShowCompatibilityDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Compatibility with {selectedRoommate.name}</DialogTitle>
              <DialogDescription>
                {selectedRoommate.compatibility}% match based on your preferences
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex items-center mb-4">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={selectedRoommate.avatar} alt={selectedRoommate.name} />
                  <AvatarFallback>{selectedRoommate.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{selectedRoommate.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedRoommate.year}, {selectedRoommate.major}</p>
                </div>
              </div>
              
              <Separator />
              
              <ScrollArea className="h-72 pr-4">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Compatibility Factors</h4>
                    {getCompatibilityFactor("Cleanliness", `${selectedRoommate.cleanliness}/5`, `${cleanliness}/5`)}
                    {getCompatibilityFactor("Sleep Schedule", selectedRoommate.sleepSchedule, sleepSchedule)}
                    {getCompatibilityFactor("Study Habits", selectedRoommate.studyHabits, studyHabits)}
                    {getCompatibilityFactor("Visitors", selectedRoommate.visitors, visitors)}
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Move-in Details</h4>
                    <p className="text-sm"><span className="font-medium">Available from:</span> {new Date(selectedRoommate.moveInDate || "").toLocaleDateString()}</p>
                    <p className="text-sm"><span className="font-medium">Duration:</span> {selectedRoommate.duration === "flexible" ? "Flexible" : selectedRoommate.duration === "year" ? "Full Year" : "One Semester"}</p>
                    <p className="text-sm"><span className="font-medium">Budget:</span> ₹{selectedRoommate.budget?.min.toLocaleString()} - ₹{selectedRoommate.budget?.max.toLocaleString()}</p>
                  </div>
                  
                  {selectedRoommate.isPremium && (
                    <div>
                      <h4 className="font-medium mb-2">Contact Information</h4>
                      {selectedRoommate.contactInfo?.email && (
                        <p className="text-sm"><span className="font-medium">Email:</span> {selectedRoommate.contactInfo.email}</p>
                      )}
                      {selectedRoommate.contactInfo?.phone && (
                        <p className="text-sm"><span className="font-medium">Phone:</span> {selectedRoommate.contactInfo.phone}</p>
                      )}
                      {selectedRoommate.socialMedia && (
                        <div className="mt-2">
                          {selectedRoommate.socialMedia.instagram && (
                            <p className="text-sm"><span className="font-medium">Instagram:</span> {selectedRoommate.socialMedia.instagram}</p>
                          )}
                          {selectedRoommate.socialMedia.snapchat && (
                            <p className="text-sm"><span className="font-medium">Snapchat:</span> {selectedRoommate.socialMedia.snapchat}</p>
                          )}
                          {selectedRoommate.socialMedia.linkedin && (
                            <p className="text-sm"><span className="font-medium">LinkedIn:</span> {selectedRoommate.socialMedia.linkedin}</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
            
            <DialogFooter>
              {!selectedRoommate.isPremium && (
                <div className="mr-auto text-xs text-amber-600 flex items-center">
                  <Zap className="h-3 w-3 mr-1" />
                  Upgrade to Premium to see contact info
                </div>
              )}
              <Button variant="outline" onClick={() => setShowCompatibilityDialog(false)}>Close</Button>
              <Button onClick={() => {
                handleSendMessage(selectedRoommate);
                setShowCompatibilityDialog(false);
              }}>Contact</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Layout>
  );
};

export default RoommateFinder;