import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthUser } from '../models/AuthUser.model';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  USER_KEY = 'AUTHORIZED_USER';

  private userRoleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(this.getRole());

  constructor() { }

  clear(): void {
    window.localStorage.clear();
    this.userRoleSubject.next(null);
  }

  public saveUser(authUser: AuthUser): void {
    window.localStorage.removeItem(this.USER_KEY);
    window.localStorage.setItem(this.USER_KEY, JSON.stringify(authUser));
    this.userRoleSubject.next(authUser.role);
  }

  public getUser(): any {
    const authUser = window.localStorage.getItem(this.USER_KEY);
    if (authUser) {
      return JSON.parse(authUser);
    }
    return {};
  }

  public getRole(): any {
    const authUser = window.localStorage.getItem(this.USER_KEY);
    if (authUser) {
      return JSON.parse(authUser).role;
    }
    return null;
  }

  public getUserId(): any {
    const authUser = window.localStorage.getItem(this.USER_KEY);
    if (authUser) {
      return JSON.parse(authUser).userId;
    }
    return null;
  }

  public isLoggedIn(): boolean {
    const authUser = window.localStorage.getItem(this.USER_KEY);
    return !!authUser;
  }

  public getJwtToken(): string {
    const authUser: AuthUser = JSON.parse(window.localStorage.getItem(this.USER_KEY));
    if (authUser) {
      return authUser.token;
    }
    return null;
  }

  get userRole$(): Observable<string | null> {
    return this.userRoleSubject.asObservable();
  }
}
