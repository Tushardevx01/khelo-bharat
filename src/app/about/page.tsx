"use client";

import { motion } from "framer-motion";
import { Trophy, Target, Heart, Users, Globe, Zap } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const VALUES = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for excellence in everything we do, pushing boundaries and setting new standards in Indian sports.",
  },
  {
    icon: Heart,
    title: "Inclusivity",
    description: "Sports is for everyone. We champion equal opportunities for athletes regardless of background or ability.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building a connected ecosystem of athletes, coaches, schools, and sponsors who support each other.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Leveraging technology to transform how sports are organized, played, and experienced in India.",
  },
];

const TEAM = [
  { name: "Rajesh Kumar", role: "Founder & CEO", description: "Former national athlete with a vision to transform Indian sports." },
  { name: "Priya Sharma", role: "CTO", description: "Tech leader passionate about building scalable sports platforms." },
  { name: "Amit Patel", role: "Head of Partnerships", description: "Connecting schools, sponsors, and athletes across India." },
  { name: "Sneha Reddy", role: "Head of Product", description: "Designing intuitive experiences for the sports community." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-24 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-white/80 mb-6">
                <Trophy className="w-4 h-4 text-[#FF6B35]" />
                About Khelo Bharat
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Transforming Indian{" "}
                <span className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] bg-clip-text text-transparent">
                  Sports
                </span>
              </h1>
              <p className="text-lg text-white/60 max-w-3xl mx-auto">
                Khelo Bharat is India&apos;s premier sports ecosystem, connecting athletes, schools,
                coaches, tournament organizers, and sponsors on a single platform.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-medium mb-4">
                  Our Mission
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Making sports accessible for every Indian
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  Founded in 2024, Khelo Bharat was born from a simple observation: India&apos;s sports
                  ecosystem was fragmented. Athletes struggled to find tournaments, schools lacked
                  proper management tools, and sponsors had no visibility.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We built a unified platform that brings every stakeholder together, making it easier
                  to organize, participate, and grow in Indian sports. From village-level competitions
                  to national championships, Khelo Bharat powers it all.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#FF6B35]/10 to-transparent border border-[#FF6B35]/20">
                  <Globe className="w-8 h-8 text-[#FF6B35] mb-3" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">500+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Cities</div>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#D72638]/10 to-transparent border border-[#D72638]/20">
                  <Users className="w-8 h-8 text-[#D72638] mb-3" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">50K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Athletes</div>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#D72638]/10 to-transparent border border-[#D72638]/20">
                  <Trophy className="w-8 h-8 text-[#D72638] mb-3" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">1K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Tournaments</div>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#FF6B35]/10 to-transparent border border-[#FF6B35]/20">
                  <Heart className="w-8 h-8 text-[#FF6B35] mb-3" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">200+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Schools</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#D72638]/10 text-[#D72638] text-sm font-medium mb-4">
                Our Values
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                What drives us
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map((value, i) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-center"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-medium mb-4">
                Our Team
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Meet the people behind Khelo Bharat
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-[#FF6B35] font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{member.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
