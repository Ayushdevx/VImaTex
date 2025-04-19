import { useState } from "react";
import { Layout } from "@/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VideoChat } from "@/components/VideoChat";
import {
  BookOpen,
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  Mic,
  MicOff,
  Monitor,
  MoreVertical,
  PanelRightOpen,
  Users,
  Video,
  VideoOff,
} from "lucide-react";

// Sample courses data
const courses = [
  {
    id: "CSE101",
    name: "Introduction to Computer Science",
    instructor: "Dr. Rajiv Mehta",
    schedule: "Mon, Wed, Fri 10:00 - 11:30 AM",
    status: "live",
    participants: 42,
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
  },
  {
    id: "MAT205",
    name: "Discrete Mathematics",
    instructor: "Dr. Priya Sharma",
    schedule: "Tue, Thu 2:00 - 3:30 PM",
    status: "upcoming",
    participants: 38,
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
  },
  {
    id: "PHY103",
    name: "Engineering Physics",
    instructor: "Dr. Sunil Kumar",
    schedule: "Mon, Wed 1:00 - 2:30 PM",
    status: "upcoming",
    participants: 45,
    thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
  },
  {
    id: "ENG201",
    name: "Technical Communication",
    instructor: "Prof. Anjali Desai",
    schedule: "Fri 3:00 - 4:30 PM",
    status: "upcoming",
    participants: 30,
    thumbnail: "https://images.unsplash.com/photo-1606326608690-4e0281b1e588?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
  },
];

// Sample class materials
const classMaterials = [
  {
    id: 1,
    title: "Introduction to Algorithms",
    type: "pdf",
    size: "2.4 MB",
    uploadedOn: "2 days ago",
  },
  {
    id: 2,
    title: "Week 3 - Data Structures",
    type: "ppt",
    size: "5.7 MB",
    uploadedOn: "1 week ago",
  },
  {
    id: 3,
    title: "Assignment 2 - Sorting Algorithms",
    type: "doc",
    size: "1.2 MB",
    uploadedOn: "3 days ago",
  },
  {
    id: 4,
    title: "Lecture Recording - Introduction to Recursion",
    type: "mp4",
    size: "45.8 MB",
    uploadedOn: "1 day ago",
  },
];

// Sample chat messages
const chatMessages = [
  {
    id: 1,
    sender: "Dr. Rajiv Mehta",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    message: "We'll start today's class with a review of sorting algorithms. Please open your textbooks to page 142.",
    time: "10:05 AM",
  },
  {
    id: 2,
    sender: "Aditya Patel",
    avatar: "",
    message: "Professor, could you explain merge sort one more time?",
    time: "10:12 AM",
  },
  {
    id: 3,
    sender: "Dr. Rajiv Mehta",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    message: "Sure, Aditya. Merge sort is a divide and conquer algorithm. Let me explain it step by step...",
    time: "10:15 AM",
  },
];

// Participants data
const participants = [
  {
    id: 1,
    name: "Dr. Rajiv Mehta",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    role: "Instructor",
    status: "presenting",
  },
  ...Array(41).fill(null).map((_, index) => ({
    id: index + 2,
    name: `Student ${index + 1}`,
    avatar: "",
    role: "Student",
    status: index < 5 ? "active" : "inactive",
  })),
];

