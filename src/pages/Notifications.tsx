
import { useState } from "react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Star, Users, Calendar, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "match" | "message" | "like" | "superlike" | "event" | "study" | "system";
  content: string;
  sender?: {
    name: string;
    image: string;
  };
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "match",
    content: "You and Emma matched!",
    sender: {
      name: "Emma",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
    },
    time: "Just now",
    read: false
  },
  {
    id: "2",
    type: "message",
    content: "Emma sent you a message: \"Are you free for coffee tomorrow?\"",
    sender: {
      name: "Emma",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
    },
    time: "2m ago",
    read: false
  },
  {
    id: "3",
    type: "like",
    content: "Michael liked your profile!",
    sender: {
      name: "Michael",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
    },
    time: "1h ago",
    read: false
  },
  {
    id: "4",
    type: "superlike",
    content: "Olivia Super Liked your profile!",
    sender: {
      name: "Olivia",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80"
    },
    time: "3h ago",
    read: true
  },
  {
    id: "5",
    type: "event",
    content: "New event near you: Campus Coffee Mixer",
    time: "Yesterday",
    read: true
  },
  {
    id: "6",
    type: "study",
    content: "Emily wants to connect as study buddies for Research Methods",
    sender: {
      name: "Emily",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
    },
    time: "Yesterday",
    read: true
  },
  {
    id: "7",
    type: "system",
    content: "Welcome to VImaTe! Complete your profile to get more matches.",
    time: "2d ago",
    read: true
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  
  const getTypeIcon = (type: Notification["type"]) => {
    switch (type) {
      case "match":
        return <Heart className="h-5 w-5 text-pink-500" />;
      case "message":
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case "like":
        return <Heart className="h-5 w-5 text-red-500" />;
      case "superlike":
        return <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />;
      case "event":
        return <Calendar className="h-5 w-5 text-vimate-purple" />;
      case "study":
        return <Users className="h-5 w-5 text-green-500" />;
      case "system":
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16 px-4 max-w-md mx-auto pb-20">
        <div className="flex items-center justify-between mt-4 mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              className="text-vimate-purple border-vimate-purple hover:bg-vimate-purple/10"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-lg font-medium mb-1">No notifications yet</h2>
            <p className="text-gray-500">
              When you get new matches, messages or other updates, you'll see them here.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map(notification => (
              <div 
                key={notification.id}
                className={cn(
                  "bg-white rounded-lg p-4 flex items-start shadow-sm transition-colors",
                  !notification.read && "bg-vimate-purple/5 border-l-4 border-vimate-purple"
                )}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="mr-3 mt-1">
                  {getTypeIcon(notification.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className={cn(
                      "text-gray-800",
                      !notification.read && "font-medium"
                    )}>
                      {notification.content}
                    </p>
                    
                    {!notification.read && (
                      <Badge className="bg-vimate-purple ml-2">New</Badge>
                    )}
                  </div>
                  
                  <p className="text-gray-500 text-sm mt-1">{notification.time}</p>
                  
                  {notification.sender && (
                    <div className="flex items-center mt-2">
                      <img 
                        src={notification.sender.image} 
                        alt={notification.sender.name}
                        className="w-8 h-8 rounded-full object-cover mr-2"
                      />
                      <span className="text-sm">{notification.sender.name}</span>
                    </div>
                  )}
                  
                  {(notification.type === "match" || notification.type === "like" || notification.type === "superlike") && (
                    <div className="mt-3 flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-vimate-purple border-vimate-purple hover:bg-vimate-purple/10"
                      >
                        View Profile
                      </Button>
                      
                      {notification.type === "match" && (
                        <Button
                          size="sm"
                          className="bg-vimate-purple hover:bg-vimate-purple-dark"
                        >
                          Send Message
                        </Button>
                      )}
                    </div>
                  )}
                  
                  {notification.type === "study" && (
                    <div className="mt-3 flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 border-green-600 hover:bg-green-50"
                      >
                        View Profile
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Connect
                      </Button>
                    </div>
                  )}
                  
                  {notification.type === "event" && (
                    <Button
                      size="sm"
                      className="mt-3 bg-vimate-purple hover:bg-vimate-purple-dark"
                    >
                      View Event
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Notifications;
