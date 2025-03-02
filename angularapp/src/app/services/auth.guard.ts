import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private userStoreService: UserStoreService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    const isLoggedIn = this.userStoreService.isLoggedIn();
    const userRole = this.userStoreService.getRole();

    console.log('AuthGuard - IsLoggedIn:', isLoggedIn);
    console.log('AuthGuard - UserRole:', userRole);

    if (isLoggedIn) {
      if (next.data.roles && next.data.roles.indexOf(userRole) === -1) {
        console.log('AuthGuard - Role Not Allowed, Redirecting to Error');
        this.router.navigate(['/error']);
        return false;
      }
      console.log('AuthGuard - Access Granted');
      return true;
    }

    console.log('AuthGuard - Not Logged In, Redirecting to Home Page');
    this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
