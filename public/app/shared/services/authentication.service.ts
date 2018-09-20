import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '../../shared/models/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {

  private user: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth
  ) {
    this.user = afAuth.authState;

  }

  login(user: User) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    console.log('logout done!!!');
    return this.afAuth.auth.signOut();
  
  }

  loginGoogle(): boolean {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    return true;
  }

  guest(): boolean {
    firebase.auth().signInAnonymously().catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/operation-not-allowed') {
        alert('You must enable Anonymous auth in the Firebase Console.');
      } else {
        console.error(error);
      }
    });
    return true;
  }



  authUser() {
    return this.user;
  }
}
