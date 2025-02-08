import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PageHeaderComponent } from '@shared/ui/page-header/page-header.component';
import { ITask } from '@domain/entities/interfaces/task.interface';
import { taskStore } from '@domain/data-access/state/task.store';

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
