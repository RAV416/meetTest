import { Component, inject } from '@angular/core';
import { EventService } from './event.service';
import { EventModel } from './event.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  injector: EventService = inject(EventService);
  router = inject(Router);
  event = EventService;

  mapToFields = (model: EventModel): DynamicListFields => ({
    title1: `${model.title}`,
    description: `${model.description}`,
    additionalInfo: `${'where: '+ model.location}
      - ${'when: '+ model.date}
      - ${'who: '+ model.participants}`,
    image: `${model.image}`,
  });
  goToEvent(item: EventModel): void {
  this.router.navigate(['/event', item.id]);
}
}
