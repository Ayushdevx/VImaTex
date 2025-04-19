import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/layout/index";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { 
  FileText, Download, Filter, Search, Calendar, BookOpen, Star, Upload,
  ThumbsUp, Share, BarChart, Users
} from "lucide-react";

const PYQs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  
  // Sample PYQ data
  const pyqs = [
    {
      id: 1,
      title: "Data Structures and Algorithms - Mid Semester",
      course: "CS301",
      year: "2023",
      semester: "Fall",
      examType: "Mid Semester",
      uploadedBy: "Prof. Johnson",
      uploadDate: "2023-10-15",
      difficulty: "Medium",
      pages: 8,
      downloadCount: 345,
      fileType: "PDF",
      fileSize: "2.4 MB",
      tags: ["arrays", "linked lists", "trees", "graphs"],
      questions: 6,
      timeAllowed: "90 minutes",
      relatedMaterials: ["Lecture Notes 1-5", "Assignment 2"],
      description: "Covers topics from the first half of the semester including basic data structures and algorithm complexity analysis."
    },
    {
      id: 2,
      title: "Database Management Systems - Final Exam",
      course: "CS401",
      year: "2022",
      semester: "Spring",
      examType: "Final Exam",
      uploadedBy: "Prof. Williams",
      uploadDate: "2022-05-25",
      difficulty: "Hard",
      pages: 12,
      downloadCount: 567,
      fileType: "PDF",
      fileSize: "3.2 MB",
      tags: ["SQL", "normalization", "transactions", "indexing"],
      questions: 8,
      timeAllowed: "180 minutes",
      relatedMaterials: ["Textbook Chapters 6-12", "Lab Assignments 4-7"],
      description: "Comprehensive final exam covering SQL queries, database design, normalization, indexing, and transaction management."
    },
    {
      id: 3,
      title: "Introduction to Programming - Quiz 2",
      course: "CS101",
      year: "2023",
      semester: "Spring",
      examType: "Quiz",
      uploadedBy: "Prof. Davis",
      uploadDate: "2023-03-10",
      difficulty: "Easy",
      pages: 4,
      downloadCount: 289,
      fileType: "PDF",
      fileSize: "1.1 MB",
      tags: ["loops", "conditionals", "functions", "arrays"],
      questions: 5,
      timeAllowed: "45 minutes",
      relatedMaterials: ["Lecture Notes 8-10", "Lab Assignment 3"],
      description: "Basic programming concepts including conditionals, loops, functions and basic data structures."
    },
    {
      id: 4,
      title: "Computer Networks - End Term",
      course: "CS402",
      year: "2022",
      semester: "Fall",
      examType: "End Term",
      uploadedBy: "Prof. Smith",
      uploadDate: "2022-12-08",
      difficulty: "Medium",
      pages: 10,
      downloadCount: 412,
      fileType: "PDF",
      fileSize: "2.8 MB",
      tags: ["TCP/IP", "routing", "network security", "protocols"],
      questions: 7,
      timeAllowed: "180 minutes",
      relatedMaterials: ["Textbook Chapters 5-9", "Assignment 3-6"],
      description: "Comprehensive exam covering network protocols, routing algorithms, network security, and application layer concepts."
    },
    {
      id: 5,
      title: "Machine Learning - Mid Term",
      course: "CS501",
      year: "2023",
      semester: "Fall",
      examType: "Mid Term",
      uploadedBy: "Prof. Brown",
      uploadDate: "2023-10-20",
      difficulty: "Hard",
      pages: 9,
      downloadCount: 378,
      fileType: "PDF",
      fileSize: "2.6 MB",
      tags: ["supervised learning", "regression", "classification", "neural networks"],
      questions: 6,
      timeAllowed: "120 minutes",
      relatedMaterials: ["Lecture Notes 1-7", "Programming Assignment 2"],
      description: "Covers fundamental machine learning concepts including regression, classification, model evaluation, and neural networks."
    },
  ];

  // Filter PYQs based on search query and filters
  const filteredPYQs = pyqs.filter(pyq =>
    (pyq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     pyq.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
     pyq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) &&
    (selectedCourse === "all" || pyq.course === selectedCourse) &&
    (selectedYear === "all" || pyq.year === selectedYear)
  );

  // Get difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "hard":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // Get unique courses for filter
  const courses = ["all", ...Array.from(new Set(pyqs.map(pyq => pyq.course)))];

  // Get unique years for filter
  const years = ["all", ...Array.from(new Set(pyqs.map(pyq => pyq.year))).sort().reverse()];

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Past Year Question Papers</h1>
          <div className="space-x-3">
            <Button variant="outline">Request Paper</Button>
            <Button>Upload Paper</Button>
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
                <label className="text-sm font-medium">Year</label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Years" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year === "all" ? "All Years" : year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                variant="ghost" 
                className="w-full"
                onClick={() => {
                  setSelectedCourse("all");
                  setSelectedYear("all");
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
                placeholder="Search by title, course code, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="space-y-4">
              {filteredPYQs.length > 0 ? (
                filteredPYQs.map((pyq) => (
                  <Card key={pyq.id} className="overflow-hidden">
                    <div className="md:flex">
                      <div className="flex-grow p-6">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h2 className="text-xl font-semibold">{pyq.title}</h2>
                              <Badge className={getDifficultyColor(pyq.difficulty)}>
                                {pyq.difficulty}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-primary/10">
                                <BookOpen className="mr-1 h-3 w-3" />
                                {pyq.course}
                              </Badge>
                              <Badge variant="outline" className="bg-primary/10">
                                <Calendar className="mr-1 h-3 w-3" />
                                {pyq.year} {pyq.semester}
                              </Badge>
                              <Badge variant="outline" className="bg-primary/10">
                                {pyq.examType}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              <FileText className="mr-1 h-3 w-3" />
                              {pyq.fileType} • {pyq.fileSize}
                            </Badge>
                            <Badge variant="outline">
                              <Download className="mr-1 h-3 w-3" />
                              {pyq.downloadCount}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4">{pyq.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                          <div>
                            <p className="font-medium">Details</p>
                            <ul className="space-y-1 mt-1">
                              <li>Questions: {pyq.questions}</li>
                              <li>Pages: {pyq.pages}</li>
                              <li>Time Allowed: {pyq.timeAllowed}</li>
                            </ul>
                          </div>
                          
                          <div>
                            <p className="font-medium">Related Materials</p>
                            <ul className="space-y-1 mt-1">
                              {pyq.relatedMaterials.map((material, index) => (
                                <li key={index}>{material}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <p className="font-medium">Tags</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {pyq.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-muted rounded-md text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-between text-sm text-muted-foreground border-t pt-3">
                          <div>
                            Uploaded by {pyq.uploadedBy} on {new Date(pyq.uploadDate).toLocaleDateString()}
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              <ThumbsUp className="mr-1 h-4 w-4" />
                              <span>Helpful</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              <Share className="mr-1 h-4 w-4" />
                              <span>Share</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardFooter className="bg-muted/30 flex justify-end p-4">
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-lg">No question papers found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <Tabs defaultValue="recent">
          <TabsList>
            <TabsTrigger value="recent">Recently Added</TabsTrigger>
            <TabsTrigger value="popular">Most Popular</TabsTrigger>
            <TabsTrigger value="stats">Exam Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pyqs
                .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
                .slice(0, 3)
                .map((pyq) => (
                  <Card key={pyq.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{pyq.title}</CardTitle>
                      <CardDescription>{pyq.course} • {pyq.year} {pyq.semester}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Badge className={getDifficultyColor(pyq.difficulty)}>
                          {pyq.difficulty}
                        </Badge>
                        <p className="text-sm">{pyq.description.substring(0, 100)}...</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        Added {new Date(pyq.uploadDate).toLocaleDateString()}
                      </div>
                      <Button size="sm">
                        <Download className="mr-1 h-4 w-4" />
                        Download
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="popular" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pyqs
                .sort((a, b) => b.downloadCount - a.downloadCount)
                .slice(0, 3)
                .map((pyq) => (
                  <Card key={pyq.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{pyq.title}</CardTitle>
                      <CardDescription>{pyq.course} • {pyq.year} {pyq.semester}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            <Download className="mr-1 h-3 w-3" />
                            {pyq.downloadCount} downloads
                          </Badge>
                        </div>
                        <p className="text-sm">{pyq.description.substring(0, 100)}...</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        {pyq.questions} questions • {pyq.pages} pages
                      </div>
                      <Button size="sm">
                        <Download className="mr-1 h-4 w-4" />
                        Download
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="stats" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Exam Statistics and Trends</CardTitle>
                <CardDescription>Insights based on previous exams</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <BarChart className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium">Most Tested Topics</h3>
                        <ul className="text-sm space-y-1 mt-1">
                          <li>1. Data Structures (85% of exams)</li>
                          <li>2. SQL Queries (78% of exams)</li>
                          <li>3. Algorithm Complexity (72% of exams)</li>
                          <li>4. Network Protocols (65% of exams)</li>
                          <li>5. Object-Oriented Design (58% of exams)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Star className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium">Average Difficulty Trends</h3>
                        <ul className="text-sm space-y-1 mt-1">
                          <li>2023: Medium-Hard (increasing)</li>
                          <li>2022: Medium</li>
                          <li>2021: Medium-Easy</li>
                          <li>2020: Medium</li>
                          <li>2019: Easy-Medium</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Users className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium">Student Performance</h3>
                        <ul className="text-sm space-y-1 mt-1">
                          <li>Highest avg. score: CS101 (78%)</li>
                          <li>Lowest avg. score: CS501 (62%)</li>
                          <li>Most improved: CS402 (+12% YoY)</li>
                          <li>Most challenging: CS401 Final Exam</li>
                          <li>Most consistent: CS301 Mid Terms</li>
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

export default PYQs; 