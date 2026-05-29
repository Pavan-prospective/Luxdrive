"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Fuel, Gauge, Settings, ShieldCheck, ArrowUpRight } from "lucide-react";
import { cn, formatCurrency, formatKm } from "@/lib/utils";
import { Car } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-3xl border border-border overflow-hidden hover-lift flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="glass px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5 shadow-sm">
            <ShieldCheck className="w-3 h-3 text-accent" />
            Luxe Verified
          </span>
        </div>
        <button className="absolute top-4 right-4 p-2.5 glass rounded-full hover:bg-white transition-colors group/heart">
          <Heart className="w-4 h-4 text-primary group-hover/heart:fill-red-500 group-hover/heart:text-red-500 transition-all" />
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <Link href={`/buy-cars/${car.id}`} className="w-full">
            <Button variant="accent" className="w-full rounded-xl">
              View Details
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1">{car.brand}</p>
            <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors truncate max-w-[200px]">
              {car.model}
            </h3>
          </div>
          <p className="text-sm font-bold text-muted-foreground">{car.year}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 my-6">
          <div className="flex flex-col items-center gap-1.5 p-2 bg-secondary rounded-2xl">
            <Gauge className="w-4 h-4 text-muted" />
            <span className="text-[10px] font-medium text-muted truncate w-full text-center">{formatKm(car.kilometers)}</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-2 bg-secondary rounded-2xl">
            <Fuel className="w-4 h-4 text-muted" />
            <span className="text-[10px] font-medium text-muted truncate w-full text-center">{car.fuelType}</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-2 bg-secondary rounded-2xl">
            <Settings className="w-4 h-4 text-muted" />
            <span className="text-[10px] font-medium text-muted truncate w-full text-center">{car.transmission}</span>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
          <div>
            <p className="text-xs text-muted font-medium mb-1">Starting from</p>
            <p className="text-2xl font-black text-primary">{formatCurrency(car.price)}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-muted font-bold uppercase tracking-tighter">Est. EMI</p>
            <p className="text-sm font-bold text-accent">{formatCurrency(car.emi)}/mo</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
