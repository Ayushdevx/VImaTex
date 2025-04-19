import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { VideoChat } from '@/components/VideoChat';
import { toast } from '@/components/ui/use-toast';
import { Camera, Clock, Heart, Calendar, CheckCircle } from 'lucide-react';
import { CollegeProfileData } from './CollegeDatingProfile';

interface VideoDateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: CollegeProfileData;
  onSchedule?: (profile: CollegeProfileData, dateTime: Date, duration: number) => void;
  userProfile?: Partial<CollegeProfileData>;
}

export const VideoDateDialog: React.FC<VideoDateDialogProps> = ({
  open,
  onOpenChange,
  profile,
  onSchedule,
  userProfile
}) => {
  const [mode, setMode] = useState<'instant' | 'schedule'>('instant');
  const [dateTime, setDateTime] = useState<string>('');
  const [duration, setDuration] = useState<string>('15');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isStartingCall, setIsStartingCall] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [roomId, setRoomId] = useState('');

  // For scheduling a date
  const handleScheduleDate = () => {
    if (!dateTime) {
      toast({
        title: "Please select a date and time",
        variant: "destructive"
      });
      return;
    }

    // Generate a unique room ID for future use
    const generatedRoomId = `date-${profile.id}-${Date.now()}`;
    
    toast({
      title: "Video Date Scheduled!",
      description: `Your date with ${profile.name} is set for ${new Date(dateTime).toLocaleString()}`,
      action: (
        <Button variant="outline" size="sm" onClick={() => {
          // Add to calendar logic would go here
          toast({
            title: "Added to calendar",
            description: "Your date has been added to your calendar"
          });
        }}>
          <Calendar className="h-4 w-4 mr-1" />
          Add to Calendar
        </Button>
      )
    });
    
    onSchedule?.(profile, new Date(dateTime), parseInt(duration));
    onOpenChange(false);
  };

  // For starting an instant date
  const handleStartInstantDate = () => {
    if (!termsAccepted) {
      toast({
        title: "Please accept the terms",
        variant: "destructive"
      });
      return;
    }

    setIsStartingCall(true);
    
    // Generate a room ID
    const generatedRoomId = `date-${profile.id}-${Date.now()}`;
    setRoomId(generatedRoomId);

    // Simulate connection delay
    setTimeout(() => {
      setIsStartingCall(false);
      setInCall(true);
      
      toast({
        title: "Video Date Started",
        description: `You're now on a video date with ${profile.name}!`
      });
    }, 2000);
  };
  
  const handleEndCall = () => {
    setInCall(false);
    onOpenChange(false);
    
    toast({
      title: "Video Date Ended",
      description: "How did your date go? Would you like to rate your experience?",
      action: (
        <Button size="sm" className="bg-pink-500 text-white" onClick={() => {
          toast({
            title: "Thanks for your feedback!",
            description: "We'll use your feedback to improve matches"
          });
        }}>
          <Heart className="h-3 w-3 mr-1" /> Rate Date
        </Button>
      )
    });
  };

  // Today and tomorrow's date in ISO format for the date picker
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const todayStr = today.toISOString().split('T')[0];
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  if (inCall) {
    return (
      <Dialog open={open} onOpenChange={(newOpen) => {
        if (!newOpen) {
          handleEndCall();
        }
        onOpenChange(newOpen);
      }}>
        <DialogContent className="max-w-4xl h-[90vh]">
          <VideoChat 
            roomId={roomId}
            onClose={handleEndCall}
            participants={[{ 
              id: profile.id, 
              name: profile.name, 
              avatar: profile.images?.[0]
            }]}
            context="dating"
            title={`Video Date with ${profile.name}`}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Camera className="h-5 w-5 mr-2 text-pink-500" />
            Video Date with {profile.name}
          </DialogTitle>
          <DialogDescription>
            Connect through a secure video call for a virtual date
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center mb-4">
          <div className="flex border rounded-lg overflow-hidden">
            <button 
              className={`px-4 py-2 ${mode === 'instant' ? 'bg-pink-500 text-white' : 'bg-muted'}`}
              onClick={() => setMode('instant')}
            >
              Instant Date
            </button>
            <button 
              className={`px-4 py-2 ${mode === 'schedule' ? 'bg-pink-500 text-white' : 'bg-muted'}`}
              onClick={() => setMode('schedule')}
            >
              Schedule for Later
            </button>
          </div>
        </div>
        
        {mode === 'instant' ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Duration</h3>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                You can always extend the duration during the call if both parties agree.
              </p>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox id="terms" checked={termsAccepted} onCheckedChange={(checked) => setTermsAccepted(checked as boolean)} />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I agree to the community guidelines
                </Label>
                <p className="text-xs text-muted-foreground">
                  Be respectful, appropriate, and follow our community guidelines during video calls.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-md p-3 text-sm text-blue-800 flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
              <div>
                <p className="font-medium mb-1">Campus Safety Feature</p>
                <p>This call is only available to verified students and all video dates are securely logged for safety.</p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={handleStartInstantDate} 
                className="bg-pink-500 hover:bg-pink-600"
                disabled={isStartingCall}
              >
                {isStartingCall ? "Connecting..." : "Start Video Date Now"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Date & Time</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={todayStr}>Today</SelectItem>
                      <SelectItem value={tomorrowStr}>Tomorrow</SelectItem>
                      <SelectItem value="custom">Custom Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="17:00">5:00 PM</SelectItem>
                      <SelectItem value="18:00">6:00 PM</SelectItem>
                      <SelectItem value="19:00">7:00 PM</SelectItem>
                      <SelectItem value="20:00">8:00 PM</SelectItem>
                      <SelectItem value="21:00">9:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Duration</h3>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="bg-muted p-3 rounded-md">
              <p className="text-xs text-center text-muted-foreground">
                {profile.name} will receive a notification for your scheduled date. 
                You'll both get a reminder 15 minutes before the date starts.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={handleScheduleDate} 
                className="bg-pink-500 hover:bg-pink-600"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Video Date
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};