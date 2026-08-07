"use client";

import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Star, Users, Calendar, Globe } from "lucide-react";

export default function SchoolDetailPage() {
  const school = {
    id: "1",
    name: "Delhi Public School, Mumbai",
    location: "Mumbai, Maharashtra",
    address: "123 Education Lane, Andheri West, Mumbai - 400058",
    rating: 4.8,
    students: 2500,
    verified: true,
    establishedYear: 1985,
    principalName: "Dr. Sunita Sharma",
    website: "https://dpsmumbai.edu.in",
    sportsFacilities: ["Cricket Ground", "Football Field", "Basketball Court", "Swimming Pool", "Athletics Track"],
    athletes: [
      { name: "Aarav Singh", sport: "Cricket", ranking: 42 },
      { name: "Diya Patel", sport: "Badminton", ranking: 15 },
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
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-2xl bg-neutral-100 dark:bg-neutral-800">
                      {school.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
                        {school.name}
                      </h1>
                      {school.verified && <Badge variant="success">Verified</Badge>}
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {school.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {school.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {school.students.toLocaleString()} students
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sports Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {school.sportsFacilities.map((facility) => (
                    <Badge key={facility} variant="secondary">{facility}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notable Athletes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {school.athletes.map((athlete, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{athlete.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{athlete.name}</p>
                          <p className="text-xs text-neutral-500">{athlete.sport}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium">#{athlete.ranking}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>School Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-neutral-500" />
                  <span>Est. {school.establishedYear}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-neutral-500" />
                  <span>Principal: {school.principalName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-neutral-500" />
                  <a href={school.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}