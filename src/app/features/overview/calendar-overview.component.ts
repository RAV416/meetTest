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
export class EventsOverviewComponent {}
