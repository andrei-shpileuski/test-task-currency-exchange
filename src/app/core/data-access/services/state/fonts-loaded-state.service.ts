import { Injectable } from '@angular/core';
import { BaseStateService } from '@core/data-access/services/state/base-state.service';

@Injectable({
  providedIn: 'root',
})
export class FontsLoadedStateService extends BaseStateService<boolean> {}
