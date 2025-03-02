import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Product } from 'src/app/models/product.model';
import { Order } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
import { UserStoreService } from 'src/app/services/user-store.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: { product: Product, quantity: number }[] = [];
  totalAmount: number = 0;
  shippingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private userStoreService:UserStoreService,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalAmount = this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

    this.shippingForm = this.fb.group({
      shippingAddress: ['', Validators.required],
      billingAddress: ['', Validators.required]
    });
  }

  placeOrder(): void {
    if (this.shippingForm.invalid) {
      return;
    }

    const user: User = this.userStoreService.getUser();
    const order: Order = {
      orderDate: new Date().toISOString(),
      orderStatus: 'Pending',
      shippingAddress: this.shippingForm.get('shippingAddress').value,
      billingAddress: this.shippingForm.get('billingAddress').value,
      totalAmount: this.totalAmount,
      user: user,
      orderItems: this.cartItems.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.product.price
      }))
    };

    this.orderService.placeOrder(order).subscribe(response => {
      this.toastr.success(response,'Success');  // Display the plain text response
      this.cartService.clearCart();
      this.router.navigate(['/userviewproduct']);
    }, error => {
      console.error('Error placing order:', error);
      this.toastr.error('Failed to place order. Please try again.','Error');
    });
  }
}
