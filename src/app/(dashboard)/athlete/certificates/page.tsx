"use client";

import { Award, Download, Calendar } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const certificates = [
  { id: 1, title: "National Cricket Champion", issuer: "Khelo Bharat", date: "2024-05-20", type: "Achievement" },
  { id: 2, title: "Best Batsman Award", issuer: "State Sports Council", date: "2024-04-15", type: "Award" },
  { id: 3, title: "Athletics Gold Medal", issuer: "District Athletics Association", date: "2024-03-28", type: "Achievement" },
  { id: 4, title: "Sports Excellence Certificate", issuer: "Delhi Public School", date: "2024-02-10", type: "Achievement" },
  { id: 5, title: "Fitness Star Award", issuer: "School Sports Department", date: "2024-01-20", type: "Award" },
  { id: 6, title: "Tennis Tournament Winner", issuer: "Regional Tennis Association", date: "2023-12-05", type: "Achievement" },
];

export default function AthleteCertificatesPage() {
  return (
    <div>
      <DashboardHeader title="My Certificates" subtitle="Your earned certificates" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <Card key={cert.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <Badge variant="secondary">{cert.type}</Badge>
              </div>
              <h3 className="font-semibold mb-2">{cert.title}</h3>
              <p className="text-sm text-gray-500 mb-1">{cert.issuer}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Calendar className="w-4 h-4" />
                <span>{cert.date}</span>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="w-4 h-4 mr-2" /> Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
