import React, { useState, useEffect } from "react";
import { useUserPreferences } from "@/contexts/UserPreferencesContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Eye, Type, PanelLeft, MousePointer2, Volume2 } from "lucide-react";

const AccessibilitySettings = () => {
  const { 
    textSize, 
    setTextSize,
    accessibilityMode, 
    toggleAccessibilityMode, 
    colorScheme,
    setColorScheme
  } = useUserPreferences();
  
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Initialize with values from context
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    fontSize: textSize || "medium",
    contrast: colorScheme === "high-contrast" ? "high" : colorScheme === "inverted" ? "inverted" : "normal",
    reducedMotion: accessibilityMode,
    textToSpeech: false,
    screenReader: false,
    keyboardNavigation: false,
    autoplayMedia: true,
    fontType: "default",
    cursorSize: 1,
    soundEffects: true,
  });

  // Update local state when context values change
  useEffect(() => {
    setAccessibilitySettings(prev => ({
      ...prev,
      fontSize: textSize || "medium",
      contrast: colorScheme === "high-contrast" ? "high" : colorScheme === "inverted" ? "inverted" : "normal",
      reducedMotion: accessibilityMode,
    }));
  }, [textSize, colorScheme, accessibilityMode]);

  const handleSwitchChange = (key: string, checked: boolean) => {
    setAccessibilitySettings(prev => ({
      ...prev,
      [key]: checked,
    }));
  };

  const handleSelectChange = (key: string, value: string) => {
    setAccessibilitySettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSliderChange = (key: string, value: number[]) => {
    setAccessibilitySettings(prev => ({
      ...prev,
      [key]: value[0],
    }));
  };

  const handleSaveSettings = () => {
    setIsUpdating(true);
    
    // Save settings to context
    setTimeout(() => {
      // Update text size
      if (textSize !== accessibilitySettings.fontSize) {
        setTextSize(accessibilitySettings.fontSize);
      }
      
      // Update reduced motion setting
      if (accessibilityMode !== accessibilitySettings.reducedMotion) {
        toggleAccessibilityMode();
      }
      
      // Update contrast/color scheme
      const newColorScheme = 
        accessibilitySettings.contrast === "high" ? "high-contrast" :
        accessibilitySettings.contrast === "inverted" ? "inverted" : "default";
      
      if (colorScheme !== newColorScheme) {
        setColorScheme(newColorScheme);
      }
      
      setIsUpdating(false);
      toast({
        title: "Settings Updated",
        description: "Your accessibility settings have been saved.",
      });
    }, 1000);
  };

  const applyFontPreview = (size: string) => {
    switch(size) {
      case "small": return "text-sm";
      case "medium": return "text-base";
      case "large": return "text-lg";
      case "x-large": return "text-xl";
      default: return "text-base";
    }
  };

  const applyContrastPreview = (contrast: string) => {
    switch(contrast) {
      case "high": return "bg-black text-white p-2 rounded";
      case "inverted": return "bg-black text-white p-2 rounded";
      default: return "";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Accessibility Settings</h2>
        <p className="text-muted-foreground">
          Customize your experience to make VImaTe more accessible for your needs.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Text Preferences</CardTitle>
          <CardDescription>Adjust how text appears across the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="fontSize">Font Size</Label>
              <Select 
                value={accessibilitySettings.fontSize}
                onValueChange={(value) => handleSelectChange("fontSize", value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium (Default)</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="x-large">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="border p-4 rounded-md">
              <p className={`${applyFontPreview(accessibilitySettings.fontSize)}`}>
                This is how text will appear throughout the application.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="fontType">Font Type</Label>
              <Select 
                value={accessibilitySettings.fontType}
                onValueChange={(value) => handleSelectChange("fontType", value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">System Default</SelectItem>
                  <SelectItem value="sans-serif">Sans Serif</SelectItem>
                  <SelectItem value="serif">Serif</SelectItem>
                  <SelectItem value="dyslexic">Dyslexic Friendly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Contrast</Label>
                <p className="text-sm text-muted-foreground">Adjust color contrast for better visibility</p>
              </div>
              <RadioGroup 
                defaultValue={accessibilitySettings.contrast}
                onValueChange={(value) => handleSelectChange("contrast", value)}
                className="flex space-x-2"
                value={accessibilitySettings.contrast}
              >
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal">Normal</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high">High</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="inverted" id="inverted" />
                  <Label htmlFor="inverted">Inverted</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className={`border p-4 rounded-md ${applyContrastPreview(accessibilitySettings.contrast)}`}>
              <p>This is how contrast will appear throughout the application.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Motion & Animation</CardTitle>
          <CardDescription>Control how the app animates and moves</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reducedMotion" className="flex items-center gap-2">
                <Type className="h-4 w-4 text-primary" />
                Reduced Motion
              </Label>
              <p className="text-sm text-muted-foreground">Limit animations and motion effects</p>
            </div>
            <Switch
              id="reducedMotion"
              checked={accessibilitySettings.reducedMotion}
              onCheckedChange={(checked) => handleSwitchChange("reducedMotion", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="autoplayMedia" className="flex items-center gap-2">
                <PanelLeft className="h-4 w-4 text-primary" />
                Autoplay Media
              </Label>
              <p className="text-sm text-muted-foreground">Automatically play videos and animations</p>
            </div>
            <Switch
              id="autoplayMedia"
              checked={accessibilitySettings.autoplayMedia}
              onCheckedChange={(checked) => handleSwitchChange("autoplayMedia", checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Input Preferences</CardTitle>
          <CardDescription>Customize how you interact with the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="keyboardNavigation" className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-primary" />
                Enhanced Keyboard Navigation
              </Label>
              <p className="text-sm text-muted-foreground">Navigate the app using only the keyboard</p>
            </div>
            <Switch
              id="keyboardNavigation"
              checked={accessibilitySettings.keyboardNavigation}
              onCheckedChange={(checked) => handleSwitchChange("keyboardNavigation", checked)}
            />
          </div>
          
          <div className="space-y-3">
            <div className="space-y-0.5">
              <Label htmlFor="cursorSize">Cursor Size</Label>
              <p className="text-sm text-muted-foreground">Adjust the size of your cursor</p>
            </div>
            <div className="flex items-center gap-4">
              <MousePointer2 className="h-4 w-4 text-muted-foreground" />
              <Slider
                id="cursorSize"
                defaultValue={[accessibilitySettings.cursorSize]}
                min={1}
                max={3}
                step={0.5}
                onValueChange={(value) => handleSliderChange("cursorSize", value)}
                className="flex-1"
              />
              <MousePointer2 className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audio & Speech</CardTitle>
          <CardDescription>Control audio feedback and speech features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="textToSpeech" className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-primary" />
                Text-to-Speech
              </Label>
              <p className="text-sm text-muted-foreground">Enable reading text content aloud</p>
            </div>
            <Switch
              id="textToSpeech"
              checked={accessibilitySettings.textToSpeech}
              onCheckedChange={(checked) => handleSwitchChange("textToSpeech", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="screenReader" className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-primary" />
                Screen Reader Compatibility
              </Label>
              <p className="text-sm text-muted-foreground">Optimize for screen readers</p>
            </div>
            <Switch
              id="screenReader"
              checked={accessibilitySettings.screenReader}
              onCheckedChange={(checked) => handleSwitchChange("screenReader", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="soundEffects" className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-primary" />
                Sound Effects
              </Label>
              <p className="text-sm text-muted-foreground">Enable sounds for notifications and interactions</p>
            </div>
            <Switch
              id="soundEffects"
              checked={accessibilitySettings.soundEffects}
              onCheckedChange={(checked) => handleSwitchChange("soundEffects", checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reset Accessibility Settings</CardTitle>
          <CardDescription>Return to default accessibility settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="outline"
            onClick={() => {
              setAccessibilitySettings({
                fontSize: "medium",
                contrast: "normal",
                reducedMotion: false,
                textToSpeech: false,
                screenReader: false,
                keyboardNavigation: false,
                autoplayMedia: true,
                fontType: "default",
                cursorSize: 1,
                soundEffects: true,
              });
              
              toast({
                title: "Settings Reset",
                description: "Your accessibility settings have been reset to default values.",
              });
            }}
          >
            Reset to Defaults
          </Button>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button 
            onClick={handleSaveSettings} 
            disabled={isUpdating}
            className="ml-auto"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AccessibilitySettings;