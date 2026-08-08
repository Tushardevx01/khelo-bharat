import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Download, ExternalLink, CheckCircle, FileText } from "lucide-react";
import { getUserCertificates } from "@/actions/certificate.actions";

export default async function CertificatesPage() {
  const certificates = await getUserCertificates().catch(() => []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="Certificates"
          description="View and download your certificates."
        />

        {certificates.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center text-center p-8 border border-dashed border-border rounded-xl bg-card">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">No certificates yet</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              Participate in tournaments and events to earn certificates. They will appear here once issued.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => (
              <Card key={cert.id} className="transition-all hover:shadow-lg bg-card border-border">
                <div className="h-32 rounded-t-xl bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center border-b border-border">
                  <Award className="h-12 w-12 text-primary/40" />
                </div>
                <CardContent className="p-6">
                  <Badge variant={cert.certificateType === "WINNER" ? "success" : cert.certificateType === "RUNNER_UP" ? "info" : "secondary"} className="border-0">
                    {cert.certificateType}
                  </Badge>
                  <h3 className="mt-2 font-bold text-foreground line-clamp-1">
                    {cert.title}
                  </h3>
                  {cert.tournament && (
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                      Tournament: {cert.tournament.title}
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4" />
                    {cert.status}
                  </div>
                  {cert.issuedAt && (
                    <p className="mt-1 text-xs text-muted-foreground font-medium">
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
        )}
      </div>
    </DashboardLayout>
  );
}
