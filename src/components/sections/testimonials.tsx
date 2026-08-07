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
    <section className="bg-background py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-sans text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            What our community says
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
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
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-foreground">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={testimonial.image} />
                  <AvatarFallback className="bg-primary/10 text-primary">{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
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
