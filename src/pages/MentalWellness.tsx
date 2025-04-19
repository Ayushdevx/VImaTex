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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Brain, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  FileText, 
  Heart, 
  Info, 
  Laugh, 
  Link2, 
  MapPin, 
  MessageSquare, 
  Phone, 
  Search, 
  Shield, 
  Smile, 
  Users 
} from "lucide-react";

// Wellness programs data
const wellnessPrograms = [
  {
    id: 1,
    title: "Stress Management Workshop",
    date: "August 10, 2023",
    time: "2:00 PM - 4:00 PM",
    location: "Student Wellness Center",
    description: "Learn effective techniques to manage academic stress and anxiety.",
    facilitator: "Dr. Priya Sharma",
    image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
    tags: ["Stress", "Anxiety", "Workshop"],
    spotsLeft: 12,
  },
  {
    id: 2,
    title: "Mindfulness Meditation Sessions",
    date: "Every Tuesday",
    time: "8:00 AM - 9:00 AM",
    location: "Yoga Hall",
    description: "Weekly meditation sessions to improve focus and emotional well-being.",
    facilitator: "Ms. Anjali Desai",
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
    tags: ["Meditation", "Mindfulness", "Weekly"],
    spotsLeft: 8,
  },
  {
    id: 3,
    title: "Peer Support Group",
    date: "Every Thursday",
    time: "5:30 PM - 7:00 PM",
    location: "Room 303, Student Center",
    description: "A safe space to share experiences and support fellow students.",
    facilitator: "Counseling Team",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1189&q=80",
    tags: ["Peer Support", "Group Therapy", "Weekly"],
    spotsLeft: 5,
  },
  {
    id: 4,
    title: "Exam Anxiety Workshop",
    date: "August 25, 2023",
    time: "3:00 PM - 5:00 PM",
    location: "Seminar Hall 2",
    description: "Strategies to overcome test anxiety and perform better in exams.",
    facilitator: "Dr. Rajesh Kumar",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
    tags: ["Anxiety", "Exams", "Workshop"],
    spotsLeft: 15,
  },
];

// Counselors data
const counselors = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    title: "Clinical Psychologist",
    specialization: "Anxiety, Depression, Academic Stress",
    availability: "Mon, Wed, Fri (10 AM - 4 PM)",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
    rating: 4.9,
    experience: "10+ years",
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    title: "Counseling Psychologist",
    specialization: "Exam Anxiety, Career Guidance",
    availability: "Tue, Thu (9 AM - 5 PM)",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
    rating: 4.7,
    experience: "8 years",
  },
  {
    id: 3,
    name: "Ms. Anjali Desai",
    title: "Mental Health Counselor",
    specialization: "Mindfulness, Stress Management",
    availability: "Mon-Fri (1 PM - 6 PM)",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
    rating: 4.8,
    experience: "6 years",
  },
  {
    id: 4,
    name: "Mr. Sanjay Verma",
    title: "Student Welfare Officer",
    specialization: "Adjustment Issues, Homesickness",
    availability: "Mon, Wed, Fri (10 AM - 3 PM)",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
    rating: 4.6,
    experience: "5 years",
  },
];

// Resources data
const resources = [
  {
    id: 1,
    title: "Mental Health Self-Assessment",
    description: "A simple questionnaire to assess your mental well-being.",
    category: "Self-Help",
    link: "#self-assessment",
    icon: <CheckCircle2 />,
  },
  {
    id: 2,
    title: "Stress Management Techniques",
    description: "Effective strategies to manage stress during academic pressure.",
    category: "Article",
    link: "#stress-management",
    icon: <FileText />,
  },
  {
    id: 3,
    title: "Mindfulness Meditation Guide",
    description: "Step-by-step guide to practice mindfulness meditation.",
    category: "Guide",
    link: "#meditation",
    icon: <Brain />,
  },
  {
    id: 4,
    title: "Healthy Sleep Habits",
    description: "Tips for improving sleep quality for better mental health.",
    category: "Article",
    link: "#sleep",
    icon: <FileText />,
  },
  {
    id: 5,
    title: "Crisis Helplines",
    description: "24/7 helpline numbers for immediate mental health support.",
    category: "Emergency",
    link: "#helplines",
    icon: <Phone />,
  },
  {
    id: 6,
    title: "Time Management for Students",
    description: "Strategies to balance academics, social life, and self-care.",
    category: "Guide",
    link: "#time-management",
    icon: <Clock />,
  },
];

