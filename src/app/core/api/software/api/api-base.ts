import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '@core/api/software/encoder';

export class ApiBase {
  protected readonly basePath = 'https://timgo.atlassian.net';
  protected readonly defaultHeaders = new HttpHeaders();
  protected readonly defaultParams = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
}
