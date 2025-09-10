export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  b2cPrice: number; // Business-to-Consumer Price (regular price)
  b2bPrice: number; // Business-to-Business Price (employee price)
  stockQuantity: number;
}
