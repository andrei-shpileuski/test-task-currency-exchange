import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { IVacancy } from '@domain/entities/interfaces/vacancy.interface';
import { ITask } from '@domain/entities/interfaces/task.interface';
import { MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { taskStore } from '@domain/data-access/state/task.store';
import { vacancyStore } from '@domain/data-access/state/vacancy.store';
import { solutionStore } from '@domain/data-access/state/solution.store';
import { ISolutionResponse } from '@domain/entities/interfaces/solution.interface';
import { DatePipe } from '@angular/common';
import { TranslatePluralPipe } from 'ngs-plural';
import { AddDurationDatePipe } from '@shared/pipes/date/add-duration-date.pipe';
import { DiffDatePipe } from '@shared/pipes/date/diff-date.pipe';

@Component({
  selector: 'app-welcome-page',
  imports: [
    TranslatePipe,
    MatAnchor,
    RouterLink,
    DatePipe,
    TranslatePluralPipe,
    AddDurationDatePipe,
    DiffDatePipe,
  ],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomePageComponent {
  public task: Signal<ITask | null> = inject(taskStore).data;
  public vacancy: Signal<IVacancy | null> = inject(vacancyStore).data;
  public solution: Signal<ISolutionResponse | null> =
    inject(solutionStore).data;
}
