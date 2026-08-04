"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, Loader2, UserPlus, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema, type RegisterInput } from "@/lib/validations";
import { toast } from "sonner";

const roles = [
  { value: "ATHLETE", label: "Athlete", emoji: "🏃", desc: "I want to compete and grow" },
  { value: "SCHOOL_ADMIN", label: "School Admin", emoji: "🏫", desc: "I manage school sports" },
  { value: "COACH", label: "Coach", emoji: "🎯", desc: "I train athletes" },
  { value: "SPONSOR", label: "Sponsor", emoji: "🤝", desc: "I support sports talent" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "ATHLETE" },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Registration failed");
        return;
      }

      toast.success("Registration successful! Welcome to Khelo Bharat!");
      switch (data.role) {
        case "SCHOOL_ADMIN": router.push("/school"); break;
        case "COACH": router.push("/coach"); break;
        case "ATHLETE": router.push("/athlete"); break;
        case "SPONSOR": router.push("/sponsor"); break;
        default: router.push("/dashboard");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="text-gray-500 mt-1">Join India&apos;s largest sports ecosystem</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-3">
          <Label>I am a...</Label>
          <div className="grid grid-cols-2 gap-3">
            {roles.map((role) => (
              <button
                key={role.value}
                type="button"
                onClick={() => setValue("role", role.value as any)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  selectedRole === role.value
                    ? "border-[#FF6B35] bg-orange-50 dark:bg-orange-950/20"
                    : "border-gray-200 dark:border-gray-800 hover:border-gray-300"
                }`}
              >
                <span className="text-2xl">{role.emoji}</span>
                <p className="text-sm font-medium mt-1">{role.label}</p>
                <p className="text-xs text-gray-500">{role.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input id="name" placeholder="John Doe" className="pl-10 h-12 rounded-xl" {...register("name")} />
          </div>
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input id="email" type="email" placeholder="you@example.com" className="pl-10 h-12 rounded-xl" {...register("email")} />
          </div>
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone (Optional)</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input id="phone" type="tel" placeholder="+91 98765 43210" className="pl-10 h-12 rounded-xl" {...register("phone")} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••" className="pl-10 pr-10 h-12 rounded-xl" {...register("password")} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full h-12 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#D72638] hover:from-[#D72638] hover:to-[#FF6B35] text-white font-medium">
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><UserPlus className="w-5 h-5 mr-2" /> Create Account</>}
        </Button>
      </form>

      <p className="text-center mt-6 text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="text-[#FF6B35] hover:underline font-medium">Sign in</Link>
      </p>
    </motion.div>
  );
}
