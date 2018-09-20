import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HRApplicantsService } from '../../../shared/services/hr-services/applicants.service';
import { HREmailService } from '../../../shared/services/hr-services/emails.service';

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

@Component({
  selector: 'app-applicants',
  templateUrl: './answer-email.component.html',
  styleUrls: ['./answer-email.component.css'],
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
export class AnswerEmailComponent implements OnInit {

  dataModel: any = null;
  test = '';
  email: HREmail;
  id = '';
  userName =  '';

  constructor(private emailService: HREmailService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
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

  handleEvent(event) {
    console.log(this.dataModel);
  }

  onSend() {

    this.email.answer = this.dataModel;
    const now = new Date();
    this.email.datea = JSON.stringify(now);
    this.emailService.updateEmail(this.email);
    this.router.navigate(['/emails']);
  }

  onDelete() {
    this.emailService.deletEmail(this.email);
    this.router.navigate(['/emails']);
  }

  onBack() {
    this.location.back();
  }




}
