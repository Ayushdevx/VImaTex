import React from 'react';
import {
  GraduationCap, MapPin, BookOpen, Clock, Sparkles, 
  Layers, Coffee, Users, CheckCircle, X, 
  Shield, Instagram, Twitter, Linkedin, Link, Heart
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileData } from '@/components/cards/ProfileCard';
import { CompatibilityScore } from './CompatibilityScore';

interface SocialLink {
  platform: 'instagram' | 'twitter' | 'linkedin' | 'other';
  username: string;
  url: string;
}

interface CollegeClass {
  code: string;
  name: string;
  professor?: string;
}

export interface CollegeProfileData extends ProfileData {
  department?: string;
  classYear?: string;
  gpa?: number;
  clubs?: string[];
  classes?: CollegeClass[];
  studyLocations?: string[];
  lookingFor?: string[];
  verifiedStudent?: boolean;
  verifiedEmail?: boolean;
  socialLinks?: SocialLink[];
}

interface CollegeDatingProfileProps {
  profile: CollegeProfileData;
  userProfile?: Partial<CollegeProfileData>;
  onActionButtonClick?: (action: 'like' | 'dislike' | 'message', profile: CollegeProfileData) => void;
  expanded?: boolean;
}

export const CollegeDatingProfile: React.FC<CollegeDatingProfileProps> = ({
  profile,
  userProfile,
  onActionButtonClick,
  expanded = true,
}) => {
  // Helper function for social icon
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />;
      default:
        return <Link className="h-4 w-4" />;
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img 
          src={profile.images?.[0]} 
          alt={profile.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Verification badges */}
        <div className="absolute top-2 right-2 space-y-2">
          {profile.verifiedStudent && (
            <Badge className="bg-blue-500 flex items-center gap-1">
              <GraduationCap className="h-3 w-3" /> Verified Student
            </Badge>
          )}
          {profile.verifiedEmail && (
            <Badge className="bg-green-500 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" /> Email Verified
            </Badge>
          )}
        </div>
        
        {/* Compatibility score */}
        {userProfile && (
          <div className="absolute top-2 left-2">
            <CompatibilityScore 
              userProfile={userProfile} 
              matchProfile={profile} 
              size="md"
            />
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4">
          <div className="flex justify-between items-end">
            <div className="text-white">
              <h2 className="text-2xl font-bold flex items-center gap-1">
                {profile.name}, {profile.age}
              </h2>
              <div className="flex items-center text-white/90 mt-1">
                <GraduationCap className="h-4 w-4 mr-1" />
                {profile.major}
                {profile.year && (
                  <Badge variant="outline" className="ml-2 text-xs bg-white/20 border-0 text-white">
                    {profile.year}
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-white/90">
                <MapPin className="h-4 w-4 mr-1" />
                {profile.distance} km away
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {expanded && (
        <CardContent className="p-4">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="academics">Academics</TabsTrigger>
              <TabsTrigger value="interests">Interests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Bio</h3>
                <p className="text-sm text-muted-foreground">{profile.bio}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Looking for</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.lookingFor?.map((item, i) => (
                    <Badge key={i} variant="outline">
                      {item}
                    </Badge>
                  ))}
                  {!profile.lookingFor?.length && (
                    <p className="text-sm text-muted-foreground">No preferences specified</p>
                  )}
                </div>
              </div>
              
              {profile.socialLinks?.length ? (
                <div>
                  <h3 className="font-medium mb-2">Social Media</h3>
                  <div className="flex gap-3">
                    {profile.socialLinks.map((link, i) => (
                      <a 
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                      >
                        {getSocialIcon(link.platform)}
                        <span>{link.username}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </TabsContent>
            
            <TabsContent value="academics" className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Department</h3>
                <p className="text-sm text-muted-foreground">
                  {profile.department || profile.major || 'Not specified'}
                </p>
              </div>
              
              {profile.classes?.length ? (
                <div>
                  <h3 className="font-medium mb-2">Current Classes</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {profile.classes.map((cls, i) => (
                      <div key={i} className="text-sm flex items-start">
                        <BookOpen className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                        <div>
                          <div className="font-medium">{cls.code}</div>
                          <div className="text-muted-foreground">{cls.name}</div>
                          {cls.professor && (
                            <div className="text-xs text-muted-foreground">Prof. {cls.professor}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              
              {profile.studyLocations?.length ? (
                <div>
                  <h3 className="font-medium mb-2">Favorite Study Spots</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.studyLocations.map((location, i) => (
                      <Badge key={i} variant="secondary" className="bg-blue-50">
                        <MapPin className="h-3 w-3 mr-1 text-blue-500" />
                        {location}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}
            </TabsContent>
            
            <TabsContent value="interests" className="space-y-4">
              {profile.interests?.length ? (
                <div>
                  <h3 className="font-medium mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, i) => (
                      <Badge key={i} variant="outline">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}
              
              {profile.clubs?.length ? (
                <div>
                  <h3 className="font-medium mb-2">Campus Clubs</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.clubs.map((club, i) => (
                      <Badge key={i} variant="secondary" className="bg-green-50">
                        <Users className="h-3 w-3 mr-1 text-green-500" />
                        {club}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}
            </TabsContent>
          </Tabs>
        </CardContent>
      )}
      
      {expanded && onActionButtonClick && (
        <CardFooter className="bg-muted/10 p-4 flex items-center justify-between">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onActionButtonClick('dislike', profile)}
            className="rounded-full h-10 w-10 border-gray-300"
          >
            <X className="h-5 w-5 text-gray-500" />
          </Button>
          
          <Button
            onClick={() => onActionButtonClick('message', profile)}
            className="text-white px-6"
          >
            Message
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => onActionButtonClick('like', profile)}
            className="rounded-full h-10 w-10 border-pink-300 bg-pink-50"
          >
            <Heart className="h-5 w-5 text-pink-500" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};