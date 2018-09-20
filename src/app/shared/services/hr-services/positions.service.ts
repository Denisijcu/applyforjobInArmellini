
import { Injectable } from '@angular/core';
import { Position } from '../../models/hr-models/position.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase';


@Injectable()
export class HRPositionsService {

  positionsCollection: AngularFirestoreCollection<Position>;
  positionDoc: AngularFirestoreDocument<Position>;
  positions: Observable<Position[]>;
  position: Observable<Position>;
  constructor(private afs: AngularFirestore) {
    this.positionsCollection = this.afs.collection('positions', ref => ref.orderBy('date', 'desc'));
  }

  addNewPost(position: Position) {
    this.positionsCollection.add(position);
  }
  getPositions(): Observable<Position[]> {
    // Get applicant with the id
    this.positions = this.positionsCollection.snapshotChanges()
      .map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Position;
          data.id = action.payload.doc.id;
          return data;
        });
      });
    return this.positions;
  }

  getPosition(id: string): Observable<Position> {
    this.positionDoc = this.afs.doc<Position>(`positions/${id}`);
    console.log('e', this.positionDoc);
    this.position = this.positionDoc.snapshotChanges().map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Position;
        data.id = action.payload.id;
        console.log(data.id);
        return data;
      }
    });
    return this.position;
  }



  updatePosition(position: Position) {
    this.positionDoc = this.afs.doc(`positions/${position.id}`);
    this.positionDoc.update(position);
  }

  deletePosition(position: Position) {
    alert('voy a borrar');
    this.positionDoc = this.afs.doc(`positions/${position.id}`);
    this.positionDoc.delete();
  }
}
