import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Components
import { LandingComponent } from './pages/landing/landing.component';
import { RecruiterHomeComponent } from './pages/recruiter-home/recruiter-home.component';
import { RecruiterListComponent } from './pages/recruiter-list/recruiter-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'candidate-home', pathMatch: 'full'},
  {path: 'candidate-home', component: LandingComponent},
  {path: 'recruiter-home', component: RecruiterHomeComponent},
  {path: 'recruiter-list/:id', component: RecruiterListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
