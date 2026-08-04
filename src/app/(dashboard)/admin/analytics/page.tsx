"use client";

import { motion } from "framer-motion";
import { Users, Trophy, TrendingUp, DollarSign, Eye, UserPlus } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

const registrationData = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 180 },
  { month: "Mar", users: 250 },
  { month: "Apr", users: 310 },
  { month: "May", users: 420 },
  { month: "Jun", users: 380 },
  { month: "Jul", users: 520 },
  { month: "Aug", users: 610 },
  { month: "Sep", users: 480 },
];

const userDistribution = [
  { name: "Athletes", value: 450, color: "#FF6B35" },
  { name: "Coaches", value: 120, color: "#D72638" },
  { name: "Schools", value: 85, color: "#FF6B35" },
  { name: "Sponsors", value: 45, color: "#D72638" },
];

const tournamentStatus = [
  { name: "Completed", value: 32, color: "#FF6B35" },
  { name: "Active", value: 8, color: "#D72638" },
  { name: "Upcoming", value: 15, color: "#FF6B35" },
];

const growthData = [
  { month: "Jan", registrations: 120, active: 95 },
  { month: "Feb", registrations: 180, active: 140 },
  { month: "Mar", registrations: 250, active: 200 },
  { month: "Apr", registrations: 310, active: 260 },
  { month: "May", registrations: 420, active: 350 },
  { month: "Jun", registrations: 380, active: 320 },
  { month: "Jul", registrations: 520, active: 440 },
  { month: "Aug", registrations: 610, active: 530 },
  { month: "Sep", registrations: 480, active: 410 },
];

const stats = [
  { label: "Total Users", value: "1,234", icon: Users, color: "#FF6B35", change: "+12%" },
  { label: "Active Tournaments", value: "8", icon: Trophy, color: "#D72638", change: "+3" },
  { label: "Page Views", value: "45.2K", icon: Eye, color: "#FF6B35", change: "+18%" },
  { label: "New This Month", value: "130", icon: UserPlus, color: "#D72638", change: "+22%" },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader title="Analytics Dashboard" subtitle="Platform insights and metrics" notificationCount={0} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card>
              <CardContent className="py-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${s.color}15` }}>
                    <s.icon className="w-4 h-4" style={{ color: s.color }} />
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: `${s.color}15`, color: s.color }}>
                    {s.change}
                  </span>
                </div>
                <p className="text-2xl font-bold mt-2">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle>Monthly Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={registrationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="users" fill="#FF6B35" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={userDistribution} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {userDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card>
            <CardHeader>
              <CardTitle>Tournament Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tournamentStatus.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="flex-1 text-sm">{item.name}</span>
                    <span className="font-bold">{item.value}</span>
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(item.value / 55) * 100}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card>
            <CardHeader>
              <CardTitle>Growth Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="registrations" stroke="#FF6B35" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="active" stroke="#D72638" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
