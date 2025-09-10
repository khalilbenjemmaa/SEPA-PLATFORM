// Path: src/app/state/orders/order.effects.ts

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, of, tap } from 'rxjs';
import { OrderService } from '../../core/services/order.service';
import { OrderActions } from './order.actions';
import { Router } from '@angular/router';

@Injectable()
export class OrderEffects {
  private actions$ = inject(Actions);
  private orderService = inject(OrderService);
  private router = inject(Router);

  placeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.placeOrder),
      exhaustMap(action =>
        this.orderService.placeOrder(action.items, action.userDetails).pipe(
          map(order => OrderActions.placeOrderSuccess({ order })),
          catchError(error => of(OrderActions.placeOrderFailure({ error })))
        )
      )
    )
  );

  placeOrderSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.placeOrderSuccess),
      tap(({ order }) => {
        // Redirect to a confirmation or order detail page
        this.router.navigate(['/orders', order.id]);
      })
    ),
    { dispatch: false }
  );

  loadUserOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadUserOrders),
      exhaustMap(() =>
        this.orderService.getUserOrders().pipe(
          map(orders => OrderActions.loadUserOrdersSuccess({ orders })),
          catchError(error => of(OrderActions.loadUserOrdersFailure({ error })))
        )
      )
    )
  );

  loadOrderDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadOrderDetail),
      exhaustMap(action =>
        this.orderService.getOrderById(action.orderId).pipe(
          map(order => OrderActions.loadOrderDetailSuccess({ order })),
          catchError(error => of(OrderActions.loadOrderDetailFailure({ error })))
        )
      )
    )
  );
}
