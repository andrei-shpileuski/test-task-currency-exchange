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
import { MatAnchor } from '@angular/material/button';
import { ISolutionResponse } from '@domain/entities/interfaces/solution.interface';
import { solutionStore } from '@domain/data-access/state/solution.store';

@Component({
  selector: 'app-solution-page',
  imports: [TranslatePipe, PageHeaderComponent, MatAnchor],
  templateUrl: './solution-page.component.html',
  styleUrl: './solution-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionPageComponent {
  public task: Signal<ITask | null> = inject(taskStore).data;
  public solution: Signal<ISolutionResponse | null> =
    inject(solutionStore).data;
}
