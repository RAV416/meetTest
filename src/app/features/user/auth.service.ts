import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { map, Observable } from 'rxjs';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _auth = inject(AngularFireAuth);
  private _userService = inject(UserService);
  user$: Observable<firebase.User | null> = this._auth.authState;
  userService: any;

  constructor(private auth: AngularFireAuth) {
    this.user$.subscribe(user => {
      if (user) {
        console.log('User auth logged in:', user.uid);
      } else {
        console.log('User auth logged out');
      }
    });
  }
async login(email: string, password: string): Promise<firebase.auth.UserCredential> {
  const cred = await this._auth.signInWithEmailAndPassword(email, password);
  if (!cred.user) {
    throw new Error('Login failed: No user returned');
  }
  localStorage.setItem('currentUser', JSON.stringify({ id: cred.user.uid }));
  return cred;
}
  async register(email: string, password: string, name: string, surname: string): Promise<void> {
    const userCred = await this._auth.createUserWithEmailAndPassword(email, password);
    const uid = userCred.user?.uid;

    if (!uid) {
      throw new Error('UID not available after registration');
    }

    const userModel: UserModel = {
      name,
      surname,
      email,
      id: uid
    };
    return this._userService.addOne(userModel);
  }

  logout(): Promise<void> {
    return this._auth.signOut();
  }

  getCurrentUser(): Promise<firebase.User | null> {
    return this._auth.currentUser;
  }

  isLoggedIn(): boolean {
    return !!this._auth.currentUser;
  }
}