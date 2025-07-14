import { Component, computed, inject, Input, NgModule, signal, WritableSignal } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from './event.service';
import { EventModel } from './event.model';
import { CalendarComponent } from '../../shared/calendar/calendar.component';
import { UserModel } from '../user/user.model';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { ParticipantEmailToNamePipe } from '../../shared/custom pipes/participants.pipe';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-event-form',

  imports: [
    CommonModule,
    CalendarComponent,
    FormsModule,
    AsyncPipe,
    ParticipantEmailToNamePipe,
  ],
  templateUrl: './event-form.component.html',
  standalone: true,
})
export class EventFormComponent {

  private eventService: EventService = inject(EventService);
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  users$: Observable<UserModel[]> = this.userService.getAll();
  eventModel: WritableSignal<EventModel | undefined> = signal(undefined);
  mode: 'create' | 'edit' = 'create';

  selectedUsers: UserModel[] = [];
  showUserModal = false;
constructor() {
  this.route.queryParamMap.subscribe((params) => {
    const modeParam = params.get('mode');
    if (modeParam === 'edit') {
      this.mode = 'edit';
    }
  });

  this.route.paramMap.subscribe((params) => {
    const id = params.get('id');
    if (id) {
      this.loadEvent(id);
    }
  });
}
loadEvent(id: string) {
  this.eventService.getOne(id).subscribe((event) => {
    if (event) {
      this.model = event;
    } else {
      console.warn('Event not found for ID:', id);
    }
  });
}
  
  model: EventModel = {
    id: '',
    title: '',
    description: '',
    date: [],
    location: '',
    participants: [],
    image: '',
  };
  formInputs(): (keyof EventModel)[] {
    return ['title', 'description', 'location', 'image'];
  }
  onDateSelected(date: string) {
    const index = this.model.date.indexOf(date);
    if (index > -1) {
      this.model.date.splice(index, 1);
    } else {
      this.model.date.push(date);
    }
    console.log('Selected dates:', this.model.date);
  }
  isRequired(eventData: string): boolean {
    return ['title', 'description', 'location'].includes(eventData);
  }
  onSubmit() {
    const event: EventModel = this.model;
    try {
      if (this.mode === 'create') {
        const newEvent: EventModel = { ...event, id: event.id };
        this.eventService.addOne(newEvent);
        console.log('Event created:', event.title);
      } else if (this.mode === 'edit') {
        this.eventService.updateOne(event.id, event);
        console.log('Event updated:', event.id);
      }
      this.router.navigate(['/event']);
    } catch (error) {
      console.error('Error during form submit:', error);
    }
  }

  toggleUser(user: UserModel): void {
    let participants = Array.isArray(this.model.participants)
      ? [...this.model.participants]
      : [];
    const idx = participants.indexOf(user.email);
    if (idx > -1) {
      participants.splice(idx, 1);
    } else {
      participants.push(user.email);
    }
    this.model = { ...this.model, participants };
  }

  isSelected(user: UserModel): boolean {
    return this.model.participants.includes(user.email);
  }
  users = toSignal(this.users$, { initialValue: [] });

  searchTerm = signal('');

  filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.users().filter(
      (user) =>
        user.email.toLowerCase().includes(term) ||
        user.name?.toLowerCase().includes(term) ||
        user.surname?.toLowerCase().includes(term)
    );
  });
  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }
}
