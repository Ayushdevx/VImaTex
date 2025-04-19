import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Heart, MessageCircle, Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { useUser, useClerk } from "@clerk/clerk-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const location = useLocation();
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState(2);
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold bg-gradient-to-r from-vimate-purple to-vimate-purple-light bg-clip-text text-transparent">
            VImaTe
          </div>
        </Link>

        <nav className="flex items-center justify-center flex-1 h-full">
          <div className="flex items-center justify-center gap-1 md:gap-2 h-full">
            <NavItem 
              to="/" 
              icon={<Heart className={cn(
                "w-6 h-6",
                location.pathname === "/" && "text-vimate-purple fill-vimate-purple/20"
              )} />} 
              active={location.pathname === "/"} 
            />
            <NavItem 
              to="/explore" 
              icon={<Search className={cn(
                "w-6 h-6",
                location.pathname === "/explore" && "text-vimate-purple"
              )} />} 
              active={location.pathname === "/explore"} 
            />
            <NavItem 
              to="/messages" 
              icon={
                <div className="relative">
                  <MessageCircle className={cn(
                    "w-6 h-6",
                    location.pathname === "/messages" && "text-vimate-purple"
                  )} />
                  {messages > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 text-xs flex items-center justify-center rounded-full bg-vimate-orange text-white">
                      {messages}
                    </span>
                  )}
                </div>
              } 
              active={location.pathname === "/messages"} 
            />
            <NavItem 
              to="/notifications" 
              icon={
                <div className="relative">
                  <Bell className={cn(
                    "w-6 h-6",
                    location.pathname === "/notifications" && "text-vimate-purple"
                  )} />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 text-xs flex items-center justify-center rounded-full bg-vimate-orange text-white">
                      {notifications}
                    </span>
                  )}
                </div>
              } 
              active={location.pathname === "/notifications"} 
            />
            <NavItem 
              to="/profile" 
              icon={<User className={cn(
                "w-6 h-6",
                location.pathname === "/profile" && "text-vimate-purple"
              )} />} 
              active={location.pathname === "/profile"} 
            />
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full" size="icon">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
                    <AvatarFallback>{user?.firstName?.charAt(0) || user?.username?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.fullName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="text-red-500 focus:text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" className="text-vimate-purple border-vimate-purple hover:bg-vimate-purple/10" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  active: boolean;
}

const NavItem = ({ to, icon, active }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center justify-center h-full px-3 md:px-5 border-b-2 border-transparent transition-colors",
        active && "border-vimate-purple"
      )}
    >
      {icon}
    </Link>
  );
};

export default Header;
