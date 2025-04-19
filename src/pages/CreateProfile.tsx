
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Camera,
  Plus,
  X,
  ChevronRight,
  ChevronLeft,
  Calendar,
  School,
  BookOpen,
  User,
  Star,
} from "lucide-react";

// Example interests for suggestions
const interestSuggestions = [
  "Photography", "Hiking", "Reading", "Music", "Movies", 
  "Cooking", "Travel", "Art", "Sports", "Gaming", 
  "Fashion", "Dancing", "Writing", "Yoga", "Technology",
  "Volunteering", "Coffee", "Wine", "History", "Science",
  "Nature", "Politics", "Philosophy", "Psychology", "Theater"
];

const CreateProfile = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  
  // Profile state
  const [images, setImages] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(18);
  const [bio, setBio] = useState("");
  const [college, setCollege] = useState("");
  const [major, setMajor] = useState("");
  const [year, setYear] = useState<string>("");
  const [interests, setInterests] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState("");
  
  const getProgressPercentage = () => {
    return (step / totalSteps) * 100;
  };
  
  const handleAddImage = () => {
    // In a real app, this would open a file picker
    // For now we'll add a sample image
    if (images.length < 6) {
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const newImage = `https://source.unsplash.com/random/300x400?portrait&sig=${randomId}`;
      setImages([...images, newImage]);
      
      toast({
        title: "Image added",
        description: `${images.length + 1}/6 images uploaded`,
      });
    }
  };
  
  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  const handleAddInterest = () => {
    if (newInterest && !interests.includes(newInterest) && interests.length < 10) {
      setInterests([...interests, newInterest]);
      setNewInterest("");
    }
  };
  
  const handleAddSuggestedInterest = (interest: string) => {
    if (!interests.includes(interest) && interests.length < 10) {
      setInterests([...interests, interest]);
    }
  };
  
  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };
  
  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Complete profile creation
      toast({
        title: "Profile created!",
        description: "Your profile has been created successfully.",
      });
      navigate("/");
    }
  };
  
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const isNextDisabled = () => {
    switch (step) {
      case 1:
        return images.length === 0;
      case 2:
        return !name || !age || age < 18;
      case 3:
        return !college || !major || !year;
      case 4:
        return interests.length < 3;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create Your Profile</h1>
          <p className="text-gray-600">Let's set up your profile to help you find perfect matches</p>
        </div>
        
        <div className="mb-6">
          <Progress value={getProgressPercentage()} className="h-2 bg-gray-200" />
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(getProgressPercentage())}% Complete</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 animate-fade-in">
          {/* Step 1: Photos */}
          {step === 1 && (
            <div>
              <div className="flex items-center mb-4">
                <Camera className="mr-2 h-5 w-5 text-vimate-purple" />
                <h2 className="text-xl font-semibold">Add Your Photos</h2>
              </div>
              
              <p className="text-gray-600 mb-4">
                Add at least one photo to create your profile. You can add up to 6 photos.
              </p>
              
              <div className="grid grid-cols-3 gap-3 mb-4">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Profile ${index+1}`} 
                      className="w-full h-full object-cover"
                    />
                    <button 
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                {images.length < 6 && (
                  <button 
                    onClick={handleAddImage} 
                    className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-center">
                      <Plus className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                      <span className="text-sm text-gray-500">Add Photo</span>
                    </div>
                  </button>
                )}
              </div>
              
              <div className="text-sm text-gray-500 mb-4">
                <p>Tips:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Clear face photos help you get more matches</li>
                  <li>Add photos of your hobbies and interests</li>
                  <li>Group photos are great too, but make sure we can identify you</li>
                </ul>
              </div>
            </div>
          )}
          
          {/* Step 2: Basic Info */}
          {step === 2 && (
            <div>
              <div className="flex items-center mb-4">
                <User className="mr-2 h-5 w-5 text-vimate-purple" />
                <h2 className="text-xl font-semibold">Basic Information</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    id="age" 
                    type="number" 
                    min={18}
                    max={99}
                    value={age} 
                    onChange={(e) => setAge(parseInt(e.target.value) || 18)}
                  />
                  <p className="text-xs text-gray-500 mt-1">You must be at least 18 years old</p>
                </div>
                
                <div>
                  <Label htmlFor="bio">About Me</Label>
                  <Textarea 
                    id="bio" 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Share a bit about yourself, your interests, and what you're looking for"
                    className="resize-none"
                    rows={4}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{bio.length} characters</span>
                    <span>Recommended: 100-300 characters</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Education */}
          {step === 3 && (
            <div>
              <div className="flex items-center mb-4">
                <School className="mr-2 h-5 w-5 text-vimate-purple" />
                <h2 className="text-xl font-semibold">Education</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="college">College/University</Label>
                  <Input 
                    id="college" 
                    value={college} 
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="Your college or university"
                  />
                </div>
                
                <div>
                  <Label htmlFor="major">Major/Field of Study</Label>
                  <Input 
                    id="major" 
                    value={major} 
                    onChange={(e) => setMajor(e.target.value)}
                    placeholder="Your major"
                  />
                </div>
                
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Select value={year} onValueChange={setYear}>
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Freshman">Freshman</SelectItem>
                      <SelectItem value="Sophomore">Sophomore</SelectItem>
                      <SelectItem value="Junior">Junior</SelectItem>
                      <SelectItem value="Senior">Senior</SelectItem>
                      <SelectItem value="Graduate">Graduate Student</SelectItem>
                      <SelectItem value="Alumni">Alumni</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 4: Interests */}
          {step === 4 && (
            <div>
              <div className="flex items-center mb-4">
                <Star className="mr-2 h-5 w-5 text-vimate-purple" />
                <h2 className="text-xl font-semibold">Interests</h2>
              </div>
              
              <p className="text-gray-600 mb-4">
                Add at least 3 interests to help you match with people who share your passions.
              </p>
              
              <div className="mb-4">
                <Label htmlFor="interests">Your Interests ({interests.length}/10)</Label>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {interests.map((interest, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-vimate-purple/10 text-vimate-purple pr-1 py-1.5"
                    >
                      {interest}
                      <button 
                        className="ml-1 hover:bg-vimate-purple/20 rounded-full p-0.5"
                        onClick={() => handleRemoveInterest(interest)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 mb-4">
                <Input 
                  id="new-interest" 
                  value={newInterest} 
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Add an interest"
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddInterest();
                    }
                  }}
                  disabled={interests.length >= 10}
                />
                <Button 
                  onClick={handleAddInterest}
                  disabled={!newInterest || interests.length >= 10}
                  className="bg-vimate-purple hover:bg-vimate-purple-dark"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div>
                <Label className="mb-2 block">Suggestions</Label>
                <div className="flex flex-wrap gap-2">
                  {interestSuggestions
                    .filter(interest => !interests.includes(interest))
                    .slice(0, 12)
                    .map((interest, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-vimate-purple/10 hover:text-vimate-purple transition-colors"
                        onClick={() => handleAddSuggestedInterest(interest)}
                      >
                        {interest}
                      </Badge>
                    ))
                  }
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            disabled={step === 1}
            className="border-vimate-purple text-vimate-purple hover:bg-vimate-purple/10"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
          
          <Button
            onClick={handleNextStep}
            disabled={isNextDisabled()}
            className="bg-vimate-purple hover:bg-vimate-purple-dark"
          >
            {step === totalSteps ? "Complete" : "Next"}
            {step !== totalSteps && <ChevronRight className="ml-1 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
