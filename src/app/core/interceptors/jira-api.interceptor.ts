import { Injectable, NgZone } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { parse } from 'url';
import { basePath } from '@core/common-configuration/global';

@Injectable({
  providedIn: 'root'
})
export class JiraApiInterceptor implements HttpInterceptor {
  constructor(private zone: NgZone) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes(basePath)) {
      // tslint:disable-next-line: no-string-literal
      const request = window['AP'].request;
      const url = parse(req.url);
      const options = {
        // url: url.path
        url: req.urlWithParams,
        type: req.method,
        data: JSON.stringify(req.body),
        contentType: req.detectContentTypeHeader(),
        headers: req.headers,
        error: function (e) {
          console.error(e);
        }
      };
      return from(request(options)).pipe(
        // ToDo: поправить JSON.parse
        take(1),
        map((e: any) => new HttpResponse({
          body: JSON.parse(e.body) as any,
          headers: e.xhr.getAllResponseHeaders(),
          status: e.xhr.status,
          statusText: e.xhr.statusText
        })),
        this.zoneAware(this.zone)
      );
    } else {
      return next.handle(req);
    }
  }

  private zoneAware(zone: NgZone) {
    return <T>(source: Observable<T>) =>
      new Observable<T>(observer => {
        return source.subscribe({
          next(x) {
            zone.run(() => observer.next(x));
          },
          error(err) { observer.error(err); },
          complete() { observer.complete(); }
        });
      });
  }
}
