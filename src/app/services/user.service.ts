import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private _client: AngularFirestore) {}

  getUsers(): Observable<UserModel[]> {
    return this._client.collection<UserModel>('users').valueChanges();
  }

  addUser(user: UserModel) {
    const id = this._client.createId();
    console.log('id', id);
    return this._client
      .collection<UserModel>('users')
      .doc(id)
      .set({ ...user });
  }
}
