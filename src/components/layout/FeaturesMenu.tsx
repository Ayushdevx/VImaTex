import { Link } from "react-router-dom";
import { 
  QrCode, 
  BookOpen, 
  Award, 
  Search, 
  Split, 
  Library, 
  CalendarDays, 
  FileText, 
  UsersRound, 
  Club,
  LayoutDashboard
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

type FeatureItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
  color: string;
  isNew?: boolean;
  isPrimary?: boolean;
};

export const FeaturesMenu = () => {
  const features: FeatureItem[] = [
    {
      name: "Campus Hub",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/collage",
      color: "bg-gradient-to-r from-purple-100 to-blue-100 text-primary",
      isNew: true,
      isPrimary: true,
    },
    {
      name: "Notes Sharing",
      icon: <QrCode className="h-5 w-5" />,
      path: "/notes-sharing",
      color: "bg-purple-100 text-purple-600",
      isNew: true,
    },
    {
      name: "Study Materials",
      icon: <BookOpen className="h-5 w-5" />,
      path: "/study-materials",
      color: "bg-blue-100 text-blue-600",
    },
    {
      name: "Hackathons",
      icon: <Award className="h-5 w-5" />,
      path: "/hackathons",
      color: "bg-yellow-100 text-yellow-600",
      isNew: true,
    },
    {
      name: "Lost & Found",
      icon: <Search className="h-5 w-5" />,
      path: "/lost-found",
      color: "bg-red-100 text-red-600",
    },
    {
      name: "Split Wise",
      icon: <Split className="h-5 w-5" />,
      path: "/split-wise",
      color: "bg-green-100 text-green-600",
    },
    {
      name: "Library Mate",
      icon: <Library className="h-5 w-5" />,
      path: "/library-mate",
      color: "bg-orange-100 text-orange-600",
    },
    {
      name: "Events",
      icon: <CalendarDays className="h-5 w-5" />,
      path: "/events",
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      name: "Exams & PYQs",
      icon: <FileText className="h-5 w-5" />,
      path: "/exams",
      color: "bg-pink-100 text-pink-600",
    },
    {
      name: "Hostel Groups",
      icon: <UsersRound className="h-5 w-5" />,
      path: "/hostel-groups",
      color: "bg-teal-100 text-teal-600",
    },
    {
      name: "Clubs",
      icon: <Club className="h-5 w-5" />,
      path: "/clubs",
      color: "bg-cyan-100 text-cyan-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
      {features.map((feature, index) => (
        <motion.div
          key={feature.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className={`relative ${feature.isPrimary ? 'col-span-2 sm:col-span-3 lg:col-span-5' : ''}`}
        >
          <Link
            to={feature.path}
            className={`${feature.color} flex flex-col items-center p-4 rounded-lg hover:shadow-md transition-all ${feature.isPrimary ? 'flex-row justify-between' : ''}`}
          >
            <div className={`bg-white p-3 rounded-full ${feature.isPrimary ? 'mb-0 mr-3' : 'mb-2'}`}>
              {feature.icon}
            </div>
            <div className={feature.isPrimary ? 'flex-1' : ''}>
              <span className={`font-medium ${feature.isPrimary ? 'text-lg' : 'text-sm'} text-center`}>{feature.name}</span>
              {feature.isPrimary && <p className="text-sm text-gray-600">All campus features in one place</p>}
            </div>
            {feature.isNew && (
              <Badge className="absolute -top-1 -right-1 bg-vimate-purple">
                New
              </Badge>
            )}
            {feature.isPrimary && (
              <div className="ml-auto">
                <span className="text-sm font-medium">Open →</span>
              </div>
            )}
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default FeaturesMenu;
