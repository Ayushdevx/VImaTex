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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Briefcase, 
  Building2, 
  Clock, 
  ExternalLink, 
  FileText, 
  Filter, 
  Info, 
  MapPin, 
  Search, 
  Star, 
  Users 
} from "lucide-react";

// Demo job listings data
const jobListings = [
  {
    id: 1,
    title: "Software Engineer Intern",
    company: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
    location: "Bangalore, India",
    type: "Internship",
    salary: "₹40,000/month",
    posted: "2 days ago",
    deadline: "30 Jul 2023",
    description: "Join Microsoft as a Software Engineer Intern to work on cutting-edge technologies. You'll be part of a team developing innovative solutions for our products.",
    requirements: [
      "Currently pursuing B.Tech/M.Tech in Computer Science or related field",
      "Knowledge of data structures and algorithms",
      "Proficiency in at least one programming language (C++, Java, Python)",
      "Good problem-solving skills",
    ],
    category: "Tech",
    isBookmarked: false,
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png",
    location: "Hyderabad, India",
    type: "Full-time",
    salary: "₹18-25 LPA",
    posted: "1 week ago",
    deadline: "15 Aug 2023",
    description: "Amazon is looking for a Data Scientist to join our team. You will work on analyzing large datasets and developing machine learning models.",
    requirements: [
      "M.Tech/Ph.D in Computer Science, Statistics, or related field",
      "Experience with Python, R, and SQL",
      "Knowledge of machine learning algorithms",
      "Strong analytical and problem-solving skills",
    ],
    category: "Tech",
    isBookmarked: true,
  },
  {
    id: 3,
    title: "Marketing Coordinator",
    company: "Reliance Industries",
    logo: "https://companieslogo.com/img/orig/RELIANCE.NS-7401f1bd.png",
    location: "Mumbai, India",
    type: "Full-time",
    salary: "₹8-12 LPA",
    posted: "3 days ago",
    deadline: "10 Aug 2023",
    description: "Reliance Industries is seeking a Marketing Coordinator to assist in planning and executing marketing campaigns.",
    requirements: [
      "Bachelor's degree in Marketing or Business Administration",
      "Excellent communication skills",
      "Knowledge of digital marketing platforms",
      "Creative mindset",
    ],
    category: "Marketing",
    isBookmarked: false,
  },
  {
    id: 4,
    title: "HR Intern",
    company: "Infosys",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1280px-Infosys_logo.svg.png",
    location: "Pune, India",
    type: "Internship",
    salary: "₹15,000/month",
    posted: "1 day ago",
    deadline: "5 Aug 2023",
    description: "Join our HR team as an intern to learn about recruitment, employee relations, and HR operations.",
    requirements: [
      "Currently pursuing Bachelor's/Master's in HR or Business Management",
      "Good interpersonal skills",
      "Knowledge of MS Office",
      "Ability to work in a team",
    ],
    category: "HR",
    isBookmarked: false,
  },
  {
    id: 5,
    title: "Full Stack Developer",
    company: "Wipro",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/1280px-Wipro_Primary_Logo_Color_RGB.svg.png",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹12-18 LPA",
    posted: "5 days ago",
    deadline: "20 Aug 2023",
    description: "Wipro is looking for a Full Stack Developer to join our team. You will work on developing web applications using the latest technologies.",
    requirements: [
      "Bachelor's/Master's in Computer Science or related field",
      "Experience with JavaScript, React, Node.js",
      "Knowledge of database systems",
      "Understanding of software development lifecycle",
    ],
    category: "Tech",
    isBookmarked: true,
  },
  {
    id: 6,
    title: "Financial Analyst",
    company: "HDFC Bank",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/1280px-HDFC_Bank_Logo.svg.png",
    location: "Mumbai, India",
    type: "Full-time",
    salary: "₹10-15 LPA",
    posted: "1 week ago",
    deadline: "25 Aug 2023",
    description: "HDFC Bank is seeking a Financial Analyst to join our team. You will be responsible for analyzing financial data and preparing reports.",
    requirements: [
      "Bachelor's/Master's in Finance, Economics, or related field",
      "Knowledge of financial analysis and modeling",
      "Proficiency in Excel",
      "Strong analytical skills",
    ],
    category: "Finance",
    isBookmarked: false,
  },
];

// Demo events data
const careerEvents = [
  {
    id: 1,
    title: "Campus Placement Drive - TCS",
    date: "July 28, 2023",
    time: "9:00 AM - 5:00 PM",
    location: "College Auditorium",
    description: "TCS is visiting our campus for recruitment. All eligible students must register.",
    eligibility: "B.Tech/M.Tech students with 60% aggregate",
  },
  {
    id: 2,
    title: "Resume Building Workshop",
    date: "August 5, 2023",
    time: "2:00 PM - 4:00 PM",
    location: "Seminar Hall 2",
    description: "Learn how to create an effective resume that stands out to recruiters.",
    eligibility: "Open to all students",
  },
  {
    id: 3,
    title: "Mock Interview Sessions",
    date: "August 12, 2023",
    time: "10:00 AM - 3:00 PM",
    location: "Career Development Center",
    description: "Practice your interview skills with industry professionals.",
    eligibility: "Final year students",
  },
  {
    id: 4,
    title: "Career Guidance Seminar",
    date: "August 18, 2023",
    time: "11:00 AM - 1:00 PM",
    location: "Conference Hall",
    description: "Industry experts will share insights on career opportunities in various fields.",
    eligibility: "All students",
  },
];

