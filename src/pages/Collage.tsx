import { Layout } from "@/components/layout/index";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Calendar,
  Clock,
  Book,
  FileText,
  Bell,
  User,
  Home,
  Utensils,
  Shirt,
  MapPin,
  Heart,
  BookOpen,
  CheckSquare,
  Calendar as CalendarIcon,
  AlertCircle,
  BarChart,
  ClipboardList,
  Users,
  ShoppingBag,
  Search,
  Coffee,
  CalendarDays,
  BookMarked,
  BellRing
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Collage = () => {
  // State variables
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();
  
  // Sample data
  const assignments = [
    { id: 1, title: "Data Structures Assignment", course: "CS301", deadline: "2023-12-05", status: "pending", progress: 30 },
    { id: 2, title: "Database Project", course: "CS401", deadline: "2023-12-10", status: "in-progress", progress: 65 },
    { id: 3, title: "Machine Learning Lab", course: "CS501", deadline: "2023-12-15", status: "completed", progress: 100 }
  ];
  
  const exams = [
    { id: 1, title: "Data Structures", course: "CS301", date: "2023-12-15", preparationStatus: 35 },
    { id: 2, title: "Database Management", course: "CS401", date: "2023-12-20", preparationStatus: 65 },
  ];
  
  const events = [
    { id: 1, title: "Tech Summit", date: "2023-11-25", location: "Main Auditorium" },
    { id: 2, title: "Cultural Night", date: "2023-12-10", location: "Amphitheater" },
  ];
  
  const messMenu = {
    breakfast: ["Bread & Butter", "Boiled Eggs", "Tea/Coffee"],
    lunch: ["Rice", "Dal", "Mixed Vegetables", "Chicken Curry"],
    dinner: ["Chapati", "Paneer Curry", "Rice", "Yogurt"]
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  // Get urgency color
  const getUrgencyColor = (deadline) => {
    const today = new Date();
    const dueDate = new Date(deadline);
    const diffDays = Math.round((dueDate - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "bg-red-500";
    if (diffDays < 2) return "bg-orange-500";
    if (diffDays < 5) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  // Get progress color
  const getProgressColor = (progress) => {
    if (progress < 30) return "bg-red-500";
    if (progress < 70) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  // Set reminder function
  const setReminder = (item, type) => {
    toast({
      title: "Reminder Set",
      description: `You will be reminded about ${item.title} on ${formatDate(type === 'exam' ? item.date : item.deadline)}`,
    });
  };
  
  // Main render
  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Campus Hub</h1>
          <div className="space-x-3">
            <Button variant="outline">
              <BellRing className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Button>
              <BookMarked className="mr-2 h-4 w-4" />
              Study Mode
            </Button>
          </div>
        </div>

        <Tabs defaultValue="dashboard" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="hostel">Hostel</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Quick Access Card */}
              <Card className="md:col-span-1 md:row-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Welcome Back!
                  </CardTitle>
                  <CardDescription>Quick access to your campus life</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">Computer Science, 3rd Year</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Quick Links</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="justify-start">
                        <Calendar className="mr-2 h-4 w-4" />
                        Timetable
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        <ClipboardList className="mr-2 h-4 w-4" />
                        Assignments
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Study Materials
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        <Utensils className="mr-2 h-4 w-4" />
                        Mess Menu
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        <Users className="mr-2 h-4 w-4" />
                        Clubs
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        Events
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Today's Schedule</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm border-l-2 border-blue-500 pl-2">
                        <div>
                          <p className="font-medium">Data Structures</p>
                          <p className="text-xs text-muted-foreground">CS301 • Lecture Hall 2</p>
                        </div>
                        <Badge variant="outline">9:00 AM</Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm border-l-2 border-green-500 pl-2">
                        <div>
                          <p className="font-medium">Database Lab</p>
                          <p className="text-xs text-muted-foreground">CS401 • Lab 3</p>
                        </div>
                        <Badge variant="outline">11:00 AM</Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm border-l-2 border-purple-500 pl-2">
                        <div>
                          <p className="font-medium">Tech Club Meeting</p>
                          <p className="text-xs text-muted-foreground">Tech Hub, Main Building</p>
                        </div>
                        <Badge variant="outline">5:00 PM</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Full Calendar
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Pending Assignments */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5" />
                    Pending Assignments
                  </CardTitle>
                  <CardDescription>Track your assignment progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignments.filter(a => a.status !== "completed").map((assignment) => (
                      <div key={assignment.id} className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Badge className={getUrgencyColor(assignment.deadline)} variant="secondary">
                            {formatDate(assignment.deadline)}
                          </Badge>
                          <div>
                            <p className="font-medium">{assignment.title}</p>
                            <p className="text-sm text-muted-foreground">{assignment.course}</p>
                            <div className="mt-2 flex items-center gap-2">
                              <div className="w-32">
                                <Progress value={assignment.progress} className={getProgressColor(assignment.progress)} />
                              </div>
                              <span className="text-xs">{assignment.progress}%</span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => setReminder(assignment, 'assignment')}>
                          <Bell className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Assignments</Button>
                </CardFooter>
              </Card>
              
              {/* Upcoming Exams */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Upcoming Exams
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {exams.map((exam) => (
                      <div key={exam.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{exam.title}</p>
                            <p className="text-sm text-muted-foreground">{exam.course} • {formatDate(exam.date)}</p>
                          </div>
                          <Button size="sm" variant="outline" onClick={() => setReminder(exam, 'exam')}>
                            <Bell className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-full">
                            <p className="text-xs mb-1">Preparation: {exam.preparationStatus}%</p>
                            <Progress value={exam.preparationStatus} className={getProgressColor(exam.preparationStatus)} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Exams</Button>
                </CardFooter>
              </Card>
              
              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="flex items-start gap-3">
                        <div className="bg-primary/10 rounded-md p-2 text-center min-w-[50px]">
                          <p className="text-xs">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</p>
                          <p className="font-bold">{new Date(event.date).getDate()}</p>
                        </div>
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            {event.location}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Events</Button>
                </CardFooter>
              </Card>
              
              {/* Today's Mess Menu */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="h-5 w-5" />
                    Today's Mess Menu
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-yellow-500">Breakfast</Badge>
                        <span className="text-xs text-muted-foreground">7:30 AM - 9:30 AM</span>
                      </div>
                      <ul className="text-sm space-y-1">
                        {messMenu.breakfast.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-orange-500">Lunch</Badge>
                        <span className="text-xs text-muted-foreground">12:30 PM - 2:30 PM</span>
                      </div>
                      <ul className="text-sm space-y-1">
                        {messMenu.lunch.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-blue-500">Dinner</Badge>
                        <span className="text-xs text-muted-foreground">7:30 PM - 9:30 PM</span>
                      </div>
                      <ul className="text-sm space-y-1">
                        {messMenu.dinner.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Weekly Menu</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="academic" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Timetable Sync */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Timetable
                  </CardTitle>
                  <CardDescription>Your weekly class schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-6 gap-2">
                      <div className="text-center font-medium text-sm">Time</div>
                      <div className="text-center font-medium text-sm">Mon</div>
                      <div className="text-center font-medium text-sm">Tue</div>
                      <div className="text-center font-medium text-sm">Wed</div>
                      <div className="text-center font-medium text-sm">Thu</div>
                      <div className="text-center font-medium text-sm">Fri</div>
                      
                      <div className="text-center text-sm py-1">9:00 AM</div>
                      <div className="bg-blue-100 text-blue-800 text-xs p-1 rounded">CS301<br/>Lecture</div>
                      <div className="bg-green-100 text-green-800 text-xs p-1 rounded">CS401<br/>Lecture</div>
                      <div className="bg-blue-100 text-blue-800 text-xs p-1 rounded">CS301<br/>Lecture</div>
                      <div className="bg-green-100 text-green-800 text-xs p-1 rounded">CS401<br/>Lecture</div>
                      <div className="bg-purple-100 text-purple-800 text-xs p-1 rounded">CS501<br/>Lecture</div>
                      
                      <div className="text-center text-sm py-1">11:00 AM</div>
                      <div className="bg-yellow-100 text-yellow-800 text-xs p-1 rounded">CS201<br/>Lecture</div>
                      <div className="bg-purple-100 text-purple-800 text-xs p-1 rounded">CS501<br/>Lecture</div>
                      <div className="bg-yellow-100 text-yellow-800 text-xs p-1 rounded">CS201<br/>Lecture</div>
                      <div className="bg-purple-100 text-purple-800 text-xs p-1 rounded">CS501<br/>Lecture</div>
                      <div className="bg-blue-100 text-blue-800 text-xs p-1 rounded">CS301<br/>Lecture</div>
                      
                      <div className="text-center text-sm py-1">2:00 PM</div>
                      <div className="bg-blue-100 text-blue-800 text-xs p-1 rounded">CS301<br/>Lab</div>
                      <div className="bg-gray-100 text-gray-800 text-xs p-1 rounded">Free<br/>Hour</div>
                      <div className="bg-green-100 text-green-800 text-xs p-1 rounded">CS401<br/>Lab</div>
                      <div className="bg-gray-100 text-gray-800 text-xs p-1 rounded">Free<br/>Hour</div>
                      <div className="bg-purple-100 text-purple-800 text-xs p-1 rounded">CS501<br/>Lab</div>
                      
                      <div className="text-center text-sm py-1">4:00 PM</div>
                      <div className="bg-gray-100 text-gray-800 text-xs p-1 rounded">Free<br/>Hour</div>
                      <div className="bg-yellow-100 text-yellow-800 text-xs p-1 rounded">CS201<br/>Lab</div>
                      <div className="bg-gray-100 text-gray-800 text-xs p-1 rounded">Free<br/>Hour</div>
                      <div className="bg-yellow-100 text-yellow-800 text-xs p-1 rounded">CS201<br/>Lab</div>
                      <div className="bg-gray-100 text-gray-800 text-xs p-1 rounded">Free<br/>Hour</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Bell className="mr-2 h-4 w-4" />
                    Set Class Reminders
                  </Button>
                  <Button>
                    <Calendar className="mr-2 h-4 w-4" />
                    Sync with Calendar
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Course List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    My Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-3">
                      <div className="font-medium">CS301: Data Structures</div>
                      <div className="text-sm text-muted-foreground">Prof. Johnson</div>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge variant="outline">Credits: 4</Badge>
                        <Button size="sm" variant="ghost">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-3">
                      <div className="font-medium">CS401: Database Systems</div>
                      <div className="text-sm text-muted-foreground">Prof. Williams</div>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge variant="outline">Credits: 4</Badge>
                        <Button size="sm" variant="ghost">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-3">
                      <div className="font-medium">CS501: Machine Learning</div>
                      <div className="text-sm text-muted-foreground">Prof. Brown</div>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge variant="outline">Credits: 3</Badge>
                        <Button size="sm" variant="ghost">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-3">
                      <div className="font-medium">CS201: Programming</div>
                      <div className="text-sm text-muted-foreground">Prof. Davis</div>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge variant="outline">Credits: 3</Badge>
                        <Button size="sm" variant="ghost">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Assignment Management */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5" />
                    Assignment Management
                  </CardTitle>
                  <div className="flex justify-between">
                    <CardDescription>Track and manage your assignments</CardDescription>
                    <Tabs defaultValue="all" className="w-[400px]">
                      <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative overflow-x-auto rounded-md border">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-muted">
                          <tr>
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Course</th>
                            <th className="px-4 py-2">Deadline</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Progress</th>
                            <th className="px-4 py-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="px-4 py-3 font-medium">Data Structures Assignment</td>
                            <td className="px-4 py-3">CS301</td>
                            <td className="px-4 py-3">Dec 5, 2023</td>
                            <td className="px-4 py-3">
                              <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                                Pending
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <Progress value={30} className="w-full h-2 bg-yellow-500" />
                                <span>30%</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-1">
                                <Button size="sm" variant="ghost">
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Bell className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3 font-medium">Database Project</td>
                            <td className="px-4 py-3">CS401</td>
                            <td className="px-4 py-3">Dec 10, 2023</td>
                            <td className="px-4 py-3">
                              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                                In Progress
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <Progress value={65} className="w-full h-2 bg-blue-500" />
                                <span>65%</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-1">
                                <Button size="sm" variant="ghost">
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Bell className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium">Machine Learning Lab</td>
                            <td className="px-4 py-3">CS501</td>
                            <td className="px-4 py-3">Dec 15, 2023</td>
                            <td className="px-4 py-3">
                              <Badge variant="outline" className="bg-green-100 text-green-800">
                                Completed
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <Progress value={100} className="w-full h-2 bg-green-500" />
                                <span>100%</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-1">
                                <Button size="sm" variant="ghost">
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Bell className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <CheckSquare className="mr-2 h-4 w-4" />
                    Update Progress
                  </Button>
                  <Button>
                    <ClipboardList className="mr-2 h-4 w-4" />
                    Add Assignment
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Study Materials */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5" />
                    Study Materials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-2 rounded-md border">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">DS Lecture Notes</p>
                          <p className="text-xs text-muted-foreground">CS301</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 rounded-md border">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">DB Lecture Slides</p>
                          <p className="text-xs text-muted-foreground">CS401</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 rounded-md border">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="font-medium">ML Algorithms</p>
                          <p className="text-xs text-muted-foreground">CS501</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 rounded-md border">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-yellow-500" />
                        <div>
                          <p className="font-medium">Programming Guide</p>
                          <p className="text-xs text-muted-foreground">CS201</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Book className="mr-2 h-4 w-4" />
                    Browse All Materials
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Exam Schedule */}
              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5" />
                    Exam Schedule
                  </CardTitle>
                  <CardDescription>Upcoming examinations and preparation status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative overflow-x-auto rounded-md border">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-muted">
                          <tr>
                            <th className="px-4 py-2">Course</th>
                            <th className="px-4 py-2">Exam Type</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Time</th>
                            <th className="px-4 py-2">Venue</th>
                            <th className="px-4 py-2">Preparation</th>
                            <th className="px-4 py-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="px-4 py-3 font-medium">CS301: Data Structures</td>
                            <td className="px-4 py-3">End Semester</td>
                            <td className="px-4 py-3">Dec 15, 2023</td>
                            <td className="px-4 py-3">9:00 AM - 12:00 PM</td>
                            <td className="px-4 py-3">Exam Hall A</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <Progress value={35} className="w-full h-2 bg-red-500" />
                                <span>35%</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-1">
                                <Button size="sm" variant="ghost">
                                  <Bell className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <BookOpen className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3 font-medium">CS401: Database Systems</td>
                            <td className="px-4 py-3">End Semester</td>
                            <td className="px-4 py-3">Dec 20, 2023</td>
                            <td className="px-4 py-3">2:00 PM - 5:00 PM</td>
                            <td className="px-4 py-3">Exam Hall B</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <Progress value={65} className="w-full h-2 bg-yellow-500" />
                                <span>65%</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-1">
                                <Button size="sm" variant="ghost">
                                  <Bell className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <BookOpen className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium">CS201: Programming</td>
                            <td className="px-4 py-3">Quiz</td>
                            <td className="px-4 py-3">Dec 5, 2023</td>
                            <td className="px-4 py-3">10:00 AM - 12:00 PM</td>
                            <td className="px-4 py-3">Lecture Hall 3</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <Progress value={80} className="w-full h-2 bg-green-500" />
                                <span>80%</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-1">
                                <Button size="sm" variant="ghost">
                                  <Bell className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <BookOpen className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <BarChart className="mr-2 h-4 w-4" />
                    Performance Analysis
                  </Button>
                  <Button>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Create Study Plan
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="hostel" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Mess Menu */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="h-5 w-5" />
                    Mess Menu
                  </CardTitle>
                  <div className="flex justify-between">
                    <CardDescription>Weekly mess schedule</CardDescription>
                    <Tabs defaultValue="monday" className="w-[400px]">
                      <TabsList>
                        <TabsTrigger value="monday">Mon</TabsTrigger>
                        <TabsTrigger value="tuesday">Tue</TabsTrigger>
                        <TabsTrigger value="wednesday">Wed</TabsTrigger>
                        <TabsTrigger value="thursday">Thu</TabsTrigger>
                        <TabsTrigger value="friday">Fri</TabsTrigger>
                        <TabsTrigger value="saturday">Sat</TabsTrigger>
                        <TabsTrigger value="sunday">Sun</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="rounded-md border p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-2 bg-yellow-100 rounded-full">
                            <Coffee className="h-5 w-5 text-yellow-800" />
                          </div>
                          <h3 className="font-medium">Breakfast</h3>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium">Time: </span>
                            <span>7:30 AM - 9:30 AM</span>
                          </div>
                          <ul className="text-sm space-y-1">
                            <li className="flex items-center gap-1">
                              <div className="w-1 h-1 rounded-full bg-primary"></div>
                              <span>Bread & Butter</span>
                            </li>
                            <li className="flex items-center gap-1">
                              <div className="w-1 h-1 rounded-full bg-primary"></div>
                              <span>Boiled Eggs</span>
                            </li>
                            <li className="flex items-center gap-1">
                              <div className="w-1 h-1 rounded-full bg-primary"></div>
                              <span>Tea/Coffee</span>
                            </li>
                            <li className="flex items-center gap-1">
                              <div className="w-1 h-1 rounded-full bg-primary"></div>
                              <span>Fruits</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="rounded-md border p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-2 bg-orange-100 rounded-full">
                            <Utensils className="h-5 w-5 text-orange-800" />
                          </div>
                          <h3 className="font-medium">Lunch</h3>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium">Time: </span>
                            <span>12:30 PM - 2:30 PM</span>
                          </div>
                          <ul className="text-sm space-y-1">
                            <li className="flex items-center gap-1">
                              <div className="w-1 h-1 rounded-full bg-primary"></div>
                              <span>Rice</span>
                            </li>
                            <li className="flex items-center gap-1">
                              <div className="w-1 h-1 rounded-full bg-primary"></div>
                              <span>Dal</span>
                            </li>
                            <li className="flex items-center gap-1">
                              <div className="w-1 h-1 rounded-full bg-primary"></div>
                              <span>Mixed Vegetables</span>
                            </li>
                            <li className="flex items-center gap-1">
                              <div className="w-1 h-1 rounded-full bg-primary"></div>
                              <span>Chicken Curry</span>
                            </li>
                            <li className="flex items-center gap-1">
                              <div className="w-1 h-1 rounded-full bg-primary"></div>
                              <span>Salad</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="rounded-md border p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-2 bg-blue-100 rounded-full">
                            <Utensils className="h-5 w-5 text-blue-800" />
                          </div>
                          <h3 className="font-medium">Dinner</h3>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium">Time: </span>
                            <span>7:30 PM - 9:30 PM</span>
                          </div>
                          <ul className="text-sm space-y-1">
                            <li className="flex items-center gap-1">
                              <div className="w-1 h-1 rounded-full bg-primary"></div>
                              <span>Chapati</span>
                            </li>
                            <li className="flex items-center gap-1">
                              <div className="w-1 h-1 rounded-full bg-primary"></div>
                              <span>Paneer Curry</span>
                            </li>
                            <li className="flex items-center gap-1">
                              <div className="w-1 h-1 rounded-full bg-primary"></div>
                              <span>Rice</span>
                            </li>
                            <li className="flex items-center gap-1">
                              <div className="w-1 h-1 rounded-full bg-primary"></div>
                              <span>Yogurt</span>
                            </li>
                            <li className="flex items-center gap-1">
                              <div className="w-1 h-1 rounded-full bg-primary"></div>
                              <span>Sweet (Gulab Jamun)</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-md bg-muted">
                      <h3 className="font-medium mb-2">Special Note for Today:</h3>
                      <p className="text-sm">Special dinner today for Diwali celebration. Additional sweet dishes will be served.</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Report an Issue
                  </Button>
                  <Button>
                    <Bell className="mr-2 h-4 w-4" />
                    Meal Reminder
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Laundry Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shirt className="h-5 w-5" />
                    Laundry Management
                  </CardTitle>
                  <CardDescription>Track your laundry schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-md bg-blue-50 border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-blue-800">Next Laundry Date</h3>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">
                          Scheduled
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-white p-2 rounded-md text-center min-w-[60px]">
                          <p className="text-xs text-blue-600">Dec</p>
                          <p className="text-lg font-bold text-blue-800">05</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-blue-800">Tuesday</p>
                          <p className="text-xs text-blue-600">Drop-off: 8:00 AM - 10:00 AM</p>
                          <p className="text-xs text-blue-600">Pick-up: Dec 7, 4:00 PM - 6:00 PM</p>
                        </div>
                      </div>
                      <Progress value={65} className="h-2 bg-blue-500 mb-2" />
                      <p className="text-xs text-blue-600">3 days remaining</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Laundry History</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 rounded-md border">
                          <div>
                            <p className="text-sm font-medium">Nov 28, 2023</p>
                            <p className="text-xs text-muted-foreground">6 items</p>
                          </div>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            Completed
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-md border">
                          <div>
                            <p className="text-sm font-medium">Nov 21, 2023</p>
                            <p className="text-xs text-muted-foreground">8 items</p>
                          </div>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            Completed
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-md border">
                          <div>
                            <p className="text-sm font-medium">Nov 14, 2023</p>
                            <p className="text-xs text-muted-foreground">5 items</p>
                          </div>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            Completed
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">View Details</Button>
                  <Button>Schedule Laundry</Button>
                </CardFooter>
              </Card>
              
              {/* Hostel Facilities */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Hostel Facilities
                  </CardTitle>
                  <CardDescription>Available facilities and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"></path><path d="M2 20h20"></path><path d="M14 12v.01"></path></svg>
                            <h3 className="font-medium">Common Room</h3>
                          </div>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            Available
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Open 24/7. TV, board games, and lounge area.</p>
                        <div className="mt-2 text-xs text-muted-foreground">
                          <span>Current occupancy: </span>
                          <span className="font-medium">12/30</span>
                        </div>
                      </div>
                      
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M2 12h20"></path><path d="M2 12a10 10 0 0 1 20 0"></path><path d="M2 12a10 10 0 0 0 20 0"></path><path d="M12 2v20"></path></svg>
                            <h3 className="font-medium">Gym</h3>
                          </div>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            Available
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Open 6:00 AM - 10:00 PM. Cardio and weight training equipment.</p>
                        <div className="mt-2 text-xs text-muted-foreground">
                          <span>Current occupancy: </span>
                          <span className="font-medium">5/15</span>
                        </div>
                      </div>
                      
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect width="20" height="14" x="2" y="3" rx="2"></rect><line x1="8" x2="16" y1="21" y2="21"></line><line x1="12" x2="12" y1="17" y2="21"></line></svg>
                            <h3 className="font-medium">Computer Lab</h3>
                          </div>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                            Busy
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Open 24/7. High-speed internet and printing facilities.</p>
                        <div className="mt-2 text-xs text-muted-foreground">
                          <span>Current occupancy: </span>
                          <span className="font-medium">18/20</span>
                        </div>
                      </div>
                      
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
                            <h3 className="font-medium">Reading Room</h3>
                          </div>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            Available
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Open 24/7. Quiet study space with books and journals.</p>
                        <div className="mt-2 text-xs text-muted-foreground">
                          <span>Current occupancy: </span>
                          <span className="font-medium">8/25</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Report Issue
                  </Button>
                  <Button>
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Facility
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Outing Plan */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Outing Planner
                  </CardTitle>
                  <CardDescription>Plan and track your outings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-md bg-muted">
                      <h3 className="font-medium mb-2">Current Status</h3>
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <p>Last check-out: <span className="font-medium">N/A</span></p>
                          <p>Expected return: <span className="font-medium">N/A</span></p>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          In Campus
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Recent Outings</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 rounded-md border">
                          <div>
                            <p className="text-sm font-medium">Nov 26, 2023</p>
                            <p className="text-xs text-muted-foreground">City Mall - 6 hours</p>
                          </div>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            Completed
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-md border">
                          <div>
                            <p className="text-sm font-medium">Nov 19, 2023</p>
                            <p className="text-xs text-muted-foreground">Movie Theater - 3 hours</p>
                          </div>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            Completed
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <MapPin className="mr-2 h-4 w-4" />
                    Plan New Outing
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Hostel Rules */}
              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>
                    Important Hostel Announcements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-md border-l-4 border-yellow-500 bg-yellow-50">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-yellow-800">Water Supply Maintenance</h3>
                          <p className="text-sm text-yellow-700">Water supply will be unavailable from 2:00 PM to 4:00 PM tomorrow due to maintenance work.</p>
                          <p className="text-xs text-yellow-600 mt-1">Posted on Dec 1, 2023</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-md border-l-4 border-blue-500 bg-blue-50">
                      <div className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-500 mt-0.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                        <div>
                          <h3 className="font-medium text-blue-800">Hostel Day Celebration</h3>
                          <p className="text-sm text-blue-700">Annual Hostel Day celebration will be held on December 15th. All residents are requested to participate.</p>
                          <p className="text-xs text-blue-600 mt-1">Posted on Nov 30, 2023</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-md border-l-4 border-green-500 bg-green-50">
                      <div className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-500 mt-0.5"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                        <div>
                          <h3 className="font-medium text-green-800">New Gym Equipment</h3>
                          <p className="text-sm text-green-700">New gym equipment has been installed. Fitness training sessions will be conducted this weekend.</p>
                          <p className="text-xs text-green-600 mt-1">Posted on Nov 28, 2023</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="social" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Dating Section */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Dating Connect
                  </CardTitle>
                  <CardDescription>Find your perfect match on campus</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center mb-6">
                      <div className="bg-pink-50 text-pink-800 px-4 py-2 rounded-md text-sm border border-pink-200">
                        <Heart className="h-4 w-4 inline mr-1" /> Your dating profile is active and visible to compatible matches
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-md border p-4 flex items-start gap-3">
                        <Avatar className="h-14 w-14">
                          <AvatarImage src="https://placehold.co/100" />
                          <AvatarFallback>AB</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">Alex B.</h3>
                            <Badge className="bg-pink-100 text-pink-800">98% Match</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Computer Science, 3rd Year</p>
                          <div className="mt-2 flex items-center gap-2">
                            <Badge variant="outline">Photography</Badge>
                            <Badge variant="outline">Music</Badge>
                            <Badge variant="outline">Travel</Badge>
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1"><polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 1 4 4h12"></path></svg>
                              Pass
                            </Button>
                            <Button size="sm">
                              <Heart className="h-4 w-4 mr-1" />
                              Connect
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="rounded-md border p-4 flex items-start gap-3">
                        <Avatar className="h-14 w-14">
                          <AvatarImage src="https://placehold.co/100" />
                          <AvatarFallback>SM</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">Sam M.</h3>
                            <Badge className="bg-pink-100 text-pink-800">95% Match</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Electrical Engineering, 2nd Year</p>
                          <div className="mt-2 flex items-center gap-2">
                            <Badge variant="outline">Gaming</Badge>
                            <Badge variant="outline">Hiking</Badge>
                            <Badge variant="outline">Tech</Badge>
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1"><polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 1 4 4h12"></path></svg>
                              Pass
                            </Button>
                            <Button size="sm">
                              <Heart className="h-4 w-4 mr-1" />
                              Connect
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="font-medium mb-3">Your Recent Connections</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="flex items-center gap-2 p-2 rounded-md border">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="https://placehold.co/100" />
                            <AvatarFallback>TJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">Taylor J.</p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 mr-1"><path d="m3 10 3-3 6 6"></path><path d="M21 10v10H3V3h10"></path></svg>
                              <span>Matched 2d ago</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-md border">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="https://placehold.co/100" />
                            <AvatarFallback>JK</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">Jamie K.</p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 mr-1"><path d="m3 10 3-3 6 6"></path><path d="M21 10v10H3V3h10"></path></svg>
                              <span>Matched 5d ago</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-md border">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="https://placehold.co/100" />
                            <AvatarFallback>RL</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">Riley L.</p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 mr-1"><path d="m3 10 3-3 6 6"></path><path d="M21 10v10H3V3h10"></path></svg>
                              <span>Matched 1w ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 16h5v5"></path></svg>
                    Refresh Status
                  </Button>
                  <Button>
                    <Users className="mr-2 h-4 w-4" />
                    Create Study Group
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Chat Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path></svg>
                    Recent Chats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-md border-l-4 border-green-500">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="https://placehold.co/100" />
                          <AvatarFallback>TJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Taylor J.</p>
                          <p className="text-xs text-muted-foreground">Hey, want to grab coffee later?</p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">2m</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-md border">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="https://placehold.co/100" />
                          <AvatarFallback>JK</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Jamie K.</p>
                          <p className="text-xs text-muted-foreground">What time is the movie tomorrow?</p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">1h</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-md border">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="https://placehold.co/100" />
                          <AvatarFallback>RL</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Riley L.</p>
                          <p className="text-xs text-muted-foreground">Thanks for the help with the project!</p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">1d</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>
                    Open Messages
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Clubs Section */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Campus Clubs
                  </CardTitle>
                  <CardDescription>Explore and join campus clubs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex mb-4">
                      <Input 
                        placeholder="Search clubs..." 
                        className="max-w-sm"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-md border overflow-hidden">
                        <div className="h-32 bg-muted">
                          <img 
                            src="https://placehold.co/600x400?text=Tech+Innovators"
                            alt="Tech Innovators"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">Tech Innovators</h3>
                            <Badge variant="outline" className="bg-primary/10">Technical</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">A club dedicated to exploring and creating innovative technological solutions.</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" />
                            <span>120 members</span>
                          </div>
                          <div className="mt-3 flex justify-between">
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Member
                            </Badge>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="rounded-md border overflow-hidden">
                        <div className="h-32 bg-muted">
                          <img 
                            src="https://placehold.co/600x400?text=Literary+Circle"
                            alt="Literary Circle"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">Literary Circle</h3>
                            <Badge variant="outline" className="bg-primary/10">Cultural</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">A gathering of literature enthusiasts who share a passion for reading and writing.</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" />
                            <span>85 members</span>
                          </div>
                          <div className="mt-3 flex justify-end">
                            <Button size="sm">
                              <Users className="h-4 w-4 mr-1" />
                              Join Club
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">My Clubs</Button>
                  <Button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" x2="19" y1="8" y2="14"></line><line x1="22" x2="16" y1="11" y2="11"></line></svg>
                    Create Club
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Events Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-3">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 rounded-md p-2 text-center min-w-[50px]">
                          <p className="text-xs">Dec</p>
                          <p className="font-bold">10</p>
                        </div>
                        <div>
                          <h3 className="font-medium">Cultural Night</h3>
                          <p className="text-xs text-muted-foreground mb-1">7:00 PM - 10:00 PM</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            Amphitheater
                          </div>
                          <Badge className="mt-2 bg-green-100 text-green-800">
                            Registered
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-3">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 rounded-md p-2 text-center min-w-[50px]">
                          <p className="text-xs">Nov</p>
                          <p className="font-bold">25</p>
                        </div>
                        <div>
                          <h3 className="font-medium">Tech Summit</h3>
                          <p className="text-xs text-muted-foreground mb-1">10:00 AM - 6:00 PM</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            Main Auditorium
                          </div>
                          <Button size="sm" className="mt-2">
                            Register
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    View All Events
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Study Partners */}
              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Study Mode Connect
                  </CardTitle>
                  <CardDescription>Find study partners for your courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-500"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="16"></line><line x1="8" x2="16" y1="12" y2="12"></line></svg>
                        <h3 className="font-medium text-blue-800">Enable Study Mode</h3>
                      </div>
                      <p className="text-sm text-blue-700 mb-3">Study Mode connects you with classmates who are currently studying the same subjects. Share study resources and form study groups.</p>
                      <Button size="sm">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Enter Study Mode
                      </Button>
                    </div>
                    
                    <h3 className="font-medium">Study Groups Near You</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="rounded-md border p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">
                            CS301
                          </Badge>
                          <h3 className="font-medium">Data Structures</h3>
                        </div>
                        <div className="text-sm mb-2">
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            Library, Floor 2
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Users className="h-3 w-3 mr-1" />
                            4 students
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            Started 30m ago
                          </div>
                        </div>
                        <Button size="sm" className="w-full">
                          Join Group
                        </Button>
                      </div>
                      
                      <div className="rounded-md border p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            CS401
                          </Badge>
                          <h3 className="font-medium">Database Systems</h3>
                        </div>
                        <div className="text-sm mb-2">
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            Computer Lab 3
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Users className="h-3 w-3 mr-1" />
                            6 students
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            Started 1h ago
                          </div>
                        </div>
                        <Button size="sm" className="w-full">
                          Join Group
                        </Button>
                      </div>
                      
                      <div className="rounded-md border p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="bg-purple-100 text-purple-800">
                            CS501
                          </Badge>
                          <h3 className="font-medium">Machine Learning</h3>
                        </div>
                        <div className="text-sm mb-2">
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            Study Room 5
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Users className="h-3 w-3 mr-1" />
                            3 students
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            Starting in 15m
                          </div>
                        </div>
                        <Button size="sm" className="w-full">
                          Join Group
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 16h5v5"></path></svg>
                    Refresh Status
                  </Button>
                  <Button>
                    <Users className="mr-2 h-4 w-4" />
                    Create Study Group
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="profile" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* User Profile */}
              <Card>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle>John Doe</CardTitle>
                  <CardDescription>Computer Science, 3rd Year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-2 rounded-md bg-muted">
                        <p className="text-sm font-medium">Student ID</p>
                        <p className="text-sm">CS20210321</p>
                      </div>
                      <div className="p-2 rounded-md bg-muted">
                        <p className="text-sm font-medium">Hostel</p>
                        <p className="text-sm">Block A, Room 203</p>
                      </div>
                      <div className="p-2 rounded-md bg-muted">
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm">john.doe@college.edu</p>
                      </div>
                      <div className="p-2 rounded-md bg-muted">
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm">+1 234 567 8901</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="font-medium mb-2">Bio</h3>
                      <p className="text-sm text-muted-foreground">Computer Science student with a passion for AI and web development. Active member of the Tech Innovators club and volunteer for campus events.</p>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="font-medium mb-2">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Programming</Badge>
                        <Badge variant="outline">Artificial Intelligence</Badge>
                        <Badge variant="outline">Web Development</Badge>
                        <Badge variant="outline">Gaming</Badge>
                        <Badge variant="outline">Photography</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"></path></svg>
                    Edit Profile
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Academic Summary */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5" />
                    Academic Summary
                  </CardTitle>
                  <CardDescription>Your academic performance and progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Current Semester GPA</h3>
                      <div className="text-3xl font-bold">3.8/4.0</div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Course Performance</h3>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">CS301: Data Structures</span>
                            <span className="text-sm font-medium">A (92%)</span>
                          </div>
                          <Progress value={92} className="h-2 bg-green-500" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">CS401: Database Systems</span>
                            <span className="text-sm font-medium">A- (88%)</span>
                          </div>
                          <Progress value={88} className="h-2 bg-green-500" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">CS501: Machine Learning</span>
                            <span className="text-sm font-medium">B+ (85%)</span>
                          </div>
                          <Progress value={85} className="h-2 bg-green-500" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">CS201: Programming</span>
                            <span className="text-sm font-medium">A (94%)</span>
                          </div>
                          <Progress value={94} className="h-2 bg-green-500" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="rounded-md border p-3">
                        <h4 className="font-medium mb-2">Credits Completed</h4>
                        <div className="text-2xl font-bold">68/120</div>
                        <p className="text-xs text-muted-foreground">56% of program completed</p>
                      </div>
                      <div className="rounded-md border p-3">
                        <h4 className="font-medium mb-2">Cumulative GPA</h4>
                        <div className="text-2xl font-bold">3.75/4.0</div>
                        <p className="text-xs text-muted-foreground">Top 15% of class</p>
                      </div>
                      <div className="rounded-md border p-3">
                        <h4 className="font-medium mb-2">Attendance Rate</h4>
                        <div className="text-2xl font-bold">95%</div>
                        <p className="text-xs text-muted-foreground">Excellent attendance record</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    Download Transcript
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Activity Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-muted p-2 rounded-full">
                        <ClipboardList className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Assignment Submitted</p>
                        <p className="text-xs text-muted-foreground">Machine Learning Lab - CS501</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-muted p-2 rounded-full">
                        <CalendarDays className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Event Registration</p>
                        <p className="text-xs text-muted-foreground">Cultural Night - Dec 10</p>
                        <p className="text-xs text-muted-foreground">5 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-muted p-2 rounded-full">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Study Session Started</p>
                        <p className="text-xs text-muted-foreground">Data Structures - CS301</p>
                        <p className="text-xs text-muted-foreground">Yesterday</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-muted p-2 rounded-full">
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">New Connection</p>
                        <p className="text-xs text-muted-foreground">Connected with Taylor J.</p>
                        <p className="text-xs text-muted-foreground">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Activity</Button>
                </CardFooter>
              </Card>
              
              {/* Reminders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    My Reminders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-md border-l-4 border-yellow-500">
                      <div>
                        <p className="font-medium">Assignment Due</p>
                        <p className="text-sm text-muted-foreground">Data Structures - Dec 5</p>
                      </div>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        3 days left
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-md border-l-4 border-blue-500">
                      <div>
                        <p className="font-medium">Database Exam</p>
                        <p className="text-sm text-muted-foreground">CS401 - Dec 20</p>
                      </div>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        18 days left
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-md border-l-4 border-green-500">
                      <div>
                        <p className="font-medium">Cultural Night</p>
                        <p className="text-sm text-muted-foreground">Amphitheater - Dec 10</p>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        8 days left
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-md border-l-4 border-purple-500">
                      <div>
                        <p className="font-medium">Laundry Pickup</p>
                        <p className="text-sm text-muted-foreground">Hostel A - Dec 7</p>
                      </div>
                      <Badge variant="outline" className="bg-purple-100 text-purple-800">
                        5 days left
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Bell className="mr-2 h-4 w-4" />
                    Manage Reminders
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Settings */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Notifications</label>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Email Notifications</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Push Notifications</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">SMS Notifications</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-muted-foreground"><circle cx="12" cy="12" r="10"></circle></svg>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Privacy</label>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Profile Visibility</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Show Online Status</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Dating Profile Visibility</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Save Settings</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Collage; 