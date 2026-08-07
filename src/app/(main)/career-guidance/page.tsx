"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Target, BookOpen, Sparkles } from "lucide-react";

export default function CareerGuidancePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <PageHeader
            title="AI Career Guidance"
            description="Get personalized recommendations for your sports career."
          />
          <Badge variant="info" className="ml-2">Coming Soon</Badge>
        </div>

        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
              <Brain className="h-8 w-8 text-neutral-400" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-neutral-900 dark:text-white">
              AI-Powered Career Guidance
            </h3>
            <p className="mt-2 text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
              Our AI engine will analyze your performance data, achievements, and goals to provide
              personalized career recommendations and training plans.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:max-w-lg sm:mx-auto">
              {[
                { icon: TrendingUp, label: "Performance Analysis" },
                { icon: Target, label: "Goal Setting" },
                { icon: BookOpen, label: "Training Plans" },
              ].map((feature) => (
                <div key={feature.label} className="text-center">
                  <feature.icon className="mx-auto h-6 w-6 text-neutral-400" />
                  <p className="mt-2 text-xs text-neutral-500">{feature.label}</p>
                </div>
              ))}
            </div>
            <Button className="mt-8" disabled>
              <Sparkles className="mr-2 h-4 w-4" />
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
