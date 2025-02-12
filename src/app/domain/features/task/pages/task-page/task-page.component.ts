import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ITask } from '@domain/entities/interfaces/task.interface';
import { MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '@shared/ui/page-header/page-header.component';
import { taskStore } from '@domain/data-access/state/task.store';
import { ISolutionResponse } from '@domain/entities/interfaces/solution.interface';
import { solutionStore } from '@domain/data-access/state/solution.store';

@Component({
  selector: 'app-task-page',
  imports: [TranslatePipe, MatAnchor, RouterLink, PageHeaderComponent],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskPageComponent {
  public task: Signal<ITask | null> = inject(taskStore).data;
  public solution: Signal<ISolutionResponse | null> =
    inject(solutionStore).data;
}
