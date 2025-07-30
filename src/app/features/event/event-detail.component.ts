import { Component, inject } from '@angular/core';
import { EventService } from './event.service';
import { EventModel } from './event.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserModel } from '../user/user.model';
import { combineLatest, Observable, switchMap } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { CalendarComponent } from '../../shared/calendar/calendar.component';
import { UserIdToCredentialPipe } from '../../shared/custom pipes/participants.pipe';
import { UserService } from '../user/user.service';
import { DeleteModalComponent } from '../../shared/modal/delete-modal.component';
import { VoteProgressDirective } from '../../shared/custom directives/voteProgress.directive';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styles: [],
  imports: [
    UserIdToCredentialPipe,
    RouterModule,
    AsyncPipe,
    CalendarComponent,
    DeleteModalComponent,
    DatePipe,
    VoteProgressDirective,
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
  currentUser$: Observable<UserModel | undefined> =
    this.userService.getCurrentUser();

ngOnInit() {
  combineLatest([this.currentUser$, this.event$]).subscribe(
    ([user, event]) => {
      if (!user || !event) return;

      this.currentUser = user;
      this.event = event;

      const votedDates = event.votes?.[user.id] ?? [];
      this.userClicked[user.id] = new Set<string>(votedDates);

      // Zlicz głosy TAK dla każdej daty
      this.yesClicks = event.date.map((date) => {
        let count = 0;
        for (const userVotes of Object.values(event.votes ?? {})) {
          if (userVotes.includes(date)) count++;
        }
        return count;
      });
    }
  );
}

  event?: EventModel;
  currentUser?: UserModel;
  userClicked: { [userId: string]: Set<string> } = {};
  yesClicks: number[] = [];
  noClicks: number[] = [];

yesClick(index: number) {
  const userId = this.currentUser?.id;
  const date = this.event?.date[index];
  if (!userId || !this.event || !date || this.userClicked[userId]?.has(date)) return;

  this.eventService
    .voteYes(this.event.id, userId, date)
    .then(() => {
      this.yesClicks[index]++;
      this.userClicked[userId].add(date);
    })
    .catch((err) => console.error('Vote error', err));
}

noClick(index: number) {
  const userId = this.currentUser?.id;
  const date = this.event?.date[index];
  if (!userId || !this.event || !date || !this.userClicked[userId]?.has(date)) return;

  this.eventService
    .voteNo(this.event.id, userId, date)
    .then(() => {
      this.noClicks[index]--;
      this.userClicked[userId].delete(date);
    })
    .catch((err) => console.error('Vote error', err));
}
isYesClicked(index: number): boolean {
  const userId = this.currentUser?.id;
  const date = this.event?.date[index];
  if (!userId || !date) return false;

  return this.userClicked[userId]?.has(date) ?? false;
}

  deleteItem(event: EventModel): void {
    console.log('Deleting event:', event.id);
    this.router.navigate(['/event']);
    this.eventService.deleteOne(event.id);
  }
  getSortedDates(event: EventModel): string[] {
    return [...event.date].sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );
  }
}
