import { Component, inject } from '@angular/core';
import { EventService } from './event.service';
import { EventModel } from './event.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserModel } from '../user/user.model';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styles: [],
  imports: [RouterModule, AsyncPipe],
  standalone: true,
})
export class EventDetailComponent {
  eventService: EventService = inject(EventService);

  route = inject(ActivatedRoute);

  showDeleteModal = false;

  event$: Observable<EventModel | undefined> = this.route.paramMap.pipe(
    // get the 'id' param from the route and fetch the event
    switchMap(params => this.eventService.getOne(params.get('id')!))
  );
  
    deleteItem(model: EventModel): void {
      console.log('Deleting event:', model.id);
      this.eventService.deleteOne(model.id);
    }

}
