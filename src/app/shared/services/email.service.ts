import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Email } from '../models/email.model';

@Injectable()
export class EmailService {

    emailsCollection: AngularFirestoreCollection<Email>;
    emailDoc: AngularFirestoreDocument<Email>;
    emails: Observable<Email[]>;


    constructor(private afs: AngularFirestore) {
        this.emailsCollection = this.afs.collection('emails', ref => ref.orderBy('date', 'asc'));
    }

    getEmails(): Observable<Email[]> {
        // Get applicant with the id
        this.emails = this.emailsCollection.snapshotChanges()
            .map(changes => {
                return changes.map(action => {
                    const data = action.payload.doc.data() as Email;
                    data.id = action.payload.doc.id;
                    return data;
                });
            });
        return this.emails;
    }


    addNewEmail(email: Email){
        this.emailsCollection.add(email);
    }


}