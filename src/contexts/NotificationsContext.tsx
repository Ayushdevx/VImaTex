import React, { createContext, useContext, useReducer, useEffect } from "react";
// Switch back to using Clerk's real useUser hook
import { useUser } from "@clerk/clerk-react";
import { toast } from "@/components/ui/use-toast";

// Notification Types
export type NotificationType = "message" | "match" | "event" | "academic" | "reminder" | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string; // ISO date string
  isRead: boolean;
  actionUrl?: string;
  sender?: {
    id: string;
    name: string;
    avatar?: string;
  };
  metadata?: Record<string, any>;
}

// State and Actions
interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

type NotificationAction =
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "REMOVE_NOTIFICATION"; payload: string }
  | { type: "MARK_AS_READ"; payload: string }
  | { type: "MARK_ALL_AS_READ" }
  | { type: "SET_NOTIFICATIONS"; payload: Notification[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

// Context Type
interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "isRead">) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

// Initial State
const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null
};

// Reducer
function notificationReducer(state: NotificationState, action: NotificationAction): NotificationState {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadCount: state.unreadCount + (action.payload.isRead ? 0 : 1)
      };
    case "REMOVE_NOTIFICATION":
      const removedNotification = state.notifications.find(n => n.id === action.payload);
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
        unreadCount: state.unreadCount - (removedNotification && !removedNotification.isRead ? 1 : 0)
      };
    case "MARK_AS_READ":
      return {
        ...state,
        notifications: state.notifications.map(n => 
          n.id === action.payload ? { ...n, isRead: true } : n
        ),
        unreadCount: state.unreadCount - (state.notifications.some(n => n.id === action.payload && !n.isRead) ? 1 : 0)
      };
    case "MARK_ALL_AS_READ":
      return {
        ...state,
        notifications: state.notifications.map(n => ({ ...n, isRead: true })),
        unreadCount: 0
      };
    case "SET_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload,
        unreadCount: action.payload.filter(n => !n.isRead).length
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

// Context
export const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

// Provider
export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);
  const { isSignedIn, user } = useUser();

  // Load notifications (simulate API call)
  useEffect(() => {
    if (isSignedIn && user) {
      // In a real app, fetch from API
      dispatch({ type: "SET_LOADING", payload: true });
      
      setTimeout(() => {
        const savedNotifications = localStorage.getItem(`vimate-notifications-${user.id}`);
        if (savedNotifications) {
          dispatch({ 
            type: "SET_NOTIFICATIONS", 
            payload: JSON.parse(savedNotifications) 
          });
        }
        dispatch({ type: "SET_LOADING", payload: false });
      }, 1000);
    }
  }, [isSignedIn, user]);

  // Save notifications to localStorage when they change
  useEffect(() => {
    if (isSignedIn && user) {
      localStorage.setItem(
        `vimate-notifications-${user.id}`, 
        JSON.stringify(state.notifications)
      );
    }
  }, [state.notifications, isSignedIn, user]);

  // Show toast for new notifications
  const showNotificationToast = (notification: Notification) => {
    toast({
      title: notification.title,
      description: notification.message,
      action: notification.actionUrl ? (
        <a href={notification.actionUrl} className="text-primary hover:underline">
          View
        </a>
      ) : undefined
    });
  };

  // Add a notification
  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "isRead">) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    
    dispatch({ type: "ADD_NOTIFICATION", payload: newNotification });
    showNotificationToast(newNotification);
    
    // Badge or sound logic can be added here
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(newNotification.title, {
        body: newNotification.message,
        icon: "/favicon.ico"
      });
    }
  };

  // Remove a notification
  const removeNotification = (id: string) => {
    dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
  };

  // Mark as read
  const markAsRead = (id: string) => {
    dispatch({ type: "MARK_AS_READ", payload: id });
  };

  // Mark all as read
  const markAllAsRead = () => {
    dispatch({ type: "MARK_ALL_AS_READ" });
  };

  // Clear notifications
  const clearNotifications = () => {
    dispatch({ type: "SET_NOTIFICATIONS", payload: [] });
  };

  const value = {
    ...state,
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

// Custom hook to use notifications
export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
};