import { ReactNode } from "react";
import { MainNavigation } from "./MainNavigation";
import { Footer } from "./Footer";
import { cn } from "@/lib/utils";
import { useAnalytics } from "@/contexts/AnalyticsContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  hideNavigation?: boolean;
  fullWidth?: boolean;
  className?: string;
  hideFooter?: boolean;
}

export const Layout = ({ 
  children, 
  hideNavigation = false,
  fullWidth = false,
  className,
  hideFooter = false
}: LayoutProps) => {
  const { trackPageView } = useAnalytics();
  const location = useLocation();
  
  // Track page views for analytics
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname, trackPageView]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {!hideNavigation && <MainNavigation />}
      
      <main 
        className={cn(
          "flex-1",
          !hideNavigation && "lg:pl-64", // Add padding when navigation is visible
          className
        )}
      >
        {children}
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;