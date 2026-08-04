import type { Metadata } from "next";
import { Trophy } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Khelo Bharat - Authentication",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#FF6B35] to-[#D72638] items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white rounded-full" />
          <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-white rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 border-2 border-white rounded-full" />
        </div>
        <div className="relative z-10 text-center text-white">
          <Link href="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Trophy className="w-10 h-10" />
            </div>
            <span className="text-3xl font-bold">Khelo Bharat</span>
          </Link>
          <h2 className="text-4xl font-bold mb-4">India&apos;s Premier Sports Ecosystem</h2>
          <p className="text-xl text-white/80 max-w-md">
            Connecting Athletes, Schools, Coaches, and Sponsors on one powerful platform.
          </p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Khelo Bharat</span>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
