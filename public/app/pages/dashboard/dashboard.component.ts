import { Component, OnInit } from '@angular/core';
import { ApplicantsService} from '../../shared/services/applicants.service';

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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
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
export class DashboardComponent implements OnInit {
    applicants: Applicant[];
    totalApplicants: number;
    constructor( private applicantService: ApplicantsService) {

    }
    ngOnInit() {
        this.applicantService.getApplicants().subscribe ( applicants =>
            {
                this.applicants = applicants;
                this.totalApplicants = this.applicants.length;
            });

    }
}
