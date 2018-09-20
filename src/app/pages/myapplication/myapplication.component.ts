import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ApplicantsService } from '../../shared/services/applicants.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Applicant } from '../../shared/models/hr-models/applicant.model';

import { FlashMessagesService } from 'angular2-flash-messages';
// import * as jsPDF from 'jspdf';



@Component({
  selector: 'app-myapplication',
  templateUrl: './myapplication.component.html',
  styleUrls: ['./myapplication.component.css'],
})
export class MyapplicationComponent implements OnInit {
  applicants: Applicant[];
  totalApplicants: number;
  id: string;
  applicant: Applicant;
  print = false;
  cantidad = 0;

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

  public donwloadPdf() {
   // this.print = true;
   // const download = xepOnline.Formatter.Format('content', { render: 'download' });
   // this.print = false;
    // return download;
    this.router.navigate(['/download']);
  }
  onPrint() {
    this.print = true;
    let printContents, popupWin;
    printContents = document.getElementById('content').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
       <html>
           <head>
               <title>Print tab</title>
               <style>
               .container {border-radius: 8px;}
               h1,h2 { font-size: 130%; font-weight: bold; margin: 3%;}
               label { font-size: 100%;}
               input { font-size: 100%;}
               .ng-valid[required], .ng-valid.required  {
                   border-left: 5px solid #42A948; /* green */
               }

               .ng-invalid:not(form)  {
                 border-left: 5px solid #a94442; /* red */
               }
               .card {
                 border: 1px solid rgb(12, 13, 14);
                 box-shadow: 0 4px 8px 0 black;
                 color: black;
                 padding: 15px;
               }
               .address {
                 font-size: 10px;
                 font-color: black;
                 font-family: arial;

               }
               p { font-size: 100%; margin-left:4%; text-align: justify;}
               table {
               text-align: left;
               margin-left: 3px;
               margin-right: 15px;
               width: 100%;
               background-color: white
               }

               h4 {
                 font-size: 120% ;
                 margin: 2%;
                 font-family: cursive;
                 font-weight: bold;
               }
               #tabla-Education {
                 font-size: 18px;
                 margin: 0px;
                 font-family: cursive;
                 font-weight: bold;
               }
               hr {
                 border: 1px solid black;
               }

               .break { page-break-before: always; }

               .lbl{
                font-size:1.5vw;
                color:black;
                 margin-top: 0%;
                 margin-bottom: 1%;
                 margin-right:60%;
            }
              </style>
           </head>
           <body onload="window.print();window.close()">${printContents}
           </body>
       </html>`
    );
    this.print = false;
    popupWin.document.close();
  }


  onEdit() {
    this.router.navigate(['applicant/edit']);
  }


  onDelete() {
    if (confirm('Are your sure?')) {
      this.applicantService.deleteApplicant(this.applicant);
      this.flashMessage.show('Application removed', {
        cssClass: 'alert-success', timeout: 4000
      });
    }
  }

}
