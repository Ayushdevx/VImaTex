import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import CreateProfile from "./pages/CreateProfile";
import StudyMaterials from "./pages/StudyMaterials";
import NotesSharing from "./pages/NotesSharing";
import Hackathons from "./pages/Hackathons";
import LostFound from "./pages/LostFound";
import SplitWise from "./pages/SplitWise";
import LibraryMate from "./pages/LibraryMate";
import Events from "./pages/Events";
import Exams from "./pages/Exams";
import HostelGroups from "./pages/HostelGroups";
import Clubs from "./pages/Clubs";
import Collage from "./pages/Collage";
import CollageList from "./pages/CollageList";
import PYQs from "./pages/PYQs";
import OutingPlan from "./pages/OutingPlan";
import MessMenu from "./pages/MessMenu";
import Assignments from "./pages/Assignments";
import Laundry from "./pages/Laundry";
import TimeTable from "./pages/TimeTable";
import DatingApp from "./pages/DatingApp";
import RoommateFinder from "./pages/RoommateFinder";
import StudyTools from "./pages/StudyTools";

// Advanced features
import AcademicCalendar from "./pages/AcademicCalendar";
import CareerPortal from "./pages/CareerPortal";
import MentalWellness from "./pages/MentalWellness";
import VirtualClassroom from "./pages/VirtualClassroom";
import CourseRegistration from "./pages/CourseRegistration";
import CampusMap from "./pages/CampusMap";
import Settings from "./pages/Settings";
import AIAssistant from "./pages/AIAssistant";

// Indian College System features
import AttendanceTracker from "./pages/AttendanceTracker";
import ExamResults from "./pages/ExamResults";
import PlacementPortal from "./pages/PlacementPortal";
import Faculty from "./pages/Faculty";

// Context providers for global state management
import { ThemeProvider } from "./components/theme-provider";
import { UserPreferencesProvider } from "./contexts/UserPreferencesContext";
import { NotificationsProvider } from "./contexts/NotificationsContext";
import { AnalyticsProvider } from "./contexts/AnalyticsContext";
import { AIChatProvider } from "./contexts/AIChatContext";

// AI chat component
import { AIChat } from "./components/ai-chat/AIChat";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vimate-theme">
      <UserPreferencesProvider>
        <NotificationsProvider>
          <AnalyticsProvider>
            <AIChatProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner closeButton position="top-right" />
                <Routes>
                  {/* Main Routes */}
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/dating" element={<Index />} />
                  <Route path="/dating-app" element={<DatingApp />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/messages/*" element={<Messages />} />
                  <Route path="/profile/*" element={<Profile />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/notifications" element={<Notifications />} />
                  
                  {/* Authentication Routes */}
                  <Route path="/auth/*" element={<Auth />} />
                  <Route path="/create-profile" element={<CreateProfile />} />
                  <Route path="/settings/*" element={<Settings />} />
                  
                  {/* Academic Features */}
                  <Route path="/study-materials/*" element={<StudyMaterials />} />
                  <Route path="/notes-sharing/*" element={<NotesSharing />} />
                  <Route path="/exams/*" element={<Exams />} />
                  <Route path="/pyqs/*" element={<PYQs />} />
                  <Route path="/assignments/*" element={<Assignments />} />
                  <Route path="/timetable/*" element={<TimeTable />} />
                  <Route path="/course-registration/*" element={<CourseRegistration />} />
                  <Route path="/virtual-classroom/*" element={<VirtualClassroom />} />
                  <Route path="/academic-calendar" element={<AcademicCalendar />} />
                  
                  {/* Indian College System Features */}
                  <Route path="/attendance-tracker" element={<AttendanceTracker />} />
                  <Route path="/exam-results" element={<ExamResults />} />
                  <Route path="/placement-portal/*" element={<PlacementPortal />} />
                  <Route path="/faculty" element={<Faculty />} />
                  
                  {/* Campus Life Features */}
                  <Route path="/hackathons/*" element={<Hackathons />} />
                  <Route path="/lost-found/*" element={<LostFound />} />
                  <Route path="/split-wise/*" element={<SplitWise />} />
                  <Route path="/library-mate/*" element={<LibraryMate />} />
                  <Route path="/events/*" element={<Events />} />
                  <Route path="/hostel-groups/*" element={<HostelGroups />} />
                  <Route path="/clubs/*" element={<Clubs />} />
                  <Route path="/collage/*" element={<Collage />} />
                  <Route path="/college/*" element={<CollageList />} />
                  <Route path="/outing-plan/*" element={<OutingPlan />} />
                  <Route path="/mess-menu/*" element={<MessMenu />} />
                  <Route path="/laundry/*" element={<Laundry />} />
                  <Route path="/roommate-finder/*" element={<RoommateFinder />} />
                  <Route path="/campus-map" element={<CampusMap />} />
                  <Route path="/career-portal/*" element={<CareerPortal />} />
                  <Route path="/mental-wellness/*" element={<MentalWellness />} />
                  <Route path="/study-tools" element={<StudyTools />} />
                  
                  {/* AI Assistant */}
                  <Route path="/ai-assistant" element={<AIAssistant />} />
                  
                  {/* Fallback Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                
                {/* Floating AI Chat Component */}
                <AIChat />
              </TooltipProvider>
            </AIChatProvider>
          </AnalyticsProvider>
        </NotificationsProvider>
      </UserPreferencesProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
