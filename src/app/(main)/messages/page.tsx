"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Search, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function MessagesPage() {
  const [message, setMessage] = useState("");
  const [activeChat, setActiveChat] = useState(false);

  const conversations = [
    { id: "1", name: "Rajesh Kumar", role: "Coach", lastMessage: "Great progress in the last match!", time: "2m ago", unread: 2 },
    { id: "2", name: "Sports India", role: "Sponsor", lastMessage: "We'd like to discuss a partnership.", time: "1h ago", unread: 1 },
    { id: "3", name: "Aarav Singh", role: "Athlete", lastMessage: "See you at practice tomorrow.", time: "3h ago", unread: 0 },
  ];

  const messages = [
    { id: "1", sender: "Rajesh Kumar", content: "Hi! I wanted to congratulate you on your performance in the last tournament.", time: "10:30 AM", isOwn: false },
    { id: "2", sender: "You", content: "Thank you, Coach! Your training really paid off.", time: "10:32 AM", isOwn: true },
    { id: "3", sender: "Rajesh Kumar", content: "Great progress in the last match! Keep it up.", time: "10:35 AM", isOwn: false },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="Messages"
          description="Communicate with coaches, sponsors, and athletes."
        />

        <div className="grid gap-6 lg:grid-cols-3" style={{ minHeight: "calc(100vh - 280px)" }}>
          <Card className={`lg:col-span-1 overflow-hidden ${activeChat ? 'hidden lg:block' : ''}`}>
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <Input placeholder="Search conversations..." className="pl-10" />
              </div>
            </div>
            <div className="overflow-y-auto">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setActiveChat(true)}
                  className="flex items-center gap-3 p-4 border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 cursor-pointer"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                        {conv.name}
                      </p>
                      <span className="text-xs text-neutral-500">{conv.time}</span>
                    </div>
                    <p className="text-xs text-neutral-500 truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {conv.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card className={`lg:col-span-2 flex flex-col overflow-hidden ${!activeChat ? 'hidden lg:flex' : 'flex'}`}>
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 lg:hidden"
                  onClick={() => setActiveChat(false)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Avatar className="h-10 w-10">
                  <AvatarFallback>RK</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Rajesh Kumar</p>
                  <p className="text-xs text-neutral-500">Coach</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-xl px-4 py-2 ${
                      msg.isOwn
                        ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                        : "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.isOwn ? "text-neutral-400" : "text-neutral-500"}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
