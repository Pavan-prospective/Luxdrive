"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShieldCheck } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { Car } from "@/lib/mock-data";

interface CarCardProps {
  car: Car;
  viewMode?: "grid" | "list";
}

const formatLakhs = (amount: number) => {
  return `₹${(amount / 100000).toFixed(2)} lakh`;
};

const formatL = (amount: number) => {
  return `₹${(amount / 100000).toFixed(2)}L`;
};

const CarCard = ({ car, viewMode = "grid" }: CarCardProps) => {
  const isList = viewMode === "list";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow flex h-full",
        isList ? "flex-col sm:flex-row w-full" : "flex-col"
      )}
    >
      {/* Image Container */}
      <div className={cn("relative overflow-hidden shrink-0 bg-gray-100", isList ? "h-64 sm:h-auto sm:w-80" : "h-56")}>
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors group/heart">
          <Heart className="w-5 h-5 text-gray-500 group-hover/heart:fill-red-500 group-hover/heart:text-red-500 transition-all" />
        </button>
      </div>

      {/* Content */}
      <div className={cn("flex flex-col flex-grow relative", isList ? "p-6" : "p-5")}>
        {/* LuxDrive Owned Stock Badge */}
        {car.isOwnedStock && (
          <div className="flex items-center gap-1.5 bg-blue-50 w-fit px-2 py-0.5 rounded text-[11px] font-bold text-blue-700 mb-3 -mt-2 shadow-sm border border-blue-100">
            <ShieldCheck className="w-3.5 h-3.5 fill-blue-700 text-white" />
            LuxDrive Owned Stock
          </div>
        )}

        <div className="mb-4">
          <Link href={`/buy-cars/${car.id}`} className="hover:underline">
            <h3 className="text-lg font-bold text-gray-900 leading-tight">
              {car.year} {car.brand} {car.model} <span className="text-sm font-semibold text-gray-500 ml-1 uppercase">{car.variant}</span>
            </h3>
          </Link>
        </div>

        {/* Spec Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">{car.kilometers.toLocaleString('en-IN')} km</span>
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">{car.fuelType}</span>
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">{car.transmission}</span>
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">{car.stateCode}</span>
        </div>

        {/* Pricing Layout */}
        <div className="mt-auto pt-4 border-t border-dashed border-gray-200 flex items-end justify-between">
          <div>
            <p className="text-[13px] font-bold text-gray-900">EMI {formatCurrency(car.emi)}/m*</p>
          </div>
          <div className="text-right">
            {car.originalPrice && (
              <p className="text-xs text-gray-400 line-through font-medium mb-0.5">{formatL(car.originalPrice)}</p>
            )}
            <p className="text-lg font-black text-gray-900">{formatLakhs(car.price)}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">+ other charges</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
