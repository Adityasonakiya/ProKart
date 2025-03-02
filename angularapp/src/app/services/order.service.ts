import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public apiUrl = environment.BACKEND_URL;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json' 
    });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  placeOrder(order: Order): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/orders`, order, { headers: this.getAuthHeaders(), responseType: 'text' as 'json' });
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/api/orders/${orderId}`, { headers: this.getAuthHeaders() });
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/api/orders`, { headers: this.getAuthHeaders() });
  }

  getOrdersByUserId(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/api/orders/user/${userId}`, { headers: this.getAuthHeaders() });
  }

  updateOrder(orderId: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/api/orders/${orderId}`, order, { headers: this.getAuthHeaders() });
  }

  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/orders/${orderId}`, { headers: this.getAuthHeaders(),responseType: 'text' as 'json' });
  }
}
