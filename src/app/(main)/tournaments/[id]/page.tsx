import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTournamentById } from "@/actions/tournament.actions";
import { RegisterButton } from "./_components/register-button";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function TournamentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  let tournament;
  try {
    tournament = await getTournamentById(id);
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-950 p-6 text-white sm:p-8">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-primary/20 text-primary border-0">{tournament.status.replace(/_/g, " ")}</Badge>
                <Badge variant="secondary" className="border-0">{tournament.sportCategory}</Badge>
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
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400 whitespace-pre-wrap">
                      {tournament.description || "No description provided."}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="rules" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold">Tournament Rules</h3>
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400 whitespace-pre-wrap">
                      {tournament.rules || "Standard rules apply."}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="participants" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      {tournament.totalParticipants} participants registered out of {tournament.maxParticipants || "unlimited"} spots.
                    </p>
                    {tournament.registrations && tournament.registrations.length > 0 && (
                      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {tournament.registrations.map((reg) => (
                          <div key={reg.id} className="flex items-center gap-3 rounded-lg border p-3">
                            {reg.athlete.user.avatar ? (
                              <Image src={reg.athlete.user.avatar} alt={reg.athlete.user.name} width={40} height={40} className="h-10 w-10 rounded-full bg-neutral-100 object-cover" />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-neutral-200" />
                            )}
                            <div>
                              <p className="font-medium text-sm">{reg.athlete.user.name}</p>
                              {reg.teamName && <p className="text-xs text-neutral-500">{reg.teamName}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="results" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold">Tournament Results</h3>
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400 whitespace-pre-wrap">
                      {tournament.results || "Results will be available after the tournament concludes."}
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
                  <span className="font-bold">
                    {tournament.entryFee > 0 ? `₹${tournament.entryFee.toLocaleString("en-IN")}` : "Free"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">Prize Pool</span>
                  <span className="font-bold text-green-600">
                    {tournament.prizePool > 0 ? `₹${tournament.prizePool.toLocaleString("en-IN")}` : "TBD"}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">Deadline</span>
                  <span className="text-sm">
                    {tournament.registrationDeadline 
                      ? new Date(tournament.registrationDeadline).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "Open"
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">Spots Left</span>
                  <span className="text-sm font-medium">
                    {tournament.maxParticipants ? tournament.maxParticipants - tournament.totalParticipants : "Unlimited"}
                  </span>
                </div>
                
                <RegisterButton 
                  tournamentId={tournament.id} 
                  status={tournament.status}
                  maxParticipants={tournament.maxParticipants}
                  totalParticipants={tournament.totalParticipants}
                  registrationDeadline={tournament.registrationDeadline}
                />
                
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Venue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40 rounded-lg bg-neutral-100 flex items-center justify-center relative overflow-hidden">
                  {tournament.poster ? (
                    <Image src={tournament.poster} alt="Venue" fill className="object-cover" />
                  ) : (
                    <MapPin className="h-8 w-8 text-neutral-400" />
                  )}
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
