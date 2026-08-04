"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  BarChart3,
  Award,
  Brain,
  Zap,
  Target,
  MapPin,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Tournament Management",
    description:
      "Create, manage, and track tournaments with real-time updates and automated scheduling.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Detailed analytics and insights to track athlete performance and growth over time.",
  },
  {
    icon: Award,
    title: "Certificate System",
    description:
      "Digital certificates for participation, achievements, and skill verification.",
  },
  {
    icon: Brain,
    title: "AI Career Guidance",
    description:
      "AI-powered career recommendations and skill development paths for athletes.",
  },
  {
    icon: Zap,
    title: "Live Scores",
    description:
      "Real-time score updates, live commentary, and instant match notifications.",
  },
  {
    icon: Target,
    title: "Smart Matching",
    description:
      "Connect with the right coaches, sponsors, and opportunities based on your profile.",
  },
  {
    icon: MapPin,
    title: "OpenStreetMap Integration",
    description:
      "Find nearby sports facilities, venues, and events with integrated mapping.",
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description:
      "Verified profiles, secure data storage, and transparent selection processes.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Everything{" "}
            <span className="text-gradient">You Need</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A complete suite of tools designed to support every aspect of your
            sports journey
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-[#FF6B35]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF6B35]/10"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
