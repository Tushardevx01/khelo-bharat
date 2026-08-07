"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { registerForTournament } from "@/actions/tournament.actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { useAuth } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";

interface RegisterButtonProps {
  tournamentId: string;
  isRegistered?: boolean;
}

export function RegisterButton({ tournamentId, isRegistered = false }: RegisterButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [registered, setRegistered] = useState(isRegistered);
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleRegister = async () => {
    if (!isSignedIn) {
      router.push(`/login?redirect_url=${encodeURIComponent(pathname)}`);
      return;
    }

    try {
      setIsLoading(true);
      const res = await registerForTournament(tournamentId);
      
      if (res?.error) {
        if (res.error === "ATHLETE_NOT_FOUND") {
          toast.error("Please complete your athlete profile first.");
          router.push("/onboarding");
          return;
        }
        toast.error(res.error);
        return;
      }
      
      setRegistered(true);
      toast.success("Successfully registered for the tournament!");
    } catch (error: any) {
      toast.error(error.message || "Failed to register. Are you an athlete?");
    } finally {
      setIsLoading(false);
    }
  };

  if (registered) {
    return (
      <Button className="w-full bg-green-500/10 text-green-500 hover:bg-green-500/20" size="lg" disabled>
        Registered
      </Button>
    );
  }

  return (
    <Button 
      className="w-full" 
      size="lg" 
      onClick={handleRegister} 
      disabled={isLoading}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Register Now
    </Button>
  );
}
