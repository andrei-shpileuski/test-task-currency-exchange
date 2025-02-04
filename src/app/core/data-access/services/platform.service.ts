import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PlatformStateService } from '@core/data-access/services/state/platform-state.service';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _platformStateService = inject(PlatformStateService);

  public definePlatform(): void {
    const isBrowser = isPlatformBrowser(this._platformId);

    this._platformStateService.setValue(isBrowser ? 'browser' : 'server');
  }
}
