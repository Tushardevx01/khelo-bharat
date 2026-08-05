"use client";

import { motion } from "framer-motion";

export default function DashboardContent({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="ml-[280px] p-6 lg:p-8 min-h-screen"
    >
      {children}
    </motion.main>
  );
}
