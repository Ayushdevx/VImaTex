import { Layout } from "@/components/layout/index";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import {
  Users,
  Calendar,
  MessageSquare,
  Star,
  Award,
  Tag,
  Image as ImageIcon,
  Filter,
  Search,
  Clock,
  User,
  Mail,
  Phone,
  Link as LinkIcon,
  Heart,
  BellPlus
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Clubs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMembership, setSelectedMembership] = useState("all");
  
  // Sample clubs data
  const clubs = [
    {
      id: 1,
      name: "Tech Innovators",
      description: "A club dedicated to exploring and creating innovative technological solutions. We organize workshops, hackathons, and collaborative projects.",
      category: "Technical",
      memberCount: 120,
      founded: "2018",
      meetings: "Every Tuesday, 5:00 PM",
      venue: "Tech Hub, Main Building",
      image: "https://placehold.co/600x400?text=Tech+Innovators",
      logo: "https://placehold.co/100x100?text=TI",
      president: "Alex Chen",
      email: "techinnovators@college.edu",
      phone: "+1234567890",
      website: "techinnovators.college.edu",
      social: {
        instagram: "@techinnovators",
        twitter: "@tech_innovators",
        linkedin: "techinnovators"
      },
      events: [
        {
          name: "Annual Hackathon",
          date: "2023-12-18"
        },
        {
          name: "AI Workshop",
          date: "2023-12-05"
        }
      ],
      achievements: [
        "1st place in National College Tech Competition 2022",
        "Best Innovation Award at University Tech Summit 2021"
      ],
      isMember: true,
      isAdmin: false,
      popularityScore: 9.2,
      tags: ["technology", "coding", "innovation", "AI", "hackathon"]
    },
    {
      id: 2,
      name: "Literary Circle",
      description: "A gathering of literature enthusiasts who share a passion for reading, writing, and discussing various literary works. We host book clubs, writing workshops, and poetry slams.",
      category: "Cultural",
      memberCount: 85,
      founded: "2015",
      meetings: "Every Friday, 4:00 PM",
      venue: "Library Conference Room",
      image: "https://placehold.co/600x400?text=Literary+Circle",
      logo: "https://placehold.co/100x100?text=LC",
      president: "Emily Johnson",
      email: "literarycircle@college.edu",
      phone: "+1987654321",
      website: "literarycircle.college.edu",
      social: {
        instagram: "@lit_circle",
        twitter: "@literary_circle",
        linkedin: "literarycircle"
      },
      events: [
        {
          name: "Poetry Night",
          date: "2023-12-08"
        },
        {
          name: "Book Launch",
          date: "2023-12-20"
        }
      ],
      achievements: [
        "Best Cultural Club Award 2021",
        "Published anthology of student works"
      ],
      isMember: false,
      isAdmin: false,
      popularityScore: 8.7,
      tags: ["literature", "writing", "poetry", "books", "creative"]
    },
    {
      id: 3,
      name: "Sports Club",
      description: "A club for sports enthusiasts to participate in various athletic activities, tournaments, and fitness events. We promote physical fitness and teamwork.",
      category: "Sports",
      memberCount: 150,
      founded: "2010",
      meetings: "Monday and Thursday, 6:00 PM",
      venue: "Sports Complex",
      image: "https://placehold.co/600x400?text=Sports+Club",
      logo: "https://placehold.co/100x100?text=SC",
      president: "Mike Wilson",
      email: "sportsclub@college.edu",
      phone: "+1122334455",
      website: "sportsclub.college.edu",
      social: {
        instagram: "@college_sports",
        twitter: "@college_sports",
        linkedin: "collegesportsclub"
      },
      events: [
        {
          name: "Inter-College Tournament",
          date: "2023-12-12"
        },
        {
          name: "Fitness Challenge",
          date: "2023-12-22"
        }
      ],
      achievements: [
        "University Cricket Champions 2022",
        "National Basketball Tournament Runners-up 2021"
      ],
      isMember: true,
      isAdmin: true,
      popularityScore: 9.5,
      tags: ["sports", "fitness", "cricket", "basketball", "athletics"]
    },
    {
      id: 4,
      name: "Art & Photography",
      description: "A club for art and photography enthusiasts to explore their creative talents. We organize exhibitions, workshops, and collaborative art projects.",
      category: "Creative",
      memberCount: 75,
      founded: "2017",
      meetings: "Wednesday, 5:30 PM",
      venue: "Art Studio, Creative Arts Building",
      image: "https://placehold.co/600x400?text=Art+Photography",
      logo: "https://placehold.co/100x100?text=A&P",
      president: "Sarah Lee",
      email: "artphoto@college.edu",
      phone: "+1567890123",
      website: "artphoto.college.edu",
      social: {
        instagram: "@art_photo_club",
        twitter: "@art_photo_club",
        linkedin: "artphotographyclub"
      },
      events: [
        {
          name: "Annual Exhibition",
          date: "2023-12-15"
        },
        {
          name: "Photography Workshop",
          date: "2023-12-03"
        }
      ],
      achievements: [
        "Best Creative Club 2022",
        "Featured in National Art Magazine"
      ],
      isMember: false,
      isAdmin: false,
      popularityScore: 8.9,
      tags: ["art", "photography", "creative", "exhibition", "visual"]
    },
    {
      id: 5,
      name: "Entrepreneurship Club",
      description: "A platform for aspiring entrepreneurs to learn, collaborate, and launch their startup ideas. We organize workshops, mentorship programs, and pitch competitions.",
      category: "Professional",
      memberCount: 95,
      founded: "2016",
      meetings: "Every Saturday, 3:00 PM",
      venue: "Business Center, Room 203",
      image: "https://placehold.co/600x400?text=Entrepreneurship+Club",
      logo: "https://placehold.co/100x100?text=EC",
      president: "David Kim",
      email: "entrepreneurship@college.edu",
      phone: "+1654321987",
      website: "entrclub.college.edu",
      social: {
        instagram: "@entr_club",
        twitter: "@entrepreneurship_club",
        linkedin: "entrepreneurshipclub"
      },
      events: [
        {
          name: "Startup Weekend",
          date: "2023-12-16"
        },
        {
          name: "Venture Capital Talk",
          date: "2023-12-07"
        }
      ],
      achievements: [
        "Launched 5 successful student startups",
        "Best Innovation Club 2021"
      ],
      isMember: true,
      isAdmin: false,
      popularityScore: 9.0,
      tags: ["entrepreneurship", "startup", "business", "innovation", "pitch"]
    }
  ];

  // Filter clubs based on search query and filters
  const filteredClubs = clubs.filter(club =>
    (club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
     club.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) &&
    (selectedCategory === "all" || club.category === selectedCategory) &&
    (selectedMembership === "all" || 
     (selectedMembership === "member" && club.isMember) ||
     (selectedMembership === "admin" && club.isAdmin) ||
     (selectedMembership === "non-member" && !club.isMember))
  );

  // Get unique categories for filter
  const categories = ["all", ...Array.from(new Set(clubs.map(club => club.category)))];

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Campus Clubs</h1>
          <div className="space-x-3">
            <Button variant="outline">Club Calendar</Button>
            <Button>Create Club</Button>
          </div>
        </div>

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
                <label className="text-sm font-medium">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Membership</label>
                <Select value={selectedMembership} onValueChange={setSelectedMembership}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Memberships" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="non-member">Not a Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                variant="ghost" 
                className="w-full"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedMembership("all");
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>

          <div className="md:col-span-3 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search clubs by name, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="space-y-4">
              {filteredClubs.length > 0 ? (
                filteredClubs.map((club) => (
                  <Card key={club.id} className="overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-1/3 h-48 md:h-auto bg-muted">
                        <img 
                          src={club.image} 
                          alt={club.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow p-6">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12 border">
                              <AvatarImage src={club.logo} alt={club.name} />
                              <AvatarFallback>{club.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-xl font-semibold">{club.name}</h2>
                                {club.isMember && (
                                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                                    Member
                                  </Badge>
                                )}
                                {club.isAdmin && (
                                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                    Admin
                                  </Badge>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center gap-2">
                                <Badge variant="outline" className="bg-primary/10">
                                  <Tag className="mr-1 h-3 w-3" />
                                  {club.category}
                                </Badge>
                                <Badge variant="outline" className="bg-primary/10">
                                  <Users className="mr-1 h-3 w-3" />
                                  {club.memberCount} members
                                </Badge>
                                <Badge variant="outline" className="bg-primary/10">
                                  <Star className="mr-1 h-3 w-3" />
                                  {club.popularityScore}/10
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-primary/10">
                              <Calendar className="mr-1 h-3 w-3" />
                              Est. {club.founded}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4">{club.description}</p>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {club.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-muted rounded-md text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                          <div>
                            <p className="font-medium">Contact Information</p>
                            <ul className="space-y-1 mt-1">
                              <li className="flex items-center gap-1">
                                <User className="h-3 w-3" /> {club.president} (President)
                              </li>
                              <li className="flex items-center gap-1">
                                <Mail className="h-3 w-3" /> {club.email}
                              </li>
                              <li className="flex items-center gap-1">
                                <Phone className="h-3 w-3" /> {club.phone}
                              </li>
                              <li className="flex items-center gap-1">
                                <LinkIcon className="h-3 w-3" /> {club.website}
                              </li>
                            </ul>
                          </div>
                          
                          <div>
                            <p className="font-medium">Upcoming Events</p>
                            <ul className="space-y-1 mt-1">
                              {club.events.map((event, index) => (
                                <li key={index} className="flex items-center justify-between">
                                  <span>{event.name}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {new Date(event.date).toLocaleDateString()}
                                  </Badge>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-3">
                          <div>
                            Meetings: {club.meetings} at {club.venue}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {club.isMember ? (
                              <Button variant="outline" size="sm">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Club Chat
                              </Button>
                            ) : (
                              <Button size="sm">
                                <Users className="mr-2 h-4 w-4" />
                                Join Club
                              </Button>
                            )}
                            <Button variant="secondary" size="sm">
                              <Calendar className="mr-2 h-4 w-4" />
                              View Events
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
                    <Users className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-lg">No clubs found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <Tabs defaultValue="popular">
          <TabsList>
            <TabsTrigger value="popular">Popular Clubs</TabsTrigger>
            <TabsTrigger value="my-clubs">My Clubs</TabsTrigger>
            <TabsTrigger value="achievements">Club Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="popular" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {clubs
                .sort((a, b) => b.popularityScore - a.popularityScore)
                .slice(0, 3)
                .map((club) => (
                  <Card key={club.id}>
                    <div className="w-full h-40 bg-muted">
                      <img 
                        src={club.image} 
                        alt={club.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="flex flex-row items-center gap-3">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={club.logo} alt={club.name} />
                        <AvatarFallback>{club.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{club.name}</CardTitle>
                        <CardDescription>{club.category}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">
                            <Users className="mr-1 h-3 w-3" />
                            {club.memberCount} members
                          </Badge>
                          <Badge variant="outline">
                            <Star className="mr-1 h-3 w-3" />
                            {club.popularityScore}/10
                          </Badge>
                        </div>
                        <p className="text-sm">{club.description.substring(0, 100)}...</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="ghost" size="sm">
                        <Heart className="mr-1 h-4 w-4" />
                        Favorite
                      </Button>
                      <Button size="sm">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="my-clubs" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {clubs
                .filter(club => club.isMember)
                .map((club) => (
                  <Card key={club.id}>
                    <div className="w-full h-40 bg-muted">
                      <img 
                        src={club.image} 
                        alt={club.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="flex flex-row items-center gap-3">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={club.logo} alt={club.name} />
                        <AvatarFallback>{club.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{club.name}</CardTitle>
                        <CardDescription>{club.category}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-sm">Next meeting:</p>
                          <div className="flex items-center mt-1 text-sm">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{club.meetings.split(',')[0]}</span>
                          </div>
                          <div className="flex items-start mt-1 text-sm">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{club.venue}</span>
                          </div>
                        </div>
                        
                        {club.events.length > 0 && (
                          <div>
                            <p className="font-medium text-sm">Upcoming event:</p>
                            <p className="text-sm mt-1">{club.events[0].name} ({new Date(club.events[0].date).toLocaleDateString()})</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="mr-1 h-4 w-4" />
                        Club Chat
                      </Button>
                      {club.isAdmin ? (
                        <Button size="sm">Manage</Button>
                      ) : (
                        <Button size="sm">View Details</Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              {clubs.filter(club => club.isMember).length === 0 && (
                <div className="col-span-3 text-center py-12">
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-lg">Not a member of any clubs</h3>
                  <p className="text-muted-foreground">Join clubs to connect with people who share your interests</p>
                  <Button className="mt-4">Browse Clubs</Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="achievements" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Club Achievements</CardTitle>
                <CardDescription>Recent accomplishments by campus clubs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {clubs.map((club) => (
                    <div key={club.id} className="flex items-start gap-4">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={club.logo} alt={club.name} />
                        <AvatarFallback>{club.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="font-medium">{club.name}</h3>
                        <ul className="space-y-1 text-sm">
                          {club.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Award className="h-4 w-4 text-yellow-500 mt-0.5" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Clubs; 