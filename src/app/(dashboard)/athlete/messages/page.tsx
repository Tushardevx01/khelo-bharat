"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Search, Phone, Video, MoreVertical, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardHeader from "@/components/layout/DashboardHeader";

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  time: string;
}

interface Conversation {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
  avatarColor: string;
}

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Coach Rajesh Kumar",
    role: "Head Coach",
    lastMessage: "Great practice today! Let's work on your swing tomorrow.",
    time: "2m ago",
    unread: 2,
    online: true,
    avatarColor: "from-[#FF6B35] to-[#D72638]",
    messages: [
      { id: "1", text: "Hi Arjun! How are you feeling after today's practice?", sender: "other", time: "10:30 AM" },
      { id: "2", text: "Feeling great coach! My bowling arm is getting better.", sender: "me", time: "10:32 AM" },
      { id: "3", text: "That's wonderful to hear. I noticed your speed has improved.", sender: "other", time: "10:35 AM" },
      { id: "4", text: "Thank you! I've been doing the extra drills you suggested.", sender: "me", time: "10:37 AM" },
      { id: "5", text: "Great practice today! Let's work on your swing tomorrow.", sender: "other", time: "10:40 AM" },
    ],
  },
  {
    id: "2",
    name: "Dr. Priya Sharma",
    role: "Sports Physiotherapist",
    lastMessage: "Your recovery report looks good. See you next week.",
    time: "1h ago",
    unread: 0,
    online: true,
    avatarColor: "from-blue-500 to-purple-600",
    messages: [
      { id: "1", text: "Hi Dr. Sharma, my shoulder feels much better now.", sender: "me", time: "9:00 AM" },
      { id: "2", text: "That's great to hear! Have you been doing the stretches?", sender: "other", time: "9:05 AM" },
      { id: "3", text: "Yes, twice a day as you recommended.", sender: "me", time: "9:07 AM" },
      { id: "4", text: "Your recovery report looks good. See you next week.", sender: "other", time: "9:10 AM" },
    ],
  },
  {
    id: "3",
    name: "Team India Cricket",
    role: "Team Chat",
    lastMessage: "Team meeting at 4 PM tomorrow. Be on time!",
    time: "3h ago",
    unread: 5,
    online: false,
    avatarColor: "from-green-500 to-emerald-600",
    messages: [
      { id: "1", text: "Welcome to the team chat, everyone!", sender: "other", time: "8:00 AM" },
      { id: "2", text: "Excited to be here! 🏏", sender: "me", time: "8:05 AM" },
      { id: "3", text: "Team meeting at 4 PM tomorrow. Be on time!", sender: "other", time: "8:10 AM" },
    ],
  },
  {
    id: "4",
    name: "Amit Singh",
    role: "Teammate",
    lastMessage: "Ready for tomorrow's match? Let's crush it!",
    time: "5h ago",
    unread: 0,
    online: false,
    avatarColor: "from-yellow-500 to-orange-600",
    messages: [
      { id: "1", text: "Hey! How's preparation going?", sender: "other", time: "7:00 AM" },
      { id: "2", text: "Going well! Been practicing my batting.", sender: "me", time: "7:15 AM" },
      { id: "3", text: "Ready for tomorrow's match? Let's crush it!", sender: "other", time: "7:20 AM" },
    ],
  },
  {
    id: "5",
    name: "Sports Authority of India",
    role: "Official",
    lastMessage: "Your scholarship application has been approved!",
    time: "1d ago",
    unread: 1,
    online: false,
    avatarColor: "from-[#D72638] to-red-700",
    messages: [
      { id: "1", text: "Dear Arjun, we are pleased to inform you...", sender: "other", time: "Yesterday" },
      { id: "2", text: "Your scholarship application has been approved!", sender: "other", time: "Yesterday" },
    ],
  },
];

export default function AthleteMessagesPage() {
  const [selectedConv, setSelectedConv] = useState<Conversation>(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConv.messages]);

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: String(Date.now()),
      text: newMessage,
      sender: "me",
      time: "Now",
    };
    setSelectedConv((prev) => ({
      ...prev,
      messages: [...prev.messages, msg],
      lastMessage: newMessage,
      time: "Now",
    }));
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const selectConversation = (conv: Conversation) => {
    setSelectedConv(conv);
    setMobileShowChat(true);
  };

  return (
    <div className="space-y-6">
      <DashboardHeader title="Messages" subtitle="Chat with coaches and teammates" notificationCount={3} />

      <Card className="overflow-hidden h-[calc(100vh-220px)] min-h-[500px]">
        <div className="flex h-full">
          {/* Conversation List */}
          <div className={`w-full md:w-80 lg:w-96 border-r flex flex-col ${mobileShowChat ? "hidden md:flex" : "flex"}`}>
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => selectConversation(conv)}
                  className={`w-full p-3 flex items-start gap-3 hover:bg-muted/50 transition-colors text-left ${
                    selectedConv.id === conv.id ? "bg-muted" : ""
                  }`}
                >
                  <div className="relative shrink-0">
                    <Avatar size="default">
                      <AvatarImage src="" alt={conv.name} />
                      <AvatarFallback className={`bg-gradient-to-br ${conv.avatarColor} text-white text-sm`}>
                        {conv.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    {conv.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm truncate">{conv.name}</span>
                      <span className="text-xs text-gray-400 shrink-0">{conv.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{conv.role}</p>
                    <p className="text-sm text-gray-500 truncate mt-0.5">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <Badge className="bg-[#FF6B35] text-white shrink-0 w-5 h-5 p-0 flex items-center justify-center text-xs">
                      {conv.unread}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${!mobileShowChat ? "hidden md:flex" : "flex"}`}>
            {/* Chat Header */}
            <div className="p-3 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="md:hidden"
                  onClick={() => setMobileShowChat(false)}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="relative">
                  <Avatar size="default">
                    <AvatarImage src="" alt={selectedConv.name} />
                    <AvatarFallback className={`bg-gradient-to-br ${selectedConv.avatarColor} text-white text-sm`}>
                      {selectedConv.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  {selectedConv.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{selectedConv.name}</h3>
                  <p className="text-xs text-gray-500">{selectedConv.online ? "Online" : "Offline"}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon-sm"><Phone className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon-sm"><Video className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon-sm"><MoreVertical className="w-4 h-4" /></Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50 dark:bg-gray-900/50">
              {selectedConv.messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                      msg.sender === "me"
                        ? "bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white rounded-br-md"
                        : "bg-white dark:bg-gray-800 shadow-sm rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === "me" ? "text-white/70" : "text-gray-400"}`}>
                      {msg.time}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-3 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white hover:opacity-90 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
