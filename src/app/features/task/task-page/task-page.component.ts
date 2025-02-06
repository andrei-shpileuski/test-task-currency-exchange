import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ITestTaskDescription } from '@core/entities/interfaces/test-task-description.interface';
import { projectInfoStore } from '@core/data-access/state/project-info.store';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { from, take } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-page',
  imports: [TranslatePipe, MatAnchor, RouterLink, MatIconButton, MatIcon],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskPageComponent {
  public testTaskDescription: Signal<ITestTaskDescription | null> =
    inject(projectInfoStore).testTask;

  private readonly _location = inject(Location);
  private readonly _router = inject(Router);

  public back(): void {
    if (window.history.length > 1) {
      this._location.back();
    } else {
      from(this._router.navigate(['/']))
        .pipe(take(1))
        .subscribe();
    }
  }
}
