"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowRight, ChevronLeft, Eye, EyeOff, AlertCircle, Phone, User, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { registerUser } from "@/api/auth";
import { useAuth } from "@/context/AuthContext";

const RegisterPage = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  // Inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // States
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
  }>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Guard: Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, authLoading, router]);

  // Countdown timer for redirects
  useEffect(() => {
    if (isSuccess && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isSuccess && countdown === 0) {
      router.push("/auth/login");
    }
  }, [isSuccess, countdown, router]);

  // Basic Form presence check before hitting backend
  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!email.trim()) newErrors.email = "Email Address is required.";
    if (!phone.trim()) newErrors.phone = "Phone Number is required.";
    if (!password) newErrors.password = "Password is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const cleanPhone = phone.replace(/[-+()\s]/g, "");
      await registerUser({
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: cleanPhone,
        password,
      });

      setIsSuccess(true);
    } catch (err: any) {
      console.error("Registration error:", err);
      const serverMessage = err.response?.data?.detail || err.response?.data?.message || err.response?.data?.error || "Registration failed. Please review details and try again.";
      const displayMessage = Array.isArray(serverMessage) ? serverMessage[0]?.msg : serverMessage;
      setApiError(displayMessage as string);
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-accent border-t-transparent" />
          <p className="text-sm font-bold text-muted uppercase tracking-widest animate-pulse">Checking Session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white relative">
      {/* Dynamic Animated Success Backdrop Modal */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-primary/95 flex items-center justify-center p-6 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 100 }}
              className="bg-white p-12 rounded-[3rem] shadow-premium max-w-md w-full text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-accent" />
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-500 animate-bounce" />
              </div>
              <h2 className="text-3xl font-black text-primary mb-3">Welcome to LuxDrive</h2>
              <p className="text-muted-foreground font-medium mb-8 leading-relaxed">
                Your luxury automotive portfolio account has been created successfully!
              </p>
              <div className="bg-secondary p-6 rounded-2xl border border-border">
                <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1">Redirecting to Login</p>
                <p className="text-3xl font-black text-accent">{countdown}s</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Side: Dynamic Branding Image */}
      <div className="hidden md:flex md:w-1/2 bg-primary relative overflow-hidden items-center justify-center p-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-30 grayscale"
            alt="Luxury supercar background"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-accent/20" />
        </div>
        
        <div className="relative z-10 max-w-lg">
          <Link href="/" className="inline-flex items-center gap-2 mb-12 group">
            <ChevronLeft className="w-5 h-5 text-accent transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-bold text-white/60 uppercase tracking-[0.3em] transition-colors group-hover:text-white">Back to Showcase</span>
          </Link>
          <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl">
            <span className="text-primary font-black text-4xl">L</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-8">
            Create Your <br />
            <span className="text-accent italic">Legacy.</span>
          </h2>
          <p className="text-xl text-white/60 leading-relaxed font-medium">
            Join the world's most premium luxury car platform. Register to start trading with confidence.
          </p>
        </div>
      </div>

      {/* Right Side: Form Cards Container */}
      <div className="flex-grow flex items-center justify-center p-4 sm:p-8 md:p-20 bg-white overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md my-8"
        >
          <div className="mb-10">
            <div className="md:hidden inline-flex items-center gap-2 mb-8 text-primary/60 hover:text-primary transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <Link href="/" className="text-xs font-bold uppercase tracking-wider">Showcase</Link>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-primary mb-3">Get Started</h1>
            <p className="text-muted-foreground font-medium">Create your elite membership profile below.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Server-side Error Display */}
            {apiError && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-start gap-3 p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 text-sm font-semibold"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{apiError}</span>
              </motion.div>
            )}

            {/* Full Name input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                    setApiError(null);
                  }}
                  className={`w-full h-14 pl-12 pr-6 bg-secondary border border-transparent rounded-2xl font-bold text-primary focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all ${
                    errors.fullName ? "border-red-500 bg-red-50/10 focus:ring-red-500/10" : ""
                  }`}
                  disabled={submitting}
                />
              </div>
              {errors.fullName && (
                <p className="text-xs font-bold text-red-500 flex items-center gap-1 mt-1 pl-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                </p>
              )}
            </div>

            {/* Email Address input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    setApiError(null);
                  }}
                  className={`w-full h-14 pl-12 pr-6 bg-secondary border border-transparent rounded-2xl font-bold text-primary focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all ${
                    errors.email ? "border-red-500 bg-red-50/10 focus:ring-red-500/10" : ""
                  }`}
                  disabled={submitting}
                />
              </div>
              {errors.email && (
                <p className="text-xs font-bold text-red-500 flex items-center gap-1 mt-1 pl-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                </p>
              )}
            </div>

            {/* Phone number input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                    setApiError(null);
                  }}
                  className={`w-full h-14 pl-12 pr-6 bg-secondary border border-transparent rounded-2xl font-bold text-primary focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all ${
                    errors.phone ? "border-red-500 bg-red-50/10 focus:ring-red-500/10" : ""
                  }`}
                  disabled={submitting}
                />
              </div>
              {errors.phone && (
                <p className="text-xs font-bold text-red-500 flex items-center gap-1 mt-1 pl-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                </p>
              )}
            </div>

            {/* Password input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                    setApiError(null);
                  }}
                  className={`w-full h-14 pl-12 pr-12 bg-secondary border border-transparent rounded-2xl font-bold text-primary focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all ${
                    errors.password ? "border-red-500 bg-red-50/10 focus:ring-red-500/10" : ""
                  }`}
                  disabled={submitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-primary transition-colors focus:outline-none"
                  disabled={submitting}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {errors.password && (
                <p className="text-xs font-bold text-red-500 flex items-start gap-1 mt-1 pl-1 leading-relaxed">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> 
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              isLoading={submitting}
              disabled={submitting}
              className="w-full h-16 rounded-2xl font-black text-lg shadow-xl shadow-accent/20 transition-all active:scale-[0.98] mt-4"
            >
              {!submitting && (
                <>
                  Register
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          {/* Direct link to Signin */}
          <p className="text-center text-sm font-medium text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-accent font-black hover:underline">
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
