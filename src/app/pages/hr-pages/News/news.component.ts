import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location} from '@angular/common';
import { FlashMessagesService } from 'angular2-flash-messages';
import { HRNewsService } from '../../../shared/services/hr-services/news.service';
import { News } from '../../../shared/models/hr-models/news.model';

@Component({

    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css']
})

export class HRNewsComponent implements OnInit {

    news: News[] = [];

    constructor(
        private router: Router,
        private newsService: HRNewsService,
        private flashMessage: FlashMessagesService,
        private location: Location
    ) { }

    ngOnInit() {

    this.newsService.getNews().subscribe(news => {
             this.news = news;
        });
    }

    onEdit(value) {
       // this.newsService.updateNews(value);
        this.router.navigate(['/']);
    }

    submit(f) {
    }
    onBack() {
        this.location.back();
    }

}





