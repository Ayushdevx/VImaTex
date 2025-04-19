import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Edit2, 
  Briefcase, 
  School, 
  MapPin, 
  Calendar, 
  BookOpen,
  Plus,
  X,
  Save,
  LogOut,
  Loader2
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { useUser, useClerk } from "@clerk/clerk-react";

// Fallback profile if Clerk user data is not available
const defaultProfile = {
  name: "VIT Student",
  age: 21,
  images: [
    "https://placehold.co/400x400?text=Profile+Photo"
  ],
  bio: "VIT Vellore student interested in technology and innovation.",
  college: "VIT Vellore",
  major: "Computer Science & Engineering",
  year: "Junior",
  interests: ["Technology", "Coding", "Innovation", "Engineering"],
  location: "Vellore, Tamil Nadu, India",
  studyInterests: ["Algorithms", "AI & ML", "Web Development"]
};

const Profile = () => {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(defaultProfile);
  const [newInterest, setNewInterest] = useState("");
  const [loading, setLoading] = useState(true);

  // Load user data from Clerk when component mounts
  useEffect(() => {
    if (isLoaded) {
      setLoading(false);
      
      if (isSignedIn && user) {
        // Extract user data from Clerk
        const userData = {
          ...defaultProfile,
          name: user.fullName || defaultProfile.name,
          images: [
            user.imageUrl || defaultProfile.images[0]
          ],
          // Use email as a fallback if username is not available
          bio: user.username 
            ? `${user.username} - ${defaultProfile.bio}`
            : defaultProfile.bio,
          // Use primaryEmailAddress if available
          email: user.primaryEmailAddress?.emailAddress || ""
        };
        
        setProfile(userData);
      }
    }
  }, [isLoaded, isSignedIn, user]);

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "There was an issue logging you out. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !profile.interests.includes(newInterest.trim())) {
      setProfile({
        ...profile,
        interests: [...profile.interests, newInterest.trim()]
      });
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setProfile({
      ...profile,
      interests: profile.interests.filter(i => i !== interest)
    });
  };

  const handleSaveProfile = () => {
    setEditing(false);
    toast({
      title: "Profile saved",
      description: "Your profile has been updated successfully",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-vimate-purple" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="pt-16 px-4 max-w-md mx-auto">
        <div className="flex justify-between items-center mt-4 mb-6">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <div className="space-x-2">
            {editing ? (
              <Button 
                onClick={handleSaveProfile}
                className="bg-vimate-purple hover:bg-vimate-purple-dark"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => setEditing(true)}
                className="border-vimate-purple text-vimate-purple hover:bg-vimate-purple/10"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
        </div>
        
        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-0">
            {/* Photos */}
            <div className="mb-6">
              <div className="grid grid-cols-3 gap-2">
                {profile.images.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Profile ${index+1}`} 
                      className="w-full h-full object-cover"
                    />
                    {editing && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="text-white">
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                {editing && profile.images.length < 6 && (
                  <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center">
                      <Camera className="h-6 w-6 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-500">Add Photo</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Basic Info */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              {editing ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        value={profile.name} 
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input 
                        id="age" 
                        type="number" 
                        value={profile.age} 
                        onChange={(e) => setProfile({...profile, age: parseInt(e.target.value) || 18})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">About me</Label>
                    <Textarea 
                      id="bio" 
                      value={profile.bio} 
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      className="resize-none"
                      rows={4}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-semibold mb-1">{profile.name}, {profile.age}</h2>
                  <p className="text-gray-700 mb-4">{profile.bio}</p>
                </div>
              )}
            </div>
            
            {/* Actions */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <h3 className="font-medium mb-3 text-gray-600">Account Actions</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-500 border-red-200 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/create-profile")}
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Full Profile
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <h3 className="font-medium mb-3 text-gray-600">Notification Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications-chat" className="cursor-pointer">Chat messages</Label>
                  <Switch id="notifications-chat" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications-matches" className="cursor-pointer">New matches</Label>
                  <Switch id="notifications-matches" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications-events" className="cursor-pointer">Campus events</Label>
                  <Switch id="notifications-events" defaultChecked />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <h3 className="font-medium mb-3 text-gray-600">Privacy Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="privacy-profile" className="cursor-pointer">Show my profile to everyone on campus</Label>
                  <Switch id="privacy-profile" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="privacy-location" className="cursor-pointer">Show my location</Label>
                  <Switch id="privacy-location" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="privacy-activity" className="cursor-pointer">Show my online status</Label>
                  <Switch id="privacy-activity" defaultChecked />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <h3 className="font-medium mb-3 text-red-600">Danger Zone</h3>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-500 border-red-200 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-500 border-red-200 hover:bg-red-50"
                >
                  <X className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
