import { Observable, of } from 'rxjs';
import { EventModel } from './event.model';
import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({ providedIn: 'root' })
export class EventService {
  _client: AngularFirestore = inject(AngularFirestore);
  private get eventCollection() {
    return this._client.collection<EventModel>('meets');
  }
  getAll(): Observable<EventModel[]> {
    return this.eventCollection.valueChanges();
  }

  addOne(event: EventModel) {
    const id = this._client.createId();
    return this.eventCollection.doc(id).set({ ...event, id });
  }

  updateOne(id: string, event: Partial<EventModel>): Promise<void> {
    return this.eventCollection.doc(id).update(event);
  }

  deleteOne(id: string): Promise<void> {
    return this.eventCollection.doc(id).delete();
  }
}
