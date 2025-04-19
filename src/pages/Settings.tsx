import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Import Settings sub-pages
import AccountSettings from "./Settings/AccountSettings";
import AppearanceSettings from "./Settings/AppearanceSettings";
import NotificationSettings from "./Settings/NotificationSettings";
import PrivacySettings from "./Settings/PrivacySettings";
import AccessibilitySettings from "./Settings/AccessibilitySettings";
import DataSettings from "./Settings/DataSettings";

const Settings = () => {
  const navigate = useNavigate();

  // Handle navigation between settings tabs
  const handleTabChange = (value: string) => {
    navigate(`/settings/${value.toLowerCase()}`);
  };

  // Get current active tab from URL
  const getCurrentTab = () => {
    const path = window.location.pathname.split('/').pop() || '';
    if (path === 'settings') return 'account';
    return path;
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 max-w-5xl">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Settings Navigation */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <Tabs
              defaultValue={getCurrentTab()}
              orientation="vertical"
              className="w-full"
              onValueChange={handleTabChange}
            >
              <TabsList className="flex flex-col h-auto bg-muted/50 p-1">
                <TabsTrigger
                  value="account"
                  className="justify-start text-left px-4 py-3 h-auto"
                >
                  Account
                </TabsTrigger>
                <TabsTrigger
                  value="appearance"
                  className="justify-start text-left px-4 py-3 h-auto"
                >
                  Appearance
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="justify-start text-left px-4 py-3 h-auto"
                >
                  Notifications
                </TabsTrigger>
                <TabsTrigger
                  value="privacy"
                  className="justify-start text-left px-4 py-3 h-auto"
                >
                  Privacy
                </TabsTrigger>
                <TabsTrigger
                  value="accessibility"
                  className="justify-start text-left px-4 py-3 h-auto"
                >
                  Accessibility
                </TabsTrigger>
                <TabsTrigger
                  value="data"
                  className="justify-start text-left px-4 py-3 h-auto"
                >
                  Data & Analytics
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Settings Content */}
          <div className="flex-1">
            <div className="bg-card rounded-lg border shadow-sm p-6">
              <Routes>
                <Route path="/" element={<AccountSettings />} />
                <Route path="/account" element={<AccountSettings />} />
                <Route path="/appearance" element={<AppearanceSettings />} />
                <Route path="/notifications" element={<NotificationSettings />} />
                <Route path="/privacy" element={<PrivacySettings />} />
                <Route path="/accessibility" element={<AccessibilitySettings />} />
                <Route path="/data" element={<DataSettings />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;