import { Component, ViewChild, OnInit } from '@angular/core';
import { ApplicantsService } from '../../shared/services/applicants.service';
import { Router } from '@angular/router';

import {
    trigger,
    state,
    style,
    animate,
    keyframes,
    transition
} from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { Applicant } from '../../shared/models/applicant';

import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
    selector: 'app-addapplicant',
    templateUrl: './add-applicant.component.html',
    styleUrls: ['./add-applicant.component.css'],
    animations: [
        trigger('popOverState', [
            state('show', style({
                opacity: 1
            })),
            state('hide', style({
                opacity: 0
            })),
            state('move', style({
                transform: 'translateX(-100%)',
            })),
            transition('show => hide', animate('600ms ease-out')),
            transition('hide => show', animate('1000ms ease-in')),
            transition('* => move',
                animate('2000ms', keyframes([
                    style({ transform: 'translateX(0)    rotateY(0)', offset: 0 }),
                    style({ transform: 'translateX(50%)  rotateY(90deg)', offset: 0.33 }),
                    style({ transform: 'translateY(-75%) rotateY(180deg)', offset: 0.66 }),
                    style({ transform: 'translateX(-99%)', offset: 1.0 })
                ])
                ))
        ])
    ]
})
export class AddapplicantComponent implements OnInit {
    applicant = new Applicant(null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null);
    applicants: Applicant[];
    totalApplicants: number;

    firstName = '';
    lastName = '';
    email = '';

    @ViewChild('applicantForm') form: any;

    constructor(private applicantService: ApplicantsService, private flashMessage: FlashMessagesService, private router: Router) {

    }
    ngOnInit() {
        this.applicantService.getApplicants().subscribe(applicants => {
            this.applicants = applicants;
            this.totalApplicants = this.applicants.length;
        });

    }

    onSubmit({ value, valid }: { value: Applicant, valid: boolean }) {
        console.log(value, valid);
        if (!valid) {
            this.flashMessage.show('Please fill out the form correctly', { cssClass: 'alert-danger', timeout: 4000 });
        } else {
            this.applicantService.newApplicant(value);
            this.flashMessage.show('New Applicant added', { cssClass: 'alert-success', timeout: 4000 });
            this.router.navigate(['/']);
        }

    }
}


