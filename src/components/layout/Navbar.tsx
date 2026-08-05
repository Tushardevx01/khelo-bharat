"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Trophy, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tournaments", label: "Tournaments" },
  { href: "/athletes", label: "Athletes" },
  { href: "/schools", label: "Schools" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center shadow-lg group-hover:shadow-[#FF6B35]/25 transition-shadow">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#D72638] bg-clip-text text-transparent">
                Khelo Bharat
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#FF6B35] dark:hover:text-[#FF6B35] rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <SignedIn>
                <Link href="/dashboard">
                  <Button variant="ghost" className="flex items-center gap-2 rounded-full">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

              <SignedOut>
                <Link href="/login">
                  <Button variant="ghost" className="rounded-full">Log in</Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="rounded-full bg-gradient-to-r from-[#FF6B35] to-[#D72638] hover:from-[#D72638] hover:to-[#FF6B35] text-white shadow-lg hover:shadow-[#FF6B35]/25 transition-all">
                    Get Started
                  </Button>
                </Link>
              </SignedOut>
            </div>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white dark:bg-gray-950 pt-20 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="px-4 py-3 text-lg font-medium text-gray-600 dark:text-gray-300 hover:text-[#FF6B35] rounded-xl hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-4" />
              <SignedIn>
                <Link href="/dashboard" onClick={() => setIsMobileOpen(false)}>
                  <Button className="w-full rounded-full bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white">Dashboard</Button>
                </Link>
                <div className="flex justify-center mt-4">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>

              <SignedOut>
                <Link href="/login" onClick={() => setIsMobileOpen(false)}>
                  <Button variant="outline" className="w-full rounded-full">Log in</Button>
                </Link>
                <Link href="/sign-up" onClick={() => setIsMobileOpen(false)}>
                  <Button className="w-full rounded-full bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white">Get Started</Button>
                </Link>
              </SignedOut>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
