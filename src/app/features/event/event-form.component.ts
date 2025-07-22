import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from './event.service';
import { EventModel } from './event.model';
import { UserService } from '../user/user.service';
import { UserModel } from '../user/user.model';
import { CalendarComponent } from '../../shared/calendar/calendar.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CalendarComponent,
  ],
  templateUrl: './event-form.component.html',
})
export class EventFormComponent {
  private eventService = inject(EventService);
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  users$ = this.userService.getAll();
  users = toSignal(this.users$, { initialValue: [] });

  model: EventModel = {
    id: '',
    title: '',
    description: '',
    date: [],
    location: '',
    participants: [],
    image: '',
  };

  mode: 'create' | 'edit' = 'create';
  showUserModal = false;

  searchTerm = signal('');
  filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.users().filter((user) =>
      [user.email, user.name, user.surname]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(term))
    );
  });
  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }
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
  formInputs(): (keyof EventModel)[] {
    return ['title', 'description', 'location', 'image'];
  }
  isRequired(field: string): boolean {
    return ['title', 'description', 'location'].includes(field);
  }
  onDateSelected(date: string) {
    const dates = this.model.date;
    const index = dates.indexOf(date);
    if (index > -1) {
      dates.splice(index, 1);
    } else {
      dates.push(date);
    }
  }


get dateInvalid(): boolean {
  return (
    this.model.date.length === 0
  );
}
get participantsInvalid(): boolean {
  return (
    this.model.participants.length === 0
  );
}
  onSubmit() {

    try {
      if (this.mode === 'create') {
        const newEvent = { ...this.model, id: this.model.id };
        this.eventService.addOne(newEvent);
        console.log('Event created:', newEvent.title);
        this.router.navigate(['/event']);
      } else {
        this.eventService.updateOne(this.model.id, this.model);
        console.log('Event updated:', this.model.id);
        this.router.navigate([`/eventDetail/${this.model.id}`]);
      }
      
    } catch (error) {
      console.error('Error during form submit:', error);
    }
  }
  toggleUser(user: UserModel) {
    const participants = [...this.model.participants];
    const index = participants.indexOf(user.id);

    if (index > -1) {
      participants.splice(index, 1);
    } else {
      participants.push(user.id);
    }

    this.model = { ...this.model, participants };
  }
  isSelected(user: UserModel): boolean {
    return this.model.participants.includes(user.id);
  }

}
