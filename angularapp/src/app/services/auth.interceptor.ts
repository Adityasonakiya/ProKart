import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStoreService } from './user-store.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: UserStoreService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.store?.isLoggedIn()) {
      const token = this.store?.getJwtToken();
      console.log('JWT Token:', token);
      console.log('Request URL:', request.url);

      // Clone request to attach JWT token
      const clonedRequest = request.clone({
        setHeaders: {
          "Authorization": `Bearer ${token}`
        }
      });

      // If the request is for Cloudinary, use the cloned request without additional headers
      if (request.url.includes('https://api.cloudinary.com/v1_1/dhxeijcdi/image/upload')) {
        return next.handle(request);
      }

      return next.handle(clonedRequest);
    }

    return next.handle(request);
  }
}
