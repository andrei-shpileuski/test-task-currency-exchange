import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface State {
  platform: 'server' | 'browser' | null;
}

const initialState: State = {
  platform: null,
};

export const platformStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ platform }) => ({
    isBrowser: computed(() => platform() === 'browser'),
    isServer: computed(() => platform() === 'server'),
  })),
  withMethods((store, _platformId = inject(PLATFORM_ID)) => ({
    init(): void {
      const isBrowser = isPlatformBrowser(_platformId);
      const platform = isBrowser ? 'browser' : 'server';

      patchState(store, { platform: platform });
    },
  })),
);
