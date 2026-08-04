"use client";

import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";
import {
  Handshake, Users, GraduationCap, Megaphone, TrendingUp, ChevronRight,
  Trophy, Star, Eye, Target, Award, BarChart3, Search,
} from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const COLORS = ["#FF6B35", "#D72638", "#1B2838", "#4CAF50", "#2196F3", "#9C27B0"];

const roiData = [
  { month: "Jan", investment: 50000, returns: 65000 },
  { month: "Feb", investment: 55000, returns: 72000 },
  { month: "Mar", investment: 60000, returns: 85000 },
  { month: "Apr", investment: 58000, returns: 78000 },
  { month: "May", investment: 65000, returns: 92000 },
  { month: "Jun", investment: 70000, returns: 105000 },
];

const topAthletes = [
  { id: "1", name: "Arjun Singh", sport: "Athletics", rank: "#156", followers: "12.5K", engagement: "8.2%", potential: "High" },
  { id: "2", name: "Priya Sharma", sport: "Swimming", rank: "#89", followers: "8.3K", engagement: "9.1%", potential: "High" },
  { id: "3", name: "Rohit Kumar", sport: "Cricket", rank: "#234", followers: "15.2K", engagement: "7.5%", potential: "Medium" },
  { id: "4", name: "Sneha Patel", sport: "Badminton", rank: "#178", followers: "6.8K", engagement: "10.2%", potential: "High" },
  { id: "5", name: "Vikram Singh", sport: "Football", rank: "#312", followers: "9.1K", engagement: "6.8%", potential: "Medium" },
];

const activeCampaigns = [
  { id: "1", name: "Youth Athletics Program", athletes: 25, budget: "₹5.2L", spent: "₹3.1L", status: "Active", roi: "+42%" },
  { id: "2", name: "School Sports Initiative", schools: 15, budget: "₹8.5L", spent: "₹5.8L", status: "Active", roi: "+38%" },
  { id: "3", name: "Women in Sports", athletes: 18, budget: "₹3.8L", spent: "₹2.1L", status: "Active", roi: "+55%" },
];

const campaignDistribution = [
  { name: "Athletics", value: 35 },
  { name: "Cricket", value: 25 },
  { name: "Football", value: 20 },
  { name: "Other", value: 20 },
];

const stats = [
  { label: "Active Sponsorships", value: "12", change: "+3", icon: Handshake, color: "from-[#9C27B0] to-[#6A1B9A]" },
  { label: "Athletes", value: "45", change: "+8", icon: Users, color: "from-[#FF6B35] to-[#D72638]" },
  { label: "Schools", value: "15", change: "+2", icon: GraduationCap, color: "from-[#2196F3] to-[#1565C0]" },
  { label: "Campaigns", value: "8", change: "+4", icon: Megaphone, color: "from-[#4CAF50] to-[#2E7D32]" },
];

export default function SponsorDashboard() {
  return (
    <div>
      <DashboardHeader title="Sponsor Dashboard" subtitle="Manage your sponsorships and campaigns." notificationCount={6} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <Badge variant="secondary" className="text-[#4CAF50] bg-[#4CAF50]/10">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change}
                </Badge>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>ROI Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => `₹${(Number(value) / 1000).toFixed(1)}K`} />
                <Line type="monotone" dataKey="investment" stroke="#2196F3" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="returns" stroke="#4CAF50" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2196F3]" />
                <span className="text-gray-600">Investment</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-[#4CAF50]" />
                <span className="text-gray-600">Returns</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={campaignDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {campaignDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 mt-4">
              {campaignDistribution.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Top Athletes</CardTitle>
          <Button variant="outline" size="sm">
            Find More <Search className="w-4 h-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Athlete</TableHead>
                <TableHead>Sport</TableHead>
                <TableHead>Rank</TableHead>
                <TableHead>Followers</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Potential</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topAthletes.map((athlete) => (
                <TableRow key={athlete.id}>
                  <TableCell className="font-medium">{athlete.name}</TableCell>
                  <TableCell>{athlete.sport}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{athlete.rank}</Badge>
                  </TableCell>
                  <TableCell>{athlete.followers}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-[#4CAF50]" />
                      {athlete.engagement}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={athlete.potential === "High" ? "default" : "secondary"}>
                      {athlete.potential}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Active Campaigns</CardTitle>
          <Button variant="outline" size="sm">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeCampaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-900">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9C27B0] to-[#6A1B9A] flex items-center justify-center">
                    <Megaphone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{campaign.name}</p>
                    <p className="text-xs text-gray-500">
                      {campaign.athletes ? `${campaign.athletes} athletes` : `${campaign.schools} schools`} • Budget: {campaign.budget}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Spent</p>
                    <p className="text-sm font-medium">{campaign.spent}</p>
                  </div>
                  <Badge variant="secondary" className="text-[#4CAF50] bg-[#4CAF50]/10">
                    {campaign.roi}
                  </Badge>
                  <Badge variant="default">{campaign.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9C27B0] to-[#6A1B9A] flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-1">Find Athletes</h3>
            <p className="text-xs text-gray-500">Discover talent</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center mx-auto mb-3">
              <Megaphone className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-1">Create Campaign</h3>
            <p className="text-xs text-gray-500">Launch sponsorship</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-1">View Analytics</h3>
            <p className="text-xs text-gray-500">ROI & performance</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
