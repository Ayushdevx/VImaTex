import { Layout } from "@/components/layout/index";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Tag,
  Star,
  ThumbsUp,
  Share,
  Bell,
  Filter,
  Search,
  Ticket,
  Bookmark
} from "lucide-react";

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDate, setSelectedDate] = useState("all");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load events data
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    
    // Sample events data
    const sampleEvents = [
      {
        id: 1,
        title: "Tech Summit 2023",
        description: "Join us for the annual Tech Summit featuring industry leaders and innovative tech showcases.",
        date: "2023-11-25",
        time: "10:00 AM - 6:00 PM",
        location: "Main Auditorium",
        category: "Technical",
        organizer: "Computer Science Department",
        attendees: 250,
        image: "https://placehold.co/600x400?text=Tech+Summit",
        isRegistered: false,
        isSaved: false,
        isInterested: false,
        registrationDeadline: "2023-11-20",
        tags: ["technology", "seminar", "networking"],
        isFeatured: true
      },
      {
        id: 2,
        title: "Cultural Night",
        description: "A night of dance, music, and cultural performances by students from different backgrounds.",
        date: "2023-12-10",
        time: "7:00 PM - 10:00 PM",
        location: "Amphitheater",
        category: "Cultural",
        organizer: "Cultural Committee",
        attendees: 500,
        image: "https://placehold.co/600x400?text=Cultural+Night",
        isRegistered: true,
        isSaved: true,
        isInterested: true,
        registrationDeadline: "2023-12-05",
        tags: ["cultural", "performance", "entertainment"],
        isFeatured: true
      },
      {
        id: 3,
        title: "Career Fair",
        description: "Meet recruiters from top companies and explore job and internship opportunities.",
        date: "2023-11-30",
        time: "9:00 AM - 4:00 PM",
        location: "Convention Center",
        category: "Career",
        organizer: "Placement Cell",
        attendees: 600,
        image: "https://placehold.co/600x400?text=Career+Fair",
        isRegistered: false,
        isSaved: false,
        isInterested: false,
        registrationDeadline: "2023-11-28",
        tags: ["career", "jobs", "networking"],
        isFeatured: false
      },
      {
        id: 4,
        title: "Sports Tournament",
        description: "Annual inter-department sports competition featuring cricket, football, volleyball, and athletics.",
        date: "2023-12-15",
        time: "8:00 AM - 6:00 PM",
        location: "Sports Complex",
        category: "Sports",
        organizer: "Sports Committee",
        attendees: 350,
        image: "https://placehold.co/600x400?text=Sports+Tournament",
        isRegistered: false,
        isSaved: false,
        isInterested: false,
        registrationDeadline: "2023-12-10",
        tags: ["sports", "competition", "fitness"],
        isFeatured: false
      },
      {
        id: 5,
        title: "Workshop on AI",
        description: "Hands-on workshop on artificial intelligence and machine learning applications.",
        date: "2023-11-28",
        time: "2:00 PM - 5:00 PM",
        location: "Computer Lab 3",
        category: "Technical",
        organizer: "AI Research Club",
        attendees: 80,
        image: "https://placehold.co/600x400?text=AI+Workshop",
        isRegistered: true,
        isSaved: true,
        isInterested: true,
        registrationDeadline: "2023-11-26",
        tags: ["AI", "workshop", "technology"],
        isFeatured: false
      }
    ];
    
    setTimeout(() => {
      setEvents(sampleEvents);
      setLoading(false);
    }, 500);
  }, []);

  // Filter events based on search query and filters
  const filteredEvents = events.filter(event =>
    (event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
     event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) &&
    (selectedCategory === "all" || event.category === selectedCategory) &&
    (selectedDate === "all" || 
     (selectedDate === "today" && new Date(event.date).toDateString() === new Date().toDateString()) ||
     (selectedDate === "this-week" && isWithinThisWeek(new Date(event.date))) ||
     (selectedDate === "this-month" && isWithinThisMonth(new Date(event.date))))
  );

  // Helper function to check if date is within current week
  function isWithinThisWeek(date) {
    const now = new Date();
    const firstDay = new Date(now.setDate(now.getDate() - now.getDay()));
    const lastDay = new Date(now.setDate(now.getDate() + 6));
    return date >= firstDay && date <= lastDay;
  }

  // Helper function to check if date is within current month
  function isWithinThisMonth(date) {
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }

  // Get unique categories for filter
  const categories = ["all", ...Array.from(new Set(events.map(event => event.category)))];

  // Handle registration
  const handleRegistration = (eventId) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        const updated = {...event, isRegistered: !event.isRegistered};
        
        if (updated.isRegistered) {
          toast({
            title: "Successfully Registered",
            description: `You have registered for ${event.title}`,
          });
          // Increment attendee count
          updated.attendees += 1;
        } else {
          toast({
            title: "Registration Cancelled",
            description: `You have cancelled your registration for ${event.title}`,
          });
          // Decrement attendee count
          updated.attendees -= 1;
        }
        
        return updated;
      }
      return event;
    }));
  };

  // Handle save/bookmark
  const handleSaveEvent = (eventId) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        const updated = {...event, isSaved: !event.isSaved};
        
        if (updated.isSaved) {
          toast({
            title: "Event Saved",
            description: `${event.title} has been added to your saved events`,
          });
        } else {
          toast({
            title: "Event Removed",
            description: `${event.title} has been removed from your saved events`,
          });
        }
        
        return updated;
      }
      return event;
    }));
  };

  // Handle interested
  const handleInterested = (eventId) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        return {...event, isInterested: !event.isInterested};
      }
      return event;
    }));
  };

  // Handle set reminder
  const handleSetReminder = (event) => {
    toast({
      title: "Reminder Set",
      description: `We'll remind you about ${event.title} on ${new Date(event.date).toLocaleDateString()}`,
    });
  };

  // Handle create event
  const handleCreateEvent = () => {
    toast({
      title: "Create Event",
      description: "Event creation form will open",
    });
  };

  // Handle share
  const handleShare = (event) => {
    toast({
      title: "Share Event",
      description: `Share options for ${event.title} will appear`,
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-20 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Campus Events</h1>
          <div className="space-x-3">
            <Button variant="outline">My Calendar</Button>
            <Button onClick={handleCreateEvent}>Create Event</Button>
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
                <label className="text-sm font-medium">Date</label>
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Dates" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dates</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                variant="ghost" 
                className="w-full"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedDate("all");
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
                placeholder="Search events by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="space-y-4">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-1/3 h-48 md:h-auto bg-muted">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow p-6">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h2 className="text-xl font-semibold">{event.title}</h2>
                              {event.isFeatured && (
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="outline" className="bg-primary/10">
                                <Calendar className="mr-1 h-3 w-3" />
                                {new Date(event.date).toLocaleDateString()}
                              </Badge>
                              <Badge variant="outline" className="bg-primary/10">
                                <Clock className="mr-1 h-3 w-3" />
                                {event.time}
                              </Badge>
                              <Badge variant="outline" className="bg-primary/10">
                                <MapPin className="mr-1 h-3 w-3" />
                                {event.location}
                              </Badge>
                              <Badge variant="outline" className="bg-primary/10">
                                <Tag className="mr-1 h-3 w-3" />
                                {event.category}
                              </Badge>
                            </div>
                          </div>
                          <div>
                            <Badge variant="outline">
                              <Users className="mr-1 h-3 w-3" />
                              {event.attendees} attending
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {event.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-muted rounded-md text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-3">
                          <div>
                            Organized by {event.organizer}
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className={`${event.isInterested ? "text-primary" : "text-muted-foreground"}`}
                              onClick={() => handleInterested(event.id)}
                            >
                              <ThumbsUp className="mr-1 h-4 w-4" />
                              <span>Interested</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-muted-foreground"
                              onClick={() => handleShare(event)}
                            >
                              <Share className="mr-1 h-4 w-4" />
                              <span>Share</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardFooter className="bg-muted/30 flex justify-between p-4">
                      <div className="text-sm">
                        Registration deadline: {new Date(event.registrationDeadline).toLocaleDateString()}
                      </div>
                      <div className="space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSetReminder(event)}
                        >
                          <Bell className="mr-2 h-4 w-4" />
                          Remind Me
                        </Button>
                        {event.isRegistered ? (
                          <Button 
                            size="sm" 
                            variant="secondary"
                            onClick={() => handleRegistration(event.id)}
                          >
                            <Ticket className="mr-2 h-4 w-4" />
                            Registered
                          </Button>
                        ) : (
                          <Button 
                            size="sm"
                            onClick={() => handleRegistration(event.id)}
                          >
                            <Ticket className="mr-2 h-4 w-4" />
                            Register
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-lg">No events found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="featured">Featured Events</TabsTrigger>
            <TabsTrigger value="my-events">My Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events
                .filter(event => new Date(event.date) > new Date())
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 3)
                .map((event) => (
                  <Card key={event.id}>
                    <div className="w-full h-40 bg-muted">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription>{new Date(event.date).toLocaleDateString()} • {event.time}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Badge variant="outline">
                          <MapPin className="mr-1 h-3 w-3" />
                          {event.location}
                        </Badge>
                        <p className="text-sm">{event.description.substring(0, 100)}...</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button 
                        variant={event.isSaved ? "default" : "ghost"} 
                        size="sm"
                        onClick={() => handleSaveEvent(event.id)}
                      >
                        <Bookmark className="mr-1 h-4 w-4" />
                        {event.isSaved ? "Saved" : "Save"}
                      </Button>
                      <Button size="sm">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="featured" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events
                .filter(event => event.isFeatured)
                .map((event) => (
                  <Card key={event.id}>
                    <div className="w-full h-40 bg-muted">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription>{new Date(event.date).toLocaleDateString()} • {event.time}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          Featured
                        </Badge>
                        <p className="text-sm">{event.description.substring(0, 100)}...</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        {event.attendees} attending
                      </div>
                      <Button size="sm">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="my-events" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events
                .filter(event => event.isRegistered)
                .map((event) => (
                  <Card key={event.id}>
                    <div className="w-full h-40 bg-muted">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription>{new Date(event.date).toLocaleDateString()} • {event.time}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Registered
                        </Badge>
                        <p className="text-sm">{event.description.substring(0, 100)}...</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">Calendar</Button>
                      <Button size="sm">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              {events.filter(event => event.isRegistered).length === 0 && (
                <div className="col-span-3 text-center py-12">
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Ticket className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-lg">No registered events</h3>
                  <p className="text-muted-foreground">You haven't registered for any events yet</p>
                  <Button className="mt-4">Browse Events</Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Events; 