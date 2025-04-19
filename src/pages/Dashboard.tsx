import { useState } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Bell, 
  BookOpen, 
  Newspaper, 
  BarChart, 
  MessageCircle,
  BookOpen as BookOpenIcon,
  Users,
  LucideIcon,
  AlertTriangle,
  Trophy,
  Sparkles,
  User,
  Clock
} from "lucide-react";

// Import our custom widgets
import { UpcomingEventsWidget } from "@/components/widgets/UpcomingEventsWidget";
import { StudyResourcesWidget } from "@/components/widgets/StudyResourcesWidget";
import { GroupChatWidget } from "@/components/widgets/GroupChatWidget";
import { DatingAppWidget } from "@/components/widgets/DatingAppWidget";

// Import our new chart components
import { 
  AttendanceChart, 
  AcademicPerformanceChart, 
  CourseProgressChart, 
  UpcomingAssignmentsCard,
  AttendanceTrackerCard,
  TimetableCard
} from "@/components/dashboard";

// Interfaces
interface Course {
  id: string;
  code: string;
  name: string;
  professor: string;
  progress: number;
  nextClass?: {
    day: string;
    time: string;
    room: string;
  };
  color: string;
}

interface ImportantDate {
  id: string;
  title: string;
  date: string;
  type: "exam" | "assignment" | "event" | "holiday";
  course?: string;
}

interface Announcement {
  id: string;
  title: string;
  body: string;
  date: string;
  source: string;
  priority: "high" | "medium" | "low";
  read: boolean;
}

interface Statistic {
  label: string;
  value: string | number;
  description?: string;
  change?: number;
  icon: LucideIcon;
}

