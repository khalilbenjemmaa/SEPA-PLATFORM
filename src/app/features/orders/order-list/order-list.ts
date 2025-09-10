// Path: src/app/features/orders/order-list/order-list.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrderActions } from '../../../state/orders/order.actions';
import { selectAllOrders, selectOrdersIsLoading } from '../../../state/orders/order.selectors';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss'
})
export class OrderListComponent implements OnInit {
  private store = inject(Store);
  orders$ = this.store.select(selectAllOrders);
  isLoading$ = this.store.select(selectOrdersIsLoading);

  ngOnInit(): void {
    this.store.dispatch(OrderActions.loadUserOrders());
  }
}
