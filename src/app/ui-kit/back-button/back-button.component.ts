import { Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { filter, from, take } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { platformStore } from '@core/data-access/state/core/platform.store';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
  standalone: true,
  imports: [NgOptimizedImage],
})
export class BackButtonComponent {
  public link = input<string>();
  public hasPreviousPath = false;

  private readonly _location = inject(Location);
  private readonly _router = inject(Router);

  private readonly _isBrowser$ = toObservable(inject(platformStore).isBrowser);

  public constructor() {
    this._isBrowser$.pipe(filter(Boolean), take(1)).subscribe(() => {
      this.hasPreviousPath = window.history.length > 1;
    });
  }

  public back(): void {
    if (this.hasPreviousPath) {
      this._location.back();
    } else {
      from(this._router.navigate([this.link() || '/']))
        .pipe(take(1))
        .subscribe();
    }
  }
}
