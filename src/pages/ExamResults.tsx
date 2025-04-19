import { useState } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Badge } from "@/components/ui/badge";

// Interface for course results
interface CourseResult {
  id: string;
  code: string;
  name: string;
  credits: number;
  marks: number;
  grade: string;
  gradePoint: number;
  semester: number;
  examDate: string;
  type: "Theory" | "Practical" | "Project";
}

// Interface for semester results
interface SemesterResult {
  semester: number;
  year: string;
  sgpa: number;
  cgpa: number;
  courses: CourseResult[];
}

const ExamResults = () => {
  // Mock data for results
  const [semesterResults, setSemesterResults] = useState<SemesterResult[]>([
    {
      semester: 1,
      year: "2023-24 Winter",
      sgpa: 8.7,
      cgpa: 8.7,
      courses: [
        {
          id: "cs101",
          code: "CS101",
          name: "Introduction to Computer Science",
          credits: 4,
          marks: 88,
          grade: "A",
          gradePoint: 9,
          semester: 1,
          examDate: "2023-12-15",
          type: "Theory"
        },
        {
          id: "ma101",
          code: "MA101",
          name: "Calculus and Linear Algebra",
          credits: 4,
          marks: 91,
          grade: "A+",
          gradePoint: 10,
          semester: 1,
          examDate: "2023-12-18",
          type: "Theory"
        },
        {
          id: "ph101",
          code: "PH101",
          name: "Engineering Physics",
          credits: 3,
          marks: 79,
          grade: "B+",
          gradePoint: 8,
          semester: 1,
          examDate: "2023-12-20",
          type: "Theory"
        },
        {
          id: "hs101",
          code: "HS101",
          name: "Communication Skills",
          credits: 2,
          marks: 82,
          grade: "A",
          gradePoint: 9,
          semester: 1,
          examDate: "2023-12-22",
          type: "Theory"
        },
        {
          id: "cs111",
          code: "CS111",
          name: "Programming Lab",
          credits: 2,
          marks: 85,
          grade: "A",
          gradePoint: 9,
          semester: 1,
          examDate: "2023-12-10",
          type: "Practical"
        },
      ]
    },
    {
      semester: 2,
      year: "2024 Monsoon",
      sgpa: 9.2,
      cgpa: 8.95,
      courses: [
        {
          id: "cs201",
          code: "CS201",
          name: "Data Structures",
          credits: 4,
          marks: 94,
          grade: "A+",
          gradePoint: 10,
          semester: 2,
          examDate: "2024-05-15",
          type: "Theory"
        },
        {
          id: "cs202",
          code: "CS202",
          name: "Digital Logic Design",
          credits: 3,
          marks: 87,
          grade: "A",
          gradePoint: 9,
          semester: 2,
          examDate: "2024-05-18",
          type: "Theory"
        },
        {
          id: "ma201",
          code: "MA201",
          name: "Differential Equations",
          credits: 4,
          marks: 92,
          grade: "A+",
          gradePoint: 10,
          semester: 2,
          examDate: "2024-05-20",
          type: "Theory"
        },
        {
          id: "ee201",
          code: "EE201",
          name: "Basic Electrical Engineering",
          credits: 3,
          marks: 85,
          grade: "A",
          gradePoint: 9,
          semester: 2,
          examDate: "2024-05-22",
          type: "Theory"
        },
        {
          id: "cs211",
          code: "CS211",
          name: "Data Structures Lab",
          credits: 2,
          marks: 88,
          grade: "A",
          gradePoint: 9,
          semester: 2,
          examDate: "2024-05-10",
          type: "Practical"
        },
      ]
    },
    {
      semester: 3,
      year: "2024-25 Winter",
      sgpa: 9.0,
      cgpa: 8.97,
      courses: [
        {
          id: "cs301",
          code: "CS301",
          name: "Algorithms Design and Analysis",
          credits: 4,
          marks: 89,
          grade: "A",
          gradePoint: 9,
          semester: 3,
          examDate: "2024-12-14",
          type: "Theory"
        },
        {
          id: "cs302",
          code: "CS302",
          name: "Computer Organization",
          credits: 4,
          marks: 93,
          grade: "A+",
          gradePoint: 10,
          semester: 3,
          examDate: "2024-12-16",
          type: "Theory"
        },
        {
          id: "cs303",
          code: "CS303",
          name: "Database Management Systems",
          credits: 3,
          marks: 86,
          grade: "A",
          gradePoint: 9,
          semester: 3,
          examDate: "2024-12-19",
          type: "Theory"
        },
        {
          id: "ma301",
          code: "MA301",
          name: "Probability and Statistics",
          credits: 3,
          marks: 82,
          grade: "A",
          gradePoint: 9,
          semester: 3,
          examDate: "2024-12-21",
          type: "Theory"
        },
        {
          id: "cs311",
          code: "CS311",
          name: "Algorithms Lab",
          credits: 2,
          marks: 91,
          grade: "A+",
          gradePoint: 10,
          semester: 3,
          examDate: "2024-12-08",
          type: "Practical"
        },
        {
          id: "cs312",
          code: "CS312",
          name: "DBMS Lab",
          credits: 2,
          marks: 83,
          grade: "A",
          gradePoint: 9,
          semester: 3,
          examDate: "2024-12-09",
          type: "Practical"
        },
      ]
    }
  ]);

  // Grading system info
  const gradingSystem = [
    { grade: "A+", range: "90-100", points: 10 },
    { grade: "A", range: "80-89", points: 9 },
    { grade: "B+", range: "70-79", points: 8 },
    { grade: "B", range: "60-69", points: 7 },
    { grade: "C+", range: "55-59", points: 6 },
    { grade: "C", range: "50-54", points: 5 },
    { grade: "D", range: "45-49", points: 4 },
    { grade: "E", range: "40-44", points: 3 },
    { grade: "F", range: "0-39", points: 0 },
  ];

  // Get color based on grade
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
        return "bg-green-500";
      case "A":
        return "bg-green-400";
      case "B+":
        return "bg-blue-500";
      case "B":
        return "bg-blue-400";
      case "C+":
        return "bg-yellow-500";
      case "C":
        return "bg-yellow-400";
      case "D":
        return "bg-orange-500";
      case "E":
        return "bg-orange-400";
      case "F":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // Prepare chart data
  const sgpaChartData = semesterResults.map(semester => ({
    name: `Sem ${semester.semester}`,
    sgpa: semester.sgpa,
    cgpa: semester.cgpa
  }));

  // State for active tab
  const [activeTab, setActiveTab] = useState(String(semesterResults.length));

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Exam Results</h1>
            <p className="text-muted-foreground">
              View your semester-wise academic performance
            </p>
          </div>
        </div>

        {/* CGPA Summary */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Current CGPA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {semesterResults[semesterResults.length - 1].cgpa.toFixed(2)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Latest SGPA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {semesterResults[semesterResults.length - 1].sgpa.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Semester {semesterResults[semesterResults.length - 1].semester}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Highest SGPA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.max(...semesterResults.map(s => s.sgpa)).toFixed(2)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {semesterResults.reduce((total, semester) => 
                  total + semester.courses.reduce((credits, course) => credits + course.credits, 0), 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Graph */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sgpaChartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Bar dataKey="sgpa" name="SGPA" fill="#8884d8" />
                  <Bar dataKey="cgpa" name="CGPA" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Semester-wise Results */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            {semesterResults.map((semResult) => (
              <TabsTrigger key={semResult.semester} value={String(semResult.semester)}>
                Semester {semResult.semester}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {semesterResults.map((semResult) => (
            <TabsContent key={semResult.semester} value={String(semResult.semester)}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Semester {semResult.semester} Results</CardTitle>
                      <p className="text-muted-foreground">{semResult.year}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Course Code</TableHead>
                              <TableHead>Course Name</TableHead>
                              <TableHead>Credits</TableHead>
                              <TableHead>Marks</TableHead>
                              <TableHead>Grade</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {semResult.courses.map((course) => (
                              <TableRow key={course.id}>
                                <TableCell className="font-medium">{course.code}</TableCell>
                                <TableCell>
                                  <div>{course.name}</div>
                                  <Badge variant="outline" className="mt-1">
                                    {course.type}
                                  </Badge>
                                </TableCell>
                                <TableCell>{course.credits}</TableCell>
                                <TableCell>{course.marks}</TableCell>
                                <TableCell>
                                  <Badge className={getGradeColor(course.grade)}>
                                    {course.grade}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="p-4 rounded-md border">
                          <div className="text-sm font-medium mb-2">SGPA (Semester)</div>
                          <div className="text-3xl font-bold">{semResult.sgpa.toFixed(2)}</div>
                        </div>
                        <div className="p-4 rounded-md border">
                          <div className="text-sm font-medium mb-2">CGPA (Cumulative)</div>
                          <div className="text-3xl font-bold">{semResult.cgpa.toFixed(2)}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="md:w-1/3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Grading System</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Grade</TableHead>
                              <TableHead>Marks (%)</TableHead>
                              <TableHead>Points</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {gradingSystem.map((grade, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  <Badge className={getGradeColor(grade.grade)}>
                                    {grade.grade}
                                  </Badge>
                                </TableCell>
                                <TableCell>{grade.range}</TableCell>
                                <TableCell>{grade.points}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      
                      <div className="mt-6 text-sm">
                        <div className="font-medium mb-2">SGPA & CGPA Calculation</div>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                          <li>SGPA = Σ(Credit × Grade Point) / Σ(Credit)</li>
                          <li>CGPA = Σ(SGPA × Credits in the semester) / Σ(Total Credits)</li>
                          <li>Passing Grade: D (4 points) or above</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default ExamResults; 