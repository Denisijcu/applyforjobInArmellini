
import { Injectable } from '@angular/core';
import { GalleryImage } from '../models/galleryImages';
import { Aplicante } from '../models/aplicante';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Applicant } from '../models/applicant';
import { Application} from '../models/application.model';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
@Injectable()
export class ApplicantsService {
    private uploads: AngularFireList<GalleryImage>;
    private basePath = '/aplicante';
    applicantsCollection: AngularFirestoreCollection<Applicant>;
    applicantDoc: AngularFirestoreDocument<Applicant>;
    applicants: Observable<Applicant[]>;
    // applicant: Observable<Applicant>;
    applicant2: Observable<Applicant>;
    applicant: Applicant;
    public myUrl = '';
    public myEmail = '';
    constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
        this.applicantsCollection = this.afs.collection('applicants', ref => ref.orderBy('lastName', 'asc'));
    }

    getDataUser(): Observable<Applicant[]> {
        this.applicantsCollection = this.afs.collection('applicants', ref => ref.where('email', '==', this.myEmail)
        );
        const app = this.getApplicants();
        return app;
    }

    getApplicants(): Observable<Applicant[]> {
        // Get applicant with the id
        this.applicants = this.applicantsCollection.snapshotChanges()
            .map(changes => {
                return changes.map(action => {
                    const data = action.payload.doc.data() as Applicant;
                    data.id = action.payload.doc.id;
                    return data;
                });
            });
        return this.applicants;
    }

    getApplicant(id: string): Observable<Applicant> {
        this.applicantDoc = this.afs.doc<Applicant>(`applicants/${id}`);
        this.applicant2 = this.applicantDoc.snapshotChanges().map(action => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Applicant;
                data.id = action.payload.id;
                return data;
            }
        });
        return this.applicant2;
    }

    private newMethod() {
        return this.applicant;
    }

    newApplicant(applicant: Applicant) {
        console.log('LLEGUE AL FINAL', applicant);
        this.applicantsCollection.add({
            url: this.myUrl,
            alias: applicant.alias,
            id: '',
            email: '',
            password: '',
            applyfor: applicant.applyfor,
            dateapply: applicant.dateapply,
            heardabouts: applicant.heardabouts,
            wherewanttowork: applicant.wherewanttowork,
            photo: applicant.photo,
            firstName: applicant.firstName,
            lastName: applicant.lastName,
            middleName: applicant.middleName,
            number: applicant.number,
            street: applicant.street,
            city: applicant.city,
            state: applicant.state,
            zipcode: applicant.zipcode,
            county: applicant.county,
            phone: applicant.phone,
            ssn: applicant.ssn,
            q1y: applicant.q1y,
            q1n: applicant.q1n,
            q2y: applicant.q2y,
            q2n: applicant.q2n,
            ifyes: applicant.ifyes,
            q3y: applicant.q3y,
            q3n: applicant.q3n,
            ifemployedwhenandwhere: applicant.ifemployedwhenandwhere,
            q4y: applicant.q4y,
            q4n: applicant.q4n,
            q5y: applicant.q5y,
            q5n: applicant.q5n,
            q6y: applicant.q6y,
            q6n: applicant.q6n,
            availabetowork: applicant.availabetowork,
            fulltime: applicant.fulltime,
            parttime: applicant.parttime,
            shiftwork: applicant.shiftwork,
            temporary: applicant.temporary,
            q7y: applicant.q7y,
            q7n: applicant.q7n,
            q8y: applicant.q8y,
            q8n: applicant.q8n,
            q9y: applicant.q9y,
            q9n: applicant.q9n,
            ifconvited: applicant.ifconvited,
            elementaryname: applicant.elementaryname,
            hightschoolname: applicant.hightschoolname,
            collegename: applicant.collegename,
            professionalname: applicant.professionalname,
            yearscompleted1: applicant.yearscompleted1,
            yearscompleted2: applicant.yearscompleted2,
            yearscompleted3: applicant.yearscompleted3,
            yearscompleted4: applicant.yearscompleted4,
            diplomadegree1: applicant.diplomadegree1,
            diplomadegree2: applicant.diplomadegree2,
            diplomadegree3: applicant.diplomadegree3,
            diplomadegree4: applicant.diplomadegree4,
            courses: applicant.courses,
            trainings: applicant.trainings,
            honors: applicant.honors,
            moreinfo: applicant.moreinfo,
            speakfluent: applicant.speakfluent,
            speakgood: applicant.speakgood,
            speakfail: applicant.speakfail,
            readfluent: applicant.readfluent,
            readgood: applicant.readgood,
            readfail: applicant.readfail,
            writefluent: applicant.writefluent,
            writegood: applicant.writegood,
            writefail: applicant.writefail,
            emergencyname: applicant.emergencyname,
            emergencyaddress: applicant.emergencyaddress,
            emergencynumber: applicant.emergencynumber,
            usamilitaryyes: applicant.usamilitaryyes,
            usamilitaryno: applicant.usamilitaryno,
            usamilataryexplain: applicant.usamilataryexplain,
            employer1name: applicant.employer1name,
            employer2name: applicant.employer2name,
            employer3name: applicant.employer3name,
            employer4name: applicant.employer4name,
            employer5name: applicant.employer5name,
            employer1address: applicant.employer1address,
            employer2address: applicant.employer2address,
            employer3address: applicant.employer3address,
            employer4address: applicant.employer4address,
            employer5address: applicant.employer5address,
            from1: applicant.from1,
            from2: applicant.from2,
            from3: applicant.from3,
            from4: applicant.from4,
            from5: applicant.from5,
            to1: applicant.to1,
            to2: applicant.to2,
            to3: applicant.to3,
            to4: applicant.to4,
            to5: applicant.to5,
            wperformed1: applicant.wperformed1,
            wperformed2: applicant.wperformed2,
            wperformed3: applicant.wperformed3,
            wperformed4: applicant.wperformed4,
            wperformed5: applicant.wperformed5,
            employer1number: applicant.employer1number,
            employer2number: applicant.employer2number,
            employer3number: applicant.employer3number,
            employer4number: applicant.employer4number,
            employer5number: applicant.employer5number,
            start1: applicant.start1,
            start2: applicant.start2,
            start3: applicant.start3,
            start4: applicant.start4,
            start5: applicant.start5,
            final1: applicant.final1,
            final2: applicant.final2,
            final3: applicant.final3,
            final4: applicant.final4,
            final5: applicant.final5,
            jobtitle1: applicant.jobtitle1,
            jobtitle2: applicant.jobtitle2,
            jobtitle3: applicant.jobtitle3,
            jobtitle4: applicant.jobtitle4,
            jobtitle5: applicant.jobtitle5,
            supervisor1: applicant.supervisor1,
            supervisor2: applicant.supervisor2,
            supervisor3: applicant.supervisor3,
            supervisor4: applicant.supervisor4,
            supervisor5: applicant.supervisor5,
            reasonforleaving1: applicant.reasonforleaving1,
            reasonforleaving2: applicant.reasonforleaving2,
            reasonforleaving3: applicant.reasonforleaving3,
            reasonforleaving4: applicant.reasonforleaving4,
            reasonforleaving5: applicant.reasonforleaving5,
            skillandqualifications: applicant.skillandqualifications,
            signatureofapplicant: applicant.signatureofapplicant,
            datesignature: applicant.datesignature,
            withness: applicant.withness,
            resumeurl: applicant.resumeurl
        });
    }
    uploadFile(aplicante: Aplicante, applicant: Applicant) {
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(`${this.basePath}/${aplicante.file.name}`)
            .put(aplicante.file);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            // three observers
            // 1.) state_changed observer
            (snapshot) => {
                // upload in progress
                aplicante.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
                // console.log(employee.progress);
            },
            // 2.) error observer
            (error) => {
                // upload failed
                console.log(error);
            },
            // 3.) success observer
            (): any => {
                aplicante.url = uploadTask.snapshot.downloadURL;
                this.myUrl = aplicante.url;
                this.applicant = applicant;
                aplicante.alias = aplicante.file.name;

                this.saveFileData(aplicante);

            }
        );
    }
    private saveFileData(aplicante: Aplicante) {
        this.db.list(`${this.basePath}/`).push(aplicante);
        this.newApplicant(this.applicant);
    }
    updateApplicant(application: Application) {
        this.applicantDoc = this.afs.doc(`applicants/${application.id}`);
        this.applicantDoc.update(application);
    }
    deleteApplicant(applicant: Application) {
        this.applicantDoc = this.afs.doc(`applicants/${applicant.id}`);
        this.applicantDoc.delete();
    }
}
