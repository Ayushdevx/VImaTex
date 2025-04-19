import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Heart } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-50 p-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-vimate-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="h-12 w-12 text-vimate-purple" />
        </div>
        
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-vimate-purple to-vimate-orange bg-clip-text text-transparent">404</h1>
        
        <p className="text-xl text-gray-700 mb-3">No matches found here!</p>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            className="bg-vimate-purple hover:bg-vimate-purple-dark"
          >
            <Link to="/">
              <Heart className="mr-2 h-4 w-4" />
              Back to Swiping
            </Link>
          </Button>
          
          <Button
            asChild
            variant="outline"
            className="border-vimate-purple text-vimate-purple hover:bg-vimate-purple/10"
          >
            <Link to="/explore">
              <Search className="mr-2 h-4 w-4" />
              Explore Matches
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
