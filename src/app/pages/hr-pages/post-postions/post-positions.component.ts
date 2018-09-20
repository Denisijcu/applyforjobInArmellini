import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { HRPositionsService} from '../../../shared/services/hr-services/positions.service';

import {
  trigger,
  state,
  style,
  animate,
  keyframes,
  transition
} from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { Position} from '../../../shared/models/hr-models/position.model';

@Component({
  selector: 'app-post-positions',
  templateUrl: './post-positions.component.html',
  styleUrls: ['./post-positions.component.css'],
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
export class PostPositionsComponent implements OnInit {
    positions: Position[] = [];
    totalPositions: number;
    constructor( private positionService: HRPositionsService, private location: Location) {

    }
    ngOnInit() {
        this.positionService.getPositions().subscribe ( positions => {
                this.positions = positions;
                this.totalPositions = this.positions.length;
            });
    }

    onBack() {
      this.location.back();
    }
}
