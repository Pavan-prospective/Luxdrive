"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, ChevronRight, CheckCircle2, Car, ClipboardCheck, Banknote, MapPin, Calendar, Gauge, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const MAIN_STEPS = [
  "Car details",
  "Price estimate",
  "Book inspection",
  "Price discovery",
  "Deal closure",
  "Car handover"
];

const SUB_STEPS = [
  "Brand",
  "Model",
  "Year",
  "Variant",
  "State",
  "Kms driven"
];

// Mock Data for the form
const MOCK_DATA = {
  brands: ["Maruti Suzuki", "Hyundai", "Tata", "Mahindra", "Honda", "Toyota", "Ford", "Volkswagen", "BMW", "Mercedes-Benz"],
  models: {
    "Maruti Suzuki": ["Swift", "Baleno", "Dzire", "Alto", "Wagon R", "Ertiga", "Brezza"],
    "BMW": ["X1", "X3", "X5", "3 Series", "5 Series", "7 Series"],
    "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLC", "GLE"],
  },
  years: ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"],
  variants: ["LXI", "VXI", "ZXI", "ZXI+", "Base", "Premium", "Luxury Line", "M Sport"],
  states: ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat", "Telangana", "Kerala", "West Bengal", "Uttar Pradesh", "Rajasthan"],
  kms: ["0 - 10,000 km", "10,000 - 30,000 km", "30,000 - 50,000 km", "50,000 - 70,000 km", "70,000 - 1,00,000 km", "1,00,000+ km"]
};

