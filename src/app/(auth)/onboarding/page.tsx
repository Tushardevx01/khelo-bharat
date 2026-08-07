import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { OnboardingForm } from "./_components/onboarding-form";

export default async function OnboardingPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-up");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 p-4">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Welcome to Khelo Bharat
          </h1>
          <p className="mt-4 text-lg text-neutral-400">
            How are you planning to use the platform? Select your primary role below.
          </p>
        </div>
        
        <OnboardingForm />
      </div>
    </div>
  );
}
