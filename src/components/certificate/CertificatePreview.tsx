"use client";

import { Download, Share2, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CertificatePreviewProps {
  title: string;
  recipientName: string;
  type: string;
  issuedDate: string;
  qrCode?: string;
}

export default function CertificatePreview({ title, recipientName, type, issuedDate, qrCode }: CertificatePreviewProps) {
  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-br from-[#FF6B35] to-[#D72638] p-8 text-center text-white relative">
        <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')] bg-repeat" />
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🏆</span>
          </div>
          <h2 className="text-sm uppercase tracking-widest mb-2">Certificate of {type}</h2>
          <div className="w-24 h-0.5 bg-white/50 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">This is to certify that</h1>
          <p className="text-3xl font-bold italic mb-4">{recipientName}</p>
          <p className="text-sm text-white/80">has been awarded this certificate for</p>
          <p className="text-xl font-semibold mt-2">{title}</p>
          <div className="mt-6 text-sm text-white/70">
            <p>Date: {issuedDate}</p>
            <p>Khelo Bharat - India&apos;s Premier Sports Platform</p>
          </div>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center gap-2">
          {qrCode && <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border"><QrCode className="w-8 h-8" /></div>}
          <span className="text-xs text-gray-500">Scan to verify</span>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="rounded-full"><Download className="w-4 h-4 mr-1" /> PDF</Button>
          <Button size="sm" variant="outline" className="rounded-full"><Share2 className="w-4 h-4 mr-1" /> Share</Button>
        </div>
      </div>
    </Card>
  );
}
