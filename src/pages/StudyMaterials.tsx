import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/layout";
import { useState } from "react";

const StudyMaterials = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const materials = [
    {
      id: 1,
      title: "Data Structures and Algorithms",
      subject: "Computer Science",
      description: "Comprehensive notes on DSA concepts, time complexity, and common algorithms.",
      uploadedBy: "Prof. Johnson",
      date: "2023-11-15",
    },
    {
      id: 2,
      title: "Calculus II Complete Guide",
      subject: "Mathematics",
      description: "Detailed explanations of integration techniques, series, and multivariable calculus.",
      uploadedBy: "Dr. Matthews",
      date: "2023-10-22",
    },
    {
      id: 3,
      title: "Organic Chemistry Reactions",
      subject: "Chemistry",
      description: "Collection of important organic chemistry reactions and mechanisms.",
      uploadedBy: "Prof. Stevenson",
      date: "2023-12-05",
    },
  ];

  const filteredMaterials = materials.filter((material) =>
    material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Study Materials</h1>
          <Button>Upload New Material</Button>
        </div>

        <div className="w-full max-w-sm">
          <Input
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Materials</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="your">Your Uploads</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredMaterials.map((material) => (
                <Card key={material.id}>
                  <CardHeader>
                    <CardTitle>{material.title}</CardTitle>
                    <CardDescription>{material.subject}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{material.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      {material.uploadedBy} • {material.date}
                    </div>
                    <Button variant="outline">Download</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="recommended" className="mt-6">
            <p className="text-center text-muted-foreground">Recommended materials will appear here.</p>
          </TabsContent>
          <TabsContent value="your" className="mt-6">
            <p className="text-center text-muted-foreground">Your uploaded materials will appear here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StudyMaterials; 