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

@Component({
  selector: 'app-solution-page',
  imports: [BackButtonComponent, TranslatePipe],
  templateUrl: './solution-page.component.html',
  styleUrl: './solution-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionPageComponent {
  public testTaskDescription: Signal<ITestTaskDescription | null> =
    inject(projectInfoStore).testTask;
}
