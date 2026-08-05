"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Professional Cricketer",
    image: "",
    content: "Khelo Bharat helped me connect with sponsors and get noticed by national selectors. The platform is a game-changer for Indian athletes.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "School Sports Director",
    image: "",
    content: "Managing our school's sports program has never been easier. We can track athlete performance, organize tournaments, and connect with coaches.",
    rating: 5,
  },
  {
    name: "Amit Kumar",
    role: "Athletics Coach",
    image: "",
    content: "I've discovered several talented athletes through this platform. The analytics tools help me create better training programs.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-neutral-50 py-24 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            What our community says
          </h2>
          <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
            Trusted by thousands of athletes, coaches, and schools across India.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950"
            >
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-300">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={testimonial.image} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
