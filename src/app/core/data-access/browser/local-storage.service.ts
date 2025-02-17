import { inject, Injectable } from '@angular/core';
import { platformStore } from '@core/data-access/state/platform.store';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly isPlatformBrowser = inject(platformStore).isBrowser;

  public setItem(key: string, value: string): void {
    if (this.isPlatformBrowser()) localStorage.setItem(key, value);
  }

  public getItem(key: string): string | null {
    return this.isPlatformBrowser() ? localStorage.getItem(key) : null;
  }

  public removeItem(key: string): void {
    if (this.isPlatformBrowser()) localStorage.removeItem(key);
  }
}
