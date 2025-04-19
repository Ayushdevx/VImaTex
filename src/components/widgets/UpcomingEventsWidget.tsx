import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, AlertTriangle, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  priority: "high" | "medium" | "low";
  type: "deadline" | "exam" | "social" | "meeting";
  completed?: boolean;
}

export const UpcomingEventsWidget = () => {
  // Mock data for upcoming events
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "CS-301 Project Submission",
      date: "2025-04-21",
      time: "23:59",
      priority: "high",
      type: "deadline"
    },
    {
      id: "2",
      title: "Machine Learning Quiz",
      date: "2025-04-23",
      time: "10:00",
      location: "Hall B-102",
      priority: "high",
      type: "exam"
    },
    {
      id: "3",
      title: "Study Group Meeting",
      date: "2025-04-20",
      time: "16:30",
      location: "Library Room 204",
      priority: "medium",
      type: "meeting",
      completed: false
    },
    {
      id: "4",
      title: "Campus Tech Fest",
      date: "2025-04-25",
      time: "09:00",
      location: "Main Auditorium",
      priority: "low",
      type: "social"
    }
  ]);
  
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const getPriorityClass = (priority: Event['priority']): string => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  const getTypeIcon = (type: Event['type']) => {
    switch (type) {
      case 'deadline':
        return <Clock className="h-4 w-4 text-red-600" />;
      case 'exam':
        return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case 'meeting':
        return <Calendar className="h-4 w-4 text-blue-600" />;
      case 'social':
        return <CalendarIcon className="h-4 w-4 text-green-600" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };
  
  // Toggle completed status of an event
  const toggleEventCompletion = (id: string) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, completed: !event.completed } : event
    ));
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-primary" />
          Upcoming Events
        </CardTitle>
        <CardDescription>Your schedule for the next days</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className={cn(
              "flex items-start gap-2 rounded-lg border p-2",
              event.completed && "opacity-60"
            )}>
              {(event.type === "deadline" || event.type === "meeting") && (
                <Checkbox 
                  checked={event.completed} 
                  onCheckedChange={() => toggleEventCompletion(event.id)}
                  className="mt-0.5"
                />
              )}
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className={cn(
                    "font-medium",
                    event.completed && "line-through"
                  )}>
                    {event.title}
                  </p>
                  <Badge variant="outline" className={getPriorityClass(event.priority)}>
                    {event.priority}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    {formatDate(event.date)}
                  </div>
                  
                  {event.time && (
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {event.time}
                    </div>
                  )}
                  
                  {event.location && (
                    <div>@ {event.location}</div>
                  )}
                </div>
              </div>
              
              <div className="mt-0.5">
                {getTypeIcon(event.type)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter>
        <div className="flex w-full justify-between">
          <Button variant="outline" size="sm">Add Event</Button>
          <Button variant="ghost" size="sm">View Calendar</Button>
        </div>
      </CardFooter>
    </Card>
  );
};