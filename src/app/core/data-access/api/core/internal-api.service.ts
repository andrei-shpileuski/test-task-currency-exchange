import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/data-access/api/core/api.service';

@Injectable({
  providedIn: 'root',
})
export class InternalApiService {
  private readonly _api = inject(ApiService);

  public getInternalJsonData<T>(fileName: string): Observable<T> {
    return this._api.get(`/data/${fileName}.json`) as Observable<T>;
  }
}
