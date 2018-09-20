import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { News } from '../models/news.model';

@Injectable()
export class NewsService {

    newsCollection: AngularFirestoreCollection<News>;
    newsDoc: AngularFirestoreDocument<News>;
    news: Observable<News[]>;


    constructor(private afs: AngularFirestore) {
        this.newsCollection = this.afs.collection('news', ref => ref.orderBy('date', 'asc'));
    }

    getNews(): Observable<News[]> {
        // Get applicant with the id
        this.news = this.newsCollection.snapshotChanges()
            .map(changes => {
                return changes.map(action => {
                    const data = action.payload.doc.data() as News;
                    data.id = action.payload.doc.id;
                    return data;
                });
            });
        return this.news;
    }

}
/*
    createNews(news: News) {
        //Log user data in console
        console.log("User Name: " + news.title);
    }
*/
