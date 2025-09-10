import { Injectable } from '@angular/core';
import { Observable, of, map, delay } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Mock data representing products from wholesalers
  private mockProducts: Product[] = [
    {
      id: 'prod_001',
      name: 'Organic Olive Oil (750ml)',
      description: 'Extra virgin olive oil from organic farms, perfect for salads and cooking. Sourced from the finest groves in Andalusia, this oil has a rich, peppery finish.',
      imageUrl: 'https://placehold.co/600x400/a3e635/ffffff?text=Olive+Oil',
      category: 'Pantry Staples',
      b2cPrice: 19.99,
      b2bPrice: 12.50,
      stockQuantity: 150,
    },
    {
      id: 'prod_002',
      name: 'Artisanal Coffee Beans (1kg)',
      description: 'A rich and aromatic blend of single-origin Arabica beans, medium-roasted to perfection. Features notes of chocolate, caramel, and a hint of citrus.',
      imageUrl: 'https://placehold.co/600x400/7c2d12/ffffff?text=Coffee',
      category: 'Beverages',
      b2cPrice: 35.00,
      b2bPrice: 24.99,
      stockQuantity: 80,
    },
    {
      id: 'prod_003',
      name: 'Whole Grain Pasta (Bulk 2kg)',
      description: 'Healthy and delicious whole grain fusilli, sold in bulk. Made with 100% durum wheat for that perfect al dente texture every time.',
      imageUrl: 'https://placehold.co/600x400/f59e0b/ffffff?text=Pasta',
      category: 'Pantry Staples',
      b2cPrice: 15.50,
      b2bPrice: 9.75,
      stockQuantity: 200,
    },
    {
      id: 'prod_004',
      name: 'Assorted French Cheeses',
      description: 'A curated selection of four premium French cheeses: Camembert, Roquefort, Comté, and a fresh Chèvre. Perfect for any cheese board.',
      imageUrl: 'https://placehold.co/600x400/facc15/000000?text=Cheese',
      category: 'Dairy & Cheese',
      b2cPrice: 45.00,
      b2bPrice: 32.00,
      stockQuantity: 50,
    },
    {
      id: 'prod_005',
      name: 'Premium Belgian Chocolate Box',
      description: 'An elegant box of 24 assorted dark and milk chocolates crafted by master chocolatiers in Bruges. A true delight for the senses.',
      imageUrl: 'https://placehold.co/600x400/4a044e/ffffff?text=Chocolate',
      category: 'Confectionery',
      b2cPrice: 28.00,
      b2bPrice: 19.50,
      stockQuantity: 120,
    },
    {
      id: 'prod_006',
      name: 'Sparkling Mineral Water (12x1L)',
      description: 'Case of 12 one-liter bottles of natural sparkling water from the pristine springs of the Italian Alps. Crisp, clean, and refreshing.',
      imageUrl: 'https://placehold.co/600x400/22d3ee/000000?text=Water',
      category: 'Beverages',
      b2cPrice: 22.00,
      b2bPrice: 14.00,
      stockQuantity: 300,
    },
  ];

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.mockProducts).pipe(delay(500)); // Simulate network latency
  }

  // New method to get a single product by its ID
  getProductById(id: string): Observable<Product | undefined> {
    const product = this.mockProducts.find(p => p.id === id);
    return of(product).pipe(delay(300)); // Simulate network latency
  }
}

