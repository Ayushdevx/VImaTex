import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

type EventType = 
  | "page_view" 
  | "feature_use" 
  | "button_click" 
  | "form_submission" 
  | "error" 
  | "search" 
  | "login" 
  | "logout" 
  | "signup" 
  | "content_view"
  | "navigation";

interface AnalyticsEvent {
  timestamp: string;
  eventType: EventType;
  path: string;
  userId?: string;
  sessionId: string;
  metadata?: Record<string, any>;
}

interface AnalyticsContextType {
  trackEvent: (eventType: EventType, metadata?: Record<string, any>) => void;
  trackPageView: (path: string) => void;
  pageViews: Record<string, number>;
  featureUsage: Record<string, number>;
  sessionDuration: number;
  analyticsEnabled: boolean;
  toggleAnalytics: () => void;
}

// Create context
export const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

// Provider
export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSignedIn, user } = useUser();
  const location = useLocation();
  const [sessionId] = useState<string>(`session-${Date.now()}`);
  const [sessionStart] = useState<number>(Date.now());
  const [pageViews, setPageViews] = useState<Record<string, number>>({});
  const [featureUsage, setFeatureUsage] = useState<Record<string, number>>({});
  const [sessionDuration, setSessionDuration] = useState<number>(0);
  const [analyticsEnabled, setAnalyticsEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem("vimate-analytics-enabled");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);

  // Update session duration
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionDuration(Math.floor((Date.now() - sessionStart) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [sessionStart]);

  // Track page views
  useEffect(() => {
    if (analyticsEnabled) {
      const path = location.pathname;
      
      // Update page views count
      setPageViews(prev => ({
        ...prev,
        [path]: (prev[path] || 0) + 1
      }));
      
      // Log page view event
      trackEvent("page_view", { path });
    }
  }, [location.pathname, analyticsEnabled]);

  // Save analytics preference
  useEffect(() => {
    localStorage.setItem("vimate-analytics-enabled", JSON.stringify(analyticsEnabled));
  }, [analyticsEnabled]);

  // Log events and send to backend/localStorage
  const trackEvent = (eventType: EventType, metadata?: Record<string, any>) => {
    if (!analyticsEnabled) return;
    
    const event: AnalyticsEvent = {
      timestamp: new Date().toISOString(),
      eventType,
      path: location.pathname,
      userId: isSignedIn && user ? user.id : undefined,
      sessionId,
      metadata
    };
    
    // Update feature usage if it's a feature_use event
    if (eventType === "feature_use" && metadata?.featureName) {
      setFeatureUsage(prev => ({
        ...prev,
        [metadata.featureName]: (prev[metadata.featureName] || 0) + 1
      }));
    }
    
    // Add to local events array
    setEvents(prev => [...prev, event]);
    
    // In a real app, you would send this to your analytics backend
    console.log(`Analytics event: ${eventType}`, event);
    
    // Store in localStorage for demonstration purposes
    try {
      const storedEvents = localStorage.getItem("vimate-analytics-events");
      const parsedEvents = storedEvents ? JSON.parse(storedEvents) : [];
      localStorage.setItem(
        "vimate-analytics-events", 
        JSON.stringify([...parsedEvents, event])
      );
    } catch (err) {
      console.error("Failed to store analytics event", err);
    }
  };

  // Add the trackPageView function that's being called in the Layout component
  const trackPageView = (path: string) => {
    trackEvent("page_view", { path });
  };

  // Toggle analytics
  const toggleAnalytics = () => {
    setAnalyticsEnabled(prev => !prev);
  };

  const value = {
    trackEvent,
    trackPageView,
    pageViews,
    featureUsage,
    sessionDuration,
    analyticsEnabled,
    toggleAnalytics
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

// Custom hook to use analytics
export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
};