import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ITestTaskDescription } from '@core/entities/interfaces/test-task-description.interface';
import { projectInfoStore } from '@core/data-access/state/project-info.store';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { from, take } from 'rxjs';

@Component({
  selector: 'app-solution-page',
  imports: [TranslatePipe, MatIcon, MatIconButton],
  templateUrl: './solution-page.component.html',
  styleUrl: './solution-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionPageComponent {
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
