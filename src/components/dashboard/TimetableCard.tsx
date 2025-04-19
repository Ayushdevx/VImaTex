import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Days of the week
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Mock data for class schedule
const classSchedule = {
  Monday: [
    { id: 1, course: 'Data Structures', code: 'CSE2001', time: '09:00 - 10:40', location: 'SJT 305', instructor: 'Dr. Sharma' },
    { id: 2, course: 'Operating Systems', code: 'CSE3002', time: '11:00 - 12:40', location: 'TT 304', instructor: 'Dr. Mehta' },
    { id: 3, course: 'Technical Communication', code: 'HUM1001', time: '15:00 - 16:40', location: 'MB 103', instructor: 'Dr. Roberts' },
  ],
  Tuesday: [
    { id: 4, course: 'Computer Networks', code: 'CSE3011', time: '08:00 - 09:40', location: 'SJT 208', instructor: 'Dr. Kumar' },
    { id: 5, course: 'Software Engineering', code: 'CSE4019', time: '11:00 - 12:40', location: 'TT 304', instructor: 'Dr. Gupta' },
  ],
  Wednesday: [
    { id: 6, course: 'Data Structures Lab', code: 'CSE2001P', time: '14:00 - 16:40', location: 'SJT Lab 1', instructor: 'Dr. Sharma' },
    { id: 7, course: 'Operating Systems', code: 'CSE3002', time: '11:00 - 12:40', location: 'TT 304', instructor: 'Dr. Mehta' },
  ],
  Thursday: [
    { id: 8, course: 'Computer Networks', code: 'CSE3011', time: '08:00 - 09:40', location: 'SJT 208', instructor: 'Dr. Kumar' },
    { id: 9, course: 'Software Engineering', code: 'CSE4019', time: '11:00 - 12:40', location: 'TT 304', instructor: 'Dr. Gupta' },
    { id: 10, course: 'Technical Communication', code: 'HUM1001', time: '15:00 - 16:40', location: 'MB 103', instructor: 'Dr. Roberts' },
  ],
  Friday: [
    { id: 11, course: 'Data Structures', code: 'CSE2001', time: '09:00 - 10:40', location: 'SJT 305', instructor: 'Dr. Sharma' },
    { id: 12, course: 'Operating Systems Lab', code: 'CSE3002P', time: '14:00 - 16:40', location: 'SJT Lab 3', instructor: 'Dr. Mehta' },
  ],
  Saturday: [],
  Sunday: [],
};

// Helper function to get current time in 24-hour format (HH:MM)
const getCurrentTime = () => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
};

// Helper function to check if a class is currently ongoing
const isOngoing = (timeRange: string) => {
  const currentTime = getCurrentTime();
  const [start, end] = timeRange.split(' - ').map(time => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes; // Convert to minutes
  });
  
  const [currentHours, currentMinutes] = currentTime.split(':').map(Number);
  const currentTimeInMinutes = currentHours * 60 + currentMinutes;
  
  return currentTimeInMinutes >= start && currentTimeInMinutes <= end;
};

// Helper function to check if a class is upcoming (within the next hour)
const isUpcoming = (timeRange: string) => {
  const currentTime = getCurrentTime();
  const [start] = timeRange.split(' - ').map(time => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes; // Convert to minutes
  });
  
  const [currentHours, currentMinutes] = currentTime.split(':').map(Number);
  const currentTimeInMinutes = currentHours * 60 + currentMinutes;
  
  return start > currentTimeInMinutes && start - currentTimeInMinutes <= 60;
};

export const TimetableCard = () => {
  // Get current day index and day name
  const today = new Date();
  const currentDayIndex = today.getDay();
  const [selectedDayIndex, setSelectedDayIndex] = useState(currentDayIndex);
  const selectedDay = DAYS[selectedDayIndex];
  
  // Handler for previous day button
  const handlePrevDay = () => {
    setSelectedDayIndex((prev) => (prev === 0 ? 6 : prev - 1));
  };
  
  // Handler for next day button
  const handleNextDay = () => {
    setSelectedDayIndex((prev) => (prev === 6 ? 0 : prev + 1));
  };
  
  // Handler for today button
  const handleTodayClick = () => {
    setSelectedDayIndex(currentDayIndex);
  };
  
  // Get classes for the selected day
  const dayClasses = classSchedule[selectedDay as keyof typeof classSchedule] || [];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Timetable
            </CardTitle>
            <div className="flex items-center space-x-1">
              <Button variant="outline" size="icon" onClick={handlePrevDay}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleTodayClick}
                className={cn(
                  "text-xs px-2 py-1 h-8",
                  selectedDayIndex === currentDayIndex ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
                )}
              >
                Today
              </Button>
              <Button variant="outline" size="icon" onClick={handleNextDay}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardDescription className="flex justify-between items-center">
            <span>Schedule for {selectedDay}</span>
            <span className="text-xs">{today.toLocaleDateString()}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {dayClasses.length > 0 ? (
            <div className="space-y-3">
              {dayClasses.map((classItem) => {
                const ongoing = isOngoing(classItem.time);
                const upcoming = isUpcoming(classItem.time);
                
                return (
                  <div 
                    key={classItem.id} 
                    className={cn(
                      "p-3 border rounded-lg transition-colors relative",
                      ongoing ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" : 
                      upcoming ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800" : 
                      "hover:bg-accent/50"
                    )}
                  >
                    {(ongoing || upcoming) && (
                      <div className={cn(
                        "absolute top-2 right-2 text-xs font-medium px-2 py-0.5 rounded-full",
                        ongoing ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100" : 
                        "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                      )}>
                        {ongoing ? "Ongoing" : "In 1hr"}
                      </div>
                    )}
                    
                    <div className="font-medium">{classItem.course}</div>
                    <div className="text-xs text-muted-foreground">{classItem.code}</div>
                    
                    <div className="mt-2 flex flex-col space-y-1.5">
                      <div className="flex items-center text-xs">
                        <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span>{classItem.time}</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span>{classItem.location}</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <span className="text-muted-foreground">Instructor:</span>
                        <span className="ml-1">{classItem.instructor}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Calendar className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No classes scheduled for {selectedDay}</p>
              <p className="text-xs text-muted-foreground mt-1">Enjoy your day off!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}; 