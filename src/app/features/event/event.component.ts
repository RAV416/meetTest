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
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styles: [],
  imports: [ParticipantEmailToNamePipe, AsyncPipe, RouterModule, DynamicListComponent],
  standalone: true,
})
export class EventComponent {
  eventService: EventService = inject(EventService);

  userService = inject(UserService);
  router = inject(Router);
  event = EventService;

  users$ = this.userService.getAll();
  events$ = this.eventService.getAll();

  mapToFields = (model: EventModel): DynamicListFields => ({
    title1: `${model.title}`,
    description: `${model.description}`,
    additionalInfo: `where: ${model.location}
      - when: ${model.date}`,
    image: `${model.image}`,
  });
  goToEvent(item: EventModel): void {
    this.router.navigate(['/event', item.id]);
  }
}
