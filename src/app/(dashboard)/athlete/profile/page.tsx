"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Save, User, Mail, Phone, Calendar, MapPin, Globe, Link2, Hash, AtSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardHeader from "@/components/layout/DashboardHeader";

const initialProfile = {
  firstName: "Arjun",
  lastName: "Sharma",
  email: "arjun.sharma@email.com",
  phone: "+91 98765 43210",
  dob: "2002-05-15",
  gender: "Male",
  city: "New Delhi",
  state: "Delhi",
  pincode: "110001",
  bio: "Passionate cricket player with 8+ years of experience. Represented state at national level championships. Focused on fast bowling and middle-order batting.",
  sport: "Cricket",
  position: "All-rounder",
  website: "https://arjunsharma.com",
  linkedin: "linkedin.com/in/arjunsharma",
  twitter: "@arjun_cricket",
  instagram: "@arjun.sharma Cricket",
};

export default function AthleteProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <DashboardHeader title="My Profile" subtitle="Manage your personal information" notificationCount={1} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Photo Card */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <Avatar size="lg" className="size-28">
                  <AvatarImage src="" alt={profile.firstName} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-[#FF6B35] to-[#D72638] text-white">
                    {profile.firstName[0]}{profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <Button size="icon-sm" className="absolute bottom-0 right-0 rounded-full bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90">
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <h3 className="font-bold text-lg">{profile.firstName} {profile.lastName}</h3>
              <p className="text-sm text-gray-500">{profile.sport} • {profile.position}</p>
              <p className="text-xs text-gray-400 mt-1">{profile.city}, {profile.state}</p>
              <div className="flex gap-2 mt-4">
                {profile.website && (
                  <Button variant="outline" size="icon-sm" className="rounded-full"><Globe className="w-4 h-4" /></Button>
                )}
                {profile.linkedin && (
                  <Button variant="outline" size="icon-sm" className="rounded-full"><Link2 className="w-4 h-4" /></Button>
                )}
                {profile.twitter && (
                  <Button variant="outline" size="icon-sm" className="rounded-full"><Hash className="w-4 h-4" /></Button>
                )}
                {profile.instagram && (
                  <Button variant="outline" size="icon-sm" className="rounded-full"><AtSign className="w-4 h-4" /></Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Form Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-6">
          {/* Personal Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="w-5 h-5 text-[#FF6B35]" /> Personal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input value={profile.firstName} onChange={(e) => handleChange("firstName", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input value={profile.lastName} onChange={(e) => handleChange("lastName", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email</Label>
                  <Input type="email" value={profile.email} onChange={(e) => handleChange("email", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Phone</Label>
                  <Input value={profile.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Date of Birth</Label>
                  <Input type="date" value={profile.dob} onChange={(e) => handleChange("dob", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <select
                    className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    value={profile.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MapPin className="w-5 h-5 text-[#FF6B35]" /> Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input value={profile.city} onChange={(e) => handleChange("city", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>State</Label>
                  <Input value={profile.state} onChange={(e) => handleChange("state", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Pincode</Label>
                  <Input value={profile.pincode} onChange={(e) => handleChange("pincode", e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bio & Sports */}
          <Card>
            <CardHeader>
              <CardTitle>Bio & Sports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea rows={4} value={profile.bio} onChange={(e) => handleChange("bio", e.target.value)} placeholder="Tell us about yourself..." />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Primary Sport</Label>
                  <Input value={profile.sport} onChange={(e) => handleChange("sport", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Position / Specialty</Label>
                  <Input value={profile.position} onChange={(e) => handleChange("position", e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5 text-[#FF6B35]" /> Social Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> Website</Label>
                <Input value={profile.website} onChange={(e) => handleChange("website", e.target.value)} placeholder="https://yoursite.com" />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5"><Link2 className="w-3.5 h-3.5" /> LinkedIn</Label>
                <Input value={profile.linkedin} onChange={(e) => handleChange("linkedin", e.target.value)} placeholder="linkedin.com/in/yourprofile" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5"><Hash className="w-3.5 h-3.5" /> Hash</Label>
                  <Input value={profile.twitter} onChange={(e) => handleChange("twitter", e.target.value)} placeholder="@username" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5"><AtSign className="w-3.5 h-3.5" /> AtSign</Label>
                  <Input value={profile.instagram} onChange={(e) => handleChange("instagram", e.target.value)} placeholder="@username" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white px-8 hover:opacity-90 transition-opacity">
              <Save className="w-4 h-4 mr-2" />
              {saved ? "Saved!" : "Save Profile"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
