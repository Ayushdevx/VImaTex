import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/layout";
import { useState } from "react";

const LostFound = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const items = [
    {
      id: 1,
      title: "Blue Backpack",
      category: "Lost",
      description: "Lost my blue North Face backpack near the library on Monday afternoon. Has my laptop and notes inside.",
      reportedBy: "Alex Johnson",
      date: "2023-12-10",
      location: "Main Library",
      contact: "alex.j@college.edu",
    },
    {
      id: 2,
      title: "Silver Watch",
      category: "Found",
      description: "Found a silver watch in the Engineering building, room 302 after the morning lecture.",
      reportedBy: "Samantha Lee",
      date: "2023-12-08",
      location: "Engineering Building",
      contact: "s.lee@college.edu",
    },
    {
      id: 3,
      title: "Student ID Card",
      category: "Found",
      description: "Found a student ID card for Michael Roberts in the cafeteria during lunch hour.",
      reportedBy: "David Chen",
      date: "2023-12-12",
      location: "Main Cafeteria",
      contact: "d.chen@college.edu",
    },
  ];

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Lost & Found</h1>
          <div className="space-x-3">
            <Button variant="outline">Report Lost Item</Button>
            <Button>Report Found Item</Button>
          </div>
        </div>

        <div className="w-full max-w-sm">
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="lost">Lost Items</TabsTrigger>
            <TabsTrigger value="found">Found Items</TabsTrigger>
            <TabsTrigger value="your">Your Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{item.title}</CardTitle>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        item.category === "Lost" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                      }`}>
                        {item.category}
                      </span>
                    </div>
                    <CardDescription>{item.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">{item.description}</p>
                    <div className="text-sm text-muted-foreground">
                      <p>Contact: {item.contact}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      {item.reportedBy} • {item.date}
                    </div>
                    <Button variant="outline">Contact</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="lost" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems.filter(item => item.category === "Lost").map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{item.title}</CardTitle>
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-800">
                        {item.category}
                      </span>
                    </div>
                    <CardDescription>{item.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">{item.description}</p>
                    <div className="text-sm text-muted-foreground">
                      <p>Contact: {item.contact}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      {item.reportedBy} • {item.date}
                    </div>
                    <Button variant="outline">Contact</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="found" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems.filter(item => item.category === "Found").map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{item.title}</CardTitle>
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                        {item.category}
                      </span>
                    </div>
                    <CardDescription>{item.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">{item.description}</p>
                    <div className="text-sm text-muted-foreground">
                      <p>Contact: {item.contact}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      {item.reportedBy} • {item.date}
                    </div>
                    <Button variant="outline">Contact</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="your" className="mt-6">
            <p className="text-center text-muted-foreground">Your reported items will appear here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default LostFound; 