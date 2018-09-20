import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ApplyComponent } from './pages/apply/apply.component';
import { NofoundComponent} from './pages/nofound/nofound.component';
// import { ApplicantsComponent} from './pages/applicants/applicants.component';
import { DashboardComponent} from './pages/dashboard/dashboard.component';
// import { ApplicantDetailsComponent} from './pages/applicant-details/applicant-details.component';
import { MyapplicationComponent } from './pages/myapplication/myapplication.component';
import { EditapplicantComponent} from './pages/edit-applicant/edit-applicant.component';
import { NewsComponent} from './pages/news/news.component';
import { SendEmailComponent} from './pages/SendEmails/send-email.component';
import { SignWitnessComponent } from './pages/witness/witness';

// Component of HR-Module

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
import { DownloadComponent} from './pages/download/donwload.component';

// **


import { AuthGuard} from './pages/guards/auth.guard';
export const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'apply', component: ApplyComponent, canActivate: [AuthGuard] },
  { path: 'applicants', component: ApplicantsComponent, canActivate: [AuthGuard] },
  { path: 'applicant/edit', component: EditapplicantComponent, canActivate: [AuthGuard] },
  { path: 'singn/:id', component: SignWitnessComponent, canActivate: [AuthGuard] },
  { path: 'myapplication', component: MyapplicationComponent, canActivate: [AuthGuard] },
  { path: 'download', component: DownloadComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'news', component: NewsComponent, canActivate: [AuthGuard] },
  { path: 'send-email', component: SendEmailComponent, canActivate: [AuthGuard] },
  { path: 'applicants', component: ApplicantsComponent , canActivate: [AuthGuard] },
  { path: 'applicant/:id', component: ApplicantDetailsComponent , canActivate: [AuthGuard]  },
  { path: 'emails', component: EmailsComponent, canActivate: [AuthGuard]  },
  { path: 'email/:id', component: EmailDetailsComponent, canActivate: [AuthGuard]  },
  { path: 'email/:id/answer', component: AnswerEmailComponent , canActivate: [AuthGuard] },
  { path: 'positions', component: PostPositionsComponent, canActivate: [AuthGuard]  },
  { path: 'addnewpost', component: AddPostPositionComponent , canActivate: [AuthGuard] },
  { path: 'edit-post/:id', component: EditPostPositionComponent, canActivate: [AuthGuard]  },
  { path: 'newshr', component: HRNewsComponent , canActivate: [AuthGuard] },
  { path: 'edit-news/:id', component: EditNewsComponent, canActivate: [AuthGuard]  },
  { path: '**', component: NofoundComponent },
];

