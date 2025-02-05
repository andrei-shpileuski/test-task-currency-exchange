import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { ButtonComponent } from '@app/ui-kit/button/button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { IVacancyInfo } from '@core/entities/interfaces/vacancy-info.interface';
import { ITestTaskDescription } from '@core/entities/interfaces/test-task-description.interface';
import { testTaskDescriptionStore } from '@core/data-access/state/environment/test-task-description.store';
import { vacancyInfoStore } from '@core/data-access/state/environment/vacancy-info.store';

@Component({
  selector: 'app-task-page',
  imports: [ButtonComponent, TranslatePipe],
  templateUrl: './intro-page.component.html',
  styleUrl: './intro-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroPageComponent {
  public testTaskDescription: Signal<ITestTaskDescription | null> = inject(
    testTaskDescriptionStore,
  ).data;
  public vacancyInfo: Signal<IVacancyInfo | null> =
    inject(vacancyInfoStore).data;
}
