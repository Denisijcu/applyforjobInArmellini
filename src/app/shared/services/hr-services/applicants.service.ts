
import { Injectable } from '@angular/core';
import { Application } from '../../models/application.model';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase';


@Injectable()
export class HRApplicantsService {


  applicantsCollection: AngularFirestoreCollection<Application>;
  applicantDoc: AngularFirestoreDocument<Application>;
  applicants: Observable<Application[]>;
  // applicant: Observable<Applicant>;
  applicant2: Observable<Application>;
  applicant: Application;
  public myUrl = '';

  constructor(private afs: AngularFirestore) {
    this.applicantsCollection = this.afs.collection('applicants', ref => ref.orderBy('lastName', 'asc'));
  }

  getApplicants(): Observable<Application[]> {
    // Get applicant with the id
    this.applicants = this.applicantsCollection.snapshotChanges()
      .map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Application;
          data.id = action.payload.doc.id;
          return data;
        });
      });
    return this.applicants;
  }

  getApplicant(id: string): Observable<Application> {
    this.applicantDoc = this.afs.doc<Application>(`applicants/${id}`);
    this.applicant2 = this.applicantDoc.snapshotChanges().map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Application;
        data.id = action.payload.id;
        return data;
      }
    });
    return this.applicant2;
  }

}




