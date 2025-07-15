import { Component, inject } from '@angular/core';
import { EventService } from './event.service';
import { EventModel } from './event.model';
import { RouterModule } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { CalendarComponent } from "../../shared/calendar/calendar.component";
import { EventsOverviewComponent } from "../overview/calendar-overview.component";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styles: [
    `
      .break-word {
        overflow-wrap: break-word;
        word-break: break-word;
      }
    `,
  ],
  imports: [AsyncPipe, RouterModule, DatePipe, CalendarComponent, EventsOverviewComponent],
  standalone: true,
})
export class EventComponent {
  eventService: EventService = inject(EventService);
  events$ = this.eventService.getAll();

  showCalendar = false;

  onEditClick(Event: EventModel) {
    this.selectedEvent = Event;
  }
  selectedEvent: EventModel = {
    id: '',
    title: '',
    description: '',
    date: [],
    location: '',
    participants: [],
    image: '',
  };

  // event = EventService;
  // mapToFields = (model: EventModel): DynamicListFields => ({
  //   title1: `${model.title}`,
  //   description: `${model.description}`,
  //   additionalInfo: `where: ${model.location}
  //     - when: ${model.date}`,
  //   image: `${model.image}`,
  // });
}
