"use client";

import MapComponent from "./MapComponent";

interface Tournament {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
  city: string;
  sport: string;
}

interface TournamentMapProps {
  tournaments: Tournament[];
}

export default function TournamentMap({ tournaments }: TournamentMapProps) {
  const markers = tournaments.map((t) => ({
    id: t.id,
    name: t.title,
    latitude: t.latitude,
    longitude: t.longitude,
    type: "tournament" as const,
  }));

  return (
    <div>
      <div className="flex items-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF6B35]" />
          <span>Tournaments</span>
        </div>
      </div>
      <MapComponent markers={markers} height="500px" />
    </div>
  );
}