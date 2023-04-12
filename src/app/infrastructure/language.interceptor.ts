import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { lang } from 'moment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LanguageInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {    
      const lang =localStorage.getItem('lang')||"en";
    const request = req.clone({
      setHeaders: { "Accept-Language": lang }
    });
    console.log(
      `Request header value : ${request.headers.get("Accept-Language")}`
    );

    return next.handle(request);
  }
}
