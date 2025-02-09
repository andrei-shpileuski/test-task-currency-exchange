import { inject, Injectable } from '@angular/core';
import { InternalApiService } from '@core/data-access/api/internal-api.service';
import { ISolutionResponse } from '@domain/entities/interfaces/solution.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SolutionApiService {
  private readonly _internalApi = inject(InternalApiService);

  public getSolutionInfo(): Observable<ISolutionResponse> {
    return this._getSolution();
  }

  private _getSolution(): Observable<ISolutionResponse> {
    return this._internalApi.getInternalJsonData('solution');
  }
}
