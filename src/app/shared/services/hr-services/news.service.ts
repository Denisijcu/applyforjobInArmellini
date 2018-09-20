import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { News } from '../../models/hr-models/news.model';
import * as firebase from 'firebase/app';

@Injectable()

export class HRNewsService {
    newsCollectionRef: AngularFirestoreCollection<News>;
    newsDoc: AngularFirestoreDocument<News>;
    news: Observable<News[]>;
    newd: Observable<News>;

    constructor(private afs: AngularFirestore) {
        this.newsCollectionRef = this.afs.collection('news', ref => ref.orderBy('date', 'desc'));
    }

    getNews(): Observable<News[]> {
        // Get applicant with the id
        this.news = this.newsCollectionRef.snapshotChanges()
          .map(changes => {
            return changes.map(action => {
              const data = action.payload.doc.data() as News;
              data.id = action.payload.doc.id;
              return data;
            });
          });
        return this.news;
      }

    getNew(id: string): Observable<News> {
        this.newsDoc = this.afs.doc<News>(`news/${id}`);
         this.newd = this.newsDoc.snapshotChanges().map(action => {
          if (action.payload.exists === false) {
            return null;
          } else {
            const data = action.payload.data() as News;
            data.id = action.payload.id;
            console.log(data.id);
            return data;
          }
        });
        return this.newd;
      }

    addNews(news: News) {
        this.newsCollectionRef.add(news);
    }

    updateNews(news: News) {
        this.newsCollectionRef.doc(news.id).update(news);
    }
    deleteNews(news: News) {
        this.newsCollectionRef.doc(news.id).delete();
    }
}
