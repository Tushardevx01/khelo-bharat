import Link from "next/link";
import { Trophy } from "lucide-react";

const footerLinks = {
  platform: [
    { label: "About Us", href: "/about" },
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
  ],
  sports: [
    { label: "Cricket", href: "/sports?category=CRICKET" },
    { label: "Football", href: "/sports?category=FOOTBALL" },
    { label: "Basketball", href: "/sports?category=BASKETBALL" },
    { label: "Athletics", href: "/sports?category=ATHLETICS" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              <span className="font-sans text-xl font-bold tracking-tight text-primary">KHELO भारत</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              One Platform. Every Athlete. Every Opportunity.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Platform</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Sports</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.sports.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Support</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} KHELO भारत. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
