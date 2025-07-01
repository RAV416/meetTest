import { Component, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timeGrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  imports: [CommonModule, RouterOutlet, FullCalendarModule, ],
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin , timeGridPlugin, interactionPlugin],
    dateClick: this.handleDateClick.bind(this),
    selectable: true,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      },
        events: [
    {
      start: '2025-06-10T10:00:00',
      end: '2025-06-10T16:00:00',
      display: 'background'
    }]
  };
  selectedDates: Date[] = [];

handleDateClick(arg: DateClickArg): void {
  const date = arg.date;
  const existingIndex = this.selectedDates.findIndex(
    (d) => d.toDateString() === date.toDateString()
  );
  if (existingIndex > -1) {
    this.selectedDates.splice(existingIndex, 1);
    arg.dayEl.style.backgroundColor = ''
  } else {
    this.selectedDates.push(date);
    arg.dayEl.style.backgroundColor = 'green'
  }
  this.selectedDates.sort((a, b) => a.getTime() - b.getTime());
  
  

}
}