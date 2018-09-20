import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ApplyComponent } from './pages/apply/apply.component';
import { NofoundComponent} from './pages/nofound/nofound.component';
import { ApplicantsComponent} from './pages/applicants/applicants.component';
import { AddapplicantComponent} from './pages/add-applicant/add-applicant.component';
import { DashboardComponent} from './pages/dashboard/dashboard.component';
import { ApplicantDetailsComponent} from './pages/applicant-details/applicant-details.component';
import { AuthGuard} from './pages/guards/auth.guard';
export const appRoutes: Routes = [
 // { path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] }, 
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'apply', component: ApplyComponent, canActivate: [AuthGuard] },
  { path: 'applicants', component: ApplicantsComponent, canActivate: [AuthGuard] },
  { path: 'applicant/add', component: AddapplicantComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'applicant/:id', component: ApplicantDetailsComponent, canActivate: [AuthGuard] },
  { path: '**', component: NofoundComponent },
];

