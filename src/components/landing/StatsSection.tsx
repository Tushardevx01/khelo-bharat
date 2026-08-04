"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Users, MapPin, Calendar } from "lucide-react";

const STATS = [
  { icon: Trophy, value: 1000, suffix: "+", label: "Tournaments Hosted", color: "#FF6B35" },
  { icon: Users, value: 50000, suffix: "+", label: "Active Athletes", color: "#D72638" },
  { icon: MapPin, value: 500, suffix: "+", label: "Cities Covered", color: "#FF6B35" },
  { icon: Calendar, value: 12000, suffix: "+", label: "Events Completed", color: "#D72638" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  const formatted = count >= 1000 ? `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}K` : count.toString();

  return (
    <span ref={ref}>
      {count >= 1000 ? formatted : count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-gray-950 py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div
                  className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color: stat.color }} />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
