import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _auth = inject(AngularFireAuth);

user$: Observable<firebase.User | null> = this._auth.authState;

  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    console.log('User logged in:', email);
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
}