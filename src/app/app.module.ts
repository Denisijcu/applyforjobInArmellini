import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
// import { EmbedVideo } from 'ngx-embed-video';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { SignaturePadModule } from 'angular2-signaturepad';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';
import { appRoutes} from './routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { ApplyComponent } from './pages/apply/apply.component';
import { HeadComponent} from './pages/phead/head.component';
import { FootComponent} from './pages/pfoot/foot.component';
import { LoginComponent} from './pages/login/login.component';
import { MyapplicationComponent } from './pages/myapplication/myapplication.component';
import { DownloadComponent} from './pages/download/donwload.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent} from './pages/side-bar/sidebar.component';
import { NewsComponent} from './pages/news/news.component';
import { InformationComponent} from './pages/information/information.component';
import { SendEmailComponent} from './pages/SendEmails/send-email.component';
import { SignWitnessComponent } from './pages/witness/witness';
import { NofoundComponent} from './pages/nofound/nofound.component';

// component of hr-module
import { ApplicantsComponent} from './pages/hr-pages/applicants/applicants.component';
import { ApplicantDetailsComponent} from './pages/hr-pages/applicantDetailsComponent/applicantdetails.component';
import { EmailsComponent} from './pages/hr-pages/emails/emails.component';
import { EmailDetailsComponent} from './pages/hr-pages/email-details/email-details.component';
import { AnswerEmailComponent} from './pages/hr-pages/answer-email/answer-email.component';
import { PostPositionsComponent} from './pages/hr-pages/post-postions/post-positions.component';
import { AddPostPositionComponent} from './pages/hr-pages/add-post-position/add-post-position.component';
import { EditPostPositionComponent} from './pages/hr-pages/edit-post-position/edit-post-position.component';
import { HRNewsComponent} from './pages/hr-pages/News/news.component';
import { EditNewsComponent} from './pages/hr-pages/edit-news/edit-news.component';
import { EditapplicantComponent} from './pages/edit-applicant/edit-applicant.component';


// Services of hr-module
import { HRApplicantsService} from './shared/services/hr-services/applicants.service';
import { HREmailService} from './shared/services/hr-services/emails.service';
import { HRPositionsService} from './shared/services/hr-services/positions.service';
import { HRNewsService} from './shared/services/hr-services/news.service';

// end
import { environment } from '../environments/environment.prod';
// import {environment} from '../environments/environment';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
// import { ApplicantDetailsComponent} from './pages/applicant-details/applicant-details.component';

import {AuthenticationService} from './shared/services/authentication.service';
import { UserService} from './shared/services/user.service';
import { AuthService} from './shared/services/auth.service';
import { ApplicantsService} from './shared/services/applicants.service';
import { NewsService} from './shared/services/news.service';
import { InformationService} from './shared/services/information.service';
import { PositionsService} from './shared/services/positions.service';
import { EmailService} from './shared/services/email.service';
import { AuthGuard} from './pages/guards/auth.guard';
import { PhonePipe} from './shared/phone.pipe';
import { SSNPipe } from './shared/ssn.pipe';
import { YesiandnoPipe} from './shared/yesandno.pipe';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ApplyComponent,
    HeadComponent,
    FootComponent,
    LoginComponent,
    PhonePipe,
    SSNPipe,
    YesiandnoPipe,
    ApplicantsComponent,
    DashboardComponent,
    SidebarComponent,
    ApplicantDetailsComponent,
    EditapplicantComponent,
    MyapplicationComponent,
    DownloadComponent,
    NewsComponent,
    HRNewsComponent,
    InformationComponent,
    SendEmailComponent,
    EmailsComponent,
    EmailDetailsComponent,
    AnswerEmailComponent,
    PostPositionsComponent,
    AddPostPositionComponent,
    EditPostPositionComponent,
    EditNewsComponent,
    SignWitnessComponent,
    NofoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    FlashMessagesModule.forRoot(),
    SignaturePadModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    EditorModule,
   //  EmbedVideo.forRoot()
  ],
  providers: [
    ApplicantsService,
    AngularFireAuthModule,
    AuthenticationService,
    AuthService,
    UserService,
    NewsService,
    EmailService,
    PositionsService,
    InformationService,
    HRApplicantsService,
    HREmailService,
    HRPositionsService,
    HRNewsService,
    // ***
    AuthGuard],
    schemas: [  NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
