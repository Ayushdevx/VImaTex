import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar as CalendarIcon, Clock, Users, BookOpen, User, MapPin, Filter, Search, Video, CalendarClock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { VideoChatDialog } from "@/components/VideoChat";
import { toast } from "@/components/ui/use-toast";

export default function LibraryMate() {
  // State variables
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [noiseLevel, setNoiseLevel] = useState([3]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(true);
  const [isVideoChatOpen, setIsVideoChatOpen] = useState(false);
  const [selectedStudyPartner, setSelectedStudyPartner] = useState<any>(null);
  const [selectedStudyGroup, setSelectedStudyGroup] = useState<any>(null);
  const [activeStudySessions, setActiveStudySessions] = useState<any[]>([]);

  // Noise level labels for display
  const noiseLevelLabels = [
    "Silent", "Quiet", "Moderate", "Conversational", "Active"
  ];
  
  // Sample library mate data
  const libraryMates = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "/avatars/alex.jpg",
      major: "Computer Science",
      year: "Junior",
      subjects: ["Data Structures", "Algorithms", "Database Systems"],
      available: true,
      location: "Main Library, Floor 2",
      availableUntil: "8:00 PM",
      preferredNoiseLevel: 2,
      bio: "Looking for study partners for upcoming algorithms exam. I'm good at explaining complex concepts.",
    },
    {
      id: 2,
      name: "Sophia Williams",
      avatar: "/avatars/sophia.jpg",
      major: "Electrical Engineering",
      year: "Senior",
      subjects: ["Circuit Design", "Digital Logic", "Signal Processing"],
      available: true,
      location: "Engineering Library",
      availableUntil: "6:30 PM",
      preferredNoiseLevel: 1,
      bio: "Senior EE student willing to help with circuit design and analysis. I prefer quiet study environments.",
    },
    {
      id: 3,
      name: "Michael Chen",
      avatar: "/avatars/michael.jpg",
      major: "Physics",
      year: "Sophomore",
      subjects: ["Mechanics", "Thermodynamics", "Calculus II"],
      available: false,
      location: "Science Library",
      availableUntil: "",
      preferredNoiseLevel: 3,
      bio: "Looking for study groups for Physics and Math courses. Available most evenings and weekends.",
    },
    {
      id: 4,
      name: "Emma Rodriguez",
      avatar: "/avatars/emma.jpg",
      major: "Biology",
      year: "Senior",
      subjects: ["Molecular Biology", "Genetics", "Organic Chemistry"],
      available: true,
      location: "Life Sciences Building",
      availableUntil: "9:00 PM",
      preferredNoiseLevel: 4,
      bio: "Pre-med student happy to help with bio and chem courses. I'm preparing for MCAT and looking for study partners.",
    },
    {
      id: 5,
      name: "James Lee",
      avatar: "/avatars/james.jpg",
      major: "Computer Science",
      year: "Freshman",
      subjects: ["Programming Fundamentals", "Discrete Math", "Web Development"],
      available: true,
      location: "CS Building, Study Room 101",
      availableUntil: "7:30 PM",
      preferredNoiseLevel: 5,
      bio: "First-year CS student looking to join or form a coding group. I'm working on several side projects too.",
    },
  ];

  // Filter library mates based on search and filters
  const filteredLibraryMates = libraryMates
    .filter(mate =>
      (mate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       mate.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
       mate.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase())))
    )
    .filter(mate => selectedSubject === "all" || mate.subjects.some(subject => subject.toLowerCase().includes(selectedSubject.toLowerCase())))
    .filter(mate => !showAvailableOnly || mate.available)
    .filter(mate => mate.preferredNoiseLevel <= noiseLevel[0]);

  // Sample library locations
  const libraryLocations = [
    {
      id: 1,
      name: "Main Library",
      floors: 4,
      studyRooms: 20,
      currentOccupancy: "65%",
      openUntil: "11:00 PM",
      quietZones: ["Floor 3", "Floor 4"],
      groupAreas: ["Floor 1", "Floor 2"],
      services: ["Printing", "Scanner", "Computers", "WiFi"],
    },
    {
      id: 2,
      name: "Engineering Library",
      floors: 2,
      studyRooms: 8,
      currentOccupancy: "75%",
      openUntil: "9:00 PM",
      quietZones: ["Floor 2"],
      groupAreas: ["Floor 1"],
      services: ["Printing", "WiFi", "Technical Books"],
    },
    {
      id: 3,
      name: "Science Library",
      floors: 3,
      studyRooms: 12,
      currentOccupancy: "40%",
      openUntil: "8:00 PM",
      quietZones: ["Floor 3"],
      groupAreas: ["Floor 1"],
      services: ["Printing", "WiFi", "Journals"],
    },
  ];

  // Sample study group sessions
  const studyGroups = [
    {
      id: 1,
      subject: "Data Structures & Algorithms",
      date: "2023-12-18",
      time: "6:00 PM - 8:00 PM",
      location: "Main Library, Study Room 4",
      participants: ["Alex Johnson", "James Lee", "+3 more"],
      maxParticipants: 8,
      currentParticipants: 5,
      description: "Preparing for the final DS&A exam. We'll cover graph algorithms and dynamic programming.",
      hasVirtualOption: true,
      creator: "Alex Johnson",
      creatorId: 1
    },
    {
      id: 2,
      subject: "Organic Chemistry",
      date: "2023-12-19",
      time: "4:00 PM - 6:00 PM",
      location: "Science Library, Room 201",
      participants: ["Emma Rodriguez", "+2 more"],
      maxParticipants: 6,
      currentParticipants: 3,
      description: "Review session for the upcoming O-Chem midterm. Focusing on reaction mechanisms.",
      hasVirtualOption: false,
      creator: "Emma Rodriguez",
      creatorId: 4
    },
    {
      id: 3,
      subject: "Circuit Analysis",
      date: "2023-12-20",
      time: "5:30 PM - 7:30 PM",
      location: "Engineering Library, Floor 1",
      participants: ["Sophia Williams", "+4 more"],
      maxParticipants: 8,
      currentParticipants: 5,
      description: "Working through problem sets for the final exam. Covering both DC and AC circuit analysis.",
      hasVirtualOption: true,
      creator: "Sophia Williams",
      creatorId: 2
    },
  ];

  // Handle starting a video call with a study partner
  const handleStartVideoCall = (mate) => {
    setSelectedStudyPartner(mate);
    setIsVideoChatOpen(true);
  };

  // Handle joining a virtual study group
  const handleJoinVirtualStudyGroup = (group) => {
    setSelectedStudyGroup(group);
    setIsVideoChatOpen(true);
    
    // Add to active study sessions
    const newSession = {
      id: `session-${Date.now()}`,
      type: 'group',
      subject: group.subject,
      startTime: new Date(),
      participants: group.participants
    };
    
    setActiveStudySessions([...activeStudySessions, newSession]);
    
    toast({
      title: "Joined study group",
      description: `You've joined the ${group.subject} study session`
    });
  };

  // End an active study session
  const handleEndStudySession = (sessionId) => {
    setActiveStudySessions(activeStudySessions.filter(session => session.id !== sessionId));
    
    toast({
      title: "Study session ended",
      description: "Your study session has ended"
    });
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Library Mate</h1>
          <div className="space-x-3">
            <Button variant="outline">Create Study Group</Button>
            <Button>Find Study Partner</Button>
          </div>
        </div>

        <Tabs defaultValue="find-mates">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="find-mates">Find Study Partners</TabsTrigger>
            <TabsTrigger value="study-groups">Study Groups</TabsTrigger>
            <TabsTrigger value="library-info">Library Information</TabsTrigger>
          </TabsList>
          
          {/* Find Study Partners Tab */}
          <TabsContent value="find-mates" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject-select">Subject</Label>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Subjects" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        <SelectItem value="data structures">Data Structures</SelectItem>
                        <SelectItem value="algorithms">Algorithms</SelectItem>
                        <SelectItem value="calculus">Calculus</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Preferred Noise Level</Label>
                    <div className="flex flex-col space-y-1">
                      <Slider 
                        defaultValue={noiseLevel} 
                        max={5} 
                        step={1} 
                        onValueChange={setNoiseLevel} 
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Silent</span>
                        <span>Active</span>
                      </div>
                      <div className="text-sm font-medium pt-2">
                        Selected: {noiseLevelLabels[noiseLevel[0]-1]}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="available-only" 
                      checked={showAvailableOnly}
                      onCheckedChange={setShowAvailableOnly}
                    />
                    <Label htmlFor="available-only">Show available only</Label>
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <Label>Date</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="md:col-span-3 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, subject, or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="space-y-4">
                  {filteredLibraryMates.length > 0 ? (
                    filteredLibraryMates.map((mate) => (
                      <Card key={mate.id} className={`overflow-hidden ${!mate.available ? 'opacity-60' : ''}`}>
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-1/4 bg-muted p-6 flex flex-col items-center justify-center">
                            <div className="w-24 h-24 rounded-full overflow-hidden bg-background mb-2 relative">
                              <img 
                                src={mate.avatar ? mate.avatar : `https://api.dicebear.com/6.x/initials/svg?seed=${mate.name}`} 
                                alt={mate.name} 
                                className="w-full h-full object-cover" 
                              />
                              {mate.available && (
                                <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                              )}
                            </div>
                            <h3 className="font-medium">{mate.name}</h3>
                            <div className="text-sm text-muted-foreground">{mate.major}</div>
                            <div className="text-xs text-muted-foreground">{mate.year}</div>
                          </div>
                          
                          <div className="flex-grow p-4 md:p-6 space-y-4">
                            <div>
                              <h4 className="text-sm font-medium mb-1">Studying</h4>
                              <div className="flex flex-wrap gap-2">
                                {mate.subjects.map((subject, index) => (
                                  <Badge key={index} variant="outline" className="bg-primary/10">
                                    <BookOpen className="mr-1 h-3 w-3" />
                                    {subject}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <p className="text-sm">{mate.bio}</p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 text-sm">
                              {mate.available && (
                                <>
                                  <div className="flex items-center">
                                    <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                                    <span>{mate.location}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                                    <span>Until {mate.availableUntil}</span>
                                  </div>
                                </>
                              )}
                              <div className="flex items-center">
                                <Filter className="mr-1 h-4 w-4 text-muted-foreground" />
                                <span>Prefers: {noiseLevelLabels[mate.preferredNoiseLevel-1]} environment</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <CardFooter className="bg-muted/30 flex justify-end p-4">
                          <div className="space-x-2">
                            <Button variant="outline" size="sm">View Profile</Button>
                            {mate.available && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleStartVideoCall(mate)}
                                className="bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100"
                              >
                                <Video className="mr-2 h-4 w-4" />
                                Video Call
                              </Button>
                            )}
                            <Button size="sm">Connect</Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Users className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium text-lg">No study partners found</h3>
                      <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Study Groups Tab */}
          <TabsContent value="study-groups" className="mt-6 space-y-6">
            {activeStudySessions.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-3">Your Active Study Sessions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {activeStudySessions.map((session) => (
                    <Card key={session.id} className="border-blue-200 bg-blue-50">
                      <CardHeader className="pb-2">
                        <Badge className="w-fit mb-2 bg-blue-100 text-blue-800 hover:bg-blue-200">Live</Badge>
                        <CardTitle className="text-md">{session.subject}</CardTitle>
                        <CardDescription>
                          Started {new Date(session.startTime).toLocaleTimeString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4" />
                          <span>{session.participants?.length || 2} participants</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex justify-between w-full">
                          <Button variant="outline" size="sm" onClick={() => handleEndStudySession(session.id)}>
                            End Session
                          </Button>
                          <Button size="sm" onClick={() => setIsVideoChatOpen(true)}>
                            <Video className="mr-2 h-4 w-4" />
                            Rejoin
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {studyGroups.map((group) => (
                <Card key={group.id}>
                  <CardHeader>
                    <CardTitle>{group.subject}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center">
                        <CalendarIcon className="mr-1 h-4 w-4" />
                        {new Date(group.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock className="mr-1 h-4 w-4" />
                        {group.time}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{group.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{group.currentParticipants}/{group.maxParticipants} Participants</span>
                      </div>
                      <p className="text-sm line-clamp-2">{group.description}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={group.currentParticipants >= group.maxParticipants ? "opacity-50" : ""}
                    >
                      {group.currentParticipants >= group.maxParticipants ? "Full" : "Join Group"}
                    </Button>
                    
                    {group.hasVirtualOption && (
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleJoinVirtualStudyGroup(group)}
                      >
                        <Video className="mr-2 h-4 w-4" />
                        Join Virtually
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button>Create New Study Group</Button>
            </div>
          </TabsContent>
          
          {/* Library Information Tab */}
          <TabsContent value="library-info" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {libraryLocations.map((library) => (
                <Card key={library.id}>
                  <CardHeader>
                    <CardTitle>{library.name}</CardTitle>
                    <CardDescription>
                      <div className="flex justify-between">
                        <span>{library.floors} Floors</span>
                        <span>Open until {library.openUntil}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Current Occupancy</span>
                          <span className={`text-sm font-medium ${
                            parseInt(library.currentOccupancy) > 80 
                              ? 'text-red-600' 
                              : parseInt(library.currentOccupancy) > 60 
                                ? 'text-amber-600' 
                                : 'text-green-600'
                          }`}>
                            {library.currentOccupancy}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              parseInt(library.currentOccupancy) > 80 
                                ? 'bg-red-600' 
                                : parseInt(library.currentOccupancy) > 60 
                                  ? 'bg-amber-600' 
                                  : 'bg-green-600'
                            }`}
                            style={{ width: library.currentOccupancy }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-1">Quiet Zones</h4>
                          <ul className="text-sm text-muted-foreground list-disc list-inside">
                            {library.quietZones.map((zone, index) => (
                              <li key={index}>{zone}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-1">Group Areas</h4>
                          <ul className="text-sm text-muted-foreground list-disc list-inside">
                            {library.groupAreas.map((area, index) => (
                              <li key={index}>{area}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-1">Available Services</h4>
                        <div className="flex flex-wrap gap-2">
                          {library.services.map((service, index) => (
                            <Badge key={index} variant="outline">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-1">Study Rooms</h4>
                        <p className="text-sm">{library.studyRooms} rooms available for booking</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm" variant="outline" className="w-full">
                      Book a Study Room
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Video Chat Dialog */}
      <VideoChatDialog
        open={isVideoChatOpen}
        onOpenChange={setIsVideoChatOpen}
        roomId={`study-${selectedStudyPartner?.id || selectedStudyGroup?.id || 'room'}`}
        title={selectedStudyGroup 
          ? `Study Group: ${selectedStudyGroup.subject}` 
          : `Study Session with ${selectedStudyPartner?.name || 'Partner'}`
        }
        context="study"
        participants={selectedStudyGroup ? 
          selectedStudyGroup.participants.map(name => ({ id: name, name })) : 
          selectedStudyPartner ? [{ id: selectedStudyPartner.id.toString(), name: selectedStudyPartner.name, avatar: selectedStudyPartner.avatar }] : []
        }
        duration={60} // 60 minute study session
      />
    </Layout>
  );
}