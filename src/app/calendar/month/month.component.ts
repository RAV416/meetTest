import { Component } from '@angular/core';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  imports: [],
  styles: [],
  standalone: true,
})
export class MonthComponent {
  weeks: (number | '')[][] = [];
  days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  monthName = '';
  year = 0;

  displayedMonth: number;
  displayedYear: number;

  constructor() {
    const today = new Date();
    this.displayedMonth = today.getMonth();
    this.displayedYear = today.getFullYear();
    this.generateCalendar();
  }
  selectedDate: Date | null = null;

  generateCalendar() {
    const year = this.displayedYear;
    const month = this.displayedMonth;

    this.year = year;
    this.monthName = new Date(year, month).toLocaleString('default', {
      month: 'long',
    });

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let startDay = firstDay.getDay() - 1;
    if (startDay === -1) startDay = 6;

    const weeks: (number | '')[][] = [];
    let week: (number | '')[] = Array(startDay).fill('');

    for (let date = 1; date <= lastDay.getDate(); date++) {
      week.push(date);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }
    if (week.length) {
      while (week.length < 7) week.push('');
      weeks.push(week);
    }
    this.weeks = weeks;
  }

  prevMonth() {
    if (this.displayedMonth === 0) {
      this.displayedMonth = 11;
      this.displayedYear--;
    } else {
      this.displayedMonth--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    if (this.displayedMonth === 11) {
      this.displayedMonth = 0;
      this.displayedYear++;
    } else {
      this.displayedMonth++;
    }
    this.generateCalendar();
  }

  goToToday() {
    const today = new Date();
    this.displayedMonth = today.getMonth();
    this.displayedYear = today.getFullYear();
    this.generateCalendar();
  }

  isToday(date: number | string): boolean {
    const today = new Date();
    return (
      date === today.getDate() &&
      this.displayedMonth === today.getMonth() &&
      this.displayedYear === today.getFullYear()
    );
  }
}
