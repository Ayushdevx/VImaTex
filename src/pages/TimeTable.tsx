import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Download, Printer, Share2 } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const TimeTable = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedView, setSelectedView] = useState("weekly");
  const [selectedSection, setSelectedSection] = useState("AB3-503");
  
  // Basic class data for individual view
  const classes = [
    {
      id: 1,
      subject: "BMAT102L - Engineering Mathematics",
      code: "A1-BMAT102L-TH-AB3-503-ALL",
      time: "8:00 AM - 8:50 AM",
      location: "AB3-503",
      professor: "Dr. Sharma",
      day: "Monday",
      type: "THEORY"
    },
    {
      id: 2,
      subject: "BECE204L - Electronic Devices",
      code: "TB1-BECE204L-TH-AB3-503-ALL",
      time: "10:45 AM - 11:35 AM",
      location: "AB3-503",
      professor: "Dr. Mehta",
      day: "Monday",
      type: "THEORY"
    },
    {
      id: 3,
      subject: "Engineering Mathematics Lab",
      code: "L1",
      time: "8:00 AM - 8:50 AM",
      location: "AB3-Lab1",
      professor: "Dr. Sharma",
      day: "Monday",
      type: "LAB"
    },
    {
      id: 4,
      subject: "BECE204L - Digital Electronics",
      code: "B1-BECE204L-TH-AB3-503-ALL",
      time: "8:51 AM - 9:40 AM",
      location: "AB3-503",
      professor: "Dr. Gupta",
      day: "Tuesday",
      type: "THEORY"
    },
    {
      id: 5,
      subject: "BMAT101L - Applied Physics",
      code: "E1-BMAT101L-TH-AB3-211-ALL",
      time: "9:50 AM - 10:40 AM",
      location: "AB3-211",
      professor: "Dr. Singh",
      day: "Tuesday",
      type: "THEORY"
    },
  ];

  // Structured timetable data
  const timeSlots = [
    { id: "t1", start: "08:00", end: "08:50" },
    { id: "t2", start: "08:55", end: "09:45" },
    { id: "t3", start: "09:50", end: "10:40" },
    { id: "t4", start: "10:45", end: "11:35" },
    { id: "t5", start: "11:40", end: "12:30" },
    { id: "t6", start: "12:35", end: "13:20", label: "Lunch" },
    { id: "t7", start: "14:00", end: "14:50" },
    { id: "t8", start: "14:55", end: "15:45" },
    { id: "t9", start: "15:50", end: "16:40" },
    { id: "t10", start: "16:45", end: "17:35" },
    { id: "t11", start: "17:40", end: "18:30" },
  ];

  const labTimeSlots = [
    { id: "lt1", start: "08:00", end: "08:50" },
    { id: "lt2", start: "08:51", end: "09:40" },
    { id: "lt3", start: "09:50", end: "10:40" },
    { id: "lt4", start: "10:41", end: "11:30" },
    { id: "lt5", start: "11:40", end: "12:30" },
    { id: "lt6", start: "12:31", end: "13:20", label: "Lunch" },
    { id: "lt7", start: "14:00", end: "14:50" },
    { id: "lt8", start: "14:51", end: "15:40" },
    { id: "lt9", start: "15:50", end: "16:40" },
    { id: "lt10", start: "16:41", end: "17:30" },
    { id: "lt11", start: "17:40", end: "18:30" },
  ];

  const weekDays = ["MON", "TUE", "WED", "THU", "FRI"];

  // Timetable structured data
  const timetableData = {
    MON: {
      THEORY: [
        { slot: "t1", code: "A1-BMAT102L-TH-AB3-503-ALL", short: "A1" },
        { slot: "t2", code: "F1", short: "F1" },
        { slot: "t3", code: "D1", short: "D1" },
        { slot: "t4", code: "TB1-BECE204L-TH-AB3-503-ALL", short: "TB1" },
        { slot: "t5", code: "TG1", short: "TG1" },
        { slot: "t7", code: "A2-BMAT102L-TH-AB3-503-ALL", short: "A2" },
        { slot: "t8", code: "F2", short: "F2" },
        { slot: "t9", code: "D2", short: "D2" },
        { slot: "t10", code: "TB2-BECE204L-TH-AB3-503-ALL", short: "TB2" },
      ],
      LAB: [
        { slot: "lt1", code: "L1", short: "L1" },
        { slot: "lt2", code: "L2", short: "L2" },
        { slot: "lt3", code: "L3", short: "L3" },
        { slot: "lt4", code: "L4", short: "L4" },
        { slot: "lt5", code: "L5", short: "L5" },
        { slot: "lt7", code: "L31", short: "L31" },
        { slot: "lt8", code: "L32", short: "L32" },
        { slot: "lt9", code: "L33", short: "L33" },
        { slot: "lt10", code: "L34", short: "L34" },
        { slot: "lt11", code: "L35", short: "L35" },
      ]
    },
    TUE: {
      THEORY: [
        { slot: "t1", code: "B1-BECE204L-TH-AB3-503-ALL", short: "B1" },
        { slot: "t2", code: "G1", short: "G1" },
        { slot: "t3", code: "E1-BMAT101L-TH-AB3-211-ALL", short: "E1" },
        { slot: "t4", code: "TC1", short: "TC1" },
        { slot: "t5", code: "TAA1-BMAT102L-TH-AB3-503-ALL", short: "TAA1" },
        { slot: "t7", code: "B2-BECE204L-TH-AB3-503-ALL", short: "B2" },
        { slot: "t8", code: "G2", short: "G2" },
        { slot: "t9", code: "E2-BMAT101L-TH-AB3-211-ALL", short: "E2" },
        { slot: "t10", code: "TC2", short: "TC2" },
      ],
      LAB: [
        { slot: "lt1", code: "L7", short: "L7" },
        { slot: "lt2", code: "L8", short: "L8" },
        { slot: "lt3", code: "L9", short: "L9" },
        { slot: "lt4", code: "L10", short: "L10" },
        { slot: "lt5", code: "L11", short: "L11" },
        { slot: "lt7", code: "L37", short: "L37" },
        { slot: "lt8", code: "L38", short: "L38" },
        { slot: "lt9", code: "L39", short: "L39" },
        { slot: "lt10", code: "L40", short: "L40" },
        { slot: "lt11", code: "L41", short: "L41" },
      ]
    },
    WED: {
      THEORY: [
        { slot: "t1", code: "C1-BCSE102L-TH-AB3-204-ALL", short: "C1" },
        { slot: "t2", code: "A1-BMAT102L-TH-AB3-503-ALL", short: "A1" },
        { slot: "t3", code: "F1", short: "F1" },
        { slot: "t4", code: "TD1", short: "TD1" },
        { slot: "t5", code: "TBB1", short: "TBB1" },
        { slot: "t7", code: "C2-BCSE102L-TH-AB3-204-ALL", short: "C2" },
        { slot: "t8", code: "A2-BMAT102L-TH-AB3-503-ALL", short: "A2" },
        { slot: "t9", code: "F2", short: "F2" },
        { slot: "t10", code: "TD2", short: "TD2" },
      ],
      LAB: [
        { slot: "lt1", code: "L13", short: "L13" },
        { slot: "lt2", code: "L14", short: "L14" },
        { slot: "lt3", code: "L15", short: "L15" },
        { slot: "lt4", code: "L16", short: "L16" },
        { slot: "lt5", code: "L17", short: "L17" },
        { slot: "lt7", code: "L43", short: "L43" },
        { slot: "lt8", code: "L44", short: "L44" },
        { slot: "lt9", code: "L45", short: "L45" },
        { slot: "lt10", code: "L46", short: "L46" },
        { slot: "lt11", code: "L47", short: "L47" },
      ]
    },
    THU: {
      THEORY: [
        { slot: "t1", code: "D1", short: "D1" },
        { slot: "t2", code: "B1-BECE204L-TH-AB3-503-ALL", short: "B1" },
        { slot: "t3", code: "G1", short: "G1" },
        { slot: "t4", code: "TE1-BMAT101L-TH-AB3-211-ALL", short: "TE1" },
        { slot: "t5", code: "TCC1", short: "TCC1" },
        { slot: "t7", code: "D2", short: "D2" },
        { slot: "t8", code: "B2-BECE204L-TH-AB3-503-ALL", short: "B2" },
        { slot: "t9", code: "G2", short: "G2" },
        { slot: "t10", code: "TE2-BMAT101L-TH-AB3-211-ALL", short: "TE2" },
      ],
      LAB: [
        { slot: "lt1", code: "L19", short: "L19" },
        { slot: "lt2", code: "L20", short: "L20" },
        { slot: "lt3", code: "L21", short: "L21" },
        { slot: "lt4", code: "L22", short: "L22" },
        { slot: "lt5", code: "L23", short: "L23" },
        { slot: "lt7", code: "L49", short: "L49" },
        { slot: "lt8", code: "L50", short: "L50" },
        { slot: "lt9", code: "L51", short: "L51" },
        { slot: "lt10", code: "L52", short: "L52" },
        { slot: "lt11", code: "L53", short: "L53" },
      ]
    },
    FRI: {
      THEORY: [
        { slot: "t1", code: "E1-BMAT101L-TH-AB3-211-ALL", short: "E1" },
        { slot: "t2", code: "C1-BCSE102L-TH-AB3-204-ALL", short: "C1" },
        { slot: "t3", code: "TA1-BMAT102L-TH-AB3-503-ALL", short: "TA1" },
        { slot: "t4", code: "TF1", short: "TF1" },
        { slot: "t5", code: "TDD1", short: "TDD1" },
        { slot: "t7", code: "E2-BMAT101L-TH-AB3-211-ALL", short: "E2" },
        { slot: "t8", code: "C2-BCSE102L-TH-AB3-204-ALL", short: "C2" },
        { slot: "t9", code: "TA2-BMAT102L-TH-AB3-503-ALL", short: "TA2" },
        { slot: "t10", code: "TF2", short: "TF2" },
      ],
      LAB: [
        { slot: "lt1", code: "L25", short: "L25" },
        { slot: "lt2", code: "L26", short: "L26" },
        { slot: "lt3", code: "L27", short: "L27" },
        { slot: "lt4", code: "L28", short: "L28" },
        { slot: "lt5", code: "L29", short: "L29" },
        { slot: "lt7", code: "L55", short: "L55" },
        { slot: "lt8", code: "L56", short: "L56" },
        { slot: "lt9", code: "L57", short: "L57" },
        { slot: "lt10", code: "L58", short: "L58" },
        { slot: "lt11", code: "L59", short: "L59" },
      ]
    }
  };
  
  // For basic view filtering
  const getDayFromDate = (date: Date): string => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
  };

  const filteredClasses = selectedDate 
    ? classes.filter(cls => cls.day === getDayFromDate(selectedDate))
    : [];

  // Function to get background color based on course code
  const getBackgroundColor = (code: string) => {
    if (code.includes("BMAT102L")) return "bg-cyan-100 dark:bg-cyan-900";
    if (code.includes("BECE204L")) return "bg-green-100 dark:bg-green-900";
    if (code.includes("BCSE102L")) return "bg-yellow-100 dark:bg-yellow-900";
    if (code.includes("BMAT101L")) return "bg-purple-100 dark:bg-purple-900";
    if (code.startsWith("L")) return "bg-amber-50 dark:bg-amber-950";
    if (code.startsWith("TB")) return "bg-green-100 dark:bg-green-900";
    if (code.startsWith("TA")) return "bg-cyan-100 dark:bg-cyan-900";
    if (code.includes("TH-AB3-211")) return "bg-purple-100 dark:bg-purple-900";
    
    // Default colors for other slots based on first letter
    if (code.startsWith("A")) return "bg-cyan-100 dark:bg-cyan-900";
    if (code.startsWith("B")) return "bg-green-100 dark:bg-green-900";
    if (code.startsWith("C")) return "bg-yellow-100 dark:bg-yellow-900";
    if (code.startsWith("D")) return "bg-orange-100 dark:bg-orange-900";
    if (code.startsWith("E")) return "bg-purple-100 dark:bg-purple-900";
    if (code.startsWith("F")) return "bg-pink-100 dark:bg-pink-900";
    if (code.startsWith("G")) return "bg-blue-100 dark:bg-blue-900";
    if (code.startsWith("T")) return "bg-indigo-100 dark:bg-indigo-900";
    
    return "bg-gray-100 dark:bg-gray-800";
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">TimeTable</h1>
            <p className="text-muted-foreground">
              VIT Chennai Class Schedule - AB3-503 Section
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AB3-503">AB3-503</SelectItem>
                <SelectItem value="AB3-211">AB3-211</SelectItem>
                <SelectItem value="AB3-204">AB3-204</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Printer className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="grid" value={selectedView} onValueChange={setSelectedView}>
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="individual">Individual Classes</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="grid" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Class Timetable</CardTitle>
                <CardDescription>
                  AB3-503 Section - Winter Semester 2024-2025
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="border px-2 py-1 text-xs font-medium text-left"></th>
                        {timeSlots.map(slot => (
                          <th key={slot.id} className="border px-2 py-1 text-xs font-medium text-center">
                            <div>{slot.start}</div>
                            <div>{slot.end}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {weekDays.map(day => (
                        <>
                          <tr key={`${day}-theory`}>
                            <td className="border-l border-r border-t px-2 py-1 text-xs font-semibold bg-muted/30">
                              {day}<br/>THEORY
                            </td>
                            {timeSlots.map(slot => {
                              const cellData = timetableData[day]?.THEORY.find(item => item.slot === slot.id);
                              if (slot.label === "Lunch") {
                                return (
                                  <td key={`${day}-${slot.id}`} className="border px-1 py-1 text-xs text-center bg-gray-200 dark:bg-gray-700">
                                    Lunch
                                  </td>
                                );
                              }
                              
                              return (
                                <td 
                                  key={`${day}-${slot.id}`} 
                                  className={`border px-1 py-1 text-xs text-center ${cellData ? getBackgroundColor(cellData.code) : ''}`}
                                >
                                  {cellData ? cellData.short : ''}
                                </td>
                              );
                            })}
                          </tr>
                          <tr key={`${day}-lab`}>
                            <td className="border px-2 py-1 text-xs font-semibold bg-muted/30">
                              LAB
                            </td>
                            {labTimeSlots.map(slot => {
                              const cellData = timetableData[day]?.LAB.find(item => item.slot === slot.id);
                              if (slot.label === "Lunch") {
                                return (
                                  <td key={`${day}-lab-${slot.id}`} className="border px-1 py-1 text-xs text-center bg-gray-200 dark:bg-gray-700">
                                    Lunch
                                  </td>
                                );
                              }
                              
                              return (
                                <td 
                                  key={`${day}-lab-${slot.id}`} 
                                  className={`border px-1 py-1 text-xs text-center ${cellData ? getBackgroundColor(cellData.code) : ''}`}
                                >
                                  {cellData ? cellData.short : ''}
                                </td>
                              );
                            })}
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 rounded-sm bg-cyan-100 dark:bg-cyan-900"></div>
                    <span>BMAT102L (Mathematics)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 rounded-sm bg-green-100 dark:bg-green-900"></div>
                    <span>BECE204L (Electronics)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 rounded-sm bg-purple-100 dark:bg-purple-900"></div>
                    <span>BMAT101L (Physics)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 rounded-sm bg-yellow-100 dark:bg-yellow-900"></div>
                    <span>BCSE102L (CS)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 rounded-sm bg-amber-50 dark:bg-amber-950"></div>
                    <span>Laboratory Sessions</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="individual" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                  <CardDescription>Select a date to view your schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>
                    {selectedDate ? (
                      <>
                        Schedule for {selectedDate.toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </>
                    ) : (
                      "Schedule"
                    )}
                  </CardTitle>
                  <CardDescription>
                    {filteredClasses.length > 0 
                      ? `You have ${filteredClasses.length} classes today`
                      : "No classes scheduled for this day"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredClasses.map((cls) => (
                      <Card key={cls.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base">{cls.subject}</CardTitle>
                            <Badge>{cls.time}</Badge>
                          </div>
                          <CardDescription className="mt-1">{cls.code}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div><strong>Location:</strong> {cls.location}</div>
                            <div><strong>Type:</strong> {cls.type}</div>
                            <div><strong>Professor:</strong> {cls.professor}</div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button variant="outline" size="sm">View Details</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="calendar" className="mt-6">
            <div className="grid grid-cols-7 gap-4">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                <Card key={day} className="min-h-[200px]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">{day}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {classes.filter(cls => cls.day === day).map((cls) => (
                        <div key={cls.id} className={`p-2 rounded-md text-xs ${getBackgroundColor(cls.code)}`}>
                          <div className="font-semibold">{cls.subject}</div>
                          <div>{cls.time}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TimeTable; 