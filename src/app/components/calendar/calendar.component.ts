import {Component, OnInit} from '@angular/core';
import {DatePipe, NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    NgClass,
    DatePipe,
    NgForOf
  ],
  providers: [DatePipe],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  host: {
    '[class.app-calendar]': 'true'
  }
})
export class CalendarComponent implements OnInit {
  currentDate = new Date();
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: { date: Date, isCurrentDay: boolean, isWeekend: boolean, isOutsideMonth: boolean }[] = [];

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar() {
    const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const lastDayOfMonthDate = lastDayOfMonth.getDate();

    for (let i = 1; i <= 42; i++) {
      const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), i - firstDayOfWeek);
      const isCurrentMonth = date.getMonth() === this.currentDate.getMonth();
      const isCurrentDay = isCurrentMonth && date.getDate() === this.currentDate.getDate();
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isOutsideMonth = !isCurrentMonth || date.getDate() < 1 || date.getDate() > lastDayOfMonthDate;

      this.calendarDays.push({date, isCurrentDay, isWeekend, isOutsideMonth});
    }
  }
}
