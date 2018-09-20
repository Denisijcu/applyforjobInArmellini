import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ApplicantsService } from '../../shared/services/applicants.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs/Observable';
import { Application } from '../../shared/models/application.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
@Component({
    selector: 'app-edit-applicant',
    templateUrl: './edit-applicant.component.html',
    styleUrls: ['./edit-applicant.component.css']
})
export class EditapplicantComponent implements OnInit {
    @ViewChild(SignaturePad) public signaturePad: SignaturePad;
    @ViewChild('applicantForm') form: any;
    signUrl: string;

    id: string;
    positions = ['', '  Drivers', '  Office Personel', '  Warehouse Crew', '  Mechanics'];
    elemantaryschoolyears = ['4', '5', '6', '7', '8'];
    higthschoolyears = ['9', '10', '11', '12'];
    collegeschoolyears = ['1', '2', '3', '4'];
    professionalschoolyears = ['1', '2', '3', '4'];
    diplomaodegree = ['No', 'Yes'];
    pos = '';
    selected = false;

    applicant: Application = {
        id: '',
        email: '',
        applyfor: '',
        dateapply: new Date(),
        heardabouts: '',
        firstName: '',
        lastName: '',
        middleName: '',
        number: '',
        street: '',
        city: '',
        county: '',
        state: '',
        zipcode: '',
        phone: '',
        ssn: '',
        q1y: false,
        q1n: false,
         q2y: false,
         q2n: false,
         ifyes: new Date(),
         q3y: false,
         q3n: false,
         ifemployedwhenandwhere: '',
         q4y: false,
         q4n: false,
         q5y: false,
         q5n: false,
         q6y: false,
         q6n: false,
         availabetowork: new Date(),
         fulltime: false,
         parttime: false,
         shiftwork: false,
         temporary: false,
         q7y: false,
         q7n: false,
         q8y: false,
         q8n: false,
         q9y: false,
         q9n: false,
         ifconvited: '',
         elementaryname: '',
         hightschoolname: '',
         collegename: ' ',
         professionalname: ' ',
         yearscompleted1: 0,
         yearscompleted2: 0,
         yearscompleted3: 0,
         yearscompleted4: 0,
         diplomadegree1: false,
         diplomadegree2: false,
         diplomadegree3: false,
         diplomadegree4: false,
         courses: ' ',
         trainings: '',
         honors: '',
         moreinfo: '',
         speakfluent: '',
         speakgood: '',
         speakfail: '',
         readfluent: '',
         readgood: '',
         readfail: '',
         writefluent: '',
         writegood: '',
         writefail: '',
         emergencyname: '',
         emergencyaddress: '',
         emergencynumber: '',
         usamilitaryyes: false,
         usamilitaryno: false,
         usamilataryexplain: '',
         employer1name: '',
         employer2name: '',
         employer3name: '',
         employer4name: '',
         employer5name: '',
         employer1address: '',
         employer2address: '',
         employer3address: '',
         employer4address: '',
         employer5address: '',
         from1: ' ',
         from2: '',
         from3: '',
         from4: '',
         from5: '',
         to1: '',
         to2: '',
         to3: '',
         to4: '',
         to5: '',
         wperformed1: '',
         wperformed2: '',
         wperformed3: '',
         wperformed4: '',
         wperformed5: '',
         employer1number: '',
         employer2number: '',
         employer3number: '',
         employer4number: '',
         employer5number: '',
         start1: '',
         start2: '',
         start3: '',
         start4: '',
         start5: '',
         final1: '',
         final2: '',
         final3: '',
         final4: '',
         final5: '',
         jobtitle1: '',
         jobtitle2: '',
         jobtitle3: '',
         jobtitle4: '',
         jobtitle5: '',
         supervisor1: '',
         supervisor2: '',
         supervisor3: '',
         supervisor4: '',
         supervisor5: '',
         reasonforleaving1: '',
         reasonforleaving2: '',
         reasonforleaving3: '',
         reasonforleaving4: '',
         reasonforleaving5: '',
         skillandqualifications: '',
         signatureofapplicant: '',
         datesignature: '',
    };


    constructor(
        private applicantService: ApplicantsService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private flashMessage: FlashMessagesService) { }


