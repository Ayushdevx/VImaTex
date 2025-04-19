import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Building, Users } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";

// Company interface
interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  location: string;
  website: string;
}

// Job interface
interface Job {
  id: string;
  companyId: string;
  title: string;
  description: string;
  package: string;
  locations: string[];
  openings: number;
  deadline: string;
  eligibility: {
    branches: string[];
    minCGPA: number;
    backlogPolicy: string;
    otherRequirements: string[];
  };
  selectionProcess: string[];
  status: "open" | "closed" | "upcoming";
  applied?: boolean;
}

// Event interface
interface PlacementEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  type: "workshop" | "seminar" | "preplacement" | "interview";
}

const PlacementPortal = () => {
  // Companies data
  const [companies] = useState<Company[]>([
    {
      id: "tcs",
      name: "Tata Consultancy Services",
      logo: "/companies/tcs.png",
      description: "TCS is an Indian multinational IT services and consulting company headquartered in Mumbai.",
      industry: "IT Services & Consulting",
      location: "Mumbai, India",
      website: "https://www.tcs.com"
    },
    {
      id: "infosys",
      name: "Infosys",
      logo: "/companies/infosys.png",
      description: "Infosys is an Indian multinational corporation that provides business consulting, information technology and outsourcing services.",
      industry: "IT Services & Consulting",
      location: "Bangalore, India",
      website: "https://www.infosys.com"
    },
    {
      id: "wipro",
      name: "Wipro",
      logo: "/companies/wipro.png",
      description: "Wipro is an Indian multinational corporation that provides information technology, consulting and business process services.",
      industry: "IT Services & Consulting",
      location: "Bangalore, India",
      website: "https://www.wipro.com"
    },
    {
      id: "amazon",
      name: "Amazon",
      logo: "/companies/amazon.png",
      description: "Amazon is an American multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
      industry: "E-commerce, Cloud Computing",
      location: "Seattle, USA (Multiple locations in India)",
      website: "https://www.amazon.com"
    },
  ]);

  // Jobs data
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "tcs1",
      companyId: "tcs",
      title: "Software Developer",
      description: "As a Software Developer at TCS, you'll be part of our innovative development teams working on cutting-edge projects for global clients.",
      package: "4.5-6 LPA",
      locations: ["Pune", "Chennai", "Hyderabad", "Bangalore"],
      openings: 250,
      deadline: "2025-08-10",
      eligibility: {
        branches: ["CSE", "IT", "ECE", "EEE"],
        minCGPA: 6.5,
        backlogPolicy: "No active backlogs",
        otherRequirements: ["60% throughout academics"]
      },
      selectionProcess: ["Online Test", "Technical Interview", "HR Interview"],
      status: "open"
    },
    {
      id: "infosys1",
      companyId: "infosys",
      title: "Systems Engineer",
      description: "Join Infosys as a Systems Engineer and be part of digital transformation projects across various domains.",
      package: "3.6-5 LPA",
      locations: ["Bangalore", "Pune", "Hyderabad", "Chennai"],
      openings: 500,
      deadline: "2025-08-15",
      eligibility: {
        branches: ["All Engineering Branches"],
        minCGPA: 6.0,
        backlogPolicy: "No active backlogs",
        otherRequirements: ["60% throughout academics"]
      },
      selectionProcess: ["Online Test", "Technical Interview", "HR Interview"],
      status: "open"
    },
    {
      id: "amazon1",
      companyId: "amazon",
      title: "SDE Intern",
      description: "Join Amazon as a Software Development Engineer Intern and work on real-world problems with experienced engineers.",
      package: "Stipend: 80,000 per month",
      locations: ["Bangalore", "Hyderabad"],
      openings: 20,
      deadline: "2025-09-05",
      eligibility: {
        branches: ["CSE", "IT"],
        minCGPA: 8.0,
        backlogPolicy: "No backlogs allowed",
        otherRequirements: ["Strong problem-solving skills", "Data Structures & Algorithms"]
      },
      selectionProcess: ["Online Assessment", "Technical Interviews (2 rounds)", "HR Interview"],
      status: "upcoming"
    },
    {
      id: "wipro1",
      companyId: "wipro",
      title: "Project Engineer",
      description: "Wipro is hiring for the role of Project Engineer for their technology projects across domains.",
      package: "3.5-5 LPA",
      locations: ["Bangalore", "Pune", "Hyderabad", "Chennai", "Noida"],
      openings: 300,
      deadline: "2025-07-25",
      eligibility: {
        branches: ["CSE", "IT", "ECE", "EEE", "ME"],
        minCGPA: 6.0,
        backlogPolicy: "Maximum 1 active backlog allowed",
        otherRequirements: ["60% throughout academics"]
      },
      selectionProcess: ["Online Test", "Technical Interview", "HR Interview"],
      status: "open"
    }
  ]);

  // Events data
  const [events] = useState<PlacementEvent[]>([
    {
      id: "event1",
      title: "Resume Building Workshop",
      date: "2025-07-20T14:00:00Z",
      location: "Seminar Hall 1",
      description: "Learn how to build an impressive resume that stands out to recruiters. The session will be conducted by the placement cell and HR professionals from top companies.",
      type: "workshop"
    },
    {
      id: "event2",
      title: "Mock Interview Practice",
      date: "2025-07-25T10:00:00Z",
      location: "Placement Office",
      description: "Practice mock interviews with placement coordinators to prepare for actual company interviews.",
      type: "preplacement"
    },
    {
      id: "event3",
      title: "Pre-Placement Talk: Infosys",
      date: "2025-08-10T16:00:00Z",
      location: "Auditorium",
      description: "Infosys representatives will provide information about the company, job profiles, and selection process.",
      type: "preplacement"
    },
    {
      id: "event4",
      title: "Group Discussion Techniques",
      date: "2025-07-28T15:00:00Z",
      location: "Seminar Hall 2",
      description: "Learn effective strategies for group discussions, an important part of many selection processes.",
      type: "workshop"
    }
  ]);

  // Placement statistics
  const placementStats = {
    studentsPlaced: 485,
    totalStudents: 520,
    highestPackage: "42 LPA",
    averagePackage: "8.2 LPA",
    companiesVisited: 68,
    ongoingDrives: 4
  };

  // State for active tab
  const [activeTab, setActiveTab] = useState("jobs");

  // Apply for job
  const applyForJob = (jobId: string) => {
    setJobs(prevJobs => prevJobs.map(job => 
      job.id === jobId ? { ...job, applied: true } : job
    ));
    
    toast({
      title: "Application submitted",
      description: "Your application has been successfully submitted.",
    });
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Status badge
  const getStatusBadge = (status: Job["status"]) => {
    switch (status) {
      case "open":
        return <Badge className="bg-green-500">Open</Badge>;
      case "closed":
        return <Badge className="bg-red-500">Closed</Badge>;
      case "upcoming":
        return <Badge className="bg-blue-500">Upcoming</Badge>;
      default:
        return null;
    }
  };

  // Event type badge
  const getEventTypeBadge = (type: PlacementEvent["type"]) => {
    switch (type) {
      case "workshop":
        return <Badge className="bg-purple-500">Workshop</Badge>;
      case "seminar":
        return <Badge className="bg-blue-500">Seminar</Badge>;
      case "preplacement":
        return <Badge className="bg-green-500">Pre-Placement</Badge>;
      case "interview":
        return <Badge className="bg-amber-500">Interview</Badge>;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Campus Placement Portal</h1>
            <p className="text-muted-foreground">
              Your gateway to career opportunities
            </p>
          </div>
        </div>

        {/* Placement Statistics */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-6 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Students Placed</div>
              <div className="text-2xl font-bold">{placementStats.studentsPlaced}/{placementStats.totalStudents}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Placement %</div>
              <div className="text-2xl font-bold">
                {Math.round((placementStats.studentsPlaced / placementStats.totalStudents) * 100)}%
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Highest Package</div>
              <div className="text-2xl font-bold">{placementStats.highestPackage}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Average Package</div>
              <div className="text-2xl font-bold">{placementStats.averagePackage}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Companies Visited</div>
              <div className="text-2xl font-bold">{placementStats.companiesVisited}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Ongoing Drives</div>
              <div className="text-2xl font-bold">{placementStats.ongoingDrives}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="jobs">
              <FileText className="h-4 w-4 mr-2" />
              Open Positions
            </TabsTrigger>
            <TabsTrigger value="companies">
              <Building className="h-4 w-4 mr-2" />
              Companies
            </TabsTrigger>
            <TabsTrigger value="events">
              <Calendar className="h-4 w-4 mr-2" />
              Placement Events
            </TabsTrigger>
            <TabsTrigger value="applications">
              <Users className="h-4 w-4 mr-2" />
              My Applications
            </TabsTrigger>
          </TabsList>
          
          {/* Jobs Tab */}
          <TabsContent value="jobs">
            <div className="grid gap-6 md:grid-cols-2">
              {jobs.map((job) => {
                const company = companies.find(c => c.id === job.companyId);
                return (
                  <Card key={job.id} className={job.status === "closed" ? "opacity-70" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div>
                          <CardTitle>{job.title}</CardTitle>
                          <CardDescription>{company?.name}</CardDescription>
                        </div>
                        {getStatusBadge(job.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">{job.description}</p>
                      
                      <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
                        <div className="font-medium">Package:</div>
                        <div>{job.package}</div>
                        
                        <div className="font-medium">Locations:</div>
                        <div>{job.locations.join(", ")}</div>
                        
                        <div className="font-medium">Openings:</div>
                        <div>{job.openings}</div>
                        
                        <div className="font-medium">Last Date:</div>
                        <div>{formatDate(job.deadline)}</div>
                      </div>
                      
                      <div className="text-sm mb-2 font-medium">Eligibility:</div>
                      <div className="text-sm mb-4">
                        <div>Branches: {job.eligibility.branches.join(", ")}</div>
                        <div>Min CGPA: {job.eligibility.minCGPA}</div>
                        <div>Backlog Policy: {job.eligibility.backlogPolicy}</div>
                      </div>
                      
                      <div className="text-sm mb-2 font-medium">Selection Process:</div>
                      <div className="text-sm">
                        {job.selectionProcess.map((step, i) => (
                          <div key={i}>
                            {i + 1}. {step}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full"
                        disabled={job.status !== "open" || job.applied}
                        onClick={() => applyForJob(job.id)}
                      >
                        {job.applied ? "Applied" : job.status === "upcoming" ? "Opening Soon" : "Apply Now"}
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
          
          {/* Companies Tab */}
          <TabsContent value="companies">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {companies.map((company) => (
                <Card key={company.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{company.name}</CardTitle>
                      <div className="h-12 w-12 bg-muted rounded-md flex items-center justify-center">
                        {company.name.charAt(0)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{company.description}</p>
                    
                    <div className="grid grid-cols-[100px_1fr] gap-y-2 text-sm">
                      <div className="font-medium">Industry:</div>
                      <div>{company.industry}</div>
                      
                      <div className="font-medium">Location:</div>
                      <div>{company.location}</div>
                      
                      <div className="font-medium">Website:</div>
                      <div className="truncate">{company.website}</div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View Profile</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Events Tab */}
          <TabsContent value="events">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">{event.description}</div>
                      </TableCell>
                      <TableCell>{formatDate(event.date)}</TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>{getEventTypeBadge(event.type)}</TableCell>
                      <TableCell>
                        <Button size="sm">Register</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          {/* Applications Tab */}
          <TabsContent value="applications">
            {jobs.filter(job => job.applied).length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Position</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Applied On</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.filter(job => job.applied).map((job) => {
                      const company = companies.find(c => c.id === job.companyId);
                      return (
                        <TableRow key={job.id}>
                          <TableCell>
                            <div className="font-medium">{job.title}</div>
                            <div className="text-sm text-muted-foreground">{job.package}</div>
                          </TableCell>
                          <TableCell>{company?.name}</TableCell>
                          <TableCell>Jul 15, 2025</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-amber-500 text-amber-500">
                              Under Review
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">View Details</Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Applications Yet</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    You haven't applied to any positions yet. Check out the open positions tab to apply.
                  </p>
                  <Button onClick={() => setActiveTab("jobs")}>Browse Open Positions</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PlacementPortal; 