import React, { useState } from 'react';
import {
  Calendar,
  CalendarIcon,
  Users,
  MapPin,
  Clock,
  GraduationCap,
  Heart,
  Star,
  Timer,
  ChevronRight,
  Filter
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

// Event types suitable for college campus
export type EventType = 'speedDating' | 'groupActivity' | 'workshop' | 'mixer' | 'game';

export interface DatingEvent {
  id: string;
  title: string;
  description: string;
  type: EventType;
  date: string; // ISO string
  time: string;
  location: string;
  host: string;
  hostImage?: string;
  participantsCount: number;
  maxParticipants: number;
  price: number | 'Free';
  tags: string[];
  isVerified: boolean;
  participants?: {
    id: string;
    name: string;
    image?: string;
  }[];
}

const mockEvents: DatingEvent[] = [
  {
    id: '1',
    title: 'Spring Speed Dating Mixer',
    description: 'Meet 10 potential matches in one evening. Speed dating format with 7 minutes per conversation.',
    type: 'speedDating',
    date: '2025-04-25T00:00:00.000Z',
    time: '7:00 PM - 9:00 PM',
    location: 'Student Union Ballroom',
    host: 'Student Activities Board',
    hostImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
    participantsCount: 42,
    maxParticipants: 50,
    price: 5,
    tags: ['Speed Dating', 'Social', 'Indoor'],
    isVerified: true,
    participants: [
      { id: 'p1', name: 'Alex', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
      { id: 'p2', name: 'Jamie', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
      { id: 'p3', name: 'Taylor', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6' },
    ]
  },
  {
    id: '2',
    title: 'Sunset Beach Volleyball & Bonfire',
    description: 'Casual group dating event with beach volleyball matches followed by a bonfire social. Great way to meet new people in a relaxed setting.',
    type: 'groupActivity',
    date: '2025-04-27T00:00:00.000Z',
    time: '5:00 PM - 9:00 PM',
    location: 'Campus Beach',
    host: 'Outdoor Recreation Club',
    hostImage: 'https://images.unsplash.com/photo-1539127041697-6d583b87e9fc',
    participantsCount: 28,
    maxParticipants: 40,
    price: 'Free',
    tags: ['Outdoor', 'Sports', 'Social'],
    isVerified: true,
    participants: [
      { id: 'p4', name: 'Jordan', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d' },
      { id: 'p5', name: 'Sam', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb' },
      { id: 'p6', name: 'Riley', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2' },
    ]
  },
  {
    id: '3',
    title: 'Board Game Cafe Mixer',
    description: 'Connect with fellow students over board games at the campus cafe. A fun, low-pressure way to meet new people and potential matches.',
    type: 'game',
    date: '2025-05-02T00:00:00.000Z',
    time: '6:00 PM - 8:30 PM',
    location: 'Campus Cafe',
    host: 'Board Game Club',
    participantsCount: 18,
    maxParticipants: 24,
    price: 2,
    tags: ['Games', 'Casual', 'Indoor'],
    isVerified: true
  },
  {
    id: '4',
    title: 'Dating Communication Workshop',
    description: 'Learn effective communication skills for dating and relationships. Interactive workshop followed by a social mixer.',
    type: 'workshop',
    date: '2025-05-08T00:00:00.000Z',
    time: '4:00 PM - 6:00 PM',
    location: 'Psychology Building, Room 202',
    host: 'Counseling Department',
    participantsCount: 12,
    maxParticipants: 30,
    price: 'Free',
    tags: ['Workshop', 'Educational', 'Indoor'],
    isVerified: true
  },
  {
    id: '5',
    title: 'Thursday Night Trivia & Drinks',
    description: 'Form teams and compete in a fun trivia night with other singles. Great way to meet people with similar interests.',
    type: 'mixer',
    date: '2025-04-24T00:00:00.000Z',
    time: '8:00 PM - 10:30 PM',
    location: 'Campus Pub',
    host: 'Student Bar Association',
    participantsCount: 32,
    maxParticipants: 50,
    price: 'Free',
    tags: ['Trivia', 'Social', 'Drinks'],
    isVerified: false
  }
];

interface DatingEventsProps {
  userCollege?: string;
  onEventSelect?: (event: DatingEvent) => void;
}

export const DatingEvents: React.FC<DatingEventsProps> = ({ 
  userCollege = "VIT Chennai",
  onEventSelect
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [events, setEvents] = useState<DatingEvent[]>(mockEvents);

  const filterEvents = (filterType: string) => {
    setFilter(filterType);
    if (filterType === 'all') {
      setEvents(mockEvents);
    } else {
      setEvents(mockEvents.filter(event => event.type === filterType));
    }
  };

  const formatEventDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };
  
  // Check if event is coming up soon (within next 3 days)
  const isUpcoming = (dateString: string): boolean => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const differenceInDays = (eventDate.getTime() - now.getTime()) / (1000 * 3600 * 24);
    return differenceInDays <= 3 && differenceInDays > 0;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center">
          <Calendar className="mr-2 h-6 w-6 text-pink-500" />
          Dating Events
        </h2>
        <Select value={filter} onValueChange={filterEvents}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Events" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="speedDating">Speed Dating</SelectItem>
            <SelectItem value="groupActivity">Group Activities</SelectItem>
            <SelectItem value="workshop">Workshops</SelectItem>
            <SelectItem value="mixer">Mixers</SelectItem>
            <SelectItem value="game">Games</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-4">
        {events.map(event => (
          <Card 
            key={event.id}
            className={`overflow-hidden transition-all hover:border-pink-200 hover:shadow-md ${
              isUpcoming(event.date) ? 'border-pink-200' : ''
            }`}
            onClick={() => onEventSelect?.(event)}
          >
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    {event.title}
                    {event.isVerified && (
                      <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                        <GraduationCap className="h-3 w-3 mr-1" /> Campus Official
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="mt-1">{event.description}</CardDescription>
                </div>
                {isUpcoming(event.date) && (
                  <Badge className="bg-pink-500">
                    <Timer className="h-3 w-3 mr-1" /> Coming Soon
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="grid grid-cols-2 gap-y-2">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{formatEventDate(event.date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{event.participantsCount}/{event.maxParticipants} participants</span>
                </div>
              </div>
              
              <Separator className="my-3" />
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-3">
                    {event.participants?.slice(0, 3).map(participant => (
                      <Avatar key={participant.id} className="border-2 border-background h-6 w-6">
                        <AvatarImage src={participant.image} alt={participant.name} />
                        <AvatarFallback>{participant.name[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                    {event.participantsCount > 3 && (
                      <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
                        +{event.participantsCount - 3}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 flex-1 max-w-[200px]">
                    {event.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-sm mr-2">
                    {event.price === 'Free' ? 'Free' : `$${event.price}`}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/20 p-3 flex justify-between">
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  {event.hostImage ? (
                    <AvatarImage src={event.hostImage} alt={event.host} />
                  ) : (
                    <AvatarFallback>{event.host.charAt(0)}</AvatarFallback>
                  )}
                </Avatar>
                <span className="text-xs text-muted-foreground">Hosted by {event.host}</span>
              </div>
              <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                <Heart className="mr-1 h-3 w-3" />
                Join Event
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};