// Demo resources data
const careerResources = [
  {
    id: 1,
    title: "Resume Templates",
    description: "Collection of professionally designed resume templates for different roles.",
    category: "Documents",
    link: "#",
  },
  {
    id: 2,
    title: "Interview Preparation Guide",
    description: "Comprehensive guide on how to prepare for technical and HR interviews.",
    category: "Guides",
    link: "#",
  },
  {
    id: 3,
    title: "LinkedIn Profile Optimization",
    description: "Tips and tricks to optimize your LinkedIn profile for job search.",
    category: "Guides",
    link: "#",
  },
  {
    id: 4,
    title: "Aptitude Test Practice",
    description: "Practice questions for aptitude tests commonly used in campus placements.",
    category: "Practice",
    link: "#",
  },
  {
    id: 5,
    title: "Internship Report Samples",
    description: "Sample reports to guide you in writing your internship documentation.",
    category: "Documents",
    link: "#",
  },
  {
    id: 6,
    title: "Group Discussion Topics",
    description: "Common GD topics with points to consider while preparing.",
    category: "Practice",
    link: "#",
  },
];

const CareerPortal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedJobType, setSelectedJobType] = useState("All");
  const [jobs, setJobs] = useState(jobListings);
  
  // Handle bookmark toggle
  const toggleBookmark = (id: number) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, isBookmarked: !job.isBookmarked } : job
    ));
  };
  
  // Filter jobs based on search term, category, and job type
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || job.category === selectedCategory;
    const matchesJobType = selectedJobType === "All" || job.type === selectedJobType;
    
    return matchesSearch && matchesCategory && matchesJobType;
  });

  return (
    <Layout>
      <div className="container py-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Career Portal</h1>
          <p className="text-muted-foreground">
            Explore job opportunities, career events, and resources
          </p>
        </div>
        
        <Tabs defaultValue="jobs" className="space-y-4">
          <TabsList>
            <TabsTrigger value="jobs">Job Listings</TabsTrigger>
            <TabsTrigger value="events">Career Events</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="jobs" className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search jobs, companies, or locations..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="w-10 h-10 p-0 flex items-center justify-center">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    <SelectItem value="Tech">Tech</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Types</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <Card key={job.id} className="overflow-hidden">
                    <div className="p-6 flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-lg bg-background border p-2">
                        <img src={job.logo} alt={job.company} className="max-w-full max-h-full" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-semibold tracking-tight">{job.title}</h3>
                            <div className="flex items-center text-muted-foreground">
                              <Building2 className="h-4 w-4 mr-1" />
                              <span>{job.company}</span>
                            </div>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <Badge variant={job.type === "Internship" ? "outline" : "default"}>
                              {job.type}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Briefcase className="h-4 w-4 mr-1" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Apply by {job.deadline}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                        </div>
                        
                        <div className="mt-4 flex flex-col xs:flex-row gap-2 justify-between">
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>Posted {job.posted}</span>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Info className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                            <Button size="sm">
                              Apply Now
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="w-9 p-0"
                              onClick={() => toggleBookmark(job.id)}
                            >
                              <Star className={`h-4 w-4 ${job.isBookmarked ? "fill-yellow-400 text-yellow-400" : ""}`} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-muted-foreground">No job listings found matching your criteria</div>
                  <Button variant="outline" className="mt-4" onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setSelectedJobType("All");
                  }}>
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {careerEvents.map((event) => (
                <Card key={event.id}>
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{event.location}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{event.description}</p>
                    <div className="mt-3 text-sm">
                      <span className="font-medium">Eligibility:</span> {event.eligibility}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Add to Calendar
                    </Button>
                    <Button size="sm">
                      Register
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {careerResources.map((resource) => (
                <Card key={resource.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <Badge variant="outline">{resource.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <a href={resource.link} target="_blank" rel="noopener noreferrer">
                        <FileText className="h-4 w-4 mr-2" />
                        Access Resource
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="applications" className="space-y-4">
            <div className="bg-muted/50 border rounded-lg p-8 text-center">
              <Users className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-xl font-medium">No applications yet</h3>
              <p className="mt-2 text-muted-foreground">
                When you apply for jobs, they will appear here
              </p>
              <Button className="mt-4">Browse Job Listings</Button>
            </div>
            
            <h3 className="text-lg font-medium mt-8">Companies Interested In You</h3>
            <div className="flex flex-wrap gap-4">
              {["Microsoft", "Google", "Amazon", "TCS", "Infosys"].map((company) => (
                <div key={company} className="flex items-center gap-2 p-3 border rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{company[0]}</AvatarFallback>
                  </Avatar>
                  <span>{company}</span>
                  <Button variant="ghost" size="sm" className="ml-2">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CareerPortal; 