import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart {
  private cartService = inject(CartService);

  // Expose the signals directly to the template
  public cartItems = this.cartService.cartItems;
  public totalPrice = this.cartService.totalPrice;

  // Methods to interact with the cart service
  updateQuantity(productId: string, quantity: number) {
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
  }
}
