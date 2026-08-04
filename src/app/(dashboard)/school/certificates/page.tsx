"use client";

import { useState } from "react";
import { Search, Award, Download, Plus } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const certificates = [
  { id: 1, title: "Sports Excellence Award", recipient: "Aarav Kumar", type: "Achievement", issued: "2024-05-20", status: "Issued" },
  { id: 2, title: "Best Athlete Certificate", recipient: "Diya Patel", type: "Award", issued: "2024-04-15", status: "Issued" },
  { id: 3, title: "Tournament Winner", recipient: "Riya Singh", type: "Achievement", issued: "2024-06-01", status: "Pending" },
  { id: 4, title: "Attendance Champion", recipient: "Vivaan Sharma", type: "Achievement", issued: "2024-03-28", status: "Issued" },
  { id: 5, title: "Coach Appreciation", recipient: "Rajesh Kumar", type: "Award", issued: "2024-05-10", status: "Issued" },
];

export default function SchoolCertificatesPage() {
  const [search, setSearch] = useState("");

  const filtered = certificates.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()) || c.recipient.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <DashboardHeader title="Certificates" subtitle="Manage school certificates" />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-xl px-4 py-2.5 flex-1">
          <Search className="w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search certificates..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm w-full" />
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" /> Issue Certificate
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-900">
                  <th className="text-left py-3 px-4 font-medium">Certificate</th>
                  <th className="text-left py-3 px-4 font-medium">Recipient</th>
                  <th className="text-left py-3 px-4 font-medium">Type</th>
                  <th className="text-left py-3 px-4 font-medium">Issued</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((cert) => (
                  <tr key={cert.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <td className="py-3 px-4 font-medium">{cert.title}</td>
                    <td className="py-3 px-4">{cert.recipient}</td>
                    <td className="py-3 px-4"><Badge variant="secondary">{cert.type}</Badge></td>
                    <td className="py-3 px-4 text-gray-500">{cert.issued}</td>
                    <td className="py-3 px-4">
                      <Badge variant={cert.status === "Issued" ? "default" : "outline"}>{cert.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm"><Download className="w-4 h-4 mr-1" /> Download</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
