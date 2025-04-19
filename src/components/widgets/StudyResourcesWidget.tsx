import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, FileText, Video, Link2, Clock, Bookmark, BookmarkCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Resource {
  id: string;
  title: string;
  type: "document" | "video" | "link";
  course: string;
  dateAdded: string;
  bookmarked: boolean;
  starred?: boolean;
  url: string;
}

export const StudyResourcesWidget = () => {
  // Mock data for study resources
  const [resources, setResources] = useState<Resource[]>([
    {
      id: "1",
      title: "Introduction to Data Structures",
      type: "document",
      course: "CS-201",
      dateAdded: "2025-04-15",
      bookmarked: true,
      url: "#"
    },
    {
      id: "2",
      title: "Graph Algorithms Explained",
      type: "video",
      course: "CS-201",
      dateAdded: "2025-04-12",
      bookmarked: false,
      starred: true,
      url: "#"
    },
    {
      id: "3",
      title: "Machine Learning Study Guide",
      type: "document",
      course: "CS-401",
      dateAdded: "2025-04-10",
      bookmarked: true,
      url: "#"
    },
    {
      id: "4",
      title: "Neural Networks Interactive Demo",
      type: "link",
      course: "CS-401",
      dateAdded: "2025-04-05",
      bookmarked: false,
      url: "#"
    },
    {
      id: "5",
      title: "Web Development Best Practices",
      type: "document",
      course: "CS-301",
      dateAdded: "2025-04-17",
      bookmarked: false,
      url: "#"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'document':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'video':
        return <Video className="h-4 w-4 text-red-600" />;
      case 'link':
        return <Link2 className="h-4 w-4 text-green-600" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const toggleBookmark = (id: string) => {
    setResources(resources.map(resource => 
      resource.id === id ? { ...resource, bookmarked: !resource.bookmarked } : resource
    ));
  };

  const toggleStar = (id: string) => {
    setResources(resources.map(resource => 
      resource.id === id ? { ...resource, starred: !resource.starred } : resource
    ));
  };

  // Filter resources based on search and active tab
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.course.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "bookmarked") return matchesSearch && resource.bookmarked;
    if (activeTab === "documents") return matchesSearch && resource.type === "document";
    if (activeTab === "videos") return matchesSearch && resource.type === "video";
    return matchesSearch;
  });

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-primary" />
          Study Resources
        </CardTitle>
        <CardDescription>Quick access to your learning materials</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Search Bar */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="all" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-2">
            <div className="space-y-2">
              {filteredResources.length > 0 ? (
                filteredResources.map(resource => (
                  <div key={resource.id} className="flex items-start gap-2 rounded-lg border p-2">
                    <div className="mt-0.5">
                      {getResourceIcon(resource.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <a href={resource.url} className="font-medium hover:text-primary hover:underline">
                          {resource.title}
                        </a>
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => toggleStar(resource.id)}
                            className="text-muted-foreground hover:text-amber-500"
                          >
                            <Star className={cn(
                              "h-4 w-4", 
                              resource.starred && "fill-amber-500 text-amber-500"
                            )} />
                          </button>
                          <button 
                            onClick={() => toggleBookmark(resource.id)}
                            className="text-muted-foreground hover:text-primary"
                          >
                            {resource.bookmarked ? (
                              <BookmarkCheck className="h-4 w-4 text-primary" />
                            ) : (
                              <Bookmark className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {resource.course}
                        </Badge>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {new Date(resource.dateAdded).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No resources found matching your criteria.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter>
        <div className="flex w-full justify-between">
          <Button variant="outline" size="sm">Upload New</Button>
          <Button variant="ghost" size="sm">Browse All</Button>
        </div>
      </CardFooter>
    </Card>
  );
};