"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, Filter } from "lucide-react";

export default function ReportsPage() {
  const reports = [
    { id: "1", title: "Monthly Performance Report", date: "Mar 2026", type: "Performance" },
    { id: "2", title: "Tournament Participation Summary", date: "Feb 2026", type: "Tournament" },
    { id: "3", title: "Achievement Certificate Report", date: "Jan 2026", type: "Certificate" },
    { id: "4", title: "Annual Sports Report", date: "2025", type: "Annual" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="Reports"
          description="View and download your reports."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <Card key={report.id} className="transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
                    <FileText className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="mt-4 font-semibold text-neutral-900 dark:text-white">
                  {report.title}
                </h3>
                <div className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
                  <Calendar className="h-4 w-4" />
                  {report.date}
                </div>
                <div className="mt-2">
                  <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                    {report.type}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
