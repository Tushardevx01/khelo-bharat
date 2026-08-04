"use client";

import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { IndianRupee, Users, Target, TrendingUp, ArrowUpRight } from "lucide-react";

const roiData = [
  { month: "Jan", roi: 2.1, investment: 3.0 },
  { month: "Feb", roi: 2.4, investment: 3.5 },
  { month: "Mar", roi: 2.8, investment: 4.0 },
  { month: "Apr", roi: 3.2, investment: 4.5 },
  { month: "May", roi: 3.5, investment: 5.0 },
  { month: "Jun", roi: 3.8, investment: 5.5 },
  { month: "Jul", roi: 4.1, investment: 6.0 },
];

const stats = [
  { label: "Total Investment", value: "₹18,50,000", change: "+₹3,00,000", icon: IndianRupee, color: "from-[#FF6B35] to-[#D72638]" },
  { label: "Active Campaigns", value: "3", change: "+1", icon: Target, color: "from-[#2196F3] to-[#1565C0]" },
  { label: "Athletes Sponsored", value: "12", change: "+4", icon: Users, color: "from-[#4CAF50] to-[#2E7D32]" },
  { label: "Avg ROI", value: "4.1x", change: "+0.6x", icon: TrendingUp, color: "from-[#9C27B0] to-[#6A1B9A]" },
];

const campaignPerformance = [
  { id: "1", name: "Youth Athletics Sponsorship", impressions: "1.2M", engagement: "8.5%", conversions: 45, roi: "4.2x" },
  { id: "2", name: "School Cricket Program", impressions: "800K", engagement: "12.3%", conversions: 32, roi: "3.8x" },
  { id: "3", name: "Women in Sports Initiative", impressions: "2.1M", engagement: "15.7%", conversions: 68, roi: "5.1x" },
  { id: "4", name: "Rural Sports Development", impressions: "500K", engagement: "6.2%", conversions: 22, roi: "3.2x" },
];

export default function SponsorAnalyticsPage() {
  return (
    <div>
      <DashboardHeader title="Analytics" subtitle="Track your sponsorship ROI and campaign performance." notificationCount={1} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <Badge variant="secondary" className="text-green-600 bg-green-500/10">
                  <ArrowUpRight className="w-3 h-3 mr-1" />{stat.change}
                </Badge>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>ROI Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={roiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="roi" stroke="#FF6B35" strokeWidth={2} name="ROI (x)" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="investment" stroke="#D72638" strokeWidth={2} name="Investment (₹L)" dot={{ r: 4 }} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Impressions</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Conversions</TableHead>
                <TableHead>ROI</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaignPerformance.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{c.impressions}</TableCell>
                  <TableCell>{c.engagement}</TableCell>
                  <TableCell>{c.conversions}</TableCell>
                  <TableCell className="font-bold text-[#FF6B35]">{c.roi}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
