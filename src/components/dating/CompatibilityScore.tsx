import React, { useMemo } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Sparkles, PuzzlePiece, BookOpen, Coffee, Users } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ProfileData } from '@/components/cards/ProfileCard';

interface CompatibilityScoreProps {
  userProfile: Partial<ProfileData>;
  matchProfile: ProfileData;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

// Categories for compatibility scores
export type CompatibilityResult = {
  overall: number;
  academic: number;
  interests: number;
  social: number;
  proximity: number;
};

export const CompatibilityScore: React.FC<CompatibilityScoreProps> = ({
  userProfile,
  matchProfile,
  size = 'md',
  showDetails = false,
}) => {
  // Calculate compatibility based on various factors
  const compatibility = useMemo<CompatibilityResult>(() => {
    // Academic compatibility (major, year, college)
    let academic = 50; // baseline
    if (userProfile.major && matchProfile.major) {
      // Same major = high compatibility
      if (userProfile.major === matchProfile.major) academic += 30;
      // Related fields = medium compatibility (simplified)
      else if (
        (userProfile.major.includes('Computer') && matchProfile.major.includes('Computer')) ||
        (userProfile.major.includes('Business') && matchProfile.major.includes('Business')) ||
        (userProfile.major.includes('Art') && matchProfile.major.includes('Art')) ||
        (userProfile.major.includes('Science') && matchProfile.major.includes('Science'))
      ) {
        academic += 15;
      }
    }
    
    // Year compatibility
    if (userProfile.year && matchProfile.year) {
      if (userProfile.year === matchProfile.year) academic += 20;
    }
    
    // Interest compatibility
    let interests = 0;
    if (userProfile.interests && matchProfile.interests) {
      const commonInterests = matchProfile.interests.filter(interest => 
        userProfile.interests?.includes(interest)
      ).length;
      interests = Math.min(100, (commonInterests / Math.max(1, matchProfile.interests.length)) * 100);
    } else {
      interests = 50; // default if no interests are specified
    }
    
    // Social compatibility (more elaborate algorithms would be used in real app)
    // For now, randomize but make it consistent for the same pair
    const socialSeed = (userProfile.name?.charCodeAt(0) ?? 0) + (matchProfile.name?.charCodeAt(0) ?? 0);
    const social = Math.min(100, 50 + (socialSeed % 50));
    
    // Proximity compatibility (closer = better)
    const proximity = Math.max(0, 100 - (matchProfile.distance * 10));
    
    // Overall weighted average
    const overall = Math.round(
      (academic * 0.3) + (interests * 0.4) + (social * 0.2) + (proximity * 0.1)
    );
    
    return {
      overall,
      academic,
      interests,
      social,
      proximity
    };
  }, [userProfile, matchProfile]);
  
  // Size mapping
  const sizeMap = {
    sm: {
      width: 40,
      fontSize: 'text-xs',
      padding: 'p-1',
    },
    md: {
      width: 60,
      fontSize: 'text-sm',
      padding: 'p-2',
    },
    lg: {
      width: 80,
      fontSize: 'text-base',
      padding: 'p-3',
    },
  };
  
  // Color based on score
  const getCompatibilityColor = (score: number) => {
    if (score >= 85) return '#10b981'; // emerald-500
    if (score >= 70) return '#22c55e'; // green-500
    if (score >= 55) return '#eab308'; // yellow-500
    if (score >= 40) return '#f97316'; // orange-500
    return '#ef4444'; // red-500
  };

  return (
    <div className={`flex ${showDetails ? 'flex-col items-center' : 'items-center'} ${sizeMap[size].padding}`}>
      <div style={{ width: sizeMap[size].width, height: sizeMap[size].width }}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CircularProgressbar
                value={compatibility.overall}
                text={`${compatibility.overall}%`}
                styles={buildStyles({
                  textSize: '28px',
                  pathColor: getCompatibilityColor(compatibility.overall),
                  textColor: getCompatibilityColor(compatibility.overall),
                  trailColor: '#e5e7eb',
                })}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-medium">Overall Compatibility</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {showDetails && (
        <div className="mt-3 grid grid-cols-2 gap-2 w-full">
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1 text-blue-500" />
            <span className={`${sizeMap[size].fontSize}`}>Academic: {compatibility.academic}%</span>
          </div>
          <div className="flex items-center">
            <Coffee className="h-4 w-4 mr-1 text-orange-500" />
            <span className={`${sizeMap[size].fontSize}`}>Interests: {compatibility.interests}%</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-violet-500" />
            <span className={`${sizeMap[size].fontSize}`}>Social: {compatibility.social}%</span>
          </div>
          <div className="flex items-center">
            <PuzzlePiece className="h-4 w-4 mr-1 text-green-500" />
            <span className={`${sizeMap[size].fontSize}`}>Proximity: {compatibility.proximity}%</span>
          </div>
        </div>
      )}
    </div>
  );
};