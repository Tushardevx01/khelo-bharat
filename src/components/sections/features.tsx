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
    description: "Discover, register, and participate in tournaments across India with real-time updates and live scoring.",
    size: "lg" as const,
  },
  {
    icon: Users,
    title: "Connect & Network",
    description: "Build your sports network with athletes, coaches, schools, and sponsors.",
    size: "md" as const,
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Track progress with detailed analytics and performance metrics.",
    size: "md" as const,
  },
  {
    icon: Award,
    title: "Digital Certificates",
    description: "Earn verified digital certificates for your achievements.",
    size: "sm" as const,
  },
  {
    icon: MessageSquare,
    title: "Messaging",
    description: "Direct communication with coaches, sponsors, and fellow athletes.",
    size: "sm" as const,
  },
  {
    icon: Shield,
    title: "Verified Profiles",
    description: "Trusted and verified profiles for athletes, schools, and coaches across the platform.",
    size: "lg" as const,
  },
  {
    icon: MapPin,
    title: "Location Discovery",
    description: "Find nearby tournaments, schools, and athletes.",
    size: "sm" as const,
  },
  {
    icon: Calendar,
    title: "Event Calendar",
    description: "Never miss an event with our comprehensive sports calendar.",
    size: "wide" as const,
  },
  {
    icon: TrendingUp,
    title: "Career Guidance",
    description: "AI-powered guidance to help you reach your full potential.",
    size: "sm" as const,
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
            Built for the game
          </h2>
          <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
            Everything athletes, coaches, schools, and sponsors need — in one platform.
          </p>
        </motion.div>

        {/* Bento grid — explicit placement on lg for precise layout */}
        <div
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          style={{
            gridTemplateRows: "repeat(3, minmax(0, 1fr))",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          {/* 
            lg grid positions (4 cols × 3 rows):
            Row 1: Tournament[1-2,1-2] Connect[3,1] Analytics[4,1]
            Row 2: Certs[1,2] Messaging[2,2] Verified[3-4,2-3]
            Row 3: Location[1,3] Calendar[2-3,3] Career[4,3]
          */}
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`
                group rounded-xl border p-6 transition-all
                hover:shadow-lg
                dark:border-neutral-800
                ${feature.size === "lg"
                  ? "border-neutral-800 bg-neutral-900 dark:bg-neutral-950 lg:p-8"
                  : "border-neutral-200 bg-white dark:bg-neutral-950"
                }
              `}
              style={{
                gridColumn: feature.size === "lg" && index === 0 ? "span 2" :
                            feature.size === "lg" && index === 5 ? "span 2" :
                            feature.size === "wide" ? "span 2" : undefined,
                gridRow: feature.size === "lg" ? "span 2" : undefined,
              }}
            >
              <div
                className={`
                  flex items-center justify-center rounded-lg transition-colors
                  ${feature.size === "lg"
                    ? "h-14 w-14 rounded-xl bg-neutral-800 group-hover:bg-neutral-700 dark:bg-neutral-800 dark:group-hover:bg-neutral-700"
                    : "h-10 w-10 bg-neutral-100 group-hover:bg-neutral-900 dark:bg-neutral-800 dark:group-hover:bg-neutral-700"
                  }
                `}
              >
                <feature.icon
                  className={`
                    transition-colors
                    ${feature.size === "lg"
                      ? "h-7 w-7 text-neutral-300 group-hover:text-white"
                      : "h-5 w-5 text-neutral-600 group-hover:text-white dark:text-neutral-400"
                    }
                  `}
                />
              </div>

              <h3
                className={`
                  font-semibold tracking-tight text-neutral-900 dark:text-white
                  ${feature.size === "lg" ? "mt-6 text-xl" : "mt-3 text-base"}
                `}
              >
                {feature.title}
              </h3>

              <p
                className={`
                  text-neutral-500 dark:text-neutral-400
                  ${feature.size === "lg" ? "mt-3 text-sm leading-relaxed" : "mt-1.5 text-sm"}
                `}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
