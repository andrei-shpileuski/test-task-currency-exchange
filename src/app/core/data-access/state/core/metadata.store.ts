import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { take } from 'rxjs';
import { IMetadata } from '@core/entities/interfaces/metadata.interface';
import { MetadataApiService } from '@core/data-access/api/core/metadata-api.service';
import { MetadataService } from '@core/data-access/services/metadata.service';

interface State {
  metadata: IMetadata | null;
}

const initialState: State = {
  metadata: null,
};

export const metadataStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      _metadataApiService = inject(MetadataApiService),
      _metadataService = inject(MetadataService),
    ) => ({
      init(): void {
        _metadataApiService
          .getMetadata()
          .pipe(take(1))
          .subscribe((metadata) => {
            _metadataService.applyMetadata(metadata);
            patchState(store, { metadata: metadata });
          });
      },
    }),
  ),
);
