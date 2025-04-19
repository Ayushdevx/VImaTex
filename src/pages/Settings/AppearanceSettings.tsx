import React from "react";
import { useUserPreferences } from "@/contexts/UserPreferencesContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sun, Moon, Laptop, Palette } from "lucide-react";

const AppearanceSettings = () => {
  const { 
    theme, 
    setTheme, 
    textSize, 
    setTextSize,
    colorScheme,
    setColorScheme
  } = useUserPreferences();

  // Available color schemes
  const colorSchemes = [
    { name: "Default", value: "default" },
    { name: "Violet", value: "violet" },
    { name: "Sky", value: "sky" },
    { name: "Emerald", value: "emerald" },
    { name: "Rose", value: "rose" },
    { name: "Amber", value: "amber" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Appearance</h2>
        <p className="text-muted-foreground">
          Customize how VImaTe looks and feels for you.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Choose your preferred theme mode</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={theme} onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="light" className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <span>Light</span>
              </TabsTrigger>
              <TabsTrigger value="dark" className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                <span>Dark</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-2">
                <Laptop className="h-4 w-4" />
                <span>System</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Color Scheme</CardTitle>
          <CardDescription>Choose your preferred accent color</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            {colorSchemes.map((scheme) => (
              <button
                key={scheme.value}
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                  colorScheme === scheme.value
                    ? "border-primary scale-110"
                    : "border-transparent hover:border-muted-foreground/30"
                }`}
                onClick={() => setColorScheme(scheme.value)}
                style={{
                  background: `var(--${scheme.value}-gradient, linear-gradient(to bottom right, 
                    var(--${scheme.value}-500, #8b5cf6), 
                    var(--${scheme.value}-700, #4338ca)))`
                }}
                title={scheme.name}
              >
                {colorScheme === scheme.value && (
                  <Palette className="h-5 w-5 text-white drop-shadow-md" />
                )}
              </button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Color scheme affects buttons, links, and highlights throughout the app.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Text Size</CardTitle>
          <CardDescription>Adjust the size of text throughout the app</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            defaultValue={textSize}
            onValueChange={(value) => setTextSize(value as "small" | "medium" | "large")}
            className="flex flex-col space-y-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="small" id="text-small" />
              <Label htmlFor="text-small" className="text-sm">Small</Label>
              <span className="text-xs text-muted-foreground ml-auto">
                Compact view
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="text-medium" />
              <Label htmlFor="text-medium" className="text-base">Medium</Label>
              <span className="text-xs text-muted-foreground ml-auto">
                Default
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="large" id="text-large" />
              <Label htmlFor="text-large" className="text-lg">Large</Label>
              <span className="text-xs text-muted-foreground ml-auto">
                More readable
              </span>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interface Density</CardTitle>
          <CardDescription>Control how compact the interface appears</CardDescription>
        </CardHeader>
        <CardContent>
          <Select defaultValue="comfortable">
            <SelectTrigger>
              <SelectValue placeholder="Select density" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="compact">Compact</SelectItem>
              <SelectItem value="comfortable">Comfortable</SelectItem>
              <SelectItem value="spacious">Spacious</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Animation & Effects</CardTitle>
          <CardDescription>Control motion animations and visual effects</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-animations" className="block">Enable animations</Label>
              <p className="text-sm text-muted-foreground">
                Controls all motion effects throughout the app
              </p>
            </div>
            <Switch id="enable-animations" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="reduce-motion" className="block">Reduce motion</Label>
              <p className="text-sm text-muted-foreground">
                Minimizes animations for accessibility
              </p>
            </div>
            <Switch id="reduce-motion" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-blur" className="block">Background blur</Label>
              <p className="text-sm text-muted-foreground">
                Enables blur effects in certain UI elements
              </p>
            </div>
            <Switch id="enable-blur" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppearanceSettings;