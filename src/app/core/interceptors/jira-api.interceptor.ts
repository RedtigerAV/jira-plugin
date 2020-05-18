import { Injectable, NgZone } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { parse } from 'url';

@Injectable({
  providedIn: 'root'
})
export class JiraApiInterceptor implements HttpInterceptor {
  constructor(private zone: NgZone) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('https://timgo.atlassian.net')) {
      // tslint:disable-next-line: no-string-literal
      const request = window['AP'].request;
      const url = parse(req.url);
      const options = {
        // url: url.path
        url: req.urlWithParams,
        type: req.method,
        data: JSON.stringify(req.body),
        contentType: req.detectContentTypeHeader(),
        headers: req.headers
      };
      return from(request(options)).pipe(
        // ToDo: поправить JSON.parse
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
