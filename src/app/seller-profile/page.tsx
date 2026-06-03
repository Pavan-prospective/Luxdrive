"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  MapPin, 
  FileText, 
  User, 
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Briefcase
} from "lucide-react";
import { createSellerProfile } from "@/api/seller";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function SellerProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    seller_type: "seller_private",
    business_name: "",
    city: "",
    state: "",
    address: "",
    gst_number: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await createSellerProfile(formData);
      
      if (response.success || response.status === 201) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/dashboard"); 
        }, 2000);
      } else {
        throw new Error(response.message || "Failed to create profile");
      }
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message || "Something went wrong while creating your profile.");
      } else {
        // @ts-expect-error fallback if axios error
        setError(err?.response?.data?.message || "Something went wrong while creating your profile.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isDealer = formData.seller_type === "seller_dealer";

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-3xl p-10 max-w-md w-full text-center shadow-premium"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-4">Profile Created!</h2>
          <p className="text-muted mb-8">
            Your seller profile has been successfully set up. Redirecting to your dashboard...
          </p>
          <div className="w-full h-1 bg-border rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2 }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full mx-auto z-10"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium hover-lift"
          >
            <Briefcase className="w-8 h-8" />
          </motion.div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">
            Become a Seller
          </h1>
          <p className="text-lg text-muted max-w-xl mx-auto">
            Complete your profile to start listing your premium vehicles on Luxdrive.
          </p>
        </div>

        <motion.div 
          className="glass rounded-3xl p-8 sm:p-10 shadow-premium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-start gap-3 border border-red-100"
                >
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <User className="w-4 h-4 text-muted" />
                    Seller Type
                  </label>
                  <div className="relative">
                    <select
                      name="seller_type"
                      value={formData.seller_type}
                      onChange={handleChange}
                      className="w-full h-12 bg-background border border-border rounded-xl px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                    >
                      <option value="seller_private">Private Seller</option>
                      <option value="seller_dealer">Dealership</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                      <ChevronRight className="w-4 h-4 rotate-90" />
                    </div>
                  </div>
                </div>

                <AnimatePresence mode="popLayout">
                  {isDealer && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      className="space-y-2"
                    >
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted" />
                        Business Name
                      </label>
                      <input
                        type="text"
                        name="business_name"
                        value={formData.business_name}
                        onChange={handleChange}
                        placeholder="e.g. Luxdrive Motors"
                        className="w-full h-12 bg-background border border-border rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all placeholder:text-muted/50"
                        required={isDealer}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted" />
                    GST Number {isDealer ? "" : "(Optional)"}
                  </label>
                  <input
                    type="text"
                    name="gst_number"
                    value={formData.gst_number}
                    onChange={handleChange}
                    placeholder="Enter GST Number"
                    className="w-full h-12 bg-background border border-border rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all placeholder:text-muted/50 uppercase"
                    required={isDealer}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Mumbai"
                      className="w-full h-12 bg-background border border-border rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all placeholder:text-muted/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Maharashtra"
                      className="w-full h-12 bg-background border border-border rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all placeholder:text-muted/50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted" />
                    Complete Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your full street address..."
                    rows={4}
                    className="w-full bg-background border border-border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none placeholder:text-muted/50"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <Button 
                type="submit" 
                size="lg" 
                className="w-full group"
                isLoading={isLoading}
              >
                Create Profile
                {!isLoading && (
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
