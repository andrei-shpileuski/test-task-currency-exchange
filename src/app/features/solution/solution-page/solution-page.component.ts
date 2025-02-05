import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { BackButtonComponent } from '@app/ui-kit/back-button/back-button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { testTaskDescriptionStore } from '@core/data-access/state/environment/test-task-description.store';
import { ITestTaskDescription } from '@core/entities/interfaces/test-task-description.interface';

@Component({
  selector: 'app-solution-page',
  imports: [BackButtonComponent, TranslatePipe],
  templateUrl: './solution-page.component.html',
  styleUrl: './solution-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionPageComponent {
  public testTaskDescription: Signal<ITestTaskDescription | null> = inject(
    testTaskDescriptionStore,
  ).data;
}
