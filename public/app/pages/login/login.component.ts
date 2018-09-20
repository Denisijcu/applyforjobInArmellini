import { Component, OnInit } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../../shared/models/user';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../shared/services/auth.service';


import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;


  errorMsg: string;
  msg = '';
  confirme = '';
  match = true;


  constructor(
    private authService: AuthService, private router: Router, private flashMessage: FlashMessagesService
  ) { }


  signIn() {
    this.authService.login(this.email, this.password)
      .then(res => {
        this.flashMessage.show('You are now logged in', {
          cssClass: 'alert-success', timeout: 4000
        });
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.flashMessage.show(err.message, {
          cssClass: 'alert-danger', timeout: 4000
        });
      });
  }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    } );
   }

  OnChange() {
    console.log('Esto cambia');
    console.log('confirm es:', this.confirme + ' y email es:', this.password);
    if (this.password !== this.confirme) {
      this.match = false;
    } else {
      this.match = true;
    }
    console.log('match es:', this.match);
  }

  onSubmit() {

    this.authService.register(this.email, this.password)
      .then(res => {
        this.flashMessage.show('You are now registered and logged in', {
          cssClass: 'alert-success', timeout: 3000
        });
        this.router.navigate(['/apply']);
      })
      .catch(err => {
        this.flashMessage.show(err.message, {
          cssClass: 'alert-danger', timeout: 3000
        });
      });
  }


  login() {
    if (this.authService.loginGoogle()) {
      this.flashMessage.show('You are now log in with your google account', { cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/']);
    }
  }


  guest() {
    if (this.authService.guest()) {
      this.flashMessage.show('You are now log in like a guest', { cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/']);
    }
  }
}
