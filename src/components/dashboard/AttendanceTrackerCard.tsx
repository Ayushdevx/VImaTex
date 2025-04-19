import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar, AlertTriangle } from 'lucide-react';

// Mock data for course attendance
const courseAttendance = [
  {
    id: 1,
    name: 'Data Structures',
    code: 'CSE2001',
    attended: 18,
    total: 20,
    minRequired: 75,
  },
  {
    id: 2,
    name: 'Operating Systems',
    code: 'CSE3002',
    attended: 12,
    total: 16,
    minRequired: 75,
  },
  {
    id: 3,
    name: 'Computer Networks',
    code: 'CSE3011',
    attended: 14,
    total: 22,
    minRequired: 75,
  },
  {
    id: 4,
    name: 'Software Engineering',
    code: 'CSE4019',
    attended: 11,
    total: 18,
    minRequired: 75,
  }
];

export const AttendanceTrackerCard = () => {
  // Calculate overall attendance percentage
  const totalClasses = courseAttendance.reduce((acc, course) => acc + course.total, 0);
  const totalAttended = courseAttendance.reduce((acc, course) => acc + course.attended, 0);
  const overallPercentage = totalClasses > 0 ? Math.round((totalAttended / totalClasses) * 100) : 0;

  // Get attendance percentage for a course
  const getAttendancePercentage = (attended: number, total: number) => {
    return total > 0 ? Math.round((attended / total) * 100) : 0;
  };

  // Get progress color based on attendance percentage and minimum requirement
  const getProgressColor = (percentage: number, minRequired: number) => {
    if (percentage < minRequired) return 'bg-red-500';
    if (percentage < minRequired + 10) return 'bg-amber-500';
    return 'bg-green-500';
  };

  // Calculate classes needed to reach minimum attendance
  const getClassesNeeded = (attended: number, total: number, minRequired: number) => {
    const currentPercentage = getAttendancePercentage(attended, total);
    if (currentPercentage >= minRequired) return 0;
    
    let classesNeeded = 0;
    let newTotal = total;
    let newAttended = attended;
    
    while (getAttendancePercentage(newAttended, newTotal) < minRequired) {
      newTotal += 1;
      newAttended += 1;
      classesNeeded += 1;
    }
    
    return classesNeeded;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-primary" />
            Attendance Tracker
          </CardTitle>
          <CardDescription>Monitor your attendance across all courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Overall Attendance</span>
              <span className={`text-sm font-medium ${
                overallPercentage < 75 ? 'text-red-500' : 'text-green-500'
              }`}>
                {overallPercentage}%
              </span>
            </div>
            <Progress 
              value={overallPercentage} 
              className="h-2" 
              indicatorClassName={
                overallPercentage < 75 
                  ? 'bg-red-500' 
                  : overallPercentage < 85 
                    ? 'bg-amber-500' 
                    : 'bg-green-500'
              }
            />
          </div>

          <div className="space-y-3">
            {courseAttendance.map((course) => {
              const percentage = getAttendancePercentage(course.attended, course.total);
              const classesNeeded = getClassesNeeded(course.attended, course.total, course.minRequired);
              
              return (
                <div key={course.id} className="p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <div className="font-medium">{course.name}</div>
                      <div className="text-xs text-muted-foreground">{course.code}</div>
                    </div>
                    <span className={`text-sm font-medium ${
                      percentage < course.minRequired ? 'text-red-500' : 'text-green-500'
                    }`}>
                      {percentage}%
                    </span>
                  </div>
                  
                  <div className="mt-2 mb-1">
                    <Progress 
                      value={percentage} 
                      className="h-1.5" 
                      indicatorClassName={getProgressColor(percentage, course.minRequired)}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center text-xs">
                    <span>Attended: {course.attended}/{course.total}</span>
                    
                    {classesNeeded > 0 && (
                      <div className="flex items-center text-red-500">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        <span>Need {classesNeeded} more classes</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}; 