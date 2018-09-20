import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../shared/services/auth.service';
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
// import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
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
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  loogedInUser: string;
  showRegister: boolean;
  hr = false;
  // hr = true;
  stopCondition = false;
  show = false;
  si = false;
  guestShow = false;




 // iframe_html: any;
// youtubeUrl = 'https://youtu.be/3RVYDPyKyb8';

  constructor(
    private router: Router,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private applicantService: ApplicantsService,
  //  private embedService: EmbedVideoService
  ) {
   // this.iframe_html = this.embedService.embed(this.youtubeUrl);
  }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loogedInUser = auth.email;
        this.applicantService.myEmail = this.loogedInUser;
        if (this.loogedInUser === 'msterling@armellini.com') { this.hr = true; } else {this.hr = false; }
       // console.log('Logger in User', this.loogedInUser, 'pero MyEmail is'+ this.applicantService.myEmail);

        this.si = true;
      } else {
        this.isLoggedIn = false;
      }
    });



    Observable.interval(1000)
      .takeWhile(() => !this.stopCondition)
      .subscribe(i => {
        // This will be called every 10 seconds until `stopCondition` flag is set to true
        this.show = !this.show;
        // console.log( this.show );
      });

  }

  get stateName() {
    return this.show ? 'show' : 'hide';
  }

  toggle() {
    this.show = !this.show;

  }

  onApply() {
    this.si = false;
    if (this.applicantService.myEmail == null) {
      this.guestShow = true;
    } else {
      this.router.navigate(['/apply']);
    }
  }
  onBack() {
    this.guestShow = false;
  }
  onRegister() {
    this.logout();
    this.guestShow = false;
    this.router.navigate(['/login']);
  }
  onNews() {
    this.si = false;
    this.router.navigate(['/news']);
  }

  onNewshr() {
    this.si = false;
    this.router.navigate(['/newshr']);
  }

  onMyapplication() {
    this.si = false;
    this.router.navigate(['/myapplication']);
  }
  onSendEmail() {
    this.si = false;
    this.router.navigate(['/send-email']);
  }
  logout() {
    this.si = false;
    this.authService.logout();
    this.flashMessage.show('You are now logged out', { cssClass: 'alert-success', timeout: 4000 });
    this.router.navigate(['/']);
  }


}
