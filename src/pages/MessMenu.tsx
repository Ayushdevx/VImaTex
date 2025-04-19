import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/layout";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Star, Heart, ThumbsUp, ThumbsDown } from "lucide-react";

const MessMenu = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [favorites, setFavorites] = useState<string[]>([]);

  // Sample menu data
  const menuData = {
    breakfast: [
      { id: "b1", item: "Idli Sambar", veg: true, calories: 250 },
      { id: "b2", item: "Bread Toast with Butter/Jam", veg: true, calories: 320 },
      { id: "b3", item: "Boiled Eggs", veg: false, calories: 155 },
      { id: "b4", item: "Fresh Fruits", veg: true, calories: 100 },
      { id: "b5", item: "Tea/Coffee", veg: true, calories: 60 },
    ],
    lunch: [
      { id: "l1", item: "Veg Pulao", veg: true, calories: 350 },
      { id: "l2", item: "Dal Fry", veg: true, calories: 220 },
      { id: "l3", item: "Paneer Butter Masala", veg: true, calories: 380 },
      { id: "l4", item: "Chicken Curry", veg: false, calories: 450 },
      { id: "l5", item: "Jeera Rice", veg: true, calories: 280 },
      { id: "l6", item: "Roti/Chapati", veg: true, calories: 120 },
      { id: "l7", item: "Salad", veg: true, calories: 50 },
      { id: "l8", item: "Pickle", veg: true, calories: 30 },
    ],
    snacks: [
      { id: "s1", item: "Veg Samosa", veg: true, calories: 180 },
      { id: "s2", item: "Tea/Coffee", veg: true, calories: 60 },
      { id: "s3", item: "Biscuits", veg: true, calories: 120 },
    ],
    dinner: [
      { id: "d1", item: "Plain Rice", veg: true, calories: 220 },
      { id: "d2", item: "Dal Tadka", veg: true, calories: 200 },
      { id: "d3", item: "Mixed Vegetable Curry", veg: true, calories: 180 },
      { id: "d4", item: "Egg Bhurji", veg: false, calories: 220 },
      { id: "d5", item: "Roti/Chapati", veg: true, calories: 120 },
      { id: "d6", item: "Curd", veg: true, calories: 100 },
      { id: "d7", item: "Sweet (Gulab Jamun)", veg: true, calories: 150 },
    ],
  };

  // Weekly menu variation
  const weeklyVariation = {
    Monday: {
      breakfast: ["b1", "b2", "b3", "b4", "b5"],
      lunch: ["l1", "l2", "l3", "l5", "l6", "l7", "l8"],
      snacks: ["s1", "s2", "s3"],
      dinner: ["d1", "d2", "d3", "d5", "d6", "d7"],
    },
    Tuesday: {
      breakfast: ["b2", "b3", "b4", "b5"],
      lunch: ["l2", "l4", "l5", "l6", "l7", "l8"],
      snacks: ["s1", "s2", "s3"],
      dinner: ["d1", "d2", "d4", "d5", "d6"],
    },
    Wednesday: {
      breakfast: ["b1", "b2", "b3", "b4", "b5"],
      lunch: ["l1", "l2", "l3", "l5", "l6", "l7", "l8"],
      snacks: ["s1", "s2", "s3"],
      dinner: ["d1", "d2", "d3", "d5", "d6", "d7"],
    },
    Thursday: {
      breakfast: ["b2", "b3", "b4", "b5"],
      lunch: ["l2", "l4", "l5", "l6", "l7", "l8"],
      snacks: ["s1", "s2", "s3"],
      dinner: ["d1", "d2", "d4", "d5", "d6"],
    },
    Friday: {
      breakfast: ["b1", "b2", "b3", "b4", "b5"],
      lunch: ["l1", "l2", "l3", "l5", "l6", "l7", "l8"],
      snacks: ["s1", "s2", "s3"],
      dinner: ["d1", "d2", "d3", "d5", "d6", "d7"],
    },
    Saturday: {
      breakfast: ["b1", "b2", "b3", "b4", "b5"],
      lunch: ["l2", "l4", "l5", "l6", "l7", "l8"],
      snacks: ["s1", "s2"],
      dinner: ["d1", "d2", "d4", "d5", "d6", "d7"],
    },
    Sunday: {
      breakfast: ["b1", "b2", "b3", "b4", "b5"],
      lunch: ["l1", "l3", "l5", "l6", "l7", "l8"],
      snacks: ["s1", "s2", "s3"],
      dinner: ["d1", "d2", "d3", "d5", "d6", "d7"],
    },
  };

  // Get day from date
  const getDayFromDate = (date: Date): keyof typeof weeklyVariation => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
    return days[date.getDay()];
  };

  // Get menu for selected day
  const getMenuForDay = (mealType: keyof typeof menuData) => {
    if (!selectedDate) return [];
    
    const day = getDayFromDate(selectedDate);
    const menuIds = weeklyVariation[day][mealType];
    
    return menuData[mealType]
      .filter(item => menuIds.includes(item.id))
      .map(item => ({
        ...item,
        isFavorite: favorites.includes(item.id),
        rating: ratings[item.id] || 0,
      }));
  };

  // Rate item handler
  const handleRateItem = (itemId: string, rating: number) => {
    setRatings(prev => ({
      ...prev,
      [itemId]: rating,
    }));
  };

  // Toggle favorite handler
  const handleToggleFavorite = (itemId: string) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Mess Menu</h1>
          <div className="space-x-3">
            <Button variant="outline">Report Issue</Button>
            <Button>Rate Today's Food</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view the menu</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
            <CardFooter>
              <div className="w-full text-center text-sm text-muted-foreground">
                {selectedDate ? (
                  <span>Showing menu for {selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                ) : (
                  <span>Select a date to view menu</span>
                )}
              </div>
            </CardFooter>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Today's Highlights</CardTitle>
              <CardDescription>Special items in today's menu</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedDate && (
                  <>
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-5 w-5 text-amber-500" />
                        <h3 className="font-semibold">Special Items</h3>
                      </div>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {getDayFromDate(selectedDate) === "Wednesday" && <li>Chhole Bhature (Lunch)</li>}
                        {getDayFromDate(selectedDate) === "Sunday" && <li>Special Biryani (Lunch)</li>}
                        {getDayFromDate(selectedDate) === "Friday" && <li>Pasta Night (Dinner)</li>}
                        {getDayFromDate(selectedDate) === "Monday" && <li>South Indian Breakfast</li>}
                      </ul>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <h3 className="font-semibold mb-2">Nutrition Facts</h3>
                        <p className="text-sm text-muted-foreground">Average calories per meal:</p>
                        <ul className="text-sm">
                          <li>Breakfast: ~300 calories</li>
                          <li>Lunch: ~750 calories</li>
                          <li>Snacks: ~150 calories</li>
                          <li>Dinner: ~650 calories</li>
                        </ul>
                      </div>
                      
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="font-semibold mb-2">Feedback Summary</h3>
                        <p className="text-sm mb-2">Last week's top rated:</p>
                        <div className="flex items-center gap-1 text-sm">
                          <ThumbsUp className="h-4 w-4 text-green-500" />
                          <span>Paneer Butter Masala (4.5/5)</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm mt-1">
                          <ThumbsDown className="h-4 w-4 text-red-500" />
                          <span>Plain Rice (2.1/5)</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="breakfast">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
            <TabsTrigger value="lunch">Lunch</TabsTrigger>
            <TabsTrigger value="snacks">Snacks</TabsTrigger>
            <TabsTrigger value="dinner">Dinner</TabsTrigger>
          </TabsList>
          
          {(["breakfast", "lunch", "snacks", "dinner"] as const).map((mealType) => (
            <TabsContent key={mealType} value={mealType} className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                {getMenuForDay(mealType).map((item) => (
                  <Card key={item.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{item.item}</CardTitle>
                          {item.veg ? (
                            <Badge className="bg-green-500">Veg</Badge>
                          ) : (
                            <Badge className="bg-red-500">Non-Veg</Badge>
                          )}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleToggleFavorite(item.id)}
                        >
                          <Heart 
                            className={`h-5 w-5 ${item.isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
                          />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">Calories: {item.calories}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleRateItem(item.id, star)}
                            className="focus:outline-none"
                          >
                            <Star 
                              className={`h-4 w-4 ${star <= (item.rating || 0) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                            />
                          </button>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {item.rating ? `${item.rating}/5` : 'Not rated'}
                      </span>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default MessMenu; 