"use client";

import { motion } from "framer-motion";
import { BRANDS } from "@/lib/mock-data";

const Brands = () => {
  return (
    <section id="brands" className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-accent uppercase tracking-[0.3em] mb-4">Elite Partners</h2>
          <h3 className="text-4xl md:text-5xl font-black text-primary">Browse by Prestigious Brands</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {BRANDS.slice(0, 12).map((brand, index) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group flex flex-col items-center justify-center p-8 rounded-3xl border border-border hover:border-accent hover:shadow-premium transition-all cursor-pointer"
            >
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-xl font-black text-primary/40 group-hover:text-accent">{brand[0]}</span>
              </div>
              <span className="text-sm font-bold text-primary text-center">{brand}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
