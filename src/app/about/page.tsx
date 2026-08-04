"use client";

import { motion } from "framer-motion";
import { Trophy, Target, Users, Globe, Heart, Shield } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const values = [
  { icon: Target, title: "Excellence", desc: "We strive for excellence in everything we do." },
  { icon: Users, title: "Community", desc: "Building a strong community of sports enthusiasts." },
  { icon: Globe, title: "Inclusivity", desc: "Making sports accessible to everyone across India." },
  { icon: Heart, title: "Passion", desc: "Driven by passion for sports and athlete development." },
  { icon: Shield, title: "Integrity", desc: "Maintaining the highest standards of integrity." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              About <span className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] bg-clip-text text-transparent">Khelo Bharat</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-3xl mx-auto">
              India&apos;s premier digital sports ecosystem connecting athletes, schools, coaches, tournament organizers, and sponsors on one powerful platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Khelo Bharat is on a mission to transform the Indian sports landscape by creating a comprehensive digital platform that connects every stakeholder in the sports ecosystem.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                From grassroots to professional levels, we provide tools and infrastructure that enable athletes to discover opportunities, schools to manage sports programs digitally, coaches to train effectively, and sponsors to connect with verified talent.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Our platform is built with cutting-edge technology, ensuring security, scalability, and an exceptional user experience that matches the best in the world.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-gradient-to-br from-[#FF6B35]/10 to-[#D72638]/10 rounded-3xl p-8 flex items-center justify-center">
              <div className="text-center">
                <Trophy className="w-24 h-24 text-[#FF6B35] mx-auto mb-4" />
                <p className="text-6xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#D72638] bg-clip-text text-transparent">2024</p>
                <p className="text-gray-500 mt-2">Year Founded</p>
              </div>
            </motion.div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {values.map((value, i) => (
                <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-center p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-500">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#FF6B35] to-[#D72638] rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Be part of India&apos;s growing sports revolution. Whether you&apos;re an athlete, school, coach, or sponsor, there&apos;s a place for you on Khelo Bharat.
            </p>
            <a href="/register" className="inline-block px-8 py-3 bg-white text-[#FF6B35] font-semibold rounded-full hover:bg-gray-100 transition-colors">
              Get Started Today
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
