"use client";

import { motion } from "framer-motion";
import { User, School, Dumbbell, Handshake, ShieldCheck } from "lucide-react";

const categories = [
  {
    icon: User,
    title: "Athlete",
    description:
      "Showcase your talent, track performance, and discover opportunities.",
    features: [
      "Performance Dashboard",
      "Tournament Registration",
      "Skill Certificates",
      "Career Guidance",
    ],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: School,
    title: "School Admin",
    description:
      "Manage your school's sports program and discover young talent.",
    features: [
      "Team Management",
      "Event Scheduling",
      "Student Athlete Profiles",
      "Inter-School Tournaments",
    ],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Dumbbell,
    title: "Coach",
    description:
      "Train the next generation of champions with powerful tools.",
    features: [
      "Training Plans",
      "Performance Tracking",
      "Scouting Tools",
      "Certification Programs",
    ],
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Handshake,
    title: "Sponsor",
    description:
      "Connect with talented athletes and invest in sports excellence.",
    features: [
      "Talent Discovery",
      "ROI Analytics",
      "Brand Visibility",
      "Impact Reports",
    ],
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: ShieldCheck,
    title: "Admin",
    description:
      "Oversee and manage the entire sports ecosystem efficiently.",
    features: [
      "Platform Analytics",
      "User Management",
      "Content Moderation",
      "System Configuration",
    ],
    gradient: "from-indigo-500 to-violet-500",
  },
];

export default function UserCategoriesSection() {
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
            Built for{" "}
            <span className="text-gradient">Everyone</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Whether you&apos;re an athlete, school, coach, or sponsor — we have
            the tools you need
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-300 hover:shadow-xl overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              <div className="relative">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <category.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {category.title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {category.description}
                </p>

                <ul className="space-y-2">
                  {category.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
