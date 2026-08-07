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
    <section className="bg-background py-24 border-t border-border">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="font-sans text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about Khelo Bharat.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16"
        >
          <Accordion.Root type="single" collapsible className="space-y-0">
            {faqs.map((faq) => (
              <Accordion.Item
                key={faq.question}
                value={faq.question}
                className="border-b border-border group"
              >
                <Accordion.Trigger className="flex w-full items-center justify-between py-6 text-left font-medium text-foreground hover:text-primary transition-colors">
                  {faq.question}
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
                <Accordion.Content className="overflow-hidden pb-6 text-sm text-muted-foreground leading-relaxed data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
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
