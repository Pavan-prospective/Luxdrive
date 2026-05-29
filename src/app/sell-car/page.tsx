"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, ChevronLeft, Upload, CheckCircle2, 
  Car, Sliders, DollarSign, Image as ImageIcon, ClipboardCheck, ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const STEPS = [
  { title: "Basic Details", icon: Car },
  { title: "Specifications", icon: Sliders },
  { title: "Pricing", icon: DollarSign },
  { title: "Photos", icon: ImageIcon },
  { title: "Review", icon: ClipboardCheck },
];

const SellCarPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen bg-secondary/30 pt-10 pb-24">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-4">Sell Your Luxury Vehicle</h1>
          <p className="text-muted-foreground">List your automotive masterpiece in minutes and connect with elite buyers.</p>
        </div>

        {/* Stepper */}
        <div className="mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-border -translate-y-1/2 z-0 hidden md:block" />
          <div className="flex justify-between items-center relative z-10">
            {STEPS.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <div 
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border-2",
                    idx < currentStep ? "bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/20" :
                    idx === currentStep ? "bg-accent border-accent text-white shadow-lg shadow-accent/20 scale-110" :
                    "bg-white border-border text-muted"
                  )}
                >
                  {idx < currentStep ? <CheckCircle2 className="w-6 h-6" /> : <step.icon className="w-5 h-5" />}
                </div>
                <span className={cn(
                  "mt-4 text-[10px] font-bold uppercase tracking-widest hidden md:block",
                  idx === currentStep ? "text-primary" : "text-muted"
                )}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-[3rem] border border-border shadow-2xl p-8 md:p-16 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Step 1: Basic Details */}
              {currentStep === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-black mb-8">What are you listing?</h3>
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted block">Brand</label>
                      <select className="w-full h-14 bg-secondary border-none rounded-2xl px-6 font-bold text-primary focus:ring-2 focus:ring-accent/20">
                        <option>Select Brand</option>
                        <option>Mercedes-Benz</option>
                        <option>BMW</option>
                        <option>Porsche</option>
                      </select>
                    </div>
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted block">Model</label>
                      <input type="text" placeholder="e.g. S-Class" className="w-full h-14 bg-secondary border-none rounded-2xl px-6 font-bold text-primary focus:ring-2 focus:ring-accent/20" />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-2xl font-black mb-8 opacity-0">Hidden</h3>
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted block">Year of Registration</label>
                      <select className="w-full h-14 bg-secondary border-none rounded-2xl px-6 font-bold text-primary focus:ring-2 focus:ring-accent/20">
                        <option>Select Year</option>
                        {[2024, 2023, 2022, 2021, 2020].map(y => <option key={y}>{y}</option>)}
                      </select>
                    </div>
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted block">Owner Type</label>
                      <div className="grid grid-cols-2 gap-4">
                        {["1st Owner", "2nd Owner"].map(type => (
                          <button key={type} className="h-14 border-2 border-border rounded-2xl font-bold hover:border-accent hover:text-accent transition-all">
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Specs */}
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-6">
                    <h3 className="text-2xl font-black mb-8">Technical Specs</h3>
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted block">Fuel Type</label>
                      <div className="grid grid-cols-2 gap-4">
                        {["Petrol", "Diesel", "Electric", "Hybrid"].map(type => (
                          <button key={type} className="h-14 border-2 border-border rounded-2xl font-bold hover:border-accent hover:text-accent transition-all">{type}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-2xl font-black mb-8 opacity-0">Hidden</h3>
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted block">Transmission</label>
                      <div className="grid grid-cols-2 gap-4">
                        {["Automatic", "Manual"].map(type => (
                          <button key={type} className="h-14 border-2 border-border rounded-2xl font-bold hover:border-accent hover:text-accent transition-all">{type}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Photos (Placeholder logic) */}
              {currentStep === 3 && (
                <div className="text-center space-y-8">
                  <h3 className="text-2xl font-black">Showcase Your Car</h3>
                  <div className="border-4 border-dashed border-border rounded-[3rem] p-16 hover:border-accent hover:bg-accent/5 transition-all cursor-pointer group">
                    <div className="w-20 h-20 bg-secondary rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <Upload className="w-10 h-10 text-muted group-hover:text-accent" />
                    </div>
                    <p className="text-xl font-bold text-primary mb-2">Drag and drop images here</p>
                    <p className="text-muted-foreground">Or click to browse from your device (Max 20 photos)</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="aspect-square bg-secondary rounded-2xl border-2 border-dashed border-border flex items-center justify-center text-muted font-bold text-xs uppercase tracking-widest">
                        Preview {i}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fallback for other steps */}
              {currentStep !== 0 && currentStep !== 1 && currentStep !== 3 && (
                 <div className="py-24 text-center">
                    <h3 className="text-3xl font-black mb-4">{STEPS[currentStep].title} Form</h3>
                    <p className="text-muted-foreground">Building the specialized inputs for this step...</p>
                 </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-16 flex items-center justify-between pt-8 border-t border-border">
            <Button 
              variant="ghost" 
              onClick={prevStep} 
              disabled={currentStep === 0}
              className="font-bold text-muted h-14 px-8 rounded-2xl"
            >
              <ChevronLeft className="mr-2 w-5 h-5" />
              Back
            </Button>
            <Button 
              variant="accent" 
              onClick={nextStep}
              className="font-black h-16 px-12 rounded-2xl shadow-xl shadow-accent/20"
            >
              {currentStep === STEPS.length - 1 ? "Submit Listing" : "Save & Continue"}
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Support */}
        <div className="mt-12 flex items-center justify-center gap-8 text-sm font-bold text-muted">
           <div className="flex items-center gap-2">
             <ShieldCheck className="w-5 h-5 text-accent" />
             Verified Listings
           </div>
           <div className="flex items-center gap-2">
             <DollarSign className="w-5 h-5 text-accent" />
             Best Market Price
           </div>
           <div className="flex items-center gap-2">
             <CheckCircle2 className="w-5 h-5 text-accent" />
             Instant Approval
           </div>
        </div>
      </div>
    </div>
  );
};

export default SellCarPage;
