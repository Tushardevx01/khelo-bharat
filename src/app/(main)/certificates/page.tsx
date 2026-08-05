"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Download, ExternalLink, CheckCircle } from "lucide-react";

export default function CertificatesPage() {
  const certificates = [
    { id: "1", title: "National Cricket Championship 2026", type: "Participation", status: "GENERATED", issuedAt: "2026-03-20" },
    { id: "2", title: "State Athletics Meet", type: "Winner", status: "GENERATED", issuedAt: "2026-02-15" },
    { id: "3", title: "District Badminton Open", type: "Runner-up", status: "PENDING", issuedAt: null },
    { id: "4", title: "School Sports Day", type: "Best Player", status: "DOWNLOADED", issuedAt: "2025-12-10" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="Certificates"
          description="View and download your certificates."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <Card key={cert.id} className="transition-all hover:shadow-lg">
              <div className="h-32 rounded-t-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center">
                <Award className="h-12 w-12 text-neutral-400" />
              </div>
              <CardContent className="p-6">
                <Badge variant={cert.type === "Winner" ? "success" : cert.type === "Runner-up" ? "info" : "secondary"}>
                  {cert.type}
                </Badge>
                <h3 className="mt-2 font-semibold text-neutral-900 dark:text-white">
                  {cert.title}
                </h3>
                <div className="mt-2 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                  <CheckCircle className="h-4 w-4" />
                  {cert.status}
                </div>
                {cert.issuedAt && (
                  <p className="mt-1 text-xs text-neutral-500">
                    Issued: {new Date(cert.issuedAt).toLocaleDateString("en-IN")}
                  </p>
                )}
                <div className="mt-4 flex gap-2">
                  {cert.status === "GENERATED" && (
                    <Button size="sm" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  )}
                  {cert.status === "DOWNLOADED" && (
                    <Button size="sm" variant="outline" className="flex-1">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  )}
                  {cert.status === "PENDING" && (
                    <Button size="sm" variant="outline" disabled className="flex-1">
                      Pending
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
