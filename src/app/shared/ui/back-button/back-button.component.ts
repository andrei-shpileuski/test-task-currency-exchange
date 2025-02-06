import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { from, take } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  imports: [MatIconButton, MatIcon],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackButtonComponent {
  private readonly _location = inject(Location);
  private readonly _router = inject(Router);

  public link = input<string | null>(null);

  public back(): void {
    if (window.history.length > 1) {
      this._location.back();
    } else {
      from(this._router.navigate([this.link() || '/']))
        .pipe(take(1))
        .subscribe();
    }
  }
}