// Self-assessment questions
const assessmentQuestions = [
  {
    id: 1,
    question: "How would you rate your overall stress level in the past week?",
    options: ["Very Low", "Low", "Moderate", "High", "Very High"],
  },
  {
    id: 2,
    question: "How often have you felt overwhelmed by academic responsibilities?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"],
  },
  {
    id: 3,
    question: "How would you rate your sleep quality in the past week?",
    options: ["Very Poor", "Poor", "Fair", "Good", "Excellent"],
  },
  {
    id: 4,
    question: "How often have you felt down, depressed, or hopeless?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"],
  },
  {
    id: 5,
    question: "How satisfied are you with your social connections?",
    options: ["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"],
  },
];

const MentalWellness = () => {
  const [selectedTab, setSelectedTab] = useState("resources");
  const [assessmentAnswers, setAssessmentAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({
    counselor: "",
    date: "",
    time: "",
    concern: "",
  });
  
  const handleAssessmentChange = (questionId, value) => {
    setAssessmentAnswers({
      ...assessmentAnswers,
      [questionId]: value,
    });
  };
  
  const handleSubmitAssessment = () => {
    setShowResults(true);
  };
  
  const resetAssessment = () => {
    setAssessmentAnswers({});
    setShowResults(false);
  };
  
  const scheduleAppointment = (counselor) => {
    setSelectedCounselor(counselor);
    setAppointmentDetails({
      ...appointmentDetails,
      counselor: counselor.name,
    });
  };
  
  const submitAppointment = () => {
    // In a real app, this would send the appointment data to the backend
    alert("Appointment request submitted. You will receive a confirmation soon.");
    setSelectedCounselor(null);
    setAppointmentDetails({
      counselor: "",
      date: "",
      time: "",
      concern: "",
    });
  };
  
  return (
    <Layout>
      <div className="container py-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Mental Wellness Center</h1>
          <p className="text-muted-foreground">
            Resources, support, and services for your mental well-being
          </p>
        </div>
        
        {/* Emergency Banner */}
        <Card className="bg-amber-50 border-amber-200 mb-6">
          <CardContent className="p-4">
            <div className="flex items-start space-x-4">
              <div className="bg-amber-100 p-2 rounded-full">
                <Info className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium text-amber-800">Need immediate help?</h3>
                <p className="text-amber-700 text-sm mt-1">
                  If you're in crisis or need immediate support, call our 24/7 helpline at <span className="font-semibold">1800-123-4567</span> or visit the Student Wellness Center.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="resources" className="space-y-4" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-4 w-full md:w-auto md:inline-flex">
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="counseling">Counseling</TabsTrigger>
            <TabsTrigger value="programs">Wellness Programs</TabsTrigger>
            <TabsTrigger value="assessment">Self-Assessment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resources" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {resources.map((resource) => (
                <Card key={resource.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <div className="h-5 w-5 text-primary">
                          {resource.icon}
                        </div>
                      </div>
                      <Badge variant="outline">{resource.category}</Badge>
                    </div>
                    <CardTitle className="mt-4">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <a href={resource.link}>
                        <Link2 className="h-4 w-4 mr-2" />
                        Access Resource
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Additional Resources</CardTitle>
                <CardDescription>External mental health resources and services</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Organization</TableHead>
                      <TableHead>Services</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead className="text-right">Link</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">National Mental Health Program</TableCell>
                      <TableCell>Mental health support and resources</TableCell>
                      <TableCell>1800-599-0019</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">YourDost</TableCell>
                      <TableCell>Online counseling and emotional support</TableCell>
                      <TableCell>support@yourdost.com</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">NIMHANS</TableCell>
                      <TableCell>Mental health education and resources</TableCell>
                      <TableCell>080-26995000</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="counseling" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {counselors.map((counselor) => (
                <Card key={counselor.id} className="overflow-hidden">
                  <div className="p-6 flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <Avatar className="h-24 w-24 rounded-xl">
                        <AvatarImage src={counselor.image} alt={counselor.name} />
                        <AvatarFallback>{counselor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold tracking-tight">{counselor.name}</h3>
                      <div className="text-sm text-muted-foreground">{counselor.title}</div>
                      
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center text-sm">
                          <Shield className="h-4 w-4 mr-2 text-primary" />
                          <span><span className="font-medium">Specialization:</span> {counselor.specialization}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-primary" />
                          <span><span className="font-medium">Availability:</span> {counselor.availability}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Smile className="h-4 w-4 mr-2 text-primary" />
                          <span><span className="font-medium">Rating:</span> {counselor.rating}/5 • <span className="font-medium">Experience:</span> {counselor.experience}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Button onClick={() => scheduleAppointment(counselor)}>
                          Schedule Appointment
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {selectedCounselor && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Schedule Appointment with {selectedCounselor.name}</CardTitle>
                  <CardDescription>
                    Available: {selectedCounselor.availability}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Date</label>
                        <Input 
                          type="date" 
                          value={appointmentDetails.date}
                          onChange={(e) => setAppointmentDetails({...appointmentDetails, date: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Time</label>
                        <Select 
                          value={appointmentDetails.time}
                          onValueChange={(value) => setAppointmentDetails({...appointmentDetails, time: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                            <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                            <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                            <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                            <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                            <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Briefly describe your concern</label>
                      <Textarea 
                        placeholder="Please share what you'd like to discuss..."
                        value={appointmentDetails.concern}
                        onChange={(e) => setAppointmentDetails({...appointmentDetails, concern: e.target.value})}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setSelectedCounselor(null)}>
                    Cancel
                  </Button>
                  <Button onClick={submitAppointment}>
                    Request Appointment
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="programs" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wellnessPrograms.map((program) => (
                <Card key={program.id} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={program.image} 
                      alt={program.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{program.title}</CardTitle>
                      <Badge variant="outline">{program.spotsLeft} spots left</Badge>
                    </div>
                    <CardDescription>
                      <div className="flex flex-col space-y-1 mt-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{program.date}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{program.time}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{program.location}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-2" />
                          <span>Facilitator: {program.facilitator}</span>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{program.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {program.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Register</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="assessment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mental Health Self-Assessment</CardTitle>
                <CardDescription>
                  This brief assessment helps you understand your current mental well-being. 
                  Your responses are private and not stored anywhere.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!showResults ? (
                  <div className="space-y-6">
                    {assessmentQuestions.map((q) => (
                      <div key={q.id} className="space-y-3">
                        <h3 className="font-medium">{q.id}. {q.question}</h3>
                        <div className="grid grid-cols-5 gap-2">
                          {q.options.map((option, index) => (
                            <Button 
                              key={index}
                              variant={assessmentAnswers[q.id] === index ? "default" : "outline"}
                              className="h-auto py-2"
                              onClick={() => handleAssessmentChange(q.id, index)}
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <h3 className="font-medium text-lg flex items-center">
                        <Heart className="h-5 w-5 mr-2 text-primary" />
                        Your Well-being Summary
                      </h3>
                      <p className="mt-2">
                        Based on your responses, you might be experiencing moderate levels of stress.
                        Consider reaching out to our counseling services for additional support.
                      </p>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-background p-3 rounded-lg border">
                          <h4 className="text-sm font-medium">Stress Level</h4>
                          <div className="mt-1 text-amber-500 font-semibold">Moderate</div>
                        </div>
                        <div className="bg-background p-3 rounded-lg border">
                          <h4 className="text-sm font-medium">Sleep Quality</h4>
                          <div className="mt-1 text-red-500 font-semibold">Poor</div>
                        </div>
                        <div className="bg-background p-3 rounded-lg border">
                          <h4 className="text-sm font-medium">Social Connection</h4>
                          <div className="mt-1 text-green-500 font-semibold">Good</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-lg mb-2">Recommended Resources</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Schedule an appointment with one of our counselors</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Join the weekly Mindfulness Meditation Sessions</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Review our guide on Healthy Sleep Habits</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {!showResults ? (
                  <Button 
                    onClick={handleSubmitAssessment}
                    disabled={Object.keys(assessmentAnswers).length < assessmentQuestions.length}
                  >
                    Submit Assessment
                  </Button>
                ) : (
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={resetAssessment}>
                      Retake Assessment
                    </Button>
                    <Button onClick={() => setSelectedTab("counseling")}>
                      Schedule Counseling Session
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Quick contact footer */}
        <div className="mt-8 bg-muted p-6 rounded-lg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-semibold text-lg">Need to talk to someone?</h3>
              <p className="text-muted-foreground">
                Our support team is available 24/7 for confidential assistance
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Call Helpline
              </Button>
              <Button className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat with Counselor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MentalWellness; 