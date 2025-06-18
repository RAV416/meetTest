import { Component, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  imports: [CommonModule, FullCalendarModule],
  styles: [],
  standalone: true,
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    events: [
      { title: 'event 1', date: '2019-04-01' },
      { title: 'event 2', date: '2019-04-02' },
    ],
  };
  selectedDates = model<DateClickArg[]>([]);

  handleDateClick(date: DateClickArg): void {
    const current = this.selectedDates();
    const index = current.findIndex((d) => date && d === date);
    if (index > -1) {
      const updated = [...current];
      updated.splice(index, 1);
      this.selectedDates.set(updated.sort());
    } else {
      if (date) {
        const updated = [...current, date];
        this.selectedDates.set(updated.sort());
      }
    }
    console.log('Date clicked:', date.dateStr);
  }
}
