import { useState } from "react";
import { UsersRound, MessageSquare, Filter, Plus, ArrowRight, User, Star, Search, ExternalLink } from "lucide-react";
import Header from "../components/layout/Header";
import { Layout } from "../components/layout/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import HostelFeeCard from "@/components/cards/HostelFeeCard";

// Roommate matching feature
// Using placeholder images from remote sources instead of local files
const ProfilePicture = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300";
const HostelImage = "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=300";

const BLOCK_FACILITIES = [
  "24/7 Security",
  "Common Room",
  "Water Cooler",
  "Washing Machine",
  "Shuttle Service",
  "High Speed Wifi",
  "Power Backup",
  "Housekeeping"
];

// Updated room data with accurate yearly pricing
const ROOM_DATA = [
  {
    id: '2bed-ac',
    name: '2-Bed AC Room',
    price: '₹1,24,200/year',
    image: HostelImage,
    availability: 120,
    facilities: ['Air Conditioned', 'Attached Bathroom', 'Study Table', 'Internet', 'Fridge (Shared)'],
    blocks: ['Men\'s Block - A, D, L', 'Women\'s Block - C, K, N']
  },
  {
    id: '3bed-non-ac',
    name: '3-Bed Non-AC Room',
    price: '₹1,07,400/year',
    image: HostelImage,
    availability: 250,
    facilities: ['Fan', 'Attached Bathroom', 'Study Table', 'Internet'],
    blocks: ['Men\'s Block - E, H', 'Women\'s Block - F, G, M']
  },
  {
    id: '3bed-ac',
    name: '3-Bed AC Room',
    price: '₹1,15,200/year',
    image: HostelImage,
    availability: 180,
    facilities: ['Air Conditioned', 'Attached Bathroom', 'Study Table', 'Internet'],
    blocks: ['Men\'s Block - B, J', 'Women\'s Block - I, O']
  },
  {
    id: '4bed-ac',
    name: '4-Bed AC Room',
    price: '₹94,200/year',
    image: HostelImage,
    availability: 300,
    facilities: ['Air Conditioned', 'Attached Bathroom', 'Study Table', 'Internet'],
    blocks: ['Men\'s Block - P, Q', 'Women\'s Block - R, S']
  },
  {
    id: '6bed-ac',
    name: '6-Bed AC Room',
    price: '₹79,000/year',
    image: HostelImage,
    availability: 150,
    facilities: ['Air Conditioned', 'Common Bathroom', 'Study Table', 'Internet'],
    blocks: ['Men\'s Block - T', 'Women\'s Block - U']
  }
];

// Updated mess data with accurate yearly pricing
const MESS_DATA = [
  {
    id: 'veg',
    name: 'Vegetarian Mess',
    price: '₹78,800/year',
    description: 'Pure vegetarian food with a variety of options including North and South Indian cuisine.',
    timings: '7:00 AM - 9:30 AM | 12:00 PM - 2:30 PM | 7:00 PM - 9:30 PM',
    blocks: ['Food Court 1', 'Food Court 2']
  },
  {
    id: 'non-veg',
    name: 'Non-Vegetarian Mess',
    price: '₹87,900/year',
    description: 'Serves both vegetarian and non-vegetarian dishes. Non-veg is served 4 times a week.',
    timings: '7:00 AM - 9:30 AM | 12:00 PM - 2:30 PM | 7:00 PM - 9:30 PM',
    blocks: ['Food Court 3', 'Food Court 4']
  },
  {
    id: 'special',
    name: 'Special Mess',
    price: '₹97,700/year',
    description: 'Premium food options with greater variety and special dishes served daily.',
    timings: '7:00 AM - 10:00 AM | 12:00 PM - 3:00 PM | 7:00 PM - 10:00 PM',
    blocks: ['Food Court 5']
  },
  {
    id: 'food-park',
    name: 'Food Park',
    price: '₹1,01,200/year',
    description: 'Multiple restaurant options with a credit system. Choose from various cuisines daily.',
    timings: '7:00 AM - 11:00 PM (Open throughout)',
    blocks: ['Main Food Park']
  }
];

const ROOMMATE_DATA = [
  {
    id: 1,
    name: 'Rahul Kumar',
    gender: 'Male',
    course: 'B.Tech CSE',
    year: '1st Year',
    hobbies: ['Reading', 'Gaming', 'Football'],
    sleepSchedule: 'Night Owl (11 PM - 7 AM)',
    cleanliness: 'Very Organized',
    studyHabits: 'Studies in Library',
    image: ProfilePicture,
    contactInfo: 'rahul.k2024@vitstudent.ac.in'
  },
  {
    id: 2,
    name: 'Aditya Sharma',
    gender: 'Male',
    course: 'B.Tech ECE',
    year: '1st Year',
    hobbies: ['Cricket', 'Music', 'Photography'],
    sleepSchedule: 'Early Bird (10 PM - 6 AM)',
    cleanliness: 'Moderately Organized',
    studyHabits: 'Studies in Room',
    image: ProfilePicture,
    contactInfo: 'aditya.s2024@vitstudent.ac.in'
  },
  {
    id: 3,
    name: 'Vikram Singh',
    gender: 'Male',
    course: 'B.Tech IT',
    year: '1st Year',
    hobbies: ['Swimming', 'Chess', 'Coding'],
    sleepSchedule: 'Night Owl (12 AM - 8 AM)',
    cleanliness: 'Very Organized',
    studyHabits: 'Studies in Common Room',
    image: ProfilePicture,
    contactInfo: 'vikram.s2024@vitstudent.ac.in'
  },
  {
    id: 4,
    name: 'Priya Patel',
    gender: 'Female',
    course: 'B.Tech CSE',
    year: '1st Year',
    hobbies: ['Dancing', 'Reading', 'Painting'],
    sleepSchedule: 'Early Bird (10 PM - 6 AM)',
    cleanliness: 'Very Organized',
    studyHabits: 'Studies in Room',
    image: ProfilePicture,
    contactInfo: 'priya.p2024@vitstudent.ac.in'
  }
];

