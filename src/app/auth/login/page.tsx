"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ChevronLeft, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side: Branding */}
      <div className="hidden md:flex md:w-1/2 bg-primary relative overflow-hidden items-center justify-center p-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-30 grayscale"
            alt="Luxury background"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-accent/20" />
        </div>
        
        <div className="relative z-10 max-w-lg">
          <Link href="/" className="inline-flex items-center gap-2 mb-12 group">
            <ChevronLeft className="w-5 h-5 text-accent transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-bold text-white/60 uppercase tracking-[0.3em]">Back to Showcase</span>
          </Link>
          <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl">
            <span className="text-primary font-black text-4xl">L</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-8">
            The Gateway to <br />
            <span className="text-accent italic">Excellence.</span>
          </h2>
          <p className="text-xl text-white/60 leading-relaxed">
            Welcome back to the world's most prestigious automotive marketplace. Sign in to manage your collection.
          </p>
        </div>

        {/* Floating Stat */}
        <div className="absolute bottom-20 left-20 glass p-6 rounded-3xl border-white/10 hidden lg:block animate-float">
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1">New Arrivals</p>
          <p className="text-2xl font-black text-white">24+ This Week</p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-20 bg-white">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-12">
            <h1 className="text-4xl font-black text-primary mb-3">Welcome Back</h1>
            <p className="text-muted-foreground">Please enter your credentials to continue.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full h-14 pl-12 pr-6 bg-secondary border-none rounded-2xl font-bold text-primary focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-widest text-muted">Password</label>
                <button className="text-xs font-bold text-accent hover:underline">Forgot?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full h-14 pl-12 pr-6 bg-secondary border-none rounded-2xl font-bold text-primary focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>
            </div>

            <Button className="w-full h-16 rounded-2xl font-black text-lg shadow-xl shadow-accent/20">
              Sign In
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-white px-4 text-muted font-bold">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <Button variant="outline" className="h-14 rounded-2xl border-border bg-white hover:bg-secondary font-bold">
              <Globe className="mr-2 w-5 h-5" />
              Google
            </Button>
            <Button variant="outline" className="h-14 rounded-2xl border-border bg-white hover:bg-secondary font-bold">
              <Globe className="mr-2 w-5 h-5" />
              Github
            </Button>
          </div>

          <p className="text-center text-sm font-medium text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-accent font-bold hover:underline">Create Account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
