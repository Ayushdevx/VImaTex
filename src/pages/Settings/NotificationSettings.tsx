import React, { useState } from "react";
import { useUserPreferences } from "@/contexts/UserPreferencesContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, MessageSquare, Calendar, BookOpen, Heart, Bell as BellIcon, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const NotificationSettings = () => {
  const { notificationPreferences, updateNotificationPreferences } = useUserPreferences();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [quietHours, setQuietHours] = useState(false);

  // Handle requesting browser notifications permission
  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      toast({
        title: "Browser Not Supported",
        description: "Your browser doesn't support desktop notifications.",
        variant: "destructive",
      });
      return;
    }

    if (Notification.permission === "granted") {
      toast({
        title: "Permission Already Granted",
        description: "You'll receive desktop notifications when important events happen.",
      });
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        toast({
          title: "Notifications Enabled",
          description: "You'll now receive desktop notifications for important updates.",
        });
        
        // Show an example notification
        new Notification("VImaTe Notifications Enabled", {
          body: "You'll now receive notifications for important updates.",
          icon: "/favicon.ico"
        });
      } else {
        toast({
          title: "Permission Denied",
          description: "You won't receive desktop notifications for now.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error requesting permission:", error);
      toast({
        title: "Something went wrong",
        description: "Could not request notification permission.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Notifications</h2>
        <p className="text-muted-foreground">
          Control how and when you want to be notified.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Control notification delivery preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-notifications" className="block">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Allow notifications to be shown on your device
              </p>
            </div>
            <Button variant="outline" onClick={requestNotificationPermission}>
              {Notification.permission === "granted" ? "Enabled" : "Enable"}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications" className="block">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive important updates via email
              </p>
            </div>
            <Switch id="email-notifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="in-app-notifications" className="block">In-App Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Show notifications within the app
              </p>
            </div>
            <Switch id="in-app-notifications" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Types</CardTitle>
          <CardDescription>Choose which notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-500" />
              <Label htmlFor="notify-messages" className="cursor-pointer">Messages</Label>
            </div>
            <Switch 
              id="notify-messages" 
              checked={notificationPreferences.messages}
              onCheckedChange={(checked) => updateNotificationPreferences({ messages: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-pink-500" />
              <Label htmlFor="notify-matches" className="cursor-pointer">New matches</Label>
            </div>
            <Switch 
              id="notify-matches" 
              checked={notificationPreferences.matches}
              onCheckedChange={(checked) => updateNotificationPreferences({ matches: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-green-500" />
              <Label htmlFor="notify-events" className="cursor-pointer">Events & reminders</Label>
            </div>
            <Switch 
              id="notify-events" 
              checked={notificationPreferences.events}
              onCheckedChange={(checked) => updateNotificationPreferences({ events: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-amber-500" />
              <Label htmlFor="notify-academics" className="cursor-pointer">Academic updates</Label>
            </div>
            <Switch 
              id="notify-academics" 
              checked={notificationPreferences.academics}
              onCheckedChange={(checked) => updateNotificationPreferences({ academics: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Delivery Settings</CardTitle>
          <CardDescription>Control how notifications are delivered</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notification-sounds" className="block">Notification Sounds</Label>
              <p className="text-sm text-muted-foreground">
                Play sounds when notifications arrive
              </p>
            </div>
            <div className="flex items-center">
              {soundEnabled ? (
                <Volume2 className="h-4 w-4 mr-2 text-muted-foreground" />
              ) : (
                <VolumeX className="h-4 w-4 mr-2 text-muted-foreground" />
              )}
              <Switch 
                id="notification-sounds" 
                checked={soundEnabled} 
                onCheckedChange={setSoundEnabled}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notification-vibration" className="block">Vibration</Label>
              <p className="text-sm text-muted-foreground">
                Vibrate when notifications arrive
              </p>
            </div>
            <Switch 
              id="notification-vibration" 
              checked={vibrationEnabled}
              onCheckedChange={setVibrationEnabled}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="quiet-hours" className="block">Quiet Hours</Label>
              <p className="text-sm text-muted-foreground">
                Silence notifications during certain hours
              </p>
            </div>
            <Switch 
              id="quiet-hours" 
              checked={quietHours}
              onCheckedChange={setQuietHours}
            />
          </div>

          {quietHours && (
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Label htmlFor="start-time" className="text-sm mb-1 block">Start Time</Label>
                <Select defaultValue="22:00">
                  <SelectTrigger id="start-time">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }).map((_, i) => (
                      <SelectItem key={i} value={`${i}:00`}>
                        {i < 10 ? `0${i}:00` : `${i}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="end-time" className="text-sm mb-1 block">End Time</Label>
                <Select defaultValue="07:00">
                  <SelectTrigger id="end-time">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }).map((_, i) => (
                      <SelectItem key={i} value={`${i}:00`}>
                        {i < 10 ? `0${i}:00` : `${i}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="pt-2">
            <Label htmlFor="notification-priority" className="mb-1 block">Notification Priority</Label>
            <Select defaultValue="normal">
              <SelectTrigger id="notification-priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - No sound or vibration</SelectItem>
                <SelectItem value="normal">Normal - Default notification style</SelectItem>
                <SelectItem value="high">High - Prominent display with sound</SelectItem>
                <SelectItem value="urgent">Urgent - Maximum prominence</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification History</CardTitle>
          <CardDescription>View and manage your notification history</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="read">Read</TabsTrigger>
            </TabsList>
            
            <div className="text-center py-8 text-muted-foreground">
              <BellIcon className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p>No notifications in this category</p>
            </div>

            <div className="flex justify-center mt-4">
              <Button variant="outline" size="sm">
                Clear All Notifications
              </Button>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;