export default function HostelGroups() {
  const [selectedTab, setSelectedTab] = useState("hostelRooms");
  const [searchTerm, setSearchTerm] = useState("");
  const [openRoomDetails, setOpenRoomDetails] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showFeeStructure, setShowFeeStructure] = useState(false);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setOpenRoomDetails(true);
  };

  const handleCloseRoomDetails = () => {
    setOpenRoomDetails(false);
  };

  const toggleFeeStructure = () => {
    setShowFeeStructure(!showFeeStructure);
  };

  const filteredRooms = ROOM_DATA.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.blocks.some(block => block.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredMess = MESS_DATA.filter(mess =>
    mess.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mess.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mess.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRoommates = ROOMMATE_DATA.filter(roommate =>
    roommate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    roommate.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    roommate.hobbies.some(hobby => hobby.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="pt-16 pb-8 px-4 max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-vimate-purple to-vimate-orange bg-clip-text text-transparent mb-2">
              VIT Chennai Hostel & Accommodation
            </h1>
            <p className="text-muted-foreground mb-4">
              Explore hostel options, mess facilities, and find compatible roommates for the upcoming academic session.
            </p>
            <Button 
              variant="default"
              className="mr-2"
              onClick={toggleFeeStructure}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              {showFeeStructure ? "Hide Fee Structure" : "View Fee Structure"}
            </Button>
          </div>

          {showFeeStructure && (
            <div className="mb-8">
              <HostelFeeCard />
            </div>
          )}
          
          <Tabs defaultValue="hostelRooms" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="hostelRooms">Hostel Rooms</TabsTrigger>
              <TabsTrigger value="messOptions">Mess Options</TabsTrigger>
              <TabsTrigger value="findRoommate">Find Roommate</TabsTrigger>
            </TabsList>
            
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <TabsContent value="hostelRooms">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.map((room) => (
                  <Card 
                    key={room.id}
                    className="hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => handleRoomClick(room)}
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <CardTitle className="text-lg mb-1">{room.name}</CardTitle>
                      <div className="text-vimate-purple font-medium mb-2">{room.price}</div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Available in: {room.blocks.join(', ')}
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        {room.availability} rooms available
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {room.facilities.slice(0, 3).map((facility, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                        {room.facilities.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{room.facilities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="messOptions">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredMess.map((mess) => (
                  <Card key={mess.id}>
                    <CardHeader>
                      <CardTitle>{mess.name}</CardTitle>
                      <CardDescription>{mess.price}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {mess.description}
                      </p>
                      <div className="text-sm mb-2">
                        <strong>Timings:</strong> {mess.timings}
                      </div>
                      <div className="text-sm">
                        <strong>Location:</strong> {mess.blocks.join(', ')}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="findRoommate">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredRoommates.map((roommate) => (
                  <Card key={roommate.id}>
                    <div className="p-4 flex flex-col items-center">
                      <Avatar className="h-20 w-20 mb-3">
                        <AvatarImage src={roommate.image} alt={roommate.name} />
                        <AvatarFallback>{roommate.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-medium text-center">{roommate.name}</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        {roommate.course}, {roommate.year}
                      </p>
                    </div>
                    <Separator />
                    <CardContent className="pt-4">
                      <div className="text-sm mb-2">
                        <strong>Hobbies:</strong> {roommate.hobbies.join(', ')}
                      </div>
                      <div className="text-sm mb-2">
                        <strong>Sleep Schedule:</strong> {roommate.sleepSchedule}
                      </div>
                      <div className="text-sm mb-2">
                        <strong>Cleanliness:</strong> {roommate.cleanliness}
                      </div>
                      <div className="text-sm mb-2">
                        <strong>Study Habits:</strong> {roommate.studyHabits}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => window.location.href = `mailto:${roommate.contactInfo}`}
                      >
                        Contact
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>

        <Dialog open={openRoomDetails} onOpenChange={setOpenRoomDetails}>
          {selectedRoom && (
            <>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{selectedRoom.name}</DialogTitle>
                  <DialogDescription>{selectedRoom.price}</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={selectedRoom.image}
                      alt={selectedRoom.name}
                      className="w-full h-auto rounded-md mb-4"
                    />
                    <h3 className="font-medium mb-2">Available in:</h3>
                    <p className="text-muted-foreground mb-4">{selectedRoom.blocks.join(', ')}</p>
                    <h3 className="font-medium mb-2">Room Facilities:</h3>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {selectedRoom.facilities.map((facility, index) => (
                        <Badge key={index} variant="outline">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Block Facilities</h3>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {BLOCK_FACILITIES.map((facility, index) => (
                        <Badge key={index} variant="outline">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="font-medium mb-2">Availability:</h3>
                    <p className="text-muted-foreground mb-4">{selectedRoom.availability} rooms available</p>
                    <Alert className="mt-4">
                      <AlertTitle>Important Note</AlertTitle>
                      <AlertDescription>
                        Hostel allotment is based on first-come, first-served basis. Book early to secure your preferred accommodation.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={handleCloseRoomDetails}>
                    Close
                  </Button>
                  <Button>
                    Apply for Room
                  </Button>
                </DialogFooter>
              </DialogContent>
            </>
          )}
        </Dialog>
      </div>
    </Layout>
  );
}
