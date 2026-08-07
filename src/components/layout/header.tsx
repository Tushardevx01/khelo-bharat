"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Menu, X, Trophy, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NAVIGATION } from "@/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="font-sans text-xl font-bold tracking-tight text-primary">KHELO भारत</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAVIGATION.main.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-[12px] transition-colors border",
                pathname === item.href
                  ? "bg-card border-border text-primary shadow-sm"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-card/50"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Search className="h-5 w-5" />
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-muted-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-1">
            {NAVIGATION.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-4 py-2 text-sm font-medium rounded-[12px] transition-colors border",
                  pathname === item.href
                    ? "bg-card border-border text-primary shadow-sm"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-card/50"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
