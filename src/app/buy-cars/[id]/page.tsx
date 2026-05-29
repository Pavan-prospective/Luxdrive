"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronLeft, Heart, Share2, ShieldCheck, Fuel, 
  Gauge, Settings, Calendar, User, Info, CheckCircle2, 
  MapPin, Phone, MessageSquare, Download
} from "lucide-react";
import { MOCK_CARS } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";
import { cn, formatCurrency, formatKm } from "@/lib/utils";
import CarCard from "@/components/shared/CarCard";

const CarDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const car = MOCK_CARS.find(c => c.id === id) || MOCK_CARS[0];

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Breadcrumbs & Actions */}
      <div className="container mx-auto px-6 md:px-12 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link href="/buy-cars" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group">
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Inventory
          </Link>
          <div className="flex items-center gap-3">
            <button className="p-2.5 bg-secondary rounded-full hover:bg-white border border-transparent hover:border-border transition-all">
              <Share2 className="w-5 h-5 text-primary" />
            </button>
            <button className="p-2.5 bg-secondary rounded-full hover:bg-white border border-transparent hover:border-border transition-all">
              <Heart className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Gallery & Details */}
          <div className="lg:col-span-8 space-y-12">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl">
                <Image 
                  src={car.image} 
                  alt={car.model} 
                  fill 
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-8 left-8">
                  <span className="glass px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    LuxDrive Certified
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {car.images.map((img, idx) => (
                  <div key={idx} className="relative aspect-video rounded-3xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border-2 border-transparent hover:border-accent">
                    <Image src={img} alt={`${car.model} view ${idx}`} fill className="object-cover" />
                  </div>
                ))}
                <div className="relative aspect-video rounded-3xl overflow-hidden cursor-pointer bg-secondary flex items-center justify-center group">
                   <span className="text-sm font-bold text-primary group-hover:scale-110 transition-transform">+12 More</span>
                </div>
              </div>
            </div>

            {/* Car Overview */}
            <section className="bg-secondary/40 p-8 md:p-12 rounded-[3rem]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">Kilometers</span>
                  <div className="flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-accent" />
                    <span className="text-lg font-black">{formatKm(car.kilometers)}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">Fuel Type</span>
                  <div className="flex items-center gap-2">
                    <Fuel className="w-5 h-5 text-accent" />
                    <span className="text-lg font-black">{car.fuelType}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">Transmission</span>
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-accent" />
                    <span className="text-lg font-black">{car.transmission}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">Ownership</span>
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-accent" />
                    <span className="text-lg font-black">{car.owner}{car.owner === 1 ? "st" : "nd"} Owner</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Description */}
            <section>
              <h3 className="text-2xl font-black mb-6">Expert Review & Description</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {car.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {car.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-white border border-border rounded-2xl">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-sm font-bold text-primary">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Specifications */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black">Technical Specifications</h3>
                <Button variant="ghost" className="text-accent hover:text-accent font-bold">
                  View Full Report
                </Button>
              </div>
              <div className="bg-white border border-border rounded-[2.5rem] overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {Object.entries(car.specs).map(([key, value], idx) => (
                    <div key={key} className={cn(
                      "flex items-center justify-between p-6 border-border",
                      idx % 2 === 0 ? "md:border-r" : "",
                      idx < Object.keys(car.specs).length - 2 ? "border-b" : ""
                    )}>
                      <span className="text-sm font-bold text-muted capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-sm font-black text-primary">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Features */}
            <section>
              <h3 className="text-2xl font-black mb-8">Premium Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {car.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-sm font-medium text-primary">{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Pricing & Inquiry */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-32 space-y-8">
              {/* Pricing Card */}
              <div className="bg-white p-8 rounded-[3rem] border border-border shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                
                <div className="mb-8">
                  <p className="text-sm font-bold text-accent uppercase tracking-widest mb-2">{car.brand}</p>
                  <h2 className="text-3xl font-black text-primary mb-2">{car.model}</h2>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-muted-foreground">{car.year}</span>
                    <div className="w-1 h-1 bg-border rounded-full" />
                    <span className="text-sm font-bold text-muted-foreground">{formatKm(car.kilometers)}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1">Fixed Price</p>
                    <p className="text-5xl font-black text-primary tracking-tighter">{formatCurrency(car.price)}</p>
                  </div>
                  <div className="p-4 bg-secondary/60 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Starting EMI</p>
                      <p className="text-lg font-black text-primary">{formatCurrency(car.emi)}/mo</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs font-bold text-accent underline">
                      Calculate
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button variant="accent" className="w-full h-16 rounded-2xl text-lg font-black shadow-xl shadow-accent/20">
                    Book Inspection
                  </Button>
                  <Button variant="outline" className="w-full h-16 rounded-2xl text-lg font-black border-2">
                    Check Eligibility
                  </Button>
                </div>

                <p className="mt-6 text-center text-xs text-muted font-medium flex items-center justify-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  Prices exclude insurance & registration
                </p>
              </div>

              {/* Seller Details */}
              <div className="bg-secondary/40 p-8 rounded-[3rem] border border-border">
                <h4 className="text-lg font-black mb-6">Seller Information</h4>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-xl font-black text-accent shadow-sm">
                    {car.seller.name[0]}
                  </div>
                  <div>
                    <p className="font-black text-primary">{car.seller.name}</p>
                    <p className="text-xs font-bold text-accent">{car.seller.type}</p>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                    <MapPin className="w-4 h-4 text-accent" />
                    {car.seller.location}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                    <Phone className="w-4 h-4 text-accent" />
                    +91 ••••• ••942
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="primary" className="rounded-xl h-12 text-xs font-bold gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Inquiry
                  </Button>
                  <Button variant="outline" className="rounded-xl h-12 text-xs font-bold bg-white gap-2">
                    <Download className="w-4 h-4" />
                    Brochure
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Cars */}
        <div className="mt-32">
          <div className="flex items-center justify-between mb-12">
             <h3 className="text-3xl font-black">Similar Masterpieces</h3>
             <Link href="/buy-cars" className="text-sm font-bold text-accent hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_CARS.filter(c => c.id !== car.id).slice(0, 3).map(simCar => (
              <CarCard key={simCar.id} car={simCar} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
