// Path: src/app/features/payments/checkout/checkout.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// App imports
import { CartService } from '../../../core/services/cart.service';
import { PaymentService } from '../../../core/services/payment.service';
import { OrderActions } from '../../../state/orders/order.actions';
import { selectOrdersIsLoading } from '../../../state/orders/order.selectors';
import { MatDivider } from "@angular/material/divider";


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatStepperModule, MatIconModule, MatProgressSpinnerModule,
    MatDivider
],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private cartService = inject(CartService);
  private paymentService = inject(PaymentService);
  private router = inject(Router);

  // Expose cart signals to template
  cartItems = this.cartService.cartItems;
  totalPrice = this.cartService.totalPrice;
  isLoading$ = this.store.select(selectOrdersIsLoading);


  shippingForm = this.fb.group({
    fullName: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', Validators.required],
  });

  paymentForm = this.fb.group({
    cardholderName: ['', Validators.required],
    cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
    expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/?([0-9]{2})$')]],
    cvc: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
  });


  onConfirmOrder() {
    if (this.shippingForm.invalid || this.paymentForm.invalid) {
      return;
    }

    const userDetails = { shippingAddress: this.shippingForm.value };

    // In a real app, payment processing would happen first
    this.paymentService.processPayment(this.paymentForm.value, this.totalPrice()).subscribe({
      next: (paymentResponse) => {
        if (paymentResponse.success) {
          // If payment is successful, dispatch action to place the order
          this.store.dispatch(OrderActions.placeOrder({
            items: this.cartItems(),
            userDetails: userDetails
          }));
        }
      },
      error: (err) => {
        // Handle payment failure (e.g., show a snackbar)
        console.error("Payment failed:", err.message);
      }
    });
  }
}
