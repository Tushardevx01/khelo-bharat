"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { toast } from "sonner";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      toast.success("Message sent! We'll get back to you soon.");
      reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Get in <span className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] bg-clip-text text-transparent">Touch</span></h1>
            <p className="text-gray-500 text-lg">We&apos;d love to hear from you. Send us a message!</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-6">
              {[
                { icon: Mail, title: "Email", value: "info@khelobharat.com", desc: "We'll respond within 24 hours" },
                { icon: Phone, title: "Phone", value: "+91 12345 67890", desc: "Mon-Sat, 9am-6pm IST" },
                { icon: MapPin, title: "Address", value: "New Delhi, India", desc: "Sports Hub, Connaught Place" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-[#FF6B35]">{item.value}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)} className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input placeholder="Your name" className="rounded-xl h-12" {...register("name")} />
                    {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="your@email.com" className="rounded-xl h-12" {...register("email")} />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input placeholder="How can we help?" className="rounded-xl h-12" {...register("subject")} />
                  {errors.subject && <p className="text-sm text-red-500">{errors.subject.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea placeholder="Tell us more..." className="rounded-xl min-h-[120px]" {...register("message")} />
                  {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
                </div>
                <Button type="submit" disabled={isLoading} className="w-full h-12 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white">
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5 mr-2" /> Send Message</>}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
