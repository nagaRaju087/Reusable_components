import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("this is the API call");
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: 'Bearer YourAccessTokenHere'
      }
    });
    return next.handle(modifiedRequest);
  }
}
