import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {
  orders: Order[] = [];
  showItemsModal: boolean = false;
  showCancelModal: boolean = false;
  showTrackModal: boolean = false;
  selectedOrderItems: any[] = [];
  selectedOrder: Order;
  orderStatuses: string[] = ['Pending', 'Order-Placed', 'Dispatched', 'Out for Delivery', 'Delivered'];

  constructor(private orderService: OrderService, private toastr:ToastrService, private authService: AuthService, private userStoreService: UserStoreService) { }

  ngOnInit(): void {
    const userId = this.userStoreService.getUserId();
    this.loadOrders(userId);
  }

  loadOrders(userId: number): void {
    this.orderService.getOrdersByUserId(userId).subscribe((orders: Order[]) => { this.orders = orders; });
  }

  trackOrder(order: Order): void {
    this.selectedOrder = order;
    this.showTrackModal = true;
  }

  viewItems(order: Order): void {
    this.selectedOrderItems = order.orderItems;
    this.toggleItemsModal();
  }

  confirmCancelOrder(order: Order): void {
    this.selectedOrder = order;
    this.toggleCancelModal();
  }

  cancelOrder(order: Order): void {
    this.orderService.deleteOrder(order.orderId).subscribe(() => {
      this.toastr.success('Order Cancelled Successfully!', 'Success');
      this.toggleCancelModal();
      this.loadOrders(order.user.userId);
    });
    this.toggleCancelModal();
    this.loadOrders(order.user.userId);
  }

  toggleItemsModal(): void {
    this.showItemsModal = !this.showItemsModal;
  }

  toggleCancelModal(): void {
    this.showCancelModal = !this.showCancelModal;
  }

  closeTrackModal(): void {
    this.showTrackModal = false;
  }
}
