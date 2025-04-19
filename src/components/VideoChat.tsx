import React, { useEffect, useRef, useState, MouseEvent } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Mic, MicOff, Video, VideoOff, Phone, MonitorSmartphone, MessageSquare, 
  Heart, Users, Settings, FileText, Save, Image, Camera, Coffee, 
  Wine, Music, Star, Zap, RefreshCw, ThumbsUp, ThumbsDown, Clock, Bookmark
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Separator } from './ui/separator';
import { toast } from './ui/use-toast';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';
import { Card, CardContent } from './ui/card';

interface VideoChatProps {
  roomId: string;
  participants?: { id: string; name: string; avatar?: string }[];
  onClose?: () => void;
  context?: 'dating' | 'study' | 'hostel' | 'general';
  title?: string;
}

interface VideoChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roomId: string;
  title?: string;
  context?: 'dating' | 'study' | 'hostel' | 'general';
  participants?: { id: string; name: string; avatar?: string }[];
  duration?: number; // in minutes
  courseId?: string; // New prop for linking to course
  subject?: string; // Subject of study session
}

interface DrawingPoint {
  x: number;
  y: number;
  color: string;
  size: number;
  type: 'pen' | 'eraser';
}

interface WhiteboardLine {
  points: DrawingPoint[];
  color: string;
  size: number;
  type: 'pen' | 'eraser';
}

// Dating-specific interfaces
interface IceBreaker {
  id: string;
  question: string;
  category: 'fun' | 'deep' | 'casual' | 'flirty';
}

interface DateRating {
  chemistry: number;
  conversation: number;
  wouldMeetAgain: boolean;
}

interface DatingPreferences {
  moodLighting: string;
  backgroundMusic: boolean;
  virtualBackground: string | null;
  notifications: boolean;
}

