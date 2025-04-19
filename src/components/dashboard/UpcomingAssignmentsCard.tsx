import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Clock, AlertCircle, Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

// Mock data for upcoming assignments
const upcomingAssignments = [
  {
    id: 1,
    title: 'Database Design Project',
    course: 'CSE4022 - Database Management Systems',
    dueDate: new Date('2023-11-25T23:59:59'),
    status: 'pending',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Neural Network Implementation',
    course: 'CSE4015 - Artificial Intelligence',
    dueDate: new Date('2023-11-28T23:59:59'),
    status: 'in-progress',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Advanced Circuit Analysis',
    course: 'ECE2003 - Electronics Engineering',
    dueDate: new Date('2023-12-01T23:59:59'),
    status: 'completed',
    priority: 'low'
  }
];

export const UpcomingAssignmentsCard = () => {
  // Function to calculate days remaining until deadline
  const getDaysRemaining = (dueDate: Date) => {
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Function to determine urgency level
  const getUrgencyLevel = (daysRemaining: number, priority: string) => {
    if (daysRemaining <= 2 || priority === 'high') return 'high';
    if (daysRemaining <= 5 || priority === 'medium') return 'medium';
    return 'low';
  };

  // Get badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>;
      default:
        return <Badge className="bg-amber-500 hover:bg-amber-600">Pending</Badge>;
    }
  };

  // Get urgency indicator
  const getUrgencyIndicator = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'low':
        return <Check className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };
  
  // Calculate completion percentage
  const completedCount = upcomingAssignments.filter(a => a.status === 'completed').length;
  const completionPercentage = (completedCount / upcomingAssignments.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <FileText className="mr-2 h-5 w-5 text-primary" />
            Upcoming Assignments
          </CardTitle>
          <CardDescription>Track your pending assignments and deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-muted-foreground">Completion</span>
              <span className="text-sm font-medium">{Math.round(completionPercentage)}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
          
          <div className="space-y-3">
            {upcomingAssignments.map((assignment) => {
              const daysRemaining = getDaysRemaining(assignment.dueDate);
              const urgency = getUrgencyLevel(daysRemaining, assignment.priority);
              
              return (
                <div 
                  key={assignment.id} 
                  className="p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-medium truncate flex-1">{assignment.title}</div>
                    <div className="ml-2 flex-shrink-0">
                      {getStatusBadge(assignment.status)}
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground mb-2">{assignment.course}</div>
                  
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center">
                      {getUrgencyIndicator(urgency)}
                      <span className="ml-1">
                        {assignment.status === 'completed' 
                          ? 'Submitted' 
                          : `Due in ${daysRemaining} days`}
                      </span>
                    </div>
                    <span>
                      {assignment.dueDate.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">View All Assignments</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}; 