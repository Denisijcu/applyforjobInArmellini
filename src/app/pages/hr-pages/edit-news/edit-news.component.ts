import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HRNewsService } from '../../../shared/services/hr-services/news.service';
import { Observable } from 'rxjs/Observable';
import { News } from '../../../shared/models/hr-models/news.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'app-edit-news',
    templateUrl: './edit-news.component.html',
    styleUrls: ['./edit-news.component.css'],
})
export class EditNewsComponent implements OnInit {

    id: string;
    newsd: News = {
        id: '',
        news1: '',
        news2: '',
        news3: '',
        date: '',
    };

   

    constructor(private newsService: HRNewsService,
        private flashMessage: FlashMessagesService,
        private router: Router, private location: Location,
        private route: ActivatedRoute
    ) {

    }
    ngOnInit() {

        console.log('ON INIT ', this.newsd);

        this.id = this.route.snapshot.params['id'];
        this.newsService.getNew(this.id).subscribe(newsx => {
            this.newsd = newsx;
            console.log('LAS NOTICIAS SON', this.newsd);
        });




    }


    onSubmit({ value, valid }: { value: Position, valid: boolean }) {

        console.log(value, valid);


        if (!valid) {
            // Show error
            this.flashMessage.show('Please fill out the form correctly', {
                cssClass: 'alert-danger', timeout: 4000
            });
        } else {
            // Add new client
            const now = new Date();
            this.newsd.date = now.toString();
            this.newsService.updateNews(this.newsd);
            this.clearFields();
            // Show message
            this.flashMessage.show('News Was Posted', {
                cssClass: 'alert-success', timeout: 4000
            });
            // Redirect to dash
            this.location.back();
        }

        console.log(this.newsd);
    }

  

    onBack() {
        this.location.back();
    }
  
    clearFields() {
        this.newsd.news1 = '';
        this.newsd.news2 = '';
        this.newsd.news3 = '';
    }
}
