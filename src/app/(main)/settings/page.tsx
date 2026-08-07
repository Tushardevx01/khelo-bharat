"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Bell, Shield, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

type TabType = "profile" | "notifications" | "security" | "appearance";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="Settings"
          description="Manage your account settings and preferences."
        />

        <div className="grid gap-6 lg:grid-cols-4">
          <div className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-2 lg:overflow-visible">
            <Button 
              variant="ghost" 
              className={cn("justify-start whitespace-nowrap", activeTab === "profile" && "bg-muted font-medium")}
              onClick={() => setActiveTab("profile")}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button 
              variant="ghost" 
              className={cn("justify-start whitespace-nowrap", activeTab === "notifications" && "bg-muted font-medium")}
              onClick={() => setActiveTab("notifications")}
            >
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Button 
              variant="ghost" 
              className={cn("justify-start whitespace-nowrap", activeTab === "security" && "bg-muted font-medium")}
              onClick={() => setActiveTab("security")}
            >
              <Shield className="mr-2 h-4 w-4" />
              Security
            </Button>
            <Button 
              variant="ghost" 
              className={cn("justify-start whitespace-nowrap", activeTab === "appearance" && "bg-muted font-medium")}
              onClick={() => setActiveTab("appearance")}
            >
              <Palette className="mr-2 h-4 w-4" />
              Appearance
            </Button>
          </div>

          <div className="lg:col-span-3 space-y-6">
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Update your personal information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="+91 98765 43210" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="City, State" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input id="bio" placeholder="Tell us about yourself" />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose what notifications you receive.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Tournament Updates", description: "Get notified about tournament registrations and results" },
                    { label: "Messages", description: "Receive notifications for new messages" },
                    { label: "Achievement Updates", description: "Get notified when your achievements are verified" },
                    { label: "Sponsor Opportunities", description: "Receive notifications about sponsorship opportunities" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-xs text-neutral-500">{item.description}</p>
                      </div>
                      <Button variant="outline" size="sm">Toggle</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {activeTab === "security" && (
              <Card>
                <CardHeader>
                  <CardTitle>Danger Zone</CardTitle>
                  <CardDescription>Irreversible actions for your account.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3 rounded-lg border border-red-200 p-4 dark:border-red-900 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-600">Delete Account</p>
                      <p className="text-xs text-neutral-500">Permanently delete your account and all data.</p>
                    </div>
                    <Button variant="destructive" size="sm">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "appearance" && (
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>Customize the look and feel of the platform.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="text-sm font-medium text-foreground">Platform Theme</p>
                      <p className="text-xs text-muted-foreground">Adjust the UI theme to your preference</p>
                    </div>
                    <Button variant="outline" size="sm">System Default</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
