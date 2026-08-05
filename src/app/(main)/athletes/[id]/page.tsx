"use client";

import { Header } from "@/components/layout/header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Trophy, Star } from "lucide-react";

export default function AthleteDetailPage() {
  const athlete = {
    id: "1",
    name: "Aarav Singh",
    sport: "CRICKET",
    location: "Mumbai, Maharashtra",
    ranking: 42,
    achievements: 8,
    bio: "Passionate cricketer with a dream to represent India. Specializing in fast bowling and lower-order batting.",
    school: "Delhi Public School, Mumbai",
    coach: "Rajesh Kumar",
    experience: "5 years",
    stats: {
      matchesPlayed: 24,
      wins: 18,
      winRate: 75,
      avgScore: 45.2,
    },
    achievementsList: [
      { title: "State Championship Winner", date: "Feb 2026", sport: "Cricket" },
      { title: "Best Bowler Award", date: "Jan 2026", sport: "Cricket" },
      { title: "District Level Runner-up", date: "Dec 2025", sport: "Cricket" },
    ],
    performances: [
      { tournament: "State Championship", score: "45 runs, 3 wickets", rank: 1, date: "Feb 2026" },
      { tournament: "District Open", score: "32 runs, 2 wickets", rank: 2, date: "Jan 2026" },
      { tournament: "School Tournament", score: "58 runs, 1 wicket", rank: 1, date: "Dec 2025" },
    ],
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-2xl">{athlete.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
                        {athlete.name}
                      </h1>
                      <Badge variant="secondary">{athlete.sport}</Badge>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {athlete.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        #{athlete.ranking} ranking
                      </div>
                    </div>
                    <p className="mt-4 text-neutral-600 dark:text-neutral-400">{athlete.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Matches", value: athlete.stats.matchesPlayed },
                { label: "Wins", value: athlete.stats.wins },
                { label: "Win Rate", value: `${athlete.stats.winRate}%` },
                { label: "Avg Score", value: athlete.stats.avgScore },
              ].map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stat.value}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Tabs defaultValue="achievements">
              <TabsList>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="performances">Performances</TabsTrigger>
              </TabsList>
              <TabsContent value="achievements" className="mt-4">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    {athlete.achievementsList.map((achievement, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-neutral-900 dark:text-white">{achievement.title}</p>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">{achievement.sport} • {achievement.date}</p>
                        </div>
                        <Trophy className="h-5 w-5 text-yellow-500" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="performances" className="mt-4">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    {athlete.performances.map((perf, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-neutral-900 dark:text-white">{perf.tournament}</p>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">{perf.score}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={perf.rank === 1 ? "success" : "info"}>
                            #{perf.rank}
                          </Badge>
                          <p className="text-xs text-neutral-500 mt-1">{perf.date}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-neutral-500">School</p>
                  <p className="text-sm font-medium">{athlete.school}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Coach</p>
                  <p className="text-sm font-medium">{athlete.coach}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Experience</p>
                  <p className="text-sm font-medium">{athlete.experience}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <button className="w-full rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900">
                  Send Message
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}