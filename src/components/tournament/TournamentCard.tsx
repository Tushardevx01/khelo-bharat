"use client";

import { Calendar, MapPin, Users, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TournamentCardProps {
  title: string;
  sport: string;
  startDate: string;
  location: string;
  prizePool: number;
  status: string;
  registrations: number;
  maxParticipants: number;
  onRegister?: () => void;
}

export default function TournamentCard({ title, sport, startDate, location, prizePool, status, registrations, maxParticipants, onRegister }: TournamentCardProps) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Badge variant="outline" className="text-[#FF6B35] border-[#FF6B35]/30">{sport}</Badge>
          <Badge className={status === "REGISTRATION_OPEN" ? "bg-green-500" : "bg-blue-500"}>{status.replace("_", " ")}</Badge>
        </div>
        <h3 className="font-bold text-lg mb-3">{title}</h3>
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {startDate}</div>
          <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {location}</div>
          <div className="flex items-center gap-2"><Users className="w-4 h-4" /> {registrations}/{maxParticipants}</div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <span className="font-bold text-[#D72638]">₹{prizePool.toLocaleString("en-IN")}</span>
          {onRegister && <Button size="sm" onClick={onRegister} className="rounded-full bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white">Register</Button>}
        </div>
      </CardContent>
    </Card>
  );
}
