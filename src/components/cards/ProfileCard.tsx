import { useState, useRef, useEffect } from "react";
import { Heart, X, Star, MessageCircle, Bookmark, Info, Sparkle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface ProfileData {
  id: string;
  name: string;
  age: number;
  images: string[];
  bio: string;
  college: string;
  major: string;
  year: string;
  interests: string[];
  distance: number;
  lastActive: string;
  compatibility?: number;
  verified?: boolean;
  instagram?: string;
  snapchat?: string;
}

interface ProfileCardProps {
  profile: ProfileData;
  onLike: () => void;
  onDislike: () => void;
  onSuperLike: () => void;
  onMessage?: () => void;
}

const ProfileCard = ({ profile, onLike, onDislike, onSuperLike, onMessage }: ProfileCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [animateOut, setAnimateOut] = useState<'left' | 'right' | 'up' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % profile.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? profile.images.length - 1 : prev - 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (showDetails) return;
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || showDetails) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const newOffsetX = clientX - startX;
    setOffsetX(newOffsetX);
  };

  const handleTouchEnd = () => {
    if (showDetails) return;
    setIsDragging(false);
    
    // Threshold for swipe
    if (offsetX > 100) {
      // Swiped right - Like
      setAnimateOut('right');
      setTimeout(() => {
        onLike();
        setOffsetX(0);
        setAnimateOut(null);
      }, 300);
    } else if (offsetX < -100) {
      // Swiped left - Dislike
      setAnimateOut('left');
      setTimeout(() => {
        onDislike();
        setOffsetX(0);
        setAnimateOut(null);
      }, 300);
    } else {
      // Reset offset if not enough to trigger action
      setOffsetX(0);
    }
  };

  const handleSuperLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnimateOut('up');
    setTimeout(() => {
      onSuperLike();
      setOffsetX(0);
      setAnimateOut(null);
    }, 300);
  };

  // Animation for card movement
  const getCardStyle = () => {
    if (animateOut === 'left') {
      return {
        transform: `translateX(-150%) rotate(-30deg)`,
        transition: 'transform 0.3s ease-out',
        opacity: 0,
      };
    } else if (animateOut === 'right') {
      return {
        transform: `translateX(150%) rotate(30deg)`,
        transition: 'transform 0.3s ease-out',
        opacity: 0,
      };
    } else if (animateOut === 'up') {
      return {
        transform: `translateY(-150%)`,
        transition: 'transform 0.3s ease-out',
        opacity: 0,
      };
    } else if (isDragging) {
      return {
        transform: `translateX(${offsetX}px) rotate(${offsetX * 0.05}deg)`,
        transition: 'none',
      };
    }
    return {
      transform: 'translateX(0) rotate(0deg)',
      transition: 'transform 0.3s ease',
    };
  };

  // Handle card click to toggle details view
  const toggleDetails = (e: React.MouseEvent) => {
    // Only toggle if not dragging
    if (Math.abs(offsetX) < 10) {
      e.stopPropagation();
      setShowDetails(!showDetails);
    }
  };

  // Close details view when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowDetails(false);
      }
    };

    if (showDetails) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDetails]);

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <motion.div 
        ref={cardRef}
        className={cn(
          "relative w-full bg-white rounded-xl overflow-hidden shadow-lg transition-all",
          showDetails ? "h-[30rem]" : expanded ? "h-[36rem]" : "h-[28rem]",
          "border border-gray-200"
        )}
        style={getCardStyle()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
        onClick={toggleDetails}
        whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Images carousel */}
        <div className="relative w-full h-3/5 bg-gray-200">
          {/* Compatibility badge */}
          {profile.compatibility && (
            <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
              <Sparkle className="h-3 w-3 mr-1" />
              {profile.compatibility}% Match
            </div>
          )}

          {/* Verified badge */}
          {profile.verified && (
            <div className="absolute top-3 right-3 z-10 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
              <Badge className="bg-blue-500 text-white border-none p-0">
                Verified
              </Badge>
            </div>
          )}
          
          <img 
            src={profile.images[currentImageIndex]} 
            alt={profile.name} 
            className="w-full h-full object-cover"
          />
          
          {/* Image navigation dots */}
          <div className="absolute top-2 left-0 right-0 flex justify-center gap-1">
            {profile.images.map((_, index) => (
              <button 
                key={index} 
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentImageIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
                )}
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
              />
            ))}
          </div>
          
          {/* Image navigation buttons */}
          <button 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:bg-white/40"
            onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
          >
            &lt;
          </button>
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:bg-white/40"
            onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
          >
            &gt;
          </button>
          
          {/* Profile info overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 text-white">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{profile.name}, {profile.age}</h2>
              {profile.lastActive === "now" && (
                <span className="w-2 h-2 rounded-full bg-green-500" />
              )}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span>{profile.college}</span>
              <span>•</span>
              <span>{profile.distance} miles away</span>
            </div>
          </div>
        </div>
        
        {/* Profile details */}
        <div className={cn(
          "p-4 transition-all overflow-hidden",
          showDetails ? "opacity-100" : "opacity-100"
        )}>
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-gray-600 font-medium">{profile.major}</p>
              <p className="text-gray-500">{profile.year}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
              className="text-vimate-purple"
            >
              {expanded ? "Show less" : "Show more"}
            </Button>
          </div>
          
          <p className={cn(
            "text-gray-700 mb-3 overflow-hidden transition-all",
            expanded ? "line-clamp-none" : "line-clamp-2"
          )}>
            {profile.bio}
          </p>
          
          {/* Interests */}
          <div className={cn(
            "flex flex-wrap gap-2 mb-3",
            (expanded || showDetails) ? "block" : "hidden"
          )}>
            {profile.interests.map((interest, index) => (
              <Badge key={index} variant="secondary" className="bg-vimate-purple/10 text-vimate-purple">
                {interest}
              </Badge>
            ))}
          </div>
          
          {/* Social media links - shown when details are expanded */}
          {(showDetails && (profile.instagram || profile.snapchat)) && (
            <div className="mt-4 mb-3">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Social Profiles</h3>
              <div className="flex gap-3">
                {profile.instagram && (
                  <a href={`https://instagram.com/${profile.instagram}`} target="_blank" rel="noopener noreferrer" className="text-purple-600 flex items-center gap-1 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                    </svg>
                    @{profile.instagram}
                  </a>
                )}
                {profile.snapchat && (
                  <a href={`https://snapchat.com/add/${profile.snapchat}`} target="_blank" rel="noopener noreferrer" className="text-yellow-500 flex items-center gap-1 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M15.943 11.526c-.073-.155-.171-.354-.292-.571-.021-.039-.047-.07-.075-.11-.076-.131-.148-.252-.233-.381-.185-.277-.4-.574-.7-.938a5.35 5.35 0 0 1-.173-.23c-.284-.391-.56-.703-.929-.995a4.87 4.87 0 0 0-.574-.38c-.227-.126-.445-.21-.674-.294a4.33 4.33 0 0 0-.696-.209 6.05 6.05 0 0 0-.656-.097 8.81 8.81 0 0 0-.303-.013 1.53 1.53 0 0 1-.102-.01 1.74 1.74 0 0 1-.81-.28c-.223-.163-.383-.416-.421-.812-.041-.426.027-.773.138-1.069a3.91 3.91 0 0 1 .266-.562c.045-.082.09-.159.118-.222.114-.24.214-.564.214-1.122 0-.153-.023-.32-.058-.494-.099-.469-.244-.75-.375-.91-.099-.126-.205-.199-.317-.26-.153-.086-.32-.094-.475-.09-.12.003-.235.009-.344.028-.56.1-1.095.44-1.34.874-.08.145-.12.287-.131.405-.103.96-.159 1.841-.165 2.447a1.96 1.96 0 0 1-.026.417c-.04.16-.104.294-.207.425-.195.252-.431.362-.656.376-.142.01-.276 0-.388-.038a1.36 1.36 0 0 1-.153-.065c-.135-.075-.306-.17-.577-.298a9.76 9.76 0 0 0-.892-.37c-.595-.203-1.2-.305-1.8-.305-.683 0-1.295.14-1.881.413a5.62 5.62 0 0 0-1.548 1.171c-.156.167-.318.346-.5.559-.142.168-.326.382-.592.654-.266.273-.453.465-.566.574a3.08 3.08 0 0 0-.136.137 5.37 5.37 0 0 0-.738.95c-.08.143-.142.287-.186.444-.067.234-.104.494-.117.78a1.95 1.95 0 0 0 .061.543c.049.184.175.347.25.48.114.194.232.48.376.81.234.535.42.892.597 1.178.062.1.126.194.195.285.129.181.356.474.5.692l.163.255.01.02c.078.108.16.22.25.354a2.33 2.33 0 0 1 .23.598c.012.122.003.224-.035.359a1.23 1.23 0 0 1-.281.524c-.273.31-.618.448-1.099.448-.172 0-.36-.028-.568-.084a5.13 5.13 0 0 1-.706-.213 10.15 10.15 0 0 0-.584-.17 2.96 2.96 0 0 0-.278-.052 2.59 2.59 0 0 0-.343-.014 3.53 3.53 0 0 0-.593.08 3.07 3.07 0 0 0-.747.288c-.35.192-.654.454-.93.789-.170.207-.33.378-.518.611a9.21 9.21 0 0 1-.305.33 10.88 10.88 0 0 0-.595.706c-.355.474-.394.53-.563.883-.178.355-.263.542-.294.865-.026.259.006.542.082.84.31 1.21 1.382 2.239 2.991 2.887 1.301.526 2.889.787 4.72.787 1.773 0 3.335-.27 4.616-.795 1.589-.562 2.634-1.606 2.927-2.938.056-.206.092-.379.114-.56.055-.353.06-.713.013-1.09-.027-.182-.066-.393-.12-.614-.03-.111-.072-.27-.12-.41a2.51 2.51 0 0 0-.068-.172zm-14.26.152c.095-.34.146-.534.139-.793-.007-.289-.101-.536-.256-.668a.45.45 0 0 0-.241-.081.88.88 0 0 0-.15.012c-.05.009-.117.028-.193.058-.18.065-.276.13-.353.186-.12.086-.193.177-.237.288a1.29 1.29 0 0 0-.087.396 2.61 2.61 0 0 0 .045.46c.012.072.035.175.075.312a2.48 2.48 0 0 0 .195.484c.149.294.355.514.635.649.156.075.287.107.41.107a.55.55 0 0 0 .25-.056c.12-.067.195-.182.217-.33a1.71 1.71 0 0 0-.151-1.024zm1.312.947c.142.096.32.152.529.152.152 0 .325-.036.518-.107.196-.073.39-.18.583-.32.244-.171.462-.256.687-.281a.74.74 0 0 1 .206.005c.067.01.167.037.3.08.133.041.258.082.374.12.252.083.488.127.714.127.225 0 .406-.092.54-.279a.85.85 0 0 0 .168-.29 1.49 1.49 0 0 0 .041-.33 2.32 2.32 0 0 0-.022-.445 2.09 2.09 0 0 0-.085-.396 1.95 1.95 0 0 0-.548-.861c-.273-.24-.661-.39-1.027-.39-.271 0-.499.064-.716.199a1.29 1.29 0 0 0-.241.171c-.061.055-.144.083-.23.083-.104 0-.211-.05-.334-.155a1.33 1.33 0 0 0-.145-.099c-.044-.026-.108-.062-.186-.098a2.71 2.71 0 0 0-.575-.17 2.2 2.2 0 0 0-.43-.022c-.273.008-.516.063-.73.166-.211.107-.365.255-.451.438a1.05 1.05 0 0 0-.076.259c-.021.135-.019.252.007.36.055.344.305.635.619.845z"/>
                    </svg>
                    @{profile.snapchat}
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Action buttons */}
        <div className={cn(
          "absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4 px-4 transition-opacity",
          showDetails && "opacity-0 pointer-events-none"
        )}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="w-12 h-12 rounded-full border-red-400 text-red-400 hover:bg-red-50 hover:text-red-500 hover:border-red-500 shadow-sm"
                  onClick={(e) => { e.stopPropagation(); onDislike(); }}
                >
                  <X className="w-6 h-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Dislike</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="w-14 h-14 rounded-full border-vimate-purple bg-white text-vimate-purple hover:bg-vimate-purple/10 shadow-sm"
                  onClick={handleSuperLike}
                >
                  <Star className="w-7 h-7 fill-vimate-purple text-vimate-purple" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Super Like</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="w-12 h-12 rounded-full border-green-400 text-green-400 hover:bg-green-50 hover:text-green-500 hover:border-green-500 shadow-sm"
                  onClick={(e) => { e.stopPropagation(); onLike(); }}
                >
                  <Heart className="w-6 h-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Like</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {/* Info button to show details */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                className={cn(
                  "absolute top-3 right-3 w-8 h-8 rounded-full text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm border-0 transition-opacity",
                  showDetails && "opacity-0 pointer-events-none"
                )}
                onClick={(e) => { e.stopPropagation(); setShowDetails(true); }}
              >
                <Info className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View profile details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Like/Dislike overlays */}
        {offsetX > 50 && (
          <div className="absolute top-1/4 left-4 transform -rotate-12 border-4 border-green-500 rounded-lg p-2 bg-green-100/80 backdrop-blur-sm">
            <span className="text-green-600 font-bold text-3xl">LIKE</span>
          </div>
        )}
        {offsetX < -50 && (
          <div className="absolute top-1/4 right-4 transform rotate-12 border-4 border-red-500 rounded-lg p-2 bg-red-100/80 backdrop-blur-sm">
            <span className="text-red-600 font-bold text-3xl">NOPE</span>
          </div>
        )}

        {/* Message button (shows when details are expanded) */}
        {(showDetails && onMessage) && (
          <Button 
            className="absolute bottom-4 right-4 bg-gradient-to-r from-vimate-purple to-vimate-orange hover:opacity-90"
            onClick={(e) => { 
              e.stopPropagation(); 
              if (onMessage) onMessage(); 
              setShowDetails(false); 
            }}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Message
          </Button>
        )}
      </motion.div>
    </div>
  );
};

export default ProfileCard;
