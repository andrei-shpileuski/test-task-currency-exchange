import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { take } from 'rxjs';
import { IMetadata } from '@app/domain/entities/interfaces/metadata.interface';
import { MetadataApiService } from '../api/metadata-api.service';
import { MetadataManagerService } from '../managers/metadata-manager.service';

export const metadataStore = signalStore(
  { providedIn: 'root' },
  withState<{ metadata: IMetadata | null }>({ metadata: null }),
  withMethods(
    (
      store,
      _metadataApiService = inject(MetadataApiService),
      _metadataService = inject(MetadataManagerService),
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
