import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThumbsUp, ThumbsDown, Coffee, Utensils, Clock, Vote } from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
  id: string;
  name: string;
  category: "veg" | "non-veg" | "beverage";
  likes: number;
  dislikes: number;
  userVote?: "like" | "dislike" | null;
}

interface MealMenu {
  id: string;
  time: string;
  items: MenuItem[];
}

type DailyMenu = Record<string, MealMenu[]>;

export const MessMenuWidget = () => {
  // Mock data for mess menu
  const [menuData, setMenuData] = useState<DailyMenu>({
    "today": [
      {
        id: "breakfast",
        time: "7:30 AM - 9:30 AM",
        items: [
          { id: "1", name: "Idli Sambar", category: "veg", likes: 45, dislikes: 5 },
          { id: "2", name: "Bread Toast", category: "veg", likes: 30, dislikes: 8 },
          { id: "3", name: "Coffee", category: "beverage", likes: 60, dislikes: 3 }
        ]
      },
      {
        id: "lunch",
        time: "12:30 PM - 2:30 PM",
        items: [
          { id: "4", name: "Rice", category: "veg", likes: 25, dislikes: 2 },
          { id: "5", name: "Dal Tadka", category: "veg", likes: 40, dislikes: 7 },
          { id: "6", name: "Paneer Curry", category: "veg", likes: 55, dislikes: 4 },
          { id: "7", name: "Chicken Curry", category: "non-veg", likes: 65, dislikes: 8 }
        ]
      },
      {
        id: "dinner",
        time: "7:30 PM - 9:30 PM",
        items: [
          { id: "8", name: "Chapati", category: "veg", likes: 35, dislikes: 5 },
          { id: "9", name: "Mix Vegetable", category: "veg", likes: 28, dislikes: 12 },
          { id: "10", name: "Egg Curry", category: "non-veg", likes: 42, dislikes: 6 }
        ]
      }
    ],
    "tomorrow": [
      {
        id: "breakfast",
        time: "7:30 AM - 9:30 AM",
        items: [
          { id: "11", name: "Dosa", category: "veg", likes: 50, dislikes: 4 },
          { id: "12", name: "Upma", category: "veg", likes: 25, dislikes: 15 },
          { id: "13", name: "Tea", category: "beverage", likes: 55, dislikes: 2 }
        ]
      },
      {
        id: "lunch",
        time: "12:30 PM - 2:30 PM",
        items: [
          { id: "14", name: "Rice", category: "veg", likes: 25, dislikes: 2 },
          { id: "15", name: "Rajma", category: "veg", likes: 48, dislikes: 6 },
          { id: "16", name: "Veg Pulao", category: "veg", likes: 38, dislikes: 8 },
          { id: "17", name: "Fish Curry", category: "non-veg", likes: 52, dislikes: 10 }
        ]
      },
      {
        id: "dinner",
        time: "7:30 PM - 9:30 PM",
        items: [
          { id: "18", name: "Chapati", category: "veg", likes: 35, dislikes: 5 },
          { id: "19", name: "Palak Paneer", category: "veg", likes: 45, dislikes: 7 },
          { id: "20", name: "Chicken Biryani", category: "non-veg", likes: 70, dislikes: 5 }
        ]
      }
    ]
  });
  
  const [activeDay, setActiveDay] = useState("today");
  const [activeMeal, setActiveMeal] = useState("lunch");

  const handleVote = (day: string, mealId: string, itemId: string, voteType: "like" | "dislike") => {
    setMenuData(prevData => {
      const updatedData = { ...prevData };
      const meal = updatedData[day].find(m => m.id === mealId);
      
      if (meal) {
        const item = meal.items.find(i => i.id === itemId);
        
        if (item) {
          // If user already voted the same way, remove vote
          if (item.userVote === voteType) {
            if (voteType === "like") item.likes -= 1;
            else item.dislikes -= 1;
            item.userVote = null;
          } 
          // If user voted the opposite way, flip vote
          else if (item.userVote) {
            if (voteType === "like") {
              item.likes += 1;
              item.dislikes -= 1;
            } else {
              item.dislikes += 1;
              item.likes -= 1;
            }
            item.userVote = voteType;
          } 
          // If user hasn't voted yet, add vote
          else {
            if (voteType === "like") item.likes += 1;
            else item.dislikes += 1;
            item.userVote = voteType;
          }
        }
      }
      
      return updatedData;
    });
  };

  const getCategoryBadge = (category: MenuItem['category']) => {
    switch (category) {
      case 'veg':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Veg</Badge>;
      case 'non-veg':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Non-Veg</Badge>;
      case 'beverage':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Beverage</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Utensils className="mr-2 h-5 w-5 text-primary" />
          Mess Menu
        </CardTitle>
        <CardDescription>Check what's cooking today</CardDescription>
      </CardHeader>
      
      <CardContent>
        {/* Day tabs */}
        <Tabs defaultValue="today" onValueChange={setActiveDay} value={activeDay}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeDay}>
            {/* Meal tabs */}
            <Tabs defaultValue="lunch" onValueChange={setActiveMeal} value={activeMeal}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="breakfast">
                  <Coffee className="h-4 w-4 mr-2" />
                  Breakfast
                </TabsTrigger>
                <TabsTrigger value="lunch">
                  <Utensils className="h-4 w-4 mr-2" />
                  Lunch
                </TabsTrigger>
                <TabsTrigger value="dinner">
                  <Utensils className="h-4 w-4 mr-2" />
                  Dinner
                </TabsTrigger>
              </TabsList>
              
              {menuData[activeDay].map(meal => (
                <TabsContent key={meal.id} value={meal.id} className="space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{meal.time}</span>
                  </div>
                  
                  <div className="space-y-2">
                    {meal.items.map(item => (
                      <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.name}</span>
                          {getCategoryBadge(item.category)}
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => handleVote(activeDay, meal.id, item.id, "like")}
                            className={cn(
                              "flex items-center gap-1 text-sm",
                              item.userVote === "like" ? "text-green-600" : "text-muted-foreground"
                            )}
                          >
                            <ThumbsUp className="h-4 w-4" />
                            <span>{item.likes}</span>
                          </button>
                          
                          <button 
                            onClick={() => handleVote(activeDay, meal.id, item.id, "dislike")}
                            className={cn(
                              "flex items-center gap-1 text-sm",
                              item.userVote === "dislike" ? "text-red-600" : "text-muted-foreground"
                            )}
                          >
                            <ThumbsDown className="h-4 w-4" />
                            <span>{item.dislikes}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter>
        <div className="flex w-full justify-between">
          <Button variant="outline" size="sm">Rate Food Quality</Button>
          <Button variant="ghost" size="sm">Weekly Menu</Button>
        </div>
      </CardFooter>
    </Card>
  );
};