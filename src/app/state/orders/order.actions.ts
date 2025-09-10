// Path: src/app/state/orders/order.actions.ts

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Order } from '../../core/models/order.model';
import { CartItem } from '../../core/models/cart.model';

export const OrderActions = createActionGroup({
  source: 'Orders API',
  events: {
    // Place Order
    'Place Order': props<{ items: CartItem[]; userDetails: any }>(),
    'Place Order Success': props<{ order: Order }>(),
    'Place Order Failure': props<{ error: any }>(),

    // Load User Orders
    'Load User Orders': emptyProps(),
    'Load User Orders Success': props<{ orders: Order[] }>(),
    'Load User Orders Failure': props<{ error: any }>(),

    // Load a Single Order Detail
    'Load Order Detail': props<{ orderId: string }>(),
    'Load Order Detail Success': props<{ order: Order }>(),
    'Load Order Detail Failure': props<{ error: any }>(),
  }
});
