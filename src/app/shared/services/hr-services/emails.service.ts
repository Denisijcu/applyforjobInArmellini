
import { Injectable } from '@angular/core';
import { HREmail } from '../../models/hr-models/email.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase';


@Injectable()
export class HREmailService {

  emailsCollection: AngularFirestoreCollection<HREmail>;
  emailDoc: AngularFirestoreDocument<HREmail>;
  emails: Observable<HREmail[]>;
  email: Observable<HREmail>;
  constructor(private afs: AngularFirestore) {
    this.emailsCollection = this.afs.collection('emails', ref => ref.orderBy('date', 'desc'));
  }

  getEmails(): Observable<HREmail[]> {
    // Get applicant with the id
    this.emails = this.emailsCollection.snapshotChanges()
      .map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as HREmail;
          data.id = action.payload.doc.id;
          return data;
        });
      });
    return this.emails;
  }

  getEmail(id: string): Observable<HREmail> {
      console.log('el id paso', id);
    this.emailDoc = this.afs.doc<HREmail>(`emails/${id}`);
    this.email = this.emailDoc.snapshotChanges().map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as HREmail;
        data.id = action.payload.id;
        console.log(data.id);
        return data;
      }
    });
    return this.email;
  }

  updateEmail(email: HREmail) {
    console.log(email.answer);
    this.emailDoc = this.afs.doc(`emails/${email.id}`);
    this.emailDoc.update(email);
  }

  deletEmail(email: HREmail) {
    this.emailDoc = this.afs.doc(`emails/${email.id}`);
    this.emailDoc.delete();
  }
}
