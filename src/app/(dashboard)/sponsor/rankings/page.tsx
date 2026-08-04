"use client";

import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Trophy, TrendingUp, TrendingDown, Minus, Medal } from "lucide-react";

const rankings = [
  { rank: 1, name: "Sneha Patel", sport: "Badminton", score: 95, trend: "up" },
  { rank: 2, name: "Meera Nair", sport: "Boxing", score: 93, trend: "up" },
  { rank: 3, name: "Arjun Mehta", sport: "Athletics", score: 92, trend: "up" },
  { rank: 4, name: "Kabir Joshi", sport: "Tennis", score: 90, trend: "down" },
  { rank: 5, name: "Priya Sharma", sport: "Swimming", score: 87, trend: "up" },
  { rank: 6, name: "Vikram Singh", sport: "Wrestling", score: 82, trend: "same" },
  { rank: 7, name: "Rohan Verma", sport: "Cricket", score: 78, trend: "down" },
  { rank: 8, name: "Ananya Das", sport: "Hockey", score: 74, trend: "up" },
  { rank: 9, name: "Aditya Rao", sport: "Football", score: 71, trend: "down" },
  { rank: 10, name: "Nisha Gupta", sport: "Kabaddi", score: 69, trend: "up" },
];

const trendIcon = (trend: string) => {
  if (trend === "up") return <TrendingUp className="w-4 h-4 text-green-500" />;
  if (trend === "down") return <TrendingDown className="w-4 h-4 text-red-500" />;
  return <Minus className="w-4 h-4 text-gray-400" />;
};

export default function SponsorRankingsPage() {
  const [sportFilter, setSportFilter] = useState("All");
  const sports = ["All", ...Array.from(new Set(rankings.map((r) => r.sport)))];
  const filtered = rankings.filter((r) => sportFilter === "All" || r.sport === sportFilter);

  return (
    <div>
      <DashboardHeader title="Rankings" subtitle="View athlete leaderboard and rankings." notificationCount={1} />

      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {sports.map((sport) => (
          <Button key={sport} variant={sportFilter === sport ? "default" : "outline"} size="sm" onClick={() => setSportFilter(sport)} className={sportFilter === sport ? "bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white" : ""}>
            {sport}
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Trophy className="w-5 h-5 text-[#FF6B35]" /> Leaderboard</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Athlete</TableHead>
                <TableHead>Sport</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.rank}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {r.rank <= 3 ? (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                          r.rank === 1 ? "bg-yellow-500" : r.rank === 2 ? "bg-gray-400" : "bg-amber-600"
                        }`}>
                          {r.rank}
                        </div>
                      ) : (
                        <span className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-500">#{r.rank}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center text-white text-[10px] font-bold">
                        {r.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      {r.name}
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="outline">{r.sport}</Badge></TableCell>
                  <TableCell className="font-bold text-[#FF6B35]">{r.score}</TableCell>
                  <TableCell>{trendIcon(r.trend)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
