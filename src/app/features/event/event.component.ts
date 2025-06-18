import { Component, inject } from '@angular/core';
import { EventService } from './event.service';
import { EventModel } from './event.model';
import { RouterModule } from '@angular/router';
import {
  DynamicListComponent,
  DynamicListFields,
} from '../../shared/dynamic-list/dynamic-list.component';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styles: [],
  imports: [RouterModule, DynamicListComponent],
  standalone: true,
})
export class EventComponent {
  eventService: EventService = inject(EventService);
  event = EventService;

  deleteEvent(event: EventModel): void {
    console.log('Deleting event:', event.id);
    this.eventService.deleteOne(event.id);
  }

  mapToFields = (model: EventModel): DynamicListFields => ({
    title1: `${model.title}`,
    description: `${model.description}`,
    additionalInfo: `${model.location} - ${model.date}`,
    image: `${model.image}`,
  });
}
