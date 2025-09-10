// Path: src/app/core/services/payment.service.ts

import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError, map } from 'rxjs';

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }

  /**
   * @description Simulates processing a payment through a third-party gateway like Stripe.
   * @param paymentDetails The payment information (e.g., card number, CVC).
   * @param amount The total amount to be charged.
   * @returns An observable with the payment response.
   */
  processPayment(paymentDetails: any, amount: number): Observable<PaymentResponse> {
    console.log(`Processing payment of $${amount} with details:`, paymentDetails);

    // Simulate network delay and a 90% success rate
    return of(null).pipe(delay(2000)).pipe(
      map(() => {
        if (Math.random() < 0.9) {
          // Payment Successful
          const response: PaymentResponse = {
            success: true,
            transactionId: `TXN-${new Date().getTime()}`,
            message: 'Payment processed successfully.'
          };
          console.log('Payment successful:', response);
          return response;
        } else {
          // Payment Failed
          console.error('Payment failed: Card declined.');
          throw new Error('Your card was declined. Please check the details and try again.');
        }
      })
    );
  }
}
