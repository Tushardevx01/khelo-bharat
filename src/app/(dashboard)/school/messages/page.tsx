"use client";

import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Search } from "lucide-react";

const conversations = [
  { id: "1", name: "Coach Rajesh Kumar", role: "Coach", lastMessage: "Team lineup is ready for tomorrow", time: "15m ago", unread: 2, online: true },
  { id: "2", name: "Arjun Mehta", role: "Student", lastMessage: "Thank you for the certificate!", time: "1h ago", unread: 0, online: true },
  { id: "3", name: "Priya Sharma", role: "Student", lastMessage: "Can I get a copy of my report?", time: "3h ago", unread: 1, online: false },
  { id: "4", name: "Coach Amit Singh", role: "Coach", lastMessage: "Cricket practice moved to 5 PM", time: "Yesterday", unread: 0, online: false },
  { id: "5", name: "Sneha Patel", role: "Student", lastMessage: "Badminton tournament registration done", time: "Yesterday", unread: 0, online: true },
];

const messages = [
  { id: "1", sender: "them", text: "Good morning! The team lineup for tomorrow's match is ready.", time: "9:00 AM" },
  { id: "2", sender: "me", text: "Great! Please share the final list.", time: "9:05 AM" },
  { id: "3", sender: "them", text: "I've shortlisted 11 players. Arjun will captain.", time: "9:08 AM" },
  { id: "4", sender: "me", text: "Perfect choice. Let's do a practice session today.", time: "9:10 AM" },
  { id: "5", sender: "them", text: "Team lineup is ready for tomorrow", time: "9:15 AM" },
];

export default function SchoolMessagesPage() {
  const [activeConvo, setActiveConvo] = useState("1");
  const [newMsg, setNewMsg] = useState("");

  return (
    <div>
      <DashboardHeader title="Messages" subtitle="Communicate with coaches and students." notificationCount={3} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-220px)]">
        <Card className="overflow-hidden">
          <div className="p-3 border-b">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search conversations..." className="bg-transparent border-none outline-none text-sm w-full" />
            </div>
          </div>
          <div className="overflow-y-auto">
            {conversations.map((c) => (
              <div key={c.id} onClick={() => setActiveConvo(c.id)} className={`flex items-center gap-3 p-3 cursor-pointer border-b transition-colors ${activeConvo === c.id ? "bg-[#FF6B35]/5" : "hover:bg-gray-50 dark:hover:bg-gray-900"}`}>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center text-white text-xs font-bold">
                    {c.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  {c.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate">{c.name}</span>
                    <span className="text-xs text-gray-500">{c.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{c.lastMessage}</p>
                </div>
                {c.unread > 0 && (
                  <Badge className="bg-[#FF6B35] text-white w-5 h-5 p-0 flex items-center justify-center text-[10px]">{c.unread}</Badge>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2 flex flex-col overflow-hidden">
          <div className="flex items-center gap-3 p-4 border-b">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center text-white text-xs font-bold">RK</div>
            <div>
              <p className="text-sm font-medium">Coach Rajesh Kumar</p>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${msg.sender === "me" ? "bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white rounded-br-sm" : "bg-gray-100 dark:bg-gray-800 rounded-bl-sm"}`}>
                  <p>{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.sender === "me" ? "text-white/70" : "text-gray-500"}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Input placeholder="Type a message..." value={newMsg} onChange={(e) => setNewMsg(e.target.value)} className="flex-1" />
              <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white hover:opacity-90" size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
