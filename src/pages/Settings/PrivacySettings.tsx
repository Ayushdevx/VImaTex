import React from "react";
import { useUserPreferences } from "@/contexts/UserPreferencesContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Eye, EyeOff, UserCog, MapPin, Clock, Shield, Download, Trash2 } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const PrivacySettings = () => {
  const { privacyPreferences, updatePrivacyPreferences } = useUserPreferences();

  // Handle data export
  const handleExportData = () => {
    toast({
      title: "Data Export Started",
      description: "Your data export will be ready shortly. We'll notify you when it's ready to download.",
    });
    // In a real app, this would trigger a backend process
  };

  // Handle data deletion request
  const handleDeleteAccountRequest = () => {
    toast({
      title: "Account Deletion Request",
      description: "We've received your request. Please check your email for further instructions.",
      variant: "destructive",
    });
    // In a real app, this would trigger a backend process
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Privacy</h2>
        <p className="text-muted-foreground">
          Control your privacy settings and data management.
        </p>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertTitle>Your data is secure</AlertTitle>
        <AlertDescription>
          We never share your personal information with third parties without your explicit consent.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Profile Visibility</CardTitle>
          <CardDescription>Control who can see your profile and information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-500" />
              <Label htmlFor="show-profile" className="cursor-pointer">Show my profile to everyone on campus</Label>
            </div>
            <Switch 
              id="show-profile" 
              checked={privacyPreferences.showProfile}
              onCheckedChange={(checked) => updatePrivacyPreferences({ showProfile: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCog className="h-4 w-4 text-indigo-500" />
              <Label htmlFor="profile-visibility" className="cursor-pointer">Who can see my full profile</Label>
            </div>
            <Select defaultValue="everyone">
              <SelectTrigger id="profile-visibility" className="w-[180px]">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="everyone">Everyone</SelectItem>
                <SelectItem value="matches">Matches Only</SelectItem>
                <SelectItem value="friends">Friends Only</SelectItem>
                <SelectItem value="nobody">Nobody</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-red-500" />
              <Label htmlFor="show-location" className="cursor-pointer">Show my location</Label>
            </div>
            <Switch 
              id="show-location" 
              checked={privacyPreferences.showLocation}
              onCheckedChange={(checked) => updatePrivacyPreferences({ showLocation: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500" />
              <Label htmlFor="show-activity" className="cursor-pointer">Show my online activity status</Label>
            </div>
            <Switch 
              id="show-activity" 
              checked={privacyPreferences.showActivity}
              onCheckedChange={(checked) => updatePrivacyPreferences({ showActivity: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <EyeOff className="h-4 w-4 text-purple-500" />
              <Label htmlFor="incognito-mode" className="cursor-pointer">Incognito Mode</Label>
            </div>
            <Switch id="incognito-mode" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Messaging Privacy</CardTitle>
          <CardDescription>Control your messaging and chat preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="show-read-receipts" className="block">Show read receipts</Label>
              <p className="text-sm text-muted-foreground">
                Let others know when you've read their messages
              </p>
            </div>
            <Switch 
              id="show-read-receipts" 
              checked={privacyPreferences.showReadReceipts}
              onCheckedChange={(checked) => updatePrivacyPreferences({ showReadReceipts: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="typing-indicators" className="block">Show typing indicators</Label>
              <p className="text-sm text-muted-foreground">
                Let others see when you're typing a message
              </p>
            </div>
            <Switch id="typing-indicators" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="message-requests" className="block">Message requests</Label>
              <p className="text-sm text-muted-foreground">
                Who can send you message requests
              </p>
            </div>
            <Select defaultValue="everyone">
              <SelectTrigger id="message-requests" className="w-[180px]">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="everyone">Everyone</SelectItem>
                <SelectItem value="matches">Matches Only</SelectItem>
                <SelectItem value="friends">Friends Only</SelectItem>
                <SelectItem value="nobody">Nobody</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Blocking & Restrictions</CardTitle>
          <CardDescription>Manage blocked users and restrictions</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full justify-start">
            <Shield className="mr-2 h-4 w-4" />
            Manage Blocked Users (0)
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Data</CardTitle>
          <CardDescription>Access and manage your personal data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Button variant="outline" onClick={handleExportData} className="w-full justify-start">
              <Download className="mr-2 h-4 w-4" />
              Export Your Data
            </Button>
            <p className="text-xs text-muted-foreground">
              Download a copy of your personal data in a machine-readable format
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <Button variant="destructive" onClick={handleDeleteAccountRequest} className="w-full justify-start">
              <Trash2 className="mr-2 h-4 w-4" />
              Request Account Deletion
            </Button>
            <p className="text-xs text-muted-foreground">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacySettings;