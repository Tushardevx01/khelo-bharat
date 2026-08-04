"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "National-Level Athlete",
    avatar: "/avatars/priya.jpg",
    rating: 5,
    quote:
      "Khelo Bharat transformed my athletic career. I got noticed by national selectors through a tournament I found on this platform. The performance tracking tools helped me improve my game significantly.",
    sport: "Track & Field",
  },
  {
    name: "Rajesh Kumar",
    role: "School Sports Director",
    avatar: "/avatars/rajesh.jpg",
    rating: 5,
    quote:
      "Managing our school's sports program has never been easier. The tournament management tools are incredible, and we've discovered several talented athletes who are now representing our state.",
    sport: "Cricket & Football",
  },
  {
    name: "Anita Desai",
    role: "Professional Coach",
    avatar: "/avatars/anita.jpg",
    rating: 5,
    quote:
      "The AI career guidance feature is a game-changer. It helped me create personalized training programs for my athletes. The platform connects me with schools and sponsors seamlessly.",
    sport: "Swimming",
  },
  {
    name: "Vikram Singh",
    role: "Sports Sponsor",
    avatar: "/avatars/vikram.jpg",
    rating: 5,
    quote:
      "As a sponsor, I can easily discover and invest in promising talent. The ROI analytics help me track the impact of my sponsorship. Khelo Bharat has revolutionized how we support sports.",
    sport: "Multi-Sport",
  },
];

export default function SuccessStoriesSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

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
            Success{" "}
            <span className="text-gradient">Stories</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hear from athletes, schools, and coaches who transformed their
            journey with Khelo Bharat
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-xl p-8 md:p-12 min-h-[320px]">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-[#FF6B35]/10" />

            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <Avatar className="w-20 h-20 border-4 border-[#FF6B35]/20">
                    <AvatarImage src={testimonials[current].avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-[#FF6B35] to-[#D72638] text-white text-2xl">
                      {testimonials[current].name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="text-center md:text-left">
                    <div className="flex justify-center md:justify-start gap-1 mb-3">
                      {Array.from({ length: testimonials[current].rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-yellow-400"
                          />
                        )
                      )}
                    </div>

                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
                      &ldquo;{testimonials[current].quote}&rdquo;
                    </p>

                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                        {testimonials[current].name}
                      </h4>
                      <p className="text-sm text-[#FF6B35]">
                        {testimonials[current].role}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Sport: {testimonials[current].sport}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                i === current
                  ? "bg-gradient-to-r from-[#FF6B35] to-[#D72638] w-8"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
