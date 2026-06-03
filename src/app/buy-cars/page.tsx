"use client";

import { useState } from "react";
import { Search, ChevronDown, Check, ChevronRight, ChevronUp } from "lucide-react";
import { MOCK_CARS, BRANDS } from "@/lib/mock-data";
import CarCard from "@/components/shared/CarCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const POPULAR_MODELS = [
  { name: "Creta", brand: "Hyundai" },
  { name: "Wagon R 1.0", brand: "Maruti" },
  { name: "Swift", brand: "Maruti" },
  { name: "City", brand: "Honda" },
  { name: "NEXON", brand: "Tata" },
  { name: "Baleno", brand: "Maruti" },
];

const EXTRA_FILTERS = [
  "Car Category",
  "Model Year",
  "Return Assurance",
  "Kms Driven",
  "Fuel Type",
  "Body Type",
  "Transmission",
  "Color",
  "Features",
  "Seats",
  "Owners",
  "RTO",
  "Safety",
  "Discount"
];

const AccordionFilter = ({ title, defaultOpen = false }: { title: string, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-gray-100 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between group"
      >
        <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{title}</span>
        <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
          {isOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
        </div>
      </button>
      
      {isOpen && (
        <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Dummy checkboxes for demonstration */}
          {[1, 2, 3].map((i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer group/label">
              <div className="w-4 h-4 rounded border border-gray-300 bg-white group-hover/label:border-blue-400 transition-colors"></div>
              <span className="text-sm text-gray-600 group-hover/label:text-gray-900 transition-colors">Sample Option {i}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const BuyCarsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(19500000);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const filteredCars = MOCK_CARS.filter(car => {
    const matchesSearch = car.model.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          car.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(car.brand);
    const matchesPrice = car.price <= priceRange;
    return matchesSearch && matchesBrand && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-32 font-sans">
      <div className="container mx-auto px-4 md:px-6 xl:px-12 2xl:px-24 max-w-[1920px] w-full">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Sidebar Filters */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              {/* Budget */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-4">Budget</h3>
                <div className="flex justify-between text-sm font-bold text-blue-600 mb-2">
                  <span>₹ 0</span>
                  <span>₹ {priceRange.toLocaleString('en-IN')}</span>
                </div>
                <input 
                  type="range" 
                  className="w-full accent-blue-600 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                  min="0" 
                  max="50000000" 
                  step="100000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                />
                <div className="flex justify-between text-[10px] font-medium text-gray-400 mt-2 uppercase">
                  <span>Minimum</span>
                  <span>Maximum</span>
                </div>
              </div>

              <div className="w-full h-px bg-gray-100 mb-8"></div>

              {/* Make & Model */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Make & Model</h3>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search a brand or model"
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <p className="text-xs font-semibold text-gray-400 mb-3">All Brands</p>
                
                {/* Popular Chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {POPULAR_MODELS.map(model => (
                    <button key={model.name} className="flex items-center gap-2 border border-gray-200 rounded px-3 py-1.5 hover:border-blue-500 transition-colors bg-white">
                      <div className="w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center text-[8px] font-bold text-blue-800">{model.brand.charAt(0)}</div>
                      <span className="text-xs font-bold text-gray-700">{model.name}</span>
                    </button>
                  ))}
                </div>

                {/* Brand List */}
                <div className="space-y-1">
                  {BRANDS.map(brand => (
                    <button
                      key={brand}
                      onClick={() => toggleBrand(brand)}
                      className="w-full flex items-center justify-between py-2.5 px-2 hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                          selectedBrands.includes(brand) ? "bg-blue-600 border-blue-600" : "border-gray-300 bg-white group-hover:border-blue-400"
                        )}>
                          {selectedBrands.includes(brand) && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-[9px] font-bold text-blue-800">{brand.charAt(0)}</div>
                        <span className="text-sm font-bold text-gray-800">{brand}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <span className="text-[10px] font-medium">({Math.floor(Math.random() * 5000) + 1000})</span>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Extra Accordion Filters */}
              <div className="mt-6">
                {EXTRA_FILTERS.map((filterName, index) => (
                  <AccordionFilter 
                    key={filterName} 
                    title={filterName} 
                    defaultOpen={index === 0} 
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden">
            
            {/* Top Global Search */}
            <div className="relative mb-8 shadow-sm">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search for your favourite cars"
                className="w-full pl-14 pr-6 py-4 bg-white border border-gray-200 rounded-2xl text-base font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Promotional Banners */}
            <div className="flex gap-4 overflow-x-auto pb-4 mb-6 custom-scrollbar snap-x">
              
              {/* Banner 1 */}
              <div className="min-w-[300px] sm:min-w-[380px] h-36 rounded-2xl p-6 text-white relative overflow-hidden shrink-0 snap-start shadow-md flex items-center" style={{ background: 'linear-gradient(90deg, #1E88E5 0%, #1565C0 100%)' }}>
                <div className="relative z-10 w-2/3">
                  <p className="text-xs font-bold tracking-widest text-blue-200 mb-1">PRE-APPROVAL</p>
                  <h3 className="text-xl font-bold mb-3 leading-tight">within 2 minutes</h3>
                  <button className="text-xs font-medium text-white flex items-center gap-1 border border-white/40 rounded-full px-3 py-1 bg-white/10 hover:bg-white/20 transition-colors">
                    Check EMI Offer <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                {/* Decoration */}
                <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=300')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-[#1565C0] to-transparent"></div>
              </div>

              {/* Banner 2 */}
              <div className="min-w-[300px] sm:min-w-[380px] h-36 rounded-2xl p-6 text-white relative overflow-hidden shrink-0 snap-start shadow-md flex items-center" style={{ background: 'linear-gradient(90deg, #4338CA 0%, #312E81 100%)' }}>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-4xl font-black text-green-400 italic">30</span>
                    <div className="leading-none text-[10px] font-bold text-green-400 bg-green-400/20 px-2 py-1 rounded">DAY<br/>RETURN<br/>GUARANTEE</div>
                  </div>
                  <p className="text-xs font-medium text-indigo-100 mb-2 leading-relaxed">We take it back as easily as<br/>we delivered it</p>
                  <button className="text-xs font-medium text-white flex items-center gap-1 hover:underline">
                    Know more <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Banner 3 */}
              <div className="min-w-[300px] sm:min-w-[380px] h-36 rounded-2xl p-6 text-white relative overflow-hidden shrink-0 snap-start shadow-md flex items-center" style={{ background: 'linear-gradient(90deg, #1D4ED8 0%, #1E3A8A 100%)' }}>
                <div className="relative z-10 w-2/3">
                  <div className="flex items-center gap-2 mb-3 bg-green-500 w-fit px-3 py-1 rounded text-white font-black italic">
                    LIFETIME WARRANTY
                  </div>
                  <p className="text-xs font-medium text-blue-100 mb-2 leading-relaxed">India's first, a warranty that<br/>lasts as long as your car</p>
                  <button className="text-xs font-medium text-white flex items-center gap-1 hover:underline">
                    Know more <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>

            {/* Header & Sort */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <h1 className="text-xl font-bold text-gray-900">Used cars in India</h1>
              <div className="relative">
                <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-bold text-gray-700 hover:border-blue-500 transition-colors">
                  <span className="rotate-90">⇄</span> Best Match <ChevronDown className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>

            {/* Grid */}
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-[1920px]:grid-cols-5 gap-6">
                
                {filteredCars.map((car, idx) => (
                  <div key={car.id} className="contents">
                    <CarCard car={car} />
                    
                    {/* Inject Loan Card after the 2nd item */}
                    {idx === 1 && (
                      <div className="bg-gradient-to-b from-blue-600 to-blue-800 rounded-2xl p-6 text-white flex flex-col items-center text-center justify-between shadow-lg">
                        <div className="w-full">
                          <div className="flex items-center justify-center gap-2 mb-6">
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                              <div className="w-3 h-3 border-2 border-blue-600 rounded-sm"></div>
                            </div>
                            <span className="font-black text-xl tracking-tight">LUXULOANS</span>
                          </div>
                          
                          <p className="text-sm font-medium text-blue-100 mb-2">Get a used car loan up to</p>
                          <h3 className="text-4xl font-black mb-8">₹35,00,000*</h3>
                          
                          <div className="grid grid-cols-3 gap-2 w-full text-center divide-x divide-blue-500/50 mb-8">
                            <div>
                              <p className="text-[10px] text-blue-200 font-medium mb-1">Down payment</p>
                              <p className="text-sm font-bold">Up to zero</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-blue-200 font-medium mb-1">Interest rate</p>
                              <p className="text-sm font-bold">Starting @10.99%</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-blue-200 font-medium mb-1">Months tenure</p>
                              <p className="text-sm font-bold">Up to 84</p>
                            </div>
                          </div>
                        </div>
                        
                        <button className="w-full bg-white text-blue-700 font-bold py-3.5 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                          Check loan offer
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-24 text-center bg-white rounded-2xl border border-dashed border-gray-300">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No cars found</h3>
                <p className="text-gray-500">Try adjusting your filters or search query.</p>
                <Button variant="outline" className="mt-6 rounded-lg" onClick={() => { setSearchQuery(""); setSelectedBrands([]); setPriceRange(50000000); }}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #E5E7EB; border-radius: 20px; }
      `}} />
    </div>
  );
};

export default BuyCarsPage;
