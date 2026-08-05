"use client";

import { motion } from "framer-motion";
import {
  Trophy, Users, BarChart3, Award, MessageSquare, Shield,
  MapPin, Calendar, TrendingUp
} from "lucide-react";

const features = [
  {
    icon: Trophy,
    title: "Tournament Management",
    description: "Discover, register, and participate in tournaments across India. Real-time updates and live scoring.",
  },
  {
    icon: Users,
    title: "Connect & Network",
    description: "Connect with athletes, coaches, schools, and sponsors. Build your sports network.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Track your progress with detailed analytics and performance metrics.",
  },
  {
    icon: Award,
    title: "Digital Certificates",
    description: "Earn and share verified digital certificates for your achievements.",
  },
  {
    icon: MessageSquare,
    title: "Messaging",
    description: "Direct communication with coaches, sponsors, and fellow athletes.",
  },
  {
    icon: Shield,
    title: "Verified Profiles",
    description: "Trusted and verified profiles for athletes, schools, and coaches.",
  },
  {
    icon: MapPin,
    title: "Location Discovery",
    description: "Find tournaments, schools, and athletes near you with interactive maps.",
  },
  {
    icon: Calendar,
    title: "Event Calendar",
    description: "Never miss an event with our comprehensive sports calendar.",
  },
  {
    icon: TrendingUp,
    title: "Career Guidance",
    description: "AI-powered career guidance to help you reach your full potential.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-neutral-50 py-24 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            Everything you need to succeed
          </h2>
          <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
            A complete ecosystem designed for athletes, coaches, schools, and sponsors.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950"
            >
              <div className="rounded-lg bg-neutral-100 p-3 w-fit transition-colors group-hover:bg-neutral-900 dark:bg-neutral-800 dark:group-hover:bg-neutral-700">
                <feature.icon className="h-6 w-6 text-neutral-600 transition-colors group-hover:text-white dark:text-neutral-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
