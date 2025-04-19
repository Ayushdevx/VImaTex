import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
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
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";

interface Course {
  id: string;
  code: string;
  name: string;
  professor: string;
  totalClasses: number;
  attendedClasses: number;
  schedule: string[];
  lastAttended?: string;
}

interface AttendanceRecord {
  id: string;
  courseId: string;
  courseName: string;
  date: string;
  status: "present" | "absent" | "medical" | "od";
  verificationStatus: "pending" | "approved" | "rejected";
}

const AttendanceTracker = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "cse301",
      code: "CSE301",
      name: "Data Structures & Algorithms",
      professor: "Dr. Rajeev Kumar",
      totalClasses: 42,
      attendedClasses: 35,
      schedule: ["Mon 10:00-11:00", "Wed 10:00-11:00", "Fri 9:00-11:00"],
      lastAttended: "2025-07-12",
    },
    {
      id: "cse401",
      code: "CSE401",
      name: "Machine Learning",
      professor: "Dr. Sunita Sharma",
      totalClasses: 38,
      attendedClasses: 29,
      schedule: ["Tue 2:00-3:00", "Thu 2:00-3:00", "Wed 3:00-5:00"],
      lastAttended: "2025-07-11",
    },
    {
      id: "ece201",
      code: "ECE201",
      name: "Digital Electronics",
      professor: "Dr. Anand Mishra",
      totalClasses: 45,
      attendedClasses: 31,
      schedule: ["Mon 11:00-12:00", "Wed 11:00-12:00", "Fri 11:00-12:00", "Thu 2:00-4:00"],
      lastAttended: "2025-07-10",
    },
    {
      id: "ma201",
      code: "MA201",
      name: "Probability & Statistics",
      professor: "Dr. Priya Gopal",
      totalClasses: 32,
      attendedClasses: 27,
      schedule: ["Tue 9:00-10:30", "Thu 9:00-10:30"],
      lastAttended: "2025-07-11",
    },
    {
      id: "hss301",
      code: "HSS301",
      name: "Economics for Engineers",
      professor: "Dr. Rajesh Verma",
      totalClasses: 28,
      attendedClasses: 18,
      schedule: ["Wed 5:00-7:00"],
      lastAttended: "2025-07-10",
    },
  ]);

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: "ar1",
      courseId: "cse301",
      courseName: "Data Structures & Algorithms",
      date: "2025-07-12",
      status: "present",
      verificationStatus: "approved",
    },
    {
      id: "ar2",
      courseId: "cse401",
      courseName: "Machine Learning",
      date: "2025-07-11",
      status: "present",
      verificationStatus: "approved",
    },
    {
      id: "ar3",
      courseId: "ece201",
      courseName: "Digital Electronics",
      date: "2025-07-10",
      status: "absent",
      verificationStatus: "approved",
    },
    {
      id: "ar4",
      courseId: "ma201",
      courseName: "Probability & Statistics",
      date: "2025-07-09",
      status: "medical",
      verificationStatus: "approved",
    },
    {
      id: "ar5",
      courseId: "hss301",
      courseName: "Economics for Engineers",
      date: "2025-07-08",
      status: "od",
      verificationStatus: "approved",
    },
    {
      id: "ar6",
      courseId: "cse301",
      courseName: "Data Structures & Algorithms",
      date: "2025-07-10",
      status: "present",
      verificationStatus: "approved",
    },
    {
      id: "ar7",
      courseId: "cse401",
      courseName: "Machine Learning",
      date: "2025-07-09",
      status: "present",
      verificationStatus: "approved",
    },
    {
      id: "ar8",
      courseId: "ece201",
      courseName: "Digital Electronics",
      date: "2025-07-08",
      status: "present",
      verificationStatus: "approved",
    },
  ]);

  const [medicalLeaveDialogOpen, setMedicalLeaveDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Calculate attendance percentage for a course
  const getAttendancePercentage = (course: Course) => {
    if (course.totalClasses === 0) return 0;
    return Math.round((course.attendedClasses / course.totalClasses) * 100);
  };
  
  // Get color based on attendance percentage
  const getAttendanceColor = (percentage: number) => {
    if (percentage < 75) return "text-red-500";
    if (percentage < 85) return "text-amber-500";
    return "text-green-500";
  };
  
  // Get status badge for attendance records
  const getStatusBadge = (status: AttendanceRecord["status"]) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-500">Present</Badge>;
      case "absent":
        return <Badge className="bg-red-500">Absent</Badge>;
      case "medical":
        return <Badge className="bg-blue-500">Medical Leave</Badge>;
      case "od":
        return <Badge className="bg-purple-500">OD</Badge>;
      default:
        return null;
    }
  };

  // Get verification status badge
  const getVerificationBadge = (status: AttendanceRecord["verificationStatus"]) => {
    switch (status) {
      case "approved":
        return <Badge variant="outline" className="border-green-500 text-green-500">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="border-red-500 text-red-500">Rejected</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Pending</Badge>;
      default:
        return null;
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMM yyyy");
  };

  // Handle medical leave application
  const handleMedicalLeaveSubmit = () => {
    toast({
      title: "Medical leave submitted",
      description: "Your medical leave application has been submitted for verification.",
    });
    setMedicalLeaveDialogOpen(false);
  };

  // Calculate overall attendance percentage
  const overallAttendance = () => {
    const totalClasses = courses.reduce((sum, course) => sum + course.totalClasses, 0);
    const attendedClasses = courses.reduce((sum, course) => sum + course.attendedClasses, 0);
    return totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 100) : 0;
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Attendance Tracker</h1>
            <p className="text-muted-foreground">
              Track and manage your class attendance
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={() => setMedicalLeaveDialogOpen(true)}>Apply for Medical Leave</Button>
          </div>
        </div>

        {/* Overall Attendance Summary */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className={`text-2xl font-bold ${getAttendanceColor(overallAttendance())}`}>
                  {overallAttendance()}%
                </div>
                <Progress value={overallAttendance()} className="w-2/3" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">College Requirement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">75%</div>
                <Progress value={75} className="w-2/3" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Classes This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">3 more than last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Shortage Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {courses.filter(c => getAttendancePercentage(c) < 75).length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Courses with attendance below 75%</p>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Warnings */}
        {courses.filter(c => getAttendancePercentage(c) < 75).length > 0 && (
          <Alert className="mb-6 border-red-500/50 bg-red-500/10">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <AlertTitle>Attendance Shortage Alert</AlertTitle>
            <AlertDescription>
              You have attendance shortage in {courses.filter(c => getAttendancePercentage(c) < 75).length} courses. 
              Please ensure a minimum of 75% attendance to be eligible for examinations.
            </AlertDescription>
          </Alert>
        )}

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="overview">Course Overview</TabsTrigger>
            <TabsTrigger value="records">Attendance Records</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Professor</TableHead>
                    <TableHead>Classes</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Attended</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => {
                    const percentage = getAttendancePercentage(course);
                    return (
                      <TableRow key={course.id}>
                        <TableCell>
                          <div className="font-medium">{course.code}</div>
                          <div className="text-sm text-muted-foreground">{course.name}</div>
                        </TableCell>
                        <TableCell>{course.professor}</TableCell>
                        <TableCell>{course.attendedClasses}/{course.totalClasses}</TableCell>
                        <TableCell className={getAttendanceColor(percentage)}>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{percentage}%</span>
                            <Progress value={percentage} className="w-16 h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          {percentage < 75 ? (
                            <Badge variant="destructive">Shortage</Badge>
                          ) : percentage < 85 ? (
                            <Badge variant="outline" className="border-amber-500 text-amber-500">
                              Borderline
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-green-500 text-green-500">
                              Good
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {course.lastAttended ? formatDate(course.lastAttended) : "N/A"}
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedCourse(course)}
                          >
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          {/* Records Tab */}
          <TabsContent value="records" className="mt-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Verification</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        {formatDate(record.date)}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{record.courseName}</div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(record.status)}
                      </TableCell>
                      <TableCell>
                        {getVerificationBadge(record.verificationStatus)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          {/* Calendar Tab */}
          <TabsContent value="calendar" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Calendar View</h3>
                  <p className="text-muted-foreground mt-2">
                    A detailed calendar view with attendance status by date will be available here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Medical Leave Dialog */}
        <Dialog open={medicalLeaveDialogOpen} onOpenChange={setMedicalLeaveDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apply for Medical Leave</DialogTitle>
              <DialogDescription>
                Submit your medical leave application with supporting documents.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="course" className="text-sm font-medium">
                  Course
                </label>
                <select 
                  id="course" 
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.code} - {course.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="dates" className="text-sm font-medium">
                  Dates
                </label>
                <div className="flex gap-2">
                  <input 
                    type="date" 
                    id="from-date"
                    className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm flex-1"
                  />
                  <span className="flex items-center">to</span>
                  <input 
                    type="date" 
                    id="to-date"
                    className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm flex-1"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="document" className="text-sm font-medium">
                  Medical Certificate
                </label>
                <input 
                  type="file" 
                  id="document"
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Upload a scanned copy of your medical certificate (PDF format only)
                </p>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="reason" className="text-sm font-medium">
                  Additional Information
                </label>
                <textarea 
                  id="reason" 
                  rows={3}
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  placeholder="Add any additional details about your absence..."
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setMedicalLeaveDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleMedicalLeaveSubmit}>
                Submit Application
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Course Detail Dialog */}
        {selectedCourse && (
          <Dialog open={!!selectedCourse} onOpenChange={(open) => !open && setSelectedCourse(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedCourse.code}: {selectedCourse.name}</DialogTitle>
                <DialogDescription>
                  Professor: {selectedCourse.professor}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" /> Attendance Summary
                  </h4>
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold">{getAttendancePercentage(selectedCourse)}%</div>
                    <Progress 
                      value={getAttendancePercentage(selectedCourse)} 
                      className="flex-1" 
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-lg font-medium">{selectedCourse.attendedClasses}</div>
                      <div className="text-xs text-muted-foreground">Classes Attended</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-medium">{selectedCourse.totalClasses - selectedCourse.attendedClasses}</div>
                      <div className="text-xs text-muted-foreground">Classes Missed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-medium">{selectedCourse.totalClasses}</div>
                      <div className="text-xs text-muted-foreground">Total Classes</div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Class Schedule
                  </h4>
                  <div className="grid gap-2">
                    {selectedCourse.schedule.map((scheduleItem, index) => (
                      <div key={index} className="text-sm p-2 rounded-md border flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        {scheduleItem}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Requirements</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Minimum Required</span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Current Status</span>
                      <span className={`text-sm font-medium ${
                        getAttendancePercentage(selectedCourse) < 75 
                          ? "text-red-500" 
                          : "text-green-500"
                      }`}>
                        {getAttendancePercentage(selectedCourse) < 75 ? "Shortage" : "Good Standing"}
                      </span>
                    </div>
                    {getAttendancePercentage(selectedCourse) < 75 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Classes needed to reach 75%</span>
                        <span className="text-sm font-medium text-amber-500">
                          {Math.ceil(
                            (0.75 * selectedCourse.totalClasses) - selectedCourse.attendedClasses
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedCourse(null)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </Layout>
  );
};

export default AttendanceTracker; 