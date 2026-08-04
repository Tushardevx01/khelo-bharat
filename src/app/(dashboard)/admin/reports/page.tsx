"use client";

import { FileText, Download, Calendar, Filter } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const reports = [
  { id: 1, title: "Monthly User Growth Report", type: "Analytics", date: "2024-06-01", status: "Ready" },
  { id: 2, title: "Tournament Participation Summary", type: "Events", date: "2024-05-28", status: "Ready" },
  { id: 3, title: "Revenue Report Q2 2024", type: "Financial", date: "2024-06-05", status: "Processing" },
  { id: 4, title: "School Performance Analytics", type: "Education", date: "2024-05-20", status: "Ready" },
  { id: 5, title: "Athlete Achievement Summary", type: "Athletics", date: "2024-05-15", status: "Ready" },
  { id: 6, title: "Sponsor ROI Analysis", type: "Financial", date: "2024-06-10", status: "Scheduled" },
];

export default function ReportsPage() {
  return (
    <div>
      <DashboardHeader title="Reports" subtitle="Generate and download reports" />

      <div className="flex justify-end gap-4 mb-6">
        <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
        <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white"><FileText className="w-4 h-4 mr-2" /> Generate Report</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <Badge variant="secondary">{report.type}</Badge>
                <Badge variant={report.status === "Ready" ? "default" : report.status === "Processing" ? "outline" : "secondary"}>
                  {report.status}
                </Badge>
              </div>
              <h3 className="font-semibold mb-2">{report.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Calendar className="w-4 h-4" />
                <span>{report.date}</span>
              </div>
              <Button variant="outline" size="sm" className="w-full" disabled={report.status !== "Ready"}>
                <Download className="w-4 h-4 mr-2" /> Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
