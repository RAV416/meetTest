import { Component, inject, NgModule, signal } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from './event.service';
import { EventModel } from './event.model';
import { CalendarComponent } from '../../shared/calendar/calendar.component';
import { UserModel } from '../user/user.model';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-form',

  imports: [  CommonModule, CalendarComponent, FormsModule, AsyncPipe],
  templateUrl: './event-form.component.html',
  standalone: true,
})
export class EventFormComponent {
  
  private eventService: EventService = inject(EventService);
  private userService = inject(UserService);
  users$: Observable<UserModel[]> = this.userService.getAll();
  
  mode: 'create' | 'edit' = 'create';
  selectedUsers: UserModel[] = [];
  showUserModal = false;


  model: EventModel = {
    id: '',
    title: '',
    description: '',
    date: [''],
    location: '',
    participants: [''],
    image: '',
  };
    get formInputs(): (keyof EventModel)[] {
    return ['title', 'description', 'location', 'image'];
  }
  onDateSelected(date: string) {
    if (!Array.isArray(this.model.date)) {
      this.model.date = [];
    }
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

  toggleUser(user: UserModel) {
    let participants = Array.isArray(this.model.participants) ? [...this.model.participants] : [];
    const idx = participants.indexOf(user.id);
    if (idx > -1) {
      participants.splice(idx, 1);
    } else {
      participants.push(user.id);
    }
    this.model = { ...this.model, participants };
    // if (!this.model.participants.includes(currentUserId)) {
    // this.model.participants.push(currentUserId);
    // }
  }

  isSelected(user: UserModel): boolean {
    return Array.isArray(this.model.participants) && this.model.participants.includes(user.id);
  }


}
