export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  brand: string;
  category: string;
  rating: number;
  reviewCount: number;
  specs: {
    [key: string]: string;
  };
  inStock: boolean;
  stockCount?: number;
  features: string[];
}