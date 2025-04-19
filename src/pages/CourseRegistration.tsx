import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Calendar, Info, Clock, AlertTriangle, BookOpen, Users } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Interface for courses
interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  type: "Core" | "Elective" | "Lab" | "Project";
  semester: number; 
  department: string;
  professor: string;
  seats: {
    total: number;
    available: number;
  };
  schedule: {
    days: string[];
    time: string;
    location: string;
  }[];
  prerequisites: string[];
  description: string;
  enrolled?: boolean;
}

// Interface for departments
interface Department {
  id: string;
  name: string;
  code: string;
}

const CourseRegistration = () => {
  // Mock data for academic periods
  const academicPeriods = [
    { id: "1", name: "Monsoon Semester 2025-26", active: true, registrationOpen: true },
    { id: "2", name: "Winter Semester 2025-26", active: false, registrationOpen: false },
  ];

  const departments: Department[] = [
    { id: "cse", name: "Computer Science & Engineering", code: "CSE" },
    { id: "ece", name: "Electronics & Communication Engineering", code: "ECE" },
    { id: "me", name: "Mechanical Engineering", code: "ME" },
    { id: "ce", name: "Civil Engineering", code: "CE" },
    { id: "ee", name: "Electrical Engineering", code: "EE" },
    { id: "bt", name: "Biotechnology", code: "BT" },
    { id: "ch", name: "Chemistry", code: "CH" },
    { id: "ma", name: "Mathematics", code: "MA" },
    { id: "hs", name: "Humanities & Social Sciences", code: "HSS" },
  ];

  // Mock data for courses
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "cse301",
      code: "CSE301",
      name: "Data Structures & Algorithms",
      credits: 4,
      type: "Core",
      semester: 3,
      department: "Computer Science & Engineering",
      professor: "Dr. Rajeev Kumar",
      seats: {
        total: 120,
        available: 35,
      },
      schedule: [
        { days: ["Monday", "Wednesday"], time: "10:00 AM - 11:00 AM", location: "LHC 201" },
        { days: ["Friday"], time: "9:00 AM - 11:00 AM", location: "CSE Lab 2" },
      ],
      prerequisites: ["CSE101", "CSE201"],
      description: "This course covers fundamental data structures and algorithms with analysis of time and space complexity.",
      enrolled: false,
    },
    {
      id: "cse401",
      code: "CSE401",
      name: "Machine Learning",
      credits: 4,
      type: "Elective",
      semester: 5,
      department: "Computer Science & Engineering",
      professor: "Dr. Sunita Sharma",
      seats: {
        total: 80,
        available: 12,
      },
      schedule: [
        { days: ["Tuesday", "Thursday"], time: "2:00 PM - 3:00 PM", location: "LHC 305" },
        { days: ["Wednesday"], time: "3:00 PM - 5:00 PM", location: "AI Lab" },
      ],
      prerequisites: ["CSE301", "MA201"],
      description: "Introduction to machine learning algorithms, neural networks, and practical applications.",
      enrolled: false,
    },
    {
      id: "ece201",
      code: "ECE201",
      name: "Digital Electronics",
      credits: 4,
      type: "Core",
      semester: 3,
      department: "Electronics & Communication Engineering",
      professor: "Dr. Anand Mishra",
      seats: {
        total: 100,
        available: 25,
      },
      schedule: [
        { days: ["Monday", "Wednesday", "Friday"], time: "11:00 AM - 12:00 PM", location: "ECE Building 102" },
        { days: ["Thursday"], time: "2:00 PM - 4:00 PM", location: "Electronics Lab" },
      ],
      prerequisites: ["ECE101"],
      description: "Fundamentals of digital circuits, Boolean algebra, and logic design.",
      enrolled: false,
    },
    {
      id: "ma201",
      code: "MA201",
      name: "Probability & Statistics",
      credits: 3,
      type: "Core",
      semester: 3,
      department: "Mathematics",
      professor: "Dr. Priya Gopal",
      seats: {
        total: 150,
        available: 45,
      },
      schedule: [
        { days: ["Tuesday", "Thursday"], time: "9:00 AM - 10:30 AM", location: "Mathematics Block 301" },
      ],
      prerequisites: ["MA101"],
      description: "Introduction to probability theory, random variables, and statistical methods.",
      enrolled: false,
    },
    {
      id: "hss301",
      code: "HSS301",
      name: "Economics for Engineers",
      credits: 2,
      type: "Elective",
      semester: 5,
      department: "Humanities & Social Sciences",
      professor: "Dr. Rajesh Verma",
      seats: {
        total: 90,
        available: 22,
      },
      schedule: [
        { days: ["Wednesday"], time: "5:00 PM - 7:00 PM", location: "HSS Seminar Hall" },
      ],
      prerequisites: [],
      description: "Basic economic principles and their applications in engineering and technology sectors.",
      enrolled: false,
    },
  ]);

  // State for selected course
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activePeriod] = useState(academicPeriods[0]);
  const [activeTab, setActiveTab] = useState("available");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [creditLimit] = useState(24);
  const [currentCredits, setCurrentCredits] = useState(0);

  // Filter courses based on active tab and selected department
  const filteredCourses = courses.filter((course) => {
    const matchesTab = activeTab === "available" ? !course.enrolled : course.enrolled;
    const matchesDepartment = selectedDepartment ? course.department === departments.find(d => d.id === selectedDepartment)?.name : true;
    return matchesTab && matchesDepartment;
  });

  // Handle course enrollment
  const handleCourseEnrollment = (courseId: string, enroll: boolean) => {
    setCourses(prevCourses => 
      prevCourses.map(course => {
        if (course.id === courseId) {
          // Calculate new credit total
          const newCredits = enroll 
            ? currentCredits + course.credits
            : currentCredits - course.credits;
            
          // Check if enrolling would exceed credit limit
          if (enroll && newCredits > creditLimit) {
            toast({
              title: "Credit limit exceeded",
              description: `You cannot enroll in more than ${creditLimit} credits this semester.`,
              variant: "destructive",
            });
            return course;
          }
          
          // Update credit count
          setCurrentCredits(newCredits);
          
          return { ...course, enrolled: enroll };
        }
        return course;
      })
    );
    
    toast({
      title: enroll ? "Course added" : "Course dropped",
      description: enroll 
        ? `Successfully enrolled in ${courses.find(c => c.id === courseId)?.code}`
        : `Successfully dropped ${courses.find(c => c.id === courseId)?.code}`,
    });
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Course Registration</h1>
            <p className="text-muted-foreground">{activePeriod.name}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Registration Open</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm">Add/Drop Period</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm">Registration Closed</span>
            </div>
          </div>
        </div>

        {/* Credit summary */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Enrolled Credits</span>
                  <span className="text-2xl font-bold">{currentCredits}/{creditLimit}</span>
                </div>
                <div className="h-12 w-0.5 bg-border hidden md:block"></div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Enrolled Courses</span>
                  <span className="text-2xl font-bold">{courses.filter(c => c.enrolled).length}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button>Submit Registration</Button>
                <Button variant="outline">Save Draft</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Alert className="mb-6 border-yellow-500/50 bg-yellow-500/10">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <AlertTitle>Important Notice</AlertTitle>
          <AlertDescription>
            The last date to submit your final course registration is 15th July 2025. After this date, a late fee will be applicable.
          </AlertDescription>
        </Alert>

        {/* Course listing */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="available">Available Courses</TabsTrigger>
              <TabsTrigger value="registered">Registered Courses</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <select 
                className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                value={selectedDepartment || ""}
                onChange={(e) => setSelectedDepartment(e.target.value || null)}
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>
          </div>

          <TabsContent value="available">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Professor</TableHead>
                    <TableHead>Seats</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        No courses available matching your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.code}</TableCell>
                        <TableCell>
                          <Button variant="link" className="p-0 h-auto font-normal text-left" onClick={() => setSelectedCourse(course)}>
                            {course.name}
                          </Button>
                        </TableCell>
                        <TableCell>{course.credits}</TableCell>
                        <TableCell>
                          <Badge variant={course.type === "Core" ? "default" : "secondary"}>
                            {course.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{course.professor}</TableCell>
                        <TableCell>
                          {course.seats.available < 10 ? (
                            <span className="text-red-500">{course.seats.available}/{course.seats.total}</span>
                          ) : (
                            <span>{course.seats.available}/{course.seats.total}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            onClick={() => handleCourseEnrollment(course.id, true)}
                            disabled={course.seats.available === 0}
                          >
                            Enroll
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="registered">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Professor</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        You haven't registered for any courses yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.code}</TableCell>
                        <TableCell>
                          <Button variant="link" className="p-0 h-auto font-normal text-left" onClick={() => setSelectedCourse(course)}>
                            {course.name}
                          </Button>
                        </TableCell>
                        <TableCell>{course.credits}</TableCell>
                        <TableCell>
                          <Badge variant={course.type === "Core" ? "default" : "secondary"}>
                            {course.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{course.professor}</TableCell>
                        <TableCell className="text-xs">
                          {course.schedule[0].days.join(", ")}<br />
                          {course.schedule[0].time}
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm"
                            variant="destructive"
                            onClick={() => handleCourseEnrollment(course.id, false)}
                          >
                            Drop
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>

        {/* Course Detail Dialog */}
        {selectedCourse && (
          <Dialog open={!!selectedCourse} onOpenChange={(open) => !open && setSelectedCourse(null)}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <Badge variant={selectedCourse.type === "Core" ? "default" : "secondary"}>
                    {selectedCourse.type}
                  </Badge>
                  <Badge variant="outline">{selectedCourse.credits} Credits</Badge>
                </div>
                <DialogTitle className="text-xl mt-2">{selectedCourse.code}: {selectedCourse.name}</DialogTitle>
                <DialogDescription>
                  {selectedCourse.department} • Semester {selectedCourse.semester}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" /> Course Description
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedCourse.description}
                  </p>

                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" /> Instructor
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedCourse.professor}
                  </p>

                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4" /> Prerequisites
                  </h4>
                  <div className="mb-4">
                    {selectedCourse.prerequisites.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No prerequisites</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {selectedCourse.prerequisites.map((prereq) => (
                          <Badge key={prereq} variant="outline">{prereq}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Schedule
                  </h4>
                  <div className="space-y-3 mb-4">
                    {selectedCourse.schedule.map((schedule, index) => (
                      <div key={index} className="text-sm p-3 rounded-md border">
                        <div className="font-medium">{schedule.days.join(", ")}</div>
                        <div className="text-muted-foreground flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3" /> {schedule.time}
                        </div>
                        <div className="text-muted-foreground mt-1">
                          Location: {schedule.location}
                        </div>
                      </div>
                    ))}
                  </div>

                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" /> Enrollment
                  </h4>
                  <p className="text-sm mb-4">
                    <span className={selectedCourse.seats.available < 10 ? "text-red-500 font-medium" : ""}>
                      {selectedCourse.seats.available} seats available
                    </span> {" "}
                    out of {selectedCourse.seats.total} total seats
                  </p>
                </div>
              </div>

              <DialogFooter>
                {selectedCourse.enrolled ? (
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      handleCourseEnrollment(selectedCourse.id, false);
                      setSelectedCourse(null);
                    }}
                  >
                    Drop Course
                  </Button>
                ) : (
                  <Button 
                    onClick={() => {
                      handleCourseEnrollment(selectedCourse.id, true);
                      setSelectedCourse(null);
                    }}
                    disabled={selectedCourse.seats.available === 0}
                  >
                    Enroll in Course
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </Layout>
  );
};

export default CourseRegistration; 