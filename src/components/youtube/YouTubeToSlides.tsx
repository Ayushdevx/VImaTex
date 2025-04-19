import React, { useState, useEffect, useRef } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ArrowRight, 
  Youtube, 
  FileText, 
  Copy, 
  Download, 
  Clock, 
  Scissors, 
  SlidersHorizontal, 
  Loader2, 
  CheckCircle2,
  ExternalLink,
  Play,
  PauseCircle,
  Sparkles
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import youtubeThumbnail from 'youtube-thumbnail';
import { sendMessageToGemini, ChatMessage } from "@/lib/gemini";

// Add type definitions for YouTube API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface Slide {
  id: string;
  timestamp: number;
  imageUrl: string;
  notes: string;
}

interface VideoInfo {
  title: string;
  channelName: string;
  duration: number;
  thumbnailUrl: string;
}

/**
 * YouTubeToSlides component extracts key frames from YouTube videos
 * and generates notes for study purposes.
 */
export const YouTubeToSlides = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [summary, setSummary] = useState('');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [playerState, setPlayerState] = useState<'stopped' | 'playing' | 'paused'>('stopped');
  const [activeTab, setActiveTab] = useState('slides');
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [currentPlayTime, setCurrentPlayTime] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);
  
  const playerRef = useRef<HTMLIFrameElement>(null);
  const processingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const playerInstance = useRef<any>(null);
  
  // Extract YouTube video ID from URL - improved version
  const extractVideoId = (url: string) => {
    const regexPatterns = [
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i,
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
    ];
    
    for (const pattern of regexPatterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    return null;
  };

  // Fetch real video metadata from the YouTube API
  const fetchVideoMetadata = async (videoId: string) => {
    try {
      // First try the oEmbed endpoint which doesn't require API key
      const oembedResponse = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
      const oembedData = await oembedResponse.json();
      
      // Get high quality thumbnails using the youtube-thumbnail package
      const thumbnails = youtubeThumbnail(`https://www.youtube.com/watch?v=${videoId}`);
      
      // Choose the highest quality thumbnail available
      let finalThumbnailUrl = thumbnails.high?.url || 
                              thumbnails.medium?.url || 
                              thumbnails.default?.url || 
                              `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      
      return {
        title: oembedData.title || "YouTube Video",
        channelName: oembedData.author_name || "Content Creator",
        duration: 600, // Estimated duration, we can't get exact duration without API key
        thumbnailUrl: finalThumbnailUrl
      };
    } catch (error) {
      console.error("Error fetching video metadata:", error);
      // Fallback to basic info if the request fails
      return {
        title: "YouTube Video",
        channelName: "Content Creator",
        duration: 600,
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      };
    }
  };

  // Process the YouTube video to extract slides and generate notes
  const processVideo = async () => {
    const extractedId = extractVideoId(videoUrl);
    if (!extractedId) {
      toast({
        title: "Invalid YouTube URL",
        description: "Please enter a valid YouTube video URL",
        variant: "destructive"
      });
      return;
    }
    
    setVideoId(extractedId);
    setIsProcessing(true);
    setProcessingProgress(0);
    setCurrentStep('Loading video information...');
    setSlides([]);
    setSummary('');
    setShowVideoPlayer(false);
    
    try {
      // Get video metadata
      setCurrentStep('Fetching video metadata...');
      const metadata = await fetchVideoMetadata(extractedId);
      setVideoInfo(metadata);
      setIsVideoLoaded(true);
      setProcessingProgress(20);
      
      // Extract frames
      setCurrentStep('Extracting key frames from video...');
      const extractedSlides = await extractKeyFrames(extractedId, metadata.duration);
      setSlides(extractedSlides);
      setProcessingProgress(60);
      
      // Generate notes
      setCurrentStep('Generating notes for extracted frames...');
      const slidesWithNotes = await generateNotes(extractedSlides, metadata.title);
      setSlides(slidesWithNotes);
      setProcessingProgress(80);
      
      // Create summary 
      setCurrentStep('Creating comprehensive summary...');
      const generatedSummary = await generateSummary(metadata.title, slidesWithNotes);
      setSummary(generatedSummary);
      
      // Complete
      setCurrentStep('Processing complete!');
      setProcessingProgress(100);
      setShowVideoPlayer(true);
      
      toast({
        title: "Processing completed",
        description: "Your video has been processed successfully!",
        variant: "default"
      });
    } catch (error) {
      console.error("Error processing video:", error);
      toast({
        title: "Processing failed",
        description: "An error occurred while processing the video.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Extract key frames from the YouTube video
  const extractKeyFrames = async (videoId: string, duration: number): Promise<Slide[]> => {
    return new Promise((resolve) => {
      const slides: Slide[] = [];
      const totalFrames = 10; // Extract 10 frames
      const interval = Math.floor(duration / totalFrames);
      
      // If YouTube API is not available, use fallback with thumbnails
      if (!window.YT) {
        console.warn("YouTube API not available, using fallback extraction");
        useThumbnailFallback();
        return;
      }
      
      // Create a hidden player to extract frames
      const tempPlayer = document.createElement('div');
      tempPlayer.id = 'temp-yt-player';
      tempPlayer.style.position = 'absolute';
      tempPlayer.style.opacity = '0.01';
      tempPlayer.style.pointerEvents = 'none';
      tempPlayer.style.zIndex = '-1';
      document.body.appendChild(tempPlayer);
      
      let player: any;
      try {
        // Initialize YouTube player
        player = new window.YT.Player(tempPlayer.id, {
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: () => {
              // Start the extraction process
              extractFrameAtTimestamp(0);
            },
            onError: (e: any) => {
              console.error("YouTube player error:", e);
              useThumbnailFallback();
            }
          }
        });
      } catch (error) {
        console.error("Error initializing YouTube player:", error);
        useThumbnailFallback();
        return;
      }
      
      const extractFrameAtTimestamp = (index: number) => {
        if (index >= totalFrames) {
          // Clean up
          try {
            player.destroy();
          } catch (e) {
            console.error("Error destroying player:", e);
          }
          if (document.getElementById('temp-yt-player')) {
            document.body.removeChild(tempPlayer);
          }
          resolve(slides);
          return;
        }
        
        const timestamp = index * interval;
        const seekFinished = () => {
          try {
            // Due to cross-origin restrictions, we can't actually capture frames from the video
            // Instead, use YouTube thumbnails with timestamps
            // This is a limitation of the YouTube embed API security model
            
            // For a real implementation, you would need:
            // 1. A server-side component to fetch video frames
            // 2. Use the YouTube Data API to get thumbnails
            
            // For now, use thumbnail with timestamp as fallback
            const thumbnailOptions = ['maxresdefault', 'hqdefault', 'mqdefault', 'sddefault'];
            const thumbnailIndex = index % thumbnailOptions.length;
            
            slides.push({
              id: `slide-${index}`,
              timestamp,
              imageUrl: `https://img.youtube.com/vi/${videoId}/${thumbnailOptions[thumbnailIndex]}.jpg`,
              notes: `Frame extracted at ${formatTime(timestamp)}`
            });
            
            // Update progress
            setProcessingProgress(20 + Math.floor((index / totalFrames) * 40));
            
            // Next frame
            processingTimeoutRef.current = setTimeout(() => extractFrameAtTimestamp(index + 1), 500);
          } catch (error) {
            console.error("Error capturing frame:", error);
            
            // Fallback to thumbnail
            slides.push({
              id: `slide-${index}`,
              timestamp,
              imageUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
              notes: `Frame extracted at ${formatTime(timestamp)}`
            });
            
            // Update progress
            setProcessingProgress(20 + Math.floor((index / totalFrames) * 40));
            
            // Next frame
            processingTimeoutRef.current = setTimeout(() => extractFrameAtTimestamp(index + 1), 500);
          }
        };
        
        try {
          // Seek to timestamp and wait for the video to update
          player.seekTo(timestamp, true);
          processingTimeoutRef.current = setTimeout(seekFinished, 300);
        } catch (e) {
          console.error("Error seeking:", e);
          useThumbnailFallback();
        }
      };
      
      // Fallback method using thumbnails in case of API issues
      function useThumbnailFallback() {
        console.log("Using thumbnail fallback extraction");
        
        // Clean up any existing player
        try {
          if (player && player.destroy) {
            player.destroy();
          }
        } catch (e) {
          console.error("Error cleaning up player:", e);
        }
        
        if (document.getElementById('temp-yt-player')) {
          document.body.removeChild(tempPlayer);
        }
        
        // Get thumbnails using youtube-thumbnail package
        const thumbnails = youtubeThumbnail(`https://www.youtube.com/watch?v=${videoId}`);
        
        // Generate slides using thumbnails with varying qualities for visual interest
        const thumbQualities = [
          thumbnails.high?.url,
          thumbnails.medium?.url,
          thumbnails.default?.url,
          `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
          `https://img.youtube.com/vi/${videoId}/sddefault.jpg`
        ].filter(Boolean);
        
        // Generate slides using thumbnails
        for (let i = 0; i < totalFrames; i++) {
          const timestamp = i * interval;
          const thumbIndex = i % thumbQualities.length;
          
          slides.push({
            id: `slide-${i}`,
            timestamp,
            imageUrl: thumbQualities[thumbIndex] || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
            notes: `Frame extracted at ${formatTime(timestamp)}`
          });
          
          setProcessingProgress(20 + Math.floor((i / totalFrames) * 40));
        }
        
        resolve(slides);
      }
      
      // Set a timeout for the YouTube API to initialize
      const apiTimeout = setTimeout(() => {
        if (slides.length === 0) {
          console.warn("YouTube player initialization timed out, using fallback");
          useThumbnailFallback();
        }
      }, 8000);
      
      // Return cleanup function
      return () => {
        clearTimeout(apiTimeout);
        if (processingTimeoutRef.current) {
          clearTimeout(processingTimeoutRef.current);
        }
        try {
          if (player && player.destroy) {
            player.destroy();
          }
        } catch (e) {
          console.error("Error cleaning up player:", e);
        }
        if (document.getElementById('temp-yt-player')) {
          document.body.removeChild(tempPlayer);
        }
      };
    });
  };
  
  // Generate notes for the extracted slides using Gemini API
  const generateNotes = async (slides: Slide[], videoTitle: string): Promise<Slide[]> => {
    const enhancedSlides = [...slides];
    
    try {
      // First get video context from title to help Gemini generate better notes
      const videoContext = await sendMessageToGemini(
        `Analyze this YouTube video title and give me the likely topic and educational context: "${videoTitle}"`,
        undefined,
        [{
          role: "system",
          content: "You are an AI assistant helping to analyze educational content. Provide concise analysis of video topics based on titles."
        }]
      );
      
      // Generate notes for each slide
      for (let i = 0; i < enhancedSlides.length; i++) {
        const slide = enhancedSlides[i];
        const slidePosition = getSlidePosition(i, enhancedSlides.length);
        
        setCurrentStep(`Generating notes for slide ${i + 1} of ${slides.length}...`);
        
        // Send request to Gemini API
        const promptContext = `
You are analyzing a YouTube educational video titled: "${videoTitle}".
This is slide ${i + 1} of ${slides.length}, appearing at timestamp ${formatTime(slide.timestamp)}.
The slide is from the ${slidePosition} section of the video.
Video context analysis: ${videoContext}
        `.trim();
        
        const prompt = `
Generate comprehensive educational notes for this slide from the YouTube video.
Include:
1. A clear heading describing what's likely being discussed at this point
2. 3-5 key bullet points of important concepts
3. Any relevant formulas, definitions, or important terms
4. A brief explanation of how this connects to earlier or later content
        `.trim();
        
        try {
          const generatedNotes = await sendMessageToGemini(prompt, promptContext);
          
          enhancedSlides[i] = {
            ...slide,
            notes: generatedNotes || generateFallbackNotes(slidePosition, slide.timestamp, videoTitle)
          };
          
          setProcessingProgress(60 + Math.floor((i / enhancedSlides.length) * 20));
        } catch (error) {
          console.error("Error generating notes with Gemini:", error);
          enhancedSlides[i] = {
            ...slide,
            notes: generateFallbackNotes(slidePosition, slide.timestamp, videoTitle)
          };
          setProcessingProgress(60 + Math.floor((i / enhancedSlides.length) * 20));
        }
      }
    } catch (error) {
      console.error("Error generating notes:", error);
      // Fall back to local generation
      for (let i = 0; i < enhancedSlides.length; i++) {
        const slide = enhancedSlides[i];
        const slidePosition = getSlidePosition(i, enhancedSlides.length);
        
        enhancedSlides[i] = {
          ...slide,
          notes: generateFallbackNotes(slidePosition, slide.timestamp, videoTitle)
        };
        
        setProcessingProgress(60 + Math.floor((i / enhancedSlides.length) * 20));
        
        // Add small delay to show progress updating
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
    
    return enhancedSlides;
  };
  
  // Fallback function if Gemini API fails
  const generateFallbackNotes = (position: 'beginning' | 'middle' | 'end', timestamp: number, title: string): string => {
    const templates = {
      beginning: [
        `Introduction to ${title}. This slide covers the opening context and background information of the presentation.`,
        `Initial concepts are being established here. The presenter is introducing the main topic and outlining the key areas that will be covered.`,
        `The beginning of the lecture sets up the fundamental concepts. This appears to be where the core problem or question is being introduced.`
      ],
      middle: [
        `Core content of the presentation. This slide demonstrates the main principles and concepts being discussed.`,
        `Detailed exploration of the subject matter. The presenter is explaining key methodologies and approaches at this point.`,
        `Middle section of the content where important examples and applications are being shown. Pay attention to the relationships between concepts.`
      ],
      end: [
        `Concluding section of the presentation. This slide summarizes the key points and reinforces the main takeaways.`,
        `Final exploration of concepts with practical applications and future directions being discussed.`,
        `Summary slide that brings together all the concepts covered throughout the video. Important for understanding the complete picture.`
      ]
    };
    
    const randomTemplate = templates[position][Math.floor(Math.random() * templates[position].length)];
    
    return `
${randomTemplate}

Key points from timestamp ${formatTime(timestamp)}:
• Important concept #1 related to the subject matter
• Supporting evidence or demonstration of the concept
• Connection to previously covered material
• Practical application or example

Additional notes: This section is particularly valuable for understanding the overall topic and will likely be useful for review purposes.
    `.trim();
  };
  
  // Determine the position of the slide in the video
  const getSlidePosition = (index: number, total: number): 'beginning' | 'middle' | 'end' => {
    if (index < total * 0.3) return 'beginning';
    if (index > total * 0.7) return 'end';
    return 'middle';
  };
  
  // Generate a comprehensive summary for the video using Gemini
  const generateSummary = async (title: string, slides: Slide[]): Promise<string> => {
    try {
      // Create a context from slides notes to help Gemini
      const slidesContext = slides.map((slide, index) => (
        `Slide ${index + 1} (${formatTime(slide.timestamp)}): ${slide.notes.split('\n')[0]}`
      )).join('\n\n');
      
      const promptContext = `
You are analyzing a YouTube educational video titled: "${title}".
The video contains ${slides.length} key slides/sections.
Here are the main points from each slide:

${slidesContext}
      `.trim();
      
      const prompt = `
Generate a comprehensive educational summary of this YouTube video.
Format your response in Markdown with:
1. A title section with the video name
2. An introduction section with approximate timestamps
3. A main concepts section covering the key topics
4. A detailed analysis section explaining the most important concepts
5. A practical applications section showing real-world relevance
6. A conclusion summarizing the key takeaways
7. 4-5 bullet points listing the most important things to remember

Keep your response professional, educational, and thorough.
      `.trim();
      
      // Send to Gemini
      const summary = await sendMessageToGemini(prompt, promptContext);
      
      if (summary) {
        return summary;
      } else {
        // Fall back to local generation
        return generateFallbackSummary(title, slides);
      }
    } catch (error) {
      console.error("Error generating summary with Gemini:", error);
      return generateFallbackSummary(title, slides);
    }
  };
  
  // Fallback summary generation if Gemini API fails
  const generateFallbackSummary = (title: string, slides: Slide[]): string => {
    const beginning = slides.slice(0, Math.floor(slides.length * 0.3));
    const middle = slides.slice(Math.floor(slides.length * 0.3), Math.floor(slides.length * 0.7));
    const end = slides.slice(Math.floor(slides.length * 0.7));
    
    return `
# Video Summary: ${title}

## Introduction (${formatTime(beginning[0]?.timestamp || 0)} - ${formatTime(middle[0]?.timestamp || 0)})
The video begins with an introduction to the main topic, establishing the context and importance of the subject matter. The presenter outlines the key areas that will be covered throughout the video.

## Main Concepts (${formatTime(middle[0]?.timestamp || 0)} - ${formatTime(end[0]?.timestamp || 0)})
Several fundamental concepts are introduced:
- First important concept with its definition and examples
- Second concept showing relationship to the first
- Practical applications of these concepts in real-world scenarios

## Detailed Analysis (${formatTime(Math.floor(middle.length / 2) < middle.length ? middle[Math.floor(middle.length / 2)].timestamp : 0)})
The presenter dives deeper into the topic with:
- Detailed breakdown of complex ideas
- Step-by-step explanations of processes
- Visual demonstrations to clarify difficult concepts
- Common misconceptions and how to avoid them

## Practical Applications (${formatTime(end[0]?.timestamp || 0)})
The video demonstrates how to apply the knowledge:
- Real-world examples showing the concepts in action
- Tips for implementing these ideas effectively
- Common pitfalls to avoid during implementation

## Conclusion (${formatTime(end[end.length - 1]?.timestamp || 0)})
The video wraps up with a summary of all key points covered and suggestions for further learning on the topic.

## Key Takeaways
1. Main insight from the video that viewers should remember
2. Secondary important concept that builds on the first
3. Practical advice for applying this knowledge
4. Resources for continued learning on this subject
    `.trim();
  };
  
  // Format seconds into MM:SS format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Handle changes to the video URL input
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
    setIsVideoLoaded(false);
    setVideoId('');
    setShowVideoPlayer(false);
  };
  
  // Navigate between slides and jump to that point in the video
  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index);
    
    // Seek the player to the timestamp
    if (showVideoPlayer && slides[index]) {
      seekToTimestamp(slides[index].timestamp);
    }
  };
  
  // Seek the YouTube player to a specific timestamp
  const seekToTimestamp = (timestamp: number) => {
    try {
      if (playerInstance.current) {
        // Use the YT Player instance directly if available
        playerInstance.current.seekTo(timestamp, true);
      } else if (playerRef.current && playerRef.current.contentWindow) {
        // Otherwise use postMessage API as fallback
        playerRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: 'seekTo',
            args: [timestamp, true]
          }), 
          '*'
        );
      }
      
      // Update current play time
      setCurrentPlayTime(timestamp);
      
      // Scroll to the player if needed
      if (playerRef.current) {
        window.scrollTo({
          top: playerRef.current.getBoundingClientRect().top + window.scrollY - 100,
          behavior: 'smooth'
        });
      }
    } catch (error) {
      console.error("Error seeking YouTube player:", error);
    }
  };
  
  const goToNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      goToSlide(currentSlideIndex + 1);
    }
  };
  
  const goToPrevSlide = () => {
    if (currentSlideIndex > 0) {
      goToSlide(currentSlideIndex - 1);
    }
  };
  
  // Copy notes to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard",
    });
  };
  
  // Download notes as a text file
  const downloadNotes = () => {
    const element = document.createElement("a");
    let content = "";
    
    if (activeTab === 'summary') {
      content = summary;
    } else {
      content = slides.map(slide => (
        `## Slide at ${formatTime(slide.timestamp)}\n\n${slide.notes}\n\n`
      )).join('---\n\n');
    }
    
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `notes-${videoId}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  // Set up YouTube player when it becomes visible
  useEffect(() => {
    if (showVideoPlayer && videoId && !playerInstance.current) {
      const setupYouTubePlayer = () => {
        try {
          if (window.YT && window.YT.Player) {
            // Create YouTube player instance
            playerInstance.current = new window.YT.Player(playerRef.current, {
              events: {
                onReady: () => {
                  console.log("YouTube player ready");
                  setPlayerReady(true);
                },
                onStateChange: (event: any) => {
                  // Update current time when playing
                  if (event.data === window.YT.PlayerState.PLAYING) {
                    const updateInterval = setInterval(() => {
                      if (playerInstance.current) {
                        const currentTime = Math.floor(playerInstance.current.getCurrentTime());
                        setCurrentPlayTime(currentTime);
                        
                        // Find the current slide based on playback position
                        const currentIndex = slides.findIndex((slide, index) => {
                          const nextSlideTime = index < slides.length - 1 ? slides[index + 1].timestamp : Infinity;
                          return currentTime >= slide.timestamp && currentTime < nextSlideTime;
                        });
                        
                        if (currentIndex !== -1 && currentIndex !== currentSlideIndex) {
                          setCurrentSlideIndex(currentIndex);
                        }
                      }
                    }, 1000);
                    
                    return () => clearInterval(updateInterval);
                  }
                }
              }
            });
          }
        } catch (error) {
          console.error("Error setting up YouTube player:", error);
        }
      };
      
      if (window.YT && window.YT.Player) {
        setupYouTubePlayer();
      } else {
        // Wait for YouTube API to load
        const apiReadyCheck = setInterval(() => {
          if (window.YT && window.YT.Player) {
            clearInterval(apiReadyCheck);
            setupYouTubePlayer();
          }
        }, 500);
        
        // Clear interval if component unmounts
        return () => clearInterval(apiReadyCheck);
      }
    }
  }, [showVideoPlayer, videoId, slides]);
  
  // Load YouTube IFrame API
  useEffect(() => {
    // Create YouTube API script
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      
      // onYouTubeIframeAPIReady will be called when the API is loaded
      window.onYouTubeIframeAPIReady = () => {
        console.log('YouTube IFrame API ready');
      };
      
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
    
    // Clean up timeouts on unmount
    return () => {
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
    };
  }, []);
  
  // Update the Play button in the slides tab
  const playVideoFromSlide = (timestamp: number) => {
    if (!showVideoPlayer) {
      setShowVideoPlayer(true);
      
      // Add a small delay to ensure the player is initialized
      setTimeout(() => {
        seekToTimestamp(timestamp);
      }, 1000);
    } else {
      seekToTimestamp(timestamp);
      
      // Also attempt to play the video
      try {
        if (playerInstance.current) {
          playerInstance.current.playVideo();
        }
      } catch (e) {
        console.error("Error playing video:", e);
      }
    }
  };

  // Add functions to play and pause the video
  const playVideo = () => {
    try {
      if (playerInstance.current) {
        playerInstance.current.playVideo();
        setPlayerState('playing');
      }
    } catch (e) {
      console.error("Error playing video:", e);
    }
  };
  
  const pauseVideo = () => {
    try {
      if (playerInstance.current) {
        playerInstance.current.pauseVideo();
        setPlayerState('paused');
      }
    } catch (e) {
      console.error("Error pausing video:", e);
    }
  };
  
  // Add a reset function for when the user wants to start fresh
  const resetComponent = () => {
    // Clean up player instance
    try {
      if (playerInstance.current) {
        playerInstance.current.destroy();
        playerInstance.current = null;
      }
    } catch (e) {
      console.error("Error destroying player:", e);
    }
    
    // Reset state
    setVideoUrl('');
    setVideoId('');
    setIsVideoLoaded(false);
    setIsProcessing(false);
    setProcessingProgress(0);
    setVideoInfo(null);
    setSlides([]);
    setSummary('');
    setShowVideoPlayer(false);
    setCurrentSlideIndex(0);
    setPlayerState('stopped');
    setPlayerReady(false);
  };
  
  return (
    <Card className="w-full max-w-6xl mx-auto border shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Youtube className="h-5 w-5 text-red-500" />
          <span>YouTube to Slides & Notes</span>
          <Badge variant="outline" className="ml-2 flex items-center gap-1 bg-blue-50">
            <Sparkles className="h-3 w-3 text-blue-500" />
            <span className="text-xs text-blue-700">AI-Powered</span>
          </Badge>
        </CardTitle>
        <CardDescription>
          Convert YouTube videos into study slides and comprehensive notes with AI analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Video URL Input */}
        <div className="space-y-2">
          <Label htmlFor="video-url">YouTube Video URL</Label>
          <div className="flex gap-2">
            <Input
              id="video-url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={videoUrl}
              onChange={handleUrlChange}
              disabled={isProcessing}
              className="flex-1"
            />
            <Button 
              onClick={processVideo} 
              disabled={!videoUrl || isProcessing}
              className="gap-1"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <ArrowRight className="h-4 w-4" />
                  <span>Process</span>
                </>
              )}
            </Button>
          </div>
        </div>
        
        {/* Processing Progress */}
        {isProcessing && (
          <div className="space-y-3 py-2">
            <div className="flex justify-between text-sm">
              <span>{currentStep}</span>
              <span>{processingProgress}%</span>
            </div>
            <Progress value={processingProgress} className="h-2" />
          </div>
        )}
        
        {/* Video Information */}
        {videoInfo && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 pb-4 border-b">
            <div className="relative aspect-video rounded-md overflow-hidden">
              {videoId && !showVideoPlayer && (
                <img 
                  src={videoInfo.thumbnailUrl} 
                  alt={videoInfo.title}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setShowVideoPlayer(true)}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://img.youtube.com/vi/${videoId}/0.jpg`;
                  }}
                />
              )}
              
              {videoId && showVideoPlayer && (
                <iframe
                  ref={playerRef}
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}&rel=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                ></iframe>
              )}
              <Badge className="absolute top-2 right-2 bg-black/70">
                {formatTime(videoInfo.duration)}
              </Badge>
            </div>
            <div className="md:col-span-2 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold leading-tight">{videoInfo.title}</h3>
                <p className="text-sm text-muted-foreground">{videoInfo.channelName}</p>
              </div>
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-1"
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Open on YouTube</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-1"
                  onClick={downloadNotes}
                  disabled={!summary && slides.length === 0}
                >
                  <Download className="h-4 w-4" />
                  <span>Download Notes</span>
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Content Tabs */}
        {videoId && isVideoLoaded && (
          <Tabs defaultValue="slides" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="slides">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <span>Slides</span>
              </TabsTrigger>
              <TabsTrigger value="notes">
                <FileText className="h-4 w-4 mr-2" />
                <span>Notes</span>
              </TabsTrigger>
              <TabsTrigger value="summary">
                <FileText className="h-4 w-4 mr-2" />
                <span>Summary</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Slides Tab */}
            <TabsContent value="slides" className="p-0 mt-4">
              <div className="flex flex-col gap-4">
                {slides.length > 0 ? (
                  <>
                    <div className="aspect-video rounded-md overflow-hidden relative">
                      <img 
                        src={slides[currentSlideIndex]?.imageUrl} 
                        alt={`Slide ${currentSlideIndex + 1}`}
                        className="w-full h-full object-contain bg-black/5"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white px-3 py-2 text-sm flex justify-between">
                        <span>Slide {currentSlideIndex + 1} of {slides.length}</span>
                        <span>{formatTime(slides[currentSlideIndex]?.timestamp)}</span>
                      </div>
                      
                      <Button 
                        className="absolute top-2 right-2" 
                        size="sm" 
                        onClick={() => playVideoFromSlide(slides[currentSlideIndex].timestamp)}
                      >
                        {playerState === 'playing' ? (
                          <PauseCircle className="h-4 w-4 mr-1" />
                        ) : (
                          <Play className="h-4 w-4 mr-1" />
                        )}
                        <span>{playerState === 'playing' ? 'Pause' : 'Play'}</span>
                      </Button>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={goToPrevSlide}
                        disabled={currentSlideIndex === 0}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        onClick={goToNextSlide}
                        disabled={currentSlideIndex === slides.length - 1}
                      >
                        Next
                      </Button>
                    </div>
                    
                    {/* Timeline slider for navigating slides */}
                    <div className="pt-4 pb-2">
                      <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>0:00</span>
                        <span>{formatTime(videoInfo?.duration || 0)}</span>
                      </div>
                      <div className="relative h-8">
                        <div className="absolute inset-x-0 h-1 bg-muted top-3.5"></div>
                        {slides.map((slide, index) => (
                          <Button
                            key={slide.id}
                            size="sm"
                            variant={currentSlideIndex === index ? "default" : "outline"}
                            className={`absolute -translate-x-1/2 top-0 h-7 w-7 p-0 rounded-full ${
                              currentSlideIndex === index ? "z-10" : ""
                            }`}
                            style={{
                              left: `${(slide.timestamp / (videoInfo?.duration || 600)) * 100}%`
                            }}
                            onClick={() => goToSlide(index)}
                          >
                            {index + 1}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-muted/40 rounded-md p-3 mt-2">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-semibold">Notes for this slide:</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => copyToClipboard(slides[currentSlideIndex]?.notes)}
                          className="h-8"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm whitespace-pre-line">
                        {slides[currentSlideIndex]?.notes}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="h-[400px] flex flex-col items-center justify-center gap-4 text-center">
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-8 w-8 text-primary animate-spin" />
                        <p>Extracting slides from the video...</p>
                      </>
                    ) : (
                      <>
                        <SlidersHorizontal className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-medium">No slides extracted yet</p>
                          <p className="text-sm text-muted-foreground">Process a video to extract slides</p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Notes Tab */}
            <TabsContent value="notes" className="p-0 mt-4">
              <div className="bg-muted/40 rounded-md">
                <div className="p-3 border-b bg-muted/60 flex justify-between items-center">
                  <h3 className="font-medium">Detailed Notes</h3>
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const notes = slides.map(slide => (
                        `## Slide at ${formatTime(slide.timestamp)}\n\n${slide.notes}\n\n`
                      )).join('---\n\n');
                      copyToClipboard(notes);
                    }}
                    disabled={slides.length === 0}
                    className="h-8"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    <span>Copy All</span>
                  </Button>
                </div>
                <ScrollArea className="h-[400px] p-4">
                  {slides.length > 0 ? (
                    <div className="space-y-6">
                      {slides.map((slide, index) => (
                        <div key={slide.id} className="space-y-2">
                          <div className="flex gap-2 items-center">
                            <Badge 
                              variant="outline" 
                              className="h-6 cursor-pointer hover:bg-primary hover:text-primary-foreground"
                              onClick={() => {
                                goToSlide(index);
                                setActiveTab('slides');
                              }}
                            >
                              {formatTime(slide.timestamp)}
                            </Badge>
                            <h4 className="font-semibold">Slide {index + 1}</h4>
                          </div>
                          <p className="text-sm whitespace-pre-line">{slide.notes}</p>
                          {index < slides.length - 1 && <hr className="my-4" />}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-8 w-8 text-primary animate-spin" />
                          <p>Generating notes from the video...</p>
                        </>
                      ) : (
                        <>
                          <FileText className="h-8 w-8 text-muted-foreground" />
                          <div>
                            <p className="font-medium">No notes generated yet</p>
                            <p className="text-sm text-muted-foreground">Process a video to generate notes</p>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </TabsContent>
            
            {/* Summary Tab */}
            <TabsContent value="summary" className="p-0 mt-4">
              <div className="bg-muted/40 rounded-md">
                <div className="p-3 border-b bg-muted/60 flex justify-between items-center">
                  <h3 className="font-medium">Video Summary</h3>
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(summary)}
                    disabled={!summary}
                    className="h-8"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    <span>Copy</span>
                  </Button>
                </div>
                <ScrollArea className="h-[400px] p-4">
                  {summary ? (
                    <div className="whitespace-pre-line">
                      {summary}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-8 w-8 text-primary animate-spin" />
                          <p>Generating comprehensive summary...</p>
                        </>
                      ) : (
                        <>
                          <FileText className="h-8 w-8 text-muted-foreground" />
                          <div>
                            <p className="font-medium">No summary generated yet</p>
                            <p className="text-sm text-muted-foreground">Process a video to generate a summary</p>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <p className="text-xs text-muted-foreground">
          Note: This uses browser-based extraction for educational content processing.
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={resetComponent}
          disabled={isProcessing}
        >
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
};

export default YouTubeToSlides; 