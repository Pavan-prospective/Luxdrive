export interface Car {
  id: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  price: number;
  originalPrice?: number;
  emi: number;
  fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid" | "CNG";
  transmission: "Auto" | "Manual" | "Automatic";
  kilometers: number;
  stateCode: string;
  owner: number;
  image: string;
  isOwnedStock?: boolean;
  images: string[];
  features: string[];
  highlights: string[];
  description: string;
  category: string;
  specs: {
    engine: string;
    power: string;
    torque: string;
    acceleration: string;
    topSpeed: string;
  };
  seller: {
    name: string;
    type: string;
    location: string;
    rating: number;
  };
}

export const BRANDS = [
  "Maruti",
  "Hyundai",
  "Tata",
  "Honda",
  "Mahindra",
  "KIA",
  "Renault",
  "Toyota",
  "Mercedes-Benz",
  "BMW",
  "Audi",
];

export const MOCK_CARS: Car[] = [
  {
    id: "1",
    brand: "Maruti",
    model: "Baleno",
    variant: "DELTA PETROL 1.2",
    year: 2021,
    price: 414000,
    originalPrice: 437000,
    emi: 9203,
    fuelType: "Petrol",
    transmission: "Manual",
    kilometers: 136849,
    stateCode: "GJ-12",
    owner: 1,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600",
    isOwnedStock: true,
    images: ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600"],
    features: ["Apple CarPlay", "Android Auto", "Push Button Start"],
    highlights: ["First Owner", "Full Service History"],
    description: "Well maintained Maruti Baleno with premium features.",
    category: "Premium Hatchback",
    specs: { engine: "1197 cc", power: "88 bhp", torque: "113 Nm", acceleration: "12s", topSpeed: "160 kmph" },
    seller: { name: "LuxDrive Certified", type: "Dealer", location: "Mumbai", rating: 4.8 }
  },
  {
    id: "2",
    brand: "Renault",
    model: "Kwid",
    variant: "CLIMBER 1.0 AMT (O)",
    year: 2021,
    price: 332000,
    originalPrice: 350000,
    emi: 5860,
    fuelType: "Petrol",
    transmission: "Auto",
    kilometers: 53934,
    stateCode: "DL-3C",
    owner: 1,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600",
    isOwnedStock: true,
    images: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600"],
    features: ["Touchscreen", "Power Windows"],
    highlights: ["Good Mileage", "Compact"],
    description: "Perfect city car with automatic transmission.",
    category: "Hatchback",
    specs: { engine: "999 cc", power: "67 bhp", torque: "91 Nm", acceleration: "14s", topSpeed: "150 kmph" },
    seller: { name: "LuxDrive Certified", type: "Dealer", location: "Delhi", rating: 4.5 }
  },
  {
    id: "3",
    brand: "Hyundai",
    model: "Creta",
    variant: "1.4 CRDI SX PLUS",
    year: 2019,
    price: 985000,
    originalPrice: 1050000,
    emi: 18500,
    fuelType: "Diesel",
    transmission: "Manual",
    kilometers: 68000,
    stateCode: "MH-01",
    owner: 1,
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=600",
    isOwnedStock: true,
    images: ["https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=600"],
    features: ["Sunroof", "Ventilated Seats", "Bose Audio"],
    highlights: ["Top Model", "Company Maintained"],
    description: "Popular SUV loaded with features and diesel efficiency.",
    category: "SUV",
    specs: { engine: "1396 cc", power: "89 bhp", torque: "220 Nm", acceleration: "11.5s", topSpeed: "170 kmph" },
    seller: { name: "LuxDrive Certified", type: "Dealer", location: "Pune", rating: 4.9 }
  },
  {
    id: "4",
    brand: "Tata",
    model: "Nexon",
    variant: "XZA+ (O) DARK EDITION",
    year: 2022,
    price: 1150000,
    originalPrice: 1210000,
    emi: 21500,
    fuelType: "Petrol",
    transmission: "Auto",
    kilometers: 22000,
    stateCode: "KA-03",
    owner: 1,
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600",
    isOwnedStock: true,
    images: ["https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600"],
    features: ["Harman Audio", "Ventilated Seats", "Air Purifier"],
    highlights: ["Dark Edition", "Low KMs"],
    description: "Stunning dark edition Nexon with low running.",
    category: "Compact SUV",
    specs: { engine: "1198 cc", power: "118 bhp", torque: "170 Nm", acceleration: "11s", topSpeed: "180 kmph" },
    seller: { name: "LuxDrive Certified", type: "Dealer", location: "Bangalore", rating: 4.7 }
  },
  {
    id: "5",
    brand: "Honda",
    model: "City",
    variant: "ZX CVT",
    year: 2020,
    price: 1020000,
    emi: 19800,
    fuelType: "Petrol",
    transmission: "Auto",
    kilometers: 45000,
    stateCode: "UP-16",
    owner: 2,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600",
    images: ["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600"],
    features: ["Sunroof", "Lane Watch Camera", "Leather Seats"],
    highlights: ["Smooth CVT", "Spacious"],
    description: "The benchmark sedan in India with smooth automatic drive.",
    category: "Sedan",
    specs: { engine: "1498 cc", power: "119 bhp", torque: "145 Nm", acceleration: "10.5s", topSpeed: "190 kmph" },
    seller: { name: "Auto Deals", type: "Dealer", location: "Noida", rating: 4.4 }
  },
  {
    id: "6",
    brand: "BMW",
    model: "X1",
    variant: "sDrive20d xLine",
    year: 2021,
    price: 3450000,
    originalPrice: 3600000,
    emi: 65000,
    fuelType: "Diesel",
    transmission: "Auto",
    kilometers: 31000,
    stateCode: "MH-02",
    owner: 1,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=600",
    isOwnedStock: true,
    images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=600"],
    features: ["Panoramic Sunroof", "M Sport Steering", "Ambient Lighting"],
    highlights: ["BMW Service Inclusive", "Single Owner"],
    description: "Premium compact SUV offering pure driving pleasure.",
    category: "Luxury SUV",
    specs: { engine: "1995 cc", power: "188 bhp", torque: "400 Nm", acceleration: "7.9s", topSpeed: "222 kmph" },
    seller: { name: "LuxDrive Certified", type: "Dealer", location: "Mumbai", rating: 4.9 }
  }
];
