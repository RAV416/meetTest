import { Component, inject } from '@angular/core';
import { EventService } from './event.service';
import { EventModel } from './event.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserModel } from '../user/user.model';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CalendarComponent } from "../../shared/calendar/calendar.component";
import { ParticipantIdToNamePipe } from '../../shared/custom pipes/participants.pipe';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styles: [],
  imports: [ParticipantIdToNamePipe, RouterModule, AsyncPipe, CalendarComponent],
  standalone: true,
})
export class EventDetailComponent {
  eventService: EventService = inject(EventService);
userService: UserService = inject(UserService);
  route = inject(ActivatedRoute);

  showDeleteModal = false;

  event$: Observable<EventModel | undefined> = this.route.paramMap.pipe(
    switchMap(params => this.eventService.getOne(params.get('id')!))
  );
  users$: Observable<UserModel[]> = this.userService.getAll();
  
    deleteItem(model: EventModel): void {
      console.log('Deleting event:', model.id);
      this.eventService.deleteOne(model.id);
    }

}
