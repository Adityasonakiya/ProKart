import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public apiUrl = environment.BACKEND_URL;
  constructor(private http: HttpClient) { }
  
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/api/products`, { headers: this.getAuthHeaders() });
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/api/products/${productId}`, { headers: this.getAuthHeaders() });
  }


  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/api/products`, product, { headers: this.getAuthHeaders() });
  }

  updateProduct(productId: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/api/products/${productId}`, product, { headers: this.getAuthHeaders() });
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/products/${productId}`, { headers: this.getAuthHeaders() });
  }
}
