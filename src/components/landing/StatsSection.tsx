"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { label: "Athletes", value: 10000, suffix: "+" },
  { label: "Schools", value: 500, suffix: "+" },
  { label: "Tournaments", value: 1000, suffix: "+" },
  { label: "Sports", value: 50, suffix: "+" },
  { label: "States", value: 28, suffix: "+" },
  { label: "Certificates", value: 5000, suffix: "+" },
];

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-gray-950 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Growing Every{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#D72638]">
              Single Day
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Join thousands of athletes, schools, and organizations already
            transforming Indian sports
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  inView={inView}
                />
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
