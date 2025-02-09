import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diffDate',
})
export class DiffDatePipe implements PipeTransform {
  public transform(date1: Date, date2: Date): number {
    if (!date1 || !date2) return 0;

    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const diffTime = d1.getTime() - d2.getTime();
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
  }
}
