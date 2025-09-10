// Path: src/app/features/orders/order-detail/order-detail.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrderActions } from '../../../state/orders/order.actions';
import { selectSelectedOrder, selectOrdersIsLoading } from '../../../state/orders/order.selectors';
import { map } from 'rxjs';
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatDivider],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.scss'
})
export class OrderDetailComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  order$ = this.store.select(selectSelectedOrder);
  isLoading$ = this.store.select(selectOrdersIsLoading);

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id'))
    ).subscribe(id => {
      if (id) {
        this.store.dispatch(OrderActions.loadOrderDetail({ orderId: id }));
      }
    });
  }
}
