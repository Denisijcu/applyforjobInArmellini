import { Component, ViewChild, OnInit } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import {
  trigger,
  state,
  style,
  animate,
  keyframes,
  transition
} from '@angular/animations';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
export class HomeComponent implements OnInit {
 
  stopCondition = false;
  show = false;
  userUrl = '';
 
  constructor() { }

  ngOnInit() {
    Observable.interval(1000)
    .takeWhile(() => !this.stopCondition)
    .subscribe(i => { 
        // This will be called every 10 seconds until `stopCondition` flag is set to true
            this.show = !this.show;
       // console.log( this.show );
    })
  }
  get stateName() {
    return this.show ? 'show' : 'hide'
  }

  toggle() {
    this.show = !this.show;

  }

}
