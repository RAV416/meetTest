import { Component, inject } from '@angular/core';
import { EventService } from './event.service';
import { EventModel } from './event.model';
import { RouterModule } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { EventsOverviewComponent } from "../overview/calendar-overview.component";
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { UserModel } from '../user/user.model';
import { combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styles: [
    `
      .break-word {
        overflow-wrap: break-word;
        word-break: break-word;
      }
    `,
  ],
  imports: [AsyncPipe, RouterModule, DatePipe, EventsOverviewComponent],
  standalone: true,
})
export class EventComponent {
  eventService: EventService = inject(EventService);
  userService = inject(UserService);
  events$ = combineLatest([
  this.eventService.getAll(),
  this.userService.getCurrentUser().pipe(
    filter((user): user is UserModel => !!user) 
  )
]).pipe(
  map(([events, user]) =>
    events.filter(event => event.participants.includes(user.id))
  )
);



  

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
}
