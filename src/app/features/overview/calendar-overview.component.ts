import { Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timeGrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { CalendarComponent } from "../../shared/calendar/calendar.component";

@Component({
  selector: 'app-events-overview',
  templateUrl: './calendar-overview.component.html',
  imports: [CommonModule, RouterOutlet, FullCalendarModule, CalendarComponent],
  styleUrls: [],
  standalone: true,
})
export class EventsOverviewComponent {
//   handleDateClick(arg: DateClickArg): void {
//   const date = arg.date;
//   const existingIndex = this.selectedDates.findIndex(
//     (d) => d.toDateString() === date.toDateString()
//   );
//   if (existingIndex > -1) {
//     this.selectedDates.splice(existingIndex, 1);
//     arg.dayEl.style.backgroundColor = ''
//   } else {
//     this.selectedDates.push(date);
//     arg.dayEl.style.backgroundColor = 'green'
//   }
//   this.selectedDates.sort((a, b) => a.getTime() - b.getTime());
  
  

// }
}
