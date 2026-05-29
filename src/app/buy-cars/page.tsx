"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, ChevronDown, LayoutGrid, List, X } from "lucide-react";
import { MOCK_CARS, BRANDS } from "@/lib/mock-data";
import CarCard from "@/components/shared/CarCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const BuyCarsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredCars = MOCK_CARS.filter(car => {
    const matchesSearch = car.model.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          car.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === "All" || car.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  return (
    <div className="min-h-screen bg-background pt-16 pb-32">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-20 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-display font-black text-primary mb-6 tracking-tight">
            Curated Collection
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Discover automotive masterpieces from our hand-picked inventory. Each vehicle represents the pinnacle of luxury, performance, and engineering excellence.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-8">
            <div className="bg-white p-8 rounded-[2rem] border border-border shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Filters</h3>
                <button className="text-xs font-bold text-accent uppercase tracking-wider">Reset</button>
              </div>

              {/* Search */}
              <div className="mb-8">
                <label className="text-xs font-bold uppercase tracking-widest text-muted block mb-3">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input 
                    type="text" 
                    placeholder="Model or brand..."
                    className="w-full pl-10 pr-4 py-3 bg-secondary rounded-xl text-sm border-none focus:ring-2 focus:ring-accent/20 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Brands */}
              <div className="mb-8">
                <label className="text-xs font-bold uppercase tracking-widest text-muted block mb-3">Brand</label>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  {["All", ...BRANDS].map(brand => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={cn(
                        "w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                        selectedBrand === brand ? "bg-primary text-white" : "hover:bg-secondary text-primary"
                      )}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <label className="text-xs font-bold uppercase tracking-widest text-muted block mb-3">Price Range</label>
                <input type="range" className="w-full accent-accent" min="0" max="50000000" />
                <div className="flex justify-between mt-2 text-xs font-bold text-muted">
                  <span>0L</span>
                  <span>5Cr+</span>
                </div>
              </div>

              {/* Other Filters */}
              {["Fuel Type", "Transmission", "Body Type", "Ownership"].map(filter => (
                <div key={filter} className="mb-4">
                  <button className="flex items-center justify-between w-full text-sm font-bold text-primary py-2 group">
                    {filter}
                    <ChevronDown className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
                  </button>
                </div>
              ))}
            </div>

            {/* Support Card */}
            <div className="bg-primary p-8 rounded-[2rem] text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <h4 className="text-xl font-bold mb-4 relative z-10">Need Assistance?</h4>
              <p className="text-xs text-gray-400 mb-6 relative z-10 leading-relaxed">Our luxury automotive consultants are available 24/7 to help you find your perfect match.</p>
              <Button variant="accent" className="w-full rounded-xl relative z-10">Contact Concierge</Button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="bg-white p-4 md:p-6 rounded-3xl border border-border shadow-sm mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-primary">{filteredCars.length} Cars Available</span>
                <div className="h-4 w-[1px] bg-border hidden md:block" />
                <button className="lg:hidden flex items-center gap-2 text-sm font-bold px-4 py-2 bg-secondary rounded-xl" onClick={() => setIsFilterOpen(true)}>
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center bg-secondary p-1 rounded-xl">
                  <button className="p-2 bg-white rounded-lg shadow-sm text-primary">
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-muted hover:text-primary transition-colors">
                    <List className="w-4 h-4" />
                  </button>
                </div>
                <div className="relative">
                  <select className="appearance-none bg-secondary border-none pl-4 pr-10 py-2.5 rounded-xl text-sm font-bold text-primary focus:ring-2 focus:ring-accent/20 cursor-pointer">
                    <option>Newest Listings</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Kilometers: Low to High</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid */}
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredCars.map(car => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center bg-white rounded-[3rem] border border-dashed border-border">
                <Search className="w-16 h-16 text-muted mx-auto mb-6 opacity-20" />
                <h3 className="text-2xl font-bold text-primary mb-2">No cars found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
                <Button variant="outline" className="mt-8 rounded-full" onClick={() => { setSearchQuery(""); setSelectedBrand("All"); }}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden">
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-xs bg-white p-8 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold">Filters</h3>
              <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-secondary rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* Add mobile filter content here (duplicated or abstracted) */}
            <div className="space-y-6 overflow-y-auto max-h-[80vh] pr-2">
               {/* Simplified brand list for mobile */}
               <div>
                 <label className="text-xs font-bold uppercase tracking-widest text-muted block mb-3">Brand</label>
                 <div className="grid grid-cols-2 gap-2">
                   {["All", ...BRANDS.slice(0, 7)].map(brand => (
                     <button
                       key={brand}
                       onClick={() => { setSelectedBrand(brand); setIsFilterOpen(false); }}
                       className={cn(
                         "px-3 py-2 rounded-xl text-xs font-bold border transition-all",
                         selectedBrand === brand ? "bg-primary text-white border-primary" : "border-border text-primary"
                       )}
                     >
                       {brand}
                     </button>
                   ))}
                 </div>
               </div>
            </div>
            <div className="absolute bottom-8 left-8 right-8">
              <Button className="w-full rounded-2xl h-14" onClick={() => setIsFilterOpen(false)}>
                Show Results
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyCarsPage;
