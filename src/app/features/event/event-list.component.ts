import { Component, computed, inject, signal } from '@angular/core';
import { EventService } from './event.service';
import { EventModel } from './event.model';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { UserService } from '../user/user.service';
import { UserModel } from '../user/user.model';
import { combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styles: [],
  imports: [RouterModule, DatePipe, CommonModule],
  standalone: true,
})
export class EventComponent {
  
  eventService: EventService = inject(EventService);
  userService = inject(UserService);
  events$ = combineLatest([
    this.eventService.getAll(),
    this.userService
      .getCurrentUser()
      .pipe(filter((user): user is UserModel => !!user)),
  ]).pipe(
    map(([events, user]) =>
      events.filter((event) => event.participants.includes(user.id))
    )
  );
  
  events = toSignal(this.events$, { initialValue: [] });
  showDescription = true;
  showDates = true;

  searchTerm = signal('');

filteredEvents = computed(() => {
  const term = this.searchTerm().toLowerCase();
  return this.events().filter(event => {
    const formattedDates = event.date.map(d =>
      formatDate(d, 'MMMM d, yyyy', 'en-US').toLowerCase()
    );
    return (
      event.title.toLowerCase().includes(term) ||
      event.description.toLowerCase().includes(term) ||
      formattedDates.some(fd => fd.includes(term))
    );
  });
});

  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
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
    createdBy: '',
  };
  showDatesClick() {
    this.showDates = !this.showDates;
  }
  showDescriptionClick() {
    this.showDescription = !this.showDescription;
  }
}
