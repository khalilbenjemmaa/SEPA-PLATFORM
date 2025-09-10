import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service'; // Import CartService

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  @Input({ required: true }) product!: Product;
  private cartService = inject(CartService); // Inject CartService

  get savings(): number {
    return this.product.b2cPrice - this.product.b2bPrice;
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
    // Here you could add a snackbar notification: "Item added to cart!"
  }
}

