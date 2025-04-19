import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { BarChart3, PieChart, LineChart, Download, Database, BarChart4, ArrowDownToLine, FileType2, FileBarChart } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

const DataSettings = () => {
  // Sample data usage values
  const storageUsed = 78; // MB
  const storageLimit = 500; // MB
  const storagePercentage = (storageUsed / storageLimit) * 100;

  // Handle data export
  const handleExportData = (format: string) => {
    toast({
      title: `Data Export Started (${format})`,
      description: "Your data export will be ready shortly. We'll notify you when it's ready to download.",
    });
    // In a real app, this would trigger a backend process
  };

  // Handle data clearing
  const handleClearData = (dataType: string) => {
    toast({
      title: `${dataType} Cleared`,
      description: `Your ${dataType.toLowerCase()} data has been cleared successfully.`,
    });
    // In a real app, this would trigger a backend process
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Data & Analytics</h2>
        <p className="text-muted-foreground">
          Manage your data usage and analytics preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analytics Preferences</CardTitle>
          <CardDescription>Control how your data is used for analytics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              <Label htmlFor="usage-analytics" className="cursor-pointer">Usage Analytics</Label>
            </div>
            <Switch id="usage-analytics" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className="h-4 w-4 text-indigo-500" />
              <Label htmlFor="personalization" className="cursor-pointer">Personalization</Label>
            </div>
            <Switch id="personalization" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LineChart className="h-4 w-4 text-green-500" />
              <Label htmlFor="performance-tracking" className="cursor-pointer">Performance Tracking</Label>
            </div>
            <Switch id="performance-tracking" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Storage Usage</CardTitle>
          <CardDescription>Manage your storage space and usage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{storageUsed} MB used</span>
              <span>{storageLimit} MB limit</span>
            </div>
            <Progress value={storagePercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {storagePercentage.toFixed(1)}% of your storage space is currently in use
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <Button variant="outline" size="sm">
              <Database className="mr-2 h-4 w-4" />
              Manage Storage
            </Button>
            <Button variant="outline" size="sm">
              <ArrowDownToLine className="mr-2 h-4 w-4" />
              Upgrade Storage
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Export</CardTitle>
          <CardDescription>Export your data in different formats</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => handleExportData("CSV")}
            >
              <FileType2 className="mr-2 h-4 w-4" />
              Export as CSV
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => handleExportData("JSON")}
            >
              <FileBarChart className="mr-2 h-4 w-4" />
              Export as JSON
            </Button>
          </div>
          <p className="text-xs text-muted-foreground pt-2">
            Data exports include your personal information, academic records, and application history
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cache & Temporary Data</CardTitle>
          <CardDescription>Manage cached data and temporary files</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => handleClearData("Cache")}
            >
              <Database className="mr-2 h-4 w-4" />
              Clear Cache
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => handleClearData("Search History")}
            >
              <Database className="mr-2 h-4 w-4" />
              Clear Search History
            </Button>
          </div>
          <Alert className="mt-4">
            <AlertTitle>About Data Clearing</AlertTitle>
            <AlertDescription>
              Clearing cache data may temporarily affect performance while data is rebuilt.
              Your personal information and important settings will not be affected.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Retention</CardTitle>
          <CardDescription>Control how long your data is stored</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="activity-data-retention" className="block">Activity Data</Label>
                <p className="text-sm text-muted-foreground">
                  How long to keep your activity history
                </p>
              </div>
              <Select defaultValue="6-months">
                <SelectTrigger id="activity-data-retention" className="w-[180px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="forever">Forever</SelectItem>
                  <SelectItem value="1-year">1 Year</SelectItem>
                  <SelectItem value="6-months">6 Months</SelectItem>
                  <SelectItem value="3-months">3 Months</SelectItem>
                  <SelectItem value="1-month">1 Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="search-history-retention" className="block">Search History</Label>
                <p className="text-sm text-muted-foreground">
                  How long to keep your search history
                </p>
              </div>
              <Select defaultValue="3-months">
                <SelectTrigger id="search-history-retention" className="w-[180px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="forever">Forever</SelectItem>
                  <SelectItem value="1-year">1 Year</SelectItem>
                  <SelectItem value="6-months">6 Months</SelectItem>
                  <SelectItem value="3-months">3 Months</SelectItem>
                  <SelectItem value="1-month">1 Month</SelectItem>
                  <SelectItem value="never">Never save</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataSettings; 