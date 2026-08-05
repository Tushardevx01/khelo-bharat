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
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-neutral-900 dark:text-white" />
              <span className="text-xl font-bold text-neutral-900 dark:text-white">Khelo Bharat</span>
            </Link>
            <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
              One Platform. Every Athlete. Every Opportunity.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">Platform</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">Sports</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.sports.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">Support</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
            © {new Date().getFullYear()} Khelo Bharat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
