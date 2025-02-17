import { inject, Injectable } from '@angular/core';
import { platformStore } from '@core/data-access/state/platform.store';

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  private readonly isPlatformBrowser = inject(platformStore).isBrowser;

  public getWindow(): Window | null {
    return this.isPlatformBrowser() ? window : null;
  }
}
