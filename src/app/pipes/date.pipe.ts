import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string): string {
    const timestamp = Date.parse(value);

    if (!this.isValidDate(value)) {
      return value;
    } else {
      const date = new Date(value);
      const hours = this.padZero(date.getHours());
      const minutes = this.padZero(date.getMinutes());
      const seconds = this.padZero(date.getSeconds());
      const month = this.getMonthName(date.getMonth());
      const day = this.padZero(date.getDate());
      const year = date.getFullYear();

      return `${hours}:${minutes}:${seconds} ${month} ${day} ${year}`;
    }
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  private getMonthName(month: number): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month];
  }

  isValidDate(value: string) {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }
}
