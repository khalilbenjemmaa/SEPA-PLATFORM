// Path: src/app/core/models/order.model.ts

import { CartItem } from "./cart.model";

/**
 * @description Defines the structure for an address.
 */
export interface Address {
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
}

/**
 * @description Defines the structure for an Order object.
 */
export interface Order {
  id: string; // Unique Order ID
  userId: string;
  companyId: string;
  items: CartItem[];
  totalAmount: number;
  // Added 'Processing' as a valid status and defined the shippingAddress property
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  createdAt: Date;
  updatedAt: Date;
}

