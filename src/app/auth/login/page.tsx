"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ChevronLeft, Eye, EyeOff, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  // Inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Page States
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // 1. Session Redirect Guard: Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, authLoading, router]);

  // 2. Formatting / Validation Check (Basic check before backend)
  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      newErrors.email = "Email is required.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 3. Login Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const cleanEmail = email.trim();
      const credentials = {
        email: cleanEmail,
        password,
      };

      await login(credentials);
    } catch (err: any) {
      console.error("Login error:", err);
      // FastAPI often returns errors in the `detail` property
      const serverMessage = err.response?.data?.detail || err.response?.data?.message || err.response?.data?.error || "Invalid credentials. Please verify details and try again.";
      // If detail is an array (e.g., 422 validation errors), stringify or extract the first message
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
          <p className="text-sm font-bold text-muted uppercase tracking-widest animate-pulse">Restoring Session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Side: Branding Banner */}
      <div className="hidden md:flex md:w-1/2 bg-primary relative overflow-hidden items-center justify-center p-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-30 grayscale"
            alt="Luxury supercar dashboard background"
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
            The Gateway to <br />
            <span className="text-accent italic">Excellence.</span>
          </h2>
          <p className="text-xl text-white/60 leading-relaxed font-medium">
            Welcome back to the world's most prestigious automotive marketplace. Sign in to manage your collection.
          </p>
        </div>

        {/* Floating Premium Stat */}
        <div className="absolute bottom-20 left-20 glass p-6 rounded-3xl border-white/10 hidden lg:block animate-float">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <p className="text-xs font-bold text-accent uppercase tracking-widest">New Arrivals</p>
          </div>
          <p className="text-2xl font-black text-white">24+ This Week</p>
        </div>
      </div>

      {/* Right Side: Sign-In Interactive Card */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 md:p-20 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="mb-12">
            <div className="md:hidden inline-flex items-center gap-2 mb-8 text-primary/60 hover:text-primary transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <Link href="/" className="text-xs font-bold uppercase tracking-wider">Showcase</Link>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-primary mb-3">Welcome Back</h1>
            <p className="text-muted-foreground font-medium">Please enter your credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dynamic Server Error Banner */}
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

            {/* Email field */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted transition-colors" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    setApiError(null);
                  }}
                  className={`w-full h-14 pl-12 pr-6 bg-secondary border border-transparent rounded-2xl font-bold text-primary focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all ${errors.email ? "border-red-500 bg-red-50/10 focus:ring-red-500/10" : ""
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

            {/* Password field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-widest text-muted">Password</label>
                <button
                  type="button"
                  className="text-xs font-bold text-accent hover:underline focus:outline-none"
                  onClick={() => setApiError("Password recovery is currently unavailable in this demonstration.")}
                >
                  Forgot?
                </button>
              </div>
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
                  className={`w-full h-14 pl-12 pr-12 bg-secondary border border-transparent rounded-2xl font-bold text-primary focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all ${errors.password ? "border-red-500 bg-red-50/10 focus:ring-red-500/10" : ""
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
                <p className="text-xs font-bold text-red-500 flex items-center gap-1 mt-1 pl-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              isLoading={submitting}
              disabled={submitting}
              className="w-full h-16 rounded-2xl font-black text-lg shadow-xl shadow-accent/20 transition-all active:scale-[0.98] mt-8"
            >
              {!submitting && (
                <>
                  Sign In
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          {/* Redirection link to Signup page */}
          <p className="text-center text-sm font-medium text-muted-foreground mt-10">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-accent font-black hover:underline">
              Create Account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
