import { Component, inject } from '@angular/core';
import { EventService } from './event.service';
import { EventModel } from './event.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styles: [],
  imports: [RouterModule],
  standalone: true,
})
export class EventDetailComponent {
  injector: EventService = inject(EventService);

  addItem() {}
}
