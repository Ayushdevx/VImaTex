import { useState } from "react";
import { Award, Calendar, MapPin, Users, Clock, ExternalLink, ChevronRight, Filter, Tag, Search, Star } from "lucide-react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type Platform = 'devfolio' | 'mlh' | 'unstop' | 'hackerearth' | 'internal';

type Hackathon = {
  id: string;
  title: string;
  organizer: string;
  organizerLogo: string;
  date: string;
  location: string;
  mode: 'in-person' | 'virtual' | 'hybrid';
  prize: string;
  teamSize: string;
  registered: boolean;
  interested: number;
  tags: string[];
  sponsoredByCollege: boolean;
  deadline: string;
  timeLeft: string;
  platform?: Platform;
  platformUrl?: string;
};

const hackathons: Hackathon[] = [
  {
    id: '1',
    title: 'TechFest Hackathon 2025',
    organizer: 'TechFest',
    organizerLogo: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: 'May 15-17, 2025',
    location: 'University Main Campus',
    mode: 'in-person',
    prize: '$5,000',
    teamSize: '2-4',
    registered: false,
    interested: 245,
    tags: ['AI/ML', 'Web Development', 'Blockchain'],
    sponsoredByCollege: true,
    deadline: 'April 30, 2025',
    timeLeft: '12 days left',
    platform: 'internal'
  },
  {
    id: '2',
    title: 'CodeJam Virtual 2025',
    organizer: 'Google',
    organizerLogo: 'https://randomuser.me/api/portraits/men/22.jpg',
    date: 'June 10-12, 2025',
    location: 'Online',
    mode: 'virtual',
    prize: '$10,000',
    teamSize: '1-3',
    registered: false,
    interested: 478,
    tags: ['Algorithms', 'Competitive Coding', 'Problem Solving'],
    sponsoredByCollege: false,
    deadline: 'May 25, 2025',
    timeLeft: '37 days left',
    platform: 'hackerearth',
    platformUrl: 'https://hackerearth.com/challenges/'
  },
  {
    id: '3',
    title: 'Sustainability Hackathon',
    organizer: 'Green Tech',
    organizerLogo: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: 'April 28-29, 2025',
    location: 'Engineering Building',
    mode: 'in-person',
    prize: '$3,000',
    teamSize: '3-5',
    registered: false,
    interested: 156,
    tags: ['Clean Energy', 'IoT', 'Sustainable Solutions'],
    sponsoredByCollege: true,
    deadline: 'April 20, 2025',
    timeLeft: '2 days left',
    platform: 'devfolio',
    platformUrl: 'https://devfolio.co/hackathons/'
  },
  {
    id: '4',
    title: 'Health Tech Innovation',
    organizer: 'MedTech Association',
    organizerLogo: 'https://randomuser.me/api/portraits/women/17.jpg',
    date: 'July 5-7, 2025',
    location: 'Medical Sciences Hall & Online',
    mode: 'hybrid',
    prize: '$7,500',
    teamSize: '2-4',
    registered: false,
    interested: 189,
    tags: ['Healthcare', 'Mobile Apps', 'AI'],
    sponsoredByCollege: false,
    deadline: 'June 20, 2025',
    timeLeft: '63 days left',
    platform: 'mlh',
    platformUrl: 'https://mlh.io/seasons/2024/events'
  },
  {
    id: '5',
    title: 'Fintech Challenge',
    organizer: 'Banking Partners',
    organizerLogo: 'https://randomuser.me/api/portraits/men/67.jpg',
    date: 'May 25-26, 2025',
    location: 'Business School',
    mode: 'in-person',
    prize: '$4,000',
    teamSize: '2-3',
    registered: false,
    interested: 132,
    tags: ['Finance', 'Blockchain', 'Security'],
    sponsoredByCollege: true,
    deadline: 'May 10, 2025',
    timeLeft: '22 days left',
    platform: 'unstop',
    platformUrl: 'https://unstop.com/hackathons'
  },
  {
    id: '6',
    title: 'DevFolio Buildathon',
    organizer: 'DevFolio',
    organizerLogo: 'https://randomuser.me/api/portraits/men/45.jpg',
    date: 'August 10-12, 2025',
    location: 'Online',
    mode: 'virtual',
    prize: '$8,000',
    teamSize: '2-4',
    registered: false,
    interested: 342,
    tags: ['Web3', 'DeFi', 'Open Source'],
    sponsoredByCollege: false,
    deadline: 'July 25, 2025',
    timeLeft: '98 days left',
    platform: 'devfolio',
    platformUrl: 'https://devfolio.co/hackathons/'
  }
];

