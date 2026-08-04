"use client";

import { motion } from "framer-motion";
import { Globe, Users, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Pan-India Reach",
    description: "Connecting athletes from all 28 states and 8 union territories",
  },
  {
    icon: Users,
    title: "Multi-Stakeholder",
    description: "Built for athletes, schools, coaches, sponsors, and admins",
  },
  {
    icon: Zap,
    title: "Real-Time Updates",
    description: "Live scores, instant notifications, and real-time analytics",
  },
  {
    icon: Shield,
    title: "Secure & Verified",
    description: "Verified profiles, secure data, and transparent processes",
  },
];

export default function AboutSection() {
  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Revolutionizing{" "}
              <span className="text-gradient">Indian Sports</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Khelo Bharat is India&apos;s comprehensive sports ecosystem
              platform that bridges the gap between talented athletes and
              opportunities. We provide tools for tournament management,
              performance tracking, career guidance, and sponsor connections —
              all in one place.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              Our mission is to discover, nurture, and promote sports talent
              from every corner of India, ensuring no athlete is left behind
              regardless of their location or background.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-[#FF6B35]/10 to-[#D72638]/10 rounded-3xl p-8 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#D72638] opacity-20 animate-pulse" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#D72638] opacity-30" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center shadow-2xl">
                      <span className="text-4xl">🏆</span>
                    </div>
                  </div>

                  {[
                    { label: "Delhi", x: "30%", y: "25%" },
                    { label: "Mumbai", x: "20%", y: "60%" },
                    { label: "Chennai", x: "45%", y: "80%" },
                    { label: "Kolkata", x: "70%", y: "45%" },
                    { label: "Bangalore", x: "35%", y: "70%" },
                  ].map((city, i) => (
                    <motion.div
                      key={city.label}
                      className="absolute"
                      style={{ left: city.x, top: city.y }}
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-full px-3 py-1.5 shadow-lg text-xs font-medium">
                        {city.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    300%
                  </div>
                  <div className="text-sm text-gray-500">Growth in 2024</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
