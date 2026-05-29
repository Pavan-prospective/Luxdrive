"use client";

import { motion } from "framer-motion";
import { Search, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000')",
            filter: "brightness(0.6)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-2 mb-6 text-[10px] sm:text-xs font-bold tracking-widest text-accent uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              The Epitome of Automotive Excellence
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[1.2] mb-6">
              Experience the Art of <br />
              <span className="text-accent italic">Elite</span> Driving
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-8 lg:mb-0 max-w-xl leading-relaxed">
              Discover a curated collection of the world's most prestigious luxury, performance, and premium automotive masterpieces.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 lg:pb-4"
          >
            <Button size="lg" className="rounded-full shadow-2xl shadow-accent/20 group w-full sm:w-auto">
              Explore Collection
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="secondary" className="rounded-full glass text-primary hover:bg-white/90 w-full sm:w-auto">
              <Play className="mr-2 w-5 h-5 fill-current" />
              Watch Experience
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
