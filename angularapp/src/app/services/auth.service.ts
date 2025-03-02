import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl = environment.BACKEND_URL;
  private token: string | null = localStorage.getItem('token');

  private userRoleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(localStorage.getItem('userRole'));
  private userIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(localStorage.getItem('userId'));

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/register`, user);
  }

  login(login: Login): Observable<any> {
    return this.http.post<{ token: string, role: string, userId: string }>(`${this.apiUrl}/api/login`, login).pipe(
      tap(response => {
        this.token = response.token;
        localStorage.setItem('token', response.token);
        localStorage.setItem('userRole', response.role);
        localStorage.setItem('userId', response.userId);
        this.userRoleSubject.next(response.role);
        this.userIdSubject.next(response.userId);
      })
    );
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    this.userRoleSubject.next(null);
    this.userIdSubject.next(null);
  }

  get userRole$(): Observable<string | null> {
    return this.userRoleSubject.asObservable();
  }

  get userId$(): Observable<string | null> {
    return this.userIdSubject.asObservable();
  }

  private getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    return headers;
  }
}
