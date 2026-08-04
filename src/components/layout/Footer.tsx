import Link from "next/link";
import { Trophy, Mail, Phone, MapPin } from "lucide-react";

const FOOTER_LINKS = {
  Platform: [
    { label: "About Us", href: "/about" },
    { label: "Tournaments", href: "/tournaments" },
    { label: "Athletes", href: "/athletes" },
    { label: "Schools", href: "/schools" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Help Center", href: "/help" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  Sports: [
    { label: "Cricket", href: "/tournaments?sport=cricket" },
    { label: "Football", href: "/tournaments?sport=football" },
    { label: "Basketball", href: "/tournaments?sport=basketball" },
    { label: "Athletics", href: "/tournaments?sport=athletics" },
    { label: "Swimming", href: "/tournaments?sport=swimming" },
  ],
} as const;

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Khelo Bharat</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              India&apos;s premier sports ecosystem platform connecting athletes, schools, coaches, tournament organizers, and sponsors.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-[#FF6B35]" />
                <span>info@khelobharat.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-[#FF6B35]" />
                <span>+91 12345 67890</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-[#FF6B35]" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm hover:text-[#FF6B35] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Khelo Bharat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
