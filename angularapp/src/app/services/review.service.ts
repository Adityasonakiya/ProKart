import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../models/review.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
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

  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}/api/reviews`, review, { headers: this.getAuthHeaders(), responseType: 'text' as 'json' });
  }

  getReviewById(reviewId: number): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/api/reviews/${reviewId}`, { headers: this.getAuthHeaders() });
  }

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/api/reviews`, { headers: this.getAuthHeaders() });
  }

  getReviewsByUserId(userId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/api/reviews/user/${userId}`, { headers: this.getAuthHeaders() });
  }

  getReviewsByProductId(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/api/reviews/product/${productId}`, { headers: this.getAuthHeaders() });
  }

  deleteReview(reviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/reviews/${reviewId}`, { headers: this.getAuthHeaders() });
  }
}
