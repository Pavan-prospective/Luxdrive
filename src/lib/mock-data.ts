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
  transmission: "Auto" | "Manual";
  kilometers: number;
  stateCode: string;
  image: string;
  isOwnedStock?: boolean;
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
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600",
    isOwnedStock: true,
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
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600",
    isOwnedStock: true,
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
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=600",
    isOwnedStock: true,
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
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600",
    isOwnedStock: true,
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
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=600",
    isOwnedStock: true,
  }
];
