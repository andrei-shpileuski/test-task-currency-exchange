import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { take } from 'rxjs';
import { SolutionApiService } from '@domain/data-access/api/solution-api.service';
import { ISolutionResponse } from '@domain/entities/interfaces/solution.interface';

export const solutionStore = signalStore(
  { providedIn: 'root' },
  withState<{ data: ISolutionResponse | null }>({ data: null }),
  withMethods((store, solutionApiService = inject(SolutionApiService)) => ({
    defineData(): void {
      solutionApiService
        .getSolutionInfo()
        .pipe(take(1))
        .subscribe((solution: ISolutionResponse) =>
          patchState(store, { data: solution }),
        );
    },
  })),
);
