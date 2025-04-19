import { useState } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mail, Phone, BookOpen, Award, Calendar } from "lucide-react";

// Interface for faculty members
interface Faculty {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  specialization: string[];
  experience: number;
  email: string;
  phone: string;
  profileImage?: string;
  cabinLocation: string;
  consultationHours: string;
  publications: number;
  subjects: string[];
  isHOD?: boolean;
}

const Faculty = () => {
  // List of departments
  const departments = [
    "Computer Science & Engineering",
    "Electronics & Communication Engineering",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
    "Information Technology",
    "Chemical Engineering",
    "Mathematics",
    "Physics",
    "Humanities & Social Sciences"
  ];

  // Faculty data
  const [facultyList] = useState<Faculty[]>([
    {
      id: "cs001",
      name: "Dr. Rajeev Kumar",
      designation: "Professor",
      department: "Computer Science & Engineering",
      qualification: "Ph.D. in Computer Science, IIT Delhi",
      specialization: ["Machine Learning", "Data Mining", "Artificial Intelligence"],
      experience: 15,
      email: "rajeev.kumar@college.edu",
      phone: "+91-9876543210",
      profileImage: "/faculty/rajeev.jpg",
      cabinLocation: "CSE Block, Room 301",
      consultationHours: "Monday & Wednesday, 14:00-16:00",
      publications: 45,
      subjects: ["Data Structures & Algorithms", "Machine Learning", "Data Mining"],
      isHOD: true
    },
    {
      id: "cs002",
      name: "Dr. Sunita Sharma",
      designation: "Associate Professor",
      department: "Computer Science & Engineering",
      qualification: "Ph.D. in Computer Science, IISc Bangalore",
      specialization: ["Computer Networks", "Distributed Systems", "Information Security"],
      experience: 12,
      email: "sunita.sharma@college.edu",
      phone: "+91-9876543211",
      profileImage: "/faculty/sunita.jpg",
      cabinLocation: "CSE Block, Room 302",
      consultationHours: "Tuesday & Thursday, 15:00-17:00",
      publications: 32,
      subjects: ["Computer Networks", "Distributed Systems", "Network Security"]
    },
    {
      id: "cs003",
      name: "Dr. Amit Singh",
      designation: "Assistant Professor",
      department: "Computer Science & Engineering",
      qualification: "Ph.D. in Computer Science, IIT Bombay",
      specialization: ["Software Engineering", "Web Technologies", "Cloud Computing"],
      experience: 8,
      email: "amit.singh@college.edu",
      phone: "+91-9876543212",
      cabinLocation: "CSE Block, Room 210",
      consultationHours: "Friday, 10:00-13:00",
      publications: 18,
      subjects: ["Software Engineering", "Cloud Computing", "Web Development"]
    },
    {
      id: "ec001",
      name: "Dr. Anand Mishra",
      designation: "Professor",
      department: "Electronics & Communication Engineering",
      qualification: "Ph.D. in Electronics, IIT Kanpur",
      specialization: ["Digital Signal Processing", "VLSI Design", "Embedded Systems"],
      experience: 18,
      email: "anand.mishra@college.edu",
      phone: "+91-9876543213",
      profileImage: "/faculty/anand.jpg",
      cabinLocation: "ECE Block, Room 401",
      consultationHours: "Monday & Wednesday, 11:00-13:00",
      publications: 55,
      subjects: ["Digital Electronics", "Signal Processing", "VLSI Design"],
      isHOD: true
    },
    {
      id: "ma001",
      name: "Dr. Priya Gopal",
      designation: "Associate Professor",
      department: "Mathematics",
      qualification: "Ph.D. in Mathematics, IIT Madras",
      specialization: ["Probability Theory", "Stochastic Processes", "Operations Research"],
      experience: 14,
      email: "priya.gopal@college.edu",
      phone: "+91-9876543214",
      profileImage: "/faculty/priya.jpg",
      cabinLocation: "Mathematics Block, Room 201",
      consultationHours: "Tuesday & Thursday, 14:00-16:00",
      publications: 38,
      subjects: ["Probability & Statistics", "Differential Equations", "Linear Algebra"]
    },
    {
      id: "hs001",
      name: "Dr. Rajesh Verma",
      designation: "Professor",
      department: "Humanities & Social Sciences",
      qualification: "Ph.D. in Economics, Delhi School of Economics",
      specialization: ["Microeconomics", "Development Economics", "Indian Economy"],
      experience: 22,
      email: "rajesh.verma@college.edu",
      phone: "+91-9876543215",
      cabinLocation: "HSS Block, Room 101",
      consultationHours: "Wednesday, 10:00-13:00",
      publications: 62,
      subjects: ["Economics for Engineers", "Indian Economy", "Business Economics"],
      isHOD: true
    },
    {
      id: "me001",
      name: "Dr. Sanjay Patil",
      designation: "Professor",
      department: "Mechanical Engineering",
      qualification: "Ph.D. in Mechanical Engineering, IIT Bombay",
      specialization: ["Thermodynamics", "Fluid Mechanics", "Heat Transfer"],
      experience: 20,
      email: "sanjay.patil@college.edu",
      phone: "+91-9876543216",
      cabinLocation: "ME Block, Room 301",
      consultationHours: "Monday & Friday, 14:00-16:00",
      publications: 48,
      subjects: ["Thermodynamics", "Fluid Mechanics", "Machine Design"],
      isHOD: true
    }
  ]);

  // State for search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  
  // Filter faculty based on search and department
  const filteredFaculty = facultyList.filter((faculty) => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faculty.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          faculty.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDepartment = selectedDepartment === "all" || faculty.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  // Group faculty by department for department tab
  const facultyByDepartment = departments.map(dept => ({
    department: dept,
    faculty: facultyList.filter(f => f.department === dept)
  }));

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Faculty Directory</h1>
            <p className="text-muted-foreground">
              Connect with our experienced faculty members
            </p>
          </div>
        </div>

        {/* Search and filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, subject or specialization..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <select
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm md:w-[250px]"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="all">All Departments</option>
            {departments.map((dept, idx) => (
              <option key={idx} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <Tabs defaultValue="grid">
          <TabsList className="mb-6">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="department">By Department</TabsTrigger>
          </TabsList>
          
          {/* Grid View */}
          <TabsContent value="grid">
            {filteredFaculty.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No faculty members match your search.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredFaculty.map((faculty) => (
                  <Card key={faculty.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center mb-4">
                        <Avatar className="h-24 w-24 mb-3">
                          <AvatarImage src={faculty.profileImage} />
                          <AvatarFallback className="text-lg">
                            {faculty.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                          <h3 className="font-bold text-lg">{faculty.name}</h3>
                          <p className="text-muted-foreground">{faculty.designation}</p>
                          {faculty.isHOD && (
                            <Badge className="mt-1">Head of Department</Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <BookOpen className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">Department</div>
                            <div className="text-sm text-muted-foreground">{faculty.department}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <Award className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">Specialization</div>
                            <div className="text-sm text-muted-foreground">
                              {faculty.specialization.join(", ")}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">Consultation Hours</div>
                            <div className="text-sm text-muted-foreground">{faculty.consultationHours}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div className="flex-1 truncate">
                            <div className="text-sm font-medium">Email</div>
                            <div className="text-sm text-muted-foreground truncate">{faculty.email}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-center mt-4">
                        <Button variant="outline" size="sm">View Profile</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Table View */}
          <TabsContent value="table">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Qualification</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFaculty.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        No faculty members match your search.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredFaculty.map((faculty) => (
                      <TableRow key={faculty.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {faculty.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{faculty.name}</div>
                              {faculty.isHOD && (
                                <Badge variant="outline" className="text-xs">HOD</Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{faculty.designation}</TableCell>
                        <TableCell>{faculty.department}</TableCell>
                        <TableCell>{faculty.qualification}</TableCell>
                        <TableCell>{faculty.experience} years</TableCell>
                        <TableCell>
                          <div className="text-sm">{faculty.email}</div>
                          <div className="text-sm text-muted-foreground">{faculty.phone}</div>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          {/* Department View */}
          <TabsContent value="department">
            <div className="space-y-10">
              {facultyByDepartment.map((dept, idx) => (
                <div key={idx}>
                  <div className="mb-4">
                    <h2 className="text-xl font-bold">{dept.department}</h2>
                    <div className="h-1 w-20 bg-primary mt-2"></div>
                  </div>
                  
                  {dept.faculty.length === 0 ? (
                    <p className="text-muted-foreground">No faculty members in this department.</p>
                  ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {dept.faculty.map((faculty) => (
                        <Card key={faculty.id}>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={faculty.profileImage} />
                                <AvatarFallback>
                                  {faculty.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{faculty.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {faculty.designation}
                                  {faculty.isHOD && " • HOD"}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button variant="outline" size="sm" className="h-7 px-2">
                                    <Mail className="h-3 w-3 mr-1" />
                                    Contact
                                  </Button>
                                  <Button variant="outline" size="sm" className="h-7 px-2">
                                    View
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Faculty; 