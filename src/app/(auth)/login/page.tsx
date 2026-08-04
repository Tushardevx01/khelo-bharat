"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginInput } from "@/lib/validations";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Login failed");
        return;
      }

      toast.success("Login successful!");
      const role = result.user.role;
      switch (role) {
        case "SUPER_ADMIN": router.push("/admin"); break;
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
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-gray-500 mt-1">Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input id="email" type="email" placeholder="you@example.com" className="pl-10 h-12 rounded-xl" {...register("email")} />
          </div>
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
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

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="rounded border-gray-300" />
            Remember me
          </label>
          <Link href="/forgot-password" className="text-sm text-[#FF6B35] hover:underline">Forgot password?</Link>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full h-12 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#D72638] hover:from-[#D72638] hover:to-[#FF6B35] text-white font-medium">
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><LogIn className="w-5 h-5 mr-2" /> Sign In</>}
        </Button>
      </form>

      <p className="text-center mt-6 text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-[#FF6B35] hover:underline font-medium">Create account</Link>
      </p>
    </motion.div>
  );
}