const Dashboard = () => {
  // Mock data for courses
  const [courses] = useState<Course[]>([
    {
      id: "1",
      code: "CSE-301",
      name: "Data Structures & Algorithms",
      professor: "Dr. Sarah Johnson",
      progress: 65,
      nextClass: {
        day: "Monday",
        time: "10:00 AM",
        room: "Hall B-102"
      },
      color: "bg-blue-600"
    },
    {
      id: "2",
      code: "CSE-405",
      name: "Machine Learning",
      professor: "Dr. Michael Chen",
      progress: 42,
      nextClass: {
        day: "Wednesday",
        time: "2:30 PM",
        room: "Lab 305"
      },
      color: "bg-purple-600"
    },
    {
      id: "3",
      code: "MATH-202",
      name: "Advanced Calculus",
      professor: "Dr. Emily Rodriguez",
      progress: 78,
      nextClass: {
        day: "Thursday",
        time: "9:00 AM",
        room: "Hall A-201"
      },
      color: "bg-green-600"
    }
  ]);
  
  // Mock data for important dates
  const [importantDates] = useState<ImportantDate[]>([
    {
      id: "1",
      title: "Database Mid-term Exam",
      date: "2025-04-22T10:00:00Z",
      type: "exam",
      course: "CS-305"
    },
    {
      id: "2",
      title: "Algorithm Assignment Deadline",
      date: "2025-04-20T23:59:00Z",
      type: "assignment",
      course: "CS-301"
    },
    {
      id: "3",
      title: "Spring Break",
      date: "2025-04-28T00:00:00Z",
      type: "holiday"
    },
    {
      id: "4",
      title: "Career Fair",
      date: "2025-05-05T10:00:00Z",
      type: "event"
    }
  ]);
  
  // Mock data for announcements
  const [announcements] = useState<Announcement[]>([
    {
      id: "1",
      title: "Important: Schedule Change for CS-301",
      body: "Please note that the Thursday class for CS-301 has been moved to Friday at the same time due to faculty meeting.",
      date: "2025-04-18T09:30:00Z",
      source: "Academic Office",
      priority: "high",
      read: false
    },
    {
      id: "2",
      title: "Campus Maintenance Notice",
      body: "The main library will be closed this weekend for scheduled maintenance. Online resources will remain accessible.",
      date: "2025-04-17T14:15:00Z",
      source: "Facilities Management",
      priority: "medium",
      read: true
    },
    {
      id: "3",
      title: "Tech Symposium: Registration Open",
      body: "The annual tech symposium registration is now open. Early bird discounts available until April 25th.",
      date: "2025-04-16T11:00:00Z",
      source: "Student Affairs",
      priority: "medium",
      read: false
    }
  ]);
  
  // Statistics cards data
  const statistics: Statistic[] = [
    {
      label: "Attendance Rate",
      value: "92%",
      description: "Last 30 days",
      change: 3,
      icon: User
    },
    {
      label: "Current CGPA",
      value: "8.7",
      description: "Out of 10.0",
      change: 0.2,
      icon: BarChart
    },
    {
      label: "Active Courses",
      value: "5",
      description: "Spring Semester 2025",
      icon: BookOpenIcon
    },
    {
      label: "Study Groups",
      value: "3",
      description: "2 meetings this week",
      icon: Users
    }
  ];
  
  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' });
  };
  
  // Get priority style for announcements
  const getPriorityStyle = (priority: Announcement["priority"]) => {
    switch(priority) {
      case "high":
        return "border-red-500 bg-red-50";
      case "medium":
        return "border-amber-500 bg-amber-50";
      case "low":
        return "border-slate-200";
      default:
        return "border-slate-200";
    }
  };
  
  // Get icon for date type
  const getDateTypeIcon = (type: ImportantDate["type"]) => {
    switch(type) {
      case "exam":
        return <BookOpen className="h-4 w-4 text-red-600" />;
      case "assignment":
        return <BookOpen className="h-4 w-4 text-amber-600" />;
      case "event":
        return <Calendar className="h-4 w-4 text-blue-600" />;
      case "holiday":
        return <Sparkles className="h-4 w-4 text-green-600" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      <div className="container py-6">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's an overview of your campus life.</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="default" size="sm">
              <Clock className="h-4 w-4 mr-2" />
              My Schedule
            </Button>
          </div>
        </div>
        
        {/* Statistics Cards - Now using our new data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statistics.map((stat, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <div className="flex items-baseline mt-1">
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                      {stat.change !== undefined && (
                        <span className={`ml-2 text-xs font-medium ${stat.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change >= 0 ? `+${stat.change}` : stat.change}
                        </span>
                      )}
                    </div>
                    {stat.description && (
                      <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                    )}
                  </div>
                  
                  <div className="rounded-md bg-primary/10 p-2">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="space-y-6 lg:col-span-2">
            {/* Timetable for Today */}
            <TimetableCard />
            
            {/* Performance Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AcademicPerformanceChart />
              <CourseProgressChart />
            </div>
            
            {/* Assignments and Announcements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UpcomingAssignmentsCard />
              
              {/* Announcements Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Newspaper className="mr-2 h-5 w-5 text-primary" />
                    Announcements
                  </CardTitle>
                  <CardDescription>Latest updates from your college</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {announcements.map((announcement) => (
                      <div 
                        key={announcement.id}
                        className={`p-3 rounded-lg border-l-4 ${getPriorityStyle(announcement.priority)} ${announcement.read ? 'opacity-70' : ''}`}
                      >
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium">{announcement.title}</h4>
                          {announcement.priority === "high" && (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        
                        <p className="text-sm mt-1">{announcement.body}</p>
                        
                        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                          <span>{announcement.source}</span>
                          <span>{formatDate(announcement.date)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href="/announcements">View All Announcements</a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Attendance Tracker and Chart */}
            <AttendanceTrackerCard />
            <AttendanceChart />
            
            {/* Important Dates */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  Important Dates
                </CardTitle>
                <CardDescription>Key dates to remember</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {importantDates.map((date) => (
                    <div key={date.id} className="flex items-center justify-between border-b pb-2 last:border-b-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 bg-muted">
                          {getDateTypeIcon(date.type)}
                        </div>
                        
                        <div>
                          <p className="font-medium text-sm">{date.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(date.date)}
                            {date.course && ` • ${date.course}`}
                          </p>
                        </div>
                      </div>
                      
                      <Badge variant="outline" className={
                        date.type === "exam" ? "border-red-500 text-red-700" :
                        date.type === "assignment" ? "border-amber-500 text-amber-700" :
                        date.type === "holiday" ? "border-green-500 text-green-700" :
                        "border-blue-500 text-blue-700"
                      }>
                        {date.type.charAt(0).toUpperCase() + date.type.slice(1)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Study Resources Widget */}
            <StudyResourcesWidget />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;