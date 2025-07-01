import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UserModel } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _client: AngularFirestore = inject(AngularFirestore);

  private collection = this._client.collection<UserModel>('users');

  getAll(): Observable<UserModel[]> {
    return this.collection.valueChanges({ idField: 'id' });
  }

  getOne(id: string): Observable<UserModel | undefined> {
    return this.collection.doc(id).valueChanges({ idField: 'id' });
  }

  addOne(user: UserModel): Promise<void> {
    const id = this._client.createId();
    return this.collection.doc(id).set({ ...user, id });
  }

  updateOne(id: string, user: Partial<UserModel>): Promise<void> {
    return this.collection.doc(id).update(user);
  }

  deleteOne(id: string): Promise<void> {
    return this.collection.doc(id).delete();
  }
}
