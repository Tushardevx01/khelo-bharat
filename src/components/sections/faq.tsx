"use client";

import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Khelo Bharat?",
    answer: "Khelo Bharat is India's complete Sports Ecosystem Platform that connects athletes, schools, coaches, sponsors, and tournament organizers. It provides tools for tournament management, performance tracking, digital certificates, and networking.",
  },
  {
    question: "Who can join Khelo Bharat?",
    answer: "Any athlete, coach, school administrator, or sports sponsor can join. We welcome participants from all sports and skill levels across India.",
  },
  {
    question: "Is Khelo Bharat free to use?",
    answer: "Yes, Khelo Bharat is free for athletes and coaches. Schools and sponsors may have premium features available through subscription plans.",
  },
  {
    question: "How do tournaments work?",
    answer: "Tournament organizers can create and manage events on the platform. Athletes can browse, register, and track their performance. Real-time updates and live scoring are available during events.",
  },
  {
    question: "Can sponsors find athletes on the platform?",
    answer: "Yes! Sponsors can browse verified athlete profiles, view performance analytics, and connect directly with athletes for sponsorship opportunities.",
  },
];

export function FAQSection() {
  return (
    <section className="bg-white py-24 dark:bg-neutral-950">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
            Everything you need to know about Khelo Bharat.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12"
        >
          <Accordion.Root type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <Accordion.Item
                key={faq.question}
                value={faq.question}
                className="rounded-xl border border-neutral-200 dark:border-neutral-800"
              >
                <Accordion.Trigger className="flex w-full items-center justify-between p-4 text-left font-medium text-neutral-900 dark:text-white hover:no-underline">
                  {faq.question}
                  <ChevronDown className="h-4 w-4 text-neutral-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
                <Accordion.Content className="overflow-hidden px-4 pb-4 text-sm text-neutral-500 dark:text-neutral-400">
                  {faq.answer}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  );
}
