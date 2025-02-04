import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { BackButtonComponent } from '@app/ui-kit/back-button/back-button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ITestTaskDescription } from '@app/features/task/entities/interfaces/test-task-description.interface';
import { TestTaskDescriptionStateService } from '@app/features/task/data-access/services/state/test-task-description-state.service';

@Component({
  selector: 'app-solution-page',
  imports: [BackButtonComponent, TranslatePipe],
  templateUrl: './solution-page.component.html',
  styleUrl: './solution-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionPageComponent {
  private readonly _testTaskDescriptionStateService = inject(
    TestTaskDescriptionStateService,
  );

  public testTaskDescription: Signal<ITestTaskDescription | null> =
    this._testTaskDescriptionStateService.value;
}
