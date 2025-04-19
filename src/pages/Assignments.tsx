import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/layout";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";

const Assignments = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const assignments = [
    {
      id: 1,
      title: "Database Project",
      subject: "CS401 - Database Systems",
      description: "Design and implement a database for a university management system.",
      dueDate: "2023-12-20",
      status: "pending",
      progress: 25,
      priority: "high",
    },
    {
      id: 2,
      title: "Algorithm Analysis",
      subject: "CS302 - Algorithms",
      description: "Analyze the time and space complexity of given algorithms.",
      dueDate: "2023-12-15",
      status: "in-progress",
      progress: 60,
      priority: "medium",
    },
    {
      id: 3,
      title: "Machine Learning Model",
      subject: "CS501 - Machine Learning",
      description: "Train a model on the provided dataset and evaluate its performance.",
      dueDate: "2023-12-25",
      status: "in-progress",
      progress: 40,
      priority: "high",
    },
    {
      id: 4,
      title: "Network Protocols Essay",
      subject: "CS402 - Computer Networks",
      description: "Write a 2000-word essay on modern network protocols.",
      dueDate: "2023-12-10",
      status: "completed",
      progress: 100,
      priority: "medium",
    },
    {
      id: 5,
      title: "Software Design Patterns",
      subject: "CS405 - Software Engineering",
      description: "Implement three design patterns in a sample application.",
      dueDate: "2023-12-30",
      status: "pending",
      progress: 0,
      priority: "low",
    },
  ];

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate days remaining
  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get status badge style
  const getStatusBadge = (status: string, daysRemaining: number) => {
    if (status === "completed") {
      return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" /> Completed</Badge>;
    } else if (daysRemaining <= 3 && daysRemaining > 0) {
      return <Badge className="bg-amber-500"><Clock className="w-3 h-3 mr-1" /> Due Soon</Badge>;
    } else if (daysRemaining <= 0) {
      return <Badge className="bg-red-500"><AlertCircle className="w-3 h-3 mr-1" /> Overdue</Badge>;
    } else {
      return <Badge className="bg-blue-500"><Clock className="w-3 h-3 mr-1" /> In Progress</Badge>;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Assignments</h1>
          <div className="space-x-3">
            <Button variant="outline">Set Reminders</Button>
            <Button>Create Assignment</Button>
          </div>
        </div>

        <div className="w-full max-w-sm">
          <Input
            placeholder="Search assignments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Assignments</span>
                  <Badge className="bg-gray-500">{assignments.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Completed</span>
                  <Badge className="bg-green-500">{assignments.filter(a => a.status === "completed").length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>In Progress</span>
                  <Badge className="bg-blue-500">{assignments.filter(a => a.status === "in-progress").length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Pending</span>
                  <Badge className="bg-amber-500">{assignments.filter(a => a.status === "pending").length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Overdue</span>
                  <Badge className="bg-red-500">
                    {assignments.filter(a => a.status !== "completed" && getDaysRemaining(a.dueDate) <= 0).length}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Assignments due in the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {assignments
                  .filter(a => a.status !== "completed" && getDaysRemaining(a.dueDate) > 0 && getDaysRemaining(a.dueDate) <= 7)
                  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                  .map(assignment => (
                    <div key={assignment.id} className="flex items-center justify-between p-2 border rounded-md">
                      <div>
                        <p className="font-medium">{assignment.title}</p>
                        <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Due in {getDaysRemaining(assignment.dueDate)} days</p>
                        <p className="text-sm text-muted-foreground">{new Date(assignment.dueDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                {assignments.filter(a => a.status !== "completed" && getDaysRemaining(a.dueDate) > 0 && getDaysRemaining(a.dueDate) <= 7).length === 0 && (
                  <p className="text-center text-muted-foreground py-4">No assignments due in the next 7 days</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Assignments</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {filteredAssignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{assignment.title}</CardTitle>
                        <CardDescription>{assignment.subject}</CardDescription>
                      </div>
                      {getStatusBadge(assignment.status, getDaysRemaining(assignment.dueDate))}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="mb-3">{assignment.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>Progress</span>
                        <span>{assignment.progress}%</span>
                      </div>
                      <Progress value={assignment.progress} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">Update Progress</Button>
                      <Button size="sm">View Details</Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="completed" className="mt-6">
            <div className="space-y-4">
              {filteredAssignments
                .filter(assignment => assignment.status === "completed")
                .map((assignment) => (
                  <Card key={assignment.id}>
                    {/* Same card structure as above */}
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{assignment.title}</CardTitle>
                          <CardDescription>{assignment.subject}</CardDescription>
                        </div>
                        {getStatusBadge(assignment.status, getDaysRemaining(assignment.dueDate))}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="mb-3">{assignment.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span>Progress</span>
                          <span>{assignment.progress}%</span>
                        </div>
                        <Progress value={assignment.progress} className="h-2" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <Button size="sm">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="in-progress" className="mt-6">
            <div className="space-y-4">
              {filteredAssignments
                .filter(assignment => assignment.status === "in-progress")
                .map((assignment) => (
                  <Card key={assignment.id}>
                    {/* Same card structure as above */}
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{assignment.title}</CardTitle>
                          <CardDescription>{assignment.subject}</CardDescription>
                        </div>
                        {getStatusBadge(assignment.status, getDaysRemaining(assignment.dueDate))}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="mb-3">{assignment.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span>Progress</span>
                          <span>{assignment.progress}%</span>
                        </div>
                        <Progress value={assignment.progress} className="h-2" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">Update Progress</Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="pending" className="mt-6">
            <div className="space-y-4">
              {filteredAssignments
                .filter(assignment => assignment.status === "pending")
                .map((assignment) => (
                  <Card key={assignment.id}>
                    {/* Same card structure as above */}
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{assignment.title}</CardTitle>
                          <CardDescription>{assignment.subject}</CardDescription>
                        </div>
                        {getStatusBadge(assignment.status, getDaysRemaining(assignment.dueDate))}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="mb-3">{assignment.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span>Progress</span>
                          <span>{assignment.progress}%</span>
                        </div>
                        <Progress value={assignment.progress} className="h-2" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">Start</Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Assignments; 