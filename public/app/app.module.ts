import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { SignaturePadModule } from 'angular2-signaturepad';

import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';
import { appRoutes} from './routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { ApplyComponent } from './pages/apply/apply.component';
import { HeadComponent} from './pages/phead/head.component';
import { FootComponent} from './pages/pfoot/foot.component';
import { LoginComponent} from './pages/login/login.component';
import { ApplicantsComponent} from './pages/applicants/applicants.component';
import {  AddapplicantComponent} from './pages/add-applicant/add-applicant.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent} from './pages/side-bar/sidebar.component';
import { NofoundComponent} from './pages/nofound/nofound.component';

import { environment } from '../environments/environment.prod';
//import {environment} from '../environments/environment';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { ApplicantDetailsComponent} from './pages/applicant-details/applicant-details.component';

import {AuthenticationService} from './shared/services/authentication.service';
import { UserService} from './shared/services/user.service';
import { AuthService} from './shared/services/auth.service';
import { ApplicantsService} from './shared/services/applicants.service';
import { AuthGuard} from './pages/guards/auth.guard';
import { PhonePipe} from './shared/phone.pipe';
import { SSNPipe } from './shared/ssn.pipe';
import { YesiandnoPipe} from './shared/yesandno.pipe';

import { FlashMessagesModule } from 'angular2-flash-messages';

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
    AddapplicantComponent,
    DashboardComponent,
    SidebarComponent,
    ApplicantDetailsComponent,
    NofoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
    AngularFireAuthModule
  ],
  providers: [ApplicantsService, AngularFireAuthModule, AuthenticationService, AuthService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
