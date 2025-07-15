import { Component, inject, Output } from '@angular/core';
import { EventService } from './event.service';
import { EventModel } from './event.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserModel } from '../user/user.model';
import { combineLatest, Observable, switchMap } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
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
    DeleteModalComponent,
    DatePipe
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
  loggedInUser$: Observable<UserModel | undefined> = this.userService.getCurrentUser();

ngOnInit() {
  combineLatest([this.loggedInUser$, this.event$]).subscribe(([user, event]) => {
    if (!user) {
      console.warn('No logged in user found');
      return;
    }

    this.currentUser = user;

    // Initialize click tracking
    if (!this.userClicked[user.id]) {
      this.userClicked[user.id] = new Set<number>();
    }

    if (event?.date) {
      this.yesClicks = new Array(event.date.length).fill(0);
    }
  });
}


currentUser?: UserModel;
userClicked: { [userId: string]: Set<number> } = {};
yesClicks: number[] = [];
Yesclick(index: number) {
  const userId = this.currentUser?.id;
  if (!userId) return;

  if (this.userClicked[userId]?.has(index)) return;

  this.yesClicks[index]++;
  this.userClicked[userId].add(index);
}
isYesClicked(index: number): boolean {
  const userId = this.currentUser?.id;
  if (!userId) return false;
  return this.userClicked[userId]?.has(index) ?? false;
}
  noCount = 0;

  deleteItem(event: EventModel): void {
    console.log('Deleting event:', event.id);
    this.router.navigate(['/event']);
    this.eventService.deleteOne(event.id);
  }
}
