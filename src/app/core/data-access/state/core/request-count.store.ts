import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed } from '@angular/core';

interface State {
  count: number;
}

const initialState: State = {
  count: 0,
};

export const requestCountStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
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