        public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
            'minWidth': 2,
            'canvasWidth': 340,
            'canvasHeight': 200
          };

          // tslint:disable-next-line:use-life-cycle-interface
          ngAfterViewInit() {

          }
          drawComplete() {
            // will be notified of szimek/signature_pad's onEnd event
            console.log(this.signaturePad.toDataURL());
            this.signUrl = this.signaturePad.toDataURL();
            console.log('signUrl', this.signUrl);
            this.applicant.signatureofapplicant = this.signaturePad.toDataURL();
            const now = new Date();
            this.applicant.datesignature = now.toString();
          }

          OnClear(): void {
              console.log('Estoy borrando');
          this.signaturePad.clear();
          }
          drawStart() {
            // will be notified of szimek/signature_pad's onBegin event
            console.log('begin drawing');
          }


    ngOnInit() {

        // Get id from url
         this.id = this.route.snapshot.params['id'];
        // Get client
        this.applicantService.getDataUser().subscribe(applicant => {
            applicant.map((data) => {
                this.id = data.id;
                this.applicant = data;
                console.log(this.applicant);
            });
        });
    }

    Onchange(event) {
        console.log('La position es', event.target.value);
        const apply4 = event.target.value;
        this.applicant.applyfor = apply4;
        this.selected = true;
    }

    onBack() { this.location.back(); }

    onSubmit({ value, valid }: { value: Application, valid: boolean }) {
        if (!valid) {
            this.flashMessage.show('Please fill out the form correctly', {
                cssClass: 'alert-danger', timeout: 4000
            });
        } else {
            // Add id to client
            value.id = this.id;
            // Update client
            this.applicantService.updateApplicant(this.applicant);
            this.flashMessage.show('Application updated', {
                cssClass: 'alert-success', timeout: 4000
            });
           this.location.back();
        }
    }



    onKeyPHONE(event: any) {
        console.log(event);
        this.applicant.phone = '(' + this.applicant.phone.substr(0, 3) + ') ' +
            this.applicant.phone.substr(3, 3) + '-' + this.applicant.phone.substr(6, 4);
    }
    // this.router.navigate(['/myapplication']);

  checkYesQ1(event: any) { if (event.target.checked) { this.applicant.q1n = false; } }
  checkNoQ1(event: any) { if (event.target.checked) { this.applicant.q1y = false; } }
  checkYesQ2(event: any) { if (event.target.checked) { this.applicant.q2n = false; } }
  checkNoQ2(event: any) { if (event.target.checked) { this.applicant.q2y = false; } }
  checkYesQ3(event: any) { if (event.target.checked) { this.applicant.q3n = false; } }
  checkNoQ3(event: any) { if (event.target.checked) { this.applicant.q3y = false; } }
  checkYesQ4(event: any) { if (event.target.checked) { this.applicant.q4n = false; } }
  checkNoQ4(event: any) { if (event.target.checked) { this.applicant.q4y = false; } }
  checkYesQ5(event: any) { if (event.target.checked) { this.applicant.q5n = false; } }
  checkNoQ5(event: any) { if (event.target.checked) { this.applicant.q5y = false; } }
  checkYesQ6(event: any) { if (event.target.checked) { this.applicant.q6n = false; } }
  checkNoQ6(event: any) { if (event.target.checked) { this.applicant.q6y = false; } }
  checkYesQ7(event: any) { if (event.target.checked) { this.applicant.q7n = false; } }
  checkNoQ7(event: any) { if (event.target.checked) { this.applicant.q7y = false; } }
  checkYesQ8(event: any) { if (event.target.checked) { this.applicant.q8n = false; } }
  checkNoQ8(event: any) { if (event.target.checked) { this.applicant.q8y = false; } }
  checkYesQ9(event: any) { if (event.target.checked) { this.applicant.q9n = false;  } }
  checkNoQ9(event: any) { if (event.target.checked) { this.applicant.q9y = false; } }

  OnElementarySchool(event: any) { this.applicant.yearscompleted1 = event.target.value;  }
  OnHightSchool(event: any) { this.applicant.yearscompleted2 = event.target.value; }
  OnCollege(event: any) { this.applicant.yearscompleted3 = event.target.value; }
  OnProfessional(event: any) { this.applicant.yearscompleted4 = event.target.value;  }

  OnDiploma1(event: any) { this.applicant.diplomadegree1 = event.target.value; }
  OnDiploma2(event: any) { this.applicant.diplomadegree2 = event.target.value; }
  OnDegree1(event: any) { this.applicant.diplomadegree3 = event.target.value; }
  OnDegree2(event: any) { this.applicant.diplomadegree4 = event.target.value; }
  // OnCourses(event: any) { console.log(this.applicant); }


  checkYesTraininingMilitary(event: any) { if (event.target.checked) { this.applicant.usamilitaryno = false;  } }
  checkNoTraininingMilitary(event: any) { if (event.target.checked) { this.applicant.usamilitaryyes = false; } }

  /*
  onKeyEmergencyPHONE(event: any) {
    this.applicant.emergencynumber = '(' + this.applicant.emergencynumber.substr(0, 3) + ') '
      + this.applicant.emergencynumber.substr(3, 3) + '-' + this.applicant.emergencynumber.substr(6, 4);
  }

  onKeyEmloyerPHONE(event: any) {
    this.applicant.employer1number = '(' + this.applicant.employer1number.substr(0, 3) + ') ' +
      this.applicant.employer1number.substr(3, 3) + '-' + this.applicant.employer1number.substr(6, 4);
  }
  onKeyEmloyerPHONE2(event: any) {
    this.applicant.employer2number = '(' + this.applicant.employer2number.substr(0, 3) + ') ' +
      this.applicant.employer2number.substr(3, 3) + '-' + this.applicant.employer2number.substr(6, 4);

  }
  onKeyEmloyerPHONE3(event: any) {

    this.applicant.employer3number = '(' + this.applicant.employer3number.substr(0, 3) + ') ' +
      this.applicant.employer3number.substr(3, 3) + '-' + this.applicant.employer3number.substr(6, 4);
  }
  onKeyEmloyerPHONE4(event: any) {
    this.applicant.employer4number = '(' + this.applicant.employer4number.substr(0, 3) + ') ' +
      this.applicant.employer4number.substr(3, 3) + '-' + this.applicant.employer4number.substr(6, 4);
  }
  onKeyEmloyerPHONE5(event: any) {
    this.applicant.employer5number = '(' + this.applicant.employer5number.substr(0, 3) + ') ' +
      this.applicant.employer5number.substr(3, 3) + '-' + this.applicant.employer5number.substr(6, 4);
  }

*/
}
