import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@core/data-access/tokens/api-url.token';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = inject(API_URL);

  public get<T>(
    url: string,
    params: HttpParams = new HttpParams(),
  ): Observable<T> {
    return this._http.get<T>(`${this._apiUrl}${url}`, {
      headers: this.headers,
      params,
      withCredentials: true,
    });
  }

  public post<T, D>(url: string, data?: D): Observable<T> {
    return this._http.post<T>(`${this._apiUrl}${url}`, JSON.stringify(data), {
      headers: this.headers,
      withCredentials: true,
    });
  }

  public put<T, D>(url: string, data: D): Observable<T> {
    return this._http.put<T>(`${this._apiUrl}${url}`, JSON.stringify(data), {
      headers: this.headers,
      withCredentials: true,
    });
  }

  public delete<T>(url: string): Observable<T> {
    return this._http.delete<T>(`${this._apiUrl}${url}`, {
      headers: this.headers,
      withCredentials: true,
    });
  }

  public get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return new HttpHeaders(headersConfig);
  }
}
