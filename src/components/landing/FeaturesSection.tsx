"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Users,
  BarChart3,
  Shield,
  Calendar,
  Megaphone,
} from "lucide-react";

const FEATURES = [
  {
    icon: Trophy,
    title: "Tournament Management",
    description:
      "Create, manage, and track tournaments with real-time brackets, scores, and standings.",
    color: "#FF6B35",
  },
  {
    icon: Users,
    title: "Athlete Profiles",
    description:
      "Build comprehensive athlete profiles with performance stats, achievements, and career history.",
    color: "#D72638",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Track progress with detailed analytics, comparisons, and AI-powered insights for improvement.",
    color: "#FF6B35",
  },
  {
    icon: Shield,
    title: "School Integration",
    description:
      "Seamless school management system for coaches, team selections, and inter-school competitions.",
    color: "#D72638",
  },
  {
    icon: Calendar,
    title: "Event Scheduling",
    description:
      "Smart scheduling with conflict detection, venue management, and automated notifications.",
    color: "#FF6B35",
  },
  {
    icon: Megaphone,
    title: "Sponsor Connect",
    description:
      "Connect sponsors with athletes and events. Manage partnerships and sponsorship deals.",
    color: "#D72638",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] bg-clip-text text-transparent">
              succeed
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A complete sports ecosystem designed for athletes, schools, coaches, and organizers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-transparent hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
