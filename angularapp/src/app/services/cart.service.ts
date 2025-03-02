import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderItem } from '../models/order-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject: BehaviorSubject<OrderItem[]> = new BehaviorSubject<OrderItem[]>([]);

  private cart: OrderItem[] = [];

  addToCart(product: Product, quantity: number): void {
    const existingItem = this.cart.find(item => item.product.productId === product.productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    }
    else {
      this.cart.push({ product, quantity, price: product.price });
    }
    this.cartSubject.next(this.cart);
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter(item => item.product.productId !== productId);
    this.cartSubject.next(this.cart);
  }

  getCartItems(): OrderItem[] {
    return [...this.cart];
  }

  clearCart(): void {
    this.cart = [];
    this.cartSubject.next(this.cart);
  }

  get cart$(): BehaviorSubject<OrderItem[]> {
    return this.cartSubject;
  }
}