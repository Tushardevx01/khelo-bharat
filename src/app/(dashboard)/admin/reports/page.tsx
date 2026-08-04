"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Users, Trophy, DollarSign, Activity, Calendar, TrendingUp, BarChart3 } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const reportCards = [
  {
    title: "User Growth Report",
    description: "Monthly user registration trends and demographics",
    icon: Users,
    color: "#FF6B35",
    stats: { total: "1,234", growth: "+22%", period: "Sep 2024" },
  },
  {
    title: "Tournament Stats",
    description: "Tournament participation, completion rates, and winners",
    icon: Trophy,
    color: "#D72638",
    stats: { total: "55", growth: "+8", period: "Sep 2024" },
  },
  {
    title: "Revenue Report",
    description: "Sponsorship revenue, ticket sales, and partnerships",
    icon: DollarSign,
    color: "#FF6B35",
    stats: { total: "₹12.5L", growth: "+15%", period: "Sep 2024" },
  },
  {
    title: "Engagement Metrics",
    description: "User activity, session duration, and feature usage",
    icon: Activity,
    color: "#D72638",
    stats: { total: "45.2K", growth: "+18%", period: "Sep 2024" },
  },
];

const monthlyData = [
  { month: "Jan", revenue: 80000, expenses: 45000 },
  { month: "Feb", revenue: 95000, expenses: 50000 },
  { month: "Mar", revenue: 110000, expenses: 55000 },
  { month: "Apr", revenue: 125000, expenses: 60000 },
  { month: "May", revenue: 140000, expenses: 65000 },
  { month: "Jun", revenue: 130000, expenses: 58000 },
  { month: "Jul", revenue: 155000, expenses: 70000 },
  { month: "Aug", revenue: 170000, expenses: 75000 },
  { month: "Sep", revenue: 125000, expenses: 62000 },
];

const summaryStats = [
  { label: "Total Users", value: "1,234", icon: Users, color: "#FF6B35" },
  { label: "Tournaments", value: "55", icon: Trophy, color: "#D72638" },
  { label: "Revenue", value: "₹12.5L", icon: DollarSign, color: "#FF6B35" },
  { label: "Engagement", value: "45.2K", icon: BarChart3, color: "#D72638" },
];

export default function ReportsPage() {
  const [dateFrom, setDateFrom] = useState("2024-01-01");
  const [dateTo, setDateTo] = useState("2024-09-30");

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Reports" subtitle="Analytics and reports overview" notificationCount={0} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <input
              type="date"
              className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <span className="text-muted-foreground">to</span>
          <div className="flex items-center gap-2">
            <input
              type="date"
              className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-1" /> Export All
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {summaryStats.map((s, i) => (
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {reportCards.map((report, i) => (
          <motion.div key={report.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}>
            <Card className="hover:ring-2 transition-all" style={{ ["--tw-ring-color" as string]: report.color }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${report.color}15` }}>
                      <report.icon className="w-5 h-5" style={{ color: report.color }} />
                    </div>
                    <div>
                      <CardTitle className="text-base">{report.title}</CardTitle>
                      <CardDescription className="text-xs mt-1">{report.description}</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon-sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold" style={{ color: report.color }}>{report.stats.total}</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" style={{ color: report.color }} />
                      {report.stats.growth}
                    </p>
                    <p className="text-xs text-muted-foreground">{report.stats.period}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value: any) => `₹${(value / 1000).toFixed(0)}K`} />
                <Bar dataKey="revenue" fill="#FF6B35" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expenses" fill="#D72638" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