type Skill = {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'design' | 'ml' | 'blockchain' | 'mobile';
};

const skills: Skill[] = [
  { id: 's1', name: 'React', category: 'frontend' },
  { id: 's2', name: 'Angular', category: 'frontend' },
  { id: 's3', name: 'Vue', category: 'frontend' },
  { id: 's4', name: 'Node.js', category: 'backend' },
  { id: 's5', name: 'Python', category: 'backend' },
  { id: 's6', name: 'Java', category: 'backend' },
  { id: 's7', name: 'UI/UX', category: 'design' },
  { id: 's8', name: 'Figma', category: 'design' },
  { id: 's9', name: 'TensorFlow', category: 'ml' },
  { id: 's10', name: 'PyTorch', category: 'ml' },
  { id: 's11', name: 'Solidity', category: 'blockchain' },
  { id: 's12', name: 'Web3.js', category: 'blockchain' },
  { id: 's13', name: 'Flutter', category: 'mobile' },
  { id: 's14', name: 'React Native', category: 'mobile' },
];

type TeamRequest = {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  hackathonId: string;
  hackathonTitle: string;
  skills: string[];
  description: string;
  lookingFor: string[];
  createdAt: string;
};

const PartnerFindingTab = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [lookingForSkills, setLookingForSkills] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [selectedHackathonId, setSelectedHackathonId] = useState('');
  const [teamRequests, setTeamRequests] = useState<TeamRequest[]>([
    {
      id: 'tr1',
      userId: 'u1',
      userName: 'Alex Johnson',
      userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      hackathonId: '3',
      hackathonTitle: 'Sustainability Hackathon',
      skills: ['React', 'Node.js', 'UI/UX'],
      description: 'Looking for team members who are passionate about sustainable tech solutions. I have experience with frontend and some backend.',
      lookingFor: ['Python', 'TensorFlow', 'Flutter'],
      createdAt: '2 days ago'
    },
    {
      id: 'tr2',
      userId: 'u2',
      userName: 'Sophia Chen',
      userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      hackathonId: '2',
      hackathonTitle: 'CodeJam Virtual 2025',
      skills: ['Python', 'TensorFlow', 'PyTorch'],
      description: 'ML engineer looking for teammates with frontend and design experience. I specialize in computer vision and NLP.',
      lookingFor: ['React', 'UI/UX', 'Node.js'],
      createdAt: '5 days ago'
    },
    {
      id: 'tr3',
      userId: 'u3',
      userName: 'Mike Rivera',
      userAvatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      hackathonId: '6',
      hackathonTitle: 'DevFolio Buildathon',
      skills: ['Solidity', 'Web3.js', 'Node.js'],
      description: 'Blockchain developer interested in DeFi projects. Looking for frontend devs and designers to complete the team.',
      lookingFor: ['React', 'UI/UX', 'Figma'],
      createdAt: '1 day ago'
    }
  ]);

  const handleCreateTeamRequest = () => {
    if (!selectedHackathonId || selectedSkills.length === 0 || lookingForSkills.length === 0) {
      toast({
        title: "Missing information",
        description: "Please select a hackathon, your skills, and what you're looking for",
        variant: "destructive"
      });
      return;
    }

    const hackathon = hackathons.find(h => h.id === selectedHackathonId);
    if (!hackathon) return;

    const newTeamRequest: TeamRequest = {
      id: `tr${Date.now()}`,
      userId: 'current-user',
      userName: 'You',
      userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      hackathonId: selectedHackathonId,
      hackathonTitle: hackathon.title,
      skills: selectedSkills,
      description: description || `Looking for teammates for ${hackathon.title}`,
      lookingFor: lookingForSkills,
      createdAt: 'Just now'
    };

    setTeamRequests([newTeamRequest, ...teamRequests]);
    
    // Reset form
    setSelectedHackathonId('');
    setSelectedSkills([]);
    setLookingForSkills([]);
    setDescription('');
    
    toast({
      title: "Team request posted!",
      description: "Your request for teammates has been posted successfully",
    });
  };

  const filteredRequests = teamRequests.filter(request => {
    // If a hackathon is selected, filter by that
    if (selectedHackathonId && request.hackathonId !== selectedHackathonId) {
      return false;
    }
    
    // If skills are selected, check if there's any overlap with what the person is looking for
    if (selectedSkills.length > 0 && !selectedSkills.some(skill => request.lookingFor.includes(skill))) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card className="sticky top-20">
          <CardHeader>
            <CardTitle>Find Team Members</CardTitle>
            <CardDescription>Post a request or find teammates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="hackathon">Hackathon</Label>
              <Select value={selectedHackathonId} onValueChange={setSelectedHackathonId}>
                <SelectTrigger id="hackathon">
                  <SelectValue placeholder="Select a hackathon" />
                </SelectTrigger>
                <SelectContent>
                  {hackathons.map(hackathon => (
                    <SelectItem key={hackathon.id} value={hackathon.id}>
                      {hackathon.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Your Skills</Label>
              <div className="flex flex-wrap gap-2 mt-2 p-2 border rounded-md">
                {skills.map(skill => (
                  <Badge 
                    key={skill.id} 
                    variant={selectedSkills.includes(skill.name) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      if (selectedSkills.includes(skill.name)) {
                        setSelectedSkills(selectedSkills.filter(s => s !== skill.name));
                      } else {
                        setSelectedSkills([...selectedSkills, skill.name]);
                      }
                    }}
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <Label>Looking For</Label>
              <div className="flex flex-wrap gap-2 mt-2 p-2 border rounded-md">
                {skills.map(skill => (
                  <Badge 
                    key={skill.id} 
                    variant={lookingForSkills.includes(skill.name) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      if (lookingForSkills.includes(skill.name)) {
                        setLookingForSkills(lookingForSkills.filter(s => s !== skill.name));
                      } else {
                        setLookingForSkills([...lookingForSkills, skill.name]);
                      }
                    }}
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <textarea 
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full h-24 p-2 border rounded-md resize-none"
                placeholder="Describe what you're looking for in teammates"
              />
            </div>
            
            <Button className="w-full" onClick={handleCreateTeamRequest}>
              Post Team Request
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Team Requests</CardTitle>
            <CardDescription>
              {filteredRequests.length} people looking for teammates
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredRequests.length > 0 ? (
              <div className="space-y-4">
                {filteredRequests.map(request => (
                  <Card key={request.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={request.userAvatar} />
                            <AvatarFallback>{request.userName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{request.userName}</CardTitle>
                            <CardDescription className="text-sm">
                              For: {request.hackathonTitle}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline">{request.createdAt}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm mb-3">{request.description}</p>
                      
                      <div className="space-y-2">
                        <div>
                          <Label className="text-xs text-muted-foreground">Skills</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {request.skills.map(skill => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <Label className="text-xs text-muted-foreground">Looking For</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {request.lookingFor.map(skill => (
                              <Badge key={skill} className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        Contact
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No team requests found. Create one to get started!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const platformInfo = {
  'devfolio': {
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    name: 'Devfolio',
    icon: '🚀'
  },
  'mlh': {
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    name: 'Major League Hacking',
    icon: '🏆'
  },
  'unstop': {
    color: 'bg-teal-100 text-teal-800 border-teal-200',
    name: 'Unstop',
    icon: '🔶'
  },
  'hackerearth': {
    color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    name: 'HackerEarth',
    icon: '🌐'
  },
  'internal': {
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    name: 'University Hosted',
    icon: '🏫'
  }
};

const renderPlatformBadge = (platform?: Platform) => {
  if (!platform) return null;
  
  const info = platformInfo[platform];
  return (
    <Badge variant="outline" className={`${info.color} text-xs`}>
      {info.icon} {info.name}
    </Badge>
  );
};

const renderRegisterButton = (hackathon: Hackathon, handleRegister: (h: Hackathon) => void) => {
  const isRegistered = registeredHackathons.includes(hackathon.id);
  
  if (hackathon.platform && hackathon.platform !== 'internal' && hackathon.platformUrl) {
    return (
      <a href={hackathon.platformUrl} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" className="w-full flex items-center gap-2">
          <ExternalLink className="h-4 w-4" />
          Register on {platformInfo[hackathon.platform].name}
        </Button>
      </a>
    );
  }
  
  return (
    <Button 
      variant={isRegistered ? "destructive" : "default"}
      className="w-full"
      onClick={() => handleRegister(hackathon)}
    >
      {isRegistered ? "Cancel Registration" : "Register Now"}
    </Button>
  );
};

const Hackathons = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mode, setMode] = useState<string>("");
  const [teamSize, setTeamSize] = useState<string>("");
  const [collegeSponsored, setCollegeSponsored] = useState(false);
  const [registeredHackathons, setRegisteredHackathons] = useState<string[]>([]);
  const [savedHackathons, setSavedHackathons] = useState<string[]>([]);
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null);
  const [teamMembers, setTeamMembers] = useState<string[]>(['']);
  
  // Filter hackathons
  const filteredHackathons = hackathons.filter(hackathon => {
    return (
      (!searchQuery || 
        hackathon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hackathon.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) &&
      (!mode || hackathon.mode === mode) &&
      (!teamSize || hackathon.teamSize.includes(teamSize)) &&
      (!collegeSponsored || hackathon.sponsoredByCollege)
    );
  });

  const handleRegister = (hackathon: Hackathon) => {
    if (registeredHackathons.includes(hackathon.id)) {
      // Unregister
      setRegisteredHackathons(registeredHackathons.filter(id => id !== hackathon.id));
      toast({
        title: "Registration cancelled",
        description: `You have cancelled your registration for ${hackathon.title}`,
      });
    } else {
      // Register
      setSelectedHackathon(hackathon);
    }
  };

  const confirmRegistration = () => {
    if (!selectedHackathon) return;
    
    // Validate team members if needed
    if (teamMembers.some(member => !member.trim())) {
      toast({
        title: "Invalid team members",
        description: "Please fill in all team member names or remove empty fields",
        variant: "destructive"
      });
      return;
    }
    
    setRegisteredHackathons([...registeredHackathons, selectedHackathon.id]);
    setSelectedHackathon(null);
    setTeamMembers(['']);
    
    toast({
      title: "Registration successful!",
      description: "You have successfully registered for the hackathon",
    });
  };

  const toggleSaveHackathon = (id: string) => {
    if (savedHackathons.includes(id)) {
      setSavedHackathons(savedHackathons.filter(hackId => hackId !== id));
    } else {
      setSavedHackathons([...savedHackathons, id]);
    }
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, '']);
  };

  const removeTeamMember = (index: number) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers.splice(index, 1);
    setTeamMembers(newTeamMembers);
  };

  const updateTeamMember = (index: number, value: string) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index] = value;
    setTeamMembers(newTeamMembers);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16 pb-8 px-4 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center mb-8"
        >
          <div className="bg-vimate-purple/10 p-3 rounded-full mr-3">
            <Award className="h-6 w-6 text-vimate-purple" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-vimate-purple to-vimate-orange bg-clip-text text-transparent">
            Hackathons & Coding Challenges
          </h1>
        </motion.div>
        
        <Tabs defaultValue="upcoming" className="w-full mb-12">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="upcoming">Upcoming Hackathons</TabsTrigger>
            <TabsTrigger value="registered">My Hackathons</TabsTrigger>
            <TabsTrigger value="partners">Find Partners</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle className="text-lg">Filters</CardTitle>
                    <CardDescription>Find the perfect hackathon</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Search</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          placeholder="Search by name or tag..." 
                          className="pl-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Mode</Label>
                      <Select value={mode} onValueChange={setMode}>
                        <SelectTrigger>
                          <SelectValue placeholder="All modes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All modes</SelectItem>
                          <SelectItem value="in-person">In Person</SelectItem>
                          <SelectItem value="virtual">Virtual</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Team Size</Label>
                      <Select value={teamSize} onValueChange={setTeamSize}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any size</SelectItem>
                          <SelectItem value="1">Solo allowed</SelectItem>
                          <SelectItem value="2">2+ members</SelectItem>
                          <SelectItem value="3">3+ members</SelectItem>
                          <SelectItem value="4">4+ members</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="college-sponsored" 
                        checked={collegeSponsored}
                        onCheckedChange={(checked) => setCollegeSponsored(checked as boolean)}
                      />
                      <Label htmlFor="college-sponsored">College sponsored only</Label>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        setSearchQuery("");
                        setMode("");
                        setTeamSize("");
                        setCollegeSponsored(false);
                      }}
                    >
                      Reset Filters
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-3">
                <motion.div 
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="space-y-4"
                >
                  {filteredHackathons.length > 0 ? (
                    filteredHackathons.map((hackathon) => (
                      <motion.div key={hackathon.id} variants={item}>
                        <Card className="overflow-hidden hover:shadow-md transition-shadow">
                          <div className={`h-1 ${hackathon.sponsoredByCollege ? 'bg-vimate-purple' : 'bg-gray-200'}`}></div>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">
                                  {hackathon.title}
                                  {hackathon.sponsoredByCollege && (
                                    <Badge className="ml-2 bg-vimate-purple/20 text-vimate-purple text-xs">
                                      College Sponsored
                                    </Badge>
                                  )}
                                </CardTitle>
                                <CardDescription className="flex items-center">
                                  <Avatar className="h-5 w-5 mr-1">
                                    <AvatarImage src={hackathon.organizerLogo} alt={hackathon.organizer} />
                                    <AvatarFallback>{hackathon.organizer[0]}</AvatarFallback>
                                  </Avatar>
                                  {hackathon.organizer}
                                </CardDescription>
                              </div>
                              <Badge className={modeColors[hackathon.mode]}>
                                {hackathon.mode.charAt(0).toUpperCase() + hackathon.mode.slice(1)}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                              <div className="flex items-center text-sm text-slate-600">
                                <Calendar className="h-4 w-4 mr-1.5 text-slate-400" />
                                {hackathon.date}
                              </div>
                              <div className="flex items-center text-sm text-slate-600">
                                <MapPin className="h-4 w-4 mr-1.5 text-slate-400" />
                                {hackathon.location}
                              </div>
                              <div className="flex items-center text-sm text-slate-600">
                                <Users className="h-4 w-4 mr-1.5 text-slate-400" />
                                Team: {hackathon.teamSize}
                              </div>
                              <div className="flex items-center text-sm text-slate-600">
                                <Award className="h-4 w-4 mr-1.5 text-slate-400" />
                                Prize: {hackathon.prize}
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex flex-wrap items-center gap-1.5">
                                {hackathon.tags.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs px-2 py-0">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center text-xs text-slate-500">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                <span className="font-medium">{hackathon.timeLeft}</span>
                              </div>
                            </div>
                            
                            <div className="rounded-md border border-amber-200 bg-amber-50 p-2 flex items-center text-xs text-amber-800">
                              <Clock className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                              Registration deadline: {hackathon.deadline}
                            </div>
                          </CardContent>
                          <CardFooter className="grid grid-cols-2 gap-2">
                            <Button
                              variant="outline"
                              className={`
                                ${savedHackathons.includes(hackathon.id)
                                  ? "bg-vimate-purple/10 text-vimate-purple border-vimate-purple"
                                  : ""}
                              `}
                              onClick={() => toggleSaveHackathon(hackathon.id)}
                            >
                              <Star
                                className={`h-4 w-4 mr-2 ${
                                  savedHackathons.includes(hackathon.id) ? "fill-vimate-purple" : ""
                                }`}
                              />
                              {savedHackathons.includes(hackathon.id) ? "Saved" : "Save"}
                            </Button>
                            <Button
                              className={`${
                                registeredHackathons.includes(hackathon.id)
                                  ? "bg-green-600 hover:bg-green-700"
                                  : "bg-vimate-purple hover:bg-vimate-purple-dark"
                              }`}
                              onClick={() => handleRegister(hackathon)}
                            >
                              {registeredHackathons.includes(hackathon.id) ? (
                                "Registered ✓"
                              ) : (
                                "Register Now"
                              )}
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))
                  ) : (
                    <Card className="p-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Award className="h-12 w-12 text-slate-300 mb-3" />
                        <h3 className="text-lg font-medium mb-1">No hackathons found</h3>
                        <p className="text-sm text-slate-500 mb-4">
                          Try adjusting your filters or check back later
                        </p>
                      </div>
                    </Card>
                  )}
                </motion.div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="registered">
            {/* Existing registered hackathons content */}
          </TabsContent>
          
          <TabsContent value="partners">
            <PartnerFindingTab />
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Registration Dialog */}
      {selectedHackathon && (
        <Dialog open={!!selectedHackathon} onOpenChange={(open) => !open && setSelectedHackathon(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Register for {selectedHackathon.title}</DialogTitle>
              <DialogDescription>
                Please provide your team details to complete registration
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{selectedHackathon.date}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">{selectedHackathon.location}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Team Size</span>
                  <span className="font-medium">{selectedHackathon.teamSize}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Prize</span>
                  <span className="font-medium">{selectedHackathon.prize}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Team Name</Label>
                <Input placeholder="Enter your team name" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Team Members</Label>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    className="h-8 text-xs"
                    onClick={addTeamMember}
                  >
                    + Add Member
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input 
                        placeholder={index === 0 ? "Your name (Team Lead)" : `Team member ${index + 1}`}
                        value={member}
                        onChange={(e) => updateTeamMember(index, e.target.value)}
                      />
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2"
                          onClick={() => removeTeamMember(index)}
                        >
                          ✕
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Project Idea (Optional)</Label>
                <Input placeholder="Briefly describe your project idea" />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the hackathon rules and code of conduct
                </Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedHackathon(null)}>
                Cancel
              </Button>
              <Button className="bg-vimate-purple" onClick={confirmRegistration}>
                Complete Registration
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Hackathons;
