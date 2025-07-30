import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';
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
  const id = user.id!;
  return this.collection.doc(id).set(user);
}

  updateOne(id: string, user: Partial<UserModel>): Promise<void> {
    return this.collection.doc(id).update(user);
  }

  deleteOne(id: string): Promise<void> {
    return this.collection.doc(id).delete();
  }
  getCurrentUser(): Observable<UserModel | undefined> {
    const id = JSON.parse(localStorage.getItem('currentUser')!)?.id;
    if (!id) return of(undefined);
    return this.collection.doc(id).valueChanges({ idField: 'id' });
  }
getFriends(): Observable<UserModel[]> {
  const currentUserId = JSON.parse(localStorage.getItem('currentUser')!)?.id;
  if (!currentUserId) return of([]);

  return this.getOne(currentUserId).pipe(
    switchMap(user => {
      const friendIds = user?.friends || [];
      return friendIds.length
        ? combineLatest(friendIds.map(id => this.getOne(id)))
        : of([]);
    }),
    map(users => users.filter((u): u is UserModel => !!u))
  );
}
}
