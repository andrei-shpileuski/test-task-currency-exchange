import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AddDurationDatePipe } from '@shared/pipes/date/add-duration-date.pipe';
import { DatePipe } from '@angular/common';
import { DiffDatePipe } from '@shared/pipes/date/diff-date.pipe';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslatePluralPipe } from 'ngs-plural';
import { ITask } from '@domain/entities/interfaces/task.interface';
import { ISolutionResponse } from '@domain/entities/interfaces/solution.interface';

@Component({
  selector: 'app-deadlines',
  imports: [
    AddDurationDatePipe,
    DatePipe,
    DiffDatePipe,
    TranslatePipe,
    TranslatePluralPipe,
  ],
  templateUrl: './deadlines.component.html',
  styleUrl: './deadlines.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeadlinesComponent {
  public task = input<ITask | null>(null);
  public solution = input<ISolutionResponse | null>(null);
}
