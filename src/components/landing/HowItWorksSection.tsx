"use client";

import { motion } from "framer-motion";
import { UserPlus, ClipboardCheck, Trophy, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Create Account",
    description:
      "Sign up in seconds with your email or phone number. Choose your role and get started.",
  },
  {
    icon: ClipboardCheck,
    number: "02",
    title: "Complete Profile",
    description:
      "Add your details, achievements, and preferences to build your sports profile.",
  },
  {
    icon: Trophy,
    number: "03",
    title: "Join Tournaments",
    description:
      "Browse and register for tournaments that match your skill level and interests.",
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Grow & Connect",
    description:
      "Track your progress, earn certificates, and connect with coaches and sponsors.",
  },
];

export default function HowItWorksSection() {
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
            How It{" "}
            <span className="text-gradient">Works</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get started in four simple steps and begin your sports journey today
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF6B35] to-[#D72638] -translate-y-1/2" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center text-white text-sm font-bold">
                    {step.number}
                  </div>

                  <div className="pt-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6B35]/10 to-[#D72638]/10 flex items-center justify-center mb-4 mx-auto">
                      <step.icon className="w-8 h-8 text-[#FF6B35]" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                      {step.title}
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 text-[#FF6B35]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
