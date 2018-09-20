import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { EmailService } from '../../shared/services/email.service';
import { Email } from '../../shared/models/email.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

 // @ViewChild('emailForm') form: any;
  

  constructor(private emailService: EmailService, 
    private flashMessage: FlashMessagesService,
    private router: Router
    
) { }

  email: Email = {
    id: '',
    email: '',
    message: '',
    name: '',
    phone: '',
    date: new Date(),
  };


  ngOnInit() {

   

  }

 
 //{value, valid}: {value: Email, valid: boolean}
 sendMsg({value, valid}: {value: Email, valid: boolean}){

    console.log(value, valid);
  
    
    if(!valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Add new client
      this.emailService.addNewEmail(this.email);
      this.clearFields();
      // Show message
      this.flashMessage.show('Your Email Was Sent', {
        cssClass: 'alert-success', timeout: 4000
      });
      // Redirect to dash
      this.router.navigate(['/']);
    }

    console.log(this.email);
  }
  


  clearFields(){
   this.email.name = '';
   this.email.message = '';
   this.email.phone = '';
   this.email.email = '';
  }

}

