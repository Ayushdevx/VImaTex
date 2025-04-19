import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Search,
  Filter,
  Users,
  School,
  MapPin,
  Building,
  Star,
  Plus,
  Globe,
  Award,
  BookOpen,
  Heart,
  MessageSquare,
  ChevronUp,
  ChevronDown,
  X,
  Send,
  CheckCircle2,
  Mail,
  Phone,
  Paperclip,
  Image,
  File,
  Smile,
  Mic,
  Video,
  MoreHorizontal,
  Info,
  Flag,
  Volume2,
  VolumeX,
  Download,
  Check,
  CheckCheck,
  Clock,
  Camera
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Header from "@/components/layout/Header";
import { useUser } from "@clerk/clerk-react";

// Sample collage data
const collages = [
  {
    id: 1,
    name: "VIT Vellore",
    logo: "https://placehold.co/100?text=VIT",
    image: "https://placehold.co/600x400?text=VIT+Vellore",
    location: "Vellore, Tamil Nadu, India",
    establishedYear: 1984,
    type: "Private university",
    description: "Vellore Institute of Technology (VIT) is a prestigious private university located in Vellore, Tamil Nadu, India. It consistently ranks among the top engineering institutions in India, known for its academic excellence and globally recognized programs.",
    popularityScore: 9.0,
    rating: 4.5,
    courses: ["Computer Science & Engineering", "Electronics & Communication", "Mechanical Engineering", "Biotechnology", "Information Technology", "Civil Engineering", "Electrical Engineering", "Chemical Engineering", "Computer Science with specialization in AI & ML", "Data Science"],
    achievements: [
      "NAAC 'A++' accreditation with a score of 3.66 out of 4",
      "Ranked among top engineering institutions in India by NIRF",
      "Strong industry connections with 100% placement record for eligible students",
      "QS 5-star rated institution for excellence in teaching",
      "Over 200+ patents filed by faculty and students",
      "Recognized as Institution of Eminence by UGC"
    ],
    fees: {
      btech: "₹9,00,000 for 4-year B.Tech program",
      mtech: "₹4,50,000 for 2-year M.Tech program",
      phd: "₹3,00,000 for full Ph.D program",
      mba: "₹12,00,000 for 2-year MBA program"
    },
    academicCalendar: {
      fallSemester: {
        start: "July 15, 2023",
        end: "November 30, 2023",
        exams: "December 1-15, 2023"
      },
      winterSemester: {
        start: "January 2, 2024",
        end: "April 30, 2024",
        exams: "May 1-15, 2024"
      },
      summerTerm: {
        start: "May 20, 2024",
        end: "July 5, 2024"
      }
    },
    admissionDates: {
      viteeApplicationStart: "November 30, 2023",
      viteeApplicationEnd: "March 31, 2024",
      viteeExamDate: "April 15-30, 2024",
      resultsAnnouncement: "May 10, 2024",
      counsellingStart: "May 20, 2024"
    },
    placements: {
      topRecruiters: ["Microsoft", "Amazon", "Google", "Goldman Sachs", "Adobe", "IBM", "Deloitte", "Oracle"],
      averagePackage: "₹8.5 LPA",
      highestPackage: "₹45 LPA",
      placementPercentage: 98.5
    },
    facilities: [
      {
        name: "Technology Tower",
        description: "Modern academic building with state-of-the-art classrooms and laboratories",
        image: "https://placehold.co/300x200?text=Technology+Tower"
      },
      {
        name: "Central Library",
        description: "Houses over 1.5 million books, journals and digital resources",
        image: "https://placehold.co/300x200?text=Central+Library"
      },
      {
        name: "Sports Complex",
        description: "Olympic-sized swimming pool, indoor courts, and athletic tracks",
        image: "https://placehold.co/300x200?text=Sports+Complex"
      },
      {
        name: "Hostels",
        description: "Air-conditioned accommodation with modern amenities",
        image: "https://placehold.co/300x200?text=VIT+Hostels"
      },
      {
        name: "Innovation Center",
        description: "Cutting-edge research labs and startup incubation facilities",
        image: "https://placehold.co/300x200?text=Innovation+Center"
      }
    ],
    website: "https://vit.ac.in",
    contactInfo: "admission@vit.ac.in | +91-416-2202168",
    socialMedia: {
      facebook: "https://facebook.com/VIT.University",
      twitter: "https://twitter.com/VIT_univ",
      instagram: "https://instagram.com/vellore_vit",
      linkedin: "https://linkedin.com/school/vellore-institute-of-technology"
    },
    facilityHighlights: ["Technology Tower", "Central Library", "Air-conditioned Hostels", "World-class Sports Facilities", "Innovation Center", "Amphitheater", "Research Labs"],
    admissionRequirements: "VITEEE entrance exam, Strong academic record in 12th grade with at least 60% marks in PCM",
    reviews: [
      {
        id: 1,
        user: "Rajesh K.",
        rating: 4.8,
        date: "October 10, 2023",
        comment: "Excellent infrastructure and faculty. The campus is beautiful and well-maintained."
      },
      {
        id: 2,
        user: "Priya S.",
        rating: 4.5,
        date: "September 5, 2023",
        comment: "Great placement opportunities. The curriculum is industry-focused and practical."
      },
      {
        id: 3,
        user: "Amit D.",
        rating: 4.6,
        date: "August 22, 2023",
        comment: "Amazing research facilities. Faculty are supportive and knowledgeable."
      }
    ],
    faq: [
      {
        question: "What is the admission process for B.Tech programs?",
        answer: "Admission to B.Tech programs is through the VITEEE entrance exam. Applications open in November and close by March end."
      },
      {
        question: "Is hostel accommodation mandatory?",
        answer: "Hostel accommodation is not mandatory but recommended for first-year students. Both AC and non-AC options are available."
      },
      {
        question: "What are the scholarship opportunities?",
        answer: "VIT offers merit-based scholarships, sports scholarships, and financial assistance for economically disadvantaged students."
      },
      {
        question: "How is the placement scenario?",
        answer: "VIT has an excellent placement record with over 98% eligible students placed. Top recruiters include Microsoft, Google, and Amazon."
      }
    ],
    virtualTour: "https://example.com/vit-virtual-tour",
    campusMap: "https://placehold.co/800x600?text=VIT+Campus+Map"
  }
];