const VirtualClassroom = () => {
  const [selectedCourse, setSelectedCourse] = useState("CSE101");
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [selectedTab, setSelectedTab] = useState("participants");
  
  const selectedCourseData = courses.find(course => course.id === selectedCourse);
  
  const handleSendMessage = () => {
    if (chatInput.trim() !== "") {
      // In a real app, this would add the message to the chat
      setChatInput("");
    }
  };
  
  return (
    <Layout>
      <div className="h-[calc(100vh-64px)] flex flex-col">
        {/* Course selection header */}
        <div className="bg-background border-b px-4 py-2">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(course => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="hidden md:block">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">Instructor:</span>
                  <span className="text-sm text-muted-foreground">{selectedCourseData?.instructor}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">Schedule:</span>
                  <span className="text-sm text-muted-foreground">{selectedCourseData?.schedule}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant={selectedCourseData?.status === "live" ? "destructive" : "outline"}>
                {selectedCourseData?.status === "live" ? "Live" : "Upcoming"}
              </Badge>
              
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{selectedCourseData?.participants}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex">
          {/* Video area */}
          <div className={`flex-1 bg-black relative ${showChat ? 'md:mr-[320px]' : ''}`}>
            {selectedCourseData?.status === "live" ? (
              <div className="h-full">
                <VideoChat />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <Card className="w-[480px] text-center">
                  <CardHeader>
                    <CardTitle>Class Not Started Yet</CardTitle>
                    <CardDescription>
                      The next session for {selectedCourseData?.name} will start at the scheduled time.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center gap-2 text-lg">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{selectedCourseData?.schedule}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button>
                      Set Reminder
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
            
            {/* Video controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex justify-center gap-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 border-white/20"
                  onClick={() => setVideoEnabled(!videoEnabled)}
                >
                  {videoEnabled ? <Video className="h-5 w-5 text-white" /> : <VideoOff className="h-5 w-5 text-white" />}
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 border-white/20"
                  onClick={() => setAudioEnabled(!audioEnabled)}
                >
                  {audioEnabled ? <Mic className="h-5 w-5 text-white" /> : <MicOff className="h-5 w-5 text-white" />}
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 border-white/20"
                  onClick={() => setShowChat(!showChat)}
                >
                  {showChat ? <PanelRightOpen className="h-5 w-5 text-white" /> : <MessageSquare className="h-5 w-5 text-white" />}
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 border-white/20"
                >
                  <Monitor className="h-5 w-5 text-white" />
                </Button>
                <Button variant="destructive" size="sm" className="rounded-full">
                  Leave Class
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right sidebar (chat, participants, materials) */}
          {showChat && (
            <div className="w-full md:w-[320px] h-full border-l absolute right-0 top-0 bottom-0 bg-background md:relative">
              <div className="flex flex-col h-full">
                <div className="border-b">
                  <Tabs defaultValue="chat" value={selectedTab} onValueChange={setSelectedTab}>
                    <TabsList className="w-full grid grid-cols-3">
                      <TabsTrigger value="chat">Chat</TabsTrigger>
                      <TabsTrigger value="participants">Participants</TabsTrigger>
                      <TabsTrigger value="materials">Materials</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  <TabsContent value="chat" className="h-full flex flex-col m-0">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {chatMessages.map((message) => (
                        <div key={message.id} className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            {message.avatar ? (
                              <AvatarImage src={message.avatar} alt={message.sender} />
                            ) : (
                              <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                            )}
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{message.sender}</span>
                              <span className="text-xs text-muted-foreground">{message.time}</span>
                            </div>
                            <p className="text-sm mt-1">{message.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Type a message..."
                          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSendMessage();
                            }
                          }}
                        />
                        <Button size="sm" onClick={handleSendMessage}>Send</Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="participants" className="m-0 p-0">
                    <div className="p-4 border-b">
                      <h3 className="font-medium">Participants ({participants.length})</h3>
                    </div>
                    <div className="divide-y">
                      {participants.slice(0, 10).map((participant) => (
                        <div key={participant.id} className="flex items-center justify-between p-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              {participant.avatar ? (
                                <AvatarImage src={participant.avatar} alt={participant.name} />
                              ) : (
                                <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                              )}
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium">{participant.name}</div>
                              <div className="text-xs text-muted-foreground">{participant.role}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {participant.status === "presenting" && (
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                Presenting
                              </Badge>
                            )}
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {participants.length > 10 && (
                        <div className="p-3 text-center text-sm text-muted-foreground">
                          +{participants.length - 10} more participants
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="materials" className="m-0 p-0">
                    <div className="p-4 border-b">
                      <h3 className="font-medium">Course Materials</h3>
                    </div>
                    <div className="divide-y">
                      {classMaterials.map((material) => (
                        <div key={material.id} className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="bg-muted rounded-md p-2">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium">{material.title}</div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="uppercase">{material.type}</span>
                                <span>•</span>
                                <span>{material.size}</span>
                                <span>•</span>
                                <span>{material.uploadedOn}</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4">
                      <Button variant="outline" className="w-full">
                        <BookOpen className="h-4 w-4 mr-2" />
                        All Course Materials
                      </Button>
                    </div>
                  </TabsContent>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default VirtualClassroom; 