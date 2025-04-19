import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import {
  LayoutDashboard,
  MessagesSquare,
  Users,
  Search,
  Bell,
  BookOpen,
  Calendar,
  Map,
  Settings,
  Menu,
  X,
  LogOut,
  Coffee,
  BarChart,
  HeartPulse,
  Briefcase,
  Building,
  UserPlus,
  Clock,
  GraduationCap,
  Building2,
  CheckSquare,
  Heart,
  Bot
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useNotifications } from "@/contexts/NotificationsContext";
import { useAnalytics } from "@/contexts/AnalyticsContext";

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  end?: boolean;
  onClick?: () => void;
}

const NavItem = ({ to, label, icon, badge, end = false, onClick }: NavItemProps) => {
  const location = useLocation();
  const isActive = end 
    ? location.pathname === to 
    : location.pathname.startsWith(to);

  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
          isActive 
            ? "bg-primary text-primary-foreground" 
            : "hover:bg-muted"
        )
      }
      onClick={onClick}
      end={end}
    >
      {icon}
      <span className="flex-1">{label}</span>
      {badge ? (
        <Badge className="ml-auto" variant="secondary">
          {badge}
        </Badge>
      ) : null}
    </NavLink>
  );
};

export const MainNavigation = () => {
  const { user, isSignedIn } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { unreadCount } = useNotifications();
  const { trackEvent } = useAnalytics();
  const [isScrolled, setIsScrolled] = useState(false);

  // Listen for scroll events to add shadow to navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Track navigation interactions
  const handleNavigation = (destination: string) => {
    trackEvent("navigation", { destination });
  };

  const academicNavItems = [
    { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} />, end: true },
    { to: "/course-registration", label: "Course Registration", icon: <BookOpen size={18} /> },
    { to: "/study-tools", label: "Study Tools", icon: <GraduationCap size={18} /> },
    { to: "/study-materials", label: "Study Materials", icon: <BookOpen size={18} /> },
    { to: "/attendance-tracker", label: "Attendance", icon: <CheckSquare size={18} /> },
    { to: "/exam-results", label: "Results", icon: <GraduationCap size={18} /> },
    { to: "/timetable", label: "Timetable", icon: <Clock size={18} /> },
    { to: "/assignments", label: "Assignments", icon: <BookOpen size={18} /> },
    { to: "/academic-calendar", label: "Academic Calendar", icon: <Calendar size={18} /> },
  ];

  const campusNavItems = [
    { to: "/faculty", label: "Faculty Directory", icon: <Users size={18} /> },
    { to: "/placement-portal", label: "Placement Cell", icon: <Briefcase size={18} /> },
    { to: "/events", label: "Events", icon: <Calendar size={18} /> },
    { to: "/clubs", label: "Clubs & Societies", icon: <Users size={18} /> },
    { to: "/mess-menu", label: "Mess Menu", icon: <Coffee size={18} /> },
    { to: "/campus-map", label: "Campus Map", icon: <Map size={18} /> },
    { to: "/mental-wellness", label: "Wellness Center", icon: <HeartPulse size={18} /> },
  ];

  const housingNavItems = [
    { to: "/hostel-groups", label: "Hostel Groups", icon: <Building2 size={18} /> },
    { to: "/roommate-finder", label: "Roommate Finder", icon: <UserPlus size={18} /> },
  ];

  // Add social and dating items
  const socialNavItems = [
    { to: "/dating", label: "Dating", icon: <Heart size={18} className="text-pink-500" /> },
    { to: "/messages", label: "Messages", icon: <MessagesSquare size={18} /> },
    { to: "/notifications", label: "Notifications", icon: <Bell size={18} />, badge: unreadCount },
    { to: "/explore", label: "Explore", icon: <Search size={18} /> },
    { to: "/ai-assistant", label: "AI Assistant", icon: <Bot size={18} className="text-primary" /> },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <aside className="hidden lg:flex lg:flex-col fixed inset-y-0 z-10 w-64 border-r bg-background">
        <div className="flex flex-col h-full">
          {/* App Logo */}
          <div className="border-b sticky top-0 z-10 bg-background">
            <div className="flex h-16 items-center gap-2 px-4">
              <NavLink to="/" className="flex items-center gap-2" onClick={() => handleNavigation("home")}>
                <img src="/vimate-preview.svg" alt="VImaTe" className="h-8 w-8" />
                <span className="font-semibold text-lg">VImaTe Connect</span>
              </NavLink>
            </div>
          </div>

          {/* Nav Items */}
          <ScrollArea className="flex-1 py-4">
            <div className="px-3 space-y-6">
              <div className="space-y-1">
                <h3 className="px-3 text-xs font-medium text-muted-foreground">Academic</h3>
                {academicNavItems.map((item) => (
                  <NavItem 
                    key={item.to} 
                    to={item.to} 
                    label={item.label} 
                    icon={item.icon} 
                    end={item.end}
                    onClick={() => handleNavigation(item.label)}
                  />
                ))}
              </div>
              
              <div className="space-y-1">
                <h3 className="px-3 text-xs font-medium text-muted-foreground">Campus Life</h3>
                {campusNavItems.map((item) => (
                  <NavItem 
                    key={item.to} 
                    to={item.to} 
                    label={item.label} 
                    icon={item.icon}
                    onClick={() => handleNavigation(item.label)}
                  />
                ))}
              </div>
              
              <div className="space-y-1">
                <h3 className="px-3 text-xs font-medium text-muted-foreground">Hostel</h3>
                {housingNavItems.map((item) => (
                  <NavItem 
                    key={item.to} 
                    to={item.to} 
                    label={item.label} 
                    icon={item.icon}
                    onClick={() => handleNavigation(item.label)}
                  />
                ))}
              </div>
              
              <div className="space-y-1">
                <h3 className="px-3 text-xs font-medium text-muted-foreground">Social</h3>
                {socialNavItems.map((item) => (
                  <NavItem 
                    key={item.to} 
                    to={item.to} 
                    label={item.label} 
                    icon={item.icon}
                    badge={item.badge}
                    onClick={() => handleNavigation(item.label)}
                  />
                ))}
              </div>
            </div>
          </ScrollArea>
          
          {/* User section */}
          {isSignedIn ? (
            <div className="border-t p-4">
              <NavLink to="/profile" className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted transition-colors">
                <Avatar>
                  <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
                  <AvatarFallback>{user?.firstName?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium leading-none truncate">
                    {user?.fullName || "User"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <NavLink to="/settings">
                    <Settings size={16} />
                  </NavLink>
                </Button>
              </NavLink>
            </div>
          ) : (
            <div className="border-t p-4">
              <NavLink to="/auth/sign-in" className="flex justify-center">
                <Button>Sign In</Button>
              </NavLink>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Navigation */}
      <header className={cn(
        "sticky top-0 z-50 flex h-14 items-center border-b bg-background lg:hidden transition-shadow duration-200",
        isScrolled && "shadow-md"
      )}>
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile menu header */}
                  <div className="border-b p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src="/vimate-preview.svg" alt="VImaTe" className="h-6 w-6" />
                      <span className="font-semibold">VImaTe Connect</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                      <X size={18} />
                    </Button>
                  </div>
                  
                  {/* Mobile menu items */}
                  <ScrollArea className="flex-1">
                    <div className="p-4 space-y-6">
                      <div className="space-y-1">
                        <h3 className="text-xs font-medium text-muted-foreground mb-2">Academic</h3>
                        {academicNavItems.map((item) => (
                          <NavItem 
                            key={item.to} 
                            to={item.to} 
                            label={item.label} 
                            icon={item.icon}
                            end={item.end}
                            onClick={() => {
                              handleNavigation(item.label);
                              setIsMobileMenuOpen(false);
                            }}
                          />
                        ))}
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="text-xs font-medium text-muted-foreground mb-2">Campus Life</h3>
                        {campusNavItems.map((item) => (
                          <NavItem 
                            key={item.to} 
                            to={item.to} 
                            label={item.label} 
                            icon={item.icon}
                            onClick={() => {
                              handleNavigation(item.label);
                              setIsMobileMenuOpen(false);
                            }}
                          />
                        ))}
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="text-xs font-medium text-muted-foreground mb-2">Hostel</h3>
                        {housingNavItems.map((item) => (
                          <NavItem 
                            key={item.to} 
                            to={item.to} 
                            label={item.label} 
                            icon={item.icon}
                            onClick={() => {
                              handleNavigation(item.label);
                              setIsMobileMenuOpen(false);
                            }}
                          />
                        ))}
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="text-xs font-medium text-muted-foreground mb-2">Social</h3>
                        {socialNavItems.map((item) => (
                          <NavItem 
                            key={item.to} 
                            to={item.to} 
                            label={item.label} 
                            icon={item.icon}
                            badge={item.badge}
                            onClick={() => {
                              handleNavigation(item.label);
                              setIsMobileMenuOpen(false);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                  
                  {/* Mobile menu footer */}
                  {isSignedIn ? (
                    <div className="border-t p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar>
                          <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
                          <AvatarFallback>{user?.firstName?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                          <p className="text-sm font-medium leading-none truncate">
                            {user?.fullName || "User"}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {user?.primaryEmailAddress?.emailAddress}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button asChild variant="outline" className="flex-1">
                          <NavLink to="/settings" onClick={() => setIsMobileMenuOpen(false)}>
                            <Settings size={16} className="mr-2" />
                            Settings
                          </NavLink>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <LogOut size={16} />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-t p-4">
                      <Button asChild className="w-full">
                        <NavLink to="/auth/sign-in" onClick={() => setIsMobileMenuOpen(false)}>
                          Sign In
                        </NavLink>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            
            <NavLink to="/" className="flex items-center gap-1.5">
              <img src="/vimate-preview.svg" alt="VImaTe" className="h-6 w-6" />
              <span className="font-semibold">VImaTe</span>
            </NavLink>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <NavLink to="/notifications">
                <div className="relative">
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </div>
              </NavLink>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <NavLink to="/messages">
                <MessagesSquare size={18} />
              </NavLink>
            </Button>
            {isSignedIn ? (
              <Button variant="ghost" size="icon" asChild>
                <NavLink to="/profile">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
                    <AvatarFallback>{user?.firstName?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </NavLink>
              </Button>
            ) : (
              <Button size="sm" asChild>
                <NavLink to="/auth/sign-in">
                  Sign In
                </NavLink>
              </Button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};