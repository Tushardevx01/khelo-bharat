"use client";

import { useState } from "react";
import { Search, Handshake, DollarSign, Plus } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const sponsors = [
  { id: 1, name: "Tata Group", industry: "Conglomerate", invested: "₹50L", athletes: 25, status: "Active" },
  { id: 2, name: "Reliance Foundation", industry: "Sports", invested: "₹1Cr", athletes: 40, status: "Active" },
  { id: 3, name: "Adani Sports", industry: "Energy", invested: "₹75L", athletes: 30, status: "Active" },
  { id: 4, name: "Hero MotoCorp", industry: "Automotive", invested: "₹30L", athletes: 15, status: "Pending" },
  { id: 5, name: "Star Sports", industry: "Media", invested: "₹2Cr", athletes: 50, status: "Active" },
  { id: 6, name: "Nike India", industry: "Sports Apparel", invested: "₹40L", athletes: 20, status: "Active" },
];

export default function SponsorsPage() {
  const [search, setSearch] = useState("");

  const filtered = sponsors.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.industry.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <DashboardHeader title="Sponsor Management" subtitle="Manage platform sponsors" />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-xl px-4 py-2.5 flex-1">
          <Search className="w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search sponsors..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm w-full" />
        </div>
        <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Sponsor
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((sponsor) => (
          <Card key={sponsor.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-14 h-14">
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-700 text-white">{sponsor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{sponsor.name}</h3>
                  <p className="text-sm text-gray-500">{sponsor.industry}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">{sponsor.invested}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Handshake className="w-4 h-4 text-[#FF6B35]" />
                  <span className="text-sm">{sponsor.athletes} athletes</span>
                </div>
              </div>
              <Badge variant={sponsor.status === "Active" ? "default" : "outline"}>{sponsor.status}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