const SellCarPage = () => {
  const [currentMainStep, setCurrentMainStep] = useState(0);
  const [currentSubStep, setCurrentSubStep] = useState(0); 
  const [searchQuery, setSearchQuery] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    variant: "",
    state: "",
    kms: ""
  });

  const handleSelection = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSearchQuery(""); // Reset search on advance
    
    // Auto advance sub-step
    if (currentSubStep < SUB_STEPS.length - 1) {
      setCurrentSubStep(prev => prev + 1);
    } else {
      // If finished all sub-steps, move to next main step
      setCurrentMainStep(prev => prev + 1);
    }
  };

  const getStepContent = () => {
    switch (currentSubStep) {
      case 0: // Brand
        const brands = MOCK_DATA.brands.filter(b => b.toLowerCase().includes(searchQuery.toLowerCase()));
        return (
          <>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Select brand</h2>
            <p className="text-gray-500 mb-8 font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              Note: Duplicate listings are not accepted. Ensure your car isn't already listed.
            </p>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 w-5 h-5" />
              <input type="text" placeholder="Search brand..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all text-base font-medium placeholder:text-gray-400" />
            </div>
            <div className="space-y-2">
              {brands.map(brand => (
                <button key={brand} onClick={() => handleSelection('brand', brand)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all text-left group border border-transparent hover:border-gray-200">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-10 bg-gray-100/80 rounded-lg flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all border border-gray-200/50">
                      <Car className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                    </div>
                    <span className="font-bold text-gray-800 text-base">{brand}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
                </button>
              ))}
            </div>
          </>
        );
      
      case 1: // Model
        const modelsToSearch = MOCK_DATA.models[formData.brand as keyof typeof MOCK_DATA.models] || MOCK_DATA.models["Maruti Suzuki"]; // Fallback if dummy brand
        const models = modelsToSearch.filter(m => m.toLowerCase().includes(searchQuery.toLowerCase()));
        return (
          <>
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-sm font-bold border border-blue-100">{formData.brand}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Select model</h2>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 w-5 h-5" />
              <input type="text" placeholder="Search model..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all text-base font-medium placeholder:text-gray-400" />
            </div>
            <div className="space-y-2">
              {models.map(model => (
                <button key={model} onClick={() => handleSelection('model', model)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all text-left group border border-transparent hover:border-gray-200">
                  <div className="flex items-center gap-5">
                    <span className="font-bold text-gray-800 text-base pl-2">{model}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
                </button>
              ))}
            </div>
          </>
        );

      case 2: // Year
        const years = MOCK_DATA.years.filter(y => y.includes(searchQuery));
        return (
          <>
            <div className="mb-6 flex gap-2">
              <span className="inline-flex items-center px-4 py-1.5 rounded-lg bg-gray-50 text-gray-600 text-sm font-bold border border-gray-200">{formData.brand}</span>
              <span className="inline-flex items-center px-4 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-sm font-bold border border-blue-100">{formData.model}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Registration Year</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {years.map(year => (
                <button key={year} onClick={() => handleSelection('year', year)} className="py-4 rounded-2xl border-2 border-gray-100 hover:border-blue-600 hover:bg-blue-50 text-center font-bold text-gray-700 hover:text-blue-600 transition-all">
                  {year}
                </button>
              ))}
            </div>
          </>
        );

      case 3: // Variant
        return (
          <>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Select Variant</h2>
            <div className="space-y-2">
              {MOCK_DATA.variants.map(variant => (
                <button key={variant} onClick={() => handleSelection('variant', variant)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all text-left group border border-transparent hover:border-gray-200">
                  <span className="font-bold text-gray-800 text-base pl-2">{variant}</span>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
                </button>
              ))}
            </div>
          </>
        );

      case 4: // State
        const states = MOCK_DATA.states.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
        return (
          <>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Select Registration State</h2>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 w-5 h-5" />
              <input type="text" placeholder="Search state..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all text-base font-medium placeholder:text-gray-400" />
            </div>
            <div className="space-y-2">
              {states.map(state => (
                <button key={state} onClick={() => handleSelection('state', state)} className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-all text-left group border border-transparent hover:border-gray-200">
                  <MapPin className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                  <span className="font-bold text-gray-800 text-base">{state}</span>
                </button>
              ))}
            </div>
          </>
        );

      case 5: // Kms
        return (
          <>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Kilometers Driven</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_DATA.kms.map(km => (
                <button key={km} onClick={() => handleSelection('kms', km)} className="py-6 px-4 rounded-2xl border-2 border-gray-100 hover:border-blue-600 hover:bg-blue-50 text-center font-bold text-gray-700 hover:text-blue-600 transition-all flex items-center justify-center gap-3">
                  <Gauge className="w-5 h-5" />
                  {km}
                </button>
              ))}
            </div>
          </>
        );

      default:
        return <div>Step coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-8 pb-24 font-sans">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
          
          {/* Left Column: Main Stepper */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] h-fit">
            <div className="relative">
              <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-blue-100 z-0"></div>
              
              <div className="space-y-8 relative z-10">
                {MAIN_STEPS.map((step, idx) => {
                  const isActive = idx === currentMainStep;
                  const isPast = idx < currentMainStep;
                  return (
                    <div key={step} className="flex items-center gap-4 cursor-pointer group" onClick={() => setCurrentMainStep(idx)}>
                      <div 
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center border-2 bg-white transition-colors relative z-10 shrink-0",
                          isActive ? "border-blue-600 bg-white ring-4 ring-blue-50" : 
                          isPast ? "border-blue-300 bg-blue-100" : 
                          "border-blue-100 bg-white"
                        )}
                      >
                        {isActive && <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>}
                        {isPast && <div className="w-2.5 h-2.5 rounded-full bg-blue-300"></div>}
                      </div>
                      <span className={cn(
                        "text-[15px] transition-colors group-hover:text-blue-600",
                        isActive ? "text-gray-900 font-bold" : "text-gray-400 font-medium"
                      )}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Middle Column: Form / Wizard */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col h-[750px]">
            {/* Top Sub Stepper */}
            {currentMainStep === 0 && (
              <div className="p-6 border-b border-gray-50 pb-4">
                <div className="flex justify-between items-center px-1">
                  {SUB_STEPS.map((step, idx) => {
                    const isActive = idx === currentSubStep;
                    const isPast = idx < currentSubStep;
                    return (
                      <div key={step} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => setCurrentSubStep(idx)}>
                        <div className={cn(
                          "w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold transition-all shrink-0",
                          isActive ? "bg-blue-600 text-white shadow-md shadow-blue-200 scale-110" : 
                          isPast ? "bg-gray-900 text-white" : 
                          "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                        )}>
                          {isPast ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span className={cn(
                          "text-[10px] sm:text-[12px] font-semibold transition-colors mt-1 hidden sm:block text-center w-full",
                          isActive ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"
                        )}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="w-full bg-gray-100 h-1 mt-4 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full transition-all duration-300" style={{ width: `${((currentSubStep + 1) / SUB_STEPS.length) * 100}%` }}></div>
                </div>
              </div>
            )}

            {/* Content Area */}
            <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar">
              {currentMainStep === 0 ? getStepContent() : (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                    <ClipboardCheck className="w-10 h-10 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{MAIN_STEPS[currentMainStep]}</h2>
                  <p className="text-gray-500 max-w-sm mx-auto">This step of the flow will be integrated with the backend APIs to proceed with the car listing.</p>
                  <button onClick={() => setCurrentMainStep(0)} className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
                    Back to Form
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Info Card */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden sticky top-6">
              <div className="h-56 relative bg-gray-50 w-full">
                <Image 
                  src="/images/car_keys.png" 
                  alt="Car keys exchange" 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
              </div>
              
              <div className="p-6 md:p-8 relative z-10 -mt-12">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-8 leading-tight">Why choose LuxDrive</h3>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                      <Car className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Free home inspection</h4>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                      <ClipboardCheck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Free RC Transfer</h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                      <Banknote className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Instant payment & pickup</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #E5E7EB; border-radius: 20px; }
      `}} />
    </div>
  );
};

export default SellCarPage;
