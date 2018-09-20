import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Applicant } from '../../shared/models/applicant';
import { Aplicante } from '../../shared/models/aplicante';
import { Address } from '../../shared/models/address';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ApplicantsService } from '../../shared/services/applicants.service';
import { Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {
  @ViewChild(SignaturePad) public signaturePad: SignaturePad;
  @ViewChild('applicantForm') form: any;
  signUrl: string;

  // applyForm: FormGroup;
  positions = ['Drivers', 'Office Personel', 'Warehouse Crew', 'Mechanics'];
  learnedabouts = ['Advertisement', 'Employment Agency', 'Friend', 'Relative', 'Walk-In', 'Other...'];
  wherewantowork = ['Miami Florida Terminal', 'Palm City', 'Pierson Terminal', 'Doraville, GA',
  'California Terminal', ' Washington Terminal'];
  elemantaryschoolyears = ['4', '5', '6', '7', '8'];
  higthschoolyears = ['9', '10', '11', '12'];
  collegeschoolyears = ['1', '2', '3', '4'];
  professionalschoolyears = ['1', '2', '3', '4'];
  diplomaodegree = ['No', 'Yes'];
  dateOfApplication: Date = new Date();
  today: Date = new Date();

  aplicantes: Aplicante;
  applicant: Applicant;
  address: Address;

  files: FileList;
  url = '';
  alias = '';
  msj = 'Esto es una prueba';

  // variables to show

  applyf = 'Drivers';
  dateapply = new Date();
  learnabout = 'Advertisement';
  fnombre = 'Nombre';
  lapellido = 'Apellido';
  mnombre = 'Middle Name';
  phonenumber = '';
  ssnnumber = '';
  explain = 'Explain...';
  prueba = '3052272020';
  myssn = '771888856';
  photo: any = '';

  pagina = 1;
  page1 = true;
  page2 = false;
  page3 = false;
  page4 = false;
  page5 = false;
  page6 = false;
  page7 = false;
  page8 = false;
  page9 = false;
  page10 = false;
  other = false;
  bad = true;
  showForm = false;

  submitted = false;


  public label = 'Sign Above';
  public width = 300;
  public height = 300;

  btnNextEnable = true;

  fff = false;

  // upload Resume
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  uploadState: Observable<string>;

  constructor(private applicantService: ApplicantsService,
     private flashMessage: FlashMessagesService, private router: Router,
     private afStorage: AngularFireStorage
    ) { }

  public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 2,
    'canvasWidth': 340,
    'canvasHeight': 200
  };

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    // this.signaturePad is now available
    // this.signaturePad.set('minWidth', 1); // set szimek/signature_pad options at runtime
    // this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }
  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
    this.signUrl = this.signaturePad.toDataURL();
    console.log('signUrl', this.signUrl);
    this.applicant.signatureofapplicant = this.signaturePad.toDataURL();
  }
  drawComplete2() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
    this.signUrl = this.signaturePad.toDataURL();
    this.applicant.withness = this.signaturePad.toDataURL();
  }

  OnClear(): void {
    this.signaturePad.clear();
  }
  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }

  ngOnInit() {
    this.applicant = new Applicant(
      null, null, null, null, null, null,
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
      null, null, null, null, null, null, null, null, null, null, null
    );




    this.address = new Address(null, null, null, null, null, null);
    // this.city  = 'error';
  }


  test() {
    this.readDataToShow();
  }


  readDataToShow() {
    this.applyf = this.applicant.applyfor;
    this.dateapply = this.applicant.dateapply;
    this.learnabout = this.applicant.heardabouts;
    this.fnombre = this.applicant.firstName;
    this.lapellido = this.applicant.lastName;
    this.mnombre = this.applicant.middleName;

    this.phonenumber = this.applicant.phone;
    this.ssnnumber = this.applicant.ssn;

  }

  Onchange(event) {
    console.log('La position es', event.target.value);
    const apply4 = event.target.value;
    this.applicant.applyfor = apply4;
  }
  OnHeard(event) {
    const heardaboutus = event.target.value;
    this.applicant.heardabouts = heardaboutus;
    console.log(this.applicant.heardabouts);
    const c = this.applicant.heardabouts;
    if (c === 'Other...') { this.other = true; } else { this.other = false; }
  }

  OnWhereDoYouWantWork(event) {
    const wherewantWork = event.target.value;
    this.applicant.wherewanttowork = wherewantWork;
    this.btnNextEnable = false;
  }
  OnChangeDate() {
    this.applicant.dateapply = this.dateOfApplication;

  }

  onSubmit({ value, valid }: { value: Applicant, valid: boolean }) {

    console.log('valor del files', this.files);



    if (!valid) {
      // alert('Something wrong happened. Please check your data and submit again!!!');
      this.flashMessage.show('Please fill out the form correctly', { cssClass: 'alert-danger', timeout: 4000 });

    } else {

      if (this.files !== undefined) {
        const filesToUpload = this.files;
        const filesIdx = _.range(filesToUpload.length);
        _.each(filesIdx, (idx) => {
          this.aplicantes = new Aplicante(filesToUpload[idx]);
          this.aplicantes['firstName'] = this.applicant.firstName;
          this.aplicantes['lastName'] = this.applicant.lastName;
          this.applicantService.uploadFile(this.aplicantes, this.applicant);
          this.flashMessage.show('Application successfuly done!... Thank you', { cssClass: 'alert-success', timeout: 4000 });
          this.router.navigate(['/']);
        });
      } else {
        this.applicantService.newApplicant(this.applicant);
        this.flashMessage.show('Application successfuly done!... Thank you', { cssClass: 'alert-success', timeout: 4000 });
        this.router.navigate(['/']);

      }

    }
  }



  onKeyPHONE(event: any) {
    console.log(event);
    this.btnNextEnable = false;
    this.applicant.phone = '(' + this.applicant.phone.substr(0, 3) + ') ' +
         this.applicant.phone.substr(3, 3) + '-' + this.applicant.phone.substr(6, 4);
  }

  onKeySSN(event: any) {
    console.log(event);
    this.applicant.ssn = this.applicant.ssn.substr(0, 3) + '-' + this.applicant.ssn.substr(3, 2) + '-' + this.applicant.ssn.substr(5, 4);
  }


  OnClickBtnNext(): void {
    console.log('pagina' + this.pagina);
    if (this.pagina === 4) { this.btnNextEnable = false; } else { this.btnNextEnable = true; }
    if (this.pagina === 8) { this.btnNextEnable = false; }
    this.pagina = ++this.pagina;
    if (this.pagina > 10) { this.pagina = 1; this.submitted = true; }
    this.unableTabPage();
    switch (this.pagina) {
      case 1: { this.page1 = true; break; }
      case 2: { this.page2 = true; break; }
      case 3: { this.page3 = true; break; }
      case 4: { this.page4 = true; break; }
      case 5: { this.page5 = true; break; }
      case 6: { this.page6 = true; break; }
      case 7: { this.page7 = true; break; }
      case 8: { this.page8 = true; break; }
      case 9: { this.page9 = true; break; }
      case 10: { this.page10 = true; break; }
      default: {
        console.log('Something wrong happened!!!');
      }
    }
  }

  unableTabPage() {
    this.page1 = false;
    this.page2 = false;
    this.page3 = false;
    this.page4 = false;
    this.page5 = false;
    this.page6 = false;
    this.page7 = false;
    this.page8 = false;
    this.page9 = false;
    this.page10 = false;
  }

  OnClickBtnBack(): void {
    this.pagina = this.pagina - 1;
    this.btnNextEnable = true;
    if (this.pagina < 1) { this.pagina = 1; }
    this.unableTabPage();
    switch (this.pagina) {
      case 1: { this.page1 = true; break; }
      case 2: { this.page2 = true; break; }
      case 3: { this.page3 = true; break; }
      case 4: { this.page4 = true; break; }
      case 5: { this.page5 = true; break; }
      case 6: { this.page6 = true; break; }
      case 7: { this.page7 = true; break; }
      case 8: { this.page8 = true; break; }
      case 9: { this.page9 = true; break; }
      case 10: { this.page10 = true; break; }
      default: { console.log('Something wrong happened!!!'); }
    }
  }


  OnShowForm() {
    this.readDataToShow();
    this.showForm = !this.showForm;
    if (this.applicant.firstName === null) { this.bad = true; } else { this.bad = false; }
    if (this.applicant.lastName === null) { this.bad = true; } else { this.bad = false; }
    if (this.applicant.phone === null) { this.bad = true; } else { this.bad = false; }
  }
  onBack() {
    this.showForm = false;
  }

  handleFiles(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.files = event.target.files;
      // this.applicant.file = event.target.files;
      this.applicant.url = this.url;
       // tslint:disable-next-line:no-shadowed-variable
       reader.onload = (event: any) => {
        this.photo = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

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
  checkYesQ9(event: any) { if (event.target.checked) { this.applicant.q9n = false; this.btnNextEnable = false; } }
  checkNoQ9(event: any) { if (event.target.checked) { this.applicant.q9y = false; this.btnNextEnable = false; } }

  OnElementarySchool(event: any) { this.applicant.yearscompleted1 = event.target.value; this.btnNextEnable = false; }
  OnHightSchool(event: any) { this.applicant.yearscompleted2 = event.target.value; this.btnNextEnable = false; }
  OnCollege(event: any) { this.applicant.yearscompleted3 = event.target.value; this.btnNextEnable = false; }
  OnProfessional(event: any) { this.applicant.yearscompleted4 = event.target.value; this.btnNextEnable = false; }

  OnDiploma1(event: any) { this.applicant.diplomadegree1 = event.target.value; }
  OnDiploma2(event: any) { this.applicant.diplomadegree2 = event.target.value; }
  OnDegree1(event: any) { this.applicant.diplomadegree3 = event.target.value; }
  OnDegree2(event: any) { this.applicant.diplomadegree4 = event.target.value; }
  // OnCourses(event: any) { console.log(this.applicant); }


  checkYesTraininingMilitary(event: any) { if (event.target.checked) { this.applicant.usamilitaryno = false; this.btnNextEnable = false; } }
  checkNoTraininingMilitary(event: any) { if (event.target.checked) { this.applicant.usamilitaryyes = false; this.btnNextEnable = false; } }

  onKeyEmergencyPHONE(event: any) {
    this.btnNextEnable = false;
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
    this.btnNextEnable = false;
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


  onKeyStart1(event: any) { this.applicant.start1 = '$ ' + this.applicant.start1; this.btnNextEnable = false; }
  onKeyFinal1(event: any) { this.applicant.final1 = '$ ' + this.applicant.final1; this.btnNextEnable = false; }
  onKeyStart2(event: any) { this.applicant.start2 = '$ ' + this.applicant.start2; this.btnNextEnable = false; }
  onKeyFinal2(event: any) { this.applicant.final2 = '$ ' + this.applicant.final2; this.btnNextEnable = false; }
  onKeyStart3(event: any) { this.applicant.start3 = '$ ' + this.applicant.start3; }
  onKeyFinal3(event: any) { this.applicant.final3 = '$ ' + this.applicant.final3; }
  onKeyStart4(event: any) { this.applicant.start4 = '$ ' + this.applicant.start4; }
  onKeyFinal4(event: any) { this.applicant.final4 = '$ ' + this.applicant.final4; }
  onKeyStart5(event: any) { this.applicant.start5 = '$ ' + this.applicant.start5; }
  onKeyFinal5(event: any) { this.applicant.final5 = '$ ' + this.applicant.final5; }

  // upload resume
  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
    this.downloadURL = this.task.downloadURL();
    this.downloadURL.subscribe(location => {
    this.applicant.resumeurl = location;
        console.log(location);
    });
}

}
