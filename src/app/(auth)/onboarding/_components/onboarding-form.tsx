"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateUserRole } from "@/actions/user.actions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Award, GraduationCap, Handshake, Loader2, Users } from "lucide-react";

type RoleOption = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
};

const ROLES: RoleOption[] = [
  {
    id: "ATHLETE",
    title: "Athlete",
    description: "Build your portfolio, showcase achievements, and find tournaments.",
    icon: Award,
  },
  {
    id: "COACH",
    title: "Coach",
    description: "Manage athletes, track performance, and discover new talent.",
    icon: Users,
  },
  {
    id: "SCHOOL_ADMIN",
    title: "School Admin",
    description: "Manage school athletes, teams, and tournament participations.",
    icon: GraduationCap,
  },
  {
    id: "SPONSOR",
    title: "Sponsor",
    description: "Discover rising talents and tournaments to sponsor.",
    icon: Handshake,
  },
];

export function OnboardingForm({ userId }: { userId: string }) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!selectedRole) return;
    
    setIsSubmitting(true);
    try {
      await updateUserRole(userId, selectedRole);
      // Wait a tiny bit for the session/user role to update before redirecting
      await new Promise(resolve => setTimeout(resolve, 500));
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to update role:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {ROLES.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;
          
          return (
            <Card
              key={role.id}
              className={cn(
                "cursor-pointer transition-all hover:border-primary/50",
                isSelected ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border bg-card hover:bg-card/80"
              )}
              onClick={() => setSelectedRole(role.id)}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className={cn(
                  "mb-4 rounded-full p-4 transition-colors",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-neutral-800 text-neutral-400"
                )}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{role.title}</h3>
                <p className="text-sm text-neutral-400">{role.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Button 
          size="lg" 
          disabled={!selectedRole || isSubmitting}
          onClick={handleSubmit}
          className="w-full max-w-sm"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Setting up your workspace...
            </>
          ) : (
            "Complete Setup"
          )}
        </Button>
      </div>
    </div>
  );
}
