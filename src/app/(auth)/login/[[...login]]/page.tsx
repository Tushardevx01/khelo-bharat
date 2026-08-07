import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Trophy } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-1 items-center justify-center bg-neutral-950 lg:flex">
        <div className="max-w-md text-center">
          <Trophy className="mx-auto h-12 w-12 text-white" />
          <h1 className="mt-4 text-3xl font-bold text-white">Khelo Bharat</h1>
          <p className="mt-2 text-neutral-400">
            One Platform. Every Athlete. Every Opportunity.
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <SignIn />
          <p className="mt-4 text-center text-sm text-neutral-500">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-neutral-900 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
