import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | Date, format: string = 'shortDate'): string {
    if (!value) {
      return '';
    }

    const date = new Date(value);

    // Basic formatting based on provided format
    switch (format) {
      case 'shortDate':
        return date.toLocaleDateString(); // Format as MM/DD/YYYY
      case 'longDate':
        return date.toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }); // Format as Friday, August 30, 2024
      case 'fullDate':
        return (
          date.toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }) +
          ' ' +
          date.toLocaleTimeString()
        ); // Add time
      default:
        return date.toString();
    }
  }
}
