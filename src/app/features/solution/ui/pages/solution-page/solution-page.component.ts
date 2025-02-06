import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ITask } from '@app/environment/entities/interfaces/task.interface';
import { PageHeaderComponent } from '@app/shared/ui/page-header/page-header.component';
import { taskStore } from '@app/environment/data-access/state/task.store';

@Component({
  selector: 'app-solution-page',
  imports: [TranslatePipe, PageHeaderComponent],
  templateUrl: './solution-page.component.html',
  styleUrl: './solution-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionPageComponent {
  public task: Signal<ITask | null> = inject(taskStore).data;
}
