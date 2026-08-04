"use client";

import { type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <Icon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400">{title}</h3>
      <p className="text-gray-400 mt-2 max-w-md mx-auto">{description}</p>
      {action && (
        <Button onClick={action.onClick} className="mt-6 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white">
          {action.label}
        </Button>
      )}
    </div>
  );
}
