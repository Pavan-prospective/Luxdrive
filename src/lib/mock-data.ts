export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  emi: number;
  fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  transmission: "Automatic" | "Manual";
  kilometers: number;
  owner: number;
  image: string;
  images: string[];
  features: string[];
  highlights: string[];
  description: string;
  category: "Luxury" | "Premium" | "Supercar";
  specs: {
    engine: string;
    power: string;
    torque: string;
    acceleration: string;
    topSpeed: string;
  };
  seller: {
    name: string;
    type: "Individual" | "Verified Dealer";
    location: string;
    rating: number;
  };
}

export const BRANDS = [
  "Mercedes-Benz",
  "BMW",
  "Audi",
  "Porsche",
  "Land Rover",
  "Jaguar",
  "Lexus",
  "Volvo",
  "Maserati",
  "Lamborghini",
  "Ferrari",
];

export const MOCK_CARS: Car[] = [
  {
    id: "1",
    brand: "Mercedes-Benz",
    model: "S-Class S 450 4MATIC",
    year: 2023,
    price: 18500000,
    emi: 285000,
    fuelType: "Petrol",
    transmission: "Automatic",
    kilometers: 5200,
    owner: 1,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=1000",
    ],
    features: ["Burmester 3D Surround Sound", "Panoramic Sunroof", "Active Parking Assist", "Heated Seats"],
    highlights: ["Single Owner", "Company Service Record", "No Accidents", "Original Paint"],
    description: "Experience the pinnacle of luxury with the 2023 Mercedes-Benz S-Class. This S 450 4MATIC combines effortless performance with unparalleled comfort.",
    category: "Luxury",
    specs: {
      engine: "2999 cc, 6 Cylinders Inline",
      power: "362 bhp @ 5500 rpm",
      torque: "500 Nm @ 1600 rpm",
      acceleration: "5.1 seconds (0-100 kmph)",
      topSpeed: "250 kmph",
    },
    seller: {
      name: "LuxeDrive Certified",
      type: "Verified Dealer",
      location: "Bandra, Mumbai",
      rating: 4.9,
    },
  },
  {
    id: "2",
    brand: "BMW",
    model: "X7 xDrive40i M Sport",
    year: 2022,
    price: 13500000,
    emi: 195000,
    fuelType: "Petrol",
    transmission: "Automatic",
    kilometers: 12500,
    owner: 1,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1000",
    ],
    features: ["Harman Kardon Audio", "BMW Live Cockpit Professional", "Sky Lounge Panoramic Glass Roof"],
    highlights: ["Extended Warranty", "Mint Condition", "Ceramic Coating"],
    description: "The BMW X7 is the largest SAV in the BMW range. This M Sport edition offers commanding presence and sporting luxury.",
    category: "Luxury",
    specs: {
      engine: "2998 cc, 6 Cylinders Inline",
      power: "335 bhp @ 5500 rpm",
      torque: "450 Nm @ 1500 rpm",
      acceleration: "6.1 seconds (0-100 kmph)",
      topSpeed: "245 kmph",
    },
    seller: {
      name: "Auto Hangar",
      type: "Verified Dealer",
      location: "Gurugram, Delhi NCR",
      rating: 4.7,
    },
  },
  {
    id: "3",
    brand: "Porsche",
    model: "911 Carrera S",
    year: 2021,
    price: 21500000,
    emi: 320000,
    fuelType: "Petrol",
    transmission: "Automatic",
    kilometers: 8000,
    owner: 2,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000",
    ],
    features: ["Sport Chrono Package", "Bose Surround Sound", "PASM Sport Suspension"],
    highlights: ["Track Ready", "Full Service History", "PPF Installed"],
    description: "The legendary Porsche 911. Carrera S offers the perfect balance of daily usability and track-focused performance.",
    category: "Supercar",
    specs: {
      engine: "2981 cc, Flat 6 Cylinders",
      power: "444 bhp @ 6500 rpm",
      torque: "530 Nm @ 2300 rpm",
      acceleration: "3.7 seconds (0-100 kmph)",
      topSpeed: "308 kmph",
    },
    seller: {
      name: "Vikram Mehta",
      type: "Individual",
      location: "Indiranagar, Bengaluru",
      rating: 5.0,
    },
  },
  {
    id: "4",
    brand: "Land Rover",
    model: "Range Rover Velar R-Dynamic S",
    year: 2023,
    price: 9800000,
    emi: 145000,
    fuelType: "Diesel",
    transmission: "Automatic",
    kilometers: 3500,
    owner: 1,
    image: "https://images.unsplash.com/photo-1610415397441-28509c372658?auto=format&fit=crop&q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1610415397441-28509c372658?auto=format&fit=crop&q=80&w=1000",
    ],
    features: ["Meridian Sound System", "Touch Pro Duo", "Interactive Driver Display"],
    highlights: ["Brand New Condition", "Under Warranty", "Insurance Valid"],
    description: "The Range Rover Velar is the most avant-garde SUV in the Land Rover lineup. Stunning design meets incredible capability.",
    category: "Premium",
    specs: {
      engine: "1997 cc, 4 Cylinders Inline",
      power: "201 bhp @ 3750 rpm",
      torque: "430 Nm @ 1750 rpm",
      acceleration: "8.2 seconds (0-100 kmph)",
      topSpeed: "210 kmph",
    },
    seller: {
      name: "Navnit Motors",
      type: "Verified Dealer",
      location: "Worli, Mumbai",
      rating: 4.8,
    },
  }
];
