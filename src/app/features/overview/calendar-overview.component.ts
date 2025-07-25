import { Component,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from "../../shared/calendar/calendar.component";

@Component({
  selector: 'app-calendar-overview',
  templateUrl: './calendar-overview.component.html',
  imports: [CommonModule, FullCalendarModule, CalendarComponent],
  styleUrls: [],
  standalone: true,
})
export class EventsOverviewComponent {

}
