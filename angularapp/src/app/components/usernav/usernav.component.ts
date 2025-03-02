import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {
  showLogoutModalFlag: boolean = false;
  showCartModalFlag: boolean = false;
  cartItems: { product: Product, quantity: number }[] = [];
  cartQuantity: number = 0;


  constructor(private router: Router, private cartService: CartService, private userStoreService:UserStoreService) { }
  
  ngOnInit(): void {
    this.updateCart();
  }

  toggleCartModal(): void {
    this.showCartModalFlag = !this.showCartModalFlag;
    this.updateCart();
  }

  updateCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.cartQuantity = this.cartItems.reduce(
      (total, item) => total + item.quantity, 0);
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.updateCart();
    this.toggleCartModal();
  }


  showLogoutModal(): void {
    this.showLogoutModalFlag = true;
  }

  logout(): void {
    this.userStoreService.clear();
    this.router.navigate(['/home']);
    this.showLogoutModalFlag = false;
  }

  cancelLogout(): void {
    this.showLogoutModalFlag = false;
  }
}
