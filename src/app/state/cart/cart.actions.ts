// Path: src/app/state/cart/cart.actions.ts

import { createActionGroup, props } from '@ngrx/store';
import { Product } from '../../core/models/product.model';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Add Item': props<{ product: Product; quantity: number }>(),
    'Remove Item': props<{ productId: string }>(),
    'Update Quantity': props<{ productId: string; quantity: number }>(),
  }
});
