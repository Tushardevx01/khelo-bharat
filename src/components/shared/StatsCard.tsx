"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  color?: string;
}

export default function StatsCard({ title, value, change, icon: Icon, color = "from-[#FF6B35] to-[#D72638]" }: StatsCardProps) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{title}</p>
              <p className="text-2xl font-bold mt-1">{value}</p>
              {change !== undefined && (
                <div className={`flex items-center gap-1 mt-1 text-sm ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{Math.abs(change)}% from last month</span>
                </div>
              )}
            </div>
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
