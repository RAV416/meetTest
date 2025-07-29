import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from './event.service';
import { EventModel } from './event.model';
import { UserService } from '../user/user.service';
import { CalendarComponent } from '../../shared/calendar/calendar.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ToggleListComponent } from '../../shared/modal/toggle-list.component';
import { UserModel } from '../user/user.model';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, FormsModule, CalendarComponent, ToggleListComponent],
  templateUrl: './event-form.component.html',
})
export class EventFormComponent {
  private eventService = inject(EventService);
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  users$ = this.userService.getAll();
  users = toSignal(this.users$, { initialValue: [] });
  currentUser?: UserModel;

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      if (this.mode === 'create' && user?.id) {
        this.model.participants.push(user.id);
      }
    });
  }
  model: EventModel = {
    id: '',
    title: '',
    description: '',
    date: [] as string[],
    location: '',
    participants: [],
    image: '',
    createdBy: '',
  };
  mode: 'create' | 'edit' = 'create';
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
  
formFields = [
  { key: 'title', label: 'Title', required: true },
  { key: 'description', label: 'Description', required: true },
  { key: 'location', label: 'Location', required: true },
  { key: 'image', label: 'Image URL', required: false },
] as const;

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
    return this.model.date.length === 0;
  }
  get participantsInvalid(): boolean {
    return this.model.participants.length <= 1;
  }
  onSubmit() {
    try {
      if (!this.currentUser?.id) {
        console.warn('No current user found.');
        return;
      }

      if (!this.model.participants.includes(this.currentUser.id)) {
        this.model.participants.push(this.currentUser.id);
      }
      if (this.mode === 'create') {
        const newEvent = {
          ...this.model,
          id: this.model.id,
          createdBy: this.currentUser.id || '',
        };
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
}