export const VideoChat: React.FC<VideoChatProps> = ({ 
  roomId, 
  participants = [],
  onClose,
  context = 'dating', // Default to dating context for dating app
  title = 'Video Date'
}) => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [messages, setMessages] = useState<{id: string, sender: string, text: string, timestamp: Date}[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'participants' | 'chat' | 'notes'>('participants');
  
  const [sharedNotes, setSharedNotes] = useState('');
  const [isWhiteboardActive, setIsWhiteboardActive] = useState(false);
  const [whiteboardLines, setWhiteboardLines] = useState<WhiteboardLine[]>([]);
  const [currentLine, setCurrentLine] = useState<DrawingPoint[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingColor, setDrawingColor] = useState('#000000');
  const [drawingSize, setDrawingSize] = useState(3);
  const [drawingTool, setDrawingTool] = useState<'pen' | 'eraser'>('pen');
  const whiteboardCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isPomodoroActive, setIsPomodoroActive] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes in seconds
  const [isBreakTime, setIsBreakTime] = useState(false);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pomodoroRef = useRef<NodeJS.Timeout | null>(null);
  
  const mockParticipants = [
    { id: 'user1', name: 'You', avatar: 'https://github.com/shadcn.png', isSelf: true },
    { id: 'user2', name: 'Alex Johnson', avatar: '/avatars/alex.jpg' },
    ...(participants || [])
  ];
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Dating specific state
  const [moodLighting, setMoodLighting] = useState<string>('normal');
  const [backgroundMusic, setBackgroundMusic] = useState<boolean>(false);
  const [virtualBackground, setVirtualBackground] = useState<string | null>(null);
  const [iceBreakers, setIceBreakers] = useState<IceBreaker[]>([
    { id: '1', question: 'What\'s something you\'re passionate about that most people don\'t know?', category: 'casual' },
    { id: '2', question: 'What\'s your idea of a perfect first date?', category: 'fun' },
    { id: '3', question: 'Do you believe in love at first sight?', category: 'flirty' },
    { id: '4', question: 'What\'s something you\'ve always wanted to try but haven\'t yet?', category: 'casual' },
    { id: '5', question: 'What are your top three deal breakers in a relationship?', category: 'deep' },
    { id: '6', question: 'If you could travel anywhere tomorrow, where would you go?', category: 'fun' },
    { id: '7', question: 'What\'s the most spontaneous thing you\'ve ever done?', category: 'flirty' },
    { id: '8', question: 'How do you typically spend your weekends?', category: 'casual' }
  ]);
  const [currentIceBreakerIndex, setCurrentIceBreakerIndex] = useState<number>(-1);
  const [isIceBreakerVisible, setIsIceBreakerVisible] = useState<boolean>(false);
  const [dateRating, setDateRating] = useState<DateRating>({
    chemistry: 3,
    conversation: 3,
    wouldMeetAgain: true
  });
  const [showRatingDialog, setShowRatingDialog] = useState<boolean>(false);
  const [dateTimeRemaining, setDateTimeRemaining] = useState<number>(15 * 60); // 15 minutes
  const [isDateTimerActive, setIsDateTimerActive] = useState<boolean>(true);
  const [isMutualInterest, setIsMutualInterest] = useState<boolean>(false);
  const [showInterestButton, setShowInterestButton] = useState<boolean>(true);
  const [dateNotes, setDateNotes] = useState<string>('');
  const [noteModeType, setNoteModeType] = useState<'private' | 'shared'>('private');
  
  const dateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const formatDateTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  useEffect(() => {
    setTimeout(() => {
      setConnectionStatus('connected');
    }, 2000);
    
    timerRef.current = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.error("Error accessing media devices: ", err);
          toast({
            title: "Camera access failed",
            description: "Please ensure you've given permission to access your camera and microphone",
            variant: "destructive"
          });
        });
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const stream = localVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  useEffect(() => {
    // Create audio element for background music
    const audio = new Audio('/assets/sounds/soft-jazz.mp3');
    audio.loop = true;
    audio.volume = 0.2;
    audioRef.current = audio;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  useEffect(() => {
    if (audioRef.current) {
      if (backgroundMusic) {
        audioRef.current.play().catch(err => {
          console.error("Error playing background music:", err);
          setBackgroundMusic(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [backgroundMusic]);
  
  useEffect(() => {
    if (isDateTimerActive && dateTimeRemaining > 0) {
      dateTimerRef.current = setInterval(() => {
        setDateTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(dateTimerRef.current!);
            toast({
              title: "Date time's up!",
              description: "Your scheduled date time has ended. You can continue chatting or say goodbye."
            });
            setTimeout(() => setShowRatingDialog(true), 5000);
            return 0;
          }
          
          if (prev === 5 * 60) {
            toast({
              title: "5 minutes remaining",
              description: "Your date will end soon. Make it count!"
            });
          }
          
          return prev - 1;
        });
      }, 1000);
    } else if (dateTimerRef.current && !isDateTimerActive) {
      clearInterval(dateTimerRef.current);
      dateTimerRef.current = null;
    }
    
    return () => {
      if (dateTimerRef.current) {
        clearInterval(dateTimerRef.current);
        dateTimerRef.current = null;
      }
    };
  }, [isDateTimerActive, dateTimeRemaining]);
  
  const handleEndCall = () => {
    setConnectionStatus('disconnected');
    
    if (onClose) {
      onClose();
    }
    
    toast({
      title: "Call ended",
      description: `Call duration: ${formatTime(elapsedTime)}`
    });
  };
  
  const toggleMic = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      const audioTracks = stream.getAudioTracks();
      
      if (audioTracks.length > 0) {
        audioTracks[0].enabled = !isMicOn;
      }
    }
    
    setIsMicOn(!isMicOn);
  };
  
  const toggleVideo = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      const videoTracks = stream.getVideoTracks();
      
      if (videoTracks.length > 0) {
        videoTracks[0].enabled = !isVideoOn;
      }
    }
    
    setIsVideoOn(!isVideoOn);
  };
  
  const toggleScreenShare = () => {
    if (!isScreenSharing) {
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices.getDisplayMedia({ video: true })
          .then(stream => {
            if (localVideoRef.current) {
              const currentStream = localVideoRef.current.srcObject as MediaStream;
              
              localVideoRef.current.srcObject = stream;
              
              stream.getVideoTracks()[0].onended = () => {
                if (localVideoRef.current) {
                  localVideoRef.current.srcObject = currentStream;
                  setIsScreenSharing(false);
                }
              };
              
              setIsScreenSharing(true);
            }
          })
          .catch(err => {
            console.error("Error accessing screen share: ", err);
            toast({
              title: "Screen sharing failed",
              description: "Unable to share your screen",
              variant: "destructive"
            });
          });
      }
    } else {
      toggleVideo();
      setIsScreenSharing(false);
    }
  };
  
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim()) {
      const message = {
        id: `msg-${Date.now()}`,
        sender: 'You',
        text: newMessage,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };
  
  const showRandomIceBreaker = () => {
    const randomIndex = Math.floor(Math.random() * iceBreakers.length);
    setCurrentIceBreakerIndex(randomIndex);
    setIsIceBreakerVisible(true);
    
    setTimeout(() => {
      setIsIceBreakerVisible(false);
    }, 15000);
  };
  
  const toggleInterest = () => {
    setIsMutualInterest(true);
    setShowInterestButton(false);
    
    toast({
      title: "You've shown interest! 💖",
      description: "If they're interested too, you'll be notified after the call."
    });
  };
  
  const resetDateTimer = (minutes: number) => {
    setDateTimeRemaining(minutes * 60);
    setIsDateTimerActive(true);
    
    toast({
      title: "Date timer updated",
      description: `Your date timer has been set to ${minutes} minutes.`
    });
  };
  
  const handleMoodLightingChange = (value: string) => {
    setMoodLighting(value);
  };
  
  const saveDateNotes = () => {
    toast({
      title: "Notes saved",
      description: "Your date notes have been saved."
    });
  };
  
  const changeVirtualBackground = (bgValue: string | null) => {
    setVirtualBackground(bgValue);
    
    if (bgValue) {
      toast({
        title: "Virtual background applied",
        description: "Your background has been changed."
      });
    } else {
      toast({
        title: "Virtual background removed",
        description: "You're now showing your real background."
      });
    }
  };
  
  const submitDateRating = () => {
    toast({
      title: "Rating submitted",
      description: "Thanks for rating your date experience!"
    });
    setShowRatingDialog(false);
    
    setTimeout(() => {
      handleEndCall();
    }, 2000);
  };
  
  const getVideoContainerStyle = () => {
    let style: React.CSSProperties = {};
    
    if (virtualBackground) {
      style.backgroundImage = `url(${virtualBackground})`;
      style.backgroundSize = 'cover';
      style.backgroundPosition = 'center';
    }
    
    switch (moodLighting) {
      case 'warm':
        style.filter = 'sepia(0.3) saturate(1.3)';
        break;
      case 'cool':
        style.filter = 'hue-rotate(330deg) saturate(1.1)';
        break;
      case 'romantic':
        style.filter = 'brightness(0.9) sepia(0.2) saturate(1.3) hue-rotate(340deg)';
        break;
      case 'dramatic':
        style.filter = 'contrast(1.2) brightness(0.9)';
        break;
      default:
        break;
    }
    
    return style;
  };
  
  const getBgColor = () => {
    switch (context) {
      case 'dating':
        return 'bg-pink-50';
      case 'study':
        return 'bg-blue-50';
      case 'hostel':
        return 'bg-green-50';
      default:
        return 'bg-gray-50';
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className={`p-3 flex items-center justify-between border-b ${getBgColor()}`}>
        <div className="flex items-center space-x-3">
          <h2 className="font-medium flex items-center">
            <Heart className="h-4 w-4 text-pink-500 mr-1" /> {title}
          </h2>
          <Badge variant="secondary" className={connectionStatus === 'connected' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
            {connectionStatus === 'connected' ? 'Live' : 'Connecting...'}
          </Badge>
          
          {isDateTimerActive && (
            <Badge variant="outline" className="bg-pink-100 text-pink-800 border-pink-200">
              <Clock className="h-3 w-3 mr-1" /> {formatDateTimer(dateTimeRemaining)}
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-mono">{formatTime(elapsedTime)}</span>
        </div>
      </div>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-100">
        <div className="md:col-span-2 relative h-full min-h-[400px] overflow-hidden rounded-lg">
          <video 
            ref={remoteVideoRef} 
            autoPlay 
            playsInline
            className="w-full h-full rounded-lg bg-gray-900 object-cover"
            style={getVideoContainerStyle()}
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
            {mockParticipants.filter(p => !p.isSelf)[0] && (
              <Avatar className="w-32 h-32">
                <AvatarImage src={mockParticipants.filter(p => !p.isSelf)[0].avatar} alt={mockParticipants.filter(p => !p.isSelf)[0].name} />
                <AvatarFallback className="text-4xl">{mockParticipants.filter(p => !p.isSelf)[0].name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
          </div>
          
          {isIceBreakerVisible && currentIceBreakerIndex >= 0 && (
            <div className="absolute bottom-16 left-0 right-0 mx-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-pink-200">
              <div className="flex justify-between items-center mb-2">
                <Badge variant="outline" className="bg-pink-100 text-pink-800 border-pink-200">
                  Ice Breaker
                </Badge>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsIceBreakerVisible(false)}
                  className="h-6 w-6"
                >
                  ✕
                </Button>
              </div>
              <p className="text-base font-medium">
                {iceBreakers[currentIceBreakerIndex]?.question}
              </p>
            </div>
          )}
          
          {context === 'dating' && showInterestButton && (
            <div className="absolute bottom-4 right-4">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={toggleInterest}
                className="bg-pink-100 text-pink-800 hover:bg-pink-200"
              >
                <Heart className="h-4 w-4 mr-1 text-pink-500" />
                Show Interest
              </Button>
            </div>
          )}
          
          {isMutualInterest && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-pink-500 text-white">
                <Heart className="h-3 w-3 mr-1 fill-current" /> Mutual Interest
              </Badge>
            </div>
          )}
        </div>
        
        <div className="flex flex-col space-y-4">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <video 
              ref={localVideoRef} 
              autoPlay 
              muted 
              playsInline 
              className={`w-full h-full object-cover bg-gray-900 ${!isVideoOn ? 'invisible' : ''}`}
              style={virtualBackground ? { backgroundColor: '#00FF00' } : {}}
            />
            
            {!isVideoOn && (
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
              </div>
            )}
            
            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              You
            </div>
          </div>
          
          <Tabs defaultValue="chat" className="flex-1">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="chat">
                <MessageSquare className="h-4 w-4 mr-1" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-1" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="notes">
                <FileText className="h-4 w-4 mr-1" />
                Notes
              </TabsTrigger>
              <TabsTrigger value="icebreakers">
                <Zap className="h-4 w-4 mr-1" />
                Ice
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="h-[250px] border rounded-md flex flex-col">
              <div className="flex-1 p-3 overflow-y-auto space-y-3">
                {messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                    No messages yet
                  </div>
                ) : (
                  messages.map(msg => (
                    <div key={msg.id} className="flex flex-col">
                      <div className="flex items-center space-x-1">
                        <span className="font-medium text-xs">{msg.sender}</span>
                        <span className="text-gray-400 text-[10px]">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  ))
                )}
              </div>
              
              <div className="p-2 border-t">
                <form onSubmit={sendMessage} className="flex space-x-2">
                  <input 
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Button type="submit" size="sm">Send</Button>
                </form>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="h-[250px] border rounded-md overflow-y-auto">
              <div className="p-3 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Mood Lighting</h3>
                  <Select value={moodLighting} onValueChange={handleMoodLightingChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select lighting" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="warm">Warm</SelectItem>
                      <SelectItem value="cool">Cool</SelectItem>
                      <SelectItem value="romantic">Romantic</SelectItem>
                      <SelectItem value="dramatic">Dramatic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Virtual Background</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      className="w-full aspect-video rounded-sm bg-gray-100 border border-gray-200 flex items-center justify-center hover:border-primary"
                      onClick={() => changeVirtualBackground(null)}
                    >
                      None
                    </button>
                    <button 
                      className="w-full aspect-video rounded-sm bg-cover bg-center border border-gray-200 hover:border-primary"
                      style={{ backgroundImage: 'url(/assets/backgrounds/cafe.jpg)' }}
                      onClick={() => changeVirtualBackground('/assets/backgrounds/cafe.jpg')}
                    />
                    <button 
                      className="w-full aspect-video rounded-sm bg-cover bg-center border border-gray-200 hover:border-primary"
                      style={{ backgroundImage: 'url(/assets/backgrounds/beach.jpg)' }}
                      onClick={() => changeVirtualBackground('/assets/backgrounds/beach.jpg')}
                    />
                    <button 
                      className="w-full aspect-video rounded-sm bg-cover bg-center border border-gray-200 hover:border-primary"
                      style={{ backgroundImage: 'url(/assets/backgrounds/restaurant.jpg)' }}
                      onClick={() => changeVirtualBackground('/assets/backgrounds/restaurant.jpg')}
                    />
                    <button 
                      className="w-full aspect-video rounded-sm bg-cover bg-center border border-gray-200 hover:border-primary"
                      style={{ backgroundImage: 'url(/assets/backgrounds/park.jpg)' }}
                      onClick={() => changeVirtualBackground('/assets/backgrounds/park.jpg')}
                    />
                    <button 
                      className="w-full aspect-video rounded-sm bg-cover bg-center border border-gray-200 hover:border-primary flex items-center justify-center"
                      onClick={() => {
                        toast({
                          title: "Custom backgrounds",
                          description: "This feature would allow uploading your own background"
                        });
                      }}
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="background-music" className="text-sm font-medium">Background Music</Label>
                    <Music className="h-4 w-4 text-gray-400" />
                  </div>
                  <Switch 
                    id="background-music" 
                    checked={backgroundMusic}
                    onCheckedChange={setBackgroundMusic}
                  />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Date Timer</h3>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => resetDateTimer(5)}
                      className="text-xs"
                    >
                      5 min
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => resetDateTimer(15)}
                      className="text-xs"
                    >
                      15 min
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => resetDateTimer(30)}
                      className="text-xs"
                    >
                      30 min
                    </Button>
                    <Button 
                      size="sm" 
                      variant={isDateTimerActive ? "default" : "outline"}
                      onClick={() => setIsDateTimerActive(!isDateTimerActive)}
                      className="ml-auto text-xs"
                    >
                      {isDateTimerActive ? 'Pause' : 'Resume'}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notes" className="h-[250px] border rounded-md flex flex-col">
              <div className="p-2 border-b flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant={noteModeType === 'private' ? 'default' : 'outline'}
                    onClick={() => setNoteModeType('private')}
                    className="text-xs"
                  >
                    Private
                  </Button>
                  <Button 
                    size="sm" 
                    variant={noteModeType === 'shared' ? 'default' : 'outline'}
                    onClick={() => setNoteModeType('shared')}
                    className="text-xs"
                  >
                    Shared
                  </Button>
                </div>
                <Button size="sm" variant="outline" onClick={saveDateNotes}>
                  <Bookmark className="h-3 w-3 mr-1" />
                  Save
                </Button>
              </div>
              <Textarea
                value={dateNotes}
                onChange={(e) => setDateNotes(e.target.value)}
                placeholder={noteModeType === 'private' 
                  ? "Private notes about your date (only visible to you)..." 
                  : "Shared notes (visible to both of you)..."} 
                className="flex-1 resize-none"
              />
            </TabsContent>
            
            <TabsContent value="icebreakers" className="h-[250px] border rounded-md overflow-y-auto">
              <div className="p-3 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Ice Breaker Questions</h3>
                  <Button 
                    size="sm" 
                    onClick={showRandomIceBreaker}
                    className="bg-pink-100 text-pink-800 hover:bg-pink-200"
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    Random
                  </Button>
                </div>
                <div className="space-y-2">
                  {iceBreakers.map((question) => (
                    <Card key={question.id} className="cursor-pointer hover:bg-pink-50" onClick={() => {
                      setCurrentIceBreakerIndex(iceBreakers.findIndex(q => q.id === question.id));
                      setIsIceBreakerVisible(true);
                    }}>
                      <CardContent className="p-3 text-sm">
                        {question.question}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <div className="p-3 border-t flex items-center justify-between bg-white">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={toggleVideo} className={!isVideoOn ? 'bg-gray-200' : ''}>
            {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
          </Button>
          
          <Button variant="outline" size="icon" onClick={toggleMic} className={!isMicOn ? 'bg-gray-200' : ''}>
            {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          </Button>
          
          <Button variant="outline" size="icon" onClick={toggleScreenShare} className={isScreenSharing ? 'bg-blue-100' : ''}>
            <MonitorSmartphone className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon" onClick={showRandomIceBreaker}>
            <Zap className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="hidden md:flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="text-pink-500 hover:text-pink-700 hover:bg-pink-50">
            <Coffee className="h-4 w-4 mr-1" />
            Casual
          </Button>
          <Button variant="ghost" size="sm" className="text-pink-500 hover:text-pink-700 hover:bg-pink-50">
            <Wine className="h-4 w-4 mr-1" />
            Romantic
          </Button>
          <Button variant="ghost" size="sm" className="text-pink-500 hover:text-pink-700 hover:bg-pink-50">
            <Star className="h-4 w-4 mr-1" />
            Great Connection
          </Button>
        </div>
        
        <Button 
          variant="destructive" 
          size="icon" 
          onClick={() => setShowRatingDialog(true)}
        >
          <Phone className="h-4 w-4 rotate-[135deg]" />
        </Button>
      </div>
      
      {showRatingDialog && (
        <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>How was your date?</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="chemistry">Chemistry</Label>
                <div className="flex items-center space-x-2">
                  <Slider
                    id="chemistry"
                    min={1}
                    max={5}
                    step={1}
                    value={[dateRating.chemistry]}
                    onValueChange={(value) => setDateRating({...dateRating, chemistry: value[0]})}
                  />
                  <span className="w-12 text-center">{dateRating.chemistry}/5</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="conversation">Conversation</Label>
                <div className="flex items-center space-x-2">
                  <Slider
                    id="conversation"
                    min={1}
                    max={5}
                    step={1}
                    value={[dateRating.conversation]}
                    onValueChange={(value) => setDateRating({...dateRating, conversation: value[0]})}
                  />
                  <span className="w-12 text-center">{dateRating.conversation}/5</span>
                </div>
              </div>
              
              <div className="space-y-2 pt-2">
                <Label>Would you like to meet again?</Label>
                <div className="flex space-x-4 py-2">
                  <Button 
                    onClick={() => setDateRating({...dateRating, wouldMeetAgain: true})}
                    variant={dateRating.wouldMeetAgain ? "default" : "outline"}
                    className="flex-1"
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" /> Yes
                  </Button>
                  <Button 
                    onClick={() => setDateRating({...dateRating, wouldMeetAgain: false})}
                    variant={!dateRating.wouldMeetAgain ? "default" : "outline"}
                    className="flex-1"
                  >
                    <ThumbsDown className="h-4 w-4 mr-2" /> No
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={submitDateRating}>Submit & End Call</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export const VideoChatDialog: React.FC<VideoChatDialogProps> = ({
  open,
  onOpenChange,
  roomId,
  title = 'Video Date',
  context = 'dating',
  participants,
  duration = 15,
  courseId,
  subject
}) => {
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (open && context === 'dating' && duration > 0) {
      timer = setTimeout(() => {
        toast({
          title: "Date ending soon",
          description: "Your date will end in 1 minute"
        });
        
        setTimeout(() => {
          toast({
            title: "Date ended",
            description: `Your ${duration} minute date has ended`
          });
          onOpenChange(false);
        }, 60000);
      }, (duration - 1) * 60000);
    }
    
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [open, context, duration, onOpenChange]);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 min-h-0 -mx-6 -mt-2">
          <VideoChat 
            roomId={roomId} 
            onClose={() => onOpenChange(false)}
            participants={participants}
            context={context}
            title={title}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};