import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-8xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#D72638] bg-clip-text text-transparent mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/">
          <Button className="rounded-full bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white">Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
