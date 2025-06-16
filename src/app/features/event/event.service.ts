import { Observable, of } from 'rxjs';
import { EventModel } from './event.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({ providedIn: 'root' })
export class EventService {
  constructor(private _client: AngularFirestore) {}

  getAll(): Observable<EventModel[]> {
    return this._client.collection<EventModel>('meets').valueChanges();
  }

  addEvent(event: EventModel) {
    const id = this._client.createId();
    return this._client
      .collection<EventModel>('meets')
      .doc(id)
      .set({ ...event });
  }
}
