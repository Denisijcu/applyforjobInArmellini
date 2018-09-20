import { Component, OnInit } from '@angular/core';
import { ApplicantsService} from '../../shared/services/applicants.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  keyframes,
  transition
} from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { Applicant} from '../../shared/models/applicant';

import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.css'],
   animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1
      })),
      state('hide',   style({
        opacity: 0
      })),
      state('move', style({
        transform: 'translateX(-100%)',
      })),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('1000ms ease-in')),
      transition('* => move',
      animate('2000ms', keyframes([
        style({transform: 'translateX(0)    rotateY(0)',        offset: 0}),
        style({transform: 'translateX(50%)  rotateY(90deg)',    offset: 0.33}),
        style({transform: 'translateY(-75%) rotateY(180deg)',   offset: 0.66}),
        style({transform: 'translateX(-99%)',                  offset: 1.0})
      ])
    ))
    ])
  ]
})
export class ApplicantDetailsComponent implements OnInit {
    applicants: Applicant[];
    totalApplicants: number;
    id: string;
    applicant: Applicant;
    
    constructor( private applicantService: ApplicantsService, private router: Router, private route: ActivatedRoute, private flashMessage: FlashMessagesService) {

    }
    ngOnInit() {
        this.id = this.route.snapshot.params['id'];


        this.applicantService.getApplicant(this.id).subscribe ( applicant =>
            {
               this.applicant = applicant;
               console.log('XXXXXXXXXXXXXXX',this.applicant);
            });

    }
}
