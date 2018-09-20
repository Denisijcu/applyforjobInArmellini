import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicantsService } from '../../shared/services/applicants.service';
import { Location } from '@angular/common';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Observable } from 'rxjs/Observable';
import { Applicant } from '../../shared/models/applicant';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
    selector: 'app-witness',
    templateUrl: './witness.html',
    styleUrls: ['./witness.css'],
})
export class SignWitnessComponent implements OnInit {
    applicant: Applicant;
    signWitness = false;
    signUrl = '';
    id = '';
    userApp = '';
    @ViewChild(SignaturePad) public signaturePad: SignaturePad;
    constructor(
        private applicantService: ApplicantsService,
        private location: Location,
        private route: ActivatedRoute,
        private flashMessage: FlashMessagesService
    ) {}



    ngOnInit() {

        this.id = this.route.snapshot.params['id'];


        this.applicantService.getApplicant(this.id).subscribe(applicant => {
          this.applicant = applicant;
          this.userApp = this.applicant.firstName + ' ' + this.applicant.lastName;
          console.log('XXXXXXXXXXXXXXX', this.applicant);
        });
    }

    OnClose() {
        this.location.back();
    }

    // tslint:disable-next-line:member-ordering
    public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
        'minWidth': 2,
        'canvasWidth': 340,
        'canvasHeight': 200
    };

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        // this.signaturePad is now available
        // this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    }
    OnSave() {
        // will be notified of szimek/signature_pad's onEnd event
        this.signUrl = this.signaturePad.toDataURL();
        this.applicant.withness = this.signaturePad.toDataURL();
        const now = new Date();
        this.applicant.datesignature = now.toString();
        this.applicantService.updateApplicant(this.applicant);
        this.location.back();
    }
    drawComplete2() {
        // will be notified of szimek/signature_pad's onEnd event
        console.log(this.signaturePad.toDataURL());
        this.signUrl = this.signaturePad.toDataURL();
      //  this.applicant.withness = this.signaturePad.toDataURL();
    }

    OnClear(): void {
        this.signaturePad.clear();
    }
    drawStart() {
        // will be notified of szimek/signature_pad's onBegin event
        console.log('begin drawing');
    }





}