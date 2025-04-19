
import { useState } from "react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Search, 
  Users, 
  BookOpen, 
  MapPin, 
  Clock, 
  Filter,
  Star,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for events
const events = [
  {
    id: "1",
    title: "Campus Coffee Mixer",
    description: "Meet other students in a relaxed setting. Great networking opportunity!",
    location: "Student Union Café",
    date: "Fri, May 12",
    time: "5:00 PM - 7:00 PM",
    attendees: 28,
    tags: ["Social", "Networking"],
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
  },
  {
    id: "2",
    title: "Psychology Research Group",
    description: "Weekly study group for Psychology majors focused on research methods.",
    location: "Library, Room 305",
    date: "Wed, May 10",
    time: "4:00 PM - 6:00 PM",
    attendees: 15,
    tags: ["Academic", "Psychology"],
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
  },
  {
    id: "3",
    title: "Campus Hike & Photography",
    description: "Explore scenic trails around campus and practice photography skills.",
    location: "Main Entrance Gate",
    date: "Sat, May 13",
    time: "10:00 AM - 1:00 PM",
    attendees: 12,
    tags: ["Outdoors", "Photography"],
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1980&q=80"
  },
  {
    id: "4",
    title: "Tech Startup Weekend",
    description: "Form teams and build a startup concept in just 48 hours!",
    location: "Business School Auditorium",
    date: "Fri-Sun, May 19-21",
    time: "All Day",
    attendees: 75,
    tags: ["Entrepreneurship", "Tech"],
    image: "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
  }
];

// Mock data for study buddies
const studyBuddies = [
  {
    id: "1",
    name: "Emily",
    major: "Psychology",
    year: "Junior",
    subjects: ["Research Methods", "Statistics", "Cognitive Psychology"],
    bio: "Looking for study partners for upcoming Research Methods exam. I'm good with experimental design concepts!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    matchScore: 95
  },
  {
    id: "2",
    name: "Michael",
    major: "Computer Science",
    year: "Senior",
    subjects: ["Algorithms", "Machine Learning", "Database Systems"],
    bio: "CS tutor looking to form a study group for algorithm practice and interview prep. Can help with coding problems!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    matchScore: 85
  },
  {
    id: "3",
    name: "Sophia",
    major: "Environmental Science",
    year: "Sophomore",
    subjects: ["Biology", "Chemistry", "Earth Systems"],
    bio: "Eco enthusiast looking for study partners for the Chem midterm. I have great notes and flashcards to share!",
    image: "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1286&q=80",
    matchScore: 78
  },
  {
    id: "4",
    name: "James",
    major: "Business",
    year: "Graduate",
    subjects: ["Finance", "Marketing", "Management"],
    bio: "MBA student looking for case study partners. I'm strong in finance analysis and can help with Excel models.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    matchScore: 82
  }
];

