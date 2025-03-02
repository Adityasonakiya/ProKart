import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orderplaced',
  templateUrl: './orderplaced.component.html',
  styleUrls: ['./orderplaced.component.css']
})
export class OrderplacedComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  searchText: string = '';
  sortOrder: string = 'ascending';

  showItemsModal: boolean = false;
  showProfileModal: boolean = false;
  selectedOrderItems: any[] = [];
  selectedUser: User;

  constructor(private orderService: OrderService, private toastr:ToastrService) { }
  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe((orders: Order[]) => {
      this.orders = orders;
      this.filteredOrders = orders;
    });
  }

  filterOrders(): void {
    this.filteredOrders = this.orders.filter(order => order.orderId.toString().includes(this.searchText)
      || order.orderDate.includes(this.searchText)
      || order.totalAmount.toString().includes(this.searchText)
      || order.orderStatus.toLowerCase().includes(this.searchText.toLowerCase())
      || order.shippingAddress.toLowerCase().includes(this.searchText.toLowerCase())
      || order.billingAddress.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  sortOrders(): void {
    this.filteredOrders.sort((a, b) => {
      const dateA = new Date(a.orderDate).getTime();
      const dateB = new Date(b.orderDate).getTime();
      return this.sortOrder === 'ascending' ? dateA - dateB : dateB - dateA;
    });
  }

  updateOrderStatus(order: Order): void {
    this.orderService.updateOrder(order.orderId, order).subscribe(() => {
      this.toastr.success('Order status updated successfully!', 'Success');
    }, error => {
      console.error('Error updating order status:', error);
      alert('Failed to update order status. Please try again.');
    });
  }


  viewItems(order: Order): void {
    this.selectedOrderItems = order.orderItems;
    this.toggleItemsModal();
  }

  viewProfile(user: User): void {
    this.selectedUser = user;
    this.toggleProfileModal();
  }

  toggleItemsModal(): void {
    this.showItemsModal = !this.showItemsModal;
  }

  toggleProfileModal(): void {
    this.showProfileModal = !this.showProfileModal;
  }

}
