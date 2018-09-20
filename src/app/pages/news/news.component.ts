import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { PositionsService } from '../../shared/services/positions.service';
import { ApplicantsService} from '../../shared/services/applicants.service';
import { Position } from '../../shared/models/position.model';
import { Observable } from 'rxjs/Observable';
import {
    trigger,
    state,
    style,
    animate,
    keyframes,
    transition
} from '@angular/animations';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css'],
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
export class NewsComponent implements OnInit {

    news: Position[];
    total = 0;

    show = false;
    stopCondition = false;
    si = true;
    myEmail = '';

    constructor(private applicantService: ApplicantsService, private newsService: PositionsService, private router: Router) { }
    ngOnInit() {
       this.myEmail = this.applicantService.myEmail;
       console.log(' My Email', this.myEmail);
        this.newsService.getPositions().subscribe(news => {
            this.news = news;
            this.total = this.news.length;
            this.news.map(data => {
                console.log('Mis datos', data);
            });

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
        this.router.navigate(['/apply']);
      }

}
