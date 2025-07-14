import { Component, inject } from '@angular/core';
import { EventService } from './event.service';
import { EventModel } from './event.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  DynamicListComponent,
  DynamicListFields,
} from '../../shared/dynamic-list/dynamic-list.component';
import { AuthService } from '../user/auth.service';
import { map, from, switchMap } from 'rxjs';
import { ParticipantEmailToNamePipe } from '../../shared/custom pipes/participants.pipe';
import { AsyncPipe } from '@angular/common';
import { UserService } from '../user/user.service';
import { EventDetailComponent } from "./event-detail.component";
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styles: [],
  imports: [ParticipantEmailToNamePipe, AsyncPipe, RouterModule, DynamicListComponent, EventDetailComponent],
  standalone: true,
})
export class EventComponent {
  eventService: EventService = inject(EventService);
  userService: UserService = inject(UserService);
  router = inject(Router);


  users$ = this.userService.getAll();
  events$ = this.eventService.getAll();


  goToEvent(item: EventModel): void {
    this.router.navigate(['/eventDetail', item.id]);
  }
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
