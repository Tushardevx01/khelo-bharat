"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

interface MapMarker {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  type?: "tournament" | "school" | "academy" | "event";
}

interface MapComponentProps {
  markers?: MapMarker[];
  center?: [number, number];
  zoom?: number;
  height?: string;
}

export default function MapComponent({
  markers = [],
  center = [28.6139, 77.2090], // Default: New Delhi
  zoom = 5,
  height = "400px",
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !mapRef.current) return;

      const map = L.map(mapRef.current, {
        center,
        zoom,
        scrollWheelZoom: false,
        attributionControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const typeColors: Record<string, string> = {
        tournament: "#FF6B35",
        school: "#2196F3",
        academy: "#4CAF50",
        event: "#D72638",
      };

      markers.forEach((marker) => {
        const color = typeColors[marker.type || "event"] || "#FF6B35";
        const icon = L.divIcon({
          className: "custom-marker",
          html: `<div style="width:32px;height:32px;border-radius:50%;background:${color};display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.3);border:3px solid white;"><span style="color:white;font-size:14px;">${marker.type === "tournament" ? "🏆" : marker.type === "school" ? "🏫" : marker.type === "academy" ? "🎯" : "📍"}</span></div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        L.marker([marker.latitude, marker.longitude], { icon })
          .addTo(map)
          .bindPopup(`<div style="padding:8px;"><strong>${marker.name}</strong><br/><small>${marker.type || "Location"}</small></div>`);
      });

      if (markers.length > 0) {
        const bounds = L.latLngBounds(markers.map((m) => [m.latitude, m.longitude] as [number, number]));
        map.fitBounds(bounds, { padding: [50, 50] });
      }

      mapInstanceRef.current = map;
    });

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [markers, center, zoom]);

  return (
    <div
      ref={mapRef}
      style={{ height, width: "100%", borderRadius: "16px", overflow: "hidden" }}
      className="border border-gray-200 dark:border-gray-800"
    />
  );
}