import { Injectable, computed, signal } from '@angular/core';
import { Cart, CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Use Angular Signals for modern, fine-grained reactivity
  private cart = signal<Cart>({ items: [] });

  // Public computed signals that derive from the cart state
  public cartItems = computed(() => this.cart().items);
  public totalItems = computed(() => this.cart().items.reduce((acc, item) => acc + item.quantity, 0));
  public totalPrice = computed(() => this.cart().items.reduce((acc, item) => acc + item.product.b2bPrice * item.quantity, 0));

  constructor() { }

  addToCart(product: Product, quantity: number = 1): void {
    this.cart.update(currentCart => {
      const existingItem = currentCart.items.find(item => item.product.id === product.id);
      let newItems: CartItem[];

      if (existingItem) {
        // If item exists, update its quantity
        newItems = currentCart.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // If item does not exist, add it to the cart
        newItems = [...currentCart.items, { product, quantity }];
      }

      return { ...currentCart, items: newItems };
    });
  }

  updateQuantity(productId: string, quantity: number): void {
    this.cart.update(currentCart => {
      const newItems = currentCart.items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      return { ...currentCart, items: newItems };
    });
  }

  removeFromCart(productId: string): void {
    this.cart.update(currentCart => {
      const newItems = currentCart.items.filter(item => item.product.id !== productId);
      return { ...currentCart, items: newItems };
    });
  }
}
