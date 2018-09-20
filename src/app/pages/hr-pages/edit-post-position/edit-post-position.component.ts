import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HRPositionsService } from '../../../shared/services/hr-services/positions.service';
import { Observable } from 'rxjs/Observable';
import { Position } from '../../../shared/models/hr-models/position.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
@Component({
    selector: 'app-edit-post',
    templateUrl: './edit-post-position.component.html',
    styleUrls: ['./edit-post-position.component.css'],
})
export class EditPostPositionComponent implements OnInit {

    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;
    uploadProgress: Observable<number>;
    downloadURL: Observable<string>;
    uploadState: Observable<string>;
    id: string;
    position: Position = {
        id: '',
        title: '',
        subtitle: '',
        compensation: '',
        date: '',
        url: '',
    };


    constructor(private positionService: HRPositionsService,
        private flashMessage: FlashMessagesService,
        private router: Router, private location: Location,
        private afStorage: AngularFireStorage,
        private route: ActivatedRoute
    ) {

    }
    ngOnInit() {



        this.id = this.route.snapshot.params['id'];

        console.log(this.id);
        this.positionService.getPosition(this.id).subscribe(position => {
            this.position = position;
        });

        console.log('El registro es: ', this.position);

    }


    onSubmit({ value, valid }: { value: Position, valid: boolean }) {

        console.log(value, valid);


        if (!valid) {
            // Show error
            this.flashMessage.show('Please fill out the form correctly', {
                cssClass: 'alert-danger', timeout: 4000
            });
        } else {
            // Add new client
            const now = new Date();
            this.position.date = now.toString();
            this.positionService.updatePosition(this.position);
            this.clearFields();
            // Show message
            this.flashMessage.show('New Position Was Posted', {
                cssClass: 'alert-success', timeout: 4000
            });
            // Redirect to dash
            this.location.back();
        }

        console.log(this.position);
    }

    onDelete() {
        this.positionService.deletePosition(this.position);
        this.clearFields();
        this.location.back();
    }



    onBack() {
        this.location.back();
    }
    upload(event) {
        const id = Math.random().toString(36).substring(2);
        this.ref = this.afStorage.ref(id);
        this.task = this.ref.put(event.target.files[0]);
        this.uploadProgress = this.task.percentageChanges();
        this.downloadURL = this.task.downloadURL();
        this.downloadURL.subscribe(location => {
            this.position.url = location;
            console.log(location);
        });
    }
    clearFields() {
        this.position.compensation = '';
        this.position.subtitle = '';
        this.position.title = '';
        this.position.url = '';
    }
}
