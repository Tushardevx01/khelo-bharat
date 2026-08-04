"use client";

import { useState } from "react";
import { Search, Mail, Reply } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const messages = [
  { id: 1, from: "Priya Sharma", subject: "Thank You for Sponsorship", preview: "I wanted to express my gratitude for the sponsorship...", date: "2024-06-01", read: false },
  { id: 2, from: "School Admin - Delhi Public", subject: "Partnership Report", preview: "Please find attached the quarterly partnership report...", date: "2024-05-30", read: true },
  { id: 3, from: "Rohan Joshi", subject: "Training Update", preview: "Hi, I wanted to share my progress from the last month...", date: "2024-05-28", read: false },
  { id: 4, from: "Khelo Bharat Team", subject: "Sponsorship Renewal", preview: "Your sponsorship agreement is up for renewal next month...", date: "2024-05-25", read: true },
  { id: 5, from: "Ananya Das", subject: "Competition Results", preview: "I won the state badminton championship! Thank you for...", date: "2024-05-22", read: false },
];

export default function SponsorMessagesPage() {
  const [search, setSearch] = useState("");

  const filtered = messages.filter((m) => m.from.toLowerCase().includes(search.toLowerCase()) || m.subject.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <DashboardHeader title="Messages" subtitle="Communications" />

      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-xl px-4 py-2.5 mb-6">
        <Search className="w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search messages..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm w-full" />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {filtered.map((msg) => (
              <div key={msg.id} className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 cursor-pointer ${!msg.read ? "bg-purple-50/50 dark:bg-purple-950/10" : ""}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${!msg.read ? "bg-gradient-to-br from-purple-500 to-purple-700 text-white" : "bg-gray-200 dark:bg-gray-800"}`}>
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className={`font-medium ${!msg.read ? "font-semibold" : ""}`}>{msg.from}</h4>
                        {!msg.read && <Badge className="bg-purple-500 text-white text-xs">New</Badge>}
                      </div>
                      <p className="text-sm font-medium mt-0.5">{msg.subject}</p>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">{msg.preview}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{msg.date}</p>
                    <Button variant="ghost" size="sm" className="mt-2"><Reply className="w-4 h-4 mr-1" /> Reply</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
