"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Mail, MailOpen, Archive, Reply, MessageSquare } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const initialMessages = [
  { id: 1, name: "Rahul Verma", email: "rahul@example.com", subject: "Inquiry about tournaments", date: "2024-09-01", status: "Pending", body: "Hello, I would like to know more about upcoming cricket tournaments in Delhi. Are there any age restrictions?" },
  { id: 2, name: "Sunita Patel", email: "sunita@example.com", subject: "Sponsorship proposal", date: "2024-09-02", status: "Read", body: "We are interested in sponsoring football events in Maharashtra. Please share the sponsorship packages available." },
  { id: 3, name: "Amit Kumar", email: "amit@example.com", subject: "Coach registration issue", date: "2024-09-03", status: "Replied", body: "I am unable to complete my coach registration. The form keeps erroring out when I try to upload my certification." },
  { id: 4, name: "Priya Singh", email: "priya@example.com", subject: "Feedback on platform", date: "2024-09-04", status: "Pending", body: "Great platform! I love how easy it is to find local sports events. Keep up the good work." },
  { id: 5, name: "Vikram Rao", email: "vikram@example.com", subject: "School partnership", date: "2024-09-05", status: "Archived", body: "Our school would like to partner with Khelo Bharat to provide sports opportunities for our students." },
  { id: 6, name: "Neha Gupta", email: "neha@example.com", subject: "Bug report", date: "2024-09-06", status: "Pending", body: "The leaderboard page is not loading properly on mobile devices. Please fix this issue." },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMsg, setViewMsg] = useState<typeof initialMessages[0] | null>(null);

  const filtered = messages.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.subject.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const markAsRead = (id: number) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, status: "Read" } : m)));
  };

  const archive = (id: number) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, status: "Archived" } : m)));
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "Pending": return "secondary";
      case "Read": return "default";
      case "Replied": return "outline";
      case "Archived": return "destructive";
      default: return "default";
    }
  };

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Contact Messages" subtitle="Manage incoming messages" notificationCount={messages.filter((m) => m.status === "Pending").length} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total", value: messages.length, color: "#FF6B35" },
          { label: "Pending", value: messages.filter((m) => m.status === "Pending").length, color: "#D72638" },
          { label: "Replied", value: messages.filter((m) => m.status === "Replied").length, color: "#FF6B35" },
          { label: "Archived", value: messages.filter((m) => m.status === "Archived").length, color: "#D72638" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card>
              <CardContent className="flex items-center gap-4 py-4">
                <div className="p-3 rounded-xl" style={{ backgroundColor: `${s.color}15` }}>
                  <MessageSquare className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle>Messages</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search messages..." className="pl-9 w-56" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <select
                  className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Read">Read</option>
                  <option value="Replied">Replied</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((msg) => (
                  <TableRow key={msg.id}>
                    <TableCell className="font-medium">{msg.name}</TableCell>
                    <TableCell className="text-muted-foreground">{msg.email}</TableCell>
                    <TableCell>{msg.subject}</TableCell>
                    <TableCell className="text-muted-foreground">{msg.date}</TableCell>
                    <TableCell>
                      <Badge variant={statusColor(msg.status) as any}>{msg.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon-sm" onClick={() => { setViewMsg(msg); markAsRead(msg.id); }}>
                          {msg.status === "Read" ? <MailOpen className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button variant="ghost" size="icon-sm" onClick={() => archive(msg.id)}>
                          <Archive className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon-sm">
                          <Reply className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={!!viewMsg} onOpenChange={() => setViewMsg(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{viewMsg?.subject}</DialogTitle>
            <DialogDescription>From {viewMsg?.name} ({viewMsg?.email}) on {viewMsg?.date}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm leading-relaxed">{viewMsg?.body}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => viewMsg && archive(viewMsg.id)}>
              <Archive className="w-4 h-4 mr-1" /> Archive
            </Button>
            <Button style={{ backgroundColor: "#FF6B35", color: "white" }}>
              <Reply className="w-4 h-4 mr-1" /> Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
