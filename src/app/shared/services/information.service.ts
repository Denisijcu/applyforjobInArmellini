import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Information} from '../models/information.model';
import * as firebase from 'firebase/app';

@Injectable()

export class InformationService {
    newsCollectionRef: AngularFirestoreCollection<Information>;
    newsDoc: AngularFirestoreDocument<Information>;
    news: Observable<Information[]>;

    constructor(private afs: AngularFirestore) {
        this.newsCollectionRef = this.afs.collection('news', ref => ref.orderBy('date', 'desc'));
    }

    getNews(): Observable<Information[]> {
        // Get applicant with the id
        this.news = this.newsCollectionRef.snapshotChanges()
          .map(changes => {
            return changes.map(action => {
              const data = action.payload.doc.data() as Information;
              data.id = action.payload.doc.id;
              return data;
            });
          });
        return this.news;
      }
}
