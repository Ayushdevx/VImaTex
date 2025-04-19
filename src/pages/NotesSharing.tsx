
import { useState } from "react";
import { QrCode, Share2, Download, Upload, Copy, BookOpen } from "lucide-react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";

const NotesSharing = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [sharedNotes, setSharedNotes] = useState<any[]>([
    {
      id: "1",
      title: "Calculus II - Integration Techniques",
      course: "MATH 201",
      author: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      downloads: 24,
      timestamp: "2 days ago",
      fileType: "PDF",
      fileSize: "2.4 MB"
    },
    {
      id: "2",
      title: "Organic Chemistry Lab Notes",
      course: "CHEM 302",
      author: "Sophia Williams",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      downloads: 36,
      timestamp: "5 hours ago",
      fileType: "PDF",
      fileSize: "4.1 MB"
    },
    {
      id: "3",
      title: "Computer Science - Data Structures",
      course: "CS 301",
      author: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      downloads: 52,
      timestamp: "1 week ago",
      fileType: "ZIP",
      fileSize: "8.7 MB"
    }
  ]);

  // List of popular courses for the dropdown
  const popularCourses = [
    "MATH 101 - Calculus I",
    "MATH 201 - Calculus II",
    "PHYS 101 - Physics I",
    "CHEM 101 - General Chemistry",
    "CS 101 - Intro to Computer Science",
    "CS 301 - Data Structures",
    "BIO 101 - General Biology",
    "ECON 101 - Principles of Economics",
    "ENG 101 - English Composition",
    "HIST 101 - World History"
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleShareNotes = () => {
    if (!title || !course || !file) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Generate a mock QR code (in a real app, this would link to the actual file)
    setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=vimate-notes-${Date.now()}`);
    
    // Add to shared notes
    const newNote = {
      id: Date.now().toString(),
      title,
      course,
      author: "You",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      downloads: 0,
      timestamp: "Just now",
      fileType: file.name.split('.').pop()?.toUpperCase() || "FILE",
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
    };
    
    setSharedNotes([newNote, ...sharedNotes]);
    
    toast({
      title: "Notes shared successfully!",
      description: "Students can now access your notes via QR code",
    });
  };

  const copyQrLink = () => {
    if (qrCode) {
      navigator.clipboard.writeText(qrCode);
      toast({
        title: "Link copied!",
        description: "QR code link copied to clipboard",
      });
    }
  };

  const downloadNotes = (id: string) => {
    toast({
      title: "Downloading notes...",
      description: "Your download will begin shortly",
    });
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
            <QrCode className="h-6 w-6 text-vimate-purple" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-vimate-purple to-vimate-orange bg-clip-text text-transparent">
            Notes Sharing Hub
          </h1>
        </motion.div>
        
        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="browse">Browse Notes</TabsTrigger>
            <TabsTrigger value="share">Share Notes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse">
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {sharedNotes.map((note) => (
                <motion.div key={note.id} variants={item}>
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{note.title}</CardTitle>
                          <CardDescription>{note.course}</CardDescription>
                        </div>
                        <Badge variant="outline" className="bg-slate-100">
                          {note.fileType}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center space-x-3 mb-4">
                        <Avatar>
                          <AvatarImage src={note.avatar} alt={note.author} />
                          <AvatarFallback>{note.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{note.author}</p>
                          <p className="text-xs text-muted-foreground">{note.timestamp}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground space-x-4">
                        <span className="flex items-center">
                          <Download className="h-3 w-3 mr-1" />
                          {note.downloads} downloads
                        </span>
                        <span>{note.fileSize}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full text-vimate-purple border-vimate-purple/50 hover:bg-vimate-purple/10"
                        onClick={() => downloadNotes(note.id)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Notes
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="share">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Share Your Notes</CardTitle>
                    <CardDescription>
                      Help your classmates by sharing your study materials
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Note Title</Label>
                      <Input 
                        id="title" 
                        placeholder="e.g., Calculus II Exam Review" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="course">Course</Label>
                      <Select value={course} onValueChange={setCourse}>
                        <SelectTrigger id="course">
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                          {popularCourses.map((course) => (
                            <SelectItem key={course} value={course}>
                              {course}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Describe what's included in these notes" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="file">Upload File</Label>
                      <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-slate-50">
                        <Upload className="h-8 w-8 text-slate-400 mb-2" />
                        <p className="text-sm text-center text-slate-600 mb-2">
                          {file ? file.name : "Drag & drop or click to upload"}
                        </p>
                        {file && (
                          <p className="text-xs text-slate-500">
                            {`${(file.size / (1024 * 1024)).toFixed(2)} MB • ${file.type}`}
                          </p>
                        )}
                        <Input 
                          id="file" 
                          type="file" 
                          className="hidden" 
                          onChange={handleFileChange}
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-4"
                          onClick={() => document.getElementById('file')?.click()}
                        >
                          Select File
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-vimate-purple hover:bg-vimate-purple-dark"
                      onClick={handleShareNotes}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Notes
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {qrCode ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Share QR Code</CardTitle>
                      <CardDescription>
                        Students can scan this QR code to access your notes
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                      <div className="bg-white p-4 rounded-lg shadow-sm mb-4 w-48">
                        <AspectRatio ratio={1/1}>
                          <img 
                            src={qrCode} 
                            alt="QR Code" 
                            className="w-full h-full object-cover"
                          />
                        </AspectRatio>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full mb-2"
                        onClick={copyQrLink}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Link
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        className="w-full"
                        onClick={() => window.print()}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download QR Code
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <Card className="w-full bg-slate-50 border-dashed">
                      <CardContent className="p-8 flex flex-col items-center justify-center">
                        <QrCode className="h-16 w-16 text-slate-300 mb-4" />
                        <p className="text-slate-500 text-center">
                          Complete the form and share your notes to generate a QR code
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                <Alert className="mt-6">
                  <BookOpen className="h-4 w-4" />
                  <AlertTitle>Tips for Sharing Notes</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc pl-5 text-sm space-y-1 mt-2">
                      <li>Use descriptive titles for easy searching</li>
                      <li>Include the course code and lecture date</li>
                      <li>PDFs work best for most devices</li>
                      <li>Compress large files before uploading</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default NotesSharing;
