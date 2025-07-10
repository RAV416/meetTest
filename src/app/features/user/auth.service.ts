import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _auth = inject(AngularFireAuth);

user$: Observable<firebase.User | null> = this._auth.authState;

  constructor(private auth: AngularFireAuth) {
    this.user$ = auth.authState;
    this.user$.subscribe(user => {
      if (user) {
        console.log('User auth logged in:', user.uid);
      } else {
        console.log('User auth logged out');
      }
    });
  }
  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this._auth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this._auth.createUserWithEmailAndPassword(email, password);
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