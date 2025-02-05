import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { BackButtonComponent } from '@app/ui-kit/back-button/back-button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ITestTaskDescription } from '@core/entities/interfaces/test-task-description.interface';
import { projectInfoStore } from '@core/data-access/state/project-info.store';
import { MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-page',
  imports: [BackButtonComponent, TranslatePipe, MatAnchor, RouterLink],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskPageComponent {
  public testTaskDescription: Signal<ITestTaskDescription | null> =
    inject(projectInfoStore).testTask;
}
