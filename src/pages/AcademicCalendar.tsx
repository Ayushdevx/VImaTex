import { Layout } from "@/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AcademicCalendar = () => {
  const winterCalendarData = [
    {
      date: "09.10.2024 & 10.10.2024",
      day: "Wednesday & Thursday",
      event: "Course wish list registration by students",
    },
    {
      date: "14.10.2024 to 01.11.2024",
      day: "Monday to Friday",
      event: "Course allocation and scheduling by schools",
    },
    {
      date: "09.11.2024 & 10.11.2024",
      day: "Saturday & Sunday",
      event: "Mock Course registration",
    },
    {
      date: "16.11.2024 & 17.11.2024",
      day: "Saturday & Sunday",
      event: "Course registration",
    },
    {
      date: "12.12.2024",
      day: "Thursday",
      event: "Commencement of Winter Semester 2024-2025",
    },
    {
      date: "12.12.2024 to 14.12.2024",
      day: "Thursday to Saturday",
      event: "Course add/drop option for students",
    },
    {
      date: "22.12.2024 to 01.01.2025",
      day: "Sunday to Wednesday",
      event: "Winter Vacation",
    },
    {
      date: "05.01.2025",
      day: "Sunday",
      event: "Last date for the payment of course re-registration fees",
    },
    {
      date: "14.01.2025 to 19.01.2025",
      day: "Tuesday to Sunday",
      event: "Pongal (Holiday)",
    },
    {
      date: "25.01.2025 to 01.02.2025",
      day: "Saturday to Saturday",
      event: "Continuous Assessment Test – I",
    },
    {
      date: "11.02.2025",
      day: "Tuesday",
      event: "Thaipoosum (No Instructional Day)",
    },
    {
      date: "24.02.2025 to 26.02.2025",
      day: "Monday to Wednesday",
      event: "Last date for holidays option for students",
    },
    {
      date: "26.02.2025 to 01.03.2025",
      day: "Wednesday to Saturday",
      event: "VIBRANCE (No Instructional Day)",
    },
    {
      date: "14.03.2025",
      day: "Friday",
      event: "Holi (Holiday)",
    },
    {
      date: "15.03.2025 to 22.03.2025",
      day: "Saturday to Saturday",
      event: "Continuous Assessment Test – II",
    },
    {
      date: "31.03.2025",
      day: "Monday",
      event: "Ramzan (No Instructional Day)",
    },
    {
      date: "04.04.2025",
      day: "Friday",
      event: "Last Instructional Day for laboratory classes",
    },
    {
      date: "07.04.2025 to 11.04.2025",
      day: "Monday to Friday",
      event: "Final Assessment Test (FAT) For laboratory courses/components",
    },
    {
      date: "14.04.2025",
      day: "Monday",
      event: "Tamil New Year's Day / Dr. B. R. Ambedkar Birthday (Holiday)",
    },
    {
      date: "18.04.2025",
      day: "Friday",
      event: "Good Friday (No Instructional Day)",
    },
    {
      date: "23.04.2025",
      day: "Wednesday",
      event: "Last Instructional Day for theory classes",
    },
    {
      date: "24.04.2025",
      day: "Thursday",
      event: "Commencement of Final Assessment Test (FAT) for theory courses/components",
    },
    {
      date: "15.05.2025",
      day: "Thursday",
      event: "Commencement of Summer Term 2024-2025 (Tentative)",
    },
    {
      date: "07.07.2025",
      day: "Monday",
      event: "Commencement of Fall Semester 2025-2026 (Tentative)",
    },
  ];

  const summerCalendarData = [
    {
      date: "24-03-2025 to 25-03-2025",
      day: "Monday to Tuesday",
      event: "Course Wish list registration by students",
    },
    {
      date: "01-04-2025 to 06-04-2025",
      day: "Tuesday to Sunday",
      event: "Course Scheduling and Allocation",
    },
    {
      date: "18-04-2025",
      day: "Friday",
      event: "Course Registration by students (10:00 AM to 05:00 PM)",
    },
    {
      date: "15-05-2025",
      day: "Thursday",
      event: "First Instructional Day",
    },
    {
      date: "30-05-2025 to 01-06-2025",
      day: "Friday to Sunday",
      event: "Mid Term Test",
    },
    {
      date: "07-06-2025",
      day: "Saturday",
      event: "Bakrid (Sectional Holiday)",
    },
    {
      date: "28-06-2025",
      day: "Saturday",
      event: "Last Instructional Day",
    },
    {
      date: "30-06-2025",
      day: "Monday",
      event: "Commencement of Final Assessment Test (FAT)",
    },
  ];

  const winterImportantNotes = [
    "It is necessary to maintain 100% attendance. However, relaxation on minimum attendance requirement is given for genuine reasons. Minimum 75% attendance is mandatory for appearing for the examinations (Continuous Assessment Tests and Final Assessment Tests).",
    "Last date for the upload of the assignments and project reports is 23.04.2025 (Wednesday).",
    "FAT schedule will be announced by CoE at the appropriate time.",
    "Academic calendar on VTOP Login is to be referred to know the day order to be followed for the student's schedule of classes (Sunday to Wednesday).",
    "No Re-FAT will be provided for NPTEL examinations.",
  ];

  const summerImportantNotes = [
    "Participation in the course wish list registration is mandatory.",
    "Students should participate in the course registration scheduled on 18.04.2025.",
    "ADD/DROP or Withdraw options are not available.",
    "Only Re-registrations are permitted. However, final year students (graduating batch) and timed-out students are permitted to register fresh courses.",
    "2021 Batch M.Tech. Integrated Programme Students are permitted for fresh course registration.",
    "Registration under Audit and Grade Improvement categories are not permitted.",
    "Midterm Test will be for 50 marks with a weightage of 30 marks and the examination will be for 90 minutes duration. Actual schedule will be made available on VTOP.",
    "Final Assessment Test for the laboratory will be conducted during the last laboratory class of the summer term. Course teachers will provide necessary information related to the laboratory examination.",
    "It is necessary to maintain 100% attendance. However, relaxation on minimum attendance requirement is given for genuine reasons. A minimum of 75% attendance is mandatory for appearing for the examinations (Mid Term Tests and Final Assessment Tests).",
    "Last date for the upload of the assignments and project reports is 28-06-2025 (Saturday).",
    "FAT schedule will be announced by COE at the appropriate time.",
    "Students are required to contact the HOD/School Dean for any clarification regarding course offering.",
  ];

  return (
    <Layout>
      <div className="container py-8 max-w-6xl mx-auto">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Academic Calendar</h1>
              <p className="text-muted-foreground mt-1">
                VIT Chennai - Academic Year 2024-2025
              </p>
            </div>
          </div>

          <Tabs defaultValue="winter">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="winter">Winter Semester 2024-2025</TabsTrigger>
              <TabsTrigger value="summer">Summer Term 2024-2025</TabsTrigger>
            </TabsList>

            <TabsContent value="winter">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <Alert className="flex-1">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Official Calendar</AlertTitle>
                    <AlertDescription>
                      This is the official academic calendar for Winter Semester 2024-2025, applicable to the students of all the programmes except LLM.
                      <div className="mt-2 text-sm text-muted-foreground">
                        Ref: VITCC/ACAD/2024-2025/15 | Date: 26-01-2025
                      </div>
                    </AlertDescription>
                  </Alert>
                  <Badge variant="outline" className="px-3 py-1 flex items-center gap-1 ml-4">
                    <Calendar className="h-4 w-4" />
                    <span>Revised</span>
                  </Badge>
                </div>

                <Tabs defaultValue="calendar" className="mt-6">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="calendar">Academic Calendar</TabsTrigger>
                    <TabsTrigger value="notes">Important Notes</TabsTrigger>
                  </TabsList>

                  <TabsContent value="calendar">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          <span>Academic Calendar for Winter Semester 2024-2025</span>
                        </CardTitle>
                        <CardDescription>
                          Important dates and events for the current semester
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left font-medium py-2 px-4 bg-muted/50">Date</th>
                                <th className="text-left font-medium py-2 px-4 bg-muted/50">Day</th>
                                <th className="text-left font-medium py-2 px-4 bg-muted/50">Event</th>
                              </tr>
                            </thead>
                            <tbody>
                              {winterCalendarData.map((item, index) => (
                                <tr
                                  key={index}
                                  className={`border-b hover:bg-muted/40 transition-colors ${
                                    index % 2 === 0 ? "bg-muted/10" : ""
                                  }`}
                                >
                                  <td className="py-3 px-4">{item.date}</td>
                                  <td className="py-3 px-4">{item.day}</td>
                                  <td className="py-3 px-4">
                                    {item.event.includes("No Instructional Day") || 
                                     item.event.includes("Holiday") ? (
                                      <span className="font-medium text-orange-600 dark:text-orange-400">{item.event}</span>
                                    ) : item.event.includes("Test") || 
                                        item.event.includes("FAT") ||
                                        item.event.includes("Assessment") ? (
                                      <span className="font-medium text-blue-600 dark:text-blue-400">{item.event}</span>
                                    ) : item.event.includes("registration") || 
                                        item.event.includes("Last date") ? (
                                      <span className="font-medium text-red-600 dark:text-red-400">{item.event}</span>
                                    ) : (
                                      item.event
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="notes">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          <span>Important Notes</span>
                        </CardTitle>
                        <CardDescription>
                          Please pay attention to these important notes and instructions
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4">
                          {winterImportantNotes.map((note, index) => (
                            <li key={index} className="flex gap-3">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium text-sm">
                                {index + 1}
                              </span>
                              <p className="text-sm">{note}</p>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-8">
                          <div className="text-sm text-right">
                            <p className="mb-1 font-medium">Dr. Narvenula Khan</p>
                            <p className="text-muted-foreground">Dean-Academics</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>

            <TabsContent value="summer">
              <div className="space-y-6">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Official Calendar</AlertTitle>
                  <AlertDescription>
                    This is the official academic calendar for Summer Term 2024-2025.
                    <div className="mt-2 text-sm text-muted-foreground">
                      Ref: VITCC/ACAD/2024-2025/17 | Date: 18-03-2025
                    </div>
                  </AlertDescription>
                </Alert>

                <Tabs defaultValue="calendar" className="mt-6">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="calendar">Academic Calendar</TabsTrigger>
                    <TabsTrigger value="notes">Important Notes</TabsTrigger>
                  </TabsList>

                  <TabsContent value="calendar">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          <span>Academic Calendar for Summer Term 2024-2025</span>
                        </CardTitle>
                        <CardDescription>
                          Important dates and events for the summer term
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left font-medium py-2 px-4 bg-muted/50">Date</th>
                                <th className="text-left font-medium py-2 px-4 bg-muted/50">Day</th>
                                <th className="text-left font-medium py-2 px-4 bg-muted/50">Details</th>
                              </tr>
                            </thead>
                            <tbody>
                              {summerCalendarData.map((item, index) => (
                                <tr
                                  key={index}
                                  className={`border-b hover:bg-muted/40 transition-colors ${
                                    index % 2 === 0 ? "bg-muted/10" : ""
                                  }`}
                                >
                                  <td className="py-3 px-4">{item.date}</td>
                                  <td className="py-3 px-4">{item.day}</td>
                                  <td className="py-3 px-4">
                                    {item.event.includes("Holiday") ? (
                                      <span className="font-medium text-orange-600 dark:text-orange-400">{item.event}</span>
                                    ) : item.event.includes("Test") || 
                                       item.event.includes("FAT") ||
                                       item.event.includes("Assessment") ? (
                                      <span className="font-medium text-blue-600 dark:text-blue-400">{item.event}</span>
                                    ) : item.event.includes("Registration") || 
                                       item.event.includes("Wish list") ? (
                                      <span className="font-medium text-red-600 dark:text-red-400">{item.event}</span>
                                    ) : (
                                      item.event
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="notes">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          <span>Important Notes</span>
                        </CardTitle>
                        <CardDescription>
                          Please pay attention to these important notes and instructions
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4">
                          {summerImportantNotes.map((note, index) => (
                            <li key={index} className="flex gap-3">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium text-sm">
                                {index + 1}
                              </span>
                              <p className="text-sm">{note}</p>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-8">
                          <div className="text-sm text-right">
                            <p className="mb-1 font-medium">Dr. Narvenula Khan A</p>
                            <p className="text-muted-foreground">Dean-Academics</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AcademicCalendar; 