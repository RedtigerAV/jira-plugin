import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CacheService } from '@core/interceptors/cache/cache.service';
import { tap } from 'rxjs/operators';

const ENDPOINTS_WITHOUT_CACHING: RegExp[] = [
  /\/properties/,
  /\/property/
];

@Injectable({
  providedIn: 'root'
})
export class CacheInterceptor implements HttpInterceptor {
  constructor(private cache: CacheService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRequestCachable(req)) {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req);

    if (cachedResponse !== null) {
      return of(cachedResponse);
    }

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.put(req, event);
        }
      })
    );
  }
  private isRequestCachable(req: HttpRequest<any>) {
    return req.method === 'GET' && ENDPOINTS_WITHOUT_CACHING.every(endpoint => !endpoint.test(req.url));
  }
}
