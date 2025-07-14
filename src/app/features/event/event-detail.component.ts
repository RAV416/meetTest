import { Component, inject, Output } from '@angular/core';
import { EventService } from './event.service';
import { EventModel } from './event.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserModel } from '../user/user.model';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CalendarComponent } from '../../shared/calendar/calendar.component';
import { ParticipantEmailToNamePipe } from '../../shared/custom pipes/participants.pipe';
import { UserService } from '../user/user.service';
import { DeleteModalComponent } from "../../shared/modal/delete-modal.component";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styles: [],
  imports: [
    ParticipantEmailToNamePipe,
    RouterModule,
    AsyncPipe,
    CalendarComponent,
    DeleteModalComponent
],
  standalone: true,
})
export class EventDetailComponent {
  eventService: EventService = inject(EventService);
  userService: UserService = inject(UserService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  showCalendar = false;
  showDeleteModal = false;
  
  event$: Observable<EventModel | undefined> = this.route.paramMap.pipe(
    switchMap((params) => this.eventService.getOne(params.get('id')!))
  );
  users$: Observable<UserModel[]> = this.userService.getAll();


  deleteItem(event: EventModel): void {
    console.log('Deleting event:', event.id);
    this.router.navigate(['/event']);
    this.eventService.deleteOne(event.id);
  }
}
