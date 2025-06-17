import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UserModel } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _client: AngularFirestore = inject(AngularFirestore);

  private get usersCollection() {
    return this._client.collection<UserModel>('users');
  }

  getAll(): Observable<UserModel[]> {
    return this.usersCollection.valueChanges({ idField: 'id' });
  }

  getOne(id: string): Observable<UserModel | undefined> {
    return this.usersCollection.doc(id).valueChanges({ idField: 'id' });
  }

  addOne(user: UserModel): Promise<void> {
    const id = this._client.createId();
    return this.usersCollection.doc(id).set({ ...user, id });
  }

  updateOne(id: string, user: Partial<UserModel>): Promise<void> {
    return this.usersCollection.doc(id).update(user);
  }

  deleteOne(id: string): Promise<void> {
    return this.usersCollection.doc(id).delete();
  }
}
