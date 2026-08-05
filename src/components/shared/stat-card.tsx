import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, description, icon: Icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn("transition-all hover:shadow-md", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{title}</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-white">{value}</p>
            {description && (
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{description}</p>
            )}
            {trend && (
              <p className={cn(
                "mt-1 text-xs font-medium",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}>
                {trend.isPositive ? "+" : ""}{trend.value}% from last month
              </p>
            )}
          </div>
          <div className="rounded-xl bg-neutral-100 p-3 dark:bg-neutral-800">
            <Icon className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
