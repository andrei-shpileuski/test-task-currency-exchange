import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { BackButtonComponent } from '@app/ui-kit/back-button/back-button.component';
import { ButtonComponent } from '@app/ui-kit/button/button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ITestTaskDescription } from '@core/entities/interfaces/test-task-description.interface';
import { testTaskDescriptionStore } from '@core/data-access/state/environment/test-task-description.store';

@Component({
  selector: 'app-task-page',
  imports: [BackButtonComponent, ButtonComponent, TranslatePipe],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskPageComponent {
  public testTaskDescription: Signal<ITestTaskDescription | null> = inject(
    testTaskDescriptionStore,
  ).data;
}
