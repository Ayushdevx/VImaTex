import { Layout } from "@/components/layout/index";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import {
  Calendar,
  Clock,
  BookOpen,
  FileText,
  AlertTriangle,
  BarChart,
  CheckCircle,
  HelpCircle,
  Filter,
  Search,
  Bell,
  Users
} from "lucide-react";

const Exams = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Initialize exams data
  useEffect(() => {
    setLoading(true);
    
    // Sample exams data
    const sampleExams = [
      {
        id: 1,
        title: "Data Structures and Algorithms",
        course: "CS301",
        date: "2023-12-15",
        time: "9:00 AM - 12:00 PM",
        venue: "Exam Hall A",
        examType: "End Semester",
        status: "upcoming",
        syllabus: [
          { topic: "Basic Data Structures", completed: false },
          { topic: "Tree and Graph Algorithms", completed: false },
          { topic: "Sorting Algorithms", completed: true },
          { topic: "Dynamic Programming", completed: false },
          { topic: "Greedy Algorithms", completed: false }
        ],
        preparationStatus: 35,
        instructor: "Prof. Johnson",
        maxMarks: 100,
        duration: "3 hours",
        resources: ["Lecture Notes", "Previous Year Papers", "Textbook References"],
        priority: "high",
        reminderSet: false
      },
      {
        id: 2,
        title: "Database Management Systems",
        course: "CS401",
        date: "2023-12-20",
        time: "2:00 PM - 5:00 PM",
        venue: "Exam Hall B",
        examType: "End Semester",
        status: "upcoming",
        syllabus: [
          { topic: "SQL and Relational Algebra", completed: true },
          { topic: "Database Design", completed: true },
          { topic: "Normalization", completed: false },
          { topic: "Transaction Processing", completed: false },
          { topic: "Query Optimization", completed: false }
        ],
        preparationStatus: 65,
        instructor: "Prof. Williams",
        maxMarks: 100,
        duration: "3 hours",
        resources: ["Lecture Notes", "Lab Assignments", "Textbook References"],
        priority: "medium",
        reminderSet: true
      },
      {
        id: 3,
        title: "Introduction to Programming",
        course: "CS101",
        date: "2023-12-05",
        time: "10:00 AM - 12:00 PM",
        venue: "Lecture Hall 3",
        examType: "Quiz",
        status: "completed",
        syllabus: [
          { topic: "Variables and Data Types", completed: true },
          { topic: "Loops and Conditionals", completed: true },
          { topic: "Functions", completed: true },
          { topic: "Basic Arrays", completed: true },
          { topic: "File I/O", completed: true }
        ],
        preparationStatus: 100,
        instructor: "Prof. Davis",
        maxMarks: 50,
        duration: "2 hours",
        resources: ["Lecture Notes", "Lab Assignments"],
        marks: 43,
        priority: "low",
        reminderSet: false
      },
      {
        id: 4,
        title: "Computer Networks",
        course: "CS402",
        date: "2023-12-18",
        time: "9:00 AM - 12:00 PM",
        venue: "Exam Hall C",
        examType: "End Semester",
        status: "upcoming",
        syllabus: [
          { topic: "OSI Model", completed: true },
          { topic: "TCP/IP", completed: true },
          { topic: "Network Protocols", completed: false },
          { topic: "Routing Algorithms", completed: false },
          { topic: "Network Security", completed: false }
        ],
        preparationStatus: 50,
        instructor: "Prof. Smith",
        maxMarks: 100,
        duration: "3 hours",
        resources: ["Lecture Notes", "Previous Year Papers", "Online Resources"],
        priority: "high",
        reminderSet: false
      },
      {
        id: 5,
        title: "Machine Learning",
        course: "CS501",
        date: "2023-12-10",
        time: "2:00 PM - 4:00 PM",
        venue: "Lecture Hall 5",
        examType: "Mid Semester",
        status: "completed",
        syllabus: [
          { topic: "Linear Regression", completed: true },
          { topic: "Classification", completed: true },
          { topic: "Neural Networks", completed: true },
          { topic: "Model Evaluation", completed: true },
          { topic: "Dimensionality Reduction", completed: true }
        ],
        preparationStatus: 100,
        instructor: "Prof. Brown",
        maxMarks: 50,
        duration: "2 hours",
        resources: ["Lecture Notes", "Programming Assignments"],
        marks: 42,
        priority: "medium",
        reminderSet: false
      }
    ];
    
    setTimeout(() => {
      setExams(sampleExams);
      setLoading(false);
    }, 500);
  }, []);

  // Filter exams based on search query and filters
  const filteredExams = exams.filter(exam =>
    (exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     exam.course.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCourse === "all" || exam.course === selectedCourse) &&
    (selectedStatus === "all" || exam.status === selectedStatus)
  );

  // Get unique courses for filter
  const courses = ["all", ...Array.from(new Set(exams.map(exam => exam.course)))];

  // Get badge color based on priority
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  // Get progress color based on preparation status
  const getProgressColor = (status) => {
    if (status < 30) return "bg-red-500";
    if (status < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Handle topic completion
  const handleTopicCompletion = (examId, topicIndex) => {
    setExams(exams.map(exam => {
      if (exam.id === examId) {
        const updatedSyllabus = [...exam.syllabus];
        updatedSyllabus[topicIndex].completed = !updatedSyllabus[topicIndex].completed;
        
        // Calculate new preparation status
        const completedTopics = updatedSyllabus.filter(item => item.completed).length;
        const totalTopics = updatedSyllabus.length;
        const newPreparationStatus = Math.round((completedTopics / totalTopics) * 100);
        
        return {
          ...exam,
          syllabus: updatedSyllabus,
          preparationStatus: newPreparationStatus
        };
      }
      return exam;
    }));
  };

  // Handle set reminder
  const handleSetReminder = (examId) => {
    setExams(exams.map(exam => {
      if (exam.id === examId) {
        const updated = {...exam, reminderSet: !exam.reminderSet};
        
        if (updated.reminderSet) {
          toast({
            title: "Reminder Set",
            description: `You will be reminded about ${exam.title} on ${new Date(exam.date).toLocaleDateString()}`,
          });
        } else {
          toast({
            title: "Reminder Removed",
            description: `Reminder for ${exam.title} has been cancelled`,
          });
        }
        
        return updated;
      }
      return exam;
    }));
  };

  // Handle study now
  const handleStudyNow = (exam) => {
    toast({
      title: "Study Session Started",
      description: `Starting study session for ${exam.title}`,
    });
  };

  // Handle view answer sheet
  const handleViewAnswerSheet = (exam) => {
    toast({
      title: "View Answer Sheet",
      description: `Opening answer sheet for ${exam.title}`,
    });
  };

  // Handle performance analysis
  const handlePerformanceAnalysis = (exam) => {
    toast({
      title: "Performance Analysis",
      description: `Opening performance analysis for ${exam.title}`,
    });
  };

  // Handle exam calendar
  const handleExamCalendar = () => {
    toast({
      title: "Exam Calendar",
      description: "Opening exam calendar view",
    });
  };

  // Handle study planner
  const handleStudyPlanner = () => {
    toast({
      title: "Study Planner",
      description: "Opening study planner",
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-20 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Exams</h1>
          <div className="space-x-3">
            <Button variant="outline" onClick={handleExamCalendar}>Exam Calendar</Button>
            <Button onClick={handleStudyPlanner}>Study Planner</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Course</label>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Courses" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course === "all" ? "All Courses" : course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                variant="ghost" 
                className="w-full"
                onClick={() => {
                  setSelectedCourse("all");
                  setSelectedStatus("all");
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>

          <div className="md:col-span-3 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by exam title or course code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="space-y-4">
              {filteredExams.length > 0 ? (
                filteredExams.map((exam) => (
                  <Card key={exam.id} className="overflow-hidden">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-xl font-semibold">{exam.title}</h2>
                            <Badge className={getPriorityColor(exam.priority)}>
                              {exam.priority.charAt(0).toUpperCase() + exam.priority.slice(1)} Priority
                            </Badge>
                            {exam.status === "upcoming" && 
                              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                                Upcoming
                              </Badge>
                            }
                            {exam.status === "completed" && 
                              <Badge variant="outline" className="bg-green-100 text-green-800">
                                Completed
                              </Badge>
                            }
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline" className="bg-primary/10">
                              <BookOpen className="mr-1 h-3 w-3" />
                              {exam.course}
                            </Badge>
                            <Badge variant="outline" className="bg-primary/10">
                              <Calendar className="mr-1 h-3 w-3" />
                              {new Date(exam.date).toLocaleDateString()}
                            </Badge>
                            <Badge variant="outline" className="bg-primary/10">
                              <Clock className="mr-1 h-3 w-3" />
                              {exam.time}
                            </Badge>
                            <Badge variant="outline" className="bg-primary/10">
                              {exam.examType}
                            </Badge>
                          </div>
                        </div>
                        
                        {exam.status === "completed" && (
                          <div className="bg-green-50 px-4 py-2 rounded-md text-center">
                            <p className="text-sm font-medium text-green-800">Marks: {exam.marks}/{exam.maxMarks}</p>
                            <p className="text-xs text-green-600">
                              {(exam.marks / exam.maxMarks * 100).toFixed(1)}%
                            </p>
                          </div>
                        )}
                      </div>
                      
                      {exam.status === "upcoming" && (
                        <div className="mb-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Preparation Status</span>
                            <span className="text-sm font-medium">{exam.preparationStatus}%</span>
                          </div>
                          <Progress value={exam.preparationStatus} className={getProgressColor(exam.preparationStatus)} />
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                        <div>
                          <p className="font-medium">Exam Details</p>
                          <ul className="space-y-1 mt-1">
                            <li>Venue: {exam.venue}</li>
                            <li>Duration: {exam.duration}</li>
                            <li>Max Marks: {exam.maxMarks}</li>
                            <li>Instructor: {exam.instructor}</li>
                          </ul>
                        </div>
                        
                        <div className="md:col-span-2">
                          <p className="font-medium">Syllabus Topics</p>
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                            {exam.syllabus.map((syllabusItem, index) => (
                              <div key={index} className="flex items-start gap-2">
                                {exam.status === "upcoming" ? (
                                  <Checkbox 
                                    id={`topic-${exam.id}-${index}`} 
                                    checked={syllabusItem.completed}
                                    onCheckedChange={() => handleTopicCompletion(exam.id, index)}
                                  />
                                ) : (
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                )}
                                <label 
                                  htmlFor={`topic-${exam.id}-${index}`}
                                  className={`text-sm ${exam.status === "upcoming" && syllabusItem.completed ? "line-through text-muted-foreground" : ""}`}
                                >
                                  {syllabusItem.topic}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-between text-sm text-muted-foreground border-t pt-3">
                        <div>
                          Resources: {exam.resources.join(", ")}
                        </div>
                        
                        {exam.status === "upcoming" && (
                          <div className="flex items-center gap-2">
                            <Button 
                              variant={exam.reminderSet ? "default" : "outline"} 
                              size="sm"
                              onClick={() => handleSetReminder(exam.id)}
                            >
                              <Bell className="mr-2 h-4 w-4" />
                              {exam.reminderSet ? "Reminder Set" : "Set Reminder"}
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleStudyNow(exam)}
                            >
                              Study Now
                            </Button>
                          </div>
                        )}
                        {exam.status === "completed" && (
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewAnswerSheet(exam)}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Answer Sheet
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handlePerformanceAnalysis(exam)}
                            >
                              <BarChart className="mr-2 h-4 w-4" />
                              Performance Analysis
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <HelpCircle className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-lg">No exams found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Exams</TabsTrigger>
            <TabsTrigger value="completed">Completed Exams</TabsTrigger>
            <TabsTrigger value="statistics">Performance Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {exams
                .filter(exam => exam.status === "upcoming")
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((exam) => (
                  <Card key={exam.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{exam.title}</CardTitle>
                        <Badge className={getPriorityColor(exam.priority)}>
                          {exam.priority.charAt(0).toUpperCase() + exam.priority.slice(1)}
                        </Badge>
                      </div>
                      <CardDescription>{exam.course} • {new Date(exam.date).toLocaleDateString()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <div className="font-medium">Time:</div>
                          <div>{exam.time}</div>
                        </div>
                        <div className="text-sm">
                          <div className="font-medium">Venue:</div>
                          <div>{exam.venue}</div>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Preparation</span>
                            <span className="text-sm font-medium">{exam.preparationStatus}%</span>
                          </div>
                          <Progress value={exam.preparationStatus} className={getProgressColor(exam.preparationStatus)} />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <FileText className="mr-1 h-4 w-4" />
                        Syllabus
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleStudyNow(exam)}
                      >
                        Study Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {exams
                .filter(exam => exam.status === "completed")
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((exam) => (
                  <Card key={exam.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{exam.title}</CardTitle>
                      <CardDescription>{exam.course} • {new Date(exam.date).toLocaleDateString()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-4 bg-gray-50 rounded-md text-center">
                          <div className="text-2xl font-bold">{exam.marks}/{exam.maxMarks}</div>
                          <div className="text-sm text-muted-foreground">
                            {(exam.marks / exam.maxMarks * 100).toFixed(1)}%
                          </div>
                        </div>
                        <div className="text-sm">
                          <div className="font-medium">Exam Type:</div>
                          <div>{exam.examType}</div>
                        </div>
                        <div className="text-sm">
                          <div className="font-medium">Instructor:</div>
                          <div>{exam.instructor}</div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewAnswerSheet(exam)}
                      >
                        View Paper
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handlePerformanceAnalysis(exam)}
                      >
                        Performance Analysis
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="statistics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analysis</CardTitle>
                <CardDescription>Your exam performance statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <BarChart className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium">Score Distribution</h3>
                        <ul className="text-sm space-y-2 mt-2">
                          <li className="flex justify-between">
                            <span>CS101:</span> 
                            <div className="w-32 flex items-center gap-2">
                              <div className="flex-grow">
                                <Progress value={86} className="h-2 bg-green-500" />
                              </div>
                              <span className="text-xs">86%</span>
                            </div>
                          </li>
                          <li className="flex justify-between">
                            <span>CS501:</span> 
                            <div className="w-32 flex items-center gap-2">
                              <div className="flex-grow">
                                <Progress value={84} className="h-2 bg-green-500" />
                              </div>
                              <span className="text-xs">84%</span>
                            </div>
                          </li>
                          <li className="flex justify-between">
                            <span>Overall:</span> 
                            <div className="w-32 flex items-center gap-2">
                              <div className="flex-grow">
                                <Progress value={85} className="h-2 bg-green-500" />
                              </div>
                              <span className="text-xs">85%</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium">Improvement Areas</h3>
                        <ul className="text-sm space-y-1 mt-1">
                          <li>Dynamic Programming (CS301)</li>
                          <li>Neural Networks (CS501)</li>
                          <li>Transaction Processing (CS401)</li>
                          <li>Network Security (CS402)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Users className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium">Class Comparison</h3>
                        <ul className="text-sm space-y-1 mt-1">
                          <li>Top 15% in CS101</li>
                          <li>Top 25% in CS501</li>
                          <li>Above average in CS401</li>
                          <li>Rank 12 in CS301</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Exams; 