import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ITask } from '@app/domain/entities/interfaces/task.interface';
import { MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '@app/shared/ui/page-header/page-header.component';
import { taskStore } from '@app/domain/data-access/state/task.store';

@Component({
  selector: 'app-task-page',
  imports: [TranslatePipe, MatAnchor, RouterLink, PageHeaderComponent],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskPageComponent {
  public task: Signal<ITask | null> = inject(taskStore).data;
}
