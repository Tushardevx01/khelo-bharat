/* eslint-disable */
"use client";

import { User, Mail, Phone, MapPin, Calendar, Edit } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ProfilePage() {
  return (
    <div>
      <DashboardHeader title="My Profile" subtitle="Manage your personal information" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="p-6 text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarFallback className="bg-gradient-to-br from-[#FF6B35] to-[#D72638] text-white text-3xl">PS</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">Priya Sharma</h2>
            <p className="text-gray-500 mb-3">Athlete</p>
            <Badge className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white">Active</Badge>
            <div className="mt-6 space-y-3 text-left">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>priya@example.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>New Delhi, India</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Joined Jan 2024</span>
              </div>
            </div>
            <Button className="w-full mt-6 bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white">
              <Edit className="w-4 h-4 mr-2" /> Edit Profile
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sports Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Primary Sport</p>
                  <p className="font-medium">Cricket</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Secondary Sport</p>
                  <p className="font-medium">Athletics</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Position</p>
                  <p className="font-medium">Batsman</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-medium">5 years</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Physical Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                  <p className="text-2xl font-bold text-[#FF6B35]">5'6"</p>
                  <p className="text-xs text-gray-500">Height</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                  <p className="text-2xl font-bold text-[#D72638]">55kg</p>
                  <p className="text-xs text-gray-500">Weight</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                  <p className="text-2xl font-bold text-[#FF6B35]">16</p>
                  <p className="text-xs text-gray-500">Age</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                  <p className="text-2xl font-bold text-[#D72638]">A+</p>
                  <p className="text-xs text-gray-500">Blood Group</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
