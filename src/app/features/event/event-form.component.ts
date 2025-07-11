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
import { ActivatedRoute } from '@angular/router';
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
  users$: Observable<UserModel[]> = this.userService.getAll();
eventModel: WritableSignal<EventModel | undefined> = signal(undefined);
  mode: 'create' | 'edit' = 'create';
  eventId?: string;
   @Input() set id(eventId: string) {
    
  }
  selectedUsers: UserModel[] = [];
  showUserModal = false;
  constructor() {
    this.route.queryParamMap.subscribe((params) => {
      const modeParam = params.get('mode');
      this.eventId = params.get('id') ?? undefined;
      if (modeParam === 'edit') {
        this.mode = 'edit';
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
  get formInputs(): (keyof EventModel)[] {
    return ['title', 'description', 'location', 'image'];
  }
  onDateSelected(date: string) {
    console.log('EventFormComponent initialized with mode:', this.mode);
    console.log('EventFormComponent eventId:', this.eventId);
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
