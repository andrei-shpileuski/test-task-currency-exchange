import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { IVacancyInfo } from '@core/entities/interfaces/vacancy-info.interface';
import { ITestTaskDescription } from '@core/entities/interfaces/test-task-description.interface';
import { projectInfoStore } from '@core/data-access/state/project-info.store';
import { MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-page',
  imports: [TranslatePipe, MatAnchor, RouterLink],
  templateUrl: './intro-page.component.html',
  styleUrl: './intro-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroPageComponent {
  public testTaskDescription: Signal<ITestTaskDescription | null> =
    inject(projectInfoStore).testTask;
  public vacancyInfo: Signal<IVacancyInfo | null> =
    inject(projectInfoStore).vacancy;
}
