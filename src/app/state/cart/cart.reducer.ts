// Path: src/app/state/cart/cart.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { CartItem } from '../../core/models/cart.model';
import { CartActions } from './cart.actions';

export interface CartState {
  items: CartItem[];
}

export const initialState: CartState = {
  items: [],
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addItem, (state, { product, quantity }) => {
    const existingItem = state.items.find(item => item.product.id === product.id);
    if (existingItem) {
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      };
    }
    return {
      ...state,
      items: [...state.items, { product, quantity }],
    };
  }),
  on(CartActions.removeItem, (state, { productId }) => ({
    ...state,
    items: state.items.filter(item => item.product.id !== productId),
  })),
  on(CartActions.updateQuantity, (state, { productId, quantity }) => ({
    ...state,
    items: state.items.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    ),
  }))
);
