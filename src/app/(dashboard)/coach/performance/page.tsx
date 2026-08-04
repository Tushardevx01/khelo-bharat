"use client";

import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const performanceData = [
  { month: "Jan", score: 75 },
  { month: "Feb", score: 78 },
  { month: "Mar", score: 82 },
  { month: "Apr", score: 80 },
  { month: "May", score: 85 },
  { month: "Jun", score: 87 },
];

const sportPerformance = [
  { sport: "Cricket", avg: 88 },
  { sport: "Tennis", avg: 85 },
  { sport: "Football", avg: 82 },
  { sport: "Basketball", avg: 79 },
  { sport: "Badminton", avg: 90 },
];

const athletePerformance = [
  { name: "Riya Singh", score: 95 },
  { name: "Aarav Kumar", score: 92 },
  { name: "Anika Gupta", score: 90 },
  { name: "Diya Patel", score: 88 },
  { name: "Kavya Reddy", score: 87 },
  { name: "Vivaan Sharma", score: 85 },
  { name: "Arjun Nair", score: 82 },
  { name: "Aditya Verma", score: 79 },
];

export default function PerformancePage() {
  return (
    <div>
      <DashboardHeader title="Performance Tracking" subtitle="Monitor athlete and team performance" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[70, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#22C55E" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance by Sport</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sportPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[70, 100]} />
                <YAxis type="category" dataKey="sport" />
                <Tooltip />
                <Bar dataKey="avg" fill="#22C55E" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Athlete Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {athletePerformance.map((athlete, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white text-sm font-bold">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{athlete.name}</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 mt-1">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${athlete.score}%` }} />
                  </div>
                </div>
                <span className="font-medium text-green-600">{athlete.score}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
