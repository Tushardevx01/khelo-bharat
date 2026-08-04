"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Khelo Bharat?",
    answer:
      "Khelo Bharat is India's premier sports ecosystem platform that connects athletes, schools, coaches, tournament organizers, and sponsors. We provide tools for tournament management, performance tracking, career guidance, and more.",
  },
  {
    question: "Who can register on the platform?",
    answer:
      "Anyone involved in sports can register! This includes athletes of all levels, school administrators, coaches, tournament organizers, and sponsors. Each role has tailored features and dashboards.",
  },
  {
    question: "Is it free to register?",
    answer:
      "Yes, basic registration is completely free. Athletes and schools can access core features at no cost. Premium features and tournament participation may have associated fees.",
  },
  {
    question: "How do tournaments work?",
    answer:
      "Tournament organizers can create and manage events on the platform. Athletes can browse, register, and track their performance. We handle scheduling, scoring, certificates, and real-time updates.",
  },
  {
    question: "How does the AI career guidance work?",
    answer:
      "Our AI analyzes your performance data, skill levels, and goals to provide personalized recommendations for training, tournaments, and career paths. It helps athletes make informed decisions about their sports career.",
  },
  {
    question: "Can schools manage their sports programs?",
    answer:
      "Absolutely! School admins can manage teams, schedule events, track student athlete performance, and register for inter-school tournaments. The platform provides comprehensive tools for school sports management.",
  },
  {
    question: "How do sponsors benefit?",
    answer:
      "Sponsors get access to a pool of talented athletes, ROI analytics to track their sponsorship impact, brand visibility across the platform, and direct connections with athletes and schools.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we take data security very seriously. All data is encrypted, profiles are verified, and we follow strict privacy policies. Your personal information is never shared without your consent.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Frequently Asked{" "}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Everything you need to know about Khelo Bharat
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full bg-white dark:bg-gray-800 rounded-2xl p-6 text-left border border-gray-200 dark:border-gray-700 hover:border-[#FF6B35]/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2">
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
