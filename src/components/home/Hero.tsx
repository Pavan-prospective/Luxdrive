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

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-accent uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              The Epitome of Automotive Excellence
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-tight mb-6">
              Experience the Art of <br />
              <span className="text-accent italic">Elite</span> Driving
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
              Discover a curated collection of the world's most prestigious luxury, performance, and premium automotive masterpieces.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <Button size="lg" className="rounded-full shadow-2xl shadow-accent/20 group">
              Explore Collection
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="secondary" className="rounded-full glass text-primary hover:bg-white/90">
              <Play className="mr-2 w-5 h-5 fill-current" />
              Watch Experience
            </Button>
          </motion.div>

          {/* Floating Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 glass p-2 rounded-2xl md:rounded-full max-w-4xl shadow-2xl flex flex-col md:flex-row items-center gap-2"
          >
            <div className="flex-1 flex items-center gap-4 px-6 py-2 w-full">
              <Search className="w-5 h-5 text-muted shrink-0" />
              <input 
                type="text" 
                placeholder="Search by Brand, Model, or Year..." 
                className="bg-transparent border-none focus:ring-0 text-primary placeholder:text-muted w-full font-medium"
              />
            </div>
            <div className="h-8 w-[1px] bg-border hidden md:block" />
            <div className="flex-1 px-6 py-2 w-full">
              <select className="bg-transparent border-none focus:ring-0 text-primary font-medium w-full cursor-pointer">
                <option>All Categories</option>
                <option>Luxury Sedans</option>
                <option>Performance SUVs</option>
                <option>Supercars</option>
              </select>
            </div>
            <Button variant="accent" className="rounded-full w-full md:w-auto px-10 h-12">
              Find My Car
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-12 hidden lg:flex items-center gap-8 z-10">
        <div className="flex flex-col">
          <span className="text-white font-bold text-2xl">500+</span>
          <span className="text-gray-400 text-xs uppercase tracking-widest">Premium Units</span>
        </div>
        <div className="w-[1px] h-8 bg-white/20" />
        <div className="flex flex-col">
          <span className="text-white font-bold text-2xl">100%</span>
          <span className="text-gray-400 text-xs uppercase tracking-widest">Verified History</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
