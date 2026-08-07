"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { registerForTournament } from "@/actions/tournament.actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface RegisterButtonProps {
  tournamentId: string;
  isRegistered?: boolean;
}

export function RegisterButton({ tournamentId, isRegistered = false }: RegisterButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [registered, setRegistered] = useState(isRegistered);

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      await registerForTournament(tournamentId);
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
