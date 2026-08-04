"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Download, Share2, Eye, QrCode, Award, Trophy, FileText, Filter, ChevronLeft, ChevronRight, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CertificatePreview from "@/components/certificate/CertificatePreview";
import DashboardHeader from "@/components/layout/DashboardHeader";

const certificates = [
  { id: "1", recipientName: "Aarav Sharma", recipientEmail: "aarav@email.com", title: "National Cricket Championship 2024", type: "Winner", tournamentId: "1", issuedDate: "2024-03-20", certificateId: "KB-CERT-2024-001", status: "ISSUED", qrCode: true },
  { id: "2", recipientName: "Priya Patel", recipientEmail: "priya@email.com", title: "Inter-School Football Tournament", type: "Best Player", tournamentId: "2", issuedDate: "2024-04-05", certificateId: "KB-CERT-2024-002", status: "ISSUED", qrCode: true },
  { id: "3", recipientName: "Rohan Gupta", recipientEmail: "rohan@email.com", title: "State Basketball League", type: "Participation", tournamentId: "3", issuedDate: "2024-04-15", certificateId: "KB-CERT-2024-003", status: "ISSUED", qrCode: true },
  { id: "4", recipientName: "Sneha Reddy", recipientEmail: "sneha@email.com", title: "Youth Athletics Meet", type: "Runner Up", tournamentId: "4", issuedDate: "2024-04-22", certificateId: "KB-CERT-2024-004", status: "PENDING", qrCode: false },
  { id: "5", recipientName: "Vikram Singh", recipientEmail: "vikram@email.com", title: "All India Swimming Championship", type: "Winner", tournamentId: "5", issuedDate: "2024-05-03", certificateId: "KB-CERT-2024-005", status: "PENDING", qrCode: false },
  { id: "6", recipientName: "Ananya Das", recipientEmail: "ananya@email.com", title: "School Cricket League - North Zone", type: "Participation", tournamentId: "6", issuedDate: "2024-05-15", certificateId: "KB-CERT-2024-006", status: "ISSUED", qrCode: true },
];

const ITEMS_PER_PAGE = 5;

export default function AdminCertificatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);

  const filtered = certificates.filter((c) => {
    const matchSearch = c.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) || c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = selectedType === "All" || c.type === selectedType;
    return matchSearch && matchType;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <DashboardHeader title="Certificate Management" subtitle="Issue and manage certificates" notificationCount={5} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center"><Award className="w-6 h-6 text-green-500" /></div>
            <div><p className="text-2xl font-bold">{certificates.filter((c) => c.status === "ISSUED").length}</p><p className="text-xs text-muted-foreground">Issued</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center"><FileText className="w-6 h-6 text-yellow-500" /></div>
            <div><p className="text-2xl font-bold">{certificates.filter((c) => c.status === "PENDING").length}</p><p className="text-xs text-muted-foreground">Pending</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center"><Trophy className="w-6 h-6 text-[#FF6B35]" /></div>
            <div><p className="text-2xl font-bold">{certificates.length}</p><p className="text-xs text-muted-foreground">Total</p></div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Search certificates..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="flex gap-3 items-center">
          <Select value={selectedType} onValueChange={(v) => v !== null && setSelectedType(v)}>
            <SelectTrigger className="w-36"><SelectValue placeholder="All Types" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              <SelectItem value="Winner">Winner</SelectItem>
              <SelectItem value="Runner Up">Runner Up</SelectItem>
              <SelectItem value="Best Player">Best Player</SelectItem>
              <SelectItem value="Participation">Participation</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isGenerateOpen} onOpenChange={setIsGenerateOpen}>
            <DialogTrigger render={<Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white" />}>
              <Plus className="w-4 h-4 mr-1" /> Generate Certificate
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Generate Certificate</DialogTitle>
                <DialogDescription>Create a new certificate for a participant.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Recipient Name</label>
                  <Input placeholder="Enter recipient name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Recipient Email</label>
                  <Input type="email" placeholder="Enter email" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tournament</label>
                  <Select>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Select tournament" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">National Cricket Championship 2024</SelectItem>
                      <SelectItem value="2">Inter-School Football Tournament</SelectItem>
                      <SelectItem value="3">State Basketball League</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Certificate Type</label>
                  <Select>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="winner">Winner</SelectItem>
                      <SelectItem value="runner_up">Runner Up</SelectItem>
                      <SelectItem value="best_player">Best Player</SelectItem>
                      <SelectItem value="participation">Participation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsGenerateOpen(false)}>Cancel</Button>
                <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white" onClick={() => setIsGenerateOpen(false)}>Generate</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recipient</TableHead>
                <TableHead>Tournament</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Issued Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>QR</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{cert.recipientName}</p>
                      <p className="text-xs text-muted-foreground">{cert.recipientEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell><p className="text-sm max-w-48 truncate">{cert.title}</p></TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cert.type === "Winner" ? "text-green-600 border-green-300" : cert.type === "Best Player" ? "text-[#FF6B35] border-[#FF6B35]/30" : ""}>{cert.type}</Badge>
                  </TableCell>
                  <TableCell><span className="text-sm">{cert.issuedDate}</span></TableCell>
                  <TableCell>
                    <Badge className={cert.status === "ISSUED" ? "bg-green-500" : "bg-yellow-500"}>{cert.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {cert.qrCode ? <QrCode className="w-5 h-5 text-[#FF6B35]" /> : <span className="text-xs text-muted-foreground">N/A</span>}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => { setSelectedCert(cert); setIsPreviewOpen(true); }}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm"><Download className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon-sm"><Share2 className="w-4 h-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} certificates
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(page)} className={currentPage === page ? "bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white" : ""}>
              {page}
            </Button>
          ))}
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Certificate Preview</DialogTitle>
            <DialogDescription>Preview the certificate before downloading.</DialogDescription>
          </DialogHeader>
          {selectedCert && (
            <CertificatePreview
              title={selectedCert.title}
              recipientName={selectedCert.recipientName}
              type={selectedCert.type}
              issuedDate={selectedCert.issuedDate}
              qrCode={selectedCert.qrCode ? selectedCert.certificateId : undefined}
            />
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>Close</Button>
            <Button variant="outline"><Printer className="w-4 h-4 mr-1" /> Print</Button>
            <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white"><Download className="w-4 h-4 mr-1" /> Download PDF</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
