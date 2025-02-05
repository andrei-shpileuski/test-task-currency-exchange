import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed } from '@angular/core';

export const requestCountStore = signalStore(
  { providedIn: 'root' },
  withState<{ count: number }>({ count: 0 }),
  withComputed(({ count }) => ({
    loading: computed(() => count() > 0),
  })),
  withMethods(({ count, ...store }) => ({
    increase(): void {
      patchState(store, { count: count() + 1 });
    },
    decrease(): void {
      patchState(store, { count: count() - 1 });
    },
  })),
);
