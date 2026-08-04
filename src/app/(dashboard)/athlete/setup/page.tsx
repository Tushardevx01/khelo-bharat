"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { setupProfileAction } from "@/features/athletes/actions/athlete.actions";
import { AthleteProfileSchema, type AthleteProfileInput } from "@/features/athletes/validators";

export default function AthleteSetupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<AthleteProfileInput>({
    resolver: zodResolver(AthleteProfileSchema),
  });

  const onSubmit = async (data: AthleteProfileInput) => {
    setIsLoading(true);
    try {
      const result = await setupProfileAction(data);
      if (!result.success) {
        toast.error(result.error || "Failed to setup profile");
        return;
      }
      toast.success("Profile setup successfully!");
      router.push("/athlete");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Complete Your Athlete Profile</h1>
        <p className="text-gray-500 mt-1">Tell us more about your athletic background.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} className="rounded-xl" />
            {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Input id="gender" placeholder="e.g. Male, Female" {...register("gender")} className="rounded-xl" />
            {errors.gender && <p className="text-sm text-red-500">{errors.gender.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="Mumbai" {...register("city")} className="rounded-xl" />
            {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" placeholder="Maharashtra" {...register("state")} className="rounded-xl" />
            {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="sports">Primary Sports</Label>
            <Input id="sports" placeholder="Cricket, Football" {...register("sports")} className="rounded-xl" />
            {errors.sports && <p className="text-sm text-red-500">{errors.sports.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Position/Role</Label>
            <Input id="position" placeholder="Batsman, Striker" {...register("position")} className="rounded-xl" />
            {errors.position && <p className="text-sm text-red-500">{errors.position.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <textarea
            id="bio"
            rows={4}
            placeholder="Tell us about yourself..."
            className="w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            {...register("bio")}
          />
          {errors.bio && <p className="text-sm text-red-500">{errors.bio.message}</p>}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full h-12 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white">
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
          Save Profile
        </Button>
      </form>
    </div>
  );
}
