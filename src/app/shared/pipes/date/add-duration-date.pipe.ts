import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addDurationDate',
})
export class AddDurationDatePipe implements PipeTransform {
  public transform(date: Date, days: number): string {
    if (!date || isNaN(days)) return '';

    const parsedDate = new Date(date);
    parsedDate.setDate(parsedDate.getDate() + days);

    return parsedDate.toISOString();
  }
}
