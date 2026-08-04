import { Trophy } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#FF6B35]/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#D72638]/15 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-12">
          <Link href="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center shadow-lg">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#D72638] bg-clip-text text-transparent">
              Khelo Bharat
            </span>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">
            India&apos;s Premier Sports Platform
          </h1>
          <p className="text-lg text-white/60">
            Connect with athletes, schools, coaches, and tournaments across India.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-950">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
