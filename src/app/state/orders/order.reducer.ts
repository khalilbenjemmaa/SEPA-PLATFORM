// Path: src/app/state/orders/order.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { Order } from '../../core/models/order.model';
import { OrderActions } from './order.actions';

export interface OrdersState {
  orders: Order[];
  selectedOrder: Order | null;
  isLoading: boolean;
  error: any | null;
}

export const initialState: OrdersState = {
  orders: [],
  selectedOrder: null,
  isLoading: false,
  error: null,
};

export const ordersReducer = createReducer(
  initialState,

  // Place Order
  on(OrderActions.placeOrder, (state) => ({ ...state, isLoading: true, error: null })),
  on(OrderActions.placeOrderSuccess, (state, { order }) => ({
    ...state,
    orders: [...state.orders, order],
    selectedOrder: order,
    isLoading: false,
  })),
  on(OrderActions.placeOrderFailure, (state, { error }) => ({ ...state, isLoading: false, error })),

  // Load User Orders
  on(OrderActions.loadUserOrders, (state) => ({ ...state, isLoading: true, error: null })),
  on(OrderActions.loadUserOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders,
    isLoading: false,
  })),
  on(OrderActions.loadUserOrdersFailure, (state, { error }) => ({ ...state, isLoading: false, error })),

  // Load Order Detail
  on(OrderActions.loadOrderDetail, (state) => ({ ...state, isLoading: true, error: null, selectedOrder: null })),
  on(OrderActions.loadOrderDetailSuccess, (state, { order }) => ({
    ...state,
    selectedOrder: order,
    isLoading: false,
  })),
  on(OrderActions.loadOrderDetailFailure, (state, { error }) => ({ ...state, isLoading: false, error })),
);
