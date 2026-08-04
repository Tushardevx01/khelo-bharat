"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Share2, Eye, Award, Trophy, QrCode, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CertificatePreview from "@/components/certificate/CertificatePreview";
import DashboardHeader from "@/components/layout/DashboardHeader";

const certificates = [
  { id: "1", title: "National Cricket Championship 2024", type: "Winner", issuedDate: "2024-03-20", certificateId: "KB-CERT-2024-001", sport: "Cricket", tournament: "National Cricket Championship 2024" },
  { id: "2", title: "Inter-School Football Tournament", type: "Best Player", issuedDate: "2024-04-05", certificateId: "KB-CERT-2024-002", sport: "Football", tournament: "Inter-School Football Tournament" },
  { id: "3", title: "State Basketball League", type: "Participation", issuedDate: "2024-04-15", certificateId: "KB-CERT-2024-003", sport: "Basketball", tournament: "State Basketball League" },
  { id: "4", title: "School Cricket League - North Zone", type: "Runner Up", issuedDate: "2024-05-15", certificateId: "KB-CERT-2024-004", sport: "Cricket", tournament: "School Cricket League - North Zone" },
];

export default function AthleteCertificatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const filtered = certificates.filter((c) => {
    return c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.type.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const typeColors: Record<string, string> = {
    Winner: "bg-green-500",
    "Runner Up": "bg-blue-500",
    "Best Player": "bg-[#FF6B35]",
    Participation: "bg-gray-500",
  };

  return (
    <div className="space-y-6">
      <DashboardHeader title="My Certificates" subtitle="View and download your earned certificates" notificationCount={1} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center"><Award className="w-6 h-6 text-green-500" /></div>
            <div><p className="text-2xl font-bold">{certificates.length}</p><p className="text-xs text-muted-foreground">Total Certificates</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center"><Trophy className="w-6 h-6 text-[#FF6B35]" /></div>
            <div><p className="text-2xl font-bold">{certificates.filter((c) => c.type === "Winner").length}</p><p className="text-xs text-muted-foreground">Wins</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center"><Calendar className="w-6 h-6 text-blue-500" /></div>
            <div><p className="text-2xl font-bold">{new Set(certificates.map((c) => c.sport)).size}</p><p className="text-xs text-muted-foreground">Sports</p></div>
          </CardContent>
        </Card>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input placeholder="Search certificates..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((cert, i) => (
          <motion.div key={cert.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
              <div className="bg-gradient-to-br from-[#FF6B35] to-[#D72638] p-6 text-center text-white relative">
                <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')] bg-repeat" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <Badge className={`${typeColors[cert.type]} mb-2`}>{cert.type}</Badge>
                  <h3 className="font-bold text-lg mt-2">{cert.title}</h3>
                  <p className="text-sm text-white/70 mt-1">Issued: {cert.issuedDate}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-[#FF6B35]" />
                    <span className="text-xs text-muted-foreground font-mono">{cert.certificateId}</span>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon-sm" onClick={() => { setSelectedCert(cert); setIsPreviewOpen(true); }}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm"><Download className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon-sm" onClick={() => { setSelectedCert(cert); setIsShareOpen(true); }}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-500">No certificates found</h3>
          <p className="text-gray-400 mt-2">You&apos;ll earn certificates by participating in tournaments</p>
        </div>
      )}

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Certificate Preview</DialogTitle>
            <DialogDescription>Preview your certificate.</DialogDescription>
          </DialogHeader>
          {selectedCert && (
            <CertificatePreview
              title={selectedCert.title}
              recipientName="Aarav Sharma"
              type={selectedCert.type}
              issuedDate={selectedCert.issuedDate}
              qrCode={selectedCert.certificateId}
            />
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>Close</Button>
            <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white"><Download className="w-4 h-4 mr-1" /> Download PDF</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Share Certificate</DialogTitle>
            <DialogDescription>Share your achievement with others.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Share Link</label>
              <div className="flex gap-2">
                <Input readOnly value={`https://khelobharat.in/certificate/${selectedCert?.certificateId}`} />
                <Button variant="outline" onClick={() => navigator.clipboard?.writeText(`https://khelobharat.in/certificate/${selectedCert?.certificateId}`)}>Copy</Button>
              </div>
            </div>
            <div className="flex gap-3 justify-center pt-2">
              <Button variant="outline" className="flex-1">WhatsApp</Button>
              <Button variant="outline" className="flex-1">Twitter</Button>
              <Button variant="outline" className="flex-1">LinkedIn</Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsShareOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
