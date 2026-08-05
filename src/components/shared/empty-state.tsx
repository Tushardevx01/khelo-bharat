import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12", className)}>
      <div className="rounded-full bg-neutral-100 p-4 dark:bg-neutral-800">
        <Icon className="h-8 w-8 text-neutral-400" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 text-center max-w-sm">
        {description}
      </p>
      {action && (
        <Button asChild className="mt-4">
          <a href={action.href}>{action.label}</a>
        </Button>
      )}
    </div>
  );
}
