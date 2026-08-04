"use client";

import { Trophy, TrendingUp, Medal } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const athleteRankings = [
  { rank: 1, name: "Sunita Reddy", sport: "Athletics", score: 95, change: 2 },
  { rank: 2, name: "Ananya Das", sport: "Badminton", score: 93, change: 0 },
  { rank: 3, name: "Priya Sharma", sport: "Cricket", score: 91, change: 1 },
  { rank: 4, name: "Ishita Banerjee", sport: "Swimming", score: 89, change: -1 },
  { rank: 5, name: "Rohan Joshi", sport: "Football", score: 87, change: 3 },
  { rank: 6, name: "Vivaan Sharma", sport: "Basketball", score: 85, change: 0 },
  { rank: 7, name: "Arjun Nair", sport: "Hockey", score: 83, change: 2 },
  { rank: 8, name: "Kavya Reddy", sport: "Swimming", score: 82, change: -1 },
];

const schoolRankings = [
  { rank: 1, name: "Bangalore International", location: "Bangalore", score: 96, athletes: 45 },
  { rank: 2, name: "Delhi Public School", location: "New Delhi", score: 94, athletes: 52 },
  { rank: 3, name: "Mumbai Sports Academy", location: "Mumbai", score: 92, athletes: 38 },
  { rank: 4, name: "Kolkata Public School", location: "Kolkata", score: 89, athletes: 35 },
  { rank: 5, name: "Hyderabad Academy", location: "Hyderabad", score: 87, athletes: 28 },
];

export default function RankingsPage() {
  return (
    <div>
      <DashboardHeader title="Rankings" subtitle="Top athletes and schools" />

      <Tabs defaultValue="athletes" className="space-y-6">
        <TabsList>
          <TabsTrigger value="athletes">Athlete Rankings</TabsTrigger>
          <TabsTrigger value="schools">School Rankings</TabsTrigger>
        </TabsList>

        <TabsContent value="athletes">
          <Card>
            <CardHeader>
              <CardTitle>Top Athletes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {athleteRankings.map((athlete) => (
                  <div key={athlete.rank} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      athlete.rank === 1 ? "bg-yellow-500" : athlete.rank === 2 ? "bg-gray-400" : athlete.rank === 3 ? "bg-orange-500" : "bg-gray-300 dark:bg-gray-700"
                    }`}>
                      {athlete.rank}
                    </div>
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-700 text-white">{athlete.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{athlete.name}</p>
                      <p className="text-sm text-gray-500">{athlete.sport}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{athlete.score}</p>
                      <p className={`text-xs ${athlete.change > 0 ? "text-green-600" : athlete.change < 0 ? "text-red-600" : "text-gray-500"}`}>
                        {athlete.change > 0 ? `+${athlete.change}` : athlete.change} positions
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schools">
          <Card>
            <CardHeader>
              <CardTitle>Top Schools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {schoolRankings.map((school) => (
                  <div key={school.rank} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      school.rank === 1 ? "bg-yellow-500" : school.rank === 2 ? "bg-gray-400" : school.rank === 3 ? "bg-orange-500" : "bg-gray-300 dark:bg-gray-700"
                    }`}>
                      {school.rank}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{school.name}</p>
                      <p className="text-sm text-gray-500">{school.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{school.score}</p>
                      <p className="text-xs text-gray-500">{school.athletes} athletes</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
