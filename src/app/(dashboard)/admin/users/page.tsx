"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Pencil, Trash2, Users, Shield, UserCheck, UserX } from "lucide-react";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const mockUsers = [
  { id: 1, name: "Aarav Sharma", email: "aarav@example.com", role: "Admin", status: "Active", joined: "2024-01-15" },
  { id: 2, name: "Priya Patel", email: "priya@example.com", role: "Coach", status: "Active", joined: "2024-02-20" },
  { id: 3, name: "Rohan Gupta", email: "rohan@example.com", role: "Athlete", status: "Active", joined: "2024-03-10" },
  { id: 4, name: "Sneha Reddy", email: "sneha@example.com", role: "School Admin", status: "Inactive", joined: "2024-04-05" },
  { id: 5, name: "Vikram Singh", email: "vikram@example.com", role: "Coach", status: "Active", joined: "2024-05-12" },
  { id: 6, name: "Ananya Nair", email: "ananya@example.com", role: "Athlete", status: "Active", joined: "2024-06-18" },
  { id: 7, name: "Karthik Menon", email: "karthik@example.com", role: "Sponsor", status: "Pending", joined: "2024-07-22" },
  { id: 8, name: "Deepa Kumari", email: "deepa@example.com", role: "Athlete", status: "Active", joined: "2024-08-01" },
  { id: 9, name: "Arjun Verma", email: "arjun@example.com", role: "Coach", status: "Inactive", joined: "2024-08-15" },
  { id: 10, name: "Meera Joshi", email: "meera@example.com", role: "School Admin", status: "Active", joined: "2024-09-02" },
];

const stats = [
  { label: "Total Users", value: 10, icon: Users, color: "#FF6B35" },
  { label: "Coaches", value: 3, icon: Shield, color: "#D72638" },
  { label: "Active", value: 7, icon: UserCheck, color: "#FF6B35" },
  { label: "Inactive", value: 3, icon: UserX, color: "#D72638" },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewUser, setViewUser] = useState<typeof mockUsers[0] | null>(null);

  const filtered = mockUsers.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="min-h-screen">
      <DashboardHeader title="User Management" subtitle="Manage all platform users" notificationCount={3} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card>
              <CardContent className="flex items-center gap-4 py-4">
                <div className="p-3 rounded-xl" style={{ backgroundColor: `${s.color}15` }}>
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
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
              <CardTitle>Users</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search users..." className="pl-9 w-56" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Coach">Coach</SelectItem>
                    <SelectItem value="Athlete">Athlete</SelectItem>
                    <SelectItem value="School Admin">School Admin</SelectItem>
                    <SelectItem value="Sponsor">Sponsor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "Active" ? "default" : user.status === "Inactive" ? "destructive" : "secondary"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.joined}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon-sm" onClick={() => setViewUser(user)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon-sm">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon-sm" onClick={() => setDeleteId(user.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
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

      <Dialog open={!!viewUser} onOpenChange={() => setViewUser(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>Viewing user information</DialogDescription>
          </DialogHeader>
          {viewUser && (
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium">{viewUser.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span className="font-medium">{viewUser.email}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Role</span><Badge variant="outline">{viewUser.role}</Badge></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><Badge variant={viewUser.status === "Active" ? "default" : "destructive"}>{viewUser.status}</Badge></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Joined</span><span className="font-medium">{viewUser.joined}</span></div>
            </div>
          )}
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>Are you sure you want to delete this user? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
            <Button variant="destructive" onClick={() => setDeleteId(null)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