const CollageList = () => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  
  // Enhanced chat state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { 
      id: "welcome-1",
      sender: "system", 
      message: "Welcome to VIT Vellore support chat! How can we help you today?",
      timestamp: new Date(),
      status: "delivered",
    }
  ]);
  const [isMuted, setIsMuted] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [attachmentType, setAttachmentType] = useState("");
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const { user, isSignedIn } = useUser();

  // State for quick apply form
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantProgram, setApplicantProgram] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle form submission
  const handleApplySubmit = () => {
    // Validate form fields
    if (!applicantName || !applicantEmail || !applicantPhone || !applicantProgram) {
      alert("Please fill in all required fields");
      return;
    }

    // Show loading state
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Add success notification to chat
      setChatHistory(prev => [
        ...prev, 
        { 
          id: `resp-${Date.now()}`,
          sender: "system", 
          message: `Your application for the ${applicantProgram.toUpperCase()} program has been submitted successfully! Our team will contact you at ${applicantEmail} within 2 business days.`,
          timestamp: new Date(),
          status: "delivered"
        }
      ]);
      
      // Reset form after a moment
      setTimeout(() => {
        setIsSubmitted(false);
        setIsApplyDialogOpen(false);
        setApplicantName("");
        setApplicantEmail("");
        setApplicantPhone("");
        setApplicantProgram("");
      }, 2000);
    }, 1500);
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  // Simulated typing indicator
  useEffect(() => {
    let typingTimeout;
    if (isTyping) {
      typingTimeout = setTimeout(() => {
        setIsTyping(false);
      }, 3000);
    }
    return () => clearTimeout(typingTimeout);
  }, [isTyping]);

  // File selection handlers
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Display file in chat as a pending message
      if (file.type.startsWith('image/')) {
        handleAttachmentSend('image', URL.createObjectURL(file), file.name);
      } else {
        handleAttachmentSend('file', null, file.name);
      }
    }
  };

  const handleAttachmentClick = (type) => {
    setAttachmentType(type);
    setShowAttachmentOptions(false);
    fileInputRef.current.click();
  };

  const handleAttachmentSend = (type, url, name) => {
    // Create a new message with the attachment
    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      message: "",
      attachment: {
        type,
        url,
        name
      },
      timestamp: new Date(),
      status: "sent"
    };
    
    setChatHistory([...chatHistory, newMessage]);
    setSelectedFile(null);
    
    // Simulate response for the attachment
    setTimeout(() => {
      setIsTyping(true);
      
      setTimeout(() => {
        const responseMessage = {
          id: `resp-${Date.now()}`,
          sender: "system",
          message: type === 'image' 
            ? "Thanks for sharing this image! Our admissions team will review it." 
            : `Thank you for sending the file "${name}". Our team will process it shortly.`,
          timestamp: new Date(),
          status: "delivered"
        };
        
        setChatHistory(prev => [...prev, responseMessage]);
        setIsTyping(false);
      }, 2000);
    }, 1000);
  };

  // Function to handle sending chat messages
  const handleSendMessage = () => {
    if (chatMessage.trim() === "") return;
    
    // Generate a unique ID for the message
    const messageId = `msg-${Date.now()}`;
    
    // Add user message to chat history with pending status
    const newMessage = { 
      id: messageId,
      sender: "user", 
      message: chatMessage,
      timestamp: new Date(),
      status: "sent"
    };
    
    setChatHistory([...chatHistory, newMessage]);
    
    // Clear input field
    setChatMessage("");
    
    // Set typing indicator
    setTimeout(() => {
      setIsTyping(true);
    }, 500);
    
    // Simulate response after a short delay
    setTimeout(() => {
      let response = "";
      
      // Enhanced response logic based on keywords
      const lowercaseMessage = chatMessage.toLowerCase();
      
      if (lowercaseMessage.includes("admission") || lowercaseMessage.includes("apply")) {
        response = "Admissions for the 2024 academic year will open on November 30, 2023. You can apply through the VITEEE entrance exam. The application fee is ₹1,250. Want me to help you start an application now?";
      } else if (lowercaseMessage.includes("fee") || lowercaseMessage.includes("tuition")) {
        response = "VIT offers various programs with different fee structures:\n\n• B.Tech: ₹9,00,000 (4 years)\n• M.Tech: ₹4,50,000 (2 years)\n• MBA: ₹12,00,000 (2 years)\n• Ph.D: ₹3,00,000\n\nScholarships are available based on merit and financial need. Would you like more details on scholarships?";
      } else if (lowercaseMessage.includes("hostel") || lowercaseMessage.includes("accommodation")) {
        response = "VIT has modern hostel facilities for both boys and girls with AC and non-AC options. Hostels are equipped with Wi-Fi, laundry services, and 24/7 security. AC hostel fees are approximately ₹1,25,000 per year, while non-AC options cost about ₹85,000 per year.";
      } else if (lowercaseMessage.includes("placement") || lowercaseMessage.includes("job")) {
        response = "VIT's placement statistics are impressive:\n\n• Placement rate: 98.5%\n• Average package: ₹8.5 LPA\n• Highest package: ₹45 LPA\n\nTop recruiters include Microsoft, Google, Amazon, IBM, and Adobe. Our Career Development Center provides year-round training for placements.";
      } else if (lowercaseMessage.includes("course") || lowercaseMessage.includes("program")) {
        response = "VIT offers a wide range of programs including:\n\n• Engineering (CSE, ECE, Mechanical, etc.)\n• Sciences (Physics, Chemistry, etc.)\n• Management Studies\n• Computer Applications\n\nOur flagship programs are B.Tech in Computer Science with specialization in AI & ML, and B.Tech in Biotechnology. Which program are you interested in?";
      } else if (lowercaseMessage.includes("faculty") || lowercaseMessage.includes("professor")) {
        response = "VIT has over 1,500 highly qualified faculty members with doctoral degrees from prestigious institutions worldwide. Our faculty-to-student ratio is 1:15, ensuring personalized attention. Many professors are involved in cutting-edge research and have industry experience.";
      } else if (lowercaseMessage.includes("research") || lowercaseMessage.includes("innovation")) {
        response = "VIT has state-of-the-art research facilities across various domains. Our Innovation Center supports student startups and has incubated over 300 companies. Faculty and students have filed 200+ patents. Research areas include AI, IoT, Biotechnology, Material Science, and Renewable Energy.";
      } else if (lowercaseMessage.includes("scholarship") || lowercaseMessage.includes("financial")) {
        response = "VIT offers several scholarship options:\n\n• Merit scholarships (based on VITEEE rank)\n• Sports scholarships\n• GV Merit Scholarship for economically disadvantaged students\n• Research scholarships for graduate students\n\nUp to 100% tuition fee waiver is available for exceptional students.";
      } else if (lowercaseMessage.includes("viteee") || lowercaseMessage.includes("entrance")) {
        response = "VITEEE (VIT Engineering Entrance Examination) is the gateway to VIT's engineering programs. It's conducted online between April 15-30, 2024. The exam covers Physics, Chemistry, Mathematics/Biology, Aptitude, and English. Applications open on November 30, 2023. Would you like preparation tips?";
      } else if (lowercaseMessage.includes("hello") || lowercaseMessage.includes("hi") || lowercaseMessage.includes("hey")) {
        response = "Hello! I'm VIT's virtual assistant. I can help you with information about admissions, courses, placements, hostel facilities, and more. How can I assist you today?";
      } else if (lowercaseMessage.includes("thank")) {
        response = "You're welcome! If you have any more questions about VIT Vellore, feel free to ask. We're here to help you make an informed decision about your education.";
      } else {
        response = "Thank you for your query. I'm not sure I understood completely. Could you please specify if you're asking about admissions, courses, placements, hostel facilities, or something else? You can also contact our admissions office directly at admission@vit.ac.in.";
      }
      
      // Update the message status to delivered
      setChatHistory(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, status: "delivered" } : msg
        )
      );
      
      // Remove typing indicator and add actual response after a delay
      setTimeout(() => {
        setIsTyping(false);
        
        // Add the response message
        const responseMsg = { 
          id: `resp-${Date.now()}`,
          sender: "system", 
          message: response,
          timestamp: new Date(),
          status: "delivered"
        };
        
        setChatHistory(prev => [...prev, responseMsg]);
        
        // Play notification sound if not muted
        if (!isMuted) {
          const audio = new Audio('/message-received.mp3');
          audio.play().catch(e => console.log('Audio play failed:', e));
        }
      }, 1500);
    }, 1000);
  };

  // Filter collages based on search query and filters
  const filteredCollages = collages.filter((collage) => {
    // Filter by search query
    const matchesSearch = collage.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          collage.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by type
    const matchesType = typeFilter === "all" || collage.type.toLowerCase().includes(typeFilter.toLowerCase());
    
    // Filter by location
    const matchesLocation = locationFilter === "all" || collage.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <Layout>
      <Header />
      <div className="container mx-auto py-6 space-y-8 mt-16">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">VIT Vellore Campus Guide</h1>
          <div className="space-x-3">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Admission Calendar
            </Button>
            <Button>
              <School className="mr-2 h-4 w-4" />
              Campus Tours
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-card rounded-lg border shadow-sm">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input 
                      placeholder="Search VIT Vellore information..." 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="md:col-span-8 flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="university">University</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="tamil nadu">Tamil Nadu</SelectItem>
                        <SelectItem value="vellore">Vellore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="secondary" className="flex-none">
                    <Filter className="mr-2 h-4 w-4" />
                    More Filters
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t">
              <div className="grid grid-cols-1 gap-6">
                {filteredCollages.length > 0 ? (
                  filteredCollages.map((collage) => (
                    <Card key={collage.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 bg-muted">
                          <img 
                            src={collage.image} 
                            alt={collage.name}
                            className="w-full h-full object-cover"
                            style={{ maxHeight: '300px' }}
                          />
                        </div>
                        <div className="md:w-2/3 p-6">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-12 w-12 border">
                                <AvatarImage src={collage.logo} alt={collage.name} />
                                <AvatarFallback>{collage.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h2 className="text-xl font-bold">{collage.name}</h2>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {collage.location}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Star className="h-3 w-3" fill="currentColor" />
                                {collage.rating}/5.0
                              </Badge>
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Building className="h-3 w-3" />
                                Est. {collage.establishedYear}
                              </Badge>
                              <Badge variant="outline" className="flex items-center gap-1">
                                <School className="h-3 w-3" />
                                {collage.type.split(' ')[0]}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <p className="text-sm text-muted-foreground">{collage.description}</p>
                          </div>
                          
                          <div className="mt-4">
                            <h3 className="text-sm font-medium mb-2">Popular Courses</h3>
                            <div className="flex flex-wrap gap-2">
                              {collage.courses.slice(0, 6).map((course, index) => (
                                <Badge key={index} variant="secondary">{course}</Badge>
                              ))}
                              {collage.courses.length > 6 && (
                                <Badge variant="outline">+{collage.courses.length - 6} more</Badge>
                              )}
                            </div>
                          </div>

                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h3 className="text-sm font-medium mb-2">Admission Dates</h3>
                              <div className="bg-muted p-3 rounded-lg space-y-2 text-xs">
                                <div className="flex justify-between">
                                  <span>Application Opens:</span>
                                  <span className="font-medium">{collage.admissionDates.viteeApplicationStart}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Application Closes:</span>
                                  <span className="font-medium">{collage.admissionDates.viteeApplicationEnd}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Exam Period:</span>
                                  <span className="font-medium">{collage.admissionDates.viteeExamDate}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-sm font-medium mb-2">Placement Highlights</h3>
                              <div className="bg-muted p-3 rounded-lg space-y-2 text-xs">
                                <div className="flex justify-between">
                                  <span>Average Package:</span>
                                  <span className="font-medium">{collage.placements.averagePackage}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Highest Package:</span>
                                  <span className="font-medium">{collage.placements.highestPackage}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Placement Rate:</span>
                                  <span className="font-medium">{collage.placements.placementPercentage}%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex flex-wrap gap-4">
                            <div className="text-sm">
                              <span className="font-medium">Fees: </span>
                              <span>{collage.fees.btech}</span>
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">Website: </span>
                              <a href={collage.website} className="text-primary hover:underline">{collage.website.replace("https://www.", "")}</a>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex flex-wrap justify-between gap-3 border-t pt-4">
                            <div className="flex space-x-3">
                              {collage.socialMedia && (
                                <>
                                  <a href={collage.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                  </a>
                                  <a href={collage.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-500 text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                                  </a>
                                  <a href={collage.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-600 text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                  </a>
                                  <a href={collage.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-700 text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                  </a>
                                </>
                              )}
                            </div>
                            <div className="flex space-x-3">
                              <Button variant="outline" size="sm">
                                <Heart className="mr-2 h-4 w-4" />
                                Favorite
                              </Button>
                              <Button variant="outline" size="sm">
                                <Globe className="mr-2 h-4 w-4" />
                                Visit Website
                              </Button>
                              <Button size="sm" onClick={() => setIsApplyDialogOpen(true)}>
                                <School className="mr-2 h-4 w-4" />
                                Apply Now
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
                      <School className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium text-lg">No collages found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="topRated">
          <TabsList>
            <TabsTrigger value="topRated">VIT Campus Highlights</TabsTrigger>
            <TabsTrigger value="featured">Programs & Courses</TabsTrigger>
            <TabsTrigger value="achievements">VIT Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="topRated" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {collages
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 3)
                .map((collage) => (
                  <Card key={collage.id}>
                    <div className="w-full h-40 bg-muted">
                      <img 
                        src={collage.image} 
                        alt={collage.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="flex flex-row items-center gap-3">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={collage.logo} alt={collage.name} />
                        <AvatarFallback>{collage.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{collage.name}</CardTitle>
                        <CardDescription>{collage.location}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Star className="h-3 w-3" fill="currentColor" />
                            {collage.rating}/5.0
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            Est. {collage.establishedYear}
                          </Badge>
                        </div>
                        <p className="text-sm">{collage.description.substring(0, 100)}...</p>
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
          
          <TabsContent value="featured" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {collages.map((collage) => (
                <div key={collage.id} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Academic Calendar
                      </CardTitle>
                      <CardDescription>Important dates for the academic year 2023-2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                            Fall Semester
                          </h4>
                          <div className="bg-muted p-3 rounded-lg space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Start Date:</span>
                              <span className="font-medium">{collage.academicCalendar.fallSemester.start}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>End Date:</span>
                              <span className="font-medium">{collage.academicCalendar.fallSemester.end}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Exam Period:</span>
                              <span className="font-medium">{collage.academicCalendar.fallSemester.exams}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            Winter Semester
                          </h4>
                          <div className="bg-muted p-3 rounded-lg space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Start Date:</span>
                              <span className="font-medium">{collage.academicCalendar.winterSemester.start}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>End Date:</span>
                              <span className="font-medium">{collage.academicCalendar.winterSemester.end}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Exam Period:</span>
                              <span className="font-medium">{collage.academicCalendar.winterSemester.exams}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            Summer Term
                          </h4>
                          <div className="bg-muted p-3 rounded-lg space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Start Date:</span>
                              <span className="font-medium">{collage.academicCalendar.summerTerm.start}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>End Date:</span>
                              <span className="font-medium">{collage.academicCalendar.summerTerm.end}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        Available Programs
                      </CardTitle>
                      <CardDescription>Undergraduate and postgraduate programs offered</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Bachelor's Programs</h4>
                          <div className="grid grid-cols-1 gap-2">
                            {collage.courses.slice(0, 5).map((course, index) => (
                              <div key={index} className="p-2 bg-muted rounded-lg text-sm flex justify-between items-center">
                                <span>{course}</span>
                                <Badge variant="outline">{collage.fees.btech}</Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Master's & Ph.D Programs</h4>
                          <div className="grid grid-cols-1 gap-2">
                            <div className="p-2 bg-muted rounded-lg text-sm flex justify-between items-center">
                              <span>M.Tech Programs</span>
                              <Badge variant="outline">{collage.fees.mtech}</Badge>
                            </div>
                            <div className="p-2 bg-muted rounded-lg text-sm flex justify-between items-center">
                              <span>MBA Programs</span>
                              <Badge variant="outline">{collage.fees.mba}</Badge>
                            </div>
                            <div className="p-2 bg-muted rounded-lg text-sm flex justify-between items-center">
                              <span>Ph.D Programs</span>
                              <Badge variant="outline">{collage.fees.phd}</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="achievements" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {collages.map((collage) => (
                <div key={collage.id} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>VIT Vellore Achievements</CardTitle>
                      <CardDescription>Notable accomplishments of VIT Vellore over the years</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10 border">
                            <AvatarImage src={collage.logo} alt={collage.name} />
                            <AvatarFallback>{collage.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <h3 className="font-medium">{collage.name}</h3>
                            <ul className="space-y-2 text-sm">
                              {collage.achievements.map((achievement, index) => (
                                <li key={index} className="flex items-start gap-2 p-2 rounded-lg hover:bg-muted transition-colors">
                                  <Award className="h-4 w-4 text-yellow-500 mt-0.5" />
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        Student Reviews
                      </CardTitle>
                      <CardDescription>What students are saying about VIT Vellore</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {collage.reviews.map((review) => (
                          <div key={review.id} className="border rounded-lg p-4 space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="font-medium">{review.user}</div>
                              <div className="flex items-center">
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <Star className="h-3 w-3" fill="currentColor" />
                                  {review.rating}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{review.comment}</p>
                            <div className="text-xs text-muted-foreground">{review.date}</div>
                          </div>
                        ))}
                        <div className="pt-2">
                          <Button variant="outline" size="sm" className="w-full">
                            View All Reviews
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Frequently Asked Questions</CardTitle>
                      <CardDescription>Common questions about VIT Vellore</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {collage.faq.map((item, index) => (
                          <div key={index} className="border rounded-lg p-4 space-y-2">
                            <h4 className="font-medium">{item.question}</h4>
                            <p className="text-sm text-muted-foreground">{item.answer}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
              
              {collages.map((collage) => (
                <div key={collage.id} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Placement Statistics
                      </CardTitle>
                      <CardDescription>Career opportunities for VIT students</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                            <div className="text-2xl font-bold text-primary">{collage.placements.placementPercentage}%</div>
                            <div className="text-xs text-center mt-1">Placement Rate</div>
                          </div>
                          <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                            <div className="text-2xl font-bold text-primary">{collage.placements.averagePackage}</div>
                            <div className="text-xs text-center mt-1">Avg. Package</div>
                          </div>
                          <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                            <div className="text-2xl font-bold text-primary">{collage.placements.highestPackage}</div>
                            <div className="text-xs text-center mt-1">Highest Package</div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Top Recruiters</h4>
                          <div className="flex flex-wrap gap-2">
                            {collage.placements.topRecruiters.map((company, index) => (
                              <Badge key={index} variant="secondary">{company}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        Campus Facilities
                      </CardTitle>
                      <CardDescription>Explore VIT Vellore's world-class facilities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {collage.facilities.slice(0, 4).map((facility, index) => (
                          <div key={index} className="rounded-lg overflow-hidden border group cursor-pointer">
                            <div className="h-24 overflow-hidden">
                              <img 
                                src={facility.image} 
                                alt={facility.name}
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                              />
                            </div>
                            <div className="p-3">
                              <h4 className="font-medium text-sm">{facility.name}</h4>
                              <p className="text-xs text-muted-foreground truncate">{facility.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm" className="w-full">
                          View Virtual Tour
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden">
                    <CardHeader className="pb-0">
                      <CardTitle>Campus Map</CardTitle>
                      <CardDescription>Navigate VIT Vellore campus</CardDescription>
                    </CardHeader>
                    <img 
                      src={collage.campusMap} 
                      alt="VIT Campus Map"
                      className="w-full h-60 object-cover"
                    />
                  </Card>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Quick Apply Dialog */}
      <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          {isSubmitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <DialogTitle>Application Submitted!</DialogTitle>
              <DialogDescription>
                Thank you for your interest in VIT Vellore. Our admissions team will contact you shortly.
              </DialogDescription>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Quick Application Form</DialogTitle>
                <DialogDescription>
                  Fill in your details to receive more information about VIT Vellore admissions.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="col-span-3"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="col-span-3"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    className="col-span-3"
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">
                    Program
                  </Label>
                  <div className="col-span-3">
                    <RadioGroup value={applicantProgram} onValueChange={setApplicantProgram}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="btech" id="btech" />
                        <Label htmlFor="btech">B.Tech</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mtech" id="mtech" />
                        <Label htmlFor="mtech">M.Tech</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phd" id="phd" />
                        <Label htmlFor="phd">Ph.D</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mba" id="mba" />
                        <Label htmlFor="mba">MBA</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleApplySubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Contact options fixed on page */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="space-y-4">
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-full shadow-md bg-background">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-full shadow-md bg-background">
            <Mail className="h-5 w-5" />
          </Button>
          <Button onClick={() => setIsChatOpen(true)} variant="outline" size="icon" className="h-12 w-12 rounded-full shadow-md bg-background">
            <MessageSquare className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {isChatOpen ? (
          <div className="bg-background border rounded-lg shadow-lg w-96 flex flex-col h-[550px] max-h-[80vh]">
            <div className="p-3 border-b flex justify-between items-center bg-primary text-primary-foreground sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10 border border-primary-foreground/20">
                  <AvatarImage src="https://placehold.co/100?text=VIT" alt="VIT" />
                  <AvatarFallback>VIT</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">VIT Support</div>
                  <div className="text-xs flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-1"></span>
                    Online
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-full text-primary-foreground hover:text-primary-foreground hover:bg-primary/90"
                        onClick={() => setIsMuted(!isMuted)}
                      >
                        {isMuted ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isMuted ? "Unmute notifications" : "Mute notifications"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-full text-primary-foreground hover:text-primary-foreground hover:bg-primary/90"
                        onClick={() => window.open("mailto:admission@vit.ac.in")}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Email support
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-full text-primary-foreground hover:text-primary-foreground hover:bg-primary/90"
                        onClick={() => setIsChatOpen(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Close chat
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.map((chat) => (
                <div 
                  key={chat.id} 
                  className={`flex ${chat.sender === "user" ? "justify-end" : "justify-start"} animate-in fade-in-50 slide-in-from-bottom-5 duration-300`}
                >
                  {chat.sender === "system" && (
                    <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                      <AvatarImage src="https://placehold.co/100?text=VIT" alt="VIT" />
                      <AvatarFallback>VIT</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`max-w-[85%] rounded-lg ${
                    chat.sender === "user" 
                      ? "bg-primary text-primary-foreground rounded-tr-none" 
                      : "bg-muted rounded-tl-none"
                  }`}>
                    {chat.attachment ? (
                      <div className="p-3">
                        {chat.attachment.type === 'image' ? (
                          <div className="space-y-2">
                            <img 
                              src={chat.attachment.url} 
                              alt={chat.attachment.name} 
                              className="max-w-full rounded border border-border"
                            />
                            <div className="text-xs">{chat.attachment.name}</div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 p-2 bg-background/50 rounded border border-border">
                            <File className="h-5 w-5 text-blue-500" />
                            <span className="text-sm flex-1 truncate">{chat.attachment.name}</span>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 rounded-full">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-3 whitespace-pre-wrap">
                        {chat.message}
                      </div>
                    )}
                    
                    <div className={`text-xs px-3 pb-1.5 flex items-center ${chat.sender === "user" ? "justify-end" : "justify-start"} text-muted-foreground`}>
                      {chat.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      
                      {chat.sender === "user" && (
                        <span className="ml-1.5">
                          {chat.status === "sent" && <Clock className="h-3 w-3 inline" />}
                          {chat.status === "delivered" && <Check className="h-3 w-3 inline" />}
                          {chat.status === "read" && <CheckCheck className="h-3 w-3 inline text-blue-500" />}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {chat.sender === "user" && isSignedIn && (
                    <Avatar className="h-8 w-8 ml-2 mt-1 flex-shrink-0">
                      <AvatarImage src={user?.imageUrl} alt={user?.fullName} />
                      <AvatarFallback>{user?.firstName?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start animate-in fade-in-50 slide-in-from-bottom-5 duration-300">
                  <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                    <AvatarImage src="https://placehold.co/100?text=VIT" alt="VIT" />
                    <AvatarFallback>VIT</AvatarFallback>
                  </Avatar>
                  
                  <div className="bg-muted rounded-lg rounded-tl-none p-3 flex items-center space-x-1">
                    <span className="w-2 h-2 bg-foreground/70 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 bg-foreground/70 rounded-full animate-bounce" style={{ animationDelay: "200ms" }}></span>
                    <span className="w-2 h-2 bg-foreground/70 rounded-full animate-bounce" style={{ animationDelay: "400ms" }}></span>
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>
            
            <div className="p-3 border-t">
              {/* Quick reply suggestions */}
              <div className="mb-3 flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs rounded-full bg-primary/10"
                  onClick={() => setChatMessage("Tell me about admissions")}
                >
                  Admissions
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs rounded-full bg-primary/10"
                  onClick={() => setChatMessage("What are the fees?")}
                >
                  Fees
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs rounded-full bg-primary/10"
                  onClick={() => setChatMessage("Hostel facilities?")}
                >
                  Hostels
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs rounded-full bg-primary/10"
                  onClick={() => setChatMessage("Placement statistics")}
                >
                  Placements
                </Button>
              </div>
              
              <div className="flex items-end gap-2">
                <Popover open={showAttachmentOptions} onOpenChange={setShowAttachmentOptions}>
                  <PopoverTrigger asChild>
                    <Button 
                      size="icon" 
                      variant="ghost"
                      className="rounded-full h-9 w-9"
                    >
                      <Paperclip className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-2" side="top">
                    <div className="grid grid-cols-3 gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex flex-col h-auto py-2 px-1 items-center justify-center"
                        onClick={() => handleAttachmentClick('image')}
                      >
                        <Image className="h-5 w-5 mb-1" />
                        <span className="text-xs">Image</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex flex-col h-auto py-2 px-1 items-center justify-center"
                        onClick={() => handleAttachmentClick('file')}
                      >
                        <File className="h-5 w-5 mb-1" />
                        <span className="text-xs">File</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex flex-col h-auto py-2 px-1 items-center justify-center"
                        onClick={() => alert('Camera access requested')}
                      >
                        <Camera className="h-5 w-5 mb-1" />
                        <span className="text-xs">Camera</span>
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                
                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileSelect}
                  accept={attachmentType === 'image' ? 'image/*' : '*'}
                />
                
                <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                  <PopoverTrigger asChild>
                    <Button 
                      size="icon" 
                      variant="ghost"
                      className="rounded-full h-9 w-9"
                    >
                      <Smile className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-2" side="top">
                    <div className="grid grid-cols-8 gap-1">
                      {["😊", "👍", "👋", "🙏", "🎓", "📚", "🏫", "💼", "🌟", 
                        "👨‍🎓", "👩‍🎓", "💻", "📱", "📝", "📖", "🔬"].map((emoji) => (
                        <Button 
                          key={emoji}
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => {
                            setChatMessage(prev => prev + emoji);
                            setShowEmojiPicker(false);
                          }}
                        >
                          {emoji}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                
                <div className="flex-1 relative">
                  <Textarea 
                    placeholder="Type your message..." 
                    className="min-h-10 max-h-24 resize-none py-2 px-3"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                
                <Button 
                  size="icon" 
                  className="rounded-full h-10 w-10"
                  onClick={handleSendMessage}
                  disabled={chatMessage.trim() === ""}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="mt-2 text-xs text-center text-muted-foreground">
                Your chat with VIT counselor is confidential and encrypted
              </div>
            </div>
          </div>
        ) : (
          <Button 
            size="lg" 
            className="rounded-full shadow-lg h-14 w-14 flex items-center justify-center"
            onClick={() => setIsChatOpen(true)}
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Hidden Download/Camera Components */}
      <div className="hidden">
        <Download />
        <Check />
        <CheckCheck />
        <Clock />
        <Camera />
      </div>
    </Layout>
  );
};

export default CollageList; 