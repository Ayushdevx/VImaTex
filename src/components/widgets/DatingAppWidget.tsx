import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Sparkles, Users, ArrowRight } from "lucide-react";
import "./datingWidget.css"; // Import the CSS

export function DatingAppWidget() {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-vimate-purple" />
        
        {/* Floating hearts animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <Heart
              key={i}
              className={`absolute text-white/20 animate-float heart-${i}`}
              style={{
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 90}%`,
                fontSize: `${Math.random() * 20 + 10}px`,
              }}
            />
          ))}
        </div>
        
        {/* Content */}
        <CardContent className="relative z-10 p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Image collage */}
            <div className="flex-shrink-0 relative w-48 h-48">
              <div className="absolute top-0 left-0 w-36 h-36 rounded-lg overflow-hidden border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                  alt="Dating profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 rounded-lg overflow-hidden border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                  alt="Dating profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2">
                <Heart className="h-8 w-8 text-vimate-purple" />
              </div>
            </div>
            
            {/* Text content */}
            <div className="flex-1 text-white">
              <Badge className="bg-white/20 text-white border-0 mb-2">
                <Sparkles className="h-3 w-3 mr-1" />
                New & Improved
              </Badge>
              <h3 className="text-2xl font-bold mb-2">
                VImaTe Dating
              </h3>
              <p className="text-white/90 mb-4">
                Find meaningful connections within the VIT community. Our enhanced dating app helps you match with people who share your interests, courses, and campus life.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="bg-white/10 px-3 py-1.5 rounded-full text-sm flex items-center">
                  <Users className="h-4 w-4 mr-1.5" />
                  500+ active students
                </div>
                <div className="bg-white/10 px-3 py-1.5 rounded-full text-sm">
                  Campus-exclusive
                </div>
              </div>
              <Button 
                className="bg-white text-vimate-purple hover:bg-white/90"
                size="lg"
                asChild
              >
                <Link to="/dating-app">
                  Explore Dating App
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
      
      {/* Bottom section with avatars */}
      <div className="bg-gradient-to-r from-vimate-purple/10 to-pink-500/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {[...Array(5)].map((_, i) => (
              <Avatar key={i} className="border-2 border-white w-8 h-8">
                <AvatarImage src={`https://i.pravatar.cc/100?img=${i + 10}`} />
                <AvatarFallback>VT</AvatarFallback>
              </Avatar>
            ))}
            <div className="w-8 h-8 rounded-full bg-vimate-purple/10 border-2 border-white flex items-center justify-center text-xs font-medium text-vimate-purple">
              50+
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-vimate-purple">78%</span> of users found meaningful connections
          </p>
        </div>
      </div>
    </Card>
  );
} 