"use client";

import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TournamentDetailPage() {
  const tournament = {
    id: "1",
    title: "National Cricket Championship 2026",
    description: "The premier cricket tournament bringing together the best talent from across India. Compete at the national level and showcase your skills.",
    sportCategory: "CRICKET",
    status: "REGISTRATION_OPEN",
    startDate: "2026-03-15",
    endDate: "2026-03-20",
    registrationDeadline: "2026-03-10",
    location: "Wankhede Stadium",
    city: "Mumbai",
    state: "Maharashtra",
    maxParticipants: 256,
    totalParticipants: 128,
    entryFee: 5000,
    prizePool: 500000,
    rules: "Standard BCCI rules apply. All participants must be registered with Khelo Bharat.",
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-950 p-6 text-white sm:p-8">
              <div className="flex items-center gap-2">
                <Badge variant="success">{tournament.status.replace(/_/g, " ")}</Badge>
                <Badge variant="secondary">{tournament.sportCategory}</Badge>
              </div>
              <h1 className="mt-4 text-2xl font-bold sm:text-3xl">{tournament.title}</h1>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-300">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(tournament.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  {" - "}
                  {new Date(tournament.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {tournament.location}, {tournament.city}, {tournament.state}
                </div>
              </div>
            </div>

            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="rules">Rules</TabsTrigger>
                <TabsTrigger value="participants">Participants</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold">About this Tournament</h3>
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                      {tournament.description}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="rules" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold">Tournament Rules</h3>
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                      {tournament.rules}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="participants" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {tournament.totalParticipants} participants registered
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="results" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Results will be available after the tournament concludes.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Registration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">Entry Fee</span>
                  <span className="font-bold">₹{tournament.entryFee.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">Prize Pool</span>
                  <span className="font-bold text-green-600">₹{tournament.prizePool.toLocaleString("en-IN")}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">Deadline</span>
                  <span className="text-sm">
                    {new Date(tournament.registrationDeadline).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">Spots Left</span>
                  <span className="text-sm font-medium">
                    {tournament.maxParticipants - tournament.totalParticipants}
                  </span>
                </div>
                <Button className="w-full" size="lg">
                  Register Now
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Venue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-neutral-400" />
                </div>
                <p className="mt-2 text-sm font-medium">{tournament.location}</p>
                <p className="text-xs text-neutral-500">{tournament.city}, {tournament.state}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}