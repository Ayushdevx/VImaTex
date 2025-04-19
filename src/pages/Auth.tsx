import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Heart } from "lucide-react";
import {
  SignIn,
  SignUp,
  useUser,
  useClerk,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoaded, isSignedIn, user } = useUser();
  const { openUserProfile } = useClerk();
  
  // Set active tab based on URL path
  const isSignUpPath = location.pathname.includes('sign-up');
  const [activeTab, setActiveTab] = useState(isSignUpPath ? "signup" : "login");

  // Redirect if already signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate("/");
    }
  }, [isLoaded, isSignedIn, navigate]);
  
  // Handle tab change to update URL
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "signup") {
      navigate("/auth/sign-up");
    } else {
      navigate("/auth/sign-in");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-vimate-purple/10 rounded-full flex items-center justify-center">
              <Heart className="h-8 w-8 text-vimate-purple animate-pulse" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-vimate-purple to-vimate-orange bg-clip-text text-transparent">
            VImaTe
          </h1>
          <p className="text-gray-600 mt-2">Connect with students from your campus</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <div className="p-6">
                <SignedOut>
                  <SignIn 
                    routing="path" 
                    path="/auth/sign-in"
                    signUpUrl="/auth/sign-up"
                    afterSignInUrl="/"
                    appearance={{
                      elements: {
                        formButtonPrimary: "bg-vimate-purple hover:bg-vimate-purple-dark",
                        footerActionLink: "text-vimate-purple hover:text-vimate-purple-dark"
                      }
                    }}
                  />
                </SignedOut>
                <SignedIn>
                  <div className="text-center">
                    <p className="text-green-600 mb-4">You are already signed in!</p>
                    <Button
                      onClick={() => navigate("/")}
                      className="w-full bg-vimate-purple hover:bg-vimate-purple-dark mb-3"
                    >
                      Go to home
                    </Button>
                    <Button
                      onClick={() => openUserProfile()}
                      variant="outline"
                      className="w-full"
                    >
                      Manage your account
                    </Button>
                  </div>
                </SignedIn>
              </div>
            </TabsContent>
            
            <TabsContent value="signup">
              <div className="p-6">
                <SignedOut>
                  <SignUp 
                    routing="path" 
                    path="/auth/sign-up"
                    signInUrl="/auth/sign-in"
                    afterSignUpUrl="/"
                    appearance={{
                      elements: {
                        formButtonPrimary: "bg-vimate-purple hover:bg-vimate-purple-dark",
                        footerActionLink: "text-vimate-purple hover:text-vimate-purple-dark"
                      }
                    }}
                  />
                </SignedOut>
                <SignedIn>
                  <div className="text-center">
                    <p className="text-green-600 mb-4">You are already signed in!</p>
                    <Button
                      onClick={() => navigate("/")}
                      className="w-full bg-vimate-purple hover:bg-vimate-purple-dark mb-3"
                    >
                      Go to home
                    </Button>
                    <Button
                      onClick={() => openUserProfile()}
                      variant="outline"
                      className="w-full"
                    >
                      Manage your account
                    </Button>
                  </div>
                </SignedIn>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
