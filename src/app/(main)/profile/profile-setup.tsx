"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SportCategory, UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SPORT_CATEGORIES } from "@/constants";
import { createAthleteProfile } from "@/actions/athlete.actions";
import { createCoachProfile } from "@/actions/coach.actions";
import { createSchoolProfile } from "@/actions/school.actions";
import { createSponsorProfile } from "@/actions/sponsor.actions";

export function ProfileSetup({ role, profileExists }: { role: UserRole; profileExists: boolean }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  if (profileExists) {
    return <Card><CardContent className="p-6 text-sm text-muted-foreground">Your role-specific profile is complete. Profile editing will appear here as more profile fields are added.</CardContent></Card>;
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const values = new FormData(event.currentTarget);
    const value = (name: string) => String(values.get(name) ?? "").trim();
    const optionalNumber = (name: string) => {
      const input = value(name);
      return input ? Number(input) : undefined;
    };

    try {
      if (role === "ATHLETE") {
        await createAthleteProfile({ sportCategory: value("sportCategory") as SportCategory });
      } else if (role === "COACH") {
        await createCoachProfile({
          sportCategory: value("sportCategory") as SportCategory,
          specialization: value("specialization") || undefined,
          experience: optionalNumber("experience"),
        });
      } else if (role === "SCHOOL_ADMIN") {
        await createSchoolProfile({
          schoolName: value("schoolName"), schoolType: value("schoolType"), address: value("address"),
          city: value("city"), state: value("state"), pincode: value("pincode"),
        });
      } else if (role === "SPONSOR") {
        await createSponsorProfile({
          companyName: value("companyName"), industry: value("industry") || undefined,
          website: value("website") || undefined,
        });
      }
      router.refresh();
      router.push("/dashboard");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to save the profile.");
    } finally {
      setSubmitting(false);
    }
  };

  if (role === "SUPER_ADMIN") return null;

  return (
    <Card className="max-w-2xl">
      <CardHeader><CardTitle>Complete your {role.toLowerCase().replace("_", " ")} profile</CardTitle><CardDescription>Only real information is stored. You can add optional details later.</CardDescription></CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={submit}>
          {(role === "ATHLETE" || role === "COACH") && <div className="space-y-2"><Label htmlFor="sportCategory">Primary sport</Label><select id="sportCategory" name="sportCategory" required className="flex h-10 w-full rounded-lg border border-border bg-card px-3 text-sm">{SPORT_CATEGORIES.map((sport) => <option key={sport.value} value={sport.value}>{sport.label}</option>)}</select></div>}
          {role === "COACH" && <><div className="space-y-2"><Label htmlFor="specialization">Specialization</Label><Input id="specialization" name="specialization" maxLength={200} /></div><div className="space-y-2"><Label htmlFor="experience">Coaching experience (years)</Label><Input id="experience" name="experience" type="number" min="0" max="100" /></div></>}
          {role === "SCHOOL_ADMIN" && <><Field name="schoolName" label="Institution name" required /><Field name="schoolType" label="Institution type" required /><Field name="address" label="Address" required /><div className="grid gap-5 sm:grid-cols-3"><Field name="city" label="City" required /><Field name="state" label="State" required /><Field name="pincode" label="PIN code" required /></div></>}
          {role === "SPONSOR" && <><Field name="companyName" label="Company name" required /><Field name="industry" label="Industry" /><Field name="website" label="Website" type="url" /></>}
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={submitting}>{submitting ? "Saving…" : "Save profile"}</Button>
        </form>
      </CardContent>
    </Card>
  );
}

function Field({ name, label, required = false, type = "text" }: { name: string; label: string; required?: boolean; type?: string }) {
  return <div className="space-y-2"><Label htmlFor={name}>{label}</Label><Input id={name} name={name} type={type} required={required} maxLength={type === "text" ? 200 : undefined} /></div>;
}
