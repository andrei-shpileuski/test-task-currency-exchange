import { inject, Injectable } from '@angular/core';
import { platformStore } from '@core/data-access/state/platform.store';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private readonly isPlatformBrowser = inject(platformStore).isBrowser;
  private readonly document = inject(DOCUMENT);

  public getDocument(): Document | null {
    return this.isPlatformBrowser() ? this.document : null;
  }
}
