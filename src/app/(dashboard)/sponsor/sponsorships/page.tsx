"use client";

import { Handshake, DollarSign, Calendar, Plus } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const sponsorships = [
  { id: 1, athlete: "Priya Sharma", sport: "Cricket", amount: "₹5L", duration: "1 year", startDate: "2024-01-15", status: "Active" },
  { id: 2, athlete: "Rohan Joshi", sport: "Football", amount: "₹3L", duration: "6 months", startDate: "2024-03-01", status: "Active" },
  { id: 3, athlete: "Sunita Reddy", sport: "Athletics", amount: "₹2L", duration: "1 year", startDate: "2024-02-10", status: "Active" },
  { id: 4, athlete: "Ananya Das", sport: "Badminton", amount: "₹4L", duration: "2 years", startDate: "2023-06-01", status: "Active" },
  { id: 5, athlete: "Vivaan Sharma", sport: "Basketball", amount: "₹1.5L", duration: "6 months", startDate: "2024-04-01", status: "Pending" },
  { id: 6, athlete: "Ishita Banerjee", sport: "Swimming", amount: "₹2.5L", duration: "1 year", startDate: "2023-12-01", status: "Completed" },
];

export default function SponsorshipsPage() {
  return (
    <div>
      <DashboardHeader title="Sponsorships" subtitle="Manage your sponsorships" />

      <div className="flex justify-end mb-6">
        <Button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white">
          <Plus className="w-4 h-4 mr-2" /> New Sponsorship
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-900">
                  <th className="text-left py-3 px-4 font-medium">Athlete</th>
                  <th className="text-left py-3 px-4 font-medium">Sport</th>
                  <th className="text-left py-3 px-4 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 font-medium">Duration</th>
                  <th className="text-left py-3 px-4 font-medium">Start Date</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {sponsorships.map((sponsorship) => (
                  <tr key={sponsorship.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <td className="py-3 px-4 font-medium">{sponsorship.athlete}</td>
                    <td className="py-3 px-4"><Badge variant="secondary">{sponsorship.sport}</Badge></td>
                    <td className="py-3 px-4 font-medium">{sponsorship.amount}</td>
                    <td className="py-3 px-4 text-gray-500">{sponsorship.duration}</td>
                    <td className="py-3 px-4 text-gray-500">{sponsorship.startDate}</td>
                    <td className="py-3 px-4">
                      <Badge variant={sponsorship.status === "Active" ? "default" : sponsorship.status === "Pending" ? "outline" : "secondary"}>
                        {sponsorship.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
