import React from 'react';
import { Layout } from "@/components/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Youtube, FileText, Brain } from "lucide-react";
import YouTubeToSlides from '@/components/youtube/YouTubeToSlides';

const StudyTools = () => {
  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Study Tools</h1>
          <p className="text-muted-foreground">
            Tools to enhance your learning experience and improve productivity
          </p>
        </div>

        <Tabs defaultValue="youtube-to-slides" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="youtube-to-slides" className="flex items-center space-x-2">
              <Youtube className="h-4 w-4" />
              <span>YouTube to Notes</span>
            </TabsTrigger>
            <TabsTrigger value="flashcards" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Flashcards</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Smart Notes</span>
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>AI Quizzes</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="youtube-to-slides" className="p-0">
            <YouTubeToSlides />
          </TabsContent>
          
          <TabsContent value="flashcards">
            <Card>
              <CardHeader>
                <CardTitle>Flashcards</CardTitle>
                <CardDescription>
                  Create and study flashcards to help memorize important concepts
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <p className="text-center text-muted-foreground">
                  Flashcards feature coming soon!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle>Smart Notes</CardTitle>
                <CardDescription>
                  Take notes with AI-powered suggestions and organization
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <p className="text-center text-muted-foreground">
                  Smart Notes feature coming soon!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="quizzes">
            <Card>
              <CardHeader>
                <CardTitle>AI Quizzes</CardTitle>
                <CardDescription>
                  Generate quizzes from your study materials to test your knowledge
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <p className="text-center text-muted-foreground">
                  AI Quizzes feature coming soon!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StudyTools; 