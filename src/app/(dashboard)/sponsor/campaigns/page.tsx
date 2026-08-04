"use client";

import { Megaphone, Calendar, Users, TrendingUp, Plus, IndianRupee } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const campaigns = [
  { id: 1, name: "Promote Cricket in Rural Areas", target: "Rural Youth", budget: "₹10L", reach: "50,000", status: "Active", startDate: "2024-01-01", endDate: "2024-06-30" },
  { id: 2, name: "Women in Sports Initiative", target: "Female Athletes", budget: "₹15L", reach: "75,000", status: "Active", startDate: "2024-02-15", endDate: "2024-08-15" },
  { id: 3, name: "School Sports Development", target: "Schools", budget: "₹20L", reach: "100,000", status: "Completed", startDate: "2023-06-01", endDate: "2024-03-31" },
  { id: 4, name: "Athlete Training Support", target: "Athletes", budget: "₹8L", reach: "25,000", status: "Active", startDate: "2024-03-01", endDate: "2024-12-31" },
  { id: 5, name: "Sports Equipment Drive", target: "Schools", budget: "₹5L", reach: "30,000", status: "Upcoming", startDate: "2024-07-01", endDate: "2024-09-30" },
];

export default function CampaignsPage() {
  return (
    <div>
      <DashboardHeader title="Campaigns" subtitle="Marketing and outreach campaigns" />

      <div className="flex justify-end mb-6">
        <Button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white">
          <Plus className="w-4 h-4 mr-2" /> Create Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <Badge variant="secondary">{campaign.target}</Badge>
                <Badge variant={campaign.status === "Active" ? "default" : campaign.status === "Completed" ? "secondary" : "outline"}>
                  {campaign.status}
                </Badge>
              </div>
              <h3 className="font-semibold text-lg mb-3">{campaign.name}</h3>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2"><IndianRupee className="w-4 h-4" /><span>Budget: {campaign.budget}</span></div>
                <div className="flex items-center gap-2"><Users className="w-4 h-4" /><span>Reach: {campaign.reach}</span></div>
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{campaign.startDate} to {campaign.endDate}</span></div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{campaign.status === "Completed" ? "100" : campaign.status === "Active" ? "65" : "0"}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: campaign.status === "Completed" ? "100%" : campaign.status === "Active" ? "65%" : "0%" }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
