import Hero from "@/components/home/Hero";
import Brands from "@/components/home/Brands";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CarCard from "@/components/shared/CarCard";
import { MOCK_CARS } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const featuredCars = MOCK_CARS.slice(0, 3);
  const premiumCars = MOCK_CARS.slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      <Hero />
      
      {/* Featured Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-sm font-bold text-accent uppercase tracking-[0.3em] mb-4">The Selection</h2>
              <h3 className="text-4xl md:text-5xl font-display font-black text-primary tracking-tight">Featured Masterpieces</h3>
            </div>
            <Link href="/buy-cars">
              <Button variant="ghost" className="group">
                View All Collection
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      <Brands />
      <WhyChooseUs />

      {/* Mid-Range / Premium Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-accent uppercase tracking-[0.3em] mb-4">Premium Selection</h2>
            <h3 className="text-4xl md:text-5xl font-display font-black text-primary tracking-tight">Exceptional Value, Elite Quality</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/buy-cars">
              <Button size="lg" variant="outline" className="rounded-full px-12">
                Browse Full Catalog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/10 skew-x-12 translate-x-1/2" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 leading-tight tracking-tight">
              Ready to Upgrade Your <br /> 
              <span className="text-accent italic">Driving Legacy?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              Whether you're looking to acquire your next masterpiece or find a new home for your current one, LuxeDrive provides a seamless, premium experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/buy-cars">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 rounded-full px-10">
                  Buy a Luxury Car
                </Button>
              </Link>
              <Link href="/sell-car">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary rounded-full px-10">
                  Sell Your Car
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
