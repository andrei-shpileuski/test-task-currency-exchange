import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { BackButtonComponent } from '@app/ui-kit/back-button/back-button.component';
import { ButtonComponent } from '@app/ui-kit/button/button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { TestTaskDescriptionStateService } from '@app/features/task/data-access/services/state/test-task-description-state.service';
import { ITestTaskDescription } from '@app/features/task/entities/interfaces/test-task-description.interface';

@Component({
  selector: 'app-task-page',
  imports: [BackButtonComponent, ButtonComponent, TranslatePipe],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskPageComponent {
  private readonly _testTaskDescriptionStateService = inject(
    TestTaskDescriptionStateService,
  );

  public testTaskDescription: Signal<ITestTaskDescription | null> =
    this._testTaskDescriptionStateService.value;
}
