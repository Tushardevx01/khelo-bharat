"use client";

import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Search, User } from "lucide-react";

const conversations = [
  { id: "1", name: "Arjun Mehta", sport: "Athletics", lastMessage: "Ready for tomorrow's session!", time: "10m ago", unread: 2, online: true },
  { id: "2", name: "Priya Sharma", sport: "Swimming", lastMessage: "Can we reschedule Wednesday?", time: "1h ago", unread: 0, online: true },
  { id: "3", name: "Rohan Verma", sport: "Cricket", lastMessage: "Thanks for the feedback coach!", time: "3h ago", unread: 0, online: false },
  { id: "4", name: "Sneha Patel", sport: "Badminton", lastMessage: "My ankle is feeling better", time: "Yesterday", unread: 1, online: false },
  { id: "5", name: "Vikram Singh", sport: "Wrestling", lastMessage: "See you at practice", time: "Yesterday", unread: 0, online: true },
  { id: "6", name: "Ananya Das", sport: "Hockey", lastMessage: "Coach, I have a question about drills", time: "2 days ago", unread: 0, online: false },
];

const messages = [
  { id: "1", sender: "them", text: "Good morning coach! How was my performance yesterday?", time: "9:30 AM" },
  { id: "2", sender: "me", text: "Great improvement in your sprint time, Arjun! You shaved off 0.3 seconds.", time: "9:35 AM" },
  { id: "3", sender: "them", text: "That's amazing! I've been following the training plan.", time: "9:37 AM" },
  { id: "4", sender: "me", text: "Keep it up! We'll push harder this week.", time: "9:40 AM" },
  { id: "5", sender: "them", text: "Ready for tomorrow's session!", time: "10:00 AM" },
];

export default function CoachMessagesPage() {
  const [activeConvo, setActiveConvo] = useState("1");
  const [newMsg, setNewMsg] = useState("");

  return (
    <div>
      <DashboardHeader title="Messages" subtitle="Communicate with your athletes." notificationCount={3} />

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
              <div
                key={c.id}
                onClick={() => setActiveConvo(c.id)}
                className={`flex items-center gap-3 p-3 cursor-pointer border-b transition-colors ${
                  activeConvo === c.id ? "bg-[#FF6B35]/5" : "hover:bg-gray-50 dark:hover:bg-gray-900"
                }`}
              >
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
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center text-white text-xs font-bold">
              AM
            </div>
            <div>
              <p className="text-sm font-medium">Arjun Mehta</p>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                    msg.sender === "me"
                      ? "bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white rounded-br-sm"
                      : "bg-gray-100 dark:bg-gray-800 rounded-bl-sm"
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.sender === "me" ? "text-white/70" : "text-gray-500"}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Type a message..."
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                className="flex-1"
              />
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
