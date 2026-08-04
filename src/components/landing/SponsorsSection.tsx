"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const sponsors = [
  { name: "Nike India", initials: "NI", color: "from-orange-500 to-red-500" },
  { name: "Adidas India", initials: "AI", color: "from-blue-500 to-indigo-500" },
  { name: "Sports Authority", initials: "SA", color: "from-green-500 to-emerald-500" },
  { name: "Khelo India", initials: "KI", color: "from-purple-500 to-pink-500" },
  { name: "Fit India", initials: "FI", color: "from-cyan-500 to-blue-500" },
  { name: "Olympic Association", initials: "OA", color: "from-red-500 to-orange-500" },
  { name: "ESPN India", initials: "EI", color: "from-yellow-500 to-orange-500" },
  { name: "Star Sports", initials: "SS", color: "from-indigo-500 to-purple-500" },
];

export default function SponsorsSection() {
  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Trusted by Leading{" "}
            <span className="text-gradient">Organizations</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our partners are committed to empowering Indian sports talent
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {sponsors.map((sponsor, i) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 flex items-center justify-center border border-gray-200 dark:border-gray-700 hover:border-[#FF6B35]/50 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${sponsor.color} flex items-center justify-center`}>
                <span className="text-white font-bold text-xl">
                  {sponsor.initials}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-[#FF6B35]/5 to-[#D72638]/5 rounded-3xl p-8 md:p-12 border border-[#FF6B35]/10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Become a Sponsor
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
              Partner with Khelo Bharat and invest in India&apos;s sports
              future. Get visibility, ROI analytics, and direct access to
              emerging talent.
            </p>
            <Link href="/sponsor">
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-[#FF6B35] to-[#D72638] hover:from-[#D72638] hover:to-[#FF6B35] text-white px-8"
              >
                Start Partnership
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
