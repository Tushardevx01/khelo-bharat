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
    <section id="features" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Built for the game
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything athletes, coaches, schools, and sponsors need — in one platform.
          </p>
        </motion.div>

        {/* Bento grid — explicit placement on lg for precise layout */}
        <div
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`
                group rounded-[16px] border p-6 transition-all hover:shadow-sm hover:border-primary/50
                bg-card border-border
                ${feature.size === "lg" ? "lg:p-8" : ""}
              `}
              style={{
                gridColumn: undefined,
                gridRow: undefined,
              }}
            >
              <div
                className={`
                  flex items-center justify-center rounded-[12px] transition-colors bg-secondary/50 group-hover:bg-primary/10
                  ${feature.size === "lg" ? "h-14 w-14" : "h-10 w-10"}
                `}
              >
                <feature.icon
                  className={`
                    transition-colors text-muted-foreground group-hover:text-primary
                    ${feature.size === "lg" ? "h-7 w-7" : "h-5 w-5"}
                  `}
                />
              </div>

              <h3
                className={`
                  font-semibold tracking-tight text-card-foreground
                  ${feature.size === "lg" ? "mt-6 text-xl" : "mt-3 text-base"}
                `}
              >
                {feature.title}
              </h3>

              <p
                className={`
                  text-muted-foreground
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
