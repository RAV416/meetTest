import { Component, inject, Output } from '@angular/core';
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
import { VoteProgressDirective } from '../../shared/custom directives/-progress.directive';

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
  loggedInUser$: Observable<UserModel | undefined> =
    this.userService.getCurrentUser();
 
  ngOnInit() {
    combineLatest([this.loggedInUser$, this.event$]).subscribe(
      ([user, event]) => {
        if (!user || !event) return;

        this.currentUser = user;
        this.event = event;

        const votedIndexes = event.votes?.[user.id] ?? [];
        this.userClicked[user.id] = new Set<number>(votedIndexes);

        this.yesClicks = event.date.map((_, i) => {
          let count = 0;
          for (const userVotes of Object.values(event.votes ?? {})) {
            if (userVotes.includes(i)) count++;
          }
          return count;
        });
      }
    );
  }
a
  event?: EventModel;
  currentUser?: UserModel;
  userClicked: { [userId: string]: Set<number> } = {};
  yesClicks: number[] = [];
  noClicks: number[] = [];
  yesClick(index: number) {
    const userId = this.currentUser?.id;
    if (!userId || !this.event || this.userClicked[userId]?.has(index)) return;

    this.eventService
      .voteYes(this.event.id, userId, index)
      .then(() => {
        this.yesClicks[index]++;
      })
      .catch((err) => console.error('Vote error', err));
  }
  noClick(index: number) {
    const userId = this.currentUser?.id;
    if (!userId || !this.event || !this.userClicked[userId]?.has(index)) return;

    this.eventService
      .voteNo(this.event.id, userId, index)
      .then(() => {
        this.noClicks[index]--;
      })
      .catch((err) => console.error('Vote error', err));
  }
  isYesClicked(index: number): boolean {
    const userId = this.currentUser?.id;
    if (!userId) return false;
    return this.userClicked[userId]?.has(index) ?? false;
  }

  deleteItem(event: EventModel): void {
    console.log('Deleting event:', event.id);
    this.router.navigate(['/event']);
    this.eventService.deleteOne(event.id);
  }
}
