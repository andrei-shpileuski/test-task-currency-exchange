import { Injectable } from '@angular/core';
import { BaseStateService } from '@core/data-access/services/state/base-state.service';
import { IMetadata } from '@core/entities/interfaces/metadata.interface';

@Injectable({
  providedIn: 'root',
})
export class MetadataStateService extends BaseStateService<IMetadata> {}
