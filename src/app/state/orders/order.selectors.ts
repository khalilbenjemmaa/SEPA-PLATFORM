// Path: src/app/state/orders/order.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersState } from './order.reducer';

export const selectOrdersState = createFeatureSelector<OrdersState>('orders');

export const selectAllOrders = createSelector(
  selectOrdersState,
  (state) => state.orders
);

export const selectSelectedOrder = createSelector(
  selectOrdersState,
  (state) => state.selectedOrder
);

export const selectOrdersIsLoading = createSelector(
  selectOrdersState,
  (state) => state.isLoading
);

export const selectOrdersError = createSelector(
  selectOrdersState,
  (state) => state.error
);
