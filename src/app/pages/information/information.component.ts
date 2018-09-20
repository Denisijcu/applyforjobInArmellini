import { Component, OnInit } from '@angular/core';
import { InformationService } from '../../shared/services/information.service';
import { Information } from '../../shared/models/information.model';
import {
    trigger,
    state,
    style,
    animate,
    keyframes,
    transition
} from '@angular/animations';
import { Observable } from 'rxjs/Observable';
@Component({

    selector: 'app-information',
    templateUrl: './information.component.html',
    styleUrls: ['./information.component.css'],
    animations: [
        trigger('informationState', [
            state('inactive', style({
                backgroundColor: '#eee',
                transform: 'scale(1)'
            })),
            state('active', style({
                backgroundColor: '#cfd8dc',
                transform: 'scale(1.1)'
            })),
            transition('inactive => active', animate('100ms ease-in')),
            transition('active => inactive', animate('100ms ease-out'))
        ])
    ]
})

export class InformationComponent implements OnInit {

    news: Information[] = [];

    show = false;
    stopCondition = false;


    constructor(
        private newsService: InformationService
    ) { }

    ngOnInit() {

        this.newsService.getNews().subscribe(news => {
            this.news = news;
        });


        Observable.interval(1000)
            .takeWhile(() => !this.stopCondition)
            .subscribe(i => {
                // This will be called every 10 seconds until `stopCondition` flag is set to true
                this.show = !this.show;
                // console.log( this.show );
            })



        state('inactive', style({
            backgroundColor: '#eee',
            transform: 'scale(1)'
        })),
            state('active', style({
                backgroundColor: '#cfd8dc',
                transform: 'scale(1.1)'
            }));
    }

    get stateNews() {
        return this.show ? 'active' : 'inactive';
    }

    toggle() {
        this.show = !this.show;

    }





}


