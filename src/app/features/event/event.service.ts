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
  getOne(id: string): Observable<EventModel | undefined> {
    if (id) {
      return this.eventCollection.doc(id).valueChanges();
    }
    throw new Error('getOne: ID is required');
  }

  addOne(event: EventModel): Promise<string> {
    const id = this._client.createId();
    return this.eventCollection
      .doc(id)
      .set({ ...event, id })
      .then(() => id);
  }

  updateOne(id: string, event: Partial<EventModel>): Promise<void> {
    if (id) {
      return this.eventCollection.doc(id).update(event);
    }
    return Promise.reject('updateOne: ID is required');
  }

  deleteOne(id: string): Promise<void> {
    if (id) {
      return this.eventCollection.doc(id).delete();
    }
    return Promise.reject('deleteOne: ID is required');
  }
}
