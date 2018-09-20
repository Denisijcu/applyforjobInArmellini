import { Component, OnInit } from '@angular/core';
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
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css'],
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
export class EmailsComponent implements OnInit {
 emails: HREmail[];
  totalEmails: number;

  constructor(private emailService: HREmailService) {

  }
  ngOnInit() {
    this.emailService.getEmails().subscribe(emails => {
      this.emails = emails;
      this.totalEmails = this.emails.length;
      this.emails.map(data => {
      });

    });

  }
}
