import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { ButtonComponent } from '@app/ui-kit/button/button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { VacancyInfoStateService } from '@app/features/task/data-access/services/state/vacancy-info-state.service';
import { TestTaskDescriptionStateService } from '@app/features/task/data-access/services/state/test-task-description-state.service';
import { IVacancyInfo } from '@app/features/task/entities/interfaces/vacancy-info.interface';
import { ITestTaskDescription } from '@app/features/task/entities/interfaces/test-task-description.interface';

@Component({
  selector: 'app-task-page',
  imports: [ButtonComponent, TranslatePipe],
  templateUrl: './intro-page.component.html',
  styleUrl: './intro-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroPageComponent {
  private readonly _vacancyInfoStateService = inject(VacancyInfoStateService);
  private readonly _testTaskDescriptionStateService = inject(
    TestTaskDescriptionStateService,
  );

  public vacancyInfo: Signal<IVacancyInfo | null> =
    this._vacancyInfoStateService.value;
  public testTaskDescription: Signal<ITestTaskDescription | null> =
    this._testTaskDescriptionStateService.value;
}
