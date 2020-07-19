import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface CacheEntry {
  url: string;
  response: HttpResponse<any>
  entryTime: number;
}

export const MAX_CACHE_AGE = 1000 * 60 * 10; // 10 minutes cache

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cacheMap = new Map<string, CacheEntry>();

  get(req: HttpRequest<any>): HttpResponse<any> | null {
    const entry = this.cacheMap.get(req.urlWithParams);

    if (!entry) {
      return null;
    }

    const isExpired = (Date.now() - entry.entryTime) > MAX_CACHE_AGE;

    if (isExpired) {
      this.cacheMap.delete(req.urlWithParams);

      return null;
    }

    return entry.response;
  }

  put(req: HttpRequest<any>, res: HttpResponse<any>): void {
    const entry: CacheEntry = { url: req.urlWithParams, response: res, entryTime: Date.now() };

    this.cacheMap.set(req.urlWithParams, entry);
  }
}
