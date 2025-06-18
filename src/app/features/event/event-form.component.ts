import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from './event.service';
import { EventModel } from './event.model';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-event-form',

  imports: [CommonModule, CalendarComponent, FormsModule],
  templateUrl: './event-form.component.html',
  standalone: true,
})
export class EventFormComponent {
  mode = 'create';
  private eventService: EventService = inject(EventService);
  get events(): (keyof EventModel)[] {
    return ['title', 'description', 'location', 'image'];
  }
  model: EventModel = {
    id: '',
    title: '',
    description: '',
    date: [''],
    location: '',
    participants: [''],
    image: '',
  };
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
}
