import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/layout";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Clock, Package, RefreshCw, AlertCircle, CheckCircle, Truck } from "lucide-react";

const Laundry = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedHostel, setSelectedHostel] = useState("A Block");

  // Sample laundry data
  const laundrySchedule = {
    "A Block": {
      monday: { dropOff: true, pickUp: false, timings: "8:00 AM - 10:00 AM" },
      tuesday: { dropOff: false, pickUp: true, timings: "4:00 PM - 6:00 PM" },
      wednesday: { dropOff: false, pickUp: false, timings: "" },
      thursday: { dropOff: true, pickUp: false, timings: "8:00 AM - 10:00 AM" },
      friday: { dropOff: false, pickUp: true, timings: "4:00 PM - 6:00 PM" },
      saturday: { dropOff: false, pickUp: false, timings: "" },
      sunday: { dropOff: false, pickUp: false, timings: "" },
    },
    "B Block": {
      monday: { dropOff: false, pickUp: false, timings: "" },
      tuesday: { dropOff: true, pickUp: false, timings: "9:00 AM - 11:00 AM" },
      wednesday: { dropOff: false, pickUp: true, timings: "4:00 PM - 6:00 PM" },
      thursday: { dropOff: false, pickUp: false, timings: "" },
      friday: { dropOff: true, pickUp: false, timings: "9:00 AM - 11:00 AM" },
      saturday: { dropOff: false, pickUp: true, timings: "4:00 PM - 6:00 PM" },
      sunday: { dropOff: false, pickUp: false, timings: "" },
    },
    "C Block": {
      monday: { dropOff: false, pickUp: true, timings: "5:00 PM - 7:00 PM" },
      tuesday: { dropOff: false, pickUp: false, timings: "" },
      wednesday: { dropOff: true, pickUp: false, timings: "8:00 AM - 10:00 AM" },
      thursday: { dropOff: false, pickUp: true, timings: "5:00 PM - 7:00 PM" },
      friday: { dropOff: false, pickUp: false, timings: "" },
      saturday: { dropOff: true, pickUp: false, timings: "8:00 AM - 10:00 AM" },
      sunday: { dropOff: false, pickUp: false, timings: "" },
    },
    "D1 Block": {
      monday: { dropOff: false, pickUp: false, timings: "" },
      tuesday: { dropOff: false, pickUp: true, timings: "5:00 PM - 7:00 PM" },
      wednesday: { dropOff: false, pickUp: false, timings: "" },
      thursday: { dropOff: true, pickUp: false, timings: "9:00 AM - 11:00 AM" },
      friday: { dropOff: false, pickUp: true, timings: "5:00 PM - 7:00 PM" },
      saturday: { dropOff: false, pickUp: false, timings: "" },
      sunday: { dropOff: true, pickUp: false, timings: "9:00 AM - 11:00 AM" },
    },
    "D2 Block": {
      monday: { dropOff: true, pickUp: false, timings: "9:00 AM - 11:00 AM" },
      tuesday: { dropOff: false, pickUp: false, timings: "" },
      wednesday: { dropOff: false, pickUp: true, timings: "5:00 PM - 7:00 PM" },
      thursday: { dropOff: false, pickUp: false, timings: "" },
      friday: { dropOff: true, pickUp: false, timings: "9:00 AM - 11:00 AM" },
      saturday: { dropOff: false, pickUp: false, timings: "" },
      sunday: { dropOff: false, pickUp: true, timings: "4:00 PM - 6:00 PM" },
    },
  };

  // Sample laundry items tracking
  const laundryItems = [
    {
      id: 1,
      tokens: "LDY-2023-001",
      items: [
        { name: "T-shirts", quantity: 3, checked: true },
        { name: "Pants", quantity: 2, checked: true },
        { name: "Bed sheets", quantity: 1, checked: true },
      ],
      dropOffDate: "2023-12-05",
      expectedPickupDate: "2023-12-07",
      status: "completed",
    },
    {
      id: 2,
      tokens: "LDY-2023-014",
      items: [
        { name: "T-shirts", quantity: 2, checked: true },
        { name: "Jeans", quantity: 1, checked: true },
        { name: "Towels", quantity: 2, checked: true },
      ],
      dropOffDate: "2023-12-10",
      expectedPickupDate: "2023-12-12",
      status: "ready",
    },
    {
      id: 3,
      tokens: "LDY-2023-022",
      items: [
        { name: "Shirts", quantity: 4, checked: true },
        { name: "Pants", quantity: 2, checked: true },
        { name: "Socks (pairs)", quantity: 5, checked: true },
      ],
      dropOffDate: "2023-12-14",
      expectedPickupDate: "2023-12-16",
      status: "processing",
    },
  ];

  // Get day from date
  const getDayFromDate = (date: Date): string => {
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return days[date.getDay()];
  };

  // Get schedule for selected date and hostel
  const getScheduleForDay = () => {
    if (!selectedDate || !selectedHostel) return null;
    
    const day = getDayFromDate(selectedDate);
    return laundrySchedule[selectedHostel as keyof typeof laundrySchedule][day as keyof typeof laundrySchedule["A Block"]];
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" /> Completed</Badge>;
      case "ready":
        return <Badge className="bg-blue-500"><Package className="w-3 h-3 mr-1" /> Ready for Pickup</Badge>;
      case "processing":
        return <Badge className="bg-amber-500"><RefreshCw className="w-3 h-3 mr-1" /> Processing</Badge>;
      case "delayed":
        return <Badge className="bg-red-500"><AlertCircle className="w-3 h-3 mr-1" /> Delayed</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const schedule = getScheduleForDay();

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Laundry Service</h1>
          <div className="space-x-3">
            <Button variant="outline">View Rules & Pricing</Button>
            <Button>Schedule Drop-off</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Laundry Schedule</CardTitle>
              <CardDescription>Check your hostel's schedule</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hostel-select">Select Your Hostel</Label>
                <Select value={selectedHostel} onValueChange={setSelectedHostel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Hostel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A Block">A Block</SelectItem>
                    <SelectItem value="B Block">B Block (Only Girls)</SelectItem>
                    <SelectItem value="C Block">C Block</SelectItem>
                    <SelectItem value="D1 Block">D1 Block</SelectItem>
                    <SelectItem value="D2 Block">D2 Block</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Select Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 flex flex-col items-start space-y-2 rounded-b-lg">
              <div className="w-full font-medium">
                {selectedDate && schedule && (schedule.dropOff || schedule.pickUp) ? (
                  <div className="space-y-2">
                    <h3 className="font-semibold">
                      {selectedDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </h3>
                    {schedule.dropOff && (
                      <div className="flex items-center text-sm">
                        <Truck className="mr-2 h-4 w-4 text-green-600" />
                        <span>Drop-off: {schedule.timings}</span>
                      </div>
                    )}
                    {schedule.pickUp && (
                      <div className="flex items-center text-sm">
                        <Package className="mr-2 h-4 w-4 text-blue-600" />
                        <span>Pick-up: {schedule.timings}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-2 text-muted-foreground">
                    {selectedDate ? "No laundry service scheduled for this day" : "Select a date to view schedule"}
                  </div>
                )}
              </div>
            </CardFooter>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Laundry Tracking</CardTitle>
              <CardDescription>Track your laundry orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="relative">
                  <Input placeholder="Search by token number..." className="pr-10" />
                  <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {laundryItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardHeader className="bg-muted/30 pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">Token: {item.tokens}</CardTitle>
                            <CardDescription>
                              Drop-off: {formatDate(item.dropOffDate)} | Expected Pickup: {formatDate(item.expectedPickupDate)}
                            </CardDescription>
                          </div>
                          {getStatusBadge(item.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <h4 className="font-medium mb-2">Items:</h4>
                        <ul className="space-y-1">
                          {item.items.map((laundryItem, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <Checkbox checked={laundryItem.checked} id={`item-${item.id}-${index}`} className="mr-2" />
                              <label htmlFor={`item-${item.id}-${index}`} className="flex-1">
                                {laundryItem.name} x {laundryItem.quantity}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="border-t flex justify-between pt-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>
                            {item.status === "completed" ? "Completed on " + formatDate(item.expectedPickupDate) : 
                             item.status === "ready" ? "Ready for pickup" : 
                             "Processing - Est. Ready by " + formatDate(item.expectedPickupDate)}
                          </span>
                        </div>
                        <Button variant="outline" size="sm">View Details</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Schedule</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="rules">Rules & Guidelines</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Laundry Schedule for {selectedHostel}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-4">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => {
                    const dayLower = day.toLowerCase() as keyof typeof laundrySchedule["A Block"];
                    const daySchedule = laundrySchedule[selectedHostel as keyof typeof laundrySchedule][dayLower];
                    
                    return (
                      <Card key={day} className={`min-h-[150px] ${new Date().getDay() === index + 1 ? 'border-2 border-primary' : ''}`}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">{day}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          {daySchedule.dropOff || daySchedule.pickUp ? (
                            <div className="space-y-2 text-sm">
                              {daySchedule.dropOff && (
                                <div className="flex items-center">
                                  <Truck className="mr-1 h-3 w-3 text-green-600" />
                                  <span>Drop-off</span>
                                </div>
                              )}
                              {daySchedule.pickUp && (
                                <div className="flex items-center">
                                  <Package className="mr-1 h-3 w-3 text-blue-600" />
                                  <span>Pick-up</span>
                                </div>
                              )}
                              <div className="text-xs text-muted-foreground">
                                {daySchedule.timings}
                              </div>
                            </div>
                          ) : (
                            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                              No service
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Laundry History</CardTitle>
                <CardDescription>Past 3 months of laundry services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Add past laundry items here */}
                  <p className="text-center text-muted-foreground py-4">Your laundry history will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="rules" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Laundry Service Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">General Guidelines:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>All items must be properly labeled with your name and room number.</li>
                      <li>Maximum 10 items per drop-off (excluding socks and undergarments).</li>
                      <li>Delicate items should be handed over separately with special instructions.</li>
                      <li>Laundry service is available only on scheduled days for your hostel block.</li>
                      <li>Items not collected within 7 days of ready notification will incur storage charges.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Pricing:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Regular wash and fold: ₹20 per item</li>
                      <li>Ironing: ₹10 per item</li>
                      <li>Wash, dry and iron: ₹30 per item</li>
                      <li>Bedsheets/Blankets: ₹50 per item</li>
                      <li>Delicate items: ₹40 per item</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Lost Items Policy:</h3>
                    <p className="text-sm">In case of lost items, please report to the laundry supervisor within 24 hours of pickup. Compensation will be provided as per hostel guidelines after verification.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Laundry; 