import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const updatedRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('api_token')}`
            }
        })
        return next.handle(updatedRequest);
    }

}