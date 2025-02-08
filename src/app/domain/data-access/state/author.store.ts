import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { take } from 'rxjs';
import { IAuthor } from '@domain/entities/interfaces/author.interface';
import { AuthorApiService } from '@domain/data-access/api/author-api.service';

export const authorStore = signalStore(
  { providedIn: 'root' },
  withState<{ data: IAuthor | null }>({ data: null }),
  withMethods((store, authorApiService = inject(AuthorApiService)) => ({
    defineData(): void {
      authorApiService
        .getAuthor()
        .pipe(take(1))
        .subscribe((author: IAuthor) => patchState(store, { data: author }));
    },
  })),
);
