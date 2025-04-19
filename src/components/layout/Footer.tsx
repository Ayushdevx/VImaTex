import React from "react";
import { Heart, Mail, Github, Instagram, Send, Youtube, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("border-t bg-background", className)}>
      <div className="container px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/vimate-preview.svg" alt="VImaTe" className="h-6 w-6" />
              <span className="font-semibold">VImaTe Connect</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              The ultimate app for VIT students to connect, collaborate and make the most of campus life.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="hover:text-blue-500">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-red-500">
                <Youtube className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-blue-400">
                <Send className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-slate-800">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Academic Calendar
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Campus Map
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Hostel Information
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  VTOP Portal
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Student Handbook
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Safety Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Report an Issue
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Get in Touch</h3>
            <div className="space-y-3 text-sm">
              <p className="flex items-start">
                <Mail className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <span className="text-muted-foreground">support@vimateconnect.ac.in</span>
              </p>
              <a 
                href="#" 
                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                Join VImaTe Community
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </a>
              <div className="pt-2">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="flex items-center gap-1.5"
                >
                  <Heart className="h-3.5 w-3.5" />
                  Download App
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-4 border-t text-xs text-muted-foreground">
          <p>© {currentYear} VImaTe Connect. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Made with 💜 for VIT Chennai students</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 