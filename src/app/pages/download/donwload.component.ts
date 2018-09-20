import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ApplicantsService } from '../../shared/services/applicants.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Applicant } from '../../shared/models/hr-models/applicant.model';

import { FlashMessagesService } from 'angular2-flash-messages';
// import * as jsPDF from 'jspdf';



@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css'],
})
export class DownloadComponent implements OnInit {
  applicants: Applicant[];
  totalApplicants: number;
  id: string;
  applicant: Applicant;
  cantidad = 0;
  download = false;
  fix = false;

  constructor(private applicantService: ApplicantsService,
    private router: Router, private route: ActivatedRoute, private flashMessage: FlashMessagesService, private location: Location,
  ) {
    this.applicant = new Applicant(null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null
    );
  }
  ngOnInit() {
     this.applicantService.getDataUser().subscribe(applicant => {
      console.log(applicant);
      this.cantidad = applicant.length;
      applicant.map ( data => {
        this.applicant = data;
        console.log('Los Datos', this.applicant);
      });
    });

  }
  onBack(): void {
    this.location.back();
  }
  onClear(): void {
      this.download = false;
  }

  public donwloadPdf(): void {
   // this.download = true;
    const download = xepOnline.Formatter.Format('content', { render: 'download' });
    return download;
  }

  onDoIt(): void {
    const download = xepOnline.Formatter.Format('content', { render: 'download' });
    return download;
  }
}
