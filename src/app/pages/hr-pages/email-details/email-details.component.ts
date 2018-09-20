import { Component, OnInit } from '@angular/core';
import { HREmailService } from '../../../shared/services/hr-services/emails.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import {
    trigger,
    state,
    style,
    animate,
    keyframes,
    transition
} from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { HREmail } from '../../../shared/models/hr-models/email.model';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'app-email-details',
    templateUrl: './email-details.component.html',
    styleUrls: ['./email-details.component.css'],
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
export class EmailDetailsComponent implements OnInit {
    public email: HREmail;
    id = '';

    constructor(private emailService: HREmailService,
        private router: Router,
        private route: ActivatedRoute,
        private flashMessage: FlashMessagesService, private location: Location,
    ) {

    }

    ngOnInit() {
        this.email = {
            id: '',
            name: '',
            subject: '',
            phone: '',
            email: '',
            date: '',
            message: '',
            datea: '',
            emaila: '',
            answer: ''
        };
        this.id = this.route.snapshot.params['id'];
        this.emailService.getEmail(this.id).subscribe(email => {
            this.email = email;
        });

    }

    onDelete() {
        this.emailService.deletEmail(this.email);
        this.router.navigate(['/emails']);
    }

    onBack() {
        this.location.back();
    }
}