// Mock data for interests
const interestCategories = [
  {
    name: "Sports & Fitness",
    interests: ["Basketball", "Yoga", "Hiking", "Running", "Swimming", "Rock Climbing"]
  },
  {
    name: "Arts & Culture",
    interests: ["Photography", "Painting", "Museums", "Theater", "Film", "Music"]
  },
  {
    name: "Academic",
    interests: ["Research", "Debate", "Writing", "Languages", "Robotics", "AI"]
  },
  {
    name: "Social",
    interests: ["Coffee", "Foodie", "Travel", "Board Games", "Volunteering", "Politics"]
  }
];

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };
  
  // Filter events based on search query and selected interests
  const filteredEvents = events.filter(event => {
    // If no search query and no selected interests, show all
    if (!searchQuery && selectedInterests.length === 0) return true;
    
    // Filter by search query
    const matchesSearch = !searchQuery || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by selected interests
    const matchesInterests = selectedInterests.length === 0 ||
      event.tags.some(tag => selectedInterests.includes(tag));
    
    return matchesSearch && matchesInterests;
  });
  
  // Filter study buddies based on search query
  const filteredStudyBuddies = studyBuddies.filter(buddy => {
    if (!searchQuery) return true;
    
    return buddy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buddy.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buddy.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="pt-16 px-4 max-w-lg mx-auto">
        <div className="flex items-center justify-between mt-4 mb-6">
          <h1 className="text-2xl font-bold">Explore</h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search events, study groups, interests..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Main Tabs */}
        <Tabs defaultValue="events">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="events" className="text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              Events
            </TabsTrigger>
            <TabsTrigger value="study" className="text-sm">
              <BookOpen className="h-4 w-4 mr-1" />
              Study Buddies
            </TabsTrigger>
            <TabsTrigger value="interests" className="text-sm">
              <Star className="h-4 w-4 mr-1" />
              Interests
            </TabsTrigger>
          </TabsList>
          
          {/* Events Tab */}
          <TabsContent value="events" className="mt-0">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No events found matching your criteria</p>
                <Button 
                  variant="outline"
                  className="mt-4 border-vimate-purple text-vimate-purple hover:bg-vimate-purple/10"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedInterests([]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEvents.map(event => (
                  <div 
                    key={event.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-video relative">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <h3 className="text-white font-semibold">{event.title}</h3>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {event.tags.map((tag, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary"
                            className="bg-vimate-purple/10 text-vimate-purple"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <MapPin className="h-4 w-4 mr-1 text-vimate-purple" />
                        {event.location}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar className="h-4 w-4 mr-1 text-vimate-purple" />
                        {event.date}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Clock className="h-4 w-4 mr-1 text-vimate-purple" />
                        {event.time}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-1 text-vimate-purple" />
                          <span>{event.attendees} attending</span>
                        </div>
                        
                        <Button
                          size="sm"
                          className="bg-vimate-purple hover:bg-vimate-purple-dark"
                        >
                          Join
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Study Buddies Tab */}
          <TabsContent value="study" className="mt-0">
            {filteredStudyBuddies.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No study buddies found matching your criteria</p>
                <Button 
                  variant="outline"
                  className="mt-4 border-vimate-purple text-vimate-purple hover:bg-vimate-purple/10"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredStudyBuddies.map(buddy => (
                  <div 
                    key={buddy.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex p-4">
                      <div className="mr-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full overflow-hidden">
                            <img 
                              src={buddy.image} 
                              alt={buddy.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-1 -right-1 bg-vimate-purple text-white text-xs rounded-full w-8 h-8 flex items-center justify-center">
                            {buddy.matchScore}%
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold">{buddy.name}</h3>
                        <p className="text-sm text-gray-600 mb-1">{buddy.major}, {buddy.year}</p>
                        
                        <p className="text-sm text-gray-700 mb-2">{buddy.bio}</p>
                        
                        <h4 className="text-xs font-medium text-gray-500 mb-1">Study subjects:</h4>
                        <div className="flex flex-wrap gap-1">
                          {buddy.subjects.map((subject, index) => (
                            <Badge 
                              key={index} 
                              variant="outline"
                              className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                            >
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t px-4 py-2 flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-vimate-purple text-vimate-purple hover:bg-vimate-purple/10"
                      >
                        Message
                      </Button>
                      
                      <Button
                        size="sm"
                        className="bg-vimate-purple hover:bg-vimate-purple-dark"
                      >
                        Connect
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Interests Tab */}
          <TabsContent value="interests" className="mt-0">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-medium text-gray-700">Select your interests</h2>
              {selectedInterests.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs"
                  onClick={() => setSelectedInterests([])}
                >
                  Clear ({selectedInterests.length})
                </Button>
              )}
            </div>
            
            <div className="space-y-6">
              {interestCategories.map((category, index) => (
                <div key={index}>
                  <h3 className="font-medium text-vimate-purple mb-2">{category.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.interests.map((interest, i) => (
                      <Badge 
                        key={i} 
                        variant={selectedInterests.includes(interest) ? "default" : "outline"}
                        className={cn(
                          "cursor-pointer",
                          selectedInterests.includes(interest)
                            ? "bg-vimate-purple hover:bg-vimate-purple-dark"
                            : "hover:bg-vimate-purple/10 text-gray-700"
                        )}
                        onClick={() => handleInterestToggle(interest)}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {selectedInterests.length > 0 && (
              <div className="mt-6">
                <Button className="w-full bg-vimate-purple hover:bg-vimate-purple-dark">
                  Find Matches with Similar Interests
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Explore;
