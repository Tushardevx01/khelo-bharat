"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  action?: { label: string; onClick: () => void; icon?: LucideIcon };
}

export default function PageHeader({ title, subtitle, icon: Icon, action }: PageHeaderProps) {
  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
        )}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">{title}</h1>
          {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
      {action && (
        <Button onClick={action.onClick} className="rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white">
          {action.icon && <action.icon className="w-4 h-4 mr-2" />}
          {action.label}
        </Button>
      )}
    </motion.div>
  );
}