"use client";

import { useState } from "react";
import { Search, Filter, MoreHorizontal, UserPlus } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const users = [
  { id: 1, name: "Priya Sharma", email: "priya@example.com", role: "Athlete", school: "Delhi Public School", status: "Active", joined: "2024-01-15" },
  { id: 2, name: "Rahul Verma", email: "rahul@example.com", role: "Coach", school: "Mumbai Sports Academy", status: "Active", joined: "2024-02-20" },
  { id: 3, name: "Anita Patel", email: "anita@example.com", role: "School Admin", school: "Bangalore International", status: "Pending", joined: "2024-03-10" },
  { id: 4, name: "Vikram Singh", email: "vikram@example.com", role: "Sponsor", school: "N/A", status: "Active", joined: "2024-01-05" },
  { id: 5, name: "Neha Gupta", email: "neha@example.com", role: "Athlete", school: "Chennai Academy", status: "Inactive", joined: "2024-04-12" },
  { id: 6, name: "Amit Kumar", email: "amit@example.com", role: "Coach", school: "Kolkata Sports School", status: "Active", joined: "2024-02-28" },
  { id: 7, name: "Sunita Reddy", email: "sunita@example.com", role: "Athlete", school: "Hyderabad Public", status: "Active", joined: "2024-03-22" },
  { id: 8, name: "Ravi Shankar", email: "ravi@example.com", role: "School Admin", school: "Jaipur Academy", status: "Active", joined: "2024-01-30" },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div>
      <DashboardHeader title="User Management" subtitle="Manage all platform users" notificationCount={3} />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-xl px-4 py-2.5 flex-1">
          <Search className="w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm w-full" />
        </div>
        <div className="flex gap-2">
          {["All", "Athlete", "Coach", "School Admin", "Sponsor"].map((role) => (
            <Button key={role} variant={roleFilter === role ? "default" : "outline"} size="sm" onClick={() => setRoleFilter(role)} className={roleFilter === role ? "bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white" : ""}>
              {role}
            </Button>
          ))}
        </div>
        <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white">
          <UserPlus className="w-4 h-4 mr-2" /> Add User
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-900">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Email</th>
                  <th className="text-left py-3 px-4 font-medium">Role</th>
                  <th className="text-left py-3 px-4 font-medium">School</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Joined</th>
                  <th className="text-left py-3 px-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <td className="py-3 px-4 font-medium">{user.name}</td>
                    <td className="py-3 px-4 text-gray-500">{user.email}</td>
                    <td className="py-3 px-4"><Badge variant="secondary">{user.role}</Badge></td>
                    <td className="py-3 px-4 text-gray-500">{user.school}</td>
                    <td className="py-3 px-4">
                      <Badge variant={user.status === "Active" ? "default" : user.status === "Pending" ? "outline" : "destructive"}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-500">{user.joined}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
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
