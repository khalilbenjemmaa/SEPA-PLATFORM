// Path: src/app/core/services/order.service.ts

import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { map } from 'rxjs/operators'; // <-- FIX: Added missing import for the 'map' operator
import { Order } from '../models/order.model';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private mockOrders: Order[] = [];

  constructor() { }

  /**
   * @description Simulates placing an order.
   */
  placeOrder(items: CartItem[], userDetails: any): Observable<Order> {
    console.log('Placing order with:', { items, userDetails });

    return of(true).pipe(delay(1500)).pipe(
      map(() => {
        const totalAmount = items.reduce((acc, item) => acc + item.product.b2bPrice * item.quantity, 0);

        const newOrder: Order = {
          id: `ORD-${new Date().getTime()}`,
          userId: 'mock-user-id',
          companyId: 'mock-company-id',
          items: items,
          totalAmount: totalAmount,
          status: 'processing', // <-- FIX: Changed status to a valid value from the model
          shippingAddress: userDetails.shippingAddress,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        this.mockOrders.push(newOrder);
        console.log('Order successful:', newOrder);
        return newOrder;
      })
    );
  }

  /**
   * @description Fetches all orders for the currently authenticated user.
   */
  getUserOrders(): Observable<Order[]> {
    return of(this.mockOrders).pipe(delay(1000));
  }

  /**
   * @description Fetches a single order by its ID.
   */
  getOrderById(orderId: string): Observable<Order> {
    const order = this.mockOrders.find(o => o.id === orderId);
    if (order) {
      return of(order).pipe(delay(500));
    } else {
      return throwError(() => new Error('Order not found'));
    }
  }
}

