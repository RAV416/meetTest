import { Component, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MonthComponent } from './month/month.component';
import { DayComponent } from './day/day.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  imports: [RouterModule, MonthComponent, DayComponent],
  styles: [],
  standalone: true,
})
export class CalendarComponent {
  selectedDateChange = input<Date[]>();
}
