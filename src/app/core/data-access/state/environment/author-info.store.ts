import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { IAuthorInfo } from '@core/entities/interfaces/author-info.interface';
import { AuthorInfoApiService } from '@core/data-access/api/environment/author-info-api.service';
import { take } from 'rxjs';

interface State {
  data: IAuthorInfo | null;
}

const initialState: State = {
  data: null,
};

export const authorInfoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, api = inject(AuthorInfoApiService)) => ({
    define(): void {
      api
        .getAuthorInfo()
        .pipe(take(1))
        .subscribe((authorInfo) => patchState(store, { data: authorInfo }));
    },
  })),
);
