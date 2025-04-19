import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { 
  MapPin, Calendar as CalendarIcon, Clock, Users, DollarSign,
  Share, ThumbsUp, MessageSquare, Car, UtensilsCrossed, Tent,
  Film, Coffee, Map, Compass
} from "lucide-react";

const OutingPlan = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Sample outings data
  const outings = [
    {
      id: 1,
      title: "Weekend Trek to Sunset Peak",
      category: "adventure",
      location: "Sunset Peak, 25km from campus",
      date: "2023-12-17",
      time: "7:00 AM - 6:00 PM",
      organizer: "Mountain Explorers Club",
      description: "A day-long trek to Sunset Peak with amazing views. Moderate difficulty level, suitable for beginners with good fitness level.",
      costEstimate: "₹500 (transport + snacks)",
      participantsLimit: 20,
      currentParticipants: 14,
      participants: [
        { name: "Alex Johnson", avatar: "/avatars/alex.jpg" },
        { name: "Sophia Williams", avatar: "/avatars/sophia.jpg" },
        { name: "Michael Chen", avatar: "/avatars/michael.jpg" },
        { name: "Emma Rodriguez", avatar: "/avatars/emma.jpg" },
      ],
      likes: 32,
      comments: 17,
      requiresPermission: true,
      transportation: "Bus (arranged)",
      itemsToCarry: ["Comfortable shoes", "Water bottle", "Snacks", "Hat/Cap", "Sunscreen"],
    },
    {
      id: 2,
      title: "City Museum Visit",
      category: "cultural",
      location: "City Museum of Art & History, Downtown",
      date: "2023-12-18",
      time: "1:00 PM - 4:00 PM",
      organizer: "Arts & Culture Society",
      description: "Visit to the newly renovated wing of the City Museum featuring modern art installations. Student discounts available with ID.",
      costEstimate: "₹200 (entry ticket)",
      participantsLimit: 15,
      currentParticipants: 8,
      participants: [
        { name: "James Lee", avatar: "/avatars/james.jpg" },
        { name: "Emma Rodriguez", avatar: "/avatars/emma.jpg" },
      ],
      likes: 18,
      comments: 7,
      requiresPermission: false,
      transportation: "Public Transport / Carpooling",
      itemsToCarry: ["Student ID", "Notebook (optional)", "Camera (optional)"],
    },
    {
      id: 3,
      title: "Food Festival Exploration",
      category: "food",
      location: "City Center Plaza",
      date: "2023-12-16",
      time: "5:00 PM - 9:00 PM",
      organizer: "Foodies Club",
      description: "Explore the annual International Food Festival at City Center. Try cuisines from around the world at student-friendly prices.",
      costEstimate: "₹600-800 (food expenses)",
      participantsLimit: 12,
      currentParticipants: 12,
      participants: [
        { name: "Michael Chen", avatar: "/avatars/michael.jpg" },
        { name: "Emma Rodriguez", avatar: "/avatars/emma.jpg" },
        { name: "James Lee", avatar: "/avatars/james.jpg" },
      ],
      likes: 45,
      comments: 23,
      requiresPermission: false,
      transportation: "Metro (15 min walk from station)",
      itemsToCarry: ["Cash/Cards", "Water bottle", "Hand sanitizer"],
    },
    {
      id: 4,
      title: "Movie Night: Latest Blockbuster",
      category: "entertainment",
      location: "CineMax Theater, Central Mall",
      date: "2023-12-15",
      time: "7:00 PM - 10:00 PM",
      organizer: "Film Enthusiasts",
      description: "Group booking for the latest blockbuster movie. Special student discount negotiated for our group.",
      costEstimate: "₹300 (ticket + popcorn combo)",
      participantsLimit: 15,
      currentParticipants: 10,
      participants: [
        { name: "Alex Johnson", avatar: "/avatars/alex.jpg" },
        { name: "Sophia Williams", avatar: "/avatars/sophia.jpg" },
      ],
      likes: 28,
      comments: 15,
      requiresPermission: false,
      transportation: "Public Transport / Carpooling",
      itemsToCarry: ["Student ID", "Booking confirmation"],
    },
    {
      id: 5,
      title: "Overnight Camping Trip",
      category: "adventure",
      location: "Lakeside Campground, 40km from campus",
      date: "2023-12-23",
      time: "2:00 PM - Next day 12:00 PM",
      organizer: "Adventure Society",
      description: "Overnight camping by the lakeside with bonfire, stargazing, and group activities. Tents and basic equipment provided.",
      costEstimate: "₹1200 (transport, equipment, food)",
      participantsLimit: 25,
      currentParticipants: 18,
      participants: [
        { name: "James Lee", avatar: "/avatars/james.jpg" },
        { name: "Alex Johnson", avatar: "/avatars/alex.jpg" },
        { name: "Sophia Williams", avatar: "/avatars/sophia.jpg" },
      ],
      likes: 52,
      comments: 31,
      requiresPermission: true,
      transportation: "Bus (arranged)",
      itemsToCarry: ["Sleeping bag", "Warm clothes", "Toiletries", "Flashlight", "Insect repellent"],
    },
  ];

  // Filter outings based on category and date
  const filteredOutings = outings.filter(outing => 
    (selectedCategory === "all" || outing.category === selectedCategory) &&
    (!selectedDate || new Date(outing.date).toDateString() === selectedDate.toDateString())
  );

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "adventure":
        return <Compass className="h-4 w-4" />;
      case "cultural":
        return <Map className="h-4 w-4" />;
      case "food":
        return <UtensilsCrossed className="h-4 w-4" />;
      case "entertainment":
        return <Film className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "adventure":
        return "bg-green-500";
      case "cultural":
        return "bg-purple-500";
      case "food":
        return "bg-red-500";
      case "entertainment":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  // Upcoming events this week
  const upcomingEvents = outings
    .filter(outing => {
      const eventDate = new Date(outing.date);
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      return eventDate >= today && eventDate <= nextWeek;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Outing Planner</h1>
          <div className="space-x-3">
            <Button variant="outline">Join Group</Button>
            <Button>Plan New Outing</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Find the perfect outing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category-select">Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="food">Food & Dining</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
              
              <Button 
                variant="ghost" 
                className="w-full"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedDate(undefined);
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Upcoming This Week</CardTitle>
              <CardDescription>Events happening in the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className={`w-2 h-12 rounded-full ${getCategoryColor(event.category)}`}></div>
                      <div className="flex-1">
                        <h3 className="font-medium">{event.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarIcon className="mr-1 h-3 w-3" />
                          <span>{formatDate(event.date)}</span>
                          <span className="mx-2">•</span>
                          <Clock className="mr-1 h-3 w-3" />
                          <span>{event.time.split(' - ')[0]}</span>
                        </div>
                      </div>
                      <Badge className={getCategoryColor(event.category)}>
                        {getCategoryIcon(event.category)}
                        <span className="ml-1">{event.category}</span>
                      </Badge>
                      <div className="flex -space-x-2">
                        {event.participants.slice(0, 3).map((participant, index) => (
                          <Avatar key={index} className="h-8 w-8 border-2 border-background">
                            <AvatarFallback>{participant.name.split(' ')[0][0]}</AvatarFallback>
                          </Avatar>
                        ))}
                        {event.currentParticipants > 3 && (
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center border-2 border-background text-xs">
                            +{event.currentParticipants - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No upcoming events this week
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="browse">
          <TabsList>
            <TabsTrigger value="browse">Browse Outings</TabsTrigger>
            <TabsTrigger value="my-outings">My Outings</TabsTrigger>
            <TabsTrigger value="plan">Plan Outing</TabsTrigger>
          </TabsList>
          
          {/* Browse Outings Tab */}
          <TabsContent value="browse" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              {filteredOutings.length > 0 ? (
                filteredOutings.map((outing) => (
                  <Card key={outing.id} className="overflow-hidden">
                    <div className="md:flex">
                      <div className={`h-2 md:h-auto md:w-2 ${getCategoryColor(outing.category)}`}></div>
                      <div className="flex-grow p-6">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h2 className="text-xl font-bold">{outing.title}</h2>
                              <Badge className={getCategoryColor(outing.category)}>
                                {getCategoryIcon(outing.category)}
                                <span className="ml-1 capitalize">{outing.category}</span>
                              </Badge>
                            </div>
                            <p className="text-muted-foreground">{outing.organizer}</p>
                          </div>
                          <div className="flex flex-col gap-1 text-sm">
                            <div className="flex items-center">
                              <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{formatDate(outing.date)}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{outing.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{outing.location}</span>
                            </div>
                          </div>
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="md:col-span-2">
                            <p className="text-sm mb-4">{outing.description}</p>
                            
                            <div className="space-y-3">
                              <div className="flex items-center">
                                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{outing.costEstimate}</span>
                              </div>
                              <div className="flex items-center">
                                <Car className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{outing.transportation}</span>
                              </div>
                              
                              {outing.requiresPermission && (
                                <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                                  Requires permission/registration
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">What to Carry</h4>
                            <ul className="text-sm list-disc list-inside space-y-1">
                              {outing.itemsToCarry.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{outing.currentParticipants}/{outing.participantsLimit} participants</span>
                            
                            <div className="ml-4 flex -space-x-2">
                              {outing.participants.map((participant, index) => (
                                <Avatar key={index} className="h-8 w-8 border-2 border-background">
                                  <AvatarFallback>{participant.name.split(' ')[0][0]}</AvatarFallback>
                                </Avatar>
                              ))}
                              {outing.currentParticipants > 4 && (
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center border-2 border-background text-xs">
                                  +{outing.currentParticipants - 4}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              <ThumbsUp className="mr-1 h-4 w-4" />
                              <span>{outing.likes}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              <MessageSquare className="mr-1 h-4 w-4" />
                              <span>{outing.comments}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              <Share className="mr-1 h-4 w-4" />
                              <span>Share</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardFooter className="bg-muted/30 flex justify-end p-4">
                      <div className="space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          disabled={outing.currentParticipants >= outing.participantsLimit}
                        >
                          {outing.currentParticipants >= outing.participantsLimit ? "Full" : "Join"}
                        </Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-lg">No outings found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or create a new outing</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* My Outings Tab */}
          <TabsContent value="my-outings" className="mt-6">
            <div className="text-center py-12">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg">You haven't joined any outings yet</h3>
              <p className="text-muted-foreground mb-4">Browse available outings and join one that interests you</p>
              <Button>Browse Outings</Button>
            </div>
          </TabsContent>
          
          {/* Plan Outing Tab */}
          <TabsContent value="plan" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Plan a New Outing</CardTitle>
                <CardDescription>Create an outing and invite others to join</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" placeholder="Enter a descriptive title" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="adventure">Adventure</SelectItem>
                          <SelectItem value="cultural">Cultural</SelectItem>
                          <SelectItem value="food">Food & Dining</SelectItem>
                          <SelectItem value="entertainment">Entertainment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe the outing, activities involved, and any other relevant details"
                      rows={4}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Calendar
                        mode="single"
                        className="rounded-md border"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="Start time" />
                        <Input placeholder="End time" />
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="Enter the location" />
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <Label htmlFor="cost">Estimated Cost</Label>
                        <Input id="cost" placeholder="e.g., ₹500 per person" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="participants">Maximum Participants</Label>
                        <Input 
                          id="participants" 
                          type="number"
                          min={1}
                          placeholder="Max number of participants" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="transportation">Transportation</Label>
                        <Input id="transportation" placeholder="How will participants get there?" />
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-4">
                        <Switch id="permission" />
                        <Label htmlFor="permission">Requires permission/registration</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="items">Items to Carry (one per line)</Label>
                    <Textarea 
                      id="items" 
                      placeholder="List items that participants should bring"
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline">Save as Draft</Button>
                <Button>Create Outing</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default OutingPlan